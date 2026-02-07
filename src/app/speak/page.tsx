"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { Section, SectionHeader } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/FormElements";
import { Mic2, CheckCircle2 } from "lucide-react";

export default function SpeakPage() {
  const { t } = useI18n();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    abstract: "",
    duration: "30",
    level: "intermediate",
    bio: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = t.common.required;
    if (!formData.email.trim()) errs.email = t.common.required;
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errs.email = "Invalid email";
    if (!formData.topic.trim()) errs.topic = t.common.required;
    if (!formData.abstract.trim()) errs.abstract = t.common.required;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // In production, this would POST to an API
      console.log("Speech proposal submitted:", formData);
      setSubmitted(true);
    }
  };

  const handleChange = (
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  if (submitted) {
    return (
      <Section>
        <div className="max-w-lg mx-auto text-center">
          <GlassCard glow className="py-12">
            <CheckCircle2
              className="w-16 h-16 mx-auto mb-6"
              style={{ color: "var(--color-success)" }}
            />
            <h2
              className="text-2xl font-bold mb-4 gradient-text"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t.speak.sectionTitle}
            </h2>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {t.speak.form.success}
            </p>
          </GlassCard>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <SectionHeader
        title={t.speak.sectionTitle}
        subtitle={t.speak.subtitle}
      />

      <div className="max-w-2xl mx-auto">
        <GlassCard>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                id="name"
                label={t.speak.form.name}
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                error={errors.name}
                placeholder="John Doe"
              />
              <Input
                id="email"
                label={t.speak.form.email}
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                error={errors.email}
                placeholder="john@example.com"
              />
            </div>

            <Input
              id="topic"
              label={t.speak.form.topic}
              value={formData.topic}
              onChange={(e) => handleChange("topic", e.target.value)}
              error={errors.topic}
              placeholder={
                t.speak.form.topic
              }
            />

            <Textarea
              id="abstract"
              label={t.speak.form.abstract}
              value={formData.abstract}
              onChange={(e) => handleChange("abstract", e.target.value)}
              error={errors.abstract}
              placeholder={t.speak.form.abstractPlaceholder}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Select
                id="duration"
                label={t.speak.form.duration}
                value={formData.duration}
                onChange={(e) => handleChange("duration", e.target.value)}
                options={[
                  { value: "15", label: t.speak.form.duration15 },
                  { value: "30", label: t.speak.form.duration30 },
                  { value: "45", label: t.speak.form.duration45 },
                  { value: "60", label: t.speak.form.duration60 },
                ]}
              />
              <Select
                id="level"
                label={t.speak.form.level}
                value={formData.level}
                onChange={(e) => handleChange("level", e.target.value)}
                options={[
                  { value: "beginner", label: t.speak.form.levelBeginner },
                  {
                    value: "intermediate",
                    label: t.speak.form.levelIntermediate,
                  },
                  { value: "advanced", label: t.speak.form.levelAdvanced },
                ]}
              />
            </div>

            <Textarea
              id="bio"
              label={t.speak.form.bio}
              value={formData.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              placeholder={t.speak.form.bioPlaceholder}
            />

            <Button type="submit" size="lg" className="w-full">
              <Mic2 className="w-5 h-5" />
              {t.speak.form.submit}
            </Button>
          </form>
        </GlassCard>
      </div>
    </Section>
  );
}
