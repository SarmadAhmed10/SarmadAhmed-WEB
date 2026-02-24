'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials({ testimonialsRef }: any) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: 'Hassan Raza',
      role: 'CTO',
      company: 'Bitrex Technologies',
      quote: 'Sarmad is an exceptional developer who combines design aesthetics with solid technical understanding. His ability to translate complex requirements into elegant solutions is remarkable. Every project he delivers exceeds expectations.',
      avatar: 'HR',
    },
    {
      name: 'Ayesha Khan',
      role: 'Product Manager',
      company: 'PixelCraft Studios',
      quote: 'Working with Sarmad was transformative for our product. His attention to detail and creativity turned our website into something truly special. The animations and interactions he crafted brought our brand to life in ways we never imagined.',
      avatar: 'AK',
    },
    {
      name: 'Omar Farooq',
      role: 'Founder',
      company: 'Leasingers',
      quote: 'Sarmad built our entire web platform from scratch. His technical skills are matched only by his commitment to quality. The site he delivered was fast, responsive, and beautifully designed. A true professional who delivers on his promises.',
      avatar: 'OF',
    },
    {
      name: 'Sarah Mitchell',
      role: 'Design Director',
      company: 'Nexus Digital',
      quote: 'I have worked with many developers, but Sarmad stands out for his innovative approach. He does not just build features — he crafts experiences. Our conversion rates increased significantly after his optimization work.',
      avatar: 'SM',
    },
    {
      name: 'Bilal Ahmed',
      role: 'Engineering Lead',
      company: 'Optimail Solutions',
      quote: 'Sarmad is the kind of developer every team needs. His Python and full-stack expertise helped us build a robust email platform. He writes clean, maintainable code and always thinks about scalability from day one.',
      avatar: 'BA',
    },
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: testimonialsRef.current, start: 'top 70%', once: true },
      defaults: { ease: 'power2.out' }
    });

    tl.from(lineRef.current, { scaleX: 0, transformOrigin: 'left', duration: 0.8 }, 0);
    tl.from(titleRef.current, { y: 60, opacity: 0, duration: 0.8 }, 0.2);
    tl.from(carouselRef.current, { y: 80, opacity: 0, scale: 0.95, duration: 0.8 }, 0.4);
  }, [testimonialsRef]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section ref={testimonialsRef} className="relative min-h-screen flex items-center px-6 py-32 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.15) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <div className="mb-20">
          <div ref={lineRef} className="h-px w-16 bg-[#c9a96e] mb-8" />
          <h2 ref={titleRef} className="font-display text-5xl md:text-6xl lg:text-7xl font-bold">
            <span className="text-[#f5f5f5]">Client </span>
            <span className="gradient-text italic">Reviews</span>
          </h2>
        </div>

        <div ref={carouselRef} className="relative">
          {/* Quote */}
          <div className="relative p-10 md:p-16 rounded-2xl border border-[#1a1a1a] bg-[#111]/30 min-h-[320px]">
            {/* Quote icon */}
            <svg className="w-10 h-10 text-[#c9a96e]/20 mb-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
            </svg>

            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className={`transition-all duration-700 ${
                  idx === activeIndex ? 'opacity-100 relative' : 'opacity-0 absolute inset-0 p-10 md:p-16 pt-24 pointer-events-none'
                }`}
              >
                <p className="text-lg md:text-xl text-[#ccc] font-light leading-relaxed mb-10 italic">
                  &quot;{t.quote}&quot;
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#b08d4a] flex items-center justify-center text-[#0a0a0a] font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="text-[#f5f5f5] font-semibold">{t.name}</h4>
                    <p className="text-sm text-[#666]">{t.role} &bull; {t.company}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Corner accents */}
            <div className="absolute top-6 right-6 w-10 h-10 border-t border-r border-[#c9a96e]/10" />
            <div className="absolute bottom-6 left-6 w-10 h-10 border-b border-l border-[#c9a96e]/10" />
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    activeIndex === idx ? 'w-8 bg-[#c9a96e]' : 'w-2 bg-[#333] hover:bg-[#555]'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="w-10 h-10 rounded-full border border-[#222] flex items-center justify-center text-[#666] hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)}
                className="w-10 h-10 rounded-full border border-[#222] flex items-center justify-center text-[#666] hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
