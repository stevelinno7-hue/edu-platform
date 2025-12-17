import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-white shadow-card rounded-lg p-6 border border-gray-100 ${className}`}
    >
      {children}
    </div>
  );
}
