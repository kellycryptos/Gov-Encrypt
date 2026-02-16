import React from 'react';

interface CardProps {
    children: React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, header, footer, className = '', onClick }) => {
    return (
        <div
            className={`snapshot-card overflow-hidden ${onClick ? 'cursor-pointer' : ''} ${className}`}
            onClick={onClick}
        >
            {header && (
                <div className="px-6 py-4 border-b border-[var(--border)] bg-slate-50/30">
                    {header}
                </div>
            )}
            <div className="p-6">
                {children}
            </div>
            {footer && (
                <div className="px-6 py-4 bg-slate-50/30 border-t border-[var(--border)]">
                    {footer}
                </div>
            )}
        </div>
    );
};
