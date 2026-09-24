import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HERO_FRAMES, KURRA_IMAGES } from '../utils/constants';
import { ArrowRight } from 'lucide-react';
import { KurraLogo } from './KurraLogo';

gsap.registerPlugin(ScrollTrigger);

export const HeroCanvas: React.FC = () => {
  const masterPinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroCanvasWrapperRef = useRef<HTMLDivElement>(null);
  
  const welcomeBgRef = useRef<HTMLDivElement>(null);
  const welcomeImageRef = useRef<HTMLImageElement>(null);
  const darkOverlayRef = useRef<HTMLDivElement>(null);
  const welcomeTextGroupRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const renderedFrameRef = useRef<number>(-1);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    let isMounted = true;
    const totalFrames = HERO_FRAMES.length;
    const images: HTMLImageElement[] = new Array(totalFrames);
    imagesRef.current = images;

    let loadedCount = 0;

    const drawFrame = (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let img = imagesRef.current[index];

      // Fallback: If requested frame hasn't loaded yet, draw nearest available frame
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let i = index - 1; i >= 0; i--) {
          const prevImg = imagesRef.current[i];
          if (prevImg && prevImg.complete && prevImg.naturalWidth > 0) {
            img = prevImg;
            break;
          }
        }
        if (!img || !img.complete || img.naturalWidth === 0) {
          for (let i = index + 1; i < totalFrames; i++) {
            const nextImg = imagesRef.current[i];
            if (nextImg && nextImg.complete && nextImg.naturalWidth > 0) {
              img = nextImg;
              break;
            }
          }
        }
      }

      if (!img || !img.complete || img.naturalWidth === 0) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;
      const imgRatio = imgWidth / imgHeight;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawWidth = canvasWidth;
      let drawHeight = canvasHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawHeight = canvasWidth / imgRatio;
        offsetY = (canvasHeight - drawHeight) / 2;
      } else {
        drawWidth = canvasHeight * imgRatio;
        offsetX = (canvasWidth - drawWidth) / 2;
      }

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const frameToDraw = renderedFrameRef.current >= 0 ? renderedFrameRef.current : 0;
      drawFrame(frameToDraw);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Continuous smooth frame interpolation RAF render loop
    const renderLoop = () => {
      if (!isMounted) return;

      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.001) {
        currentFrameRef.current += diff * 0.15;
      } else {
        currentFrameRef.current = target;
      }

      const frameIndex = Math.min(
        totalFrames - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );

      if (frameIndex !== renderedFrameRef.current) {
        renderedFrameRef.current = frameIndex;
        drawFrame(frameIndex);
      }

      animationFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animationFrameIdRef.current = requestAnimationFrame(renderLoop);

    const loadFrame = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = HERO_FRAMES[index];
        img.onload = () => {
          images[index] = img;
          loadedCount++;
          if (isMounted) {
            setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
          }
          if (index === 0 && renderedFrameRef.current <= 0) {
            drawFrame(0);
          }
          resolve();
        };
        img.onerror = () => {
          images[index] = img;
          loadedCount++;
          resolve();
        };
      });
    };

    const initialBatchSize = Math.min(20, totalFrames);
    const initialPromises = Array.from({ length: initialBatchSize }, (_, i) => loadFrame(i));

    Promise.all(initialPromises).then(() => {
      if (!isMounted) return;
      setIsLoaded(true);
      drawFrame(0);

      for (let i = initialBatchSize; i < totalFrames; i++) {
        loadFrame(i);
      }
    });

    const masterContainer = masterPinRef.current;
    if (!masterContainer) return;

    const ctxGSAP = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: masterContainer,
          start: 'top top',
          end: '+=850%',
          pin: true,
          pinSpacing: true,
          scrub: true,        // ← was scrub:0.4 (lag caused momentum throw on pin release)
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;

            const frameEndP = 0.38;
            let normProgress = Math.min(1, Math.max(0, p / frameEndP));

            // Eased deceleration for final 15% of frame sequence
            if (normProgress > 0.85) {
              const localT = (normProgress - 0.85) / 0.15;
              const easedT = gsap.parseEase('power2.out')(localT);
              normProgress = 0.85 + easedT * 0.15;
            }

            // Target frame position determined strictly from normalized scroll progress
            targetFrameRef.current = normProgress * (totalFrames - 1);
          },
        },
      });

      // 1. Overlapping Canvas -> Welcome BG Crossfade (0.35 -> 0.48)
      if (heroCanvasWrapperRef.current) {
        timeline.to(
          heroCanvasWrapperRef.current,
          {
            opacity: 0,
            duration: 0.13,
            ease: 'none',
          },
          0.35
        );
      }

      if (welcomeBgRef.current) {
        timeline.fromTo(
          welcomeBgRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.13,
            ease: 'none',
          },
          0.35
        );
      }

      // 3. Welcome BG Crossfade & Initial Hidden State for Welcome Text (0.35 -> 0.48)
      if (darkOverlayRef.current) {
        timeline.fromTo(
          darkOverlayRef.current,
          { opacity: 0.85 },
          {
            opacity: 0.85,
            duration: 0.13,
            ease: 'none',
          },
          0.35
        );
      }

      if (welcomeImageRef.current) {
        timeline.fromTo(
          welcomeImageRef.current,
          {
            scale: 1.0,
            filter: 'blur(14px) brightness(0.65) contrast(105%)',
          },
          {
            scale: 1.0,
            filter: 'blur(14px) brightness(0.65) contrast(105%)',
            duration: 0.13,
            ease: 'none',
          },
          0.35
        );
      }

      // 4. Welcome Text Group Reveal on Blurred Background (0.38 -> 0.50)
      if (welcomeTextGroupRef.current) {
        timeline.fromTo(
          welcomeTextGroupRef.current,
          { opacity: 0, x: '0vw', y: 35, scale: 0.96 },
          {
            opacity: 1,
            x: '0vw',
            y: 0,
            scale: 1,
            duration: 0.12,
            ease: 'power2.out',
          },
          0.38
        );
      }

      if (ctaRef.current) {
        timeline.fromTo(
          ctaRef.current,
          { opacity: 0, x: '0vw' },
          {
            opacity: 1,
            x: '0vw',
            duration: 0.12,
            ease: 'power2.out',
          },
          0.38
        );
      }

      // 5. Simultaneous Background Unblur & Welcome Text Move-Left / Fade-Out (0.52 -> 0.76)
      if (darkOverlayRef.current) {
        timeline.to(
          darkOverlayRef.current,
          {
            opacity: 0.15,
            duration: 0.24,
            ease: 'none',
          },
          0.52
        );
      }

      if (welcomeImageRef.current) {
        timeline.to(
          welcomeImageRef.current,
          {
            scale: 1.08,
            filter: 'blur(0px) brightness(1.12) contrast(115%)',
            duration: 0.24,
            ease: 'none',
          },
          0.52
        );
      }

      // Welcome Text Group moves left & fades out SIMULTANEOUSLY while background is unblurring (0.52 -> 0.76)
      if (welcomeTextGroupRef.current) {
        timeline.to(
          welcomeTextGroupRef.current,
          {
            x: '-75vw',
            opacity: 0,
            duration: 0.24,
            ease: 'power2.inOut',
          },
          0.52
        );
      }

      // CTA moves left & fades out SIMULTANEOUSLY while background is unblurring (0.52 -> 0.76)
      if (ctaRef.current) {
        timeline.to(
          ctaRef.current,
          {
            x: '-75vw',
            opacity: 0,
            duration: 0.24,
            ease: 'power2.inOut',
          },
          0.52
        );
      }

      // 7. Deceleration Buffer Zone (0.84 -> 1.00)
      // Pure scroll buffer (~136vh) where velocity dissipates before pin release.
    }, masterContainer);

    return () => {
      isMounted = false;
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      ctxGSAP.revert();
    };
  }, []);

  return (
    <section
      ref={masterPinRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden bg-[#08090a]"
    >
      {/* Loading Preloader */}
      {!isLoaded && (
        <div className="absolute inset-0 z-50 bg-[#08090a] flex flex-col items-center justify-center gap-5">
          <KurraLogo size="lg" showText={true} />
          
          <div className="w-52 h-[1px] bg-white/10 relative overflow-hidden my-2">
            <div
              className="h-full bg-[#c8a97e] transition-all duration-300"
              style={{ width: `${loadProgress}%` }}
            />
          </div>

          <span className="font-sans text-[10px] tracking-[0.25em] text-[#a3a8b2] uppercase font-medium">
            CINEMATIC PRELOADER {loadProgress}%
          </span>
        </div>
      )}

      {/* LAYER 1: Welcome Background Image */}
      <div
        ref={welcomeBgRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-0 will-change-opacity overflow-hidden"
      >
        <img
          ref={welcomeImageRef}
          src={KURRA_IMAGES.heroReveal}
          alt="Amaris Building Reveal"
          className="w-full h-full object-cover will-change-transform filter blur-[14px] brightness-[0.65] contrast-[105%]"
          style={{ transformOrigin: 'center center' }}
        />
      </div>

      {/* LAYER 2: Shared Dark Overlay */}
      <div
        ref={darkOverlayRef}
        className="absolute inset-0 bg-black/85 z-10 pointer-events-none will-change-opacity"
      />

      {/* LAYER 3: Hero Canvas Frame Layer */}
      <div
        ref={heroCanvasWrapperRef}
        className="absolute inset-0 w-full h-full z-20 pointer-events-none will-change-opacity"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
      </div>

      {/* LAYER 4: Welcome Text Composition - Avenir Next Light Thin Geometric Headings */}
      <div className="absolute inset-0 z-40 max-w-[1500px] mx-auto px-6 md:px-12 flex items-center justify-center pointer-events-none">
        <div
          ref={welcomeTextGroupRef}
          className="flex flex-col items-center text-center max-w-4xl opacity-0 will-change-transform pointer-events-auto"
        >
          <span className="font-sans text-xs font-semibold tracking-[0.12em] text-[#c8a97e] uppercase mb-4">
            AN ARCHITECTURAL POEM IN HYDERABAD
          </span>

          <h2 className="font-display text-[clamp(42px,7vw,110px)] font-light tracking-[-0.01em] text-[#f4f2ec] leading-[0.92] uppercase mb-6">
            WELCOME TO <span className="text-[#c8a97e]">AMARIS</span>
          </h2>

          <div className="w-16 h-[1px] bg-[#c8a97e]/40 my-2" />

          <p className="font-sans text-lg sm:text-2xl font-light text-[#f4f2ec] leading-relaxed max-w-3xl my-5">
            "At Amaris, a home is more than brick and mortar. It is a reflection of life's most meaningful moments."
          </p>

          <p className="font-sans text-sm md:text-base text-[#a3a8b2] font-normal leading-[1.65] max-w-2xl">
            Set in Hyderabad's prestigious Financial District, Amaris unfolds across a naturally contoured landscape, with two iconic G+50 towers centred around an exclusive clubhouse.
          </p>

          <div ref={ctaRef} className="mt-9">
            <a
              href="#scale"
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
