'use client';

import React, { useState, useContext } from 'react';
import { Lock, User, ArrowRight } from 'lucide-react';
import { AuthContext } from '@/context/AuthContext';
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <main
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: '#F7F3EE', fontFamily: "'Poppins', sans-serif" }}
    >
      <Navbar />

      {/* Hero-style top band matching site's section headers */}
      <div
        className="w-full text-center py-10 pt-30"
        style={{ backgroundColor: '#F7F3EE', borderBottom: '1px solid #E8E0D6' }}
      >
        <span
          className="inline-block text-xs font-semibold uppercase tracking-widest mb-2 px-4 py-1 rounded-full"
          style={{ color: '#E8472A', backgroundColor: '#E8472A18', letterSpacing: '0.18em' }}
        >
          Secure Portal
        </span>
        <h1
          className="text-4xl md:text-5xl font-bold mt-2"
          style={{ color: '#1A1A2E', fontFamily: "'Georgia', 'Times New Roman', serif", lineHeight: 1.15 }}
        >
          Admin <span style={{ color: '#E8472A' }}>Login</span>
        </h1>
        <p className="mt-2 text-sm" style={{ color: '#7A7A8C' }}>
          Sign in to access your management dashboard
        </p>
      </div>

      {/* Login Card */}
      <div className="flex-grow flex items-center justify-center px-4 py-16">
        <div
          className="w-full max-w-md bg-white rounded-2xl overflow-hidden"
          style={{
            boxShadow: '0 8px 40px 0 rgba(26,26,46,0.10)',
            border: '1px solid #EDE6DC',
          }}
        >
          {/* Card top accent bar */}
          <div style={{ height: 5, background: 'linear-gradient(90deg, #E8472A 60%, #f5a485 100%)' }} />

          <div className="px-10 py-10 md:px-12 md:py-12">
            <form className="space-y-7" onSubmit={handleSubmit}>

              {/* Username */}
              <div>
                <label
                  className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-widest"
                  style={{ color: '#7A7A8C' }}
                >
                  <User size={13} style={{ color: '#E8472A' }} />
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                    className="w-full outline-none text-sm transition-all"
                    style={{
                      backgroundColor: '#F7F3EE',
                      border: '1.5px solid #E8E0D6',
                      borderRadius: 10,
                      padding: '13px 16px',
                      color: '#1A1A2E',
                      fontFamily: "'Poppins', sans-serif",
                    }}
                    onFocus={e => (e.target.style.borderColor = '#E8472A')}
                    onBlur={e => (e.target.style.borderColor = '#E8E0D6')}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-widest"
                  style={{ color: '#7A7A8C' }}
                >
                  <Lock size={13} style={{ color: '#E8472A' }} />
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full outline-none text-sm transition-all"
                  style={{
                    backgroundColor: '#F7F3EE',
                    border: '1.5px solid #E8E0D6',
                    borderRadius: 10,
                    padding: '13px 16px',
                    color: '#1A1A2E',
                    fontFamily: "'Poppins', sans-serif",
                  }}
                  onFocus={e => (e.target.style.borderColor = '#E8472A')}
                  onBlur={e => (e.target.style.borderColor = '#E8E0D6')}
                />
              </div>

              {/* Error */}
              {error && (
                <div
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-semibold"
                  style={{
                    backgroundColor: '#FFF0EE',
                    border: '1px solid #E8472A33',
                    color: '#E8472A',
                    letterSpacing: '0.05em',
                  }}
                >
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#E8472A' }} />
                  {error}
                </div>
              )}

              {/* Submit — matches site's red CTA button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 font-semibold text-sm uppercase tracking-widest transition-all duration-200"
                style={{
                  backgroundColor: '#E8472A',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 10,
                  padding: '15px 24px',
                  cursor: 'pointer',
                  letterSpacing: '0.12em',
                  boxShadow: '0 4px 16px 0 rgba(232,71,42,0.25)',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#c93a20')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#E8472A')}
              >
                Login <ArrowRight size={15} />
              </button>
            </form>

            {/* Subtle trust line */}
            <p className="text-center text-xs mt-8" style={{ color: '#B0A89A' }}>
              🔒 Your session is encrypted and secure
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default LoginPage;