import React from "react";
import Link from "next/link";
import Image from "next/image";

const NewNavbar = () => {
  return (
    <>
      <nav
        className="bg-white sticky top-0 z-50 premium-shadow"
        data-headlessui-state=""
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex h-20 items-center justify-between">
            <div className="flex-shrink-0 flex items-center">
              <a href="/">
                <img
                  alt="Sure Shift Logo"
                  width="4226"
                  height="1857"
                  decoding="async"
                  data-nimg="1"
                  className="w-auto h-12"
                  style="color: transparent"
                  srcSet="
                    /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.17kmto2~u~~db.png&amp;w=3840&amp;q=75 1x
                  "
                  src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.17kmto2~u~~db.png&amp;w=3840&amp;q=75"
                />
              </a>
            </div>
            <div className="hidden lg:flex flex-1 items-center justify-center">
              <div className="flex space-x-2">
                <a
                  className="text-brand border-b-2 border-brand px-3 py-2 text-sm font-bold transition-all-custom"
                  href="/"
                >
                  HOME
                </a>
                <a
                  className="text-gray-600 hover:text-brand hover:border-b-2 border-brand/20 px-3 py-2 text-sm font-bold transition-all-custom"
                  href="/about_us"
                >
                  ABOUT US
                </a>
                <a
                  className="text-gray-600 hover:text-brand hover:border-b-2 border-brand/20 px-3 py-2 text-sm font-bold transition-all-custom"
                  href="/#contact"
                >
                  SERVICES
                </a>
                <a
                  className="text-gray-600 hover:text-brand hover:border-b-2 border-brand/20 px-3 py-2 text-sm font-bold transition-all-custom"
                  href="/#tracking"
                >
                  TRACKING
                </a>
                <a
                  className="text-gray-600 hover:text-brand hover:border-b-2 border-brand/20 px-3 py-2 text-sm font-bold transition-all-custom"
                  href="/blog"
                >
                  BLOG
                </a>
                <a
                  className="text-gray-600 hover:text-brand hover:border-b-2 border-brand/20 px-3 py-2 text-sm font-bold transition-all-custom"
                  href="/contact_us"
                >
                  CONTACT US
                </a>
              </div>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              <a
                className="px-6 py-2.5 text-sm font-bold text-white bg-brand rounded-full hover:bg-brand-dark transition-all-custom premium-shadow"
                href="/#contact"
              >
                Get Free Quotation
              </a>
              <a
                className="px-6 py-2.5 text-sm font-bold text-brand border-2 border-brand rounded-full hover:bg-brand hover:text-white transition-all-custom"
                href="/payment"
              >
                Online Payment
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                className="inline-flex items-center justify-center rounded-lg p-2 text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand"
                id="headlessui-disclosure-button-_R_48slrlb_"
                type="button"
                aria-expanded="false"
                data-headlessui-state=""
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                  className="block h-6 w-6 group-data-[open]:hidden"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  ></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                  className="hidden h-6 w-6 group-data-[open]:block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NewNavbar;
