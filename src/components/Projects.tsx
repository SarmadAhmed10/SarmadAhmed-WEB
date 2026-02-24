'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Projects({ projectsRef }: any) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: 'NexusAI',
      subtitle: 'AI-Powered SaaS Platform',
      description: 'A multi-tenant SaaS platform that lets businesses deploy custom AI assistants trained on their own data. Features RAG pipeline, real-time chat, usage analytics, and Stripe billing.',
      tech: ['Next.js', 'OpenAI', 'Pinecone', 'FastAPI', 'Stripe'],
      link: '#',
      icon: '🧠',
    },
    {
      title: 'DocuMind',
      subtitle: 'Intelligent Document Analysis',
      description: 'An AI document intelligence tool that extracts, summarizes, and answers questions from PDFs, contracts, and research papers using GPT-4 with retrieval-augmented generation.',
      tech: ['Python', 'LangChain', 'GPT-4', 'ChromaDB', 'React'],
      link: '#',
      icon: '📄',
    },
    {
      title: 'AgentForge',
      subtitle: 'Multi-Agent Orchestration Framework',
      description: 'An open-source framework for building autonomous AI agent pipelines. Supports tool-use, memory, chain-of-thought reasoning, and multi-agent collaboration out of the box.',
      tech: ['Python', 'LangGraph', 'Redis', 'WebSockets', 'Docker'],
      link: '#',
      icon: '⚡',
    },
    {
      title: 'VoiceFlow Studio',
      subtitle: 'AI Voice Assistant Builder',
      description: 'A no-code platform for creating AI-powered voice assistants and phone agents. Integrates with Twilio, ElevenLabs, and OpenAI for natural, human-like conversations.',
      tech: ['TypeScript', 'Twilio', 'ElevenLabs', 'OpenAI', 'AWS'],
      link: '#',
      icon: '🎙️',
    },
    {
      title: 'Optimail AI',
      subtitle: 'AI Email Optimization Engine',
      description: 'An intelligent email platform that uses LLMs to auto-generate, A/B test, and personalize email campaigns. Improved client open rates by 3x with AI-driven subject line optimization.',
      tech: ['Python', 'GPT-4', 'FastAPI', 'PostgreSQL', 'Redis'],
      link: '#',
      icon: '📧',
    },
    {
      title: 'CodeReview AI',
      subtitle: 'Automated Code Analysis',
      description: 'A GitHub-integrated tool that reviews pull requests using AI — identifies bugs, security vulnerabilities, and suggests improvements with inline comments and severity scoring.',
      tech: ['Node.js', 'GitHub API', 'OpenAI', 'TypeScript', 'Vercel'],
      link: '#',
      icon: '🔍',
    },
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: projectsRef.current, start: 'top 70%', once: true },
      defaults: { ease: 'power2.out' }
    });

    tl.from(lineRef.current, { scaleX: 0, transformOrigin: 'left', duration: 0.8 }, 0);
    tl.from(titleRef.current, { y: 60, opacity: 0, duration: 0.8 }, 0.2);

    const cards = containerRef.current?.querySelectorAll('.project-card') ?? [];
    tl.from(cards, { y: 80, opacity: 0, stagger: 0.12, duration: 0.7 }, 0.4);
  }, [projectsRef]);

  return (
    <section ref={projectsRef} className="relative min-h-screen flex items-center px-6 py-32 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.15) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="mb-20">
          <div ref={lineRef} className="h-px w-16 bg-[#c9a96e] mb-8" />
          <h2 ref={titleRef} className="font-display text-5xl md:text-6xl lg:text-7xl font-bold">
            <span className="text-[#f5f5f5]">Featured </span>
            <span className="gradient-text italic">Projects</span>
          </h2>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <a
              key={idx}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card group relative p-8 rounded-xl border border-[#1a1a1a] bg-[#111]/30 hover:border-[#c9a96e]/20 transition-all duration-500 hover:bg-[#111]/60 block"
            >
              {/* Icon */}
              <div className="text-3xl mb-6 group-hover:scale-110 transition-transform duration-300 inline-block">
                {project.icon}
              </div>

              {/* Subtitle */}
              <div className="text-xs text-[#c9a96e] tracking-wider uppercase mb-2 font-medium">
                {project.subtitle}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#f5f5f5] mb-3 group-hover:text-[#c9a96e] transition-colors duration-300">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[#777] leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Tech */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t, tIdx) => (
                  <span key={tIdx} className="px-2 py-1 text-xs text-[#888] border border-[#1a1a1a] rounded">
                    {t}
                  </span>
                ))}
              </div>

              {/* Link indicator */}
              <div className="flex items-center gap-2 text-sm text-[#555] group-hover:text-[#c9a96e] transition-colors duration-300">
                <span>View Project</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>

              {/* Corner accent on hover */}
              <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#c9a96e]/0 group-hover:border-[#c9a96e]/30 transition-all duration-500" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-[#c9a96e]/0 group-hover:border-[#c9a96e]/30 transition-all duration-500" />
            </a>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="https://github.com/SarmadAhmed10"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#222] text-[#888] text-sm hover:border-[#c9a96e]/30 hover:text-[#c9a96e] transition-all duration-300"
          >
            <span>View All Projects</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
