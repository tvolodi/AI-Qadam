"use client";

import { useI18n, localized } from "@/lib/i18n/I18nProvider";
import { useTheme } from "@/lib/themes/ThemeProvider";
import { Section, SectionHeader } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { themes, ThemeId } from "@/lib/themes";
import { Check, Palette, Globe } from "lucide-react";

export default function SettingsPage() {
  const { t, locale, setLocale } = useI18n();
  const { theme, setTheme } = useTheme();

  return (
    <Section>
      <SectionHeader title={t.settings.sectionTitle} />

      <div className="max-w-2xl mx-auto space-y-8">
        {/* Theme selector */}
        <GlassCard>
          <div className="flex items-center gap-3 mb-6">
            <Palette
              className="w-5 h-5"
              style={{ color: "var(--color-accent-1)" }}
            />
            <div>
              <h3
                className="font-semibold"
                style={{ color: "var(--color-text-primary)" }}
              >
                {t.settings.theme.title}
              </h3>
              <p
                className="text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                {t.settings.theme.subtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {themes.map((th) => {
              const isActive = theme === th.id;
              return (
                <button
                  key={th.id}
                  onClick={() => setTheme(th.id)}
                  className="relative p-4 rounded-xl border-2 transition-all text-left"
                  style={{
                    borderColor: isActive
                      ? "var(--color-accent-1)"
                      : "var(--color-border-glass)",
                    background: isActive
                      ? "var(--color-bg-glass-hover)"
                      : "var(--color-bg-glass)",
                  }}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div
                      className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: "var(--color-accent-1)" }}
                    >
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}

                  {/* Color preview */}
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-8 h-8 rounded-lg"
                      style={{ background: th.preview.bg }}
                    />
                    <div
                      className="w-8 h-8 rounded-lg"
                      style={{
                        background: `linear-gradient(135deg, ${th.preview.accent1}, ${th.preview.accent2})`,
                      }}
                    />
                  </div>

                  <h4
                    className="font-medium text-sm mb-1"
                    style={{
                      color: isActive
                        ? "var(--color-text-accent)"
                        : "var(--color-text-primary)",
                    }}
                  >
                    {localized(th.name, locale)}
                  </h4>
                  <p
                    className="text-xs"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {localized(th.description, locale)}
                  </p>
                </button>
              );
            })}
          </div>
        </GlassCard>

        {/* Language selector */}
        <GlassCard>
          <div className="flex items-center gap-3 mb-6">
            <Globe
              className="w-5 h-5"
              style={{ color: "var(--color-accent-1)" }}
            />
            <div>
              <h3
                className="font-semibold"
                style={{ color: "var(--color-text-primary)" }}
              >
                {t.settings.language.title}
              </h3>
              <p
                className="text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                {t.settings.language.subtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {(["en", "ru", "uz", "ky", "tg"] as const).map((lang) => {
              const isActive = locale === lang;
              const labels: Record<string, string> = { en: "English", ru: "Русский", uz: "O'zbekcha", ky: "Кыргызча", tg: "Тоҷикӣ" };
              const flags: Record<string, string> = { en: "🇬🇧", ru: "🇷🇺", uz: "🇺🇿", ky: "🇰🇬", tg: "🇹🇯" };
              return (
                <button
                  key={lang}
                  onClick={() => setLocale(lang)}
                  className="relative p-4 rounded-xl border-2 transition-all text-left"
                  style={{
                    borderColor: isActive
                      ? "var(--color-accent-1)"
                      : "var(--color-border-glass)",
                    background: isActive
                      ? "var(--color-bg-glass-hover)"
                      : "var(--color-bg-glass)",
                  }}
                >
                  {isActive && (
                    <div
                      className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: "var(--color-accent-1)" }}
                    >
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <span className="text-2xl mb-2 block">{flags[lang]}</span>
                  <h4
                    className="font-medium text-sm"
                    style={{
                      color: isActive
                        ? "var(--color-text-accent)"
                        : "var(--color-text-primary)",
                    }}
                  >
                    {labels[lang]}
                  </h4>
                </button>
              );
            })}
          </div>
        </GlassCard>
      </div>
    </Section>
  );
}
