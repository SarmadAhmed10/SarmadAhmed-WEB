'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About({ aboutRef }: any) {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const accentLineRef = useRef<HTMLDivElement | null>(null);
  const orbRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutRef.current,
        start: 'top 70%',
        once: true,
      },
      defaults: { ease: 'power2.out' }
    });

    // Orb entrance
    tl.from(orbRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.8
    }, 0);

    // Accent line draw
    tl.from(accentLineRef.current, {
      scaleX: 0,
      transformOrigin: 'left',
      duration: 0.8
    }, 0.2);

    // Title with letter animation
    const letters = titleRef.current?.querySelectorAll('.letter') ?? [];
    tl.from(letters, {
      y: 60,
      opacity: 0,
      rotationX: 30,
      stagger: 0.03,
      duration: 0.6
    }, 0.3);

    // Description
    tl.from(descRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.6,
      clearProps: 'all'
    }, '-=0.3');

    // Image with 3D effect
    tl.from(imageRef.current, {
      x: -60,
      opacity: 0,
      rotationY: -15,
      duration: 0.7,
      clearProps: 'all'
    }, '-=0.4');

    // Stats cards
    const statCards = statsRef.current?.querySelectorAll('.stat-card') ?? [];
    tl.from(statCards, {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      clearProps: 'all'
    }, '-=0.4');

    // Skills
    const skillItems = skillsRef.current?.querySelectorAll('.skill-item') ?? [];
    tl.from(skillItems, {
      scale: 0,
      opacity: 0,
      stagger: 0.05,
      duration: 0.4,
      ease: 'back.out(1.7)',
      clearProps: 'all'
    }, '-=0.3');

    // Floating orb animation
    gsap.to(orbRef.current, {
      y: -30,
      x: 30,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Image tilt on hover
    const image = imageRef.current;
    if (image) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = image.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        gsap.to(image, {
          rotationY: x * 10,
          rotationX: -y * 10,
          duration: 0.3,
          ease: 'power1.out'
        });
      };

      const handleMouseLeave = () => {
        gsap.to(image, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.5,
          ease: 'power1.out'
        });
      };

      image.addEventListener('mousemove', handleMouseMove);
      image.addEventListener('mouseleave', handleMouseLeave);
    }

  }, [aboutRef]);

  const stats = [
    { number: '5+', label: 'Years Experience' },
    { number: '50+', label: 'Projects Completed' },
    { number: '30+', label: 'Happy Clients' },
  ];

  const skills = [
    'React', 'Next.js', 'TypeScript', 'Node.js',
    'Tailwind CSS', 'GSAP', 'Three.js', 'PostgreSQL',
    'MongoDB', 'AWS', 'Docker', 'Git'
  ];

  return (
    <section 
      ref={aboutRef} 
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

      {/* Floating orb */}
      <div
        ref={orbRef}
        className="absolute top-1/4 right-[10%] w-80 h-80 rounded-full mix-blend-multiply pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(156,44,44,0.25) 0%, rgba(156,44,44,0.08) 40%, transparent 70%)',
          filter: 'blur(50px)',
          willChange: 'transform'
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          {/* Accent line */}
          <div 
            ref={accentLineRef}
            className="h-0.5 w-24 bg-gradient-to-r from-[#9C2C2C] to-[#F28E85] mx-auto mb-6"
          />
          
          {/* Title */}
          <h2 
            ref={titleRef}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            {'About Me'.split('').map((char, i) => (
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

          {/* Description */}
          <p 
            ref={descRef}
            className="text-lg md:text-xl text-[#7D3E3E] font-light max-w-3xl mx-auto leading-relaxed"
            style={{ letterSpacing: '0.01em' }}
          >
            I'm a passionate full-stack developer focused on crafting visually stunning and{' '}
            <span className="font-medium italic text-[#9C2C2C]">high-performing web experiences</span>. 
            My goal is to merge creativity with technology — building products that not only function beautifully but feel magical.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          
          {/* Left - Visual Element */}
          <div className="relative group">
            {/* Decorative frame */}
            <div className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-[#9C2C2C] opacity-40 transition-all duration-500 group-hover:w-24 group-hover:h-24" />
            <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-[#9C2C2C] opacity-40 transition-all duration-500 group-hover:w-24 group-hover:h-24" />
            
            <div
              ref={imageRef}
              className="relative w-full aspect-square bg-gradient-to-br from-[#9C2C2C]/10 to-[#F28E85]/10 rounded-2xl overflow-hidden shadow-2xl border border-[#9C2C2C]/20"
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
                willChange: 'transform'
              }}
            >
              {/* Shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
              
              {/* Content */}
              <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
                {/* Icon/Visual representation */}
                <div className="relative mb-6">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#9C2C2C] to-[#F28E85] flex items-center justify-center shadow-xl">
                    <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  {/* Pulse ring */}
                  <div className="absolute inset-0 rounded-full bg-[#9C2C2C] opacity-20 animate-ping" />
                </div>

                {/* Text */}
                <h3 className="text-2xl font-bold text-[#5A1A1A] mb-2">Code Craftsman</h3>
                <p className="text-[#7D3E3E] text-center font-light">
                  Building digital experiences with precision and creativity
                </p>

                {/* Decorative elements */}
                <div className="absolute top-6 left-6 w-16 h-16 border-t border-l border-[#9C2C2C]/30" />
                <div className="absolute bottom-6 right-6 w-16 h-16 border-b border-r border-[#9C2C2C]/30" />
              </div>
            </div>
          </div>

          {/* Right - Stats */}
          <div ref={statsRef} className="space-y-6">
            {stats.map((stat, i) => (
              <div 
                key={i}
                className="stat-card group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#9C2C2C]/10 hover:shadow-2xl hover:border-[#9C2C2C]/30 transition-all duration-300"
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#9C2C2C]/5 to-[#F28E85]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative flex items-center gap-6">
                  {/* Number */}
                  <div className="flex-shrink-0">
                    <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-[#9C2C2C] to-[#F28E85] bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                  </div>
                  
                  {/* Divider */}
                  <div className="h-16 w-px bg-gradient-to-b from-transparent via-[#9C2C2C]/30 to-transparent" />
                  
                  {/* Label */}
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-[#5A1A1A] group-hover:text-[#9C2C2C] transition-colors duration-300">
                      {stat.label}
                    </p>
                    <p className="text-sm text-[#7D3E3E]/70 mt-1">
                      {i === 0 && 'Building exceptional digital products'}
                      {i === 1 && 'Successfully delivered with passion'}
                      {i === 2 && 'Long-term partnerships built'}
                    </p>
                  </div>
                  
                  {/* Icon */}
                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-6 h-6 text-[#9C2C2C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-[#5A1A1A] mb-8">
            Technical <span className="text-[#9C2C2C]">Expertise</span>
          </h3>
          
          <div 
            ref={skillsRef}
            className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
          >
            {skills.map((skill, i) => (
              <div
                key={i}
                className="skill-item group relative px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-[#9C2C2C]/20 shadow-md hover:shadow-xl hover:border-[#9C2C2C]/40 transition-all duration-300 cursor-default"
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#9C2C2C]/10 to-[#F28E85]/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <span className="relative text-sm font-semibold text-[#5A1A1A] group-hover:text-[#9C2C2C] transition-colors duration-300">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="mt-20 flex justify-center">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#9C2C2C]/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}