'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { FaBox, FaMapMarkerAlt, FaTruck, FaCheckCircle, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';
import api from '@/services/api';
import InfoBar from "@/components/Infobar";
import InfoBarMob from "@/components/InfobarMob";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TRACKING_STEPS = [
  { label: 'Enquiry Received', statusMatch: ['Enquiry Received', 'Order Requested'] },
  { label: 'Survey Done', statusMatch: ['Survey Initiated', 'Survey Done'] },
  { label: 'Quotation Approved', statusMatch: ['Quotation Sent', 'Quotation Approved', 'CFR Generated'] },
  { label: 'Packing & Loading', statusMatch: ['On the way for Pickup', 'Pickup Point Reached', 'Packing Started', 'Packing Finished', 'Loading Started', 'Loading Finished'] },
  { label: 'In Transit', statusMatch: ['In Transit', 'Location A', 'Location B', 'Location C'] },
  { label: 'Delivered', statusMatch: ['On the way for Delivery', 'Delivery Point Reached', 'Unloading Started', 'Unloading Finished', 'Unpacking Started', 'Unpacking Finished', 'Delivered'] },
];

const LIBRARIES = ['places'];

function OrderTrackingContent() {
  const [users, setUsers] = useState([]);
  const [directions, setDirections] = useState(null);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const searchParams = useSearchParams();
  const awbNumber = searchParams.get('awb');

  const fetchUsers = useCallback(async () => {
    if (!awbNumber) return;
    setIsLoading(true);
    try {
      const data = await api.post('/users/completeInfo', { order_id: awbNumber });
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching tracking info:', error);
    } finally {
      setIsLoading(false);
    }
  }, [awbNumber]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const onGoogleMapLoad = () => setGoogleLoaded(true);

  const getCurrentStepIndex = (status) => {
    if (!status) return 0;
    const index = TRACKING_STEPS.findIndex(step => step.statusMatch.includes(status));
    return index === -1 ? 0 : index;
  };

  const currentStep = users.length > 0 ? getCurrentStepIndex(users[0].status) : -1;

  return (
    <div className="flex-grow bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-brand p-8 text-white">
            <h2 className="text-3xl font-outfit font-black text-center uppercase tracking-tight">Order Tracking</h2>
            <p className="text-center text-white/70 font-mono mt-2">AWB: {awbNumber}</p>
          </div>

          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
              <p className="text-gray-500 font-bold animate-pulse">Locating your shipment...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="py-20 text-center space-y-6">
              <div className="text-6xl text-gray-200">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800">No Tracking Information Found</h3>
              <p className="text-gray-500 max-w-md mx-auto">We couldn't find any shipment matching this AWB number. Please check the number and try again.</p>
            </div>
          ) : (
            <div className="p-8 lg:p-12 space-y-12">
              {/* Map Section */}
              <div className="rounded-2xl overflow-hidden shadow-inner border border-gray-100 relative h-[400px]">
                <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} libraries={LIBRARIES} onLoad={onGoogleMapLoad}>
                  <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    zoom={10}
                    center={{ lat: 28.6448, lng: 77.2167 }}
                    options={{ disableDefaultUI: true, zoomControl: true }}
                  >
                    {googleLoaded && users[0]?.pickup_address && users[0]?.drop_address && (
                      <DirectionsService
                        options={{
                          origin: users[0].pickup_address,
                          destination: users[0].drop_address,
                          travelMode: 'DRIVING',
                        }}
                        callback={(response, status) => {
                          if (status === 'OK' && !directions) setDirections(response);
                        }}
                      />
                    )}
                    {directions && <DirectionsRenderer directions={directions} />}
                  </GoogleMap>
                </LoadScript>
                {!googleLoaded && (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <p className="text-gray-400 font-bold animate-pulse">Loading Map...</p>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="relative pt-12 pb-8">
                <div className="absolute top-[60px] left-0 w-full h-1 bg-gray-100 -z-10"></div>
                <div className="flex justify-between relative">
                  {TRACKING_STEPS.map((step, index) => {
                    const isCompleted = index < currentStep || users[0]?.status === 'Delivered';
                    const isActive = index === currentStep && users[0]?.status !== 'Delivered';
                    
                    return (
                      <div key={index} className="flex flex-col items-center flex-1 relative group">
                        <div className={`w-12 h-12 rounded-full border-4 border-white flex items-center justify-center transition-all duration-500 shadow-lg ${
                          isCompleted ? 'bg-green-500 scale-110' : isActive ? 'bg-brand animate-pulse scale-110' : 'bg-gray-200'
                        }`}>
                          {isCompleted ? <FaCheckCircle className="text-white text-xl" /> : <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-white' : 'bg-gray-400'}`} />}
                        </div>
                        <span className={`mt-4 text-[10px] lg:text-xs font-black uppercase tracking-tighter text-center transition-colors ${
                          isCompleted ? 'text-green-600' : isActive ? 'text-brand' : 'text-gray-400'
                        }`}>
                          {step.label}
                        </span>
                        {index < TRACKING_STEPS.length - 1 && (
                          <div className={`absolute top-[22px] left-[calc(50%+1.5rem)] w-[calc(100%-3rem)] h-1 -z-10 ${
                            isCompleted ? 'bg-green-500' : 'bg-gray-100'
                          }`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {users.map(user => (
                  <React.Fragment key={user.id}>
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-brand/10 rounded-xl text-brand text-xl"><FaUser /></div>
                        <div>
                          <h4 className="text-xl font-outfit font-black text-gray-900">{user.name}</h4>
                          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{user.purpose || 'Relocation Service'}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        {[
                          { icon: <FaPhone />, label: 'Phone', value: user.phone },
                          { icon: <FaEnvelope />, label: 'Email', value: user.email },
                          { icon: <FaBox />, label: 'Shipment Status', value: user.status || 'Enquiry Requested', isStatus: true },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="text-brand/60">{item.icon}</div>
                            <div>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</p>
                              <p className={`text-sm font-bold ${item.isStatus ? 'text-brand underline decoration-brand/30' : 'text-gray-700'}`}>{item.value || 'N/A'}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-brand/10 rounded-xl text-brand text-xl"><FaTruck /></div>
                        <div>
                          <h4 className="text-xl font-outfit font-black text-gray-900">Journey Details</h4>
                          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Route Information</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        {[
                          { icon: <FaMapMarkerAlt />, label: 'Pickup From', value: user.pickup_address },
                          { icon: <FaMapMarkerAlt />, label: 'Delivery To', value: user.drop_address },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="text-brand/60">{item.icon}</div>
                            <div>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</p>
                              <p className="text-sm font-bold text-gray-700 leading-relaxed">{item.value || 'N/A'}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function OrderTrackingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <InfoBar />
      <InfoBarMob />
      <Navbar />
      <Suspense fallback={
        <div className="flex-grow flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
        </div>
      }>
        <OrderTrackingContent />
      </Suspense>
      <Footer />
    </div>
  );
}
