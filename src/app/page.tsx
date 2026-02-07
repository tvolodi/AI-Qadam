"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { Section, SectionHeader } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import {
  Brain,
  Users,
  Calendar,
  Mic2,
  Lightbulb,
  Network,
  ArrowRight,
  Sparkles,
  Zap,
  Globe,
} from "lucide-react";

export default function HomePage() {
  const { t } = useI18n();

  const icons = [Lightbulb, Network, Calendar, Users];

  return (
    <>
      {/* ====== HERO ====== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Hero content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
            <Sparkles
              className="w-4 h-4"
              style={{ color: "var(--color-accent-1)" }}
            />
            <span
              className="text-xs font-medium"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {t.hero.subtitle}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-5xl sm:text-7xl lg:text-8xl font-extrabold mb-6 tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="gradient-text">{t.hero.title}</span>
          </h1>

          {/* Description */}
          <p
            className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-balance"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {t.hero.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/events">
              <Button size="lg" variant="primary">
                <Calendar className="w-5 h-5" />
                {t.hero.cta}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a
              href="https://t.me/aiqadam"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline">
                {t.hero.ctaSecondary}
              </Button>
            </a>
          </div>
        </div>

        {/* Decorative gradient line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--color-accent-1), var(--color-accent-2), transparent)",
          }}
        />
      </section>

      {/* ====== ABOUT / MISSION ====== */}
      <Section>
        <SectionHeader title={t.about.sectionTitle} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Mission card */}
          <GlassCard className="lg:col-span-2" glow>
            <div className="flex items-start gap-4">
              <div
                className="p-3 rounded-xl"
                style={{ background: "var(--color-bg-glass)" }}
              >
                <Brain
                  className="w-8 h-8"
                  style={{ color: "var(--color-accent-1)" }}
                />
              </div>
              <div>
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {t.about.mission.title}
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {t.about.mission.text}
                </p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* What We Do grid */}
        <h3
          className="text-2xl font-bold mb-8 text-center gradient-text"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {t.about.whatWeDo.title}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {t.about.whatWeDo.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <GlassCard key={i}>
                <div className="flex items-start gap-4">
                  <div
                    className="p-2.5 rounded-xl shrink-0"
                    style={{ background: "var(--color-bg-glass)" }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: "var(--color-accent-1)" }}
                    />
                  </div>
                  <div>
                    <h4
                      className="font-semibold mb-1.5"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {item.title}
                    </h4>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </Section>

      {/* ====== STATS ====== */}
      <Section className="py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "150+", label: t.about.stats.members, icon: Users },
            { value: "30+", label: t.about.stats.events, icon: Calendar },
            { value: "50+", label: t.about.stats.speakers, icon: Mic2 },
            { value: "8+", label: t.about.stats.domains, icon: Globe },
          ].map((stat, i) => (
            <GlassCard key={i} className="text-center py-8">
              <stat.icon
                className="w-6 h-6 mx-auto mb-3"
                style={{ color: "var(--color-accent-1)" }}
              />
              <div
                className="text-3xl font-bold mb-1 gradient-text"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {stat.value}
              </div>
              <div
                className="text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                {stat.label}
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* ====== CTA BAND ====== */}
      <Section className="py-16">
        <GlassCard glow className="text-center py-12 px-8">
          <Zap
            className="w-10 h-10 mx-auto mb-4"
            style={{ color: "var(--color-accent-1)" }}
          />
          <h3
            className="text-2xl sm:text-3xl font-bold mb-4 gradient-text"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {t.hero.ctaSecondary}
          </h3>
          <p
            className="max-w-lg mx-auto mb-6"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {t.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/speak">
              <Button variant="primary">
                <Mic2 className="w-4 h-4" />
                {t.nav.speak}
              </Button>
            </Link>
            <Link href="/partner">
              <Button variant="outline">{t.nav.partner}</Button>
            </Link>
          </div>
        </GlassCard>
      </Section>
    </>
  );
}
