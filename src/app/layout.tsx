import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sarmad Ahmed — Full-Stack Developer & Designer",
  description: "Portfolio of Sarmad Ahmed — crafting exceptional digital experiences with modern web technologies.",
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
