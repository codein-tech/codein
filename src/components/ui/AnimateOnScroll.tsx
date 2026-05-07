"use client";

import { useEffect, useRef, ReactNode } from "react";

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number; // ms
  direction?: "up" | "left" | "right" | "fade";
}

export default function AnimateOnScroll({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add("aos-visible");
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const dirClass = {
    up: "aos-up",
    left: "aos-left",
    right: "aos-right",
    fade: "aos-fade",
  }[direction];

  return (
    <div ref={ref} className={`aos-init ${dirClass} ${className}`}>
      {children}
    </div>
  );
}
