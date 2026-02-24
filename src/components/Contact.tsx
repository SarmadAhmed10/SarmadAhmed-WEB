'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact({ contactRef }: any) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const contactMethods = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Email',
      value: 'sarmadahmed.dev@gmail.com',
      link: 'mailto:sarmadahmed.dev@gmail.com',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Location',
      value: 'Karachi, Pakistan',
      link: '#',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      label: 'GitHub',
      value: 'SarmadAhmed10',
      link: 'https://github.com/SarmadAhmed10',
    },
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: contactRef.current, start: 'top 70%', once: true },
      defaults: { ease: 'power2.out' }
    });

    tl.from(lineRef.current, { scaleX: 0, transformOrigin: 'left', duration: 0.8 }, 0);
    tl.from(titleRef.current, { y: 80, opacity: 0, duration: 0.9 }, 0.2);
    tl.from(subtitleRef.current, { y: 40, opacity: 0, duration: 0.7 }, 0.4);

    const cards = cardsRef.current?.querySelectorAll('.contact-card') ?? [];
    tl.from(cards, { y: 60, opacity: 0, stagger: 0.12, duration: 0.6 }, 0.5);
    tl.from(ctaRef.current, { scale: 0.9, opacity: 0, duration: 0.7, ease: 'back.out(1.7)' }, 0.7);
  }, [contactRef]);

  return (
    <section ref={contactRef} className="relative min-h-screen flex items-center px-6 py-32 bg-[#0a0a0a] overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.2) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.15) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-20">
          <div ref={lineRef} className="h-px w-16 bg-[#c9a96e] mx-auto mb-8" />
          <h2 ref={titleRef} className="font-display text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="text-[#f5f5f5]">Let&apos;s </span>
            <span className="gradient-text italic">Talk</span>
          </h2>
          <p ref={subtitleRef} className="text-lg text-[#888] font-light max-w-2xl mx-auto leading-relaxed">
            Building an AI product or need to integrate intelligence into your platform?
            I&apos;m always open to discussing new challenges — from LLM integrations
            to full-stack SaaS builds.
          </p>
        </div>

        {/* Contact Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method, idx) => (
            <a
              key={idx}
              href={method.link}
              target={method.link.startsWith('http') ? '_blank' : undefined}
              rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="contact-card group p-8 rounded-xl border border-[#1a1a1a] bg-[#111]/30 hover:border-[#c9a96e]/20 transition-all duration-500 block text-center"
            >
              <div className="w-14 h-14 mx-auto rounded-xl bg-[#1a1a1a] flex items-center justify-center text-[#c9a96e] mb-4 group-hover:bg-[#c9a96e] group-hover:text-[#0a0a0a] transition-all duration-300">
                {method.icon}
              </div>
              <div className="text-xs text-[#c9a96e] tracking-wider uppercase mb-2 font-medium">
                {method.label}
              </div>
              <div className="text-[#f5f5f5] font-medium group-hover:text-[#c9a96e] transition-colors duration-300">
                {method.value}
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="text-center">
          <a
            href="mailto:sarmadahmed.dev@gmail.com"
            className="group relative inline-flex items-center gap-3 px-12 py-5 rounded-full bg-[#c9a96e] text-[#0a0a0a] font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_60px_rgba(201,169,110,0.3)]"
          >
            <span className="relative z-10">Get In Touch</span>
            <svg className="relative z-10 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          {/* Availability */}
          <div className="mt-8 inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#1a1a1a] bg-[#111]/50">
            <div className="relative">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
            </div>
            <span className="text-xs text-[#888] font-medium">Available for AI consulting & contract work</span>
          </div>
        </div>
      </div>
    </section>
  );
}
