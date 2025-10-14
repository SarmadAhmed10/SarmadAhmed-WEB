'use client';

import { useRef, useState, useEffect } from "react";
import { gsap } from 'gsap';
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const loaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    // Complete loading after progress reaches 100
    const checkProgress = setInterval(() => {
      if (loadingProgress >= 100) {
        clearInterval(checkProgress);
        
        // Animate loader exit
        const tl = gsap.timeline({
          onComplete: () => {
            setIsLoading(false);
            document.body.style.overflow = 'auto';
          }
        });

        tl.to(progressBarRef.current, {
          scaleX: 1,
          duration: 0.3,
          ease: 'power2.inOut'
        });

        tl.to(textRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.3
        }, '-=0.1');

        tl.to(logoRef.current, {
          scale: 0,
          rotation: 180,
          opacity: 0,
          duration: 0.5,
          ease: 'back.in(1.7)'
        }, '-=0.2');

        tl.to(loaderRef.current, {
          y: '-100%',
          duration: 0.8,
          ease: 'power3.inOut'
        }, '-=0.3');
      }
    }, 100);

    // Prevent scrolling during load
    document.body.style.overflow = 'hidden';

    return () => {
      clearInterval(interval);
      clearInterval(checkProgress);
    };
  }, [loadingProgress]);

  return (
    <>
      {/* Premium Loader */}
      {isLoading && (
        <div
          ref={loaderRef}
          className="fixed inset-0 z-[100] bg-gradient-to-br from-[#F9F6F3] via-[#FFF9F7] to-[#FDECEC] flex items-center justify-center"
        >
          {/* Grain texture */}
          <div 
            className="absolute inset-0 opacity-[0.015] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E")`,
            }}
          />

          {/* Animated orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#9C2C2C]/20 blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#F28E85]/20 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />

          <div className="relative z-10 text-center">
            {/* Logo */}
            <div
              ref={logoRef}
              className="mb-8 inline-block"
            >
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#9C2C2C] to-[#F28E85] flex items-center justify-center shadow-2xl">
                  <span className="text-white font-bold text-4xl">S</span>
                </div>
                {/* Rotating ring */}
                <div className="absolute inset-0 rounded-full border-4 border-[#9C2C2C]/30 border-t-[#9C2C2C] animate-spin" />
              </div>
            </div>

            {/* Loading text */}
            <div ref={textRef} className="mb-6">
              <h2 className="text-3xl font-bold mb-2" style={{
                background: 'linear-gradient(135deg, #5A1A1A 0%, #9C2C2C 50%, #7D3E3E 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Loading Experience
              </h2>
              <p className="text-[#7D3E3E] font-light">
                Crafting something amazing...
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-64 h-2 bg-[#9C2C2C]/10 rounded-full overflow-hidden mx-auto">
              <div
                ref={progressBarRef}
                className="h-full bg-gradient-to-r from-[#9C2C2C] to-[#F28E85] origin-left transition-transform duration-300"
                style={{ transform: `scaleX(${loadingProgress / 100})` }}
              />
            </div>

            {/* Percentage */}
            <div className="mt-4 text-[#9C2C2C] font-semibold text-lg">
              {Math.min(Math.round(loadingProgress), 100)}%
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
        <div className="bg-gradient-to-br from-[#F9F6F3] to-[#FDECEC] text-[#5A1A1A] overflow-x-hidden selection:bg-[#9C2C2C] selection:text-white relative">
          <Cursor />

          <Navbar
            heroRef={heroRef}
            aboutRef={aboutRef}
            skillsRef={skillsRef}
            projectsRef={projectsRef}
            testimonialsRef={testimonialsRef}
            contactRef={contactRef}
          />

          <Hero heroRef={heroRef} projectsRef={projectsRef} />
          <About aboutRef={aboutRef} />
          <Skills skillsRef={skillsRef} />
          <Projects projectsRef={projectsRef} />
          <Testimonials testimonialsRef={testimonialsRef} />
          <Contact contactRef={contactRef} />

          {/* Premium Footer */}
          <footer className="relative bg-gradient-to-br from-[#5A1A1A] via-[#7D3E3E] to-[#9C2C2C] text-white overflow-hidden">
            {/* Grain texture */}
            <div 
              className="absolute inset-0 opacity-[0.02] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E")`,
              }}
            />

            {/* Decorative orbs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#F28E85]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#9C2C2C]/10 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                
                {/* Brand */}
                <div className="md:col-span-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F28E85] to-white flex items-center justify-center shadow-xl">
                      <span className="text-[#9C2C2C] font-bold text-xl">S</span>
                    </div>
                    <div>
                      <div className="text-xl font-bold">Sarmad Ahmed</div>
                      <div className="text-sm text-white/70">Full-Stack Developer</div>
                    </div>
                  </div>
                  <p className="text-white/80 leading-relaxed mb-6 max-w-md">
                    Crafting exceptional digital experiences with a perfect blend of creativity and technical excellence. Let's build something amazing together.
                  </p>
                  
                  {/* Social links */}
                  <div className="flex gap-3">
                    {[
                      { name: 'LinkedIn', icon: 'in' },
                      { name: 'GitHub', icon: 'gh' },
                      { name: 'Twitter', icon: 'tw' },
                      { name: 'Instagram', icon: 'ig' }
                    ].map((social, idx) => (
                      <a
                        key={idx}
                        href="#"
                        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-[#9C2C2C] transition-all duration-300 hover:scale-110 text-xs font-bold"
                        aria-label={social.name}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    {[
                      { label: 'Home', ref: heroRef },
                      { label: 'About', ref: aboutRef },
                      { label: 'Skills', ref: skillsRef },
                      { label: 'Projects', ref: projectsRef },
                    ].map((link, idx) => (
                      <li key={idx}>
                        <button
                          onClick={() => link.ref?.current?.scrollIntoView({ behavior: 'smooth' })}
                          className="text-white/70 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                        >
                          {link.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Info */}
                <div>
                  <h3 className="text-lg font-bold mb-4">Get In Touch</h3>
                  <ul className="space-y-3 text-white/70">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href="mailto:sarmad@example.com" className="hover:text-white transition-colors duration-300">
                        sarmad@example.com
                      </a>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a href="tel:+923001234567" className="hover:text-white transition-colors duration-300">
                        +92 300 1234567
                      </a>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span>Karachi, Pakistan</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-white/60 text-sm">
                  © 2025 Sarmad Ahmed. Crafted with passion and precision.
                </p>
                <div className="flex gap-6 text-sm text-white/60">
                  <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
                  <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}