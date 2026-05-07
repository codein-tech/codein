"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Code2, ArrowRight, Mail, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/Toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  const supabase = createClient();
  const { showToast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
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
      {/* Left — Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-900 relative overflow-hidden flex-col items-center justify-center p-12">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/4 -left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-10 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="relative text-center text-white">
          <div className="w-20 h-20 bg-white/15 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl animate-float">
            <Code2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-display font-bold text-4xl mb-4">Selamat Kembali!</h1>
          <p className="text-blue-100 text-lg max-w-xs leading-relaxed">
            Masuk ke CodeIn dan lanjutkan perjalanan belajarmu bersama komunitas IT terbaik.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {["Belajar", "Berbagi", "Berkembang"].map((v) => (
              <div key={v} className="bg-white/10 rounded-2xl p-3 text-sm font-semibold">{v}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white dark:bg-dark-900">
        <div className="w-full max-w-md">
          {/* Logo (mobile) */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-gray-900 dark:text-white">
              Code<span className="text-blue-500">In</span>
            </span>
          </div>

          <h2 className="font-display font-bold text-3xl text-gray-900 dark:text-white mb-2">Masuk ke Akun</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Belum punya akun?{" "}
            <Link href="/auth/register" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Daftar gratis</Link>
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="label">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 w-4 h-4" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="email@umb.ac.id"
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div>
              <label className="label">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="input-field pl-10 pr-12"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 text-base rounded-xl">
              {loading ? "Memproses..." : "Masuk"} {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">← Kembali ke Beranda</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
