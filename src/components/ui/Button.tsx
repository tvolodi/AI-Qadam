import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]",
    secondary: "glass glass-hover",
    ghost: "hover:bg-[var(--color-bg-glass)]",
    outline:
      "border border-[var(--color-border-accent)] hover:bg-[var(--color-bg-glass)]",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-8 py-3.5 text-base gap-2.5",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      style={
        variant === "primary"
          ? { background: "var(--color-accent-gradient)" }
          : variant === "ghost" || variant === "outline"
          ? { color: "var(--color-text-primary)" }
          : { color: "var(--color-text-primary)" }
      }
      {...props}
    >
      {children}
    </button>
  );
}
