import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { KURRA_IMAGES } from '../utils/constants';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const WelcomeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = sectionRef.current;
      if (!container) return;

      // Scrubbed GSAP Timeline tied to pinned section scroll distance (220vh)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=220%',
          pin: true,
          pinSpacing: true,
          scrub: true,       // ← was scrub:0.5 (500ms lag caused momentum throw on pin release)
          invalidateOnRefresh: true,
        },
      });

      // 1. Text Group moves smoothly to the LEFT while scaling & reducing opacity
      if (textGroupRef.current) {
        tl.to(
          textGroupRef.current,
          {
            x: '-55vw',
            opacity: 0.2,
            scale: 0.95,
            ease: 'none',
            duration: 1,
          },
          0
        );
      }

      // 2. CTA button fades out as text moves left
      if (ctaRef.current) {
        tl.to(
          ctaRef.current,
          {
            opacity: 0,
            y: 20,
            ease: 'none',
            duration: 0.6,
          },
          0.1
        );
      }

      // 3. Dark Overlay reduces opacity (0.85 -> 0.15) to reveal illuminated building
      if (overlayRef.current) {
        tl.to(
          overlayRef.current,
          {
            opacity: 0.15,
            ease: 'none',
            duration: 1,
          },
          0
        );
      }

      // 4. Building image scales & brightens into a hero architectural camera reveal
      if (imageRef.current) {
        tl.to(
          imageRef.current,
          {
            scale: 1.08,
            filter: 'brightness(1.12) contrast(115%)',
            ease: 'none',
            duration: 1,
          },
          0
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="welcome"
      className="relative w-full h-screen bg-[#090a0c] overflow-hidden border-t border-white/10"
    >
      {/* Full-Screen Building Image Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <img
          ref={imageRef}
          src={KURRA_IMAGES.heroReveal}
          alt="Amaris Architecture Reveal"
          className="w-full h-full object-cover will-change-transform filter brightness-[0.75] contrast-[105%]"
          style={{ transformOrigin: 'center center' }}
        />
      </div>

      {/* Atmospheric Dark Overlay Layer (Animates 0.85 -> 0.15 on scroll) */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/85 z-10 pointer-events-none will-change-opacity"
      />

      {/* Centered Text Composition Layer (Animates X: 0 -> -55vw on scroll) */}
      <div className="relative z-20 w-full h-full max-w-[1500px] mx-auto px-6 md:px-12 flex items-center justify-center pointer-events-none">
        <div
          ref={textGroupRef}
          className="flex flex-col items-center text-center max-w-4xl will-change-transform pointer-events-auto"
        >
          <span className="font-sans text-xs font-semibold tracking-[0.3em] text-[#c8a97e] uppercase mb-4">
            AN ARCHITECTURAL POEM IN HYDERABAD
          </span>

          {/* Cormorant Garamond Heading */}
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-normal tracking-[0.03em] text-[#f4f2ec] leading-[1.05] mb-8">
            WELCOME TO <span className="italic font-light text-[#c8a97e]">AMARIS</span>
          </h2>

          <div className="w-16 h-[1px] bg-[#c8a97e]/40 my-2" />

          {/* Editorial Architectural Quote */}
          <p className="font-display text-xl sm:text-3xl font-normal italic text-[#f4f2ec] leading-relaxed max-w-3xl my-6">
            "At Amaris, a home is more than brick and mortar. It is a reflection of life's most meaningful moments."
          </p>

          {/* Body Copy - Manrope */}
          <p className="font-sans text-sm md:text-base text-[#a3a8b2] font-normal leading-relaxed max-w-2xl">
            Set in Hyderabad's prestigious Financial District, Amaris unfolds across a naturally contoured landscape, with two iconic G+50 towers centred around an exclusive clubhouse.
          </p>

          {/* CTA Button */}
          <div ref={ctaRef} className="mt-10">
            <a
              href="#why-amaris"
              className="btn-pill group text-xs px-7 py-3 uppercase tracking-widest font-sans font-medium"
            >
              <span>Discover Distinction</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#c8a97e]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
