import { cn } from "@/lib/utils";
import { ReactNode, CSSProperties } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: 'green' | 'cyan' | 'none';
  style?: CSSProperties;
}

export function GlassCard({ children, className, glow = 'none', style }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-card p-6",
        glow === 'green' && 'glow-green',
        glow === 'cyan' && 'glow-cyan',
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}
