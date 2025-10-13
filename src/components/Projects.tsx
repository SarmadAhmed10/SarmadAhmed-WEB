'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Projects({ projectsRef }: any) {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const projectsContainerRef = useRef<HTMLDivElement | null>(null);
  const accentLineRef = useRef<HTMLDivElement | null>(null);
  const orb1Ref = useRef<HTMLDivElement | null>(null);
  const orb2Ref = useRef<HTMLDivElement | null>(null);
  const orb3Ref = useRef<HTMLDivElement | null>(null);
  const [activeProject, setActiveProject] = useState(0);

  const projects = [
    {
      title: "E-Commerce Platform",
      subtitle: "Next-Gen Shopping Experience",
      description: "Full-stack marketplace featuring real-time inventory management, secure payment processing, and AI-powered product recommendations. Built for scale with microservices architecture.",
      tech: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Stripe"],
      metrics: [
        { label: "Users", value: "50K+" },
        { label: "Uptime", value: "99.9%" },
        { label: "Response", value: "<100ms" },
      ],
      image: "🛍️",
      link: "#"
    },
    {
      title: "AI Content Generator",
      subtitle: "Intelligence Meets Creativity",
      description: "ML-powered content creation tool with GPT-4 integration, delivering high-quality articles, marketing copy, and creative content. Features advanced prompt engineering and content optimization.",
      tech: ["React", "Python", "OpenAI", "FastAPI", "AWS"],
      metrics: [
        { label: "Generated", value: "1M+" },
        { label: "Accuracy", value: "95%" },
        { label: "Speed", value: "2s avg" },
      ],
      image: "🤖",
      link: "#"
    },
    {
      title: "Analytics Dashboard",
      subtitle: "Data-Driven Insights",
      description: "Real-time analytics platform with interactive data visualization, custom reporting, and predictive analytics. Processes millions of events daily with sub-second query performance.",
      tech: ["Vue.js", "D3.js", "Firebase", "BigQuery", "Kafka"],
      metrics: [
        { label: "Events/day", value: "10M+" },
        { label: "Dashboards", value: "500+" },
        { label: "Queries", value: "<500ms" },
      ],
      image: "📊",
      link: "#"
    },
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: projectsRef.current,
        start: 'top 70%',
        once: true,
      },
      defaults: { ease: 'power2.out' }
    });

    // Orbs entrance
    tl.from([orb1Ref.current, orb2Ref.current, orb3Ref.current], {
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

    // Title animation
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

    // Project cards with stagger
    const cards = projectsContainerRef.current?.querySelectorAll('.project-card') ?? [];
    tl.from(cards, {
      y: 80,
      opacity: 0,
      rotationY: -10,
      stagger: 0.15,
      duration: 0.7,
      clearProps: 'all'
    }, '-=0.2');

    // Floating orbs
    gsap.to(orb1Ref.current, {
      y: -50,
      x: 50,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to(orb2Ref.current, {
      y: 40,
      x: -40,
      duration: 9,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to(orb3Ref.current, {
      y: -30,
      x: -50,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

  }, [projectsRef]);

  return (
    <section 
      ref={projectsRef}
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

      {/* Floating orbs */}
      <div
        ref={orb1Ref}
        className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full mix-blend-multiply pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(156,44,44,0.3) 0%, rgba(156,44,44,0.08) 40%, transparent 70%)',
          filter: 'blur(60px)',
          willChange: 'transform'
        }}
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full mix-blend-multiply pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(242,142,133,0.3) 0%, rgba(242,142,133,0.08) 40%, transparent 70%)',
          filter: 'blur(60px)',
          willChange: 'transform'
        }}
      />
      <div
        ref={orb3Ref}
        className="absolute top-1/2 right-[5%] w-[350px] h-[350px] rounded-full mix-blend-multiply pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(125,62,62,0.25) 0%, rgba(125,62,62,0.08) 40%, transparent 70%)',
          filter: 'blur(60px)',
          willChange: 'transform'
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        
        {/* Header */}
        <div className="text-center mb-20">
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
            {'Featured Projects'.split('').map((char, i) => (
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
            Showcasing{' '}
            <span className="font-medium italic text-[#9C2C2C]">exceptional work</span>
            {' '}that combines innovation, design, and engineering excellence
          </p>
        </div>

        {/* Projects Grid */}
        <div 
          ref={projectsContainerRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="project-card group relative bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-[#9C2C2C]/10 hover:shadow-[0_20px_60px_rgba(156,44,44,0.25)] transition-all duration-700 hover:scale-[1.02]"
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#9C2C2C]/10 via-transparent to-[#F28E85]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

              <div className="relative p-8">
                {/* Project Icon/Image */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#9C2C2C] to-[#F28E85] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500">
                    <span className="text-4xl">{project.image}</span>
                  </div>
                  {/* Status badge */}
                  <div className="absolute -top-2 -right-2 px-3 py-1 bg-gradient-to-r from-[#9C2C2C] to-[#F28E85] rounded-full shadow-lg">
                    <span className="text-xs font-bold text-white">Live</span>
                  </div>
                </div>

                {/* Project subtitle */}
                <div className="text-xs font-semibold text-[#9C2C2C] tracking-wider uppercase mb-2">
                  {project.subtitle}
                </div>

                {/* Project title */}
                <h3 className="text-2xl md:text-3xl font-bold text-[#5A1A1A] mb-4 group-hover:text-[#9C2C2C] transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-[#7D3E3E] text-sm leading-relaxed mb-6 line-clamp-4">
                  {project.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-[#9C2C2C]/10">
                  {project.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="text-center">
                      <div className="text-lg font-bold text-[#9C2C2C]">{metric.value}</div>
                      <div className="text-xs text-[#7D3E3E]/70 font-light">{metric.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, tIdx) => (
                    <span 
                      key={tIdx}
                      className="px-3 py-1 bg-[#9C2C2C]/5 text-[#5A1A1A] rounded-full text-xs font-semibold border border-[#9C2C2C]/10 group-hover:bg-[#9C2C2C]/10 group-hover:border-[#9C2C2C]/20 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <button className="relative w-full group/btn overflow-hidden rounded-full border-2 border-[#9C2C2C] py-3 transition-all duration-300 hover:shadow-lg">
                  <span className="absolute inset-0 bg-[#9C2C2C] transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left" />
                  
                  <span className="relative z-10 flex items-center justify-center gap-2 text-[#9C2C2C] font-semibold group-hover/btn:text-white transition-colors duration-300">
                    View Project
                    <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>

                {/* Decorative corner accents */}
                <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-[#9C2C2C]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-[#9C2C2C]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom navigation dots */}
        <div className="flex justify-center gap-3 mt-16">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveProject(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeProject === idx 
                  ? 'w-12 bg-gradient-to-r from-[#9C2C2C] to-[#F28E85]' 
                  : 'w-2 bg-[#9C2C2C]/30 hover:bg-[#9C2C2C]/50'
              }`}
            />
          ))}
        </div>

        {/* Bottom note */}
        <div className="text-center mt-12">
          <p className="text-[#7D3E3E]/70 font-light text-sm">
            Want to see more? Check out my{' '}
            <a href="#" className="text-[#9C2C2C] font-semibold hover:underline transition-all duration-200">
              full portfolio
            </a>
          </p>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#9C2C2C]/30 to-transparent mx-auto mt-8" />
        </div>
      </div>
    </section>
  );
}