import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/cn" // Assuming utility exists or I will create it. 
// Wait, I saw utils folder. Let me check its content later or just use clsx/tailwind-merge inline if simple.
// I'll stick to a simple implementation without complex Utils if possible, or create utils/cn.ts.
// I will create utils/cn.ts as well.

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90 shadow-[0_0_15px_rgba(99,102,241,0.5)]",
                destructive:
                    "bg-[var(--destructive)] text-[var(--destructive-foreground)] hover:bg-[var(--destructive)]/90",
                outline:
                    "border border-[var(--input)] bg-[var(--background)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]",
                secondary:
                    "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--secondary)]/80",
                ghost: "hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]",
                link: "text-[var(--primary)] underline-offset-4 hover:underline",
                glass: "glass-card hover:bg-[var(--primary)]/10 text-[var(--foreground)] border border-white/10",
                neon: "bg-transparent border border-[var(--primary)] text-[var(--primary)] shadow-[0_0_10px_var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all duration-300"
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
