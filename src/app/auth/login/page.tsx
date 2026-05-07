"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Eye,
  EyeOff,
  ArrowRight,
  Mail,
  Lock,
  Loader2,
  BookOpen,
  MessageSquare,
  Users,
  ChevronLeft,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/Toast";

const FEATURES = [
  { icon: BookOpen, text: "Akses semua artikel & diskusi" },
  { icon: MessageSquare, text: "Forum tanya jawab aktif" },
  { icon: Users, text: "Networking sesama mahasiswa IT" },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
 const redirect = "/dashboard";
  const supabase = createClient();
  const { showToast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      showToast(error.message, "error");
    } else {
      showToast("Berhasil masuk!", "success");
      router.push(redirect);
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* ── Left Panel ── */}
      <div className="hidden lg:flex lg:w-[52%] bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 relative overflow-hidden flex-col items-center justify-center p-14">
        {/* Decorative layers */}
        <div className="absolute inset-0 bg-grid opacity-[0.07]" />
        <div className="absolute top-1/4 -left-16 w-72 h-72 bg-white/5 rounded-full blur-3xl aurora-1" />
        <div className="absolute bottom-1/4 -right-16 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl aurora-2" />
        <div className="absolute top-10 right-10 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl aurora-3" />

        <div className="relative text-center text-white max-w-sm">
          {/* Logo */}
          <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl animate-float">
            <Image
              src="/images/codein.png"
              alt="CodeIn Logo"
              width={72}
              height={72}
              className="object-contain"
            />
          </div>

          <h1 className="font-display font-bold text-4xl mb-3 leading-tight">
            Selamat Kembali!
          </h1>
          <p className="text-blue-100/90 text-base leading-relaxed mb-10">
            Masuk ke <strong className="text-white">CodeIn</strong> dan
            lanjutkan perjalanan belajarmu bersama komunitas IT UMB.
          </p>

          {/* Feature list */}
          <div className="space-y-3 text-left">
            {FEATURES.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3"
              >
                <div className="w-8 h-8 bg-white/15 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-blue-50 font-medium">{text}</span>
              </div>
            ))}
          </div>

          {/* Pill tags */}
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {["Belajar", "Berbagi", "Berkembang"].map((v) => (
              <span
                key={v}
                className="px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm font-semibold text-white/90"
              >
                {v}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Panel — Form ── */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-white dark:bg-dark-900">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 mb-8 lg:hidden group"
          >
            <div className="w-9 h-9 bg-white rounded-xl shadow-md border border-gray-100 flex items-center justify-center group-hover:shadow-lg transition-shadow">
              <Image
                src="/images/codein.png"
                alt="CodeIn"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <span className="font-display font-bold text-xl text-gray-900 dark:text-white">
              Code<span className="text-blue-500">In</span>
            </span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h2 className="font-display font-bold text-3xl text-gray-900 dark:text-white mb-2">
              Masuk ke Akun
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Belum punya akun?{" "}
              <Link
                href="/auth/register"
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                Daftar gratis →
              </Link>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="label">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="email@umb.ac.id"
                  className="input-field pl-10"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="label mb-0">Password</label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="input-field pl-10 pr-12"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  aria-label={
                    showPass ? "Sembunyikan password" : "Tampilkan password"
                  }
                >
                  {showPass ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3.5 text-base rounded-xl animate-btn-glow disabled:opacity-70 disabled:cursor-not-allowed disabled:animate-none mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  Masuk <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Back link */}
          <p className="mt-8 text-center text-sm text-gray-400 dark:text-gray-500">
            <Link
              href="/"
              className="inline-flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Kembali ke Beranda
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
