"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { useTheme } from "@/lib/themes/ThemeProvider";
import {
  Menu,
  X,
  Settings,
  Send,
  Sparkles,
} from "lucide-react";

export function Navbar() {
  const { t, locale, setLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t.nav.about },
    { href: "/personalities", label: t.nav.personalities },
    { href: "/events", label: t.nav.events },
    { href: "/speak", label: t.nav.speak },
    { href: "/partner", label: t.nav.partner },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-[var(--color-border-glass)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Sparkles
              className="w-6 h-6 transition-colors"
              style={{ color: "var(--color-accent-1)" }}
            />
            <span
              className="text-xl font-bold gradient-text"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              AI-Qadam
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm font-medium transition-all"
                style={{ color: "var(--color-text-secondary)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--color-text-accent)";
                  e.currentTarget.style.background = "var(--color-bg-glass)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--color-text-secondary)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={() => setLocale(locale === "en" ? "ru" : "en")}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg glass glass-hover transition-all"
              style={{ color: "var(--color-text-accent)" }}
            >
              {locale === "en" ? "RU" : "EN"}
            </button>

            {/* Telegram */}
            <a
              href="https://t.me/aiqadam"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg glass glass-hover transition-all"
              style={{ color: "var(--color-accent-1)" }}
              title={t.nav.telegram}
            >
              <Send className="w-4 h-4" />
            </a>

            {/* Settings */}
            <Link
              href="/settings"
              className="p-2 rounded-lg glass glass-hover transition-all"
              style={{ color: "var(--color-text-secondary)" }}
            >
              <Settings className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg glass"
            style={{ color: "var(--color-text-primary)" }}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass border-t border-[var(--color-border-glass)]">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 rounded-lg text-sm font-medium transition-all"
                style={{ color: "var(--color-text-secondary)" }}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 pt-2 border-t border-[var(--color-border-glass)]">
              <button
                onClick={() => setLocale(locale === "en" ? "ru" : "en")}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg glass"
                style={{ color: "var(--color-text-accent)" }}
              >
                {locale === "en" ? "RU" : "EN"}
              </button>
              <a
                href="https://t.me/aiqadam"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg glass"
                style={{ color: "var(--color-accent-1)" }}
              >
                <Send className="w-4 h-4" />
              </a>
              <Link
                href="/settings"
                className="p-2 rounded-lg glass"
                style={{ color: "var(--color-text-secondary)" }}
                onClick={() => setIsOpen(false)}
              >
                <Settings className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
