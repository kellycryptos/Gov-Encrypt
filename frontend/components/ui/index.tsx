import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

    const variants = {
        primary: 'bg-[var(--primary)] text-white hover:bg-[#8995ff] shadow-sm',
        secondary: 'bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[#e2e8f0]',
        outline: 'border border-[var(--border)] bg-transparent hover:border-[var(--primary)] hover:text-[var(--primary)]',
        ghost: 'bg-transparent hover:bg-[var(--secondary)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]',
    };

    const sizes = {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
    return (
        <input
            className={`w-full px-4 py-2 bg-[var(--input)] border border-[var(--border)] rounded-lg text-sm transition-all focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none placeholder:text-[var(--muted-foreground)]/50 ${className}`}
            {...props}
        />
    );
};
