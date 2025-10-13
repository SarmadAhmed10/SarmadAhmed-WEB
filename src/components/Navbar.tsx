'use client';

export default function Navbar({ refs, scrollToSection }: any) {
  return (
    <nav className="fixed top-8 right-8 z-40 flex flex-col gap-4">
      {refs.map((ref: any, i: number) => (
        <button
          key={i}
          onClick={() => scrollToSection(ref)}
          className="w-3 h-3 rounded-full bg-gray-700 hover:bg-cyan-400 transition-all duration-300"
        />
      ))}
    </nav>
  );
}
