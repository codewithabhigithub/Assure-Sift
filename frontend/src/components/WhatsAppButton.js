import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "919073291732";
  const message = "Hello, Sure Shift!";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-6 w-14 h-14 flex items-center justify-center bg-green-500 text-white rounded-full shadow-2xl transition-all-custom hover:bg-green-600 hover:scale-110 z-50 animate-bounce"
      aria-label="Chat with us on WhatsApp"
    >
      <FaWhatsapp className="text-3xl" />
    </a>
  );
};

export default WhatsAppButton;
