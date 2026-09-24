import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { KURRA_IMAGES, PROJECT_STATS, getAssetUrl } from '../utils/constants';

gsap.registerPlugin(ScrollTrigger);

export const ProjectScale: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Clip-path Reveal
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 35, clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
          {
            opacity: 1,
            y: 0,
            clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Staggered Entrance Animation for Cards Grid
      if (cardsGridRef.current) {
        const cards = cardsGridRef.current.querySelectorAll('.arch-stat-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Smooth Number Counters
      PROJECT_STATS.forEach((stat, index) => {
        const el = numberRefs.current[index];
        if (!el) return;

        if (stat.isString) {
          el.innerText = stat.isString;
          return;
        }

        const counter = { value: 0 };
        const targetValue = stat.value;

        gsap.to(counter, {
          value: targetValue,
          duration: 2.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.08,
          onUpdate: () => {
            if (stat.isDecimal) {
              el.innerText = counter.value.toFixed(2);
            } else if (stat.formatted) {
              el.innerText = Math.floor(counter.value).toLocaleString();
            } else {
              el.innerText = Math.floor(counter.value).toString();
            }
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="scale"
      className="relative min-h-screen py-36 bg-[#08090a] overflow-hidden flex flex-col justify-center border-t border-white/10"
    >
      {/* Background Architectural Building Atmosphere - Clearly Visible & Blended */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={getAssetUrl('experience/exterior_twin_towers.jpg')}
          alt="Amaris Twin Towers Background Silhouette"
          className="w-full h-full object-cover filter brightness-[0.55] contrast-[110%] opacity-65 scale-105"
        />
        {/* Seamless Vignette Gradients for Dark Obsidian Blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090a] via-black/40 to-[#08090a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#08090a_90%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Ambient Warm Lighting Glow Sources */}
      <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-[#c8a97e]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/6 w-[450px] h-[450px] bg-[#c8a97e]/8 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Header */}
        <div className="flex flex-col items-start mb-20">
          <span className="font-sans text-xs font-semibold tracking-[0.12em] text-[#c8a97e] uppercase mb-2">
            ARCHITECTURAL SPECIFICATIONS
          </span>
          <h2
            ref={titleRef}
            className="font-display text-4xl sm:text-6xl font-light tracking-[-0.01em] text-[#f4f2ec] uppercase leading-[0.95]"
          >
            THE SCALE OF <span className="text-[#c8a97e]">AMARIS</span>
          </h2>
        </div>

        {/* 4x2 Cards Grid with Boundaries, Gloss Effect, Top Specular Highlight, and Drop Shadows */}
        <div
          ref={cardsGridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {PROJECT_STATS.map((stat, index) => (
            <div
              key={stat.label}
              className="arch-stat-card relative rounded-2xl p-7 md:p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 group"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(18, 20, 24, 0.88) 45%, rgba(10, 11, 14, 0.95) 100%)',
                border: '1px solid rgba(200, 169, 126, 0.28)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.75), 0 0 25px rgba(200, 169, 126, 0.12)',
                backdropFilter: 'blur(16px)',
              }}
            >
              {/* Gloss Sheen Reflection Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_30%,transparent_60%)] pointer-events-none" />

              {/* Specular Light Edge Along Top Border */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c8a97e]/70 to-transparent pointer-events-none" />

              {/* Hover Boundary Glow */}
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[#c8a97e]/60 transition-colors duration-500 pointer-events-none" />

              {/* Number Container */}
              <div className="relative z-10 flex items-baseline gap-1.5 mb-6">
                {stat.prefix && (
                  <span className="font-display text-2xl md:text-3xl font-light text-[#c8a97e]">
                    {stat.prefix}
                  </span>
                )}
                <span
                  ref={(el) => (numberRefs.current[index] = el)}
                  className="font-display text-5xl md:text-6xl font-light text-[#f4f2ec] tracking-tight group-hover:text-white transition-colors"
                >
                  0
                </span>
                {!stat.isString && stat.suffix && (
                  <span className="font-display text-xl md:text-2xl font-light text-[#c8a97e]">
                    {stat.suffix}
                  </span>
                )}
              </div>

              {/* Documentation Line & Label */}
              <div className="relative z-10 border-t border-white/10 pt-4 flex flex-col gap-1">
                <div className="w-6 h-[1px] bg-[#c8a97e]/60 mb-1" />
                <span className="font-sans text-[11px] font-medium tracking-[0.12em] text-[#a3a8b2] uppercase group-hover:text-[#f4f2ec] transition-colors">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
