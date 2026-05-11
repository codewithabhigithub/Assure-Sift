import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "919073291732";
  const message = "Hello, Assure Sift Relocation!";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-10 right-10 w-14 h-14 flex items-center justify-center bg-accent text-white rounded-full shadow-hover transition-premium hover:translate-y-[-5px] z-50"
      aria-label="Chat with us on WhatsApp"
    >
      <FaWhatsapp className="text-2xl" />
    </a>
  );
};

export default WhatsAppButton;
