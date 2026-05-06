'use client';

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import { usePathname } from 'next/navigation';

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

  return (
    <Disclosure as="nav" className="bg-white sticky top-0 z-50 premium-shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <Image 
                className="w-auto h-12" 
                src={logo} 
                alt="Sure Shift Logo" 
                priority
              />
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <div className="flex space-x-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      isActive 
                        ? 'text-brand border-b-2 border-brand' 
                        : 'text-gray-600 hover:text-brand hover:border-b-2 border-brand/20',
                      'px-3 py-2 text-sm font-bold transition-all-custom'
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Action Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link 
              href="/#contact"
              className="px-6 py-2.5 text-sm font-bold text-white bg-brand rounded-full hover:bg-brand-dark transition-all-custom premium-shadow"
            >
              Get Free Quotation
            </Link>
            <Link 
              href="/payment"
              className="px-6 py-2.5 text-sm font-bold text-brand border-2 border-brand rounded-full hover:bg-brand hover:text-white transition-all-custom"
            >
              Online Payment
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <DisclosureButton className="inline-flex items-center justify-center rounded-lg p-2 text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel className="lg:hidden">
        <div className="space-y-1 px-4 pb-3 pt-2 bg-gray-50 border-t">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <DisclosureButton
                key={item.name}
                as={Link}
                href={item.href}
                className={classNames(
                  isActive 
                    ? 'bg-brand text-white' 
                    : 'text-gray-600 hover:bg-brand/10 hover:text-brand',
                  'block rounded-lg px-3 py-2 text-base font-bold transition-all-custom'
                )}
              >
                {item.name}
              </DisclosureButton>
            );
          })}
          <div className="pt-4 pb-2 flex flex-col space-y-3">
            <Link 
              href="/#contact"
              className="w-full text-center px-6 py-3 font-bold text-white bg-brand rounded-lg shadow-md"
            >
              Get Free Quotation
            </Link>
            <Link 
              href="/payment"
              className="w-full text-center px-6 py-3 font-bold text-brand border-2 border-brand rounded-lg"
            >
              Online Payment
            </Link>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
