'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { User, Truck, MapPin, CheckCircle, Activity, Box, Phone, Mail } from 'lucide-react';
import api from '@/services/api';
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/common/Layout";
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
  const [directionsRequested, setDirectionsRequested] = useState(false);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();
  const awbNumber = searchParams.get('awb');

  const fetchUsers = useCallback(async () => {
    if (!awbNumber) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.post('/users/completeInfo', { order_id: awbNumber });
      console.log('API Response:', data);
      if (Array.isArray(data)) {
        setUsers(data);
      } else if (data && typeof data === 'object') {
        setUsers([data]);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error('Error fetching tracking info:', err);
      setError('Failed to fetch tracking information. Please try again.');
      setUsers([]);
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
  const isDelivered = users[0]?.status === 'Delivered';

  return (
    /* Page wrapper — matches site's light cream bg */
    <section style={{ backgroundColor: '#F5F3EE', paddingTop: '100px', paddingBottom: '80px', minHeight: '100vh' }}>
      <Container className="max-w-5xl">
        <Reveal width="100%">
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 40px rgba(0,0,0,0.08)',
            border: '1px solid #E8E4DC'
          }}>

            {/* ── Dark Navy Header (matches site navbar/footer color) ── */}
            <div style={{
              backgroundColor: '#1A1A2E',
              padding: '48px 40px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Subtle red glow top-right */}
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: '300px', height: '300px',
                background: 'radial-gradient(circle, rgba(196,71,42,0.15) 0%, transparent 70%)',
                pointerEvents: 'none'
              }} />

              {/* Eyebrow */}
              <p style={{
                color: '#C4472A',
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '12px'
              }}>
                Real-Time Tracking
              </p>

              <h1 style={{
                color: '#ffffff',
                fontSize: '36px',
                fontWeight: '700',
                marginBottom: '20px',
                lineHeight: '1.2'
              }}>
                Consignment Monitoring
              </h1>

              {/* AWB Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                padding: '8px 24px',
                borderRadius: '50px',
              }}>
                <span style={{ color: '#C4472A', fontSize: '10px', fontWeight: '700', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                  Shipment ID:
                </span>
                <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: '600', letterSpacing: '0.1em' }}>
                  {awbNumber || 'N/A'}
                </span>
              </div>
            </div>

            {/* ── Loading ── */}
            {isLoading ? (
              <div style={{ padding: '100px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <Activity size={40} style={{ color: '#C4472A', animation: 'spin 1s linear infinite' }} />
                <p style={{ color: '#999', fontSize: '12px', fontWeight: '600', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  Fetching Shipment Data...
                </p>
                <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
              </div>

            ) : error ? (
              /* ── Error ── */
              <div style={{ padding: '80px 40px', textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.3 }}>⚠️</div>
                <h3 style={{ color: '#1A1A2E', fontSize: '22px', fontWeight: '700', marginBottom: '12px' }}>
                  Something Went Wrong
                </h3>
                <p style={{ color: '#888', fontSize: '15px', marginBottom: '28px' }}>{error}</p>
                <button
                  type="button"
                  onClick={fetchUsers}
                  style={{
                    backgroundColor: '#C4472A',
                    color: '#fff',
                    border: 'none',
                    padding: '12px 32px',
                    borderRadius: '50px',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  Try Again
                </button>
              </div>

            ) : users.length === 0 ? (
              /* ── Empty ── */
              <div style={{ padding: '80px 40px', textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.2 }}>🔍</div>
                <h3 style={{ color: '#1A1A2E', fontSize: '22px', fontWeight: '700', marginBottom: '12px' }}>
                  No Record Found
                </h3>
                <p style={{ color: '#888', fontSize: '15px', maxWidth: '400px', margin: '0 auto' }}>
                  We could not locate a shipment matching this ID. Please verify your consignment number and try again.
                </p>
              </div>

            ) : (
              <div style={{ padding: '48px 40px' }}>

                {/* ── Google Map ── */}
                <div style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid #E8E4DC',
                  height: '380px',
                  marginBottom: '48px',
                  position: 'relative',
                  filter: 'grayscale(0.3)'
                }}>
                  <LoadScript
                    googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                    libraries={LIBRARIES}
                    onLoad={onGoogleMapLoad}
                  >
                    <GoogleMap
                      mapContainerStyle={{ width: '100%', height: '100%' }}
                      zoom={10}
                      center={{ lat: 28.6448, lng: 77.2167 }}
                      options={{ disableDefaultUI: true, zoomControl: true }}
                    >
                      {googleLoaded && users[0]?.pickup_address && users[0]?.drop_address && !directionsRequested && (
                        <DirectionsService
                          options={{
                            origin: users[0].pickup_address,
                            destination: users[0].drop_address,
                            travelMode: 'DRIVING',
                          }}
                          callback={(response, status) => {
                            setDirectionsRequested(true);
                            if (status === 'OK') setDirections(response);
                          }}
                        />
                      )}
                      {directions && <DirectionsRenderer directions={directions} />}
                    </GoogleMap>
                  </LoadScript>
                  {!googleLoaded && (
                    <div style={{
                      position: 'absolute', inset: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      backgroundColor: '#f9f8f6'
                    }}>
                      <Activity size={28} style={{ color: '#C4472A' }} />
                    </div>
                  )}
                </div>

                {/* ── Tracking Steps ── */}
                <div style={{ marginBottom: '48px' }}>
                  {/* Section label */}
                  <p style={{
                    color: '#C4472A', fontSize: '11px', fontWeight: '700',
                    letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '32px'
                  }}>
                    Shipment Progress
                  </p>

                  {/* Progress bar + dots */}
                  <div style={{ position: 'relative' }}>
                    {/* Background line */}
                    <div style={{
                      position: 'absolute',
                      top: '22px',
                      left: '0', right: '0',
                      height: '2px',
                      backgroundColor: '#E8E4DC',
                      zIndex: 0
                    }} />
                    {/* Filled line */}
                    <div style={{
                      position: 'absolute',
                      top: '22px',
                      left: '0',
                      height: '2px',
                      backgroundColor: '#C4472A',
                      zIndex: 1,
                      width: isDelivered
                        ? '100%'
                        : `${(currentStep / (TRACKING_STEPS.length - 1)) * 100}%`,
                      transition: 'width 0.8s ease'
                    }} />

                    {/* Step dots */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
                      {TRACKING_STEPS.map((step, index) => {
                        const isCompleted = index < currentStep || isDelivered;
                        const isActive = index === currentStep && !isDelivered;

                        return (
                          <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                            {/* Circle */}
                            <div style={{
                              width: '44px',
                              height: '44px',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: isCompleted ? '#C4472A' : isActive ? '#1A1A2E' : '#ffffff',
                              border: isCompleted ? '2px solid #C4472A' : isActive ? '2px solid #1A1A2E' : '2px solid #E8E4DC',
                              boxShadow: isActive ? '0 0 0 4px rgba(196,71,42,0.15)' : 'none',
                              transition: 'all 0.4s ease'
                            }}>
                              {isCompleted
                                ? <CheckCircle size={20} color="#fff" />
                                : <div style={{
                                    width: '8px', height: '8px', borderRadius: '50%',
                                    backgroundColor: isActive ? '#C4472A' : '#D0CCC4'
                                  }} />
                              }
                            </div>

                            {/* Label */}
                            <span style={{
                              marginTop: '10px',
                              fontSize: '10px',
                              fontWeight: '700',
                              textTransform: 'uppercase',
                              letterSpacing: '0.08em',
                              textAlign: 'center',
                              maxWidth: '72px',
                              lineHeight: '1.4',
                              color: isCompleted ? '#C4472A' : isActive ? '#1A1A2E' : '#BBBBB0'
                            }}>
                              {step.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* ── Divider ── */}
                <div style={{ height: '1px', backgroundColor: '#E8E4DC', marginBottom: '48px' }} />

                {/* ── Info Grid ── */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '32px'
                }}>
                  {users.map((user, idx) => (
                    <React.Fragment key={user.id || idx}>

                      {/* Customer Info Card */}
                      <div style={{
                        backgroundColor: '#F9F8F6',
                        border: '1px solid #E8E4DC',
                        borderRadius: '12px',
                        padding: '28px',
                      }}>
                        {/* Card Header */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid #E8E4DC' }}>
                          <div style={{
                            width: '42px', height: '42px',
                            borderRadius: '10px',
                            backgroundColor: '#1A1A2E',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            <User size={20} color="#C4472A" />
                          </div>
                          <div>
                            <h4 style={{ color: '#1A1A2E', fontSize: '16px', fontWeight: '700', marginBottom: '2px' }}>
                              {user.name || 'N/A'}
                            </h4>
                            <p style={{ color: '#C4472A', fontSize: '10px', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                              {user.purpose || 'Relocation'}
                            </p>
                          </div>
                        </div>

                        {/* Info rows */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                          {[
                            { icon: <Phone size={15} color="#C4472A" />, label: 'Contact', value: user.phone },
                            { icon: <Mail size={15} color="#C4472A" />, label: 'Email', value: user.email },
                            { icon: <Box size={15} color="#C4472A" />, label: 'Status', value: user.status || 'Enquiry Requested', isStatus: true },
                          ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                              <div style={{ marginTop: '2px', flexShrink: 0 }}>{item.icon}</div>
                              <div>
                                <p style={{ color: '#999', fontSize: '10px', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '2px' }}>
                                  {item.label}
                                </p>
                                <p style={{
                                  color: item.isStatus ? '#C4472A' : '#1A1A2E',
                                  fontSize: '14px',
                                  fontWeight: item.isStatus ? '700' : '400',
                                }}>
                                  {item.value || 'N/A'}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Route Info Card */}
                      <div style={{
                        backgroundColor: '#F9F8F6',
                        border: '1px solid #E8E4DC',
                        borderRadius: '12px',
                        padding: '28px',
                      }}>
                        {/* Card Header */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid #E8E4DC' }}>
                          <div style={{
                            width: '42px', height: '42px',
                            borderRadius: '10px',
                            backgroundColor: '#1A1A2E',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            <Truck size={20} color="#C4472A" />
                          </div>
                          <div>
                            <h4 style={{ color: '#1A1A2E', fontSize: '16px', fontWeight: '700', marginBottom: '2px' }}>
                              Route Details
                            </h4>
                            <p style={{ color: '#C4472A', fontSize: '10px', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                              Logistics
                            </p>
                          </div>
                        </div>

                        {/* Origin → Destination */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                          {/* Origin */}
                          <div style={{ display: 'flex', gap: '12px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div style={{
                                width: '32px', height: '32px', borderRadius: '50%',
                                backgroundColor: '#1A1A2E',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0
                              }}>
                                <MapPin size={14} color="#C4472A" />
                              </div>
                              {/* Connector line */}
                              <div style={{ width: '2px', flex: 1, backgroundColor: '#E8E4DC', margin: '4px 0', minHeight: '32px' }} />
                            </div>
                            <div style={{ paddingBottom: '20px' }}>
                              <p style={{ color: '#999', fontSize: '10px', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>
                                Origin
                              </p>
                              <p style={{ color: '#1A1A2E', fontSize: '14px', lineHeight: '1.5' }}>
                                {user.pickup_address || 'N/A'}
                              </p>
                            </div>
                          </div>

                          {/* Destination */}
                          <div style={{ display: 'flex', gap: '12px' }}>
                            <div>
                              <div style={{
                                width: '32px', height: '32px', borderRadius: '50%',
                                backgroundColor: '#C4472A',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0
                              }}>
                                <MapPin size={14} color="#fff" />
                              </div>
                            </div>
                            <div>
                              <p style={{ color: '#999', fontSize: '10px', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>
                                Destination
                              </p>
                              <p style={{ color: '#1A1A2E', fontSize: '14px', lineHeight: '1.5' }}>
                                {user.drop_address || 'N/A'}
                              </p>
                            </div>
                          </div>
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
    </section>
  );
}

export default function OrderTrackingPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F5F3EE' }}>
      <Navbar />
      <Suspense fallback={
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '120px' }}>
          <Activity size={40} style={{ color: '#C4472A' }} />
        </div>
      }>
        <OrderTrackingContent />
      </Suspense>
      <Footer />
    </main>
  );
}