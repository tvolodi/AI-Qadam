import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export function GlassCard({
  children,
  className,
  hover = true,
  glow = false,
  onClick,
}: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "glass-card p-6",
        hover && "glass-hover cursor-default",
        glow && "glow-border",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
