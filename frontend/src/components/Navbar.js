'use client';

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navigation = [
  { name: 'HOME', href: '/' },
  { name: 'ABOUT US', href: '/about_us' },
  { name: 'SERVICES', href: '/#contact' },
  { name: 'TRACKING', href: '/#tracking' },
  { name: 'BLOG', href: '/blog' },
  { name: 'CONTACT US', href: '/contact_us' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Disclosure as="nav" className={classNames(
      "fixed top-0 left-0 w-full z-[100] transition-all duration-500",
      scrolled ? "bg-white/90 backdrop-blur-xl py-3 shadow-sm" : "bg-transparent py-6"
    )}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="relative flex h-16 items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <Image 
                className="w-auto h-12 transition-all duration-500" 
                src={logo} 
                alt="Assure Sift Logo" 
                priority
              />
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <div className="flex space-x-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      isActive 
                        ? 'text-accent' 
                        : 'text-text-dark hover:text-accent',
                      'px-4 py-2 text-[13px] font-bold tracking-widest transition-premium relative group'
                    )}
                  >
                    {item.name}
                    <span className={classNames(
                      "absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-accent transition-all duration-300",
                      isActive ? "w-1/2" : "w-0 group-hover:w-1/2"
                    )}></span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Action Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link 
              href="/#contact"
              className="px-8 py-3 text-[13px] font-bold text-white bg-accent rounded-full hover:translate-y-[-2px] transition-premium shadow-lg shadow-accent/20"
            >
              Get Free Quotation
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <DisclosureButton className="inline-flex items-center justify-center rounded-full p-2.5 text-white bg-accent hover:bg-accent/80 focus:outline-none transition-premium">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel className="lg:hidden">
        <div className="space-y-1 px-4 pb-3 pt-2 bg-white/95 backdrop-blur-xl border-t border-stone shadow-2xl mx-4 mt-2 rounded-2xl">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <DisclosureButton
                key={item.name}
                as={Link}
                href={item.href}
                className={classNames(
                  isActive 
                    ? 'bg-accent/5 text-accent' 
                    : 'text-text-dark hover:bg-accent/5 hover:text-accent',
                  'block rounded-xl px-4 py-3 text-sm font-bold transition-premium'
                )}
              >
                {item.name}
              </DisclosureButton>
            );
          })}
          <div className="pt-4 pb-2">
            <Link 
              href="/#contact"
              className="block w-full text-center px-8 py-4 font-bold text-white bg-accent rounded-xl shadow-lg"
            >
              Get Free Quotation
            </Link>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
