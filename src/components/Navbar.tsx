'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type NavbarProps = {
  heroRef?: React.RefObject<HTMLElement | null>;
  aboutRef?: React.RefObject<HTMLElement | null>;
  skillsRef?: React.RefObject<HTMLElement | null>;
  projectsRef?: React.RefObject<HTMLElement | null>;
  testimonialsRef?: React.RefObject<HTMLElement | null>;
  contactRef?: React.RefObject<HTMLElement | null>;
};

export default function Navbar({
  heroRef, aboutRef, skillsRef, projectsRef, testimonialsRef, contactRef
}: NavbarProps) {
  const navRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { label: 'Home', ref: heroRef, id: 'home' },
    { label: 'About', ref: aboutRef, id: 'about' },
    { label: 'Skills', ref: skillsRef, id: 'skills' },
    { label: 'Projects', ref: projectsRef, id: 'projects' },
    { label: 'Reviews', ref: testimonialsRef, id: 'testimonials' },
  ];

  const scrollToSection = (ref: React.RefObject<HTMLElement | null> | undefined) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    tl.from(navRef.current, { y: -100, opacity: 0, duration: 0.8, clearProps: 'all' });

    gsap.to(progressRef.current, {
      scaleX: 1,
      transformOrigin: 'left',
      ease: 'none',
      scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 0.3 }
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = [
        { id: 'home', ref: heroRef },
        { id: 'about', ref: aboutRef },
        { id: 'skills', ref: skillsRef },
        { id: 'projects', ref: projectsRef },
        { id: 'testimonials', ref: testimonialsRef },
      ];
      for (const section of sections) {
        if (section.ref?.current) {
          const rect = section.ref.current.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [heroRef, aboutRef, skillsRef, projectsRef, testimonialsRef]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.to(mobileMenuRef.current, { x: 0, duration: 0.4, ease: 'power2.out' });
    } else {
      gsap.to(mobileMenuRef.current, { x: '100%', duration: 0.3, ease: 'power2.in' });
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-[#1a1a1a] py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#1a1a1a]">
          <div ref={progressRef} className="h-full bg-gradient-to-r from-[#c9a96e] to-[#b08d4a] origin-left scale-x-0" />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <button onClick={() => scrollToSection(heroRef)} className="group flex items-center gap-3">
              <span className="font-display text-xl font-bold gradient-text">SA</span>
              <span className="hidden md:block h-4 w-px bg-[#333]" />
              <span className="hidden md:block text-xs text-[#666] tracking-wider uppercase">Portfolio</span>
            </button>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSection(item.ref)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    activeSection === item.id ? 'text-[#c9a96e]' : 'text-[#888] hover:text-[#f5f5f5]'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#c9a96e]" />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => scrollToSection(contactRef)}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#c9a96e]/30 text-[#c9a96e] text-sm font-medium hover:bg-[#c9a96e] hover:text-[#0a0a0a] transition-all duration-300"
            >
              Let&apos;s Talk
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center"
            >
              <div className="flex flex-col gap-1.5">
                <div className={`w-5 h-px bg-[#c9a96e] transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
                <div className={`w-5 h-px bg-[#c9a96e] transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        ref={mobileMenuRef}
        className="fixed top-0 right-0 bottom-0 w-72 bg-[#111] border-l border-[#1a1a1a] z-50 lg:hidden translate-x-full"
      >
        <div className="p-8 pt-20">
          <div className="space-y-1">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => scrollToSection(item.ref)}
                className={`w-full text-left px-4 py-3 text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id ? 'text-[#c9a96e] bg-[#c9a96e]/5' : 'text-[#888] hover:text-[#f5f5f5]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => scrollToSection(contactRef)}
            className="w-full mt-6 px-4 py-3 rounded-lg border border-[#c9a96e]/30 text-[#c9a96e] text-sm font-medium hover:bg-[#c9a96e] hover:text-[#0a0a0a] transition-all duration-300"
          >
            Let&apos;s Talk
          </button>
        </div>
      </div>
    </>
  );
}
