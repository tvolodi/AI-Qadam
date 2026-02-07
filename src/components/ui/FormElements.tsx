import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full px-4 py-2.5 rounded-xl text-sm transition-all duration-200",
            "focus:outline-none focus:ring-2",
            error && "ring-2",
            className
          )}
          style={{
            background: "var(--color-bg-glass)",
            borderColor: error
              ? "var(--color-error)"
              : "var(--color-border-glass)",
            color: "var(--color-text-primary)",
            border: `1px solid ${
              error ? "var(--color-error)" : "var(--color-border-glass)"
            }`,
            // @ts-ignore
            "--tw-ring-color": error
              ? "var(--color-error)"
              : "var(--color-accent-1)",
          }}
          {...props}
        />
        {error && (
          <p className="text-xs" style={{ color: "var(--color-error)" }}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          rows={4}
          className={cn(
            "w-full px-4 py-2.5 rounded-xl text-sm transition-all duration-200 resize-y",
            "focus:outline-none focus:ring-2",
            className
          )}
          style={{
            background: "var(--color-bg-glass)",
            border: `1px solid ${
              error ? "var(--color-error)" : "var(--color-border-glass)"
            }`,
            color: "var(--color-text-primary)",
          }}
          {...props}
        />
        {error && (
          <p className="text-xs" style={{ color: "var(--color-error)" }}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={id}
          className={cn(
            "w-full px-4 py-2.5 rounded-xl text-sm transition-all duration-200",
            "focus:outline-none focus:ring-2",
            className
          )}
          style={{
            background: "var(--color-bg-glass)",
            border: `1px solid ${
              error ? "var(--color-error)" : "var(--color-border-glass)"
            }`,
            color: "var(--color-text-primary)",
          }}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-xs" style={{ color: "var(--color-error)" }}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
