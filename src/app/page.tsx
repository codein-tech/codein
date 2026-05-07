import Link from "next/link";
import {
  ArrowRight,
  Users,
  BookOpen,
  MessageSquare,
  Code2,
  Zap,
  Target,
  GitBranch,
  Star,
  CheckCircle2,
  Trophy,
  Rocket,
  Lightbulb,
  Globe,
  ChevronRight,
  TrendingUp,
  Shield,
  Heart,
  Coffee,
  Award,
  BarChart3,
  PenLine,
  Layers,
  Sparkles,
  Quote,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";
import ArticleCard from "@/components/article/ArticleCard";
import Image from "next/image";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import MarqueeTechs from "@/components/ui/MarqueeTechs";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { TypingWord, FloatingSnippets } from "@/components/ui/HeroExtras";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("*, profiles(*)")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(3);

  const { count: memberCount } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  const { count: articleCount } = await supabase
    .from("articles")
    .select("*", { count: "exact", head: true })
    .eq("published", true);

  const features = [
    {
      icon: BookOpen,
      title: "Sharing",
      desc: "Bagikan cerita, tips, dan insight seputar dunia teknologi dan coding bersama komunitas.",
      color: "from-blue-500 to-blue-600",
      bg: "bg-blue-50 dark:bg-blue-500/10",
    },
    {
      icon: MessageSquare,
      title: "Diskusi Aktif",
      desc: "Forum diskusi untuk bertanya, menjawab, dan berbagi solusi atas tantangan teknis yang kamu hadapi.",
      color: "from-indigo-500 to-indigo-600",
      bg: "bg-indigo-50 dark:bg-indigo-500/10",
    },
    {
      icon: GitBranch,
      title: "Kolaborasi Project",
      desc: "Temukan rekan untuk membangun project nyata. Dari web app hingga mobile app, kerjakan bersama.",
      color: "from-violet-500 to-violet-600",
      bg: "bg-violet-50 dark:bg-violet-500/10",
    },
    {
      icon: Target,
      title: "Roadmap Belajar",
      desc: "Punya arah yang jelas dalam belajar. Dari fundamental hingga advanced, ada panduan untuk setiap level.",
      color: "from-sky-500 to-sky-600",
      bg: "bg-sky-50 dark:bg-sky-500/10",
    },
    {
      icon: Users,
      title: "Networking",
      desc: "Bangun koneksi dengan mahasiswa IT dari berbagai angkatan dan program studi di UMB.",
      color: "from-cyan-500 to-cyan-600",
      bg: "bg-cyan-50 dark:bg-cyan-500/10",
    },
    {
      icon: Zap,
      title: "Workshop & Event",
      desc: "Ikuti workshop, hackathon, dan coding challenge untuk mengasah kemampuan teknismu.",
      color: "from-blue-400 to-blue-500",
      bg: "bg-blue-50 dark:bg-blue-400/10",
    },
  ];

  const howItWorks = [
    {
      step: "01",
      icon: Users,
      title: "Bergabung",
      desc: "Bergabung  untuk mengikuti diskusi dan pembelajaran. Ceritakan keahlian dan minatmu di bidang teknologi.",
    },
    {
      step: "02",
      icon: Layers,
      title: "Eksplorasi & Belajar",
      desc: "Ikuti diskusi, dan temukan roadmap belajar yang sesuai dengan level dan tujuanmu.",
    },
    {
      step: "03",
      icon: PenLine,
      title: "Berkontribusi & Berbagi",
      desc: "Jawab pertanyaan, dan bagikan pengalamanmu untuk membantu sesama anggota berkembang.",
    },
    {
      step: "04",
      icon: Rocket,
      title: "Kolaborasi & Berkembang",
      desc: "Temukan partner project, bangun portofolio, dan jadilah bagian dari ekosistem IT yang berkembang pesat.",
    },
  ];

  const testimonials = [
    {
      name: "Adit",
      role: "Mahasiswa Informatika 2025",
      quote:
        "CodeIn benar-benar mengubah cara aku belajar pemrograman. Komunitas yang suportif bikin aku makin semangat buat ngoding setiap hari!",
      avatar: "AD",
    },
    {
      name: "Nanda",
      role: "Mahasiswa Informatika 2025",
      quote:
        "Dari CodeIn aku nemu teman project yang serius. Sekarang kami sudah develop 2 aplikasi yang dipakai beneran di kampus.",
      avatar: "NA",
    },
    {
      name: "Abul",
      role: "Mahasiswa Informatika 2025",
      quote:
        "Artikelnya berkualitas banget dan diskusinya aktif. Pertanyaanku selalu dijawab dengan cepat dan detail. Highly recommended!",
      avatar: "AB",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Inklusif & Suportif",
      desc: "Semua level disambut — dari pemula hingga expert. Tidak ada pertanyaan yang terlalu dasar di CodeIn.",
    },
    {
      icon: Shield,
      title: "Kolaboratif & Aman",
      desc: "Lingkungan yang positif dan saling mendukung. Kami menjaga komunitas tetap sehat dan produktif.",
    },
    {
      icon: TrendingUp,
      title: "Terus Berkembang",
      desc: "Konten dan event terus diperbarui mengikuti perkembangan teknologi terkini yang relevan.",
    },
    {
      icon: Coffee,
      title: "Santai & Menyenangkan",
      desc: "Belajar tidak harus kaku. Kami percaya belajar dengan enjoy akan menghasilkan hasil yang lebih baik.",
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero Section ── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          {/* Particle network canvas */}
          <AnimatedBackground />

          <div className="absolute inset-0 bg-grid opacity-40 dark:opacity-20" />
          <div className="absolute inset-0 bg-gradient-radial from-blue-50/60 via-white to-white dark:from-blue-950/20 dark:via-dark-900 dark:to-dark-900" />

          {/* Aurora blobs */}
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-400/15 rounded-full blur-3xl aurora-1" />
          <div className="absolute bottom-1/4 -right-20 w-[28rem] h-[28rem] bg-indigo-600/10 rounded-full blur-3xl aurora-2" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] bg-blue-500/5 rounded-full blur-3xl aurora-3 pointer-events-none" />
          <div className="absolute top-10 right-1/4 w-40 h-40 bg-cyan-400/10 rounded-full blur-2xl aurora-2" />

          {/* Floating code snippet cards (desktop only) — positioned against the section */}
          <FloatingSnippets />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-8 animate-fade-up">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              Komunitas IT Aktif — Universitas Muhammadiyah Bengkulu
            </div>

            {/* Headline — TypingWord is on its own block line so it never causes
                reflow on "Belajar &" or "Bersama CodeIn" lines, fixing scroll jank */}
            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-gray-900 dark:text-white leading-tight mb-6 animate-fade-up animate-delay-100">
              Belajar &amp;
              {/* isolated block — width changes here don't affect other lines */}
              <TypingWord />
              Bersama CodeIn
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up animate-delay-200">
              Komunitas teknologi yang aktif, suportif, dan kolaboratif untuk
              mahasiswa IT. Temukan teman belajar, bagikan pengetahuan, dan
              bangun project luar biasa.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up animate-delay-300">
              <Link
                href="https://chat.whatsapp.com/LZWwynFIE148HJiz3Zg0DD"  target="_blank" rel="noopener noreferrer"
                className="btn-primary text-base px-8 py-3.5 rounded-2xl animate-btn-glow"
              >
                Bergabung Sekarang <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/articles"
                className="btn-secondary text-base px-8 py-3.5 rounded-2xl"
              >
                <BookOpen className="w-5 h-5" /> Baca Artikel
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-16 animate-fade-up animate-delay-400">
              {[
                {
                  icon: Users,
                  value: `60+`,
                  label: "Member Aktif",
                },
                {
                  icon: BookOpen,
                  value: `${articleCount || 0}+`,
                  label: "Artikel Ditulis",
                },
                { icon: Star, value: "100%", label: "Bergabung" },
                { icon: Globe, value: "1", label: "Komunitas UMB" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="text-center group"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <stat.icon className="w-4 h-4 text-blue-500" />
                    <div
                      className="font-display font-bold text-2xl sm:text-3xl text-blue-600 dark:text-blue-400 animate-counter-pop"
                      style={{ animationDelay: `${600 + i * 100}ms` }}
                    >
                      {stat.value}
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Live activity pill */}
            <div className="mt-10 flex justify-center animate-fade-up animate-delay-500">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/70 dark:bg-dark-800/70 backdrop-blur-md border border-gray-200/60 dark:border-dark-600/60 rounded-full shadow-lg text-sm text-gray-600 dark:text-gray-300">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  Komunitas aktif sekarang
                </span>
                <span className="text-gray-400 dark:text-gray-500">|</span>
                <span>Gabung dan mulai belajar 🚀</span>
              </div>
            </div>

            {/* Scroll hint */}
            <div
              className="mt-10 flex flex-col items-center gap-2 animate-fade-up"
              style={{ animationDelay: "600ms" }}
            >
              <span className="text-xs text-gray-400 dark:text-gray-500 tracking-widest uppercase">
                Scroll untuk explore
              </span>
              <div className="w-5 h-8 border-2 border-gray-300 dark:border-dark-500 rounded-full flex items-start justify-center p-1">
                <div className="w-1 h-2 bg-blue-500 rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Marquee Techs ── */}
        <section className="py-10 bg-gray-50 dark:bg-dark-800/50 border-y border-gray-100 dark:border-dark-700 overflow-hidden">
          <p className="text-center text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6">
            Teknologi yang Kami Eksplorasi Bersama
          </p>
          <MarqueeTechs />
        </section>

        {/* ── Features ── */}
        <section id="features" className="py-24 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll direction="up">
              <div className="text-center mb-16">
                <div className="badge bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/20 mb-4">
                  <Sparkles className="w-3.5 h-3.5 mr-1" /> Apa yang Kami
                  Tawarkan
                </div>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-4">
                  Satu Komunitas,{" "}
                  <span className="text-gradient">Banyak Manfaat</span>
                </h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                  CodeIn hadir sebagai ekosistem lengkap untuk perjalanan
                  belajarmu di dunia teknologi.
                </p>
              </div>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <AnimateOnScroll
                  key={feature.title}
                  direction="up"
                  delay={i * 80}
                >
                  <div className="card p-6 group hover:border-blue-200 dark:hover:border-blue-500/30 hover:-translate-y-2 h-full">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-display font-bold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      {feature.desc}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      Pelajari <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="py-24 bg-gray-50 dark:bg-dark-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll direction="up">
              <div className="text-center mb-16">
                <div className="badge bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/20 mb-4">
                  <Rocket className="w-3.5 h-3.5 mr-1" /> Cara Kerja
                </div>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-4">
                  Mulai dalam{" "}
                  <span className="text-gradient">4 Langkah Mudah</span>
                </h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                  Bergabung dan mulai perjalananmu bersama CodeIn — cepat,
                  mudah.
                </p>
              </div>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorks.map((item, idx) => (
                <AnimateOnScroll
                  key={item.step}
                  direction="up"
                  delay={idx * 120}
                >
                  <div className="relative text-center group">
                    {/* Connector line */}
                    {idx < howItWorks.length - 1 && (
                      <div className="hidden lg:block absolute top-10 left-[60%] w-full h-px bg-gradient-to-r from-blue-200 to-transparent dark:from-blue-500/20 z-0" />
                    )}
                    <div className="relative z-10">
                      <div className="w-20 h-20 mx-auto mb-4 bg-white dark:bg-dark-800 border-2 border-blue-100 dark:border-blue-500/20 rounded-2xl flex items-center justify-center shadow-lg group-hover:border-blue-400 group-hover:shadow-blue-500/10 group-hover:-translate-y-2 transition-all duration-300">
                        <item.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="inline-block text-xs font-bold text-blue-400 dark:text-blue-500 tracking-widest mb-2">
                        STEP {item.step}
                      </span>
                      <h3 className="font-display font-bold text-gray-900 dark:text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ── About Section ── */}
        <section id="about" className="py-24 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Visual — About */}
              <AnimateOnScroll direction="left">
                <div className="relative">
                  {/* Outer wrapper: enough padding so floating badges don't clip on mobile */}
                  <div
                    className="relative w-full aspect-square max-w-md mx-auto mt-10 mb-10 lg:mt-0 lg:mb-0"
                    style={{ padding: "28px" }}
                  >
                    {/* Spinning decorative ring */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-full h-full rounded-3xl border-2 border-dashed border-blue-200 dark:border-blue-500/20 animate-spin-slow" />
                    </div>

                    {/* Main card */}
                    <div className="relative w-full h-full bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-dark-800 rounded-3xl">
                      <div className="absolute inset-3 bg-white dark:bg-dark-800 rounded-2xl shadow-xl flex flex-col items-center justify-center p-6 gap-4">
                        <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center animate-float">
                          <Image
                            src="/images/codein.png"
                            alt="CodeIn Logo"
                            width={160}
                            height={160}
                            className="object-contain"
                          />
                        </div>
                        <div className="text-center">
                          <p className="font-display font-bold text-xl text-gray-900 dark:text-white">
                            CodeIn
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                            Komunitas IT UMB
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 w-full">
                          {[
                            { name: "React", icon: Code2 },
                            { name: "Python", icon: Lightbulb },
                            { name: "Node.js", icon: Zap },
                            { name: "DevOps", icon: GitBranch },
                          ].map(({ name, icon: Icon }) => (
                            <div
                              key={name}
                              className="flex items-center gap-2 px-2 py-1.5 bg-blue-50 dark:bg-blue-500/10 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors"
                            >
                              <Icon className="w-3 h-3 text-blue-500 shrink-0" />
                              <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">
                                {name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Floating achievement badges — outside overflow-hidden */}
                    <div className="absolute -top-3 -right-3 bg-white dark:bg-dark-800 border border-gray-100 dark:border-dark-600 rounded-2xl shadow-xl px-3 py-2 flex items-center gap-2 animate-float z-10">
                      <Trophy className="w-4 h-4 text-yellow-500 shrink-0" />
                      <span className="text-xs font-bold text-gray-700 dark:text-gray-200 whitespace-nowrap">
                        Community
                      </span>
                    </div>
                    <div
                      className="absolute -bottom-3 -left-3 bg-white dark:bg-dark-800 border border-gray-100 dark:border-dark-600 rounded-2xl shadow-xl px-3 py-2 flex items-center gap-2 z-10"
                      style={{
                        animation: "float 3s ease-in-out 1.5s infinite",
                      }}
                    >
                      <Award className="w-4 h-4 text-blue-500 shrink-0" />
                      <span className="text-xs font-bold text-gray-700 dark:text-gray-200 whitespace-nowrap">
                        Berkembang
                      </span>
                    </div>

                    {/* Glow blobs */}
                    <div className="absolute -top-6 -left-6 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl aurora-1 pointer-events-none" />
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-600/10 rounded-full blur-2xl aurora-2 pointer-events-none" />
                  </div>
                </div>
              </AnimateOnScroll>

              {/* Text */}
              <AnimateOnScroll direction="right">
                <div>
                  <div className="badge bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/20 mb-4">
                    <Lightbulb className="w-3.5 h-3.5 mr-1" /> Tentang Kami
                  </div>
                  <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-6 leading-tight">
                    Lahir dari Keresahan,{" "}
                    <span className="text-gradient">Tumbuh dari Semangat</span>
                  </h2>
                  <div className="space-y-4 text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                    <p>
                      <strong className="text-gray-900 dark:text-white">
                        CodeIn
                      </strong>{" "}
                      hadir dari keresahan mahasiswa terhadap terbatasnya wadah
                      belajar dan berdiskusi di bidang IT. Sistem pembelajaran
                      di kelas yang disamaratakan sering kali tidak
                      mengakomodasi perbedaan tingkat pemahaman setiap individu.
                    </p>
                    <p>
                      Minimnya ruang diskusi pasca-perkuliahan membuat proses
                      belajar sering terhenti begitu kelas berakhir. Saat
                      menghadapi tugas kompleks atau proyek mandiri, banyak
                      mahasiswa kebingungan — harus mulai dari mana?
                    </p>
                    <p>
                      Melalui{" "}
                      <strong className="text-gray-900 dark:text-white">
                        CodeIn
                      </strong>
                      , kami menghadirkan komunitas yang aktif, suportif, dan
                      kolaboratif — tempat untuk belajar bersama, berbagi
                      pengetahuan, dan membangun proyek secara konsisten dan
                      terarah.
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    {[
                      { icon: CheckCircle2, label: "Bergabung" },
                      { icon: CheckCircle2, label: "Komunitas aktif" },
                      { icon: CheckCircle2, label: "Berkembang" },
                      { icon: CheckCircle2, label: "Event & workshop rutin" },
                    ].map(({ icon: Icon, label }) => (
                      <div
                        key={label}
                        className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        <Icon className="w-4 h-4 text-blue-500 shrink-0" />
                        {label}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/auth/register"
                      className="btn-primary animate-btn-glow"
                    >
                      Bergabung Sekarang <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link href="/#features" className="btn-secondary">
                      Pelajari Lebih Lanjut
                    </Link>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* ── Values Section ── */}
        <section className="py-24 bg-gray-50 dark:bg-dark-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll direction="up">
              <div className="text-center mb-16">
                <div className="badge bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/20 mb-4">
                  <Heart className="w-3.5 h-3.5 mr-1" /> Nilai Kami
                </div>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-4">
                  Apa yang Membuat Kami{" "}
                  <span className="text-gradient">Berbeda</span>
                </h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                  Kami bukan sekadar forum biasa — kami adalah komunitas yang
                  saling peduli dan tumbuh bersama.
                </p>
              </div>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <AnimateOnScroll key={v.title} direction="up" delay={i * 100}>
                  <div className="card p-6 text-center group hover:-translate-y-2 hover:border-blue-200 dark:hover:border-blue-500/30 h-full">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <v.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-display font-bold text-gray-900 dark:text-white mb-2">
                      {v.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll direction="up">
              <div className="text-center mb-16">
                <div className="badge bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/20 mb-4">
                  <Quote className="w-3.5 h-3.5 mr-1" /> Testimoni
                </div>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-4">
                  Cerita dari{" "}
                  <span className="text-gradient">Anggota Kami</span>
                </h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                  Dengar langsung pengalaman nyata dari teman-teman yang sudah
                  bergabung di CodeIn.
                </p>
              </div>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <AnimateOnScroll key={t.name} direction="up" delay={i * 120}>
                  <div className="card p-6 flex flex-col hover:-translate-y-2 hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-blue-500/10 h-full">
                    <Quote className="w-8 h-8 text-blue-200 dark:text-blue-800 mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-1 italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white text-sm font-bold shadow">
                        {t.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-900 dark:text-white">
                          {t.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {t.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ── Latest Articles ── */}
        {articles && articles.length > 0 && (
          <section className="py-24 bg-gray-50 dark:bg-dark-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <div className="badge bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/20 mb-3">
                    <BarChart3 className="w-3.5 h-3.5 mr-1" /> Artikel Terbaru
                  </div>
                  <h2 className="font-display font-bold text-3xl text-gray-900 dark:text-white">
                    Dari Komunitas,{" "}
                    <span className="text-gradient">Untuk Komunitas</span>
                  </h2>
                </div>
                <Link href="/articles" className="btn-secondary hidden sm:flex">
                  Lihat Semua <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article as any} />
                ))}
              </div>

              <div className="mt-8 text-center sm:hidden">
                <Link href="/articles" className="btn-secondary">
                  Lihat Semua Artikel <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ── Stats Banner ── */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative card overflow-hidden p-10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900" />
              <div className="absolute inset-0 bg-grid opacity-20" />
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
              <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  {
                    icon: Users,
                    value: `60+`,
                    label: "Member Bergabung",
                  },
                  {
                    icon: BookOpen,
                    value: `${articleCount || 0}+`,
                    label: "Artikel Terpublikasi",
                  },
                  {
                    icon: Trophy,
                    value: "10+",
                    label: "Event Diselenggarakan",
                  },
                  {
                    icon: Globe,
                    value: "1",
                    label: "Universitas Muhammadiyah Bengkulu",
                  },
                ].map((s) => (
                  <div key={s.label}>
                    <s.icon className="w-6 h-6 text-blue-200 mx-auto mb-2" />
                    <div className="font-display font-bold text-3xl sm:text-4xl text-white mb-1">
                      {s.value}
                    </div>
                    <div className="text-blue-200 text-sm">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-24 bg-gray-50 dark:bg-dark-800/50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="badge bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/20 mb-4">
                <MessageSquare className="w-3.5 h-3.5 mr-1" /> FAQ
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-4">
                Pertanyaan yang{" "}
                <span className="text-gradient">Sering Ditanya</span>
              </h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  q: "Apakah CodeIn bersyarat?",
                  a: "Tidak! CodeIn sepenuhnya terbuka untuk seluruh mahasiswa  Universitas Muhammadiyah Bengkulu.",
                },
                {
                  q: "Siapa yang bisa bergabung di CodeIn?",
                  a: "CodeIn terbuka untuk seluruh mahasiswa IT di Universitas Muhammadiyah Bengkulu, dari semester 1 hingga yang sudah skripsi. Semua level keahlian disambut.",
                },
                {
                  q: "Apakah saya bisa menulis artikel di CodeIn?",
                  a: "Tentu! Setiap anggota yang sudah mendaftar dapat menulis dan mempublikasikan artikel tentang topik teknologi apapun yang ingin dibagikan.",
                },
                {
                  q: "Bagaimana cara kolaborasi project di CodeIn?",
                  a: "Kamu bisa memposting ide project di forum diskusi, mencari anggota dengan keahlian yang relevan, dan memulai kolaborasi langsung di dalam platform.",
                },
                {
                  q: "Apakah ada event atau workshop rutin?",
                  a: "Ya, CodeIn secara rutin menyelenggarakan workshop online/offline, hackathon internal, dan sesi coding bersama yang bisa diikuti seluruh anggota.",
                },
              ].map((faq, i) => (
                <details
                  key={i}
                  className="card group overflow-hidden cursor-pointer"
                >
                  <summary className="flex items-center justify-between p-5 font-display font-semibold text-gray-900 dark:text-white list-none select-none hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {faq.q}
                    <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform shrink-0 ml-4" />
                  </summary>
                  <div className="px-5 pb-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-dark-600 pt-4">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="relative card p-12 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800" />
              <div className="absolute inset-0 bg-grid opacity-20" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
              <div className="relative">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
                  Siap Bergabung dengan CodeIn?
                </h2>
                <p className="text-blue-100 text-lg mb-8 max-w-lg mx-auto">
                  Jadilah bagian dari komunitas IT yang aktif dan suportif.
                  Bergabung dan mulai perjalanan belajarmu hari ini!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="https://chat.whatsapp.com/LZWwynFIE148HJiz3Zg0DD"  target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-700 font-bold rounded-2xl hover:bg-blue-50 transition-all hover:-translate-y-0.5 shadow-xl"
                  >
                    Bergabung Sekarang <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    href="/articles"
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all hover:-translate-y-0.5 border border-white/20"
                  >
                    <BookOpen className="w-5 h-5" /> Lihat Artikel
                  </Link>
                </div>
                {/* Trust signals */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-blue-200 text-sm">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Bergabung
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Berkembang
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Komunitas aktif
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
