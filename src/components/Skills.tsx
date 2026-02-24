'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Skills({ skillsRef }: any) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  const skillCategories = [
    {
      title: 'AI & Machine Learning',
      skills: ['OpenAI / GPT-4', 'LangChain', 'RAG Pipelines', 'Fine-Tuning', 'Vector DBs', 'Prompt Engineering', 'Hugging Face', 'AI Agents'],
    },
    {
      title: 'Full-Stack Development',
      skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'MongoDB'],
    },
    {
      title: 'Cloud & Infrastructure',
      skills: ['AWS', 'Docker', 'Vercel', 'Redis', 'CI/CD', 'Git', 'Supabase', 'Linux'],
    },
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: skillsRef.current, start: 'top 70%', once: true },
      defaults: { ease: 'power2.out' }
    });

    tl.from(lineRef.current, { scaleX: 0, transformOrigin: 'left', duration: 0.8 }, 0);
    tl.from(titleRef.current, { y: 60, opacity: 0, duration: 0.8 }, 0.2);

    const cards = categoriesRef.current?.querySelectorAll('.skill-category') ?? [];
    tl.from(cards, { y: 60, opacity: 0, stagger: 0.15, duration: 0.7 }, 0.4);
  }, [skillsRef]);

  return (
    <section ref={skillsRef} className="relative min-h-screen flex items-center px-6 py-32 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.15) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="mb-20">
          <div ref={lineRef} className="h-px w-16 bg-[#c9a96e] mb-8" />
          <h2 ref={titleRef} className="font-display text-5xl md:text-6xl lg:text-7xl font-bold">
            <span className="text-[#f5f5f5]">Skills &amp; </span>
            <span className="gradient-text italic">Technologies</span>
          </h2>
        </div>

        <div ref={categoriesRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="skill-category group p-8 rounded-xl border border-[#1a1a1a] bg-[#111]/30 hover:border-[#c9a96e]/20 transition-all duration-500">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#c9a96e]" />
                <h3 className="text-lg font-semibold text-[#f5f5f5]">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="px-4 py-2 text-sm text-[#999] border border-[#1a1a1a] rounded-full hover:border-[#c9a96e]/30 hover:text-[#c9a96e] transition-all duration-300 cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-[#444] text-sm">Shipping AI-native products since 2022.</p>
        </div>
      </div>
    </section>
  );
}
