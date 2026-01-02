import React, { useState, useEffect } from "react";
import { Phone, X } from "lucide-react";

interface WhatsAppPopupProps {
  phoneNumber: string;
  defaultMessage?: string;
  companyName?: string;
  logoUrl?: string;
}

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
      setTime(`${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2">

      {/* Chat Bubble */}
      {open && (
        <div className="bg-white rounded-xl shadow-xl w-72 flex flex-col animate-fadeIn overflow-hidden">
          
          {/* Top Bar */}
          <div className="flex justify-between items-center px-4 py-2 bg-[#3BC45D] rounded-t-xl">
            <div className="flex items-center gap-2">
              <Phone size={18} className="text-white" />
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
                <p className="text-[#5A9580] font-medium text-sm">{companyName}</p>
                <p className="text-gray-800 text-sm">{message}</p>
              </div>
            </div>

            {/* Typing dots animation */}
            <div className="flex gap-1 mt-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-0"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
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
              className="bg-[#25D366] hover:bg-[#1ebe57] w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            >
              <Phone size={16} className="text-white" />
            </a>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-[#25D366] shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform"
        title="Chat on WhatsApp"
      >
        <Phone size={22} />
      </button>
    </div>
  );
};

export default WhatsAppPopup;