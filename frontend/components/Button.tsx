import type { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "success" | "danger" | "muted";
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: Props) {
  const base =
    "px-4 py-2 rounded-base font-medium shadow-sm transition active:scale-95";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary-light",
    success: "bg-success text-white hover:bg-green-600",
    danger: "bg-danger text-white hover:bg-red-700",
    muted: "bg-gray-200 hover:bg-gray-300",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
