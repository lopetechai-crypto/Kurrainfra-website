import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Navigation as NavIcon, MapPin, Building2, ShieldPlus, Compass, Car, Sparkles } from 'lucide-react';
import { getAssetUrl } from '../utils/constants';

gsap.registerPlugin(ScrollTrigger);

// Exact Published Amaris Location Data
const LOCATION_CATEGORIES = [
  { id: 'all', label: 'ALL DESTINATIONS' },
  { id: 'tech', label: 'TECH HUB' },
  { id: 'connectivity', label: 'CONNECTIVITY' },
  { id: 'healthcare', label: 'HEALTHCARE' },
  { id: 'lifestyle', label: 'LIFESTYLE' },
];

const DESTINATIONS = [
  { name: 'NVIDIA', distance: 0.1, category: 'tech', highlighted: true, mapPos: { x: 34, y: 38 } },
  { name: 'Google Data Center', distance: 0.2, category: 'tech', highlighted: true, mapPos: { x: 62, y: 32 } },
  { name: 'Capgemini', distance: 0.6, category: 'tech', mapPos: { x: 74, y: 44 } },
  { name: 'Hyatt', distance: 0.6, category: 'lifestyle', mapPos: { x: 28, y: 62 } },
  { name: 'Continental Hospital', distance: 0.65, category: 'healthcare', highlighted: true, mapPos: { x: 38, y: 72 } },
  { name: 'Amazon', distance: 0.8, category: 'tech', mapPos: { x: 80, y: 55 } },
  { name: 'Outer Ring Road (ORR)', distance: 0.8, category: 'connectivity', highlighted: true, mapPos: { x: 18, y: 22 } },
  { name: 'ISB Road', distance: 1.0, category: 'connectivity', mapPos: { x: 50, y: 18 } },
  { name: 'Cognizant', distance: 1.1, category: 'tech', mapPos: { x: 84, y: 68 } },
  { name: 'Sheraton', distance: 1.3, category: 'lifestyle', mapPos: { x: 70, y: 78 } },
  { name: 'Wipro', distance: 1.8, category: 'tech', mapPos: { x: 88, y: 82 } },
  { name: 'Financial District Circle', distance: 1.8, category: 'connectivity', mapPos: { x: 55, y: 86 } },
  { name: 'Apollo Hospital', distance: 2.3, category: 'healthcare', mapPos: { x: 22, y: 85 } },
  { name: 'Star Hospital', distance: 2.8, category: 'healthcare', mapPos: { x: 14, y: 75 } },
  { name: 'Rainbow Hospital', distance: 2.8, category: 'healthcare', mapPos: { x: 12, y: 60 } },
];

// Connection lines to draw outward from Amaris (center 50%, 50%)
const CONNECTION_LINES = [
  { target: 'NVIDIA', x: 34, y: 38, distance: '0.1 KM' },
  { target: 'Google Data Center', x: 62, y: 32, distance: '0.2 KM' },
  { target: 'Continental Hospital', x: 38, y: 72, distance: '0.65 KM' },
  { target: 'Outer Ring Road (ORR)', x: 18, y: 22, distance: '0.8 KM' },
];

export const LocationSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapCanvasRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const svgLinesRef = useRef<SVGSVGElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const [activeCategory, setActiveCategory] = useState('all');
  const [zoomLevel, setZoomLevel] = useState(1);

  const filteredDestinations = activeCategory === 'all'
    ? DESTINATIONS
    : DESTINATIONS.filter((d) => d.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
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

      // Map Container Fade & Subtle Camera Zoom
      if (mapCanvasRef.current) {
        gsap.fromTo(
          mapCanvasRef.current,
          { opacity: 0, scale: 0.94 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: mapContainerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animated Architectural Connection Lines Drawing Outward
      if (svgLinesRef.current) {
        const lines = svgLinesRef.current.querySelectorAll('.arch-line');
        lines.forEach((line) => {
          const path = line as SVGPathElement;
          const length = path.getTotalLength ? path.getTotalLength() : 200;
          gsap.fromTo(
            path,
            { strokeDasharray: length, strokeDashoffset: length },
            {
              strokeDashoffset: 0,
              duration: 1.6,
              stagger: 0.2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: mapContainerRef.current,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }

      // Staggered Entrance for Location List Items
      if (listRef.current) {
        const items = listRef.current.querySelectorAll('.location-item');
        gsap.fromTo(
          items,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animated Distance Numbers (e.g. 0.0 KM -> 0.65 KM)
      DESTINATIONS.forEach((dest, idx) => {
        const el = numberRefs.current[idx];
        if (!el) return;

        const counter = { val: 0 };
        gsap.to(counter, {
          val: dest.distance,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
          delay: idx * 0.04,
          onUpdate: () => {
            el.innerText = counter.val >= 10 ? counter.val.toFixed(1) : counter.val.toFixed(2);
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section
      ref={sectionRef}
      id="location"
      className="relative min-h-screen py-36 bg-[#08090a] overflow-hidden flex flex-col justify-center border-t border-white/10"
    >
      {/* Background Architectural Skyline Atmosphere - Clearly Visible & Blended */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={getAssetUrl('experience/exterior_night_skyline.jpg')}
          alt="Amaris Location Skyline Background Atmosphere"
          className="w-full h-full object-cover filter brightness-[0.55] contrast-[110%] opacity-65 scale-105"
        />
        {/* Seamless Vignette Gradients for Dark Obsidian Blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090a] via-black/40 to-[#08090a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#08090a_90%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Ambient Warm Lighting Glow Sources */}
      <div className="absolute top-1/4 right-1/5 w-[500px] h-[500px] bg-[#c8a97e]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/5 w-[550px] h-[550px] bg-[#c8a97e]/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
          <div className="max-w-3xl">
            <span className="font-sans text-xs font-semibold tracking-[0.12em] text-[#c8a97e] uppercase mb-2 block">
              PRIME LOCATION & CONNECTIVITY
            </span>
            <h2
              ref={titleRef}
              className="font-display text-4xl sm:text-6xl font-light tracking-[-0.01em] text-[#f4f2ec] uppercase leading-[0.95]"
            >
              CONNECTED TO <span className="text-[#c8a97e]">WHAT MATTERS</span>
            </h2>
            <p className="font-sans text-sm md:text-base text-[#a3a8b2] font-normal leading-[1.65] mt-4">
              "Positioned in Hyderabad's Financial District, Amaris places the city's leading technology campuses, healthcare, education and major road networks within easy reach."
            </p>
          </div>

          {/* Exact Google Maps Redirect Button */}
          <a
            href="https://maps.app.goo.gl/8MHjU5nkozK25Nef8"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill btn-pill-bronze px-7 py-3 text-xs font-sans font-medium uppercase tracking-wider flex items-center gap-2.5 shrink-0 group"
          >
            <span>View on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Highlight Cards: TECH HUB & ORR CONNECTIVITY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* 1. TECH HUB HIGHLIGHT */}
          <div
            className="md:col-span-2 relative rounded-[20px] p-6 md:p-7 overflow-hidden transition-all duration-500 group"
            style={{
              background: 'linear-gradient(135deg, rgba(200, 169, 126, 0.12) 0%, rgba(18, 20, 24, 0.90) 50%, rgba(10, 11, 14, 0.96) 100%)',
              border: '1px solid rgba(200, 169, 126, 0.35)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.75), 0 0 25px rgba(200, 169, 126, 0.12)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c8a97e] to-transparent pointer-events-none" />
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="w-4 h-4 text-[#c8a97e]" />
              <span className="font-sans text-[11px] font-semibold tracking-[0.14em] text-[#c8a97e] uppercase">
                PREMIUM TECH HUB PROXIMITY
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="bg-black/40 p-4 rounded-xl border border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="font-sans text-sm font-semibold text-[#f4f2ec]">NVIDIA CAMPUS</h4>
                  <span className="font-sans text-[11px] text-[#a3a8b2]">IMMEDIATE ADJACENCY</span>
                </div>
                <span className="font-display text-2xl font-light text-[#c8a97e]">0.1 KM</span>
              </div>
              <div className="bg-black/40 p-4 rounded-xl border border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="font-sans text-sm font-semibold text-[#f4f2ec]">GOOGLE DATA CENTER</h4>
                  <span className="font-sans text-[11px] text-[#a3a8b2]">HYDERABAD HQ</span>
                </div>
                <span className="font-display text-2xl font-light text-[#c8a97e]">0.2 KM</span>
              </div>
            </div>
          </div>

          {/* 2. ORR HIGHLIGHT */}
          <div
            className="relative rounded-[20px] p-6 md:p-7 flex flex-col justify-between overflow-hidden transition-all duration-500 group"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(18, 20, 24, 0.88) 45%, rgba(10, 11, 14, 0.95) 100%)',
              border: '1px solid rgba(200, 169, 126, 0.35)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.75), 0 0 25px rgba(200, 169, 126, 0.10)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c8a97e] to-transparent pointer-events-none" />
            <div className="flex items-center gap-2 mb-2">
              <Car className="w-4 h-4 text-[#c8a97e]" />
              <span className="font-sans text-[11px] font-semibold tracking-[0.14em] text-[#c8a97e] uppercase">
                EXPRESS ARTERY
              </span>
            </div>
            <div>
              <span className="font-display text-5xl font-light text-[#c8a97e] block leading-none mb-1">
                0.8 KM
              </span>
              <span className="font-sans text-xs font-semibold text-[#f4f2ec] uppercase tracking-wider block">
                OUTER RING ROAD (ORR)
              </span>
              <span className="font-sans text-[11px] text-[#a3a8b2] mt-1 block">
                Direct uninterrupted highway access to Airport & Gachibowli
              </span>
            </div>
          </div>
        </div>

        {/* MAIN LAYOUT: LEFT DIRECT GOOGLE MAP (60%) | RIGHT LOCATION LIST (40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: Live Embedded Google Map Container (lg:col-span-7) */}
          <div
            ref={mapContainerRef}
            className="lg:col-span-7 relative h-[540px] sm:h-[620px] w-full rounded-[24px] overflow-hidden border border-[#c8a97e]/35 shadow-[0_24px_70px_rgba(0,0,0,0.85)] bg-[#090a0d] group"
          >
            {/* Top Specular Edge Line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c8a97e] to-transparent pointer-events-none z-30" />

            {/* Map Header Overlay */}
            <div className="absolute top-4 left-4 z-20 px-4 py-2 bg-black/85 backdrop-blur-md rounded-full border border-white/20 flex items-center gap-2.5 shadow-2xl">
              <Compass className="w-4 h-4 text-[#c8a97e]" />
              <span className="font-sans text-[11px] font-semibold text-[#f4f2ec] uppercase tracking-wider">
                FINANCIAL DISTRICT, NANAKRAMGUDA
              </span>
              <span className="font-sans text-[9px] text-[#c8a97e] font-mono hidden sm:inline">
                (17.4152° N, 78.3454° E)
              </span>
            </div>

            {/* Bottom Floating Direct Google Maps Redirect Badge */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
              <div className="px-3.5 py-2 bg-black/85 backdrop-blur-md rounded-xl border border-white/15 hidden sm:flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#c8a97e]" />
                <span className="font-sans text-[10px] font-semibold text-[#f4f2ec] uppercase tracking-wider">
                  AMARIS BY KURRA INFRA
                </span>
              </div>

              <a
                href="https://maps.app.goo.gl/8MHjU5nkozK25Nef8"
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto btn-pill btn-pill-bronze px-5 py-2.5 text-[11px] font-sans font-medium uppercase tracking-wider flex items-center gap-2 shadow-2xl ml-auto group"
              >
                <span>Open Direct Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* DIRECT LIVE GOOGLE MAPS IFRAME EMBED */}
            <div
              ref={mapCanvasRef}
              data-lenis-prevent
              className="w-full h-full transition-opacity duration-700"
            >
              <iframe
                title="Amaris by Kurra Infra Direct Google Map"
                src="https://maps.google.com/maps?q=17.4152375,78.3454219&hl=en&z=16&output=embed"
                className="w-full h-full border-0 filter contrast-[105%] brightness-[92%] saturate-[90%]"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* RIGHT: Location Information & Cinematic Distance List (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col w-full">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
              {LOCATION_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-[10px] font-sans font-medium tracking-[0.12em] uppercase transition-all whitespace-nowrap border ${
                      isActive
                        ? 'bg-[#c8a97e] text-black border-[#c8a97e] font-semibold shadow-[0_0_15px_rgba(200,169,126,0.35)]'
                        : 'bg-white/5 text-[#a3a8b2] border-white/10 hover:border-[#c8a97e]/40 hover:text-[#f4f2ec]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Cinematic Destination Distance List */}
            <div ref={listRef} className="flex flex-col gap-3.5 max-h-[480px] overflow-y-auto pr-2 no-scrollbar">
              {filteredDestinations.map((dest, idx) => (
                <div
                  key={dest.name}
                  className={`location-item p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between group ${
                    dest.highlighted
                      ? 'bg-gradient-to-r from-[#c8a97e]/12 via-[#121418] to-[#0a0b0e] border-[#c8a97e]/40'
                      : 'bg-[#121418]/70 border-white/8 hover:border-[#c8a97e]/30'
                  }`}
                >
                  {/* Left: Icon & Name */}
                  <div className="flex items-center gap-3">
                    {dest.category === 'tech' && <Building2 className="w-4 h-4 text-[#c8a97e] shrink-0" />}
                    {dest.category === 'connectivity' && <Car className="w-4 h-4 text-[#c8a97e] shrink-0" />}
                    {dest.category === 'healthcare' && <ShieldPlus className="w-4 h-4 text-[#c8a97e] shrink-0" />}
                    {dest.category === 'lifestyle' && <Sparkles className="w-4 h-4 text-[#c8a97e] shrink-0" />}

                    <span className="font-sans text-xs md:text-sm font-semibold tracking-wide text-[#f4f2ec] uppercase group-hover:text-[#c8a97e] transition-colors">
                      {dest.name}
                    </span>
                  </div>

                  {/* Leader Line */}
                  <div className="border-b border-dashed border-white/15 flex-1 mx-3 hidden sm:block" />

                  {/* Right: Distance Counter */}
                  <div className="flex items-baseline gap-1 shrink-0">
                    <span
                      ref={(el) => (numberRefs.current[idx] = el)}
                      className="font-display text-lg md:text-xl font-light text-[#c8a97e]"
                    >
                      0.0
                    </span>
                    <span className="font-sans text-[10px] font-semibold text-[#a3a8b2] uppercase">
                      KM
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Address Callout */}
            <div className="mt-8 pt-5 border-t border-white/10 flex flex-col gap-1 font-sans text-xs text-[#a3a8b2]">
              <span className="font-semibold text-[#f4f2ec] uppercase tracking-wider">
                AMARIS BY KURRA INFRA
              </span>
              <span>Financial District, Nanakramguda, Hyderabad, Telangana 500032</span>
              <span className="text-[11px] text-[#c8a97e] mt-1">Exact Coordinates: 17.4152375° N, 78.3454219° E</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
