"use client";

/* ─────────────────────────────────────────────────────────────
   Tech Marquee with real SVG icons from devicons CDN.
   Each TECH entry: name shown in badge + devicon identifier.
─────────────────────────────────────────────────────────────── */

interface Tech {
  name: string;
  /** devicons icon key, e.g. "react" → /icons/react/react-original.svg */
  icon: string;
  /** override full CDN URL when devicons doesn't have a matching one */
  iconUrl?: string;
}

const BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const TECHS: Tech[] = [
  { name: "React", icon: "react", iconUrl: `${BASE}/react/react-original.svg` },
  {
    name: "Next.js",
    icon: "nextjs",
    iconUrl: `${BASE}/nextjs/nextjs-original.svg`,
  },
  {
    name: "TypeScript",
    icon: "typescript",
    iconUrl: `${BASE}/typescript/typescript-original.svg`,
  },
  {
    name: "Node.js",
    icon: "nodejs",
    iconUrl: `${BASE}/nodejs/nodejs-original.svg`,
  },
  {
    name: "Python",
    icon: "python",
    iconUrl: `${BASE}/python/python-original.svg`,
  },
  {
    name: "Laravel",
    icon: "laravel",
    iconUrl: `${BASE}/laravel/laravel-original.svg`,
  },
  {
    name: "Docker",
    icon: "docker",
    iconUrl: `${BASE}/docker/docker-original.svg`,
  },
  {
    name: "Flutter",
    icon: "flutter",
    iconUrl: `${BASE}/flutter/flutter-original.svg`,
  },
  { name: "Go", icon: "go", iconUrl: `${BASE}/go/go-original.svg` },
  {
    name: "PostgreSQL",
    icon: "postgresql",
    iconUrl: `${BASE}/postgresql/postgresql-original.svg`,
  },
  {
    name: "MongoDB",
    icon: "mongodb",
    iconUrl: `${BASE}/mongodb/mongodb-original.svg`,
  },
  { name: "MySQL", icon: "mysql", iconUrl: `${BASE}/mysql/mysql-original.svg` },
  {
    name: "Tailwind",
    icon: "tailwindcss",
    iconUrl: `${BASE}/tailwindcss/tailwindcss-original.svg`,
  },
  { name: "Git", icon: "git", iconUrl: `${BASE}/git/git-original.svg` },
  { name: "Linux", icon: "linux", iconUrl: `${BASE}/linux/linux-original.svg` },
  { name: "Rust", icon: "rust", iconUrl: `${BASE}/rust/rust-original.svg` },
];

/* Split into two rows, slightly offset so they look more dynamic */
const ROW1 = TECHS.slice(0, 10);
const ROW2 = TECHS.slice(6); // overlaps intentionally for variety

function TechBadge({ tech }: { tech: Tech }) {
  return (
    <span className="marquee-badge inline-flex items-center gap-2.5 whitespace-nowrap px-4 py-2.5 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-300 shadow-sm hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-blue-500/10 transition-all cursor-default select-none">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={tech.iconUrl}
        alt={tech.name}
        width={18}
        height={18}
        className="w-[18px] h-[18px] object-contain shrink-0"
        loading="lazy"
      />
      {tech.name}
    </span>
  );
}

export default function MarqueeTechs() {
  const doubled1 = [...ROW1, ...ROW1];
  const doubled2 = [...ROW2, ...ROW2];

  return (
    <div className="overflow-hidden py-2 space-y-3">
      {/* Row 1 — scrolls left */}
      <div className="marquee-track marquee-left flex gap-4 w-max">
        {doubled1.map((t, i) => (
          <TechBadge key={`r1-${i}`} tech={t} />
        ))}
      </div>

      {/* Row 2 — scrolls right */}
      <div className="marquee-track marquee-right flex gap-4 w-max">
        {doubled2.map((t, i) => (
          <TechBadge key={`r2-${i}`} tech={t} />
        ))}
      </div>
    </div>
  );
}
