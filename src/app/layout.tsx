import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sarmad Ahmed — AI Engineer & Full-Stack Developer",
  description: "Portfolio of Sarmad Ahmed — building intelligent software, AI integrations, and production-grade platforms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <div className="noise-overlay" />
      </body>
    </html>
  );
}
