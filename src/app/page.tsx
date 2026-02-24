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
  const counterRef = useRef<HTMLDivElement>(null);
  const loaderNameRef = useRef<HTMLDivElement>(null);
  const loaderLineRef = useRef<HTMLDivElement>(null);
  const loaderTagRef = useRef<HTMLDivElement>(null);
  const columnLeftRef = useRef<HTMLDivElement>(null);
  const columnRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const entranceTL = gsap.timeline({ defaults: { ease: 'power3.out' } });

    entranceTL.from(loaderNameRef.current, {
      y: 60,
      opacity: 0,
      duration: 0.8,
    }, 0.3);

    entranceTL.from(loaderLineRef.current, {
      scaleX: 0,
      transformOrigin: 'left',
      duration: 0.6,
    }, 0.6);

    entranceTL.from(loaderTagRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.6,
    }, 0.8);

    const counter = { value: 0 };
    gsap.to(counter, {
      value: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      delay: 0.5,
      onUpdate: () => {
        setLoadingProgress(Math.round(counter.value));
      },
      onComplete: () => {
        const exitTL = gsap.timeline({
          onComplete: () => {
            setIsLoading(false);
            document.body.style.overflow = 'auto';
          }
        });

        exitTL.to([loaderNameRef.current, loaderTagRef.current, counterRef.current, loaderLineRef.current], {
          y: -40,
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.in'
        });

        exitTL.to(columnLeftRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power3.inOut'
        }, '-=0.1');

        exitTL.to(columnRightRef.current, {
          yPercent: 100,
          duration: 0.8,
          ease: 'power3.inOut'
        }, '<');
      }
    });

    return () => {
      gsap.killTweensOf(counter);
    };
  }, []);

  return (
    <>
      {isLoading && (
        <div ref={loaderRef} className="fixed inset-0 z-[100]">
          <div ref={columnLeftRef} className="absolute top-0 left-0 w-1/2 h-full bg-[#0a0a0a]" />
          <div ref={columnRightRef} className="absolute top-0 right-0 w-1/2 h-full bg-[#0a0a0a]" />

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
            <div ref={loaderNameRef} className="mb-4">
              <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight gradient-text">
                Sarmad Ahmed
              </h1>
            </div>

            <div
              ref={loaderLineRef}
              className="w-24 h-px bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent mb-4"
            />

            <div ref={loaderTagRef} className="mb-12">
              <p className="text-[#666] text-sm tracking-[0.3em] uppercase">
                Full-Stack Developer &amp; Designer
              </p>
            </div>

            <div ref={counterRef} className="relative">
              <span className="text-8xl md:text-9xl font-bold text-[#1a1a1a] font-display tabular-nums">
                {String(loadingProgress).padStart(3, '0')}
              </span>
              <span className="absolute -right-8 top-0 text-[#c9a96e] text-2xl font-light">%</span>
            </div>

            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48">
              <div className="h-px bg-[#1a1a1a] w-full">
                <div
                  className="h-full bg-[#c9a96e] transition-none"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-700`}>
        <div className="bg-[#0a0a0a] text-[#f5f5f5] overflow-x-hidden relative">
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

          <footer className="relative border-t border-[#1a1a1a]">
            <div className="max-w-7xl mx-auto px-6 py-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                <div>
                  <h3 className="font-display text-2xl font-bold gradient-text mb-4">Sarmad Ahmed</h3>
                  <p className="text-[#666] text-sm leading-relaxed max-w-sm">
                    Crafting exceptional digital experiences with precision and creativity.
                    Always pushing the boundaries of what&apos;s possible on the web.
                  </p>
                </div>
                <div>
                  <h4 className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] mb-6 font-semibold">Navigation</h4>
                  <ul className="space-y-3">
                    {[
                      { label: 'Home', ref: heroRef },
                      { label: 'About', ref: aboutRef },
                      { label: 'Projects', ref: projectsRef },
                      { label: 'Contact', ref: contactRef },
                    ].map((link, idx) => (
                      <li key={idx}>
                        <button
                          onClick={() => link.ref?.current?.scrollIntoView({ behavior: 'smooth' })}
                          className="text-[#666] hover:text-[#f5f5f5] transition-colors duration-300 text-sm"
                        >
                          {link.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] mb-6 font-semibold">Connect</h4>
                  <div className="flex gap-4">
                    {[
                      { label: 'GH', href: 'https://github.com/SarmadAhmed10' },
                      { label: 'LI', href: '#' },
                      { label: 'TW', href: '#' },
                    ].map((social, idx) => (
                      <a
                        key={idx}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full border border-[#222] flex items-center justify-center text-[#666] hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all duration-300 text-xs font-bold"
                      >
                        {social.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-t border-[#1a1a1a] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-[#444] text-xs">&copy; {new Date().getFullYear()} Sarmad Ahmed. All rights reserved.</p>
                <p className="text-[#333] text-xs">Designed &amp; Developed with passion</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
