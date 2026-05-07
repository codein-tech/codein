import { redirect } from "next/navigation";
import Link from "next/link";
import { PenSquare, Eye, FileText, MessageSquare, ArrowRight, Pencil, Trash2, Clock, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { formatDate } from "@/lib/utils";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: articles } = await supabase
    .from("articles")
    .select("*, profiles(*)")
    .eq("author_id", user.id)
    .order("created_at", { ascending: false });

  const { count: commentCount } = await supabase
    .from("comments")
    .select("*", { count: "exact", head: true })
    .eq("author_id", user.id);

  const totalViews = articles?.reduce((sum, a) => sum + (a.views || 0), 0) || 0;
  const publishedCount = articles?.filter((a) => a.published).length || 0;
  const draftCount = articles?.filter((a) => !a.published).length || 0;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 dark:text-white">
                Selamat datang, {profile?.full_name || user.email?.split("@")[0]} 👋
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Kelola artikel dan pantau aktivitasmu</p>
            </div>
            <Link href="/articles/new" className="btn-primary shrink-0">
              <PenSquare className="w-4 h-4" /> Tulis Artikel
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Artikel", value: articles?.length || 0, icon: FileText, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
              { label: "Dipublikasikan", value: publishedCount, icon: CheckCircle, color: "text-green-500", bg: "bg-green-50 dark:bg-green-500/10" },
              { label: "Total Views", value: totalViews, icon: Eye, color: "text-violet-500", bg: "bg-violet-50 dark:bg-violet-500/10" },
              { label: "Komentar", value: commentCount || 0, icon: MessageSquare, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-500/10" },
            ].map((stat) => (
              <div key={stat.label} className="card p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</span>
                  <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`w-4.5 h-4.5 ${stat.color} w-5 h-5`} />
                  </div>
                </div>
                <p className="font-display font-bold text-2xl text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Articles Table */}
          <div className="card overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-dark-600 flex items-center justify-between">
              <h2 className="font-display font-bold text-lg text-gray-900 dark:text-white">Artikel Saya</h2>
              {draftCount > 0 && (
                <span className="badge bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-500/20">
                  {draftCount} draf
                </span>
              )}
            </div>

            {!articles || articles.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="font-display font-semibold text-lg text-gray-900 dark:text-white mb-2">Belum Ada Artikel</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Mulai bagikan pengetahuanmu dengan menulis artikel pertamamu!</p>
                <Link href="/articles/new" className="btn-primary">
                  <PenSquare className="w-4 h-4" /> Tulis Artikel Pertama
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-100 dark:divide-dark-600">
                {articles.map((article) => (
                  <div key={article.id} className="p-5 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-dark-700/50 transition-colors group">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 dark:from-dark-700 dark:to-dark-600 overflow-hidden shrink-0">
                      {article.cover_image ? (
                        <img src={article.cover_image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FileText className="w-6 h-6 text-blue-400" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white truncate text-sm">{article.title}</h3>
                        <span className={`badge shrink-0 ${article.published ? "bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/20" : "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-500/20"}`}>
                          {article.published ? "Publik" : "Draf"}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {formatDate(article.created_at)}</span>
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {article.views} views</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <Link href={`/articles/${article.slug}`} className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 text-gray-400 hover:text-blue-600 transition-colors" title="Lihat">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link href={`/articles/${article.id}/edit`} className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 text-gray-400 hover:text-blue-600 transition-colors" title="Edit">
                        <Pencil className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/articles" className="card p-5 flex items-center gap-4 hover:border-blue-200 dark:hover:border-blue-500/30 group transition-all">
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-500/10 rounded-xl flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20 transition-colors">
                <FileText className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 dark:text-white text-sm">Jelajahi Artikel</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Baca artikel dari anggota lain</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </Link>
            <Link href="/profile" className="card p-5 flex items-center gap-4 hover:border-blue-200 dark:hover:border-blue-500/30 group transition-all">
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-500/10 rounded-xl flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20 transition-colors">
                <PenSquare className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 dark:text-white text-sm">Edit Profil</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Update foto & bio kamu</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
