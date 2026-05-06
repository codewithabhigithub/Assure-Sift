import React from 'react';
import { FaInfoCircle, FaEnvelope, FaPhoneAlt, FaClock } from 'react-icons/fa';

const InfoBar = () => {
  return (
    <div className='w-full bg-brand py-2 hidden md:flex justify-center'>
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 text-white w-[80%] text-sm">
        <div className="flex items-center space-x-2">
          <FaInfoCircle />
          <span>INFO: Covid-19 information update!</span>
        </div>
        <div className="flex items-center space-x-6">
          <a href="mailto:info@sureshift.in" className="flex items-center space-x-2 hover:text-white/80 transition-colors">
            <FaEnvelope />
            <span>info@sureshift.in</span>
          </a>
          <a href="tel:+919073291732" className="flex items-center space-x-2 hover:text-white/80 transition-colors">
            <FaPhoneAlt />
            <span>90 732 91 732</span>
          </a>
          <div className="flex items-center space-x-2">
            <FaClock />
            <span>(Mon to Sun) 24 X 7</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBar;
