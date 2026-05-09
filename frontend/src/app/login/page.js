'use client';

import React, { useState, useContext } from 'react';
import { Lock, User } from 'lucide-react';
import { AuthContext } from '@/context/AuthContext';
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Container, Section } from "@/components/common/Layout";
import { Reveal } from "@/components/ui/Reveal";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <main className="min-h-screen bg-bg-primary flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center pt-[120px] pb-32 px-6">
        <Container className="max-w-md w-full">
          <Reveal width="100%">
            <div className="bg-white p-12 lg:p-16 rounded-[40px] shadow-hover border border-stone/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="text-center mb-12">
                <span className="subtitle">Secure Portal</span>
                <h2 className="text-4xl lg:text-5xl font-display leading-tight mb-2">Admin Login</h2>
                <p className="text-text-muted font-body font-light text-sm">Access your strategic dashboard</p>
              </div>
              
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted px-1 flex items-center gap-2">
                      <User size={12} /> Username
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-stone/5 border-b border-stone/30 px-6 py-4 focus:border-accent outline-none transition-colors font-body text-base rounded-t-2xl"
                      placeholder="Principal ID"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted px-1 flex items-center gap-2">
                      <Lock size={12} /> Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-stone/5 border-b border-stone/30 px-6 py-4 focus:border-accent outline-none transition-colors font-body text-base rounded-t-2xl"
                      placeholder="Access Token"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-accent/5 border-l-4 border-accent p-4 rounded-r-xl">
                    <p className="text-xs text-accent font-bold tracking-widest uppercase">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full btn-primary py-5 text-[11px] tracking-[0.2em] uppercase"
                >
                  Initiate Session
                </button>
              </form>
            </div>
          </Reveal>
        </Container>
      </div>
      
      <Footer />
    </main>
  );
};

export default LoginPage;
