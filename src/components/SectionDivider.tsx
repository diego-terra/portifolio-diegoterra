import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * SectionDivider — animated tech/neon line that draws itself across the
 * full width when scrolling into view. Direction alternates between
 * left-to-right (ltr) and right-to-left (rtl) by default.
 *
 * Respects prefers-reduced-motion: the line is shown instantly without
 * animation when the user prefers reduced motion.
 */

export function SectionDivider({
  direction = "ltr",
}: {
  direction?: "ltr" | "rtl";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative h-px w-full overflow-hidden bg-border"
      aria-hidden="true"
    >
      <div
        className={cn(
          "h-full bg-brand",
          "shadow-[0_0_12px_var(--brand),0_0_28px_var(--brand)]",
          "transition-[width] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          direction === "rtl" ? "ml-auto" : "mr-auto",
          visible ? "w-full" : "w-0",
        )}
      />
    </div>
  );
}
