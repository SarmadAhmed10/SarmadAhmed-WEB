'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type NavbarProps = {
  heroRef?: any;
  aboutRef?: any;
  skillsRef?: any;
  projectsRef?: any;
  testimonialsRef?: any;
  contactRef?: any;
};

export default function Navbar({ 
  heroRef, 
  aboutRef, 
  skillsRef, 
  projectsRef, 
  testimonialsRef, 
  contactRef 
}: NavbarProps) {
  const navRef = useRef<HTMLElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLAnchorElement | null>(null);
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
    { label: 'Testimonials', ref: testimonialsRef, id: 'testimonials' },
  ];

  const scrollToSection = (ref: any) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    // Entrance animation
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    
    tl.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 0.8,
      clearProps: 'all'
    });

    tl.from(logoRef.current, {
      scale: 0,
      opacity: 0,
      rotation: -180,
      duration: 0.6,
      ease: 'back.out(1.7)',
      clearProps: 'all'
    }, '-=0.4');

    const menuItems = menuRef.current?.querySelectorAll('.nav-item') ?? [];
    tl.from(menuItems, {
      y: -30,
      opacity: 0,
      stagger: 0.08,
      duration: 0.5,
      clearProps: 'all'
    }, '-=0.4');

    tl.from(ctaRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: 'back.out(1.7)',
      clearProps: 'all'
    }, '-=0.3');

    // Scroll progress bar
    gsap.to(progressRef.current, {
      scaleX: 1,
      transformOrigin: 'left',
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      }
    });

    // Scroll detection
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Active section detection
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
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [heroRef, aboutRef, skillsRef, projectsRef, testimonialsRef]);

  // Mobile menu animation
  useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.to(mobileMenuRef.current, {
        x: 0,
        duration: 0.4,
        ease: 'power2.out'
      });

      const items = mobileMenuRef.current?.querySelectorAll('.mobile-nav-item') ?? [];
      gsap.from(items, {
        x: 50,
        opacity: 0,
        stagger: 0.08,
        duration: 0.4,
        ease: 'power2.out'
      });
    } else {
      gsap.to(mobileMenuRef.current, {
        x: '100%',
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-lg shadow-lg py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#9C2C2C]/10">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-[#9C2C2C] to-[#F28E85] origin-left scale-x-0"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <div
              ref={logoRef}
              onClick={() => scrollToSection(heroRef)}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative">
                {/* Animated logo circle */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#9C2C2C] to-[#F28E85] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                {/* Pulse ring */}
                <div className="absolute inset-0 rounded-full bg-[#9C2C2C] opacity-0 group-hover:opacity-20 group-hover:scale-125 transition-all duration-300" />
              </div>
              
              <div className="hidden md:block">
                <div className="text-lg font-bold text-[#5A1A1A] group-hover:text-[#9C2C2C] transition-colors duration-300">
                  Sarmad Ahmed
                </div>
                <div className="text-xs text-[#7D3E3E]/70 font-light">
                  Full-Stack Developer
                </div>
              </div>
            </div>

            {/* Desktop Menu */}
            <div
              ref={menuRef}
              className="hidden lg:flex items-center gap-1"
            >
              {navItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSection(item.ref)}
                  className={`nav-item relative px-5 py-2 rounded-full font-medium transition-all duration-300 group ${
                    activeSection === item.id
                      ? 'text-[#9C2C2C]'
                      : 'text-[#5A1A1A] hover:text-[#9C2C2C]'
                  }`}
                >
                  {/* Active indicator */}
                  {activeSection === item.id && (
                    <div className="absolute inset-0 bg-[#9C2C2C]/10 rounded-full" />
                  )}
                  
                  <span className="relative z-10">{item.label}</span>
                  
                  {/* Hover underline */}
                  <div className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-[#9C2C2C] to-[#F28E85] transition-all duration-300 ${
                    activeSection === item.id ? 'w-8' : 'w-0 group-hover:w-8'
                  }`} />
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <a
              ref={ctaRef}
              onClick={() => scrollToSection(contactRef)}
              className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#9C2C2C] to-[#F28E85] text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group"
            >
              <span>Let's Talk</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative w-10 h-10 rounded-lg bg-[#9C2C2C]/10 flex items-center justify-center hover:bg-[#9C2C2C]/20 transition-colors duration-300"
            >
              <div className="flex flex-col gap-1.5">
                <div className={`w-5 h-0.5 bg-[#9C2C2C] rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <div className={`w-5 h-0.5 bg-[#9C2C2C] rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                <div className={`w-5 h-0.5 bg-[#9C2C2C] rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-2xl z-50 lg:hidden translate-x-full"
      >
        <div className="p-8">
          {/* Close button */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#9C2C2C]/10 flex items-center justify-center hover:bg-[#9C2C2C]/20 transition-colors duration-300"
          >
            <svg className="w-6 h-6 text-[#9C2C2C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Logo */}
          <div className="flex items-center gap-3 mb-12 mt-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#9C2C2C] to-[#F28E85] flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div>
              <div className="text-lg font-bold text-[#5A1A1A]">Sarmad Ahmed</div>
              <div className="text-xs text-[#7D3E3E]/70">Full-Stack Developer</div>
            </div>
          </div>

          {/* Mobile nav items */}
          <div className="space-y-2">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => scrollToSection(item.ref)}
                className={`mobile-nav-item w-full text-left px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-[#9C2C2C]/10 to-[#F28E85]/10 text-[#9C2C2C] border-l-4 border-[#9C2C2C]'
                    : 'text-[#5A1A1A] hover:bg-[#9C2C2C]/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile CTA */}
          <button
            onClick={() => scrollToSection(contactRef)}
            className="mobile-nav-item w-full mt-8 px-6 py-4 rounded-xl bg-gradient-to-r from-[#9C2C2C] to-[#F28E85] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>Let's Talk</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>

          {/* Social links */}
          <div className="flex gap-3 mt-8 justify-center">
            {['in', 'gh', 'tw', 'ig'].map((social, idx) => (
              <a
                key={idx}
                href="#"
                className="w-10 h-10 rounded-full bg-[#9C2C2C]/10 flex items-center justify-center text-[#9C2C2C] hover:bg-[#9C2C2C] hover:text-white transition-all duration-300 text-xs font-bold"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}