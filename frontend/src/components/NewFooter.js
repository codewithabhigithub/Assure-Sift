import React from "react";
import Link from "next/link";
import Image from "next/image";

const NewFooter = () => {
  return (
    <>
      <footer className="bg-[#0E2334] text-white pb-10 pt-16 lg:mt-[120px] mt-[50px]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 lg:w-[80%]">
          <div className="flex flex-wrap justify-between gap-10 lg:gap-0">
            <div className="w-full md:w-1/3 lg:w-[280px] space-y-6">
              <a href="/">
                <img
                  alt="Sure Shift Logo"
                  loading="lazy"
                  width="754"
                  height="331"
                  decoding="async"
                  data-nimg="1"
                  className="w-[120px] h-auto"
                  style="color: transparent"
                  srcSet="
                    /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo%20white.02p.7h3.qfxkq.png&amp;w=828&amp;q=75  1x,
                    /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo%20white.02p.7h3.qfxkq.png&amp;w=1920&amp;q=75 2x
                  "
                  src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo%20white.02p.7h3.qfxkq.png&amp;w=1920&amp;q=75"
                />
              </a>
              <p className="text-gray-300 leading-relaxed">
                Sure Shift Relocation Services provides reliable and efficient
                relocation services, ensuring your move is smooth and
                hassle-free. Trust us to handle your belongings with care and
                professionalism.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61559606034810"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand hover:bg-brand-dark transition-all-custom flex justify-center items-center rounded-full h-10 w-10 shadow-lg"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 320 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/sure.shift/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand hover:bg-brand-dark transition-all-custom flex justify-center items-center rounded-full h-10 w-10 shadow-lg"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                  </svg>
                </a>
                <a
                  href="https://x.com/Sure_Shift"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand hover:bg-brand-dark transition-all-custom flex justify-center items-center rounded-full h-10 w-10 shadow-lg"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/sureshift/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand hover:bg-brand-dark transition-all-custom flex justify-center items-center rounded-full h-10 w-10 shadow-lg"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="w-[45%] md:w-1/6">
              <h3 className="font-bold mb-6 text-brand tracking-wider">
                USEFUL LINK
              </h3>
              <ul className="space-y-4 text-gray-300">
                <li>
                  <a
                    className="hover:text-brand transition-colors"
                    href="/about_us"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-brand transition-colors"
                    href="/#contact"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-brand transition-colors"
                    href="/#tracking"
                  >
                    Tracking
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-brand transition-colors"
                    href="/login"
                  >
                    Admin Login
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-[45%] md:w-1/6">
              <h3 className="font-bold mb-6 text-brand tracking-wider">
                COMPANY
              </h3>
              <ul className="space-y-4 text-gray-300">
                <li>
                  <a className="hover:text-brand transition-colors" href="/">
                    Team
                  </a>
                </li>
                <li>
                  <a className="hover:text-brand transition-colors" href="/">
                    Career
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-brand transition-colors"
                    href="/blog"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-brand transition-colors"
                    href="/contact_us"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 space-y-6">
              <h3 className="font-bold mb-6 text-brand tracking-wider">
                CONTACT
              </h3>
              <div className="space-y-4 text-gray-300">
                <p className="flex items-start gap-3">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 384 512"
                    className="text-brand mt-1 flex-shrink-0"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path>
                  </svg>
                  <span>Gopal Nagar Extn, New Delhi, 110043</span>
                </p>
                <p className="flex items-center gap-3">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    className="text-brand flex-shrink-0"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path>
                  </svg>
                  <a
                    href="tel:+919073291732"
                    className="hover:text-brand transition-colors"
                  >
                    90 732 91 732
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    className="text-brand flex-shrink-0"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path>
                  </svg>
                  <a
                    href="mailto:info@sureshift.in"
                    className="hover:text-brand transition-colors"
                  >
                    info@sureshift.in
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    className="text-brand flex-shrink-0"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm92.49,313h0l-20,25a16,16,0,0,1-22.49,2.5h0l-67-49.72a40,40,0,0,1-15-31.23V112a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16V256l58,42.5A16,16,0,0,1,348.49,321Z"></path>
                  </svg>
                  <span>(Mon to Sun) 24 X 7</span>
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-16 pt-8 text-center flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-400 text-sm md:text-base">
              © 2024 Sure Shift Relocation Service. Made with
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="inline text-brand mx-1"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
              </svg>
              in India. Developed by
              <a
                href="https://creatorsadda.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand font-semibold"
              >
                Creators Adda.
              </a>
            </p>
            <button className="flex items-center gap-2 text-brand hover:text-white transition-all-custom font-bold group">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="text-xl group-hover:-translate-y-1 transition-transform"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 256C8 119 119 8 256 8s248 111 248 248-111 248-248 248S8 393 8 256zm143.6 28.9l72.4-75.5V392c0 13.3 10.7 24 24 24h16c13.3 0 24-10.7 24-24V209.4l72.4 75.5c9.3 9.7 24.8 9.9 34.3.4l10.9-11c9.4-9.4 9.4-24.6 0-33.9L273 107.7c-9.4-9.4-24.6-9.4-33.9 0L106.3 240.4c-9.4 9.4-9.4 24.6 0 33.9l10.9 11c9.6 9.5 25.1 9.3 34.4-.4z"></path>
              </svg>
              <span>Back To Top</span>
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default NewFooter;
