import type { CSSProperties, ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "span";
}

export function Reveal({ children, delay = 0, className = "", as = "div" }: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const Tag = as as "div";
  const style: CSSProperties = {
    transitionDelay: `${delay}ms`,
  };
  return (
    <Tag
      ref={ref}
      style={style}
      className={
        "transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform " +
        (visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 ") +
        className
      }
    >
      {children}
    </Tag>
  );
}
