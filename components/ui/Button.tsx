import { JSX } from "preact";

export interface ButtonProps {
  /**
   * @description Button text
   */
  text: string;

  /**
   * @description Button link (if it's a link button)
   */
  href?: string;

  /**
   * @description Button variant
   * @default primary
   */
  variant?: "primary" | "secondary" | "outline" | "ghost";

  /**
   * @description Button size
   * @default md
   */
  size?: "sm" | "md" | "lg";

  /**
   * @description Full width button
   * @default false
   */
  fullWidth?: boolean;

  /**
   * @description Disabled state
   * @default false
   */
  disabled?: boolean;

  /**
   * @description Additional CSS classes
   */
  class?: string;

  /**
   * @description Click handler (for button type)
   */
  onClick?: JSX.MouseEventHandler<HTMLButtonElement>;

  /**
   * @description Target attribute for links
   */
  target?: "_blank" | "_self" | "_parent" | "_top";

  /**
   * @description Rel attribute for links
   */
  rel?: string;
}

const variantStyles = {
  primary:
    "bg-accent text-accent-foreground hover:opacity-90 transition-opacity",
  secondary: "bg-muted text-foreground hover:bg-opacity-80 transition-opacity",
  outline:
    "border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-accent-foreground transition-all",
  ghost: "text-foreground hover:bg-muted transition-colors",
};

const sizeStyles = {
  sm: "px-3 py-2 text-xs",
  md: "px-4 py-3 text-sm",
  lg: "px-6 py-4 text-base",
};

export default function Button({
  text,
  href,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  class: className = "",
  onClick,
  target,
  rel,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full uppercase tracking-tight";
  const widthStyles = fullWidth ? "w-full" : "";
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${
    sizeStyles[size]
  } ${widthStyles} ${disabledStyles} ${className}`;

  if (href && !disabled) {
    return (
      <a
        href={href}
        class={combinedClasses}
        target={target}
        rel={target === "_blank" ? rel || "noopener noreferrer" : rel}
      >
        {text}
      </a>
    );
  }

  return (
    <button
      type="button"
      class={combinedClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
