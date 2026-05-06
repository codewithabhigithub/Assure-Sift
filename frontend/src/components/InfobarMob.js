import React from 'react';
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const InfoBarMob = () => {
    return (
        <div className="bg-brand text-white py-2 md:hidden">
            <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
                <div className="flex items-center m-auto space-x-6 text-xs sm:text-sm">
                    <a href="mailto:info@sureshift.in" className="flex items-center space-x-2">
                        <FaEnvelope />
                        <span className='font-normal'>info@sureshift.in</span>
                    </a>
                    <a href="tel:+919073291732" className="flex items-center space-x-2">
                        <FaPhoneAlt />
                        <span className='font-normal'>90 732 91 732</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default InfoBarMob;
