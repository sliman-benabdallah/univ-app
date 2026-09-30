// app/layout.tsx
import type { Metadata } from "next";
import { BRANDING } from "@/lib/branding";
import "./globals.css";

export const metadata: Metadata = {
  title: BRANDING.name,
  description: BRANDING.tagline,
  // Next.js auto-serves /app/icon.svg as the favicon.
};

/**
 * Root layout — applies the global background and font smoothing.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}