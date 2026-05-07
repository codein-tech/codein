"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { User, Camera, Save, Mail, FileText, Eye } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/Toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();
  const { showToast } = useToast();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { window.location.href = "/auth/login"; return; }
      setUser(data.user);
      supabase.from("profiles").select("*").eq("id", data.user.id).single().then(({ data: p }) => {
        if (p) {
          setProfile(p);
          setFullName(p.full_name || "");
          setBio(p.bio || "");
          setAvatarUrl(p.avatar_url || "");
        }
      });
      supabase.from("articles").select("*").eq("author_id", data.user.id).order("created_at", { ascending: false }).then(({ data: a }) => {
        setArticles(a || []);
      });
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      full_name: fullName,
      bio,
      avatar_url: avatarUrl || null,
      updated_at: new Date().toISOString(),
    });
    if (error) showToast(error.message, "error");
    else showToast("Profil berhasil diperbarui!", "success");
    setLoading(false);
  };

  if (!user) return null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-display font-bold text-2xl text-gray-900 dark:text-white mb-8">Profil Saya</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="card p-6 text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white text-3xl font-bold mx-auto overflow-hidden">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
                    ) : (
                      (fullName || user?.email || "U")[0].toUpperCase()
                    )}
                  </div>
                </div>
                <h2 className="font-display font-bold text-xl text-gray-900 dark:text-white">{fullName || "Nama belum diatur"}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{user?.email}</p>
                {profile?.role && (
                  <span className="badge bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/20 mt-3">
                    {profile.role === "admin" ? "👑 Admin" : "👤 Member"}
                  </span>
                )}
                {bio && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">{bio}</p>
                )}

                <div className="mt-6 grid grid-cols-2 gap-3 pt-6 border-t border-gray-100 dark:border-dark-600">
                  <div className="text-center">
                    <p className="font-display font-bold text-xl text-gray-900 dark:text-white">{articles.length}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Artikel</p>
                  </div>
                  <div className="text-center">
                    <p className="font-display font-bold text-xl text-gray-900 dark:text-white">
                      {articles.reduce((sum, a) => sum + (a.views || 0), 0)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Total Views</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card p-6">
                <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-5">Edit Profil</h3>
                <form onSubmit={handleSave} className="space-y-4">
                  <div>
                    <label className="label">Nama Lengkap</label>
                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="input-field" placeholder="Nama lengkapmu" />
                  </div>
                  <div>
                    <label className="label">Bio</label>
                    <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className="input-field resize-none" placeholder="Ceritakan sedikit tentang dirimu..." />
                  </div>
                  <div>
                    <label className="label flex items-center gap-2"><Camera className="w-4 h-4 text-blue-500" /> Foto Profil (URL)</label>
                    <input type="url" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} className="input-field" placeholder="https://..." />
                  </div>
                  <div>
                    <label className="label flex items-center gap-2"><Mail className="w-4 h-4 text-blue-500" /> Email</label>
                    <input type="email" value={user?.email || ""} disabled className="input-field opacity-60 cursor-not-allowed" />
                    <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">Email tidak dapat diubah</p>
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary gap-2">
                    <Save className="w-4 h-4" /> {loading ? "Menyimpan..." : "Simpan Perubahan"}
                  </button>
                </form>
              </div>

              {/* My Articles */}
              <div className="card overflow-hidden">
                <div className="p-5 border-b border-gray-100 dark:border-dark-600">
                  <h3 className="font-display font-semibold text-gray-900 dark:text-white">Artikel Saya</h3>
                </div>
                {articles.length === 0 ? (
                  <div className="p-8 text-center text-sm text-gray-500 dark:text-gray-400">Belum ada artikel</div>
                ) : (
                  <div className="divide-y divide-gray-100 dark:divide-dark-600">
                    {articles.slice(0, 5).map((article) => (
                      <div key={article.id} className="p-4 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-dark-700/50 transition-colors">
                        <div className="flex-1 min-w-0">
                          <Link href={`/articles/${article.slug}`} className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 truncate block">
                            {article.title}
                          </Link>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{formatDate(article.created_at)}</p>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-400 shrink-0">
                          <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {article.views}</span>
                          <span className={`badge ${article.published ? "bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400" : "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"}`}>
                            {article.published ? "Publik" : "Draf"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {articles.length > 5 && (
                  <div className="p-4 border-t border-gray-100 dark:border-dark-600">
                    <Link href="/dashboard" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                      Lihat semua artikel →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
