'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials({ testimonialsRef }: any) {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const accentLineRef = useRef<HTMLDivElement | null>(null);
  const orb1Ref = useRef<HTMLDivElement | null>(null);
  const orb2Ref = useRef<HTMLDivElement | null>(null);
  const quoteIconRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "Ayesha Khan",
      role: "Product Manager",
      company: "D2 Advertising",
      quote: "Working with Sarmad was an incredible experience. His attention to detail and creativity transformed our website into something truly special. The animations and interactions he crafted brought our brand to life in ways we never imagined.",
      avatar: "AK",
      rating: 5,
      project: "Brand Website Redesign"
    },
    {
      name: "Ali Raza",
      role: "CTO",
      company: "Bitrex Technologies",
      quote: "Sarmad is an exceptional developer who blends design aesthetics with solid technical understanding. His ability to translate complex requirements into elegant solutions is remarkable. Every line of code reflects his dedication to excellence.",
      avatar: "AR",
      rating: 5,
      project: "Enterprise Dashboard"
    },
    {
      name: "Sarah Williams",
      role: "Founder & CEO",
      company: "PixelCraft Studios",
      quote: "I've worked with many developers, but Sarmad stands out for his innovative approach and commitment to quality. He doesn't just build features — he crafts experiences. Our conversion rates increased by 40% after his optimization work.",
      avatar: "SW",
      rating: 5,
      project: "E-Commerce Platform"
    },
    {
      name: "Michael Chen",
      role: "Design Director",
      company: "Nexus Digital",
      quote: "Sarmad's technical skills are matched only by his creative vision. He brought our most ambitious designs to life with pixel-perfect precision. The performance optimizations he implemented were beyond impressive — a true craftsman.",
      avatar: "MC",
      rating: 5,
      project: "Interactive Portfolio"
    },
    {
      name: "Fatima Ahmed",
      role: "Marketing Head",
      company: "GrowthLab",
      quote: "Collaborating with Sarmad elevated our entire digital presence. His insights on user experience and performance were invaluable. He's not just a developer; he's a strategic partner who genuinely cares about project success.",
      avatar: "FA",
      rating: 5,
      project: "Marketing Campaign Site"
    },
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: testimonialsRef.current,
        start: 'top 70%',
        once: true,
      },
      defaults: { ease: 'power2.out' }
    });

    // Orbs entrance
    tl.from([orb1Ref.current, orb2Ref.current], {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1
    }, 0);

    // Accent line
    tl.from(accentLineRef.current, {
      scaleX: 0,
      transformOrigin: 'left',
      duration: 0.8,
      clearProps: 'all'
    }, 0.2);

    // Quote icon with rotation
    tl.from(quoteIconRef.current, {
      scale: 0,
      rotation: -180,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.7)',
      clearProps: 'all'
    }, 0.3);

    // Title animation
    const letters = titleRef.current?.querySelectorAll('.letter') ?? [];
    tl.from(letters, {
      y: 60,
      opacity: 0,
      rotationX: 30,
      stagger: 0.02,
      duration: 0.6
    }, 0.4);

    // Subtitle
    tl.from(subtitleRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.5,
      clearProps: 'all'
    }, '-=0.3');

    // Carousel entrance
    tl.from(carouselRef.current, {
      y: 80,
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      clearProps: 'all'
    }, '-=0.2');

    // Floating orbs
    gsap.to(orb1Ref.current, {
      y: -40,
      x: 50,
      duration: 9,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to(orb2Ref.current, {
      y: 50,
      x: -40,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

  }, [testimonialsRef]);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section 
      ref={testimonialsRef}
      className="relative min-h-screen flex items-center justify-center px-6 py-32 bg-gradient-to-br from-[#FDECEC] via-[#FFF9F7] to-[#F9F6F3] overflow-hidden"
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

      {/* Floating orbs */}
      <div
        ref={orb1Ref}
        className="absolute top-[15%] left-[8%] w-[450px] h-[450px] rounded-full mix-blend-multiply pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(156,44,44,0.28) 0%, rgba(156,44,44,0.08) 40%, transparent 70%)',
          filter: 'blur(60px)',
          willChange: 'transform'
        }}
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-[15%] right-[8%] w-[400px] h-[400px] rounded-full mix-blend-multiply pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(242,142,133,0.28) 0%, rgba(242,142,133,0.08) 40%, transparent 70%)',
          filter: 'blur(60px)',
          willChange: 'transform'
        }}
      />

      {/* Decorative quote mark */}
      <div
        ref={quoteIconRef}
        className="absolute top-24 left-1/2 -translate-x-1/2 opacity-[0.03] pointer-events-none"
      >
        <svg className="w-64 h-64 text-[#9C2C2C]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        
        {/* Header */}
        <div className="text-center mb-16">
          {/* Accent line */}
          <div 
            ref={accentLineRef}
            className="h-0.5 w-32 bg-gradient-to-r from-[#9C2C2C] to-[#F28E85] mx-auto mb-6"
          />
          
          {/* Title */}
          <h2 
            ref={titleRef}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
          >
            {'Client Testimonials'.split('').map((char, i) => (
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
            className="text-lg md:text-xl text-[#7D3E3E] font-light max-w-2xl mx-auto"
            style={{ letterSpacing: '0.01em' }}
          >
            Hear from the{' '}
            <span className="font-medium italic text-[#9C2C2C]">amazing people</span>
            {' '}I've had the privilege to work with
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div ref={carouselRef} className="relative">
          
          {/* Main testimonial card */}
          <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-10 md:p-16 shadow-2xl border border-[#9C2C2C]/10 overflow-hidden">
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#9C2C2C]/5 via-transparent to-[#F28E85]/5 opacity-50" />
            
            {/* Decorative elements */}
            <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-[#9C2C2C]/20" />
            <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-[#9C2C2C]/20" />

            {/* Content */}
            <div className="relative">
              {/* Quote icon */}
              <div className="mb-6">
                <svg className="w-12 h-12 text-[#9C2C2C]/30" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                </svg>
              </div>

              {/* Quote text with animation */}
              <div className="relative">
                {testimonials.map((testimonial, idx) => (
                  <div
                    key={idx}
                    className={`transition-all duration-700 ${
                      idx === activeIndex 
                        ? 'opacity-100 relative' 
                        : 'opacity-0 absolute inset-0 pointer-events-none'
                    }`}
                  >
                    {/* Project badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#9C2C2C]/10 to-[#F28E85]/10 rounded-full mb-6 border border-[#9C2C2C]/20">
                      <svg className="w-4 h-4 text-[#9C2C2C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-semibold text-[#9C2C2C]">
                        {testimonial.project}
                      </span>
                    </div>

                    {/* Quote */}
                    <p className="text-xl md:text-2xl text-[#5A1A1A] font-light leading-relaxed mb-8 italic">
                      "{testimonial.quote}"
                    </p>

                    {/* Author info */}
                    <div className="flex items-center gap-6">
                      {/* Avatar */}
                      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#9C2C2C] to-[#F28E85] flex items-center justify-center shadow-xl">
                        <span className="text-white font-bold text-lg">
                          {testimonial.avatar}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-[#5A1A1A] mb-1">
                          {testimonial.name}
                        </h4>
                        <p className="text-[#7D3E3E] text-sm">
                          {testimonial.role} • {testimonial.company}
                        </p>
                      </div>

                      {/* Rating */}
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 fill-[#9C2C2C]" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-full md:left-0 w-12 h-12 rounded-full bg-white shadow-xl border-2 border-[#9C2C2C]/20 flex items-center justify-center hover:bg-[#9C2C2C] hover:border-[#9C2C2C] text-[#9C2C2C] hover:text-white transition-all duration-300 group"
          >
            <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-full md:right-0 w-12 h-12 rounded-full bg-white shadow-xl border-2 border-[#9C2C2C]/20 flex items-center justify-center hover:bg-[#9C2C2C] hover:border-[#9C2C2C] text-[#9C2C2C] hover:text-white transition-all duration-300 group"
          >
            <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-500 ${
                activeIndex === idx 
                  ? 'w-12 bg-gradient-to-r from-[#9C2C2C] to-[#F28E85]' 
                  : 'w-2 bg-[#9C2C2C]/30 hover:bg-[#9C2C2C]/50'
              }`}
            />
          ))}
        </div>

        {/* Bottom stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-br from-[#9C2C2C] to-[#F28E85] bg-clip-text text-transparent mb-2">
              100%
            </div>
            <div className="text-sm text-[#7D3E3E] font-light">
              Client Satisfaction
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-br from-[#9C2C2C] to-[#F28E85] bg-clip-text text-transparent mb-2">
              50+
            </div>
            <div className="text-sm text-[#7D3E3E] font-light">
              Projects Delivered
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-br from-[#9C2C2C] to-[#F28E85] bg-clip-text text-transparent mb-2">
              5.0
            </div>
            <div className="text-sm text-[#7D3E3E] font-light">
              Average Rating
            </div>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#9C2C2C]/30 to-transparent mx-auto mt-12" />
      </div>
    </section>
  );
}