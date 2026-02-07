"use client";

import { useEffect, useRef } from "react";

/**
 * Animated background with subtle floating gradient orbs
 * that respond to the current theme colors.
 */
export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Large gradient orb - top right */}
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-30 animate-float"
        style={{
          background:
            "radial-gradient(circle, var(--color-glow-1) 0%, transparent 70%)",
          animationDelay: "0s",
        }}
      />
      {/* Medium gradient orb - bottom left */}
      <div
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20 animate-float"
        style={{
          background:
            "radial-gradient(circle, var(--color-glow-2) 0%, transparent 70%)",
          animationDelay: "3s",
        }}
      />
      {/* Small gradient orb - center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-10 animate-float"
        style={{
          background:
            "radial-gradient(circle, var(--color-glow-1) 0%, var(--color-glow-2) 50%, transparent 70%)",
          animationDelay: "1.5s",
        }}
      />
      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
