"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { Sparkles, Send, Heart } from "lucide-react";

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t"
      style={{
        borderColor: "var(--color-border-glass)",
        background: "var(--color-bg-secondary)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles
                className="w-5 h-5"
                style={{ color: "var(--color-accent-1)" }}
              />
              <span className="text-lg font-bold gradient-text">
                {t.footer.community}
              </span>
            </div>
            <p
              className="text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              {t.footer.tagline}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3
              className="text-sm font-semibold mb-4"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {t.footer.links}
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: t.nav.about },
                { href: "/personalities", label: t.nav.personalities },
                { href: "/events", label: t.nav.events },
                { href: "/speak", label: t.nav.speak },
                { href: "/partner", label: t.nav.partner },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: "var(--color-text-muted)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color =
                        "var(--color-text-accent)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color =
                        "var(--color-text-muted)")
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3
              className="text-sm font-semibold mb-4"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {t.footer.social}
            </h3>
            <a
              href="https://t.me/aiqadam"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass glass-hover transition-all text-sm"
              style={{ color: "var(--color-accent-1)" }}
            >
              <Send className="w-4 h-4" />
              {t.footer.telegram}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-8 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "var(--color-border-glass)" }}
        >
          <p
            className="text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            {t.footer.copyright.replace("{year}", String(year))}
          </p>
          <p
            className="text-xs flex items-center gap-1"
            style={{ color: "var(--color-text-muted)" }}
          >
            Built with{" "}
            <Heart
              className="w-3 h-3"
              style={{ color: "var(--color-accent-2)" }}
            />{" "}
            by the community
          </p>
        </div>
      </div>
    </footer>
  );
}
