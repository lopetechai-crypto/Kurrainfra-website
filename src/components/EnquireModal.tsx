import React, { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';

interface EnquireModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnquireModal: React.FC<EnquireModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    residence: '4BHK Luxury Suite',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-[#0a0b0d] border border-white/20 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <span className="text-[10px] font-semibold tracking-[0.25em] text-gray-400 uppercase">
            VIP PRIVATE INQUIRY
          </span>
          <h3 className="text-2xl font-bold text-white mt-1">
            Executive <span className="gold-gradient-text">Presentation</span>
          </h3>
        </div>

        {submitted ? (
          <div className="py-8 flex flex-col items-center justify-center text-center gap-3">
            <CheckCircle2 className="w-10 h-10 text-[#d4af37]" />
            <h4 className="text-lg font-bold text-white">CONFIRMED</h4>
            <p className="text-xs text-gray-300">
              Our Relationship Director will reach out to you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-semibold text-gray-300 uppercase tracking-wider">
                FULL NAME
              </label>
              <input
                type="text"
                required
                placeholder="Enter full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-black/50 border border-white/15 focus:border-white text-white text-xs px-4 py-3.5 rounded-xl outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-semibold text-gray-300 uppercase tracking-wider">
                PHONE NUMBER
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-black/50 border border-white/15 focus:border-white text-white text-xs px-4 py-3.5 rounded-xl outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-semibold text-gray-300 uppercase tracking-wider">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-black/50 border border-white/15 focus:border-white text-white text-xs px-4 py-3.5 rounded-xl outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-semibold text-gray-300 uppercase tracking-wider">
                RESIDENCE SELECTION
              </label>
              <select
                value={formData.residence}
                onChange={(e) => setFormData({ ...formData, residence: e.target.value })}
                className="bg-black/50 border border-white/15 focus:border-white text-white text-xs px-4 py-3.5 rounded-xl outline-none cursor-pointer"
              >
                <option value="4BHK Luxury Suite" className="bg-[#0a0b0d]">
                  4BHK Luxury Suite (4,250 sq.ft.)
                </option>
                <option value="4BHK Sky Villa" className="bg-[#0a0b0d]">
                  4BHK Sky Villa (4,850 sq.ft.)
                </option>
                <option value="Duplex Penthouse" className="bg-[#0a0b0d]">
                  Duplex Penthouse Suite
                </option>
              </select>
            </div>

            <button
              type="submit"
              className="mt-3 btn-pill btn-pill-gold text-xs py-3.5 justify-center font-bold tracking-wider"
            >
              <span>Submit Inquiry</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
