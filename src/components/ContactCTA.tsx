import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, ArrowUp, Check } from 'lucide-react';

export const ContactCTA: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    residence: '4BHK Luxury Suite (4,250 sq.ft.)',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        residence: '4BHK Luxury Suite (4,250 sq.ft.)',
        message: '',
      });
    }, 5000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative bg-[#090a0c] text-[#f4f2ec] pt-32 pb-12 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-24 items-start">
          {/* Left information */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <span className="font-sans text-xs font-semibold tracking-[0.3em] text-[#c8a97e] uppercase">
                EXCLUSIVE APPOINTMENTS
              </span>
              <h2 className="font-display text-4xl md:text-6xl font-normal tracking-[0.03em] text-[#f4f2ec] mt-2 leading-tight">
                OWN AN ICONIC PIECE OF HYDERABAD'S <span className="italic font-light text-[#c8a97e]">SKYLINE</span>
              </h2>
              <p className="font-sans text-sm text-[#a3a8b2] font-normal leading-relaxed mt-4 max-w-md">
                Experience the grandeur of Amaris by Kurra Infra firsthand. Request a private walkthrough with our luxury relationship directors.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-lg border border-white/15 flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded text-[#c8a97e] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-semibold tracking-wider text-[#f4f2ec] uppercase">SITE ADDRESS</h4>
                  <p className="font-sans text-xs text-[#a3a8b2] font-normal mt-0.5 leading-relaxed">
                    Financial District, Nanakramguda, Gachibowli, Hyderabad, Telangana 500032
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t border-white/10 pt-4">
                <div className="p-3 bg-white/10 rounded text-[#c8a97e] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-semibold tracking-wider text-[#f4f2ec] uppercase">SALES CONCIERGE</h4>
                  <p className="font-sans text-xs text-[#a3a8b2] font-normal mt-0.5">
                    +91 91000 00000 | +91 40 4000 0000
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t border-white/10 pt-4">
                <div className="p-3 bg-white/10 rounded text-[#c8a97e] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-semibold tracking-wider text-[#f4f2ec] uppercase">EMAIL INQUIRIES</h4>
                  <p className="font-sans text-xs text-[#a3a8b2] font-normal mt-0.5">
                    amaris@kurrainfra.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7 glass-panel p-8 md:p-10 rounded-lg border border-white/15">
            <div className="mb-6">
              <h3 className="font-display text-3xl font-normal text-[#f4f2ec]">
                REQUEST A <span className="italic font-light text-[#c8a97e]">PRIVATE VIEWING</span>
              </h3>
              <p className="font-sans text-xs text-[#a3a8b2] font-normal mt-1">
                Please provide your contact details to schedule your personalized presentation.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center gap-4 bg-black/60 border border-white/20 rounded p-8">
                <Check className="w-10 h-10 text-[#c8a97e]" />
                <h4 className="font-display text-2xl font-normal text-[#f4f2ec]">INQUIRY RECEIVED</h4>
                <p className="font-sans text-xs text-[#a3a8b2] max-w-md">
                  Thank you for your interest in Amaris by Kurra Infra. Our senior luxury relationship director will reach out to you within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[11px] font-semibold tracking-wider text-[#a3a8b2] uppercase">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Rao"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="font-sans bg-black/50 border border-white/15 focus:border-[#c8a97e] text-[#f4f2ec] text-xs px-4 py-3.5 rounded outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[11px] font-semibold tracking-wider text-[#a3a8b2] uppercase">
                      PHONE NUMBER *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="font-sans bg-black/50 border border-white/15 focus:border-[#c8a97e] text-[#f4f2ec] text-xs px-4 py-3.5 rounded outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[11px] font-semibold tracking-wider text-[#a3a8b2] uppercase">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="font-sans bg-black/50 border border-white/15 focus:border-[#c8a97e] text-[#f4f2ec] text-xs px-4 py-3.5 rounded outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[11px] font-semibold tracking-wider text-[#a3a8b2] uppercase">
                      PREFERRED RESIDENCE
                    </label>
                    <select
                      value={formData.residence}
                      onChange={(e) => setFormData({ ...formData, residence: e.target.value })}
                      className="font-sans bg-black/50 border border-white/15 focus:border-[#c8a97e] text-[#f4f2ec] text-xs px-4 py-3.5 rounded outline-none cursor-pointer"
                    >
                      <option value="4BHK Luxury Suite (4,250 sq.ft.)" className="bg-[#090a0c]">
                        4BHK Luxury Suite (4,250 sq.ft.)
                      </option>
                      <option value="4BHK Sky Villa (4,850 sq.ft.)" className="bg-[#090a0c]">
                        4BHK Sky Villa (4,850 sq.ft.)
                      </option>
                      <option value="Duplex Penthouse Suite" className="bg-[#090a0c]">
                        Duplex Penthouse Suite
                      </option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-[11px] font-semibold tracking-wider text-[#a3a8b2] uppercase">
                    MESSAGE / SPECIFIC REQUIREMENTS
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us your preferred floor range or viewing schedule..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="font-sans bg-black/50 border border-white/15 focus:border-[#c8a97e] text-[#f4f2ec] text-xs px-4 py-3.5 rounded outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 btn-pill btn-pill-bronze text-xs py-4 justify-center font-sans font-semibold tracking-widest uppercase"
                >
                  <span>Submit Inquiry</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-display text-2xl font-normal tracking-[0.15em] text-[#f4f2ec]">
              AMARIS
            </span>
            <span className="font-sans text-[9px] tracking-[0.25em] text-[#a3a8b2] uppercase font-medium">
              DEVELOPED BY KURRA INFRA — FINANCIAL DISTRICT, HYDERABAD
            </span>
          </div>

          <p className="font-sans text-[10px] text-[#a3a8b2] text-center max-w-md">
            Disclaimer: Images displayed are artistic renders and project frame sequences. Project details are based on Amaris by Kurra Infra specifications. TS RERA Registration Pending.
          </p>

          <button
            onClick={scrollToTop}
            className="p-3 border border-white/20 hover:border-[#c8a97e] hover:text-[#c8a97e] rounded-full text-[#f4f2ec] transition-colors"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
