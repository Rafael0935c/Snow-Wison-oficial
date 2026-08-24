import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "ghost";

type CommonProps = {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
};

export type LinkButtonProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & { href: string };

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & { href?: undefined };

export type ButtonProps = LinkButtonProps | NativeButtonProps;

const baseStyles =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-7 py-3.5 font-display text-sm font-semibold tracking-wide transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[linear-gradient(135deg,#4FA3FF,#12299E)] text-ivory shadow-[0_8px_24px_rgba(18,41,158,0.35)] hover:scale-[1.02] hover:shadow-[0_10px_32px_rgba(18,41,158,0.5)] active:scale-[0.98]",
  ghost:
    "text-ivory/85 underline decoration-line-strong underline-offset-8 hover:text-ivory hover:decoration-blue-soft",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (props.href) {
    const { href, ...rest } = props as LinkButtonProps;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const rest = props as NativeButtonProps;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
