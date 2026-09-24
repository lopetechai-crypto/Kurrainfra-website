import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navigation } from './components/Navigation';
import { HeroCanvas } from './components/HeroCanvas';
import { ProjectScale } from './components/ProjectScale';
import { WhyChooseAmaris } from './components/WhyChooseAmaris';
import { ExperienceAmaris } from './components/ExperienceAmaris';
import { FloorPlans } from './components/FloorPlans';
import { LocationSection } from './components/LocationSection';
import { ContactCTA } from './components/ContactCTA';
import { EnquireModal } from './components/EnquireModal';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [isEnquireOpen, setIsEnquireOpen] = useState(false);

  useEffect(() => {
    // Single Lenis instance — restrained smoothing to prevent inertia buildup
    // at pin-release points. Lower duration = less stored kinetic energy.
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => 1 - Math.pow(1 - t, 3),   // cubic ease-out: natural but not floaty
      smoothWheel: true,
      wheelMultiplier: 0.85,   // ← never > 1; amplifying input causes velocity spikes
      touchMultiplier: 1.0,
    });

    // Synchronize Lenis scroll position with GSAP ticker & ScrollTrigger.
    // One RAF loop only — Lenis is driven by gsap.ticker, NOT its own rAF loop.
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Delay refresh until images and canvas are sized by the browser.
    // 600ms gives the preloader's first batch of frames time to paint.
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600);

    return () => {
      clearTimeout(timer);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);


  return (
    <div className="relative bg-[#08090a] text-[#f4f2ec] min-h-screen selection:bg-[#c8a97e] selection:text-black">
      {/* Navigation Header */}
      <Navigation onOpenEnquire={() => setIsEnquireOpen(true)} />

      {/* Main Interactive Storytelling Flow */}
      <main className="relative z-10 w-full overflow-x-hidden">
        {/* 1. Master Pinned Hero & Welcome Overlapping Blend Scene */}
        <HeroCanvas />

        {/* 2. Architectural Scale & Animated Statistics */}
        <ProjectScale />

        {/* 3. Why Choose Amaris - Collage & Highlights */}
        <WhyChooseAmaris />

        {/* 4. Experience Amaris - 8 Alternating Directional Visual Rows */}
        <ExperienceAmaris />

        {/* 5. Mastered to Make You Thrive - Horizontal Floor Plans Scroll */}
        <FloorPlans />

        {/* 6. Prime Location & Connectivity Map */}
        <LocationSection />

        {/* 7. Contact CTA & Footer */}
        <ContactCTA />
      </main>

      {/* VIP Inquiry Modal */}
      <EnquireModal
        isOpen={isEnquireOpen}
        onClose={() => setIsEnquireOpen(false)}
      />
    </div>
  );
};

export default App;
