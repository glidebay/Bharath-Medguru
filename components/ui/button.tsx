import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer disabled:pointer-events-none disabled:opacity-50",
          variant === "default" &&
            "bg-[#1E3227] text-[#CBCFB8] hover:bg-[#15241c] hover:text-white shadow-md hover:scale-[1.02]",
          variant === "outline" &&
            "border border-[#1E3227]/20 bg-white/70 hover:bg-white text-[#1E3227] shadow-xs",
          variant === "secondary" &&
            "bg-white/80 hover:bg-white text-[#1E3227] shadow-sm",
          variant === "ghost" &&
            "hover:bg-[#1E3227]/10 text-[#1E3227]",
          size === "default" && "h-11 px-7 py-2.5",
          size === "sm" && "h-9 px-4 text-[11px]",
          size === "lg" && "h-12 px-8 text-sm",
          size === "icon" && "h-10 w-10 p-0",
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";