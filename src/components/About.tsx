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
    { number: '3+', label: 'Years of Experience', desc: 'Building modern web applications' },
    { number: '15+', label: 'Projects Delivered', desc: 'From concept to deployment' },
    { number: '10+', label: 'Technologies', desc: 'Across the full stack' },
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
              I&apos;m a passionate full-stack developer from <span className="text-[#f5f5f5]">Karachi, Pakistan</span>,
              focused on creating visually stunning and high-performing web experiences.
            </p>
            <p className="text-lg text-[#999] font-light leading-relaxed">
              My approach combines clean code with thoughtful design — building products that
              don&apos;t just function beautifully, but feel <span className="text-[#c9a96e] italic">magical to use</span>.
            </p>
            <p className="text-lg text-[#999] font-light leading-relaxed">
              From interactive front-ends with React and Next.js to robust back-end systems with
              Node.js and Python, I bring ideas to life across the entire stack.
            </p>
            <div className="mt-8 pt-8 border-t border-[#1a1a1a]">
              <p className="text-sm text-[#666] italic">
                &quot;Great software is not just about code — it&apos;s about crafting experiences
                that leave a lasting impression.&quot;
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
