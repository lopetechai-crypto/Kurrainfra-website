import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPERIENCE_SCENES, getAssetUrl } from '../utils/constants';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const ExperienceAmaris: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

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

      EXPERIENCE_SCENES.forEach((scene, index) => {
        const rowEl = rowRefs.current[index];
        if (!rowEl) return;

        const imageBox = rowEl.querySelector('.directional-image-box');
        const textBox = rowEl.querySelector('.directional-text-box');

        if (imageBox) {
          const isLeft = scene.direction === 'left';
          const startX = isLeft ? -90 : 90;

          gsap.fromTo(
            imageBox,
            { xPercent: startX, opacity: 0.2 },
            {
              xPercent: 0,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: rowEl,
                start: 'top 85%',
                end: 'top 20%',
                scrub: 0.8,
              },
            }
          );
        }

        if (textBox) {
          gsap.fromTo(
            textBox,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: rowEl,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative min-h-screen py-36 bg-[#08090a] overflow-hidden border-t border-white/10"
    >
      {/* Background Architectural Building Atmosphere - Clearly Visible & Blended */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={getAssetUrl('experience/exterior_architectural_panorama.jpg')}
          alt="Amaris Architectural Panorama Background Atmosphere"
          className="w-full h-full object-cover filter brightness-[0.55] contrast-[110%] opacity-65 scale-105"
        />
        {/* Seamless Vignette Gradients for Dark Obsidian Blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090a] via-black/40 to-[#08090a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#08090a_90%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Ambient Warm Lighting Glow Sources */}
      <div className="absolute top-1/3 left-1/5 w-[500px] h-[500px] bg-[#c8a97e]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/5 w-[550px] h-[550px] bg-[#c8a97e]/8 rounded-full blur-[160px] pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center mb-28">
        <span className="font-sans text-xs font-semibold tracking-[0.12em] text-[#c8a97e] uppercase">
          CURATED ARCHITECTURAL PANORAMAS
        </span>
        <h2
          ref={titleRef}
          className="font-display text-5xl sm:text-7xl font-light tracking-[-0.01em] text-[#f4f2ec] uppercase mt-3 leading-[0.95]"
        >
          EXPERIENCE <span className="text-[#c8a97e]">AMARIS</span>
        </h2>
        <p className="font-sans text-sm md:text-base text-[#a3a8b2] font-normal mt-4 max-w-xl mx-auto">
          Eight visual chapters of elevated residential craftsmanship.
        </p>
      </div>

      {/* 8 Glossy Glass Cell Gallery Rows with Rounded Edges, Outer Boundaries & Drop Shadows */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-28">
        {EXPERIENCE_SCENES.map((scene, index) => {
          const isLeft = scene.direction === 'left';

          return (
            <div
              key={scene.id}
              ref={(el) => (rowRefs.current[index] = el)}
              className={`flex flex-col ${
                isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-8 lg:gap-14 items-center`}
            >
              {/* Outer Glass Cell Card with Boundaries, Specular Highlight, Gloss & Drop Shadows */}
              <div
                className="w-full lg:w-7/12 relative rounded-[22px] p-4.5 md:p-6 overflow-hidden transition-all duration-500 group"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(18, 20, 24, 0.88) 45%, rgba(10, 11, 14, 0.95) 100%)',
                  border: '1px solid rgba(200, 169, 126, 0.28)',
                  boxShadow: '0 24px 60px rgba(0, 0, 0, 0.75), 0 0 30px rgba(200, 169, 126, 0.10)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                {/* Gloss Sheen Reflection Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_30%,transparent_60%)] pointer-events-none" />

                {/* Specular Light Edge Along Top Border */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c8a97e]/70 to-transparent pointer-events-none" />

                {/* Hover Boundary Glow */}
                <div className="absolute inset-0 rounded-[22px] border border-transparent group-hover:border-[#c8a97e]/60 transition-colors duration-500 pointer-events-none" />

                {/* Inner Image Container with Rounded Edges (rounded-16px) */}
                <div className="directional-image-box relative w-full aspect-[16/10] rounded-[16px] overflow-hidden">
                  <img
                    src={scene.image}
                    alt={scene.title}
                    className="w-full h-full object-cover filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Top Left Glass Pill Badge */}
                  <div className="absolute top-4 left-4 px-3.5 py-1.5 bg-black/70 backdrop-blur-md border border-white/20 rounded-full">
                    <span className="font-sans text-[10px] tracking-[0.12em] font-semibold text-[#f4f2ec] uppercase">
                      {scene.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Text Box */}
              <div className="directional-text-box w-full lg:w-5/12 flex flex-col items-start px-2">
                <span className="font-sans text-[11px] font-semibold tracking-[0.12em] text-[#c8a97e] uppercase mb-2">
                  SCENE 0{scene.id}
                </span>

                <div className="flex items-center gap-3 mb-2 group cursor-pointer">
                  <h3 className="font-display text-3xl md:text-5xl font-light tracking-tight text-[#f4f2ec] uppercase leading-[1.0] group-hover:text-[#c8a97e] transition-colors">
                    {scene.title}
                  </h3>
                  <ArrowRight className="w-5 h-5 text-[#c8a97e] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>

                <p className="font-sans text-xs md:text-sm font-semibold tracking-[0.12em] text-[#a3a8b2] mb-5 uppercase">
                  {scene.subtitle}
                </p>

                <p className="font-sans text-sm md:text-base text-[#a3a8b2] font-normal leading-[1.65] mb-6">
                  {scene.description}
                </p>

                <div className="w-12 h-[1px] bg-[#c8a97e]/60" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
