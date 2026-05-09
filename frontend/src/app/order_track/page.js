'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { User, Truck, MapPin, CheckCircle, Activity, Box, Phone, Mail } from 'lucide-react';
import api from '@/services/api';
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Container, Section } from "@/components/common/Layout";
import { Reveal } from "@/components/ui/Reveal";

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
    const timer = setTimeout(() => {
      fetchUsers();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchUsers]);

  const onGoogleMapLoad = () => setGoogleLoaded(true);

  const getCurrentStepIndex = (status) => {
    if (!status) return 0;
    const index = TRACKING_STEPS.findIndex(step => step.statusMatch.includes(status));
    return index === -1 ? 0 : index;
  };

  const currentStep = users.length > 0 ? getCurrentStepIndex(users[0].status) : -1;

  return (
    <Section className="bg-bg-primary pt-[120px] pb-32 min-h-[80vh]">
      <Container className="max-w-5xl">
        <Reveal width="100%">
          <div className="bg-white rounded-[48px] shadow-hover overflow-hidden border border-stone/20">
            {/* Dark Header */}
            <div className="bg-bg-dark p-12 lg:p-16 text-white text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[80px] rounded-full pointer-events-none"></div>
              <span className="subtitle mb-4">Command & Control</span>
              <h2 className="text-4xl lg:text-5xl font-display leading-tight mb-4">Consignment Monitoring</h2>
              <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-2 rounded-full mt-4">
                <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em]">Shipment ID:</span>
                <span className="text-sm font-display tracking-widest">{awbNumber}</span>
              </div>
            </div>

            {isLoading ? (
              <div className="py-32 flex flex-col items-center justify-center gap-6">
                <Activity className="animate-spin text-accent" size={48} />
                <p className="text-text-muted font-bold tracking-[0.2em] uppercase text-[10px]">Synchronizing Satellite Data...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="py-32 text-center space-y-8">
                <div className="text-6xl opacity-20">🔍</div>
                <div className="max-w-md mx-auto">
                  <h3 className="text-3xl font-display text-text-dark mb-4">Archives Vacant</h3>
                  <p className="text-text-muted font-body font-light">We could not locate a heritage movement matching this identifier. Please verify your consignment ID and re-initiate visualization.</p>
                </div>
              </div>
            ) : (
              <div className="p-12 lg:p-20 space-y-20">
                {/* Refined Map Section */}
                <div className="rounded-[32px] overflow-hidden shadow-inner border border-stone/20 relative h-[450px] grayscale hover:grayscale-0 transition-all duration-1000">
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
                    <div className="absolute inset-0 bg-stone/5 flex items-center justify-center">
                      <Activity className="animate-spin text-accent" size={32} />
                    </div>
                  )}
                </div>

                {/* Refined Tracking Steps */}
                <div className="relative py-12">
                  <div className="absolute top-[60px] left-0 w-full h-[1px] bg-stone/50 -z-10"></div>
                  <div className="flex justify-between relative gap-4">
                    {TRACKING_STEPS.map((step, index) => {
                      const isCompleted = index < currentStep || users[0]?.status === 'Delivered';
                      const isActive = index === currentStep && users[0]?.status !== 'Delivered';
                      
                      return (
                        <div key={index} className="flex flex-col items-center flex-1 relative text-center">
                          <div className={`w-14 h-14 rounded-full border-4 border-white flex items-center justify-center transition-all duration-700 shadow-soft ${
                            isCompleted ? 'bg-accent scale-110' : isActive ? 'bg-bg-dark animate-pulse scale-110' : 'bg-stone'
                          }`}>
                            {isCompleted ? <CheckCircle className="text-white" size={24} /> : <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-accent' : 'bg-white'}`} />}
                          </div>
                          <span className={`mt-6 text-[10px] font-bold uppercase tracking-[0.2em] max-w-[80px] leading-tight transition-colors ${
                            isCompleted || isActive ? 'text-text-dark' : 'text-text-muted opacity-40'
                          }`}>
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Order Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-12 border-t border-stone/20">
                  {users.map(user => (
                    <React.Fragment key={user.id}>
                      <div className="space-y-10">
                        <div className="flex items-center gap-6">
                          <div className="p-5 bg-stone/20 rounded-2xl text-accent"><User size={24} /></div>
                          <div>
                            <h4 className="text-2xl font-display text-text-dark">{user.name}</h4>
                            <p className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] mt-1">{user.purpose || 'Bespoke Relocation'}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          {[
                            { icon: <Phone size={20} />, label: 'Priority Contact', value: user.phone },
                            { icon: <Mail size={20} />, label: 'Electronic Mail', value: user.email },
                            { icon: <Box size={20} />, label: 'Current State', value: user.status || 'Enquiry Requested', isStatus: true },
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-6 p-6 bg-stone/5 rounded-[24px] border border-stone/10 group hover:border-accent/30 transition-premium">
                              <div className="text-accent/40 group-hover:text-accent transition-colors">{item.icon}</div>
                              <div>
                                <p className="text-[9px] font-bold text-text-muted uppercase tracking-[0.3em] mb-1">{item.label}</p>
                                <p className={`text-base font-body ${item.isStatus ? 'text-accent font-bold italic' : 'text-text-dark font-light'}`}>{item.value || 'N/A'}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-10">
                        <div className="flex items-center gap-6">
                          <div className="p-5 bg-stone/20 rounded-2xl text-accent"><Truck size={24} /></div>
                          <div>
                            <h4 className="text-2xl font-display text-text-dark">Journey Vector</h4>
                            <p className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] mt-1">Route Logistics</p>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          {[
                            { icon: <MapPin size={20} />, label: 'Origin Point', value: user.pickup_address },
                            { icon: <MapPin size={20} />, label: 'Destination Point', value: user.drop_address },
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-6 p-6 bg-stone/5 rounded-[24px] border border-stone/10 group hover:border-accent/30 transition-premium">
                              <div className="text-accent/40 group-hover:text-accent transition-colors">{item.icon}</div>
                              <div>
                                <p className="text-[9px] font-bold text-text-muted uppercase tracking-[0.3em] mb-1">{item.label}</p>
                                <p className="text-base font-body font-light text-text-dark leading-relaxed">{item.value || 'N/A'}</p>
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
        </Reveal>
      </Container>
    </Section>
  );
}

export default function OrderTrackingPage() {
  return (
    <main className="min-h-screen flex flex-col bg-bg-primary">
      <Navbar />
      <Suspense fallback={
        <div className="flex-grow flex items-center justify-center pt-[120px]">
          <Activity className="animate-spin text-accent" size={48} />
        </div>
      }>
        <OrderTrackingContent />
      </Suspense>
      <Footer />
    </main>
  );
}
