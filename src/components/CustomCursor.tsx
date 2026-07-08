import { useEffect, useRef } from "react";

/**
 * Green glowing dot that follows the mouse and "lights up" while the page
 * is scrolling. Disabled on touch/coarse pointers and when the user has
 * requested reduced motion.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const fine = window.matchMedia?.("(pointer: fine)").matches;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const dot = dotRef.current;
    if (!dot) return;

    document.body.classList.add("cursor-hidden");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;
    let raf = 0;
    let scrollTimer: ReturnType<typeof setTimeout> | null = null;

    const tick = () => {
      cx += (mx - cx) * 0.22;
      cy += (my - cy) * 0.22;
      dot.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const onScroll = () => {
      dot.classList.add("cursor--active");
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => dot.classList.remove("cursor--active"), 150);
    };
    const onLeave = () => {
      dot.style.opacity = "0";
    };
    const onEnter = () => {
      dot.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      if (raf) cancelAnimationFrame(raf);
      if (scrollTimer) clearTimeout(scrollTimer);
      document.body.classList.remove("cursor-hidden");
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="custom-cursor pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
    />
  );
}
