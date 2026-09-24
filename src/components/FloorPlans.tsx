import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FLOOR_PLANS } from '../utils/constants';
import { Maximize2, X, Compass, Check, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const FloorPlans: React.FC = () => {
  const pinSectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const modalCardRef = useRef<HTMLDivElement>(null);

  const [selectedPlan, setSelectedPlan] = useState<typeof FLOOR_PLANS[0] | null>(null);

  // Form State
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Lock background scroll when modal is open
  useEffect(() => {
    if (selectedPlan) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedPlan]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedPlan) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPlan]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 35, clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
          {
            opacity: 1,
            y: 0,
            clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      const pinSec = pinSectionRef.current;
      const track = trackRef.current;

      if (pinSec && track) {
        const totalScrollWidth = track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: -totalScrollWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: pinSec,
            start: 'top top',
            // Extra 120vh buffer after track ends — gives Lenis enough physical
            // distance to fully decelerate before the pin releases naturally.
            end: () => `+=${totalScrollWidth + window.innerHeight * 1.2}`,
            pin: true,
            pinSpacing: true,
            scrub: true,          // ← was scrub:1 (1s lag = queued momentum dumped on release)
            invalidateOnRefresh: true,
          },
        });
      }
    }, pinSectionRef);

    return () => ctx.revert();
  }, []);


  const handleOpenModal = (plan: typeof FLOOR_PLANS[0]) => {
    setSelectedPlan(plan);
    setIsSubmitted(false);
    setIsSubmitting(false);
    setErrorMessage('');
    setFullName('');
    setPhoneNumber('');
    setEmailAddress('');
    setMessage('');
  };

  const handleCloseModal = () => {
    if (modalCardRef.current) {
      gsap.to(modalCardRef.current, {
        opacity: 0,
        y: 15,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => setSelectedPlan(null),
      });
    } else {
      setSelectedPlan(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const cleanPhone = phoneNumber.replace(/[^0-9+]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid phone number (+91 / 10 digits).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailAddress.trim() || !emailRegex.test(emailAddress)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    // Lead data object for backend/email/CRM
    const leadData = {
      name: fullName.trim(),
      phone: phoneNumber.trim(),
      email: emailAddress.trim(),
      layout: `${selectedPlan?.code} — ${selectedPlan?.area}`,
      message: message.trim(),
    };
    console.log('AMARIS Layout Enquiry Lead:', leadData);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  // Ambient lighting gradient variations per card
  const ambientGradients = [
    'radial-gradient(ellipse at center, rgba(200, 169, 126, 0.16), rgba(200, 169, 126, 0.04) 40%, transparent 70%)',
    'radial-gradient(ellipse at center, rgba(220, 210, 190, 0.12), rgba(220, 210, 190, 0.03) 40%, transparent 70%)',
    'radial-gradient(ellipse at center, rgba(200, 169, 126, 0.18), rgba(200, 169, 126, 0.05) 40%, transparent 70%)',
    'radial-gradient(ellipse at center, rgba(180, 150, 110, 0.14), rgba(180, 150, 110, 0.04) 40%, transparent 70%)',
  ];

  return (
    <>
      <section
        ref={pinSectionRef}
        id="floor-plans"
        className="relative h-screen w-full bg-[#08090a] overflow-hidden flex flex-col justify-between py-10 border-t border-white/10"
      >
        {/* Subtle Dark Charcoal Architectural Stone Background Atmosphere */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(244,242,236,0.035),transparent_70%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:5rem_5rem]" />
        </div>

        {/* Ambient Room Light Sources */}
        <div className="absolute top-1/6 left-1/5 w-[500px] h-[500px] bg-[#c8a97e]/6 rounded-full blur-[160px] pointer-events-none z-0" />
        <div className="absolute bottom-1/6 right-1/5 w-[600px] h-[600px] bg-[#c8a97e]/5 rounded-full blur-[180px] pointer-events-none z-0" />

        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col md:flex-row items-start md:items-end justify-between gap-4 z-10 shrink-0">
          <div>
            <span className="font-sans text-xs font-semibold tracking-[0.12em] text-[#c8a97e] uppercase">
              RESIDENTIAL LAYOUTS
            </span>
            <h2
              ref={titleRef}
              className="font-display text-3xl md:text-5xl font-light tracking-[-0.01em] text-[#f4f2ec] uppercase leading-[0.95] mt-1"
            >
              MASTERED TO MAKE YOU <span className="text-[#c8a97e]">THRIVE</span>
            </h2>
            <p className="font-sans text-xs text-[#a3a8b2] mt-1 font-normal">
              Click any layout to enquire for pricing and detailed specifications.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-sans text-[#a3a8b2] font-medium tracking-wide bg-[#121418] px-3.5 py-1.5 rounded-full border border-white/10">
            <span>SCROLL DOWN TO EXPLORE LAYOUTS</span>
            <ArrowRight className="w-3 h-3 text-[#c8a97e]" />
          </div>
        </div>

        {/* Horizontal Track Container - Floating Panels in Space */}
        <div className="w-full flex items-center my-auto overflow-hidden z-10">
          <div
            ref={trackRef}
            className="flex items-center gap-10 md:gap-14 px-6 md:px-12 w-max will-change-transform"
          >
            {FLOOR_PLANS.map((plan, idx) => (
              <div
                key={plan.id}
                onClick={() => handleOpenModal(plan)}
                className="w-[78vw] sm:w-[380px] md:w-[440px] lg:w-[470px] shrink-0 arch-float-card p-4 md:p-5 flex flex-col justify-between group cursor-pointer"
              >
                {/* Custom Indirect Ambient Glow per Card */}
                <div
                  className="absolute -inset-9 rounded-3xl pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-500 z-[-1] filter blur-[35px]"
                  style={{ background: ambientGradients[idx % ambientGradients.length] }}
                />

                {/* Floating Image Container (Occupies ~68% Visual Attention, NO HEAVY BLACK FRAME) */}
                <div className="relative w-full aspect-[4/3] bg-[#090a0c]/80 arch-img-container mb-4 flex items-center justify-center p-3">
                  <img
                    src={plan.image}
                    alt={plan.code}
                    className="w-full h-full object-contain filter blur-[7px] contrast-110 brightness-90 group-hover:blur-[5px] transition-all duration-500"
                  />
                  
                  <div
                    className="absolute top-2.5 right-2.5 px-3 py-1 bg-black/75 hover:bg-[#c8a97e] hover:text-black text-[#f4f2ec] rounded-full transition-colors border border-white/15 font-sans text-[10px] font-semibold tracking-wider uppercase flex items-center gap-1.5"
                  >
                    <span>Enquire Layout</span>
                    <ArrowRight className="w-3 h-3 text-[#c8a97e] group-hover:text-black" />
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 px-3 py-1 bg-black/70 border border-white/10 rounded-full flex items-center gap-1.5 font-sans text-[9px] text-[#a3a8b2] font-medium uppercase tracking-wider">
                    <Compass className="w-3 h-3 text-[#c8a97e]" />
                    <span>{plan.facing}</span>
                  </div>
                </div>

                {/* Compact Information Area */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                    <div>
                      <span className="font-sans text-[9px] font-semibold tracking-[0.12em] text-[#c8a97e] uppercase">
                        LAYOUT 0{idx + 1}
                      </span>
                      <h3 className="font-sans text-sm md:text-base text-[#f4f2ec] font-semibold tracking-tight uppercase">
                        {plan.code}
                      </h3>
                    </div>
                    <span className="font-sans text-xs md:text-sm font-semibold text-[#c8a97e]">
                      {plan.area}
                    </span>
                  </div>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-sans text-[11px] text-[#a3a8b2]">
                    {plan.features.slice(0, 4).map((feat) => (
                      <li key={feat} className="flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-[#c8a97e] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Editorial Control CTA */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenModal(plan);
                    }}
                    className="mt-1 w-full py-2.5 btn-pill justify-center text-[11px] font-sans font-medium uppercase tracking-wider bg-white/5 border-white/10 hover:border-[#c8a97e]/40"
                  >
                    <span>Enquire For This Layout</span>
                    <ArrowRight className="w-3 h-3 text-[#c8a97e]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex items-center justify-between font-sans text-[11px] text-[#a3a8b2] font-medium tracking-wide shrink-0 z-10">
          <span>12 ARCHITECTURAL LAYOUT CONFIGURATIONS</span>
          <span>FINANCIAL DISTRICT, HYDERABAD</span>
        </div>
      </section>

      {/* LUXURY LAYOUT ENQUIRY FORM MODAL */}
      {selectedPlan && (
        <div
          onClick={handleCloseModal}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 md:p-6 transition-opacity duration-300"
        >
          {/* Ambient Warm Glow Behind Modal */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c8a97e]/10 rounded-full blur-[140px] pointer-events-none" />

          {/* Modal Container */}
          <div
            ref={modalCardRef}
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
            className="relative w-full max-w-xl rounded-[24px] p-7 md:p-9 overflow-hidden transition-all duration-300 shadow-[0_30px_80px_rgba(0,0,0,0.9)] max-h-[92vh] overflow-y-auto"
            style={{
              background: 'linear-gradient(135deg, rgba(22, 25, 30, 0.96) 0%, rgba(14, 15, 18, 0.98) 60%, rgba(8, 9, 10, 0.99) 100%)',
              border: '1px solid rgba(200, 169, 126, 0.35)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Top Specular Edge Highlight */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c8a97e] to-transparent pointer-events-none" />

            {/* Minimal Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 hover:bg-[#c8a97e] text-gray-400 hover:text-black border border-white/10 flex items-center justify-center transition-colors"
              title="Close Modal (ESC)"
            >
              <X className="w-4 h-4" />
            </button>

            {!isSubmitted ? (
              <div className="flex flex-col gap-6">
                {/* Header */}
                <div>
                  <span className="font-sans text-[10px] font-semibold tracking-[0.2em] text-[#c8a97e] uppercase block mb-1.5">
                    SELECTED RESIDENCE LAYOUT
                  </span>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 border border-[#c8a97e]/40 rounded-full mb-3">
                    <span className="font-sans text-xs font-semibold text-[#f4f2ec]">
                      {selectedPlan.code}
                    </span>
                    <span className="text-[#c8a97e]">•</span>
                    <span className="font-sans text-xs font-semibold text-[#c8a97e]">
                      {selectedPlan.area}
                    </span>
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl font-light tracking-[-0.01em] text-[#f4f2ec] uppercase leading-tight">
                    ENQUIRE FOR THIS LAYOUT
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-[#a3a8b2] mt-1 font-normal">
                    Share your details and our team will get in touch with you.
                  </p>
                </div>

                {/* Validation Error Alert */}
                {errorMessage && (
                  <div className="p-3.5 bg-red-950/60 border border-red-500/40 rounded-xl text-red-200 text-xs font-sans">
                    {errorMessage}
                  </div>
                )}

                {/* Enquiry Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[11px] font-semibold tracking-wider text-[#a3a8b2] uppercase">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Vikramaditya Reddy"
                      className="w-full px-4 py-3 bg-black/50 border border-white/12 rounded-xl text-sm text-[#f4f2ec] placeholder-gray-600 focus:outline-none focus:border-[#c8a97e] transition-colors"
                    />
                  </div>

                  {/* Phone & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans text-[11px] font-semibold tracking-wider text-[#a3a8b2] uppercase">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 bg-black/50 border border-white/12 rounded-xl text-sm text-[#f4f2ec] placeholder-gray-600 focus:outline-none focus:border-[#c8a97e] transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans text-[11px] font-semibold tracking-wider text-[#a3a8b2] uppercase">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        placeholder="name@domain.com"
                        className="w-full px-4 py-3 bg-black/50 border border-white/12 rounded-xl text-sm text-[#f4f2ec] placeholder-gray-600 focus:outline-none focus:border-[#c8a97e] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Preferred Layout (Pre-populated) */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[11px] font-semibold tracking-wider text-[#a3a8b2] uppercase">
                      Preferred Layout (Selected)
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={`${selectedPlan.code} (${selectedPlan.area})`}
                      className="w-full px-4 py-3 bg-[#121418] border border-white/10 rounded-xl text-xs font-semibold text-[#c8a97e] focus:outline-none cursor-default"
                    />
                  </div>

                  {/* Message / Requirements */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[11px] font-semibold tracking-wider text-[#a3a8b2] uppercase">
                      Message / Requirements (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Specify your preferred floor tier or specific architectural requirements..."
                      className="w-full px-4 py-3 bg-black/50 border border-white/12 rounded-xl text-sm text-[#f4f2ec] placeholder-gray-600 focus:outline-none focus:border-[#c8a97e] transition-colors resize-none"
                    />
                  </div>

                  {/* Primary CTA */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 w-full py-3.5 btn-pill btn-pill-bronze justify-center text-xs font-sans font-medium uppercase tracking-widest transition-all"
                  >
                    <span>{isSubmitting ? 'SUBMITTING REQUEST...' : 'REQUEST DETAILS'}</span>
                  </button>
                </form>
              </div>
            ) : (
              /* Success Confirmation State */
              <div className="flex flex-col items-center text-center py-6 gap-4">
                <div className="w-14 h-14 rounded-full bg-[#c8a97e]/20 border border-[#c8a97e] flex items-center justify-center text-[#c8a97e]">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="font-display text-4xl font-light text-[#f4f2ec] uppercase">
                  THANK YOU
                </h3>
                <p className="font-sans text-sm text-[#a3a8b2] max-w-md">
                  Our AMARIS sales concierge team will contact you shortly with the complete architectural floor plan booklet for <span className="text-[#c8a97e] font-semibold">{selectedPlan.code}</span>.
                </p>
                <button
                  onClick={handleCloseModal}
                  className="mt-4 px-8 py-3 btn-pill text-xs font-sans uppercase tracking-widest"
                >
                  Back to Layouts
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FloorPlans;
