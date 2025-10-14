'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorTrailRef = useRef<HTMLDivElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const cursorTrail = cursorTrailRef.current;

    const moveCursor = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      // Main cursor ring - smooth follow
      gsap.to(cursor, { 
        duration: 0.5, 
        x: x, 
        y: y,
        ease: 'power2.out'
      });

      // Dot - instant follow
      gsap.to(cursorDot, { 
        duration: 0.1, 
        x: x, 
        y: y 
      });

      // Trail - slower follow
      gsap.to(cursorTrail, { 
        duration: 0.8, 
        x: x, 
        y: y,
        ease: 'power2.out'
      });
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      gsap.to(cursor, { scale: 0.8, duration: 0.2 });
      gsap.to(cursorDot, { scale: 1.5, duration: 0.2 });
    };

    const handleMouseUp = () => {
      setIsClicking(false);
      gsap.to(cursor, { scale: isHovering ? 1.5 : 1, duration: 0.3 });
      gsap.to(cursorDot, { scale: 1, duration: 0.2 });
    };

    // Detect hoverable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.style.cursor === 'pointer' ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
        gsap.to(cursor, { 
          scale: 1.5, 
          duration: 0.3,
          ease: 'power2.out'
        });
        gsap.to(cursorDot, { 
          scale: 0.5, 
          duration: 0.2 
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.style.cursor === 'pointer' ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(false);
        gsap.to(cursor, { 
          scale: 1, 
          duration: 0.3,
          ease: 'power2.out'
        });
        gsap.to(cursorDot, { 
          scale: 1, 
          duration: 0.2 
        });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isHovering]);

  return (
    <>
      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Outer trail ring - slowest */}
      <div
        ref={cursorTrailRef}
        className="hidden lg:block fixed w-16 h-16 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{
          border: '1px solid rgba(156, 44, 44, 0.3)',
          borderRadius: '50%',
          transition: 'opacity 0.3s ease'
        }}
      />

      {/* Main cursor ring - medium speed */}
      <div
        ref={cursorRef}
        className="hidden lg:block fixed w-10 h-10 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: isHovering 
            ? 'radial-gradient(circle, rgba(156,44,44,0.15) 0%, transparent 70%)'
            : 'transparent',
          border: '2px solid',
          borderImage: 'linear-gradient(135deg, #9C2C2C, #F28E85) 1',
          borderRadius: '50%',
          boxShadow: isHovering 
            ? '0 0 20px rgba(156,44,44,0.3), inset 0 0 20px rgba(156,44,44,0.1)' 
            : '0 0 10px rgba(156,44,44,0.2)',
          transition: 'background 0.3s ease, box-shadow 0.3s ease'
        }}
      >
        {/* Rotating gradient border effect */}
        <div 
          className="absolute inset-0 rounded-full opacity-50"
          style={{
            background: 'conic-gradient(from 0deg, #9C2C2C, #F28E85, #9C2C2C)',
            animation: 'rotate 3s linear infinite',
            mask: 'radial-gradient(circle, transparent 60%, black 61%)',
            WebkitMask: 'radial-gradient(circle, transparent 60%, black 61%)'
          }}
        />
      </div>

      {/* Center dot - instant follow */}
      <div
        ref={cursorDotRef}
        className="hidden lg:block fixed w-1.5 h-1.5 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle, #9C2C2C 0%, #F28E85 100%)',
          borderRadius: '50%',
          boxShadow: isClicking 
            ? '0 0 20px rgba(156,44,44,0.8), 0 0 40px rgba(156,44,44,0.4)' 
            : '0 0 10px rgba(156,44,44,0.5)',
          transition: 'box-shadow 0.2s ease'
        }}
      />

      {/* Particles that follow cursor on hover */}
      {isHovering && (
        <>
          <div
            className="hidden lg:block fixed w-1 h-1 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 opacity-60"
            style={{
              background: '#F28E85',
              borderRadius: '50%',
              animation: 'particle1 2s ease-in-out infinite',
              left: cursorDotRef.current?.style.left,
              top: cursorDotRef.current?.style.top
            }}
          />
          <div
            className="hidden lg:block fixed w-1 h-1 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 opacity-60"
            style={{
              background: '#9C2C2C',
              borderRadius: '50%',
              animation: 'particle2 2s ease-in-out infinite',
              left: cursorDotRef.current?.style.left,
              top: cursorDotRef.current?.style.top
            }}
          />
        </>
      )}

      {/* Animations */}
      <style jsx>{`
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes particle1 {
          0%, 100% {
            transform: translate(-50%, -50%) translate(0, 0);
            opacity: 0;
          }
          50% {
            transform: translate(-50%, -50%) translate(20px, -20px);
            opacity: 0.6;
          }
        }

        @keyframes particle2 {
          0%, 100% {
            transform: translate(-50%, -50%) translate(0, 0);
            opacity: 0;
          }
          50% {
            transform: translate(-50%, -50%) translate(-20px, -20px);
            opacity: 0.6;
          }
        }
      `}</style>
    </>
  );
}