'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  heroRef: any;
  projectsRef?: any;
};

export default function Hero({ heroRef, projectsRef }: Props) {
  const titleLine1Ref = useRef<HTMLDivElement>(null);
  const titleLine2Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const lineLeftRef = useRef<HTMLDivElement>(null);
  const lineRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.3 });

    tl.from(lineLeftRef.current, { scaleX: 0, transformOrigin: 'right', duration: 0.8 }, 0);
    tl.from(lineRightRef.current, { scaleX: 0, transformOrigin: 'left', duration: 0.8 }, 0);
    tl.from(badgeRef.current, { y: -20, opacity: 0, duration: 0.6 }, 0.2);
    tl.from(titleLine1Ref.current, { y: 120, opacity: 0, skewY: 7, duration: 1 }, 0.3);
    tl.from(titleLine2Ref.current, { y: 120, opacity: 0, skewY: 7, duration: 1 }, 0.45);
    tl.from(subtitleRef.current, { y: 40, opacity: 0, duration: 0.7 }, 0.7);
    tl.from(ctaRef.current, { y: 30, opacity: 0, duration: 0.6 }, 0.9);
    tl.from(photoRef.current, { scale: 0.8, opacity: 0, duration: 1, ease: 'power2.out' }, 0.5);
    tl.from(scrollIndicatorRef.current, { opacity: 0, y: 20, duration: 0.5 }, 1.2);

    gsap.to(photoRef.current, {
      y: 80,
      scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1 }
    });

    const photo = photoRef.current;
    if (photo) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = photo.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(photo, { rotationY: x * 10, rotationX: -y * 10, duration: 0.3, ease: 'power1.out' });
      };
      const handleMouseLeave = () => {
        gsap.to(photo, { rotationY: 0, rotationX: 0, duration: 0.5 });
      };
      photo.addEventListener('mousemove', handleMouseMove);
      photo.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        photo.removeEventListener('mousemove', handleMouseMove);
        photo.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [heroRef]);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a] px-6">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(201,169,110,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.3) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.15) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto w-full py-32">
        {/* Text */}
        <div className="text-left space-y-8 order-2 lg:order-1">
          <div ref={badgeRef} className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#222] bg-[#111]/50">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium tracking-wider uppercase text-[#888]">Available for work</span>
          </div>

          <div className="flex items-center gap-4">
            <div ref={lineLeftRef} className="h-px w-12 bg-gradient-to-r from-[#c9a96e] to-transparent" />
            <span className="text-xs text-[#666] tracking-[0.3em] uppercase">AI Engineer & Full-Stack Developer</span>
            <div ref={lineRightRef} className="h-px flex-1 bg-gradient-to-r from-transparent via-[#222] to-transparent" />
          </div>

          <div className="overflow-hidden">
            <div ref={titleLine1Ref}>
              <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight text-[#f5f5f5]">
                Sarmad
              </h1>
            </div>
          </div>
          <div className="overflow-hidden -mt-4">
            <div ref={titleLine2Ref}>
              <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight gradient-text">
                Ahmed
              </h1>
            </div>
          </div>

          <p ref={subtitleRef} className="text-lg text-[#888] font-light max-w-lg leading-relaxed">
            I build intelligent systems at the intersection of AI and software engineering
            — from LLM-powered applications to production-grade platforms that{' '}
            <span className="text-[#c9a96e] font-normal italic">think, adapt, and scale</span>.
          </p>

          <div ref={ctaRef} className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => projectsRef?.current?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#c9a96e] text-[#0a0a0a] font-semibold text-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,169,110,0.3)]"
            >
              <span className="relative z-10">View My Work</span>
              <svg className="relative z-10 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <a href="https://github.com/SarmadAhmed10" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-4 text-[#888] text-sm font-medium hover:text-[#c9a96e] transition-colors duration-300">
              <span>GitHub</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        {/* Photo */}
        <div className="relative order-1 lg:order-2 flex justify-center">
          <div ref={photoRef} className="relative w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden border border-[#222] shadow-2xl"
            style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}>
            <Image src="/2ndPIC.jpeg" alt="Sarmad Ahmed" fill className="object-cover" priority quality={90} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />
            <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-[#c9a96e]/30" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-[#c9a96e]/30" />
          </div>
          <div className="absolute -bottom-4 -right-4 md:bottom-8 md:-right-8 px-4 py-2 rounded-lg bg-[#111] border border-[#222] shadow-xl">
            <div className="text-xs text-[#666] mb-1">Experience</div>
            <div className="text-lg font-bold gradient-text">4+ Years</div>
          </div>
        </div>
      </div>

      <div ref={scrollIndicatorRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-[10px] text-[#444] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#c9a96e] to-transparent" />
      </div>
    </section>
  );
}
