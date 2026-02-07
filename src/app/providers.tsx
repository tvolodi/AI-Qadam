"use client";

import { ThemeProvider } from "@/lib/themes/ThemeProvider";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AnimatedBackground />
        <Navbar />
        <main className="pt-16 min-h-screen">{children}</main>
        <Footer />
      </I18nProvider>
    </ThemeProvider>
  );
}
