'use client';

import React, { useState, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import InfoBar from "@/components/Infobar";
import InfoBarMob from "@/components/InfobarMob";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <InfoBar />
      <InfoBarMob />
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl border border-gray-100">
          <div className="text-center">
            <h2 className="text-3xl font-outfit font-black text-gray-900">Admin Login</h2>
            <p className="mt-2 text-sm text-gray-500 font-medium">Access your dashboard</p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all"
                  placeholder="Enter username"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-sm text-red-700 font-bold">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-black rounded-xl text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all shadow-lg hover:shadow-xl uppercase tracking-widest"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default LoginPage;
