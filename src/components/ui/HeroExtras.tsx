"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────
   Typing Effect — isolated so it NEVER
   causes layout shift in surrounding text
───────────────────────────────────────── */
const WORDS = ["Berbagi", "Berkreasi", "Berkembang", "Berkolaborasi"];

export function TypingWord() {
  const [idx, setIdx] = useState(0);
  const [display, setDisplay] = useState("");
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const word = WORDS[idx];
    if (!deleting && display.length < word.length) {
      timeoutRef.current = setTimeout(
        () => setDisplay(word.slice(0, display.length + 1)),
        68,
      );
    } else if (!deleting && display.length === word.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && display.length > 0) {
      timeoutRef.current = setTimeout(
        () => setDisplay(display.slice(0, -1)),
        38,
      );
    } else {
      setDeleting(false);
      setIdx((i) => (i + 1) % WORDS.length);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [display, deleting, idx]);

  return (
    /*
     * Key: display:block + min-h keeps this line's height stable
     * regardless of which word is being typed. The parent h1 never
     * re-wraps because this occupies its own isolated block line.
     */
    <span className="block min-h-[1.1em]" aria-live="polite" aria-atomic="true">
      <span className="text-shimmer">{display}</span>
      {/* blinking caret */}
      <span
        className="inline-block w-[3px] h-[0.8em] bg-blue-500 align-middle ml-1 animate-pulse"
        aria-hidden="true"
      />
    </span>
  );
}

/* ─────────────────────────────────────────
   Floating code snippet cards (desktop)
───────────────────────────────────────── */
const SNIPPETS = [
  {
    lang: "py",
    code: "print('Hello, CodeIn!')",
    top: "12%",
    left: "2%",
    delay: "0s",
  },
  {
    lang: "js",
    code: "const learn = () => grow();",
    top: "68%",
    left: "2%",
    delay: "1.2s",
  },
  {
    lang: "tsx",
    code: "<Community />",
    top: "14%",
    right: "2%",
    delay: "0.6s",
  },
  {
    lang: "sh",
    code: "git commit -m 'together'",
    top: "70%",
    right: "2%",
    delay: "1.8s",
  },
];

export function FloatingSnippets() {
  return (
    <>
      {SNIPPETS.map((s, i) => (
        <div
          key={i}
          className="absolute hidden lg:flex items-center gap-2 px-3 py-2 bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm border border-gray-200/60 dark:border-dark-600/60 rounded-xl shadow-lg text-xs font-mono text-gray-600 dark:text-gray-300 pointer-events-none select-none"
          style={{
            top: s.top,
            left: (s as any).left,
            right: (s as any).right,
            animation: `float 4s ease-in-out ${s.delay} infinite`,
            maxWidth: "220px",
            zIndex: 5,
          }}
        >
          <span className="shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300">
            {s.lang}
          </span>
          <span className="truncate">{s.code}</span>
        </div>
      ))}
    </>
  );
}
