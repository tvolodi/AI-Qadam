"use client";

import { useState } from "react";
import { useI18n, localized } from "@/lib/i18n/I18nProvider";
import { Section, SectionHeader } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Monitor,
  ChevronLeft,
  ChevronRight,
  Bell,
  CheckCircle2,
} from "lucide-react";

// Sample events data — in production, from database
const sampleEvents = [
  {
    id: 1,
    title: {
      en: "LLM Agents in Production: Lessons Learned",
      ru: "LLM-агенты в продакшене: извлечённые уроки",
    },
    date: "2026-03-15",
    time: "18:00",
    location: { en: "Online (Zoom)", ru: "Онлайн (Zoom)" },
    isOnline: true,
    spots: 45,
    registered: 128,
    type: "meetup",
    description: {
      en: "Deep dive into deploying LLM-based agents in production environments. Real-world case studies and architectural patterns.",
      ru: "Глубокое погружение в развёртывание LLM-агентов в промышленных средах. Реальные кейсы и архитектурные паттерны.",
    },
  },
  {
    id: 2,
    title: {
      en: "Computer Vision Workshop: Real-Time Object Detection",
      ru: "Воркшоп по компьютерному зрению: обнаружение объектов в реальном времени",
    },
    date: "2026-03-22",
    time: "14:00",
    location: { en: "Tech Hub, Berlin", ru: "Tech Hub, Берлин" },
    isOnline: false,
    spots: 12,
    registered: 38,
    type: "workshop",
    description: {
      en: "Hands-on workshop building real-time detection pipelines with YOLOv9 and TensorRT.",
      ru: "Практический воркшоп по созданию пайплайнов обнаружения в реальном времени с YOLOv9 и TensorRT.",
    },
  },
  {
    id: 3,
    title: {
      en: "AI-Qadam Spring Conference 2026",
      ru: "Весенняя конференция AI-Qadam 2026",
    },
    date: "2026-04-12",
    time: "10:00",
    location: { en: "Grand Tech Center", ru: "Grand Tech Center" },
    isOnline: false,
    spots: 80,
    registered: 220,
    type: "conference",
    description: {
      en: "Annual community conference with 20+ speakers covering the latest in AI research and engineering.",
      ru: "Ежегодная конференция сообщества с 20+ спикерами о последних достижениях в AI-исследованиях и инженерии.",
    },
  },
  {
    id: 4,
    title: {
      en: "MLOps Best Practices: CI/CD for ML Models",
      ru: "Лучшие практики MLOps: CI/CD для ML-моделей",
    },
    date: "2026-04-18",
    time: "19:00",
    location: { en: "Online (Google Meet)", ru: "Онлайн (Google Meet)" },
    isOnline: true,
    spots: 0,
    registered: 95,
    type: "meetup",
    description: {
      en: "Practical session on implementing continuous integration and deployment pipelines for machine learning models.",
      ru: "Практическая сессия по внедрению пайплайнов непрерывной интеграции и развёртывания для ML-моделей.",
    },
  },
];

const announcements = [
  {
    id: 1,
    title: {
      en: "Call for Speakers: Spring Conference 2026",
      ru: "Приём заявок от спикеров: Весенняя конференция 2026",
    },
    date: "2026-02-01",
    content: {
      en: "We're looking for speakers for our annual spring conference. Submit your talk proposal by March 1st!",
      ru: "Мы ищем спикеров для нашей ежегодной весенней конференции. Подайте заявку до 1 марта!",
    },
  },
  {
    id: 2,
    title: {
      en: "New Partnership with Cloud Provider",
      ru: "Новое партнёрство с облачным провайдером",
    },
    date: "2026-01-20",
    content: {
      en: "We've partnered with a major cloud provider to offer free GPU credits for community projects.",
      ru: "Мы заключили партнёрство с крупным облачным провайдером для предоставления бесплатных GPU-кредитов для проектов сообщества.",
    },
  },
];

type Tab = "upcoming" | "announcements";

export default function EventsPage() {
  const { t, locale } = useI18n();
  const [tab, setTab] = useState<Tab>("upcoming");
  const [registeredEvents, setRegisteredEvents] = useState<Set<number>>(
    new Set()
  );

  // Simple calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2)); // March 2026

  const handleRegister = (eventId: number) => {
    setRegisteredEvents((prev) => {
      const next = new Set(prev);
      if (next.has(eventId)) {
        next.delete(eventId);
      } else {
        next.add(eventId);
      }
      return next;
    });
  };

  const typeColors: Record<string, string> = {
    meetup: "var(--color-accent-1)",
    workshop: "var(--color-accent-2)",
    conference: "var(--color-accent-4)",
  };

  // Build calendar days
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
    calendarDays.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d);
  }

  const eventDates = sampleEvents.map((e) => {
    const d = new Date(e.date);
    return { month: d.getMonth(), day: d.getDate(), year: d.getFullYear() };
  });

  const monthNames = {
    en: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ],
    ru: [
      "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
      "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
    ],
  };

  const dayNames = {
    en: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    ru: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
  };

  return (
    <Section>
      <SectionHeader
        title={t.events.sectionTitle}
        subtitle={t.events.subtitle}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="flex gap-2 p-1 rounded-xl glass">
            {(["upcoming", "announcements"] as Tab[]).map((tabId) => (
              <button
                key={tabId}
                onClick={() => setTab(tabId)}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  background:
                    tab === tabId ? "var(--color-bg-glass-hover)" : "transparent",
                  color:
                    tab === tabId
                      ? "var(--color-text-accent)"
                      : "var(--color-text-muted)",
                }}
              >
                {tabId === "upcoming" ? t.events.upcoming : t.events.announcements}
              </button>
            ))}
          </div>

          {/* Events list */}
          {tab === "upcoming" && (
            <div className="space-y-4">
              {sampleEvents.map((event) => {
                const isRegistered = registeredEvents.has(event.id);
                return (
                  <GlassCard key={event.id} className="relative overflow-hidden">
                    {/* Type accent */}
                    <div
                      className="absolute top-0 left-0 bottom-0 w-1 rounded-l-2xl"
                      style={{
                        background: typeColors[event.type] ?? "var(--color-accent-1)",
                      }}
                    />

                    <div className="pl-4">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <span
                            className="inline-block px-2 py-0.5 rounded-md text-xs font-semibold mb-2 uppercase"
                            style={{
                              background: `${typeColors[event.type]}15`,
                              color: typeColors[event.type],
                            }}
                          >
                            {event.type}
                          </span>
                          <h3
                            className="text-lg font-semibold"
                            style={{ color: "var(--color-text-primary)" }}
                          >
                            {localized(event.title, locale)}
                          </h3>
                        </div>
                      </div>

                      {/* Meta */}
                      <div className="flex flex-wrap gap-4 mb-3 text-sm">
                        <span
                          className="flex items-center gap-1.5"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          <Calendar className="w-4 h-4" />
                          {new Date(event.date).toLocaleDateString(
                            locale === "ru" ? "ru-RU" : "en-US",
                            { month: "long", day: "numeric", year: "numeric" }
                          )}
                        </span>
                        <span
                          className="flex items-center gap-1.5"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          <Clock className="w-4 h-4" />
                          {event.time}
                        </span>
                        <span
                          className="flex items-center gap-1.5"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          {event.isOnline ? (
                            <Monitor className="w-4 h-4" />
                          ) : (
                            <MapPin className="w-4 h-4" />
                          )}
                          {localized(event.location, locale)}
                        </span>
                      </div>

                      {/* Description */}
                      <p
                        className="text-sm mb-4"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {localized(event.description, locale)}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <span
                          className="flex items-center gap-1.5 text-sm"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          <Users className="w-4 h-4" />
                          {event.registered} registered
                          {event.spots > 0 && (
                            <span
                              style={{ color: "var(--color-success)" }}
                            >
                              · {event.spots} {t.events.spots}
                            </span>
                          )}
                        </span>
                        <Button
                          size="sm"
                          variant={isRegistered ? "secondary" : "primary"}
                          onClick={() => handleRegister(event.id)}
                          disabled={event.spots === 0 && !isRegistered}
                        >
                          {isRegistered ? (
                            <>
                              <CheckCircle2 className="w-4 h-4" />
                              {t.events.registered}
                            </>
                          ) : (
                            t.events.register
                          )}
                        </Button>
                      </div>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          )}

          {/* Announcements list */}
          {tab === "announcements" && (
            <div className="space-y-4">
              {announcements.map((ann) => (
                <GlassCard key={ann.id}>
                  <div className="flex items-start gap-3">
                    <Bell
                      className="w-5 h-5 mt-0.5 shrink-0"
                      style={{ color: "var(--color-accent-1)" }}
                    />
                    <div>
                      <h3
                        className="font-semibold mb-1"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        {localized(ann.title, locale)}
                      </h3>
                      <p
                        className="text-xs mb-2"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {new Date(ann.date).toLocaleDateString(
                          locale === "ru" ? "ru-RU" : "en-US",
                          { month: "long", day: "numeric", year: "numeric" }
                        )}
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {localized(ann.content, locale)}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </div>

        {/* Calendar sidebar */}
        <div>
          <GlassCard className="sticky top-24">
            {/* Calendar header */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() =>
                  setCurrentMonth(new Date(year, month - 1))
                }
                className="p-1 rounded-lg transition-colors"
                style={{ color: "var(--color-text-secondary)" }}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span
                className="font-semibold"
                style={{ color: "var(--color-text-primary)" }}
              >
                {(monthNames[locale as keyof typeof monthNames] ?? monthNames.en)[month]} {year}
              </span>
              <button
                onClick={() =>
                  setCurrentMonth(new Date(year, month + 1))
                }
                className="p-1 rounded-lg transition-colors"
                style={{ color: "var(--color-text-secondary)" }}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {(dayNames[locale as keyof typeof dayNames] ?? dayNames.en).map((d) => (
                <div
                  key={d}
                  className="text-center text-xs font-medium py-1"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, i) => {
                const hasEvent =
                  day !== null &&
                  eventDates.some(
                    (ed) =>
                      ed.day === day && ed.month === month && ed.year === year
                  );
                return (
                  <div
                    key={i}
                    className="relative text-center py-1.5 text-sm rounded-lg transition-colors"
                    style={{
                      color: day
                        ? hasEvent
                          ? "var(--color-text-accent)"
                          : "var(--color-text-secondary)"
                        : "transparent",
                      background: hasEvent ? "var(--color-bg-glass)" : "transparent",
                      fontWeight: hasEvent ? 600 : 400,
                    }}
                  >
                    {day ?? ""}
                    {hasEvent && (
                      <div
                        className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{ background: "var(--color-accent-1)" }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>
      </div>
    </Section>
  );
}
