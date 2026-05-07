"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  ArrowRight,
  Mail,
  Lock,
  User,
  Loader2,
  CheckCircle2,
  Rocket,
  GitBranch,
  ChevronLeft,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/Toast";

const BENEFITS = [
  { icon: CheckCircle2, text: "Akses semua artikel & diskusi" },
  { icon: CheckCircle2, text: "Tulis & bagikan pengetahuanmu" },
  { icon: GitBranch, text: "Kolaborasi project bersama" },
  { icon: Rocket, text: "Gratis selamanya!" },
];

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const { showToast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    showToast("Khusus untuk Admin.", "error");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
    return;
    e.preventDefault();
    if (password.length < 8) {
      showToast("Password minimal 8 karakter", "error");
      return;
    }
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

    if (error?.message) {
      showToast(error!.message, "error");
    } else if (data.user) {
      await supabase.from("profiles").upsert({
        id: data.user.id,
        full_name: fullName,
        role: "member",
      });
      showToast("Akun berhasil dibuat! Silakan masuk.", "success");
      router.push("/dashboard");
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* ── Left Panel ── */}
      <div className="hidden lg:flex lg:w-[52%] bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 relative overflow-hidden flex-col items-center justify-center p-14">
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
            Bergabung dengan
            <br />
            CodeIn
          </h1>
          <p className="text-blue-100/90 text-base leading-relaxed mb-10">
            Jadilah bagian dari komunitas IT yang aktif dan suportif di{" "}
            <strong className="text-white">
              Universitas Muhammadiyah Bengkulu
            </strong>
            .
          </p>

          {/* Benefits list */}
          <div className="space-y-3 text-left">
            {BENEFITS.map(({ icon: Icon, text }) => (
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
              Buat Akun Baru
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Sudah punya akun?{" "}
              <Link
                href="/auth/login"
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                Masuk di sini →
              </Link>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-5">
            {/* Full name */}
            <div>
              <label className="label">Nama Lengkap</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder="Nama lengkapmu"
                  className="input-field pl-10"
                  autoComplete="name"
                />
              </div>
            </div>

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
              <label className="label">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  placeholder="Min. 8 karakter"
                  className="input-field pl-10 pr-12"
                  autoComplete="new-password"
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
              <p className="mt-1.5 text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                <Lock className="w-3 h-3" /> Minimal 8 karakter
              </p>
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
                  Daftar Sekarang <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-4 text-xs text-center text-gray-400 dark:text-gray-500">
            Dengan mendaftar, kamu menyetujui syarat &amp; ketentuan komunitas
            CodeIn.
          </p>

          <p className="mt-6 text-center text-sm text-gray-400 dark:text-gray-500">
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
