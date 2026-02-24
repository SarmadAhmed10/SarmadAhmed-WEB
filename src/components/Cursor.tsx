'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;

    const move = (e: MouseEvent) => {
      gsap.to(cursor, { duration: 0.5, x: e.clientX, y: e.clientY, ease: 'power2.out' });
      gsap.to(dot, { duration: 0.1, x: e.clientX, y: e.clientY });
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.tagName === 'A' || t.tagName === 'BUTTON' || t.closest('a') || t.closest('button') ||
          window.getComputedStyle(t).cursor === 'pointer') {
        setIsHovering(true);
        gsap.to(cursor, { scale: 2, duration: 0.3, ease: 'power2.out' });
      }
    };

    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.tagName === 'A' || t.tagName === 'BUTTON' || t.closest('a') || t.closest('button') ||
          window.getComputedStyle(t).cursor === 'pointer') {
        setIsHovering(false);
        gsap.to(cursor, { scale: 1, duration: 0.3, ease: 'power2.out' });
      }
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        @media (min-width: 1024px) {
          * { cursor: none !important; }
        }
      `}</style>
      <div
        ref={cursorRef}
        className="hidden lg:block fixed w-8 h-8 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c9a96e]/40 mix-blend-difference"
        style={{ transition: 'border-color 0.3s' }}
      />
      <div
        ref={dotRef}
        className="hidden lg:block fixed w-1 h-1 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9a96e]"
      />
    </>
  );
}
