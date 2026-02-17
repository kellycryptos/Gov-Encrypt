export * from "./Button";
export * from "./Card";

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className = '', ...props }) => {
    return (
        <input
            className={`w-full px-4 py-2 bg-[var(--input)] border border-[var(--border)] rounded-lg text-sm transition-all focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none placeholder:text-[var(--muted-foreground)]/50 text-[var(--foreground)] ${className}`}
            {...props}
        />
    );
};
