'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const cursorDotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, { duration: 0.3, x: e.clientX, y: e.clientY });
      gsap.to(cursorDot, { duration: 0.1, x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="hidden md:block fixed w-8 h-8 border-2 border-cyan-400 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={cursorDotRef}
        className="hidden md:block fixed w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
}
