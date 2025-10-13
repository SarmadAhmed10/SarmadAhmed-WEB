'use client';
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Testimonials({ testimonialsRef }: any) {
  const testimonials = [
    {
      name: "Ayesha Khan",
      role: "Product Manager, D2 Advertising",
      quote: "Working with Sarmad was an incredible experience — his attention to detail and creativity transformed our website into something truly special.",
    },
    {
      name: "Ali Raza",
      role: "CTO, Bitrex Technologies",
      quote: "Sarmad is an exceptional developer who blends design aesthetics with solid technical understanding — highly recommended!",
    },
  ];

  useEffect(() => {
    gsap.from(".testimonial-card", {
      y: 80, opacity: 0, duration: 1.2, stagger: 0.2,
      scrollTrigger: { trigger: testimonialsRef.current, start: "top 75%", once: true },
    });
  }, []);

  return (
    <section ref={testimonialsRef} className="min-h-screen flex flex-col items-center justify-center px-4 py-24">
      <h2 className="text-5xl font-bold mb-16 bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl">
        {testimonials.map((test, i) => (
          <div key={i} className="testimonial-card bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-cyan-400 transition-all duration-300">
            <p className="text-gray-300 italic mb-6">“{test.quote}”</p>
            <h4 className="text-cyan-400 font-semibold">{test.name}</h4>
            <p className="text-gray-500 text-sm">{test.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
