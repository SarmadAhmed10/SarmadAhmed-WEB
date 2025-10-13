'use client';
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Contact({ contactRef }: any) {
  useEffect(() => {
    gsap.from(".contact-content", {
      y: 80,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: contactRef.current,
        start: "top 75%",
        once: true,
      },
    });
  }, []);

  return (
    <section ref={contactRef} className="min-h-screen flex items-center justify-center px-4 py-24">
      <div className="contact-content text-center max-w-3xl">
        <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
          Let’s Collaborate
        </h2>
        <p className="text-xl text-gray-400 mb-12">
          Have an idea or project in mind? Let’s make it happen.
        </p>
        <a
          href="mailto:sarmad@example.com"
          className="inline-block px-12 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-black rounded-full font-bold text-lg hover:scale-110 transition-transform duration-300 hover:shadow-2xl hover:shadow-cyan-500/50"
        >
          Get In Touch
        </a>
      </div>
    </section>
  );
}
