'use client';

import { useRef } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor"; // 👈 Import your custom cursor

export default function HomePage() {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref: any) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-black text-white overflow-x-hidden selection:bg-cyan-500 selection:text-black relative">
      {/* 👇 Custom animated cursor */}
      <Cursor />

      {/* 👇 Navbar and sections */}
      <Navbar
        refs={[heroRef, aboutRef, skillsRef, projectsRef, testimonialsRef, contactRef]}
        scrollToSection={scrollToSection}
      />

      <Hero heroRef={heroRef} projectsRef={projectsRef} />
      <About aboutRef={aboutRef} />
      <Skills skillsRef={skillsRef} />
      <Projects projectsRef={projectsRef} />
      <Testimonials testimonialsRef={testimonialsRef} />
      <Contact contactRef={contactRef} />

      <footer className="py-8 text-center text-gray-600 border-t border-gray-900">
        <p>© 2025 Sarmad Ahmed. Crafted with passion.</p>
      </footer>
    </div>
  );
}
