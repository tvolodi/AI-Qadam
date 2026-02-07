"use client";

import { useI18n, localized } from "@/lib/i18n/I18nProvider";
import { Section, SectionHeader } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Brain,
  Eye,
  Server,
  Sparkles,
  BarChart3,
  Bot,
  User,
  ExternalLink,
} from "lucide-react";

// Sample expert data — in production this would come from the database
const experts = [
  {
    name: { en: "Alexandra Petrova", ru: "Александра Петрова" },
    role: { en: "NLP Research Lead", ru: "Руководитель исследований NLP" },
    domain: "nlp" as const,
    bio: {
      en: "Specializes in transformer architectures and multilingual models. 10+ years in NLP research.",
      ru: "Специализируется на архитектурах трансформеров и мультиязычных моделях. 10+ лет в исследованиях NLP.",
    },
    avatar: null,
  },
  {
    name: { en: "Dmitry Volkov", ru: "Дмитрий Волков" },
    role: { en: "Computer Vision Engineer", ru: "Инженер компьютерного зрения" },
    domain: "cv" as const,
    bio: {
      en: "Building real-time object detection systems. Expert in YOLO architectures and edge deployment.",
      ru: "Создаёт системы обнаружения объектов в реальном времени. Эксперт в архитектурах YOLO и edge-развёртывании.",
    },
    avatar: null,
  },
  {
    name: { en: "Sofia Karimova", ru: "София Каримова" },
    role: { en: "MLOps Architect", ru: "MLOps Архитектор" },
    domain: "mlops" as const,
    bio: {
      en: "Designs scalable ML pipelines and infrastructure. Kubernetes, MLflow, and model serving expert.",
      ru: "Проектирует масштабируемые ML-пайплайны и инфраструктуру. Эксперт в Kubernetes, MLflow и обслуживании моделей.",
    },
    avatar: null,
  },
  {
    name: { en: "Artem Ivasenko", ru: "Артём Ивасенко" },
    role: { en: "Generative AI Specialist", ru: "Специалист по генеративному AI" },
    domain: "genai" as const,
    bio: {
      en: "Working with LLMs, diffusion models, and RAG systems. Building production AI agents.",
      ru: "Работает с LLM, диффузионными моделями и RAG-системами. Создаёт промышленных AI-агентов.",
    },
    avatar: null,
  },
  {
    name: { en: "Maria Chen", ru: "Мария Чэн" },
    role: { en: "Data Scientist", ru: "Data Scientist" },
    domain: "ds" as const,
    bio: {
      en: "Statistical modeling and predictive analytics. Expert in time series forecasting and causal inference.",
      ru: "Статистическое моделирование и предиктивная аналитика. Эксперт в прогнозировании временных рядов.",
    },
    avatar: null,
  },
  {
    name: { en: "Ilya Smirnov", ru: "Илья Смирнов" },
    role: { en: "Robotics Engineer", ru: "Инженер-робототехник" },
    domain: "robotics" as const,
    bio: {
      en: "Combines reinforcement learning with robotics. Building autonomous navigation and manipulation systems.",
      ru: "Сочетает обучение с подкреплением и робототехнику. Создаёт системы автономной навигации.",
    },
    avatar: null,
  },
];

const domainIcons = {
  nlp: Brain,
  cv: Eye,
  mlops: Server,
  genai: Sparkles,
  ds: BarChart3,
  robotics: Bot,
};

const domainColors: Record<string, string> = {
  nlp: "var(--color-accent-1)",
  cv: "var(--color-accent-2)",
  mlops: "var(--color-accent-3)",
  genai: "var(--color-accent-4)",
  ds: "var(--color-accent-1)",
  robotics: "var(--color-accent-2)",
};

export default function PersonalitiesPage() {
  const { t, locale } = useI18n();

  // Group experts by domain
  const domains = Object.keys(t.personalities.domains) as Array<
    keyof typeof t.personalities.domains
  >;

  return (
    <Section>
      <SectionHeader
        title={t.personalities.sectionTitle}
        subtitle={t.personalities.subtitle}
      />

      {/* Domain filter pills */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {domains.map((domain) => {
          const Icon = domainIcons[domain];
          return (
            <div
              key={domain}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium"
              style={{ color: domainColors[domain] }}
            >
              <Icon className="w-4 h-4" />
              {t.personalities.domains[domain]}
            </div>
          );
        })}
      </div>

      {/* Experts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experts.map((expert, i) => {
          const Icon = domainIcons[expert.domain];
          return (
            <GlassCard key={i} className="relative overflow-hidden">
              {/* Domain accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{
                  background: `linear-gradient(90deg, ${domainColors[expert.domain]}, transparent)`,
                }}
              />

              <div className="flex items-start gap-4">
                {/* Avatar placeholder */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: "var(--color-bg-glass)",
                    border: `1px solid ${domainColors[expert.domain]}30`,
                  }}
                >
                  <User
                    className="w-6 h-6"
                    style={{ color: domainColors[expert.domain] }}
                  />
                </div>

                <div className="min-w-0">
                  <h3
                    className="font-semibold truncate"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {localized(expert.name, locale)}
                  </h3>
                  <p
                    className="text-sm mb-2"
                    style={{ color: domainColors[expert.domain] }}
                  >
                    {localized(expert.role, locale)}
                  </p>
                </div>
              </div>

              <p
                className="text-sm mt-4 leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {localized(expert.bio, locale)}
              </p>

              {/* Domain badge */}
              <div className="mt-4 flex items-center gap-2">
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium"
                  style={{
                    background: `${domainColors[expert.domain]}15`,
                    color: domainColors[expert.domain],
                  }}
                >
                  <Icon className="w-3 h-3" />
                  {t.personalities.domains[expert.domain]}
                </span>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </Section>
  );
}
