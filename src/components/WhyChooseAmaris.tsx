import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { KURRA_IMAGES, AMARIS_HIGHLIGHTS, getAssetUrl } from '../utils/constants';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const WhyChooseAmaris: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (collageRef.current) {
        const cards = collageRef.current.querySelectorAll('.arch-grid-img');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: collageRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

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

      if (itemsRef.current) {
        const items = itemsRef.current.querySelectorAll('.highlight-card');
        gsap.fromTo(
          items,
          { opacity: 0, x: 25 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: itemsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const gridImages = [
    {
      src: getAssetUrl('experience/exterior_twin_towers.jpg'),
      alt: 'Amaris Twin Towers Silhouette',
      label: 'EXTERIOR ELEVATION',
    },
    {
      src: getAssetUrl('experience/interior_grand_lobby.jpg'),
      alt: 'Amaris Triple-Height Grand Lobby',
      label: 'TRIPLE-HEIGHT LOBBY',
    },
    {
      src: getAssetUrl('experience/clubhouse_facade.jpg'),
      alt: 'Amaris Luxury Clubhouse Facade',
      label: '81,840 SQ.FT. CLUBHOUSE',
    },
    {
      src: getAssetUrl('experience/interior_living_dining.jpg'),
      alt: 'Amaris Double-Height Family Room',
      label: 'PANORAMIC RESIDENCES',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="why-amaris"
      className="relative min-h-screen py-36 bg-[#08090a] flex items-center overflow-hidden border-t border-white/10"
    >
      {/* Background Architectural Clubhouse Building Atmosphere - Clearly Visible & Blended */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={getAssetUrl('experience/clubhouse_facade.jpg')}
          alt="Amaris Clubhouse Facade Background Atmosphere"
          className="w-full h-full object-cover filter brightness-[0.55] contrast-[110%] opacity-65 scale-105"
        />
        {/* Seamless Vignette Gradients for Dark Obsidian Blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090a] via-black/40 to-[#08090a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#08090a_90%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Ambient Warm Lighting Glow Sources */}
      <div className="absolute top-1/4 right-1/6 w-96 h-96 bg-[#c8a97e]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/6 w-[450px] h-[450px] bg-[#c8a97e]/8 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* LEFT: Bigger Expansive Borderless 2x2 Architectural Grid (lg:col-span-7) */}
        <div
          ref={collageRef}
          className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7 w-full"
        >
          {gridImages.map((img, idx) => (
            <div
              key={img.label}
              className="arch-grid-img relative rounded-[22px] overflow-hidden transition-all duration-500 group cursor-pointer border-0 shadow-[0_24px_60px_rgba(0,0,0,0.85)]"
              style={{ border: 'none' }}
            >
              {/* Soft Indirect Ambient Illumination Glow Behind Panel (NO BORDERS) */}
              <div className="absolute -inset-8 bg-[#c8a97e]/12 rounded-3xl blur-[35px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Borderless Image Container with Rounded Edges */}
              <div className="relative w-full aspect-[16/11] rounded-[22px] overflow-hidden bg-[#0e0f12]">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover filter brightness-95 contrast-105 group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                {/* Subtle Dark Gradient Overlay for Depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                {/* Minimal Borderless Glass Label */}
                <div className="absolute bottom-3 left-3 right-3 px-3.5 py-2 bg-black/60 backdrop-blur-md rounded-xl flex items-center justify-between pointer-events-none">
                  <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.14em] font-medium text-[#f4f2ec] uppercase truncate">
                    {img.label}
                  </span>
                  <span className="font-sans text-[10px] font-semibold text-[#c8a97e] shrink-0 ml-2">
                    0{idx + 1}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: Content with Thin Geometric Headings (lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col items-start">
          <span className="font-sans text-xs font-semibold tracking-[0.12em] text-[#c8a97e] uppercase mb-2">
            DISTINCTION & PRIVILEGE
          </span>

          <h2
            ref={titleRef}
            className="font-display text-4xl sm:text-6xl font-light tracking-[-0.01em] text-[#f4f2ec] uppercase leading-[0.95] mb-6"
          >
            WHY CHOOSE <span className="text-[#c8a97e]">AMARIS</span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#a3a8b2] font-normal leading-[1.65] mb-8">
            Designed for those who view living space as an extension of their personal achievements, Amaris integrates luxury engineering with peaceful, private sanctuaries.
          </p>

          <div ref={itemsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4.5 w-full">
            {AMARIS_HIGHLIGHTS.map((item) => (
              <div
                key={item.title}
                className="highlight-card nord-card p-5.5 flex flex-col gap-2"
              >
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#c8a97e] shrink-0" />
                  <h3 className="font-sans text-sm font-semibold text-[#f4f2ec]">
                    {item.title}
                  </h3>
                </div>
                <p className="font-sans text-xs text-[#a3a8b2] font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
