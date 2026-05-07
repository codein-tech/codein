import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ArticleCard from "@/components/article/ArticleCard";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Search, PenSquare, BookOpen } from "lucide-react";

export const metadata = { title: "Artikel — CodeIn" };

interface Props {
  searchParams: { q?: string; page?: string };
}

const PAGE_SIZE = 9;

export default async function ArticlesPage({ searchParams }: Props) {
  const supabase = await createClient();
  const q = searchParams.q || "";
  const page = Number(searchParams.page || 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("articles")
    .select("*, profiles(*)", { count: "exact" })
    .eq("published", true)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (q) {
    query = query.ilike("title", `%${q}%`);
  }

  const { data: articles, count } = await query;
  const totalPages = Math.ceil((count || 0) / PAGE_SIZE);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-dark-900">
        {/* Hero */}
        <div className="bg-white dark:bg-dark-800 border-b border-gray-100 dark:border-dark-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-2xl">
              <div className="badge bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/20 mb-4">
                <BookOpen className="w-3.5 h-3.5" /> Blog Komunitas
              </div>
              <h1 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-3">
                Artikel & Insight Terbaru
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Tulisan dari anggota komunitas CodeIn tentang teknologi, tips coding, project, dan pengalaman.
              </p>
            </div>

            {/* Search & Write */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <form className="flex-1" action="/articles" method="GET">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    name="q"
                    defaultValue={q}
                    placeholder="Cari artikel..."
                    className="input-field pl-10 w-full"
                  />
                </div>
              </form>
              <Link href="/articles/new" className="btn-primary shrink-0">
                <PenSquare className="w-4 h-4" /> Tulis Artikel
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {q && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Hasil pencarian untuk "<strong className="text-gray-900 dark:text-white">{q}</strong>" — {count || 0} artikel ditemukan
            </p>
          )}

          {!articles || articles.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="font-display font-semibold text-xl text-gray-900 dark:text-white mb-2">
                {q ? "Artikel Tidak Ditemukan" : "Belum Ada Artikel"}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                {q ? "Coba kata kunci lain" : "Jadilah yang pertama menulis artikel!"}
              </p>
              <Link href="/articles/new" className="btn-primary">
                <PenSquare className="w-4 h-4" /> Tulis Artikel
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article as any} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/articles?${q ? `q=${q}&` : ""}page=${p}`}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                    p === page
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                      : "bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-dark-600 hover:border-blue-400 hover:text-blue-600"
                  }`}
                >
                  {p}
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
