'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About({ aboutRef }: any) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: aboutRef.current, start: 'top 70%', once: true },
      defaults: { ease: 'power2.out' }
    });

    tl.from(lineRef.current, { scaleX: 0, transformOrigin: 'left', duration: 0.8 }, 0);
    tl.from(titleRef.current, { y: 60, opacity: 0, duration: 0.8 }, 0.2);

    if (descRef.current) {
      tl.from(Array.from(descRef.current.children), {
        y: 40, opacity: 0, stagger: 0.15, duration: 0.6
      }, 0.4);
    }

    const statCards = statsRef.current?.querySelectorAll('.stat-card') ?? [];
    tl.from(statCards, { y: 50, opacity: 0, stagger: 0.1, duration: 0.6 }, 0.5);
  }, [aboutRef]);

  const stats = [
    { number: '4+', label: 'Years of Experience', desc: 'AI integration & full-stack development' },
    { number: '30+', label: 'Projects Shipped', desc: 'AI products, SaaS platforms & APIs' },
    { number: '20+', label: 'Technologies', desc: 'LLMs, cloud infra & modern frameworks' },
  ];

  return (
    <section ref={aboutRef} className="relative min-h-screen flex items-center px-6 py-32 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.2) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="mb-20">
          <div ref={lineRef} className="h-px w-16 bg-[#c9a96e] mb-8" />
          <h2 ref={titleRef} className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
            <span className="text-[#f5f5f5]">About </span>
            <span className="gradient-text italic">Me</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div ref={descRef} className="space-y-6">
            <p className="text-lg text-[#999] font-light leading-relaxed">
              I&apos;m an AI integration specialist and full-stack engineer based in <span className="text-[#f5f5f5]">Karachi, Pakistan</span>.
              I help startups and enterprises embed intelligence into their products — from GPT-powered chatbots
              and RAG pipelines to autonomous agent systems.
            </p>
            <p className="text-lg text-[#999] font-light leading-relaxed">
              My work sits at the intersection of <span className="text-[#c9a96e] italic">machine learning and product engineering</span>.
              I don&apos;t just prototype — I build production-ready AI systems with proper evaluation,
              observability, and scalable infrastructure.
            </p>
            <p className="text-lg text-[#999] font-light leading-relaxed">
              Whether it&apos;s fine-tuning LLMs, designing multi-agent architectures, or building
              full-stack SaaS platforms with Next.js and Python, I deliver end-to-end —
              from research to deployment.
            </p>
            <div className="mt-8 pt-8 border-t border-[#1a1a1a]">
              <p className="text-sm text-[#666] italic">
                &quot;The best AI products don&apos;t feel like AI at all — they feel like
                magic woven into everyday software.&quot;
              </p>
            </div>
          </div>

          <div ref={statsRef} className="space-y-6">
            {stats.map((stat, i) => (
              <div key={i} className="stat-card group p-6 rounded-xl border border-[#1a1a1a] bg-[#111]/50 hover:border-[#c9a96e]/20 transition-all duration-500">
                <div className="flex items-center gap-6">
                  <div className="text-4xl md:text-5xl font-bold font-display gradient-text min-w-[80px]">
                    {stat.number}
                  </div>
                  <div className="h-12 w-px bg-[#222]" />
                  <div>
                    <p className="text-[#f5f5f5] font-semibold mb-1">{stat.label}</p>
                    <p className="text-sm text-[#666]">{stat.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
