import React from 'react';

export const Section = ({ children, id, className = '', dark = false }) => {
  return (
    <section 
      id={id} 
      className={`py-[110px] ${dark ? 'bg-bg-dark text-white' : 'bg-transparent'} ${className}`}
    >
      {children}
    </section>
  );
};

export const Container = ({ children, className = '' }) => {
  return (
    <div className={`max-w-[1240px] mx-auto px-6 lg:px-10 ${className}`}>
      {children}
    </div>
  );
};
