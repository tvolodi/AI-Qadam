"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { Section, SectionHeader } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/FormElements";
import { Handshake, CheckCircle2 } from "lucide-react";

export default function PartnerPage() {
  const { t } = useI18n();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    orgName: "",
    contactName: "",
    email: "",
    phone: "",
    type: "sponsor",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.orgName.trim()) errs.orgName = t.common.required;
    if (!formData.contactName.trim()) errs.contactName = t.common.required;
    if (!formData.email.trim()) errs.email = t.common.required;
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errs.email = "Invalid email";
    if (!formData.message.trim()) errs.message = t.common.required;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Partnership request submitted:", formData);
      setSubmitted(true);
    }
  };

  const handleChange = (field: string, value: string) => {
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
              {t.partner.sectionTitle}
            </h2>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {t.partner.form.success}
            </p>
          </GlassCard>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <SectionHeader
        title={t.partner.sectionTitle}
        subtitle={t.partner.subtitle}
      />

      <div className="max-w-2xl mx-auto">
        <GlassCard>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                id="orgName"
                label={t.partner.form.orgName}
                value={formData.orgName}
                onChange={(e) => handleChange("orgName", e.target.value)}
                error={errors.orgName}
                placeholder="Acme Corp"
              />
              <Input
                id="contactName"
                label={t.partner.form.contactName}
                value={formData.contactName}
                onChange={(e) =>
                  handleChange("contactName", e.target.value)
                }
                error={errors.contactName}
                placeholder="Jane Smith"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                id="email"
                label={t.partner.form.email}
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                error={errors.email}
                placeholder="partnerships@example.com"
              />
              <Input
                id="phone"
                label={t.partner.form.phone}
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <Select
              id="type"
              label={t.partner.form.type}
              value={formData.type}
              onChange={(e) => handleChange("type", e.target.value)}
              options={[
                { value: "sponsor", label: t.partner.form.typeSponsor },
                { value: "venue", label: t.partner.form.typeVenue },
                { value: "media", label: t.partner.form.typeMedia },
                { value: "tech", label: t.partner.form.typeTech },
                { value: "other", label: t.partner.form.typeOther },
              ]}
            />

            <Textarea
              id="message"
              label={t.partner.form.message}
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              error={errors.message}
              placeholder={t.partner.form.messagePlaceholder}
            />

            <Button type="submit" size="lg" className="w-full">
              <Handshake className="w-5 h-5" />
              {t.partner.form.submit}
            </Button>
          </form>
        </GlassCard>
      </div>
    </Section>
  );
}
