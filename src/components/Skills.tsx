'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Skills({ skillsRef }: any) {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const categoriesRef = useRef<HTMLDivElement | null>(null);
  const orb1Ref = useRef<HTMLDivElement | null>(null);
  const orb2Ref = useRef<HTMLDivElement | null>(null);
  const accentLineRef = useRef<HTMLDivElement | null>(null);

  const skillCategories = [
    {
      title: 'Frontend',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      skills: [
        { name: 'React', level: 95 },
        { name: 'Next.js', level: 90 },
        { name: 'TypeScript', level: 88 },
        { name: 'Tailwind CSS', level: 92 },
        { name: 'GSAP', level: 85 },
      ]
    },
    {
      title: 'Backend',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
      skills: [
        { name: 'Node.js', level: 90 },
        { name: 'Python', level: 82 },
        { name: 'PostgreSQL', level: 85 },
        { name: 'MongoDB', level: 88 },
        { name: 'Redis', level: 80 },
      ]
    },
    {
      title: 'DevOps & Tools',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      skills: [
        { name: 'Docker', level: 85 },
        { name: 'AWS', level: 78 },
        { name: 'Git', level: 95 },
        { name: 'CI/CD', level: 82 },
        { name: 'Linux', level: 80 },
      ]
    },
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: skillsRef.current,
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

    // Title
    const letters = titleRef.current?.querySelectorAll('.letter') ?? [];
    tl.from(letters, {
      y: 60,
      opacity: 0,
      rotationX: 30,
      stagger: 0.02,
      duration: 0.6,
      clearProps: 'all'
    }, 0.3);

    // Subtitle
    tl.from(subtitleRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.5,
      clearProps: 'all'
    }, '-=0.3');

    // Category cards
    const categories = categoriesRef.current?.querySelectorAll('.category-card') ?? [];
    tl.from(categories, {
      y: 60,
      opacity: 0,
      stagger: 0.15,
      duration: 0.6,
      clearProps: 'all'
    }, '-=0.2');

    // Animate skill bars after cards appear
    categories.forEach((card, index) => {
      const bars = card.querySelectorAll('.skill-bar-fill');
      gsap.from(bars, {
        scaleX: 0,
        transformOrigin: 'left',
        duration: 0.8,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          once: true,
        },
        delay: index * 0.1,
        clearProps: 'all'
      });
    });

    // Floating orbs
    gsap.to(orb1Ref.current, {
      y: -40,
      x: 40,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to(orb2Ref.current, {
      y: 30,
      x: -30,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

  }, [skillsRef]);

  return (
    <section 
      ref={skillsRef}
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
        className="absolute top-1/4 left-[5%] w-96 h-96 rounded-full mix-blend-multiply pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(242,142,133,0.3) 0%, rgba(242,142,133,0.08) 40%, transparent 70%)',
          filter: 'blur(50px)',
          willChange: 'transform'
        }}
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-1/4 right-[5%] w-80 h-80 rounded-full mix-blend-multiply pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(156,44,44,0.25) 0%, rgba(156,44,44,0.08) 40%, transparent 70%)',
          filter: 'blur(50px)',
          willChange: 'transform'
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        
        {/* Header */}
        <div className="text-center mb-16">
          {/* Accent line */}
          <div 
            ref={accentLineRef}
            className="h-0.5 w-24 bg-gradient-to-r from-[#9C2C2C] to-[#F28E85] mx-auto mb-6"
          />
          
          {/* Title */}
          <h2 
            ref={titleRef}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
          >
            {'Skills & Technologies'.split('').map((char, i) => (
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
            A comprehensive toolkit for building{' '}
            <span className="font-medium italic text-[#9C2C2C]">modern web applications</span>
          </p>
        </div>

        {/* Skills Categories Grid */}
        <div 
          ref={categoriesRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              className="category-card group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-[#9C2C2C]/10 hover:shadow-2xl hover:border-[#9C2C2C]/30 transition-all duration-500"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#9C2C2C]/5 to-[#F28E85]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-[#9C2C2C] to-[#F28E85] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <div className="text-white">
                      {category.icon}
                    </div>
                  </div>
                  
                  {/* Title */}
                  <div>
                    <h3 className="text-2xl font-bold text-[#5A1A1A] group-hover:text-[#9C2C2C] transition-colors duration-300">
                      {category.title}
                    </h3>
                    <div className="h-0.5 w-12 bg-gradient-to-r from-[#9C2C2C] to-transparent mt-2" />
                  </div>
                </div>

                {/* Skills with progress bars */}
                <div className="space-y-5">
                  {category.skills.map((skill, skillIdx) => (
                    <div key={skillIdx}>
                      {/* Skill name and percentage */}
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-[#5A1A1A]">
                          {skill.name}
                        </span>
                        <span className="text-xs font-bold text-[#9C2C2C] bg-[#9C2C2C]/10 px-2 py-1 rounded-full">
                          {skill.level}%
                        </span>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="skill-bar-fill absolute inset-y-0 left-0 rounded-full"
                          style={{
                            width: `${skill.level}%`,
                            background: 'linear-gradient(90deg, #9C2C2C 0%, #F28E85 100%)',
                          }}
                        >
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#9C2C2C]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA or note */}
        <div className="text-center mt-16">
          <p className="text-[#7D3E3E]/70 font-light text-sm">
            Always learning, always growing. Constantly exploring new technologies to stay at the forefront.
          </p>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#9C2C2C]/30 to-transparent mx-auto mt-8" />
        </div>
      </div>

      {/* Custom shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
}