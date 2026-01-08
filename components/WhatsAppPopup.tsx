import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface WhatsAppPopupProps {
  phoneNumber: string;
  defaultMessage?: string;
  companyName?: string;
  logoUrl?: string;
}

// Reusable WhatsApp Icon component
const WhatsAppIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="white"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="WhatsApp"
    className="block"
  >
    <path d="M12.04 2C6.58 2 2.16 6.42 2.16 11.88c0 1.94.51 3.83 1.48 5.48L2 22l4.78-1.6a9.8 9.8 0 0 0 5.26 1.53h.01c5.46 0 9.88-4.42 9.88-9.88 0-2.64-1.03-5.12-2.9-6.98A9.8 9.8 0 0 0 12.04 2z" />
    <path d="M17.28 14.62c-.26-.13-1.53-.75-1.77-.83-.24-.09-.42-.13-.6.13-.18.26-.69.83-.85 1-.16.17-.32.2-.58.07-.26-.13-1.1-.4-2.1-1.28-.78-.7-1.3-1.56-1.45-1.82-.15-.26-.02-.4.11-.53.12-.12.26-.32.4-.48.13-.16.18-.27.27-.44.09-.18.04-.33-.02-.46-.07-.13-.6-1.45-.82-1.98-.22-.52-.44-.45-.6-.46h-.51c-.18 0-.46.07-.7.33-.24.26-.92.9-.92 2.2s.95 2.55 1.08 2.72c.13.18 1.86 2.84 4.5 3.98.63.27 1.12.43 1.5.55.63.2 1.2.17 1.66.1.5-.08 1.53-.63 1.75-1.23.22-.6.22-1.12.15-1.23-.07-.11-.24-.18-.5-.31z" />
  </svg>
);

const WhatsAppPopup: React.FC<WhatsAppPopupProps> = ({
  phoneNumber,
  defaultMessage = "Hi, how can I help you? :)",
  companyName = "Nitso",
  logoUrl,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(defaultMessage);
  const [time, setTime] = useState("");

  // Update timestamp every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        `${now.getHours().toString().padStart(2, "0")}:${now
          .getMinutes()
          .toString()
          .padStart(2, "0")}`
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-start gap-2">
      {/* Chat Bubble */}
      {open && (
        <div className="bg-white rounded-xl shadow-xl w-72 flex flex-col overflow-hidden animate-fadeIn">
          {/* Top Bar */}
          <div className="flex justify-between items-center px-4 py-2 bg-[#2ad366]">
            <div className="flex items-center gap-2">
              <WhatsAppIcon size={18} />
              <span className="text-white font-semibold">{companyName}</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <X size={18} />
            </button>
          </div>

          {/* Message Box */}
          <div className="p-4 flex flex-col gap-2">
            <div className="flex items-start gap-3">
              {logoUrl && (
                <img
                  src={logoUrl}
                  alt={companyName}
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
              <div className="flex flex-col gap-1">
                <p className="text-[#5A9580] font-medium text-sm">
                  {companyName}
                </p>
                <p className="text-gray-800 text-sm">{message}</p>
              </div>
            </div>

            {/* Typing dots */}
            <div className="flex gap-1 mt-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300" />
            </div>

            {/* Timestamp */}
            <span className="text-gray-400 text-xs mt-1">{time}</span>
          </div>

          {/* Input + Send */}
          <div className="flex items-center p-3 gap-2 border-t border-gray-200">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message..."
              className="flex-1 border-none outline-none text-sm text-gray-900 placeholder-gray-400 bg-transparent"
            />
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#2ad366] hover:bg-[#1ebe57] w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            >
              <WhatsAppIcon size={16} />
            </a>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-14 h-14 rounded-full bg-[#2ad366] shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        title="Chat on WhatsApp"
      >
        <WhatsAppIcon size={28} />
      </button>
    </div>
  );
};

export default WhatsAppPopup;
