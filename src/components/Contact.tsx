'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact({ contactRef }: any) {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLAnchorElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const accentLineRef = useRef<HTMLDivElement | null>(null);
  const orb1Ref = useRef<HTMLDivElement | null>(null);
  const orb2Ref = useRef<HTMLDivElement | null>(null);
  const orb3Ref = useRef<HTMLDivElement | null>(null);
  const magneticAreaRef = useRef<HTMLDivElement | null>(null);
  const circleRef = useRef<HTMLDivElement | null>(null);

  const contactMethods = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: "Email",
      value: "sarmad@example.com",
      link: "mailto:sarmad@example.com"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: "Phone",
      value: "+92 300 1234567",
      link: "tel:+923001234567"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: "Location",
      value: "Karachi, Pakistan",
      link: "#"
    },
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contactRef.current,
        start: 'top 70%',
        once: true,
      },
      defaults: { ease: 'power2.out' }
    });

    // Orbs entrance with stagger
    tl.from([orb1Ref.current, orb2Ref.current, orb3Ref.current], {
      scale: 0.7,
      opacity: 0,
      duration: 1,
      stagger: 0.15
    }, 0);

    // Circle reveal with scale
    tl.from(circleRef.current, {
      scale: 0,
      opacity: 0,
      duration: 1.2,
      ease: 'back.out(1.7)',
      clearProps: 'all'
    }, 0.3);

    // Accent line
    tl.from(accentLineRef.current, {
      scaleX: 0,
      transformOrigin: 'left',
      duration: 0.8,
      clearProps: 'all'
    }, 0.5);

    // Title with explosive entrance
    const letters = titleRef.current?.querySelectorAll('.letter') ?? [];
    tl.from(letters, {
      y: 100,
      opacity: 0,
      rotationX: 90,
      scale: 0.5,
      stagger: 0.03,
      duration: 0.8,
      ease: 'back.out(1.7)'
    }, 0.6);

    // Subtitle
    tl.from(subtitleRef.current, {
      y: 50,
      opacity: 0,
      scale: 0.9,
      duration: 0.7,
      clearProps: 'all'
    }, '-=0.4');

    // Contact cards with 3D rotation
    const cards = cardsRef.current?.querySelectorAll('.contact-card') ?? [];
    tl.from(cards, {
      y: 80,
      opacity: 0,
      rotationY: -30,
      stagger: 0.15,
      duration: 0.8,
      clearProps: 'all'
    }, '-=0.3');

    // CTA with bounce
    tl.from(ctaRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
      clearProps: 'all'
    }, '-=0.2');

    // Floating orbs with different patterns
    gsap.to(orb1Ref.current, {
      y: -60,
      x: 60,
      scale: 1.1,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to(orb2Ref.current, {
      y: 50,
      x: -50,
      scale: 0.9,
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to(orb3Ref.current, {
      y: -40,
      x: -60,
      scale: 1.05,
      duration: 11,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Rotating circle animation
    gsap.to(circleRef.current, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: 'none'
    });

    // Magnetic effect on CTA button
    const cta = ctaRef.current;
    const magneticArea = magneticAreaRef.current;

    if (cta && magneticArea) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = magneticArea.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(cta, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: 'power2.out'
        });
      };

      const handleMouseLeave = () => {
        gsap.to(cta, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)'
        });
      };

      magneticArea.addEventListener('mousemove', handleMouseMove);
      magneticArea.addEventListener('mouseleave', handleMouseLeave);
    }

  }, [contactRef]);

  return (
    <section 
      ref={contactRef}
      className="relative min-h-screen flex items-center justify-center px-6 py-32 bg-gradient-to-br from-[#F9F6F3] via-[#FFF9F7] to-[#FDECEC] overflow-hidden"
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

      {/* Massive floating orbs for impact */}
      <div
        ref={orb1Ref}
        className="absolute top-[5%] left-[5%] w-[600px] h-[600px] rounded-full mix-blend-multiply pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(156,44,44,0.35) 0%, rgba(156,44,44,0.1) 40%, transparent 70%)',
          filter: 'blur(70px)',
          willChange: 'transform'
        }}
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-[5%] right-[5%] w-[550px] h-[550px] rounded-full mix-blend-multiply pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(242,142,133,0.35) 0%, rgba(242,142,133,0.1) 40%, transparent 70%)',
          filter: 'blur(70px)',
          willChange: 'transform'
        }}
      />
      <div
        ref={orb3Ref}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full mix-blend-multiply pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(125,62,62,0.3) 0%, rgba(125,62,62,0.08) 40%, transparent 70%)',
          filter: 'blur(80px)',
          willChange: 'transform'
        }}
      />

      {/* Rotating decorative circle */}
      <div
        ref={circleRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[#9C2C2C]/5 pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        
        {/* Header */}
        <div className="text-center mb-16">
          {/* Accent line */}
          <div 
            ref={accentLineRef}
            className="h-0.5 w-32 bg-gradient-to-r from-[#9C2C2C] to-[#F28E85] mx-auto mb-8"
          />
          
          {/* Title with extra large size for impact */}
          <h2 
            ref={titleRef}
            className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            {"Let's Collaborate".split('').map((char, i) => (
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
          </h2>

          {/* Subtitle */}
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-[#7D3E3E] font-light max-w-3xl mx-auto leading-relaxed"
            style={{ letterSpacing: '0.01em' }}
          >
            Have a project in mind? Let's create something{' '}
            <span className="font-semibold italic text-[#9C2C2C]">extraordinary together</span>.
            <br />
            I'm always open to discussing new opportunities and ideas.
          </p>
        </div>

        {/* Contact Cards */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {contactMethods.map((method, idx) => (
            <a
              key={idx}
              href={method.link}
              className="contact-card group relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-[#9C2C2C]/10 hover:shadow-2xl hover:border-[#9C2C2C]/30 transition-all duration-500 hover:scale-105"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#9C2C2C]/5 to-[#F28E85]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#9C2C2C] to-[#F28E85] flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {method.icon}
                </div>

                {/* Label */}
                <div className="text-sm font-semibold text-[#9C2C2C] tracking-wider uppercase mb-2">
                  {method.label}
                </div>

                {/* Value */}
                <div className="text-lg font-bold text-[#5A1A1A] group-hover:text-[#9C2C2C] transition-colors duration-300">
                  {method.value}
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#9C2C2C]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          ))}
        </div>

        {/* Main CTA with magnetic effect */}
        <div 
          ref={magneticAreaRef}
          className="flex justify-center py-16"
        >
          <a
            ref={ctaRef}
            href="mailto:sarmad@example.com"
            className="group relative inline-flex items-center justify-center px-16 py-6 rounded-full overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-[0_0_60px_rgba(156,44,44,0.4)]"
            style={{
              background: 'linear-gradient(135deg, #9C2C2C 0%, #F28E85 100%)',
            }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            
            {/* Button content */}
            <span className="relative z-10 flex items-center gap-3 text-white font-bold text-xl">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Get In Touch
              <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>

            {/* Pulse rings */}
            <div className="absolute inset-0 rounded-full bg-[#9C2C2C] opacity-20 animate-ping" style={{ animationDuration: '2s' }} />
          </a>
        </div>

        {/* Availability badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full border border-[#9C2C2C]/20 shadow-lg">
            <div className="relative">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping" />
            </div>
            <span className="text-sm font-semibold text-[#5A1A1A]">
              Available for new projects
            </span>
          </div>
        </div>

        {/* Social links */}
        <div className="flex justify-center gap-4 mt-12">
          {['LinkedIn', 'GitHub', 'Twitter', 'Instagram'].map((social, idx) => (
            <a
              key={idx}
              href="#"
              className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-[#9C2C2C]/10 flex items-center justify-center text-[#5A1A1A] hover:bg-[#9C2C2C] hover:text-white hover:border-[#9C2C2C] hover:scale-110 transition-all duration-300 shadow-lg"
            >
              <span className="text-xs font-bold">{social[0]}</span>
            </a>
          ))}
        </div>

        {/* Bottom decorative line */}
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#9C2C2C]/30 to-transparent mx-auto mt-16" />
      </div>
    </section>
  );
}