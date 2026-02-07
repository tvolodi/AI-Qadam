import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 sm:py-28", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("text-center mb-16", className)}>
      <h2
        className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 gradient-text"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="text-lg max-w-2xl mx-auto"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
