import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
    title?: string;
}

export function Card({ children, className = "", title }: CardProps) {
    return (
        <div className={`p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] shadow-sm ${className}`}>
            {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
            {children}
        </div>
    );
}
