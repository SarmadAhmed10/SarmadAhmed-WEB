'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  heroRef: any;
  projectsRef?: any;
};

export default function Hero({ heroRef, projectsRef }: Props) {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLButtonElement | null>(null);
  const secondaryCtaRef = useRef<HTMLButtonElement | null>(null);
  const photoRef = useRef<HTMLDivElement | null>(null);
  const orbARef = useRef<HTMLDivElement | null>(null);
  const orbBRef = useRef<HTMLDivElement | null>(null);
  const orbCRef = useRef<HTMLDivElement | null>(null);
  const accentRef = useRef<SVGSVGElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const socialProofRef = useRef<HTMLDivElement | null>(null);
  const decorativeDotsRef = useRef<HTMLDivElement | null>(null);
  const frameTopLeftRef = useRef<HTMLDivElement | null>(null);
  const frameBottomRightRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    const letters = titleRef.current?.querySelectorAll('.letter') ?? [];

    /** OPTIMIZED HERO ENTRANCE **/
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    tl.from([orbARef.current, orbBRef.current, orbCRef.current], { 
      opacity: 0, 
      scale: 0.9, 
      duration: 0.6,
      stagger: 0.1 
    }, 0);

    tl.from(badgeRef.current, { 
      opacity: 0, 
      y: -15, 
      duration: 0.4 
    }, 0.2);

    const path = accentRef.current?.querySelector('path');
    if (path) {
      gsap.fromTo(
        path,
        { strokeDasharray: 600, strokeDashoffset: 600 },
        { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut', delay: 0.3 }
      );
    }

    tl.from(
      letters,
      {
        y: 80,
        rotationX: 30,
        opacity: 0,
        skewY: 5,
        transformOrigin: '0% 50%',
        duration: 0.7,
        stagger: { each: 0.03, from: 'start' },
      },
      0.3
    );

    tl.from(subtitleRef.current, { 
      y: 30, 
      opacity: 0, 
      duration: 0.5 
    }, '-=0.4');

    tl.from(ctaRef.current, { 
      y: 30, 
      opacity: 0, 
      scale: 0.95,
      duration: 0.5,
      clearProps: 'all'
    }, '-=0.3');

    tl.from(secondaryCtaRef.current, { 
      y: 30, 
      opacity: 0, 
      duration: 0.5,
      clearProps: 'all'
    }, '-=0.4');

    tl.from(photoRef.current, { 
      opacity: 0, 
      x: -60, 
      scale: 0.9,
      duration: 0.7,
      ease: 'power2.out'
    }, '-=0.8');

    tl.from([frameTopLeftRef.current, frameBottomRightRef.current], {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05
    }, '-=0.5');

    tl.from(socialProofRef.current, { 
      opacity: 0, 
      y: 15, 
      duration: 0.4 
    }, '-=0.3');

    const dots = decorativeDotsRef.current?.querySelectorAll('.dot');
    if (dots) {
      tl.from(dots, {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: 'back.out(1.7)'
      }, '-=0.4');
    }

    /** FLOATING ORBS **/
    const floatTL = gsap.timeline({ 
      repeat: -1, 
      yoyo: true, 
      defaults: { ease: 'sine.inOut' } 
    });
    
    floatTL.to(orbARef.current, { 
      y: -30, 
      x: 20, 
      duration: 5 
    }, 0);
    
    floatTL.to(orbBRef.current, { 
      y: 20, 
      x: -30, 
      duration: 6 
    }, 0);
    
    floatTL.to(orbCRef.current, { 
      y: -15, 
      x: 20, 
      duration: 5.5 
    }, 0);

    /** PARALLAX ON SCROLL **/
    gsap.to([orbARef.current, orbBRef.current, orbCRef.current], {
      y: 100,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      }
    });

    /** SMOOTH SCALE ON SCROLL - No blur, just elegant zoom **/
    gsap.to(heroRef.current, {
      scale: 0.95,
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      }
    });

    /** PHOTO HOVER EFFECT **/
    const photo = photoRef.current;
    if (photo) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = photo.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        gsap.to(photo, {
          rotationY: x * 8,
          rotationX: -y * 8,
          duration: 0.3,
          ease: 'power1.out'
        });
      };

      const handleMouseLeave = () => {
        gsap.to(photo, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.5,
          ease: 'power1.out'
        });
      };

      photo.addEventListener('mousemove', handleMouseMove);
      photo.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      gsap.killTweensOf('*');
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [heroRef]);

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    // Removed auto-rotation - showing single image only
  }, []);

  const handleScrollToProjects = () => {
    if (projectsRef?.current) {
      projectsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#F9F6F3] via-[#FFF9F7] to-[#FDECEC] text-[#5A1A1A] px-6"
    >
      {/* Grain texture */}
      <div 
        className="absolute inset-0 opacity-[0.01] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E")`,
        }}
      />

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#9C2C2C 1px, transparent 1px), linear-gradient(90deg, #9C2C2C 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />

      {/* Floating Orbs */}
      <div
        ref={orbARef}
        className="absolute top-20 left-[-10%] w-96 h-96 rounded-full mix-blend-multiply"
        style={{
          background: 'radial-gradient(circle, rgba(156,44,44,0.3) 0%, rgba(156,44,44,0.08) 40%, transparent 70%)',
          filter: 'blur(50px)',
          willChange: 'transform'
        }}
      />
      <div
        ref={orbBRef}
        className="absolute bottom-20 right-[-5%] w-80 h-80 rounded-full mix-blend-multiply"
        style={{
          background: 'radial-gradient(circle, rgba(242,142,133,0.3) 0%, rgba(242,142,133,0.08) 40%, transparent 70%)',
          filter: 'blur(50px)',
          willChange: 'transform'
        }}
      />
      <div
        ref={orbCRef}
        className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full mix-blend-multiply"
        style={{
          background: 'radial-gradient(circle, rgba(125,62,62,0.2) 0%, rgba(125,62,62,0.06) 40%, transparent 70%)',
          filter: 'blur(60px)',
          willChange: 'transform'
        }}
      />

      {/* Decorative dots */}
      <div ref={decorativeDotsRef} className="absolute inset-0 pointer-events-none">
        <div className="dot absolute top-1/4 right-1/4 w-2 h-2 bg-[#9C2C2C] rounded-full opacity-40" />
        <div className="dot absolute bottom-1/3 left-1/4 w-1 h-1 bg-[#F28E85] rounded-full opacity-60" />
        <div className="dot absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-[#9C2C2C] rounded-full opacity-30" />
        <div className="dot absolute top-2/3 left-1/3 w-1 h-1 bg-[#7D3E3E] rounded-full opacity-50" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto w-full">
        
        {/* Photo Section with Carousel */}
        <div className="relative group">
          <div 
            ref={frameTopLeftRef}
            className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-[#9C2C2C] opacity-40 transition-all duration-500 group-hover:w-24 group-hover:h-24 group-hover:opacity-60"
          />
          <div 
            ref={frameBottomRightRef}
            className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-[#9C2C2C] opacity-40 transition-all duration-500 group-hover:w-24 group-hover:h-24 group-hover:opacity-60"
          />
          
          <div
            ref={photoRef}
            className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-white"
            style={{
              transformStyle: 'preserve-3d',
              perspective: '1000px',
              willChange: 'transform'
            }}
          >
            {/* Single image - your best photo */}
            <div className="absolute inset-0">
              <Image
                src="/2ndPIC.jpeg"
                alt="Sarmad Ahmed"
                fill
                className="object-contain"
                priority
                quality={100}
              />
            </div>

            {/* Shimmer overlay */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none"
            />
            
            {/* Inner decorative corners */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-[#9C2C2C]/20" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-[#9C2C2C]/20" />
          </div>
        </div>

        {/* Text Content */}
        <div className="text-left relative space-y-6">
          
          <div 
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#9C2C2C]/20 shadow-lg"
          >
            <div className="w-2 h-2 bg-[#9C2C2C] rounded-full animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-[#7D3E3E]">Full-Stack Developer</span>
          </div>

          <div className="relative w-full h-20 pointer-events-none">
            <svg
              ref={accentRef}
              viewBox="0 0 500 100"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -top-4 left-0 w-full h-full opacity-30"
            >
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#9C2C2C" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#F28E85" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#9C2C2C" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <path
                d="M10,80 Q150,20 250,50 T490,60"
                stroke="url(#pathGradient)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <h1
            ref={titleRef}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-[1.1] tracking-tight"
          >
            {'Sarmad Ahmed'.split('').map((char, i) => (
              <span 
                key={i} 
                className="letter inline-block whitespace-pre"
                style={{ 
                  transformStyle: 'preserve-3d',
                  background: 'linear-gradient(135deg, #5A1A1A 0%, #9C2C2C 50%, #7D3E3E 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>

          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-[#7D3E3E] font-light max-w-lg leading-relaxed"
            style={{ letterSpacing: '0.01em' }}
          >
            I build performant, interactive web experiences that blend design and engineering — turning creative ideas into{' '}
            <span className="font-medium italic text-[#9C2C2C]">elegant digital realities</span>.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 relative z-50">
            <button
              ref={ctaRef}
              onClick={handleScrollToProjects}
              className="group relative z-50 inline-flex items-center justify-center px-10 py-4 rounded-full border-2 border-[#9C2C2C]
                         text-[#9C2C2C] font-semibold bg-white shadow-2xl overflow-hidden
                         transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(156,44,44,0.3)]"
            >
              <span className="absolute inset-0 bg-[#9C2C2C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-200">
                View My Work
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>

            <button
              ref={secondaryCtaRef}
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
              className="relative z-50 inline-flex items-center gap-2 px-6 py-4 text-[#7D3E3E] font-medium hover:text-[#9C2C2C] transition-colors duration-200 group"
            >
              <span className="relative">
                Get in touch
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#9C2C2C] group-hover:w-full transition-all duration-200" />
              </span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          <div 
            ref={socialProofRef}
            className="flex items-center gap-6 pt-6 border-t border-[#9C2C2C]/10"
          >
            <div className="flex items-center gap-2 text-sm text-[#7D3E3E]/70">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i} 
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-[#9C2C2C] to-[#F28E85] border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-md"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <span className="font-light">Trusted by innovators</span>
            </div>
            
            <div className="h-6 w-px bg-[#7D3E3E]/20" />
            
            <div className="flex items-center gap-1 text-sm text-[#7D3E3E]/70">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 fill-[#9C2C2C]" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 animate-bounce">
        <span className="text-xs font-light text-[#7D3E3E] tracking-widest uppercase">Scroll</span>
        <svg className="w-6 h-6 text-[#9C2C2C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}