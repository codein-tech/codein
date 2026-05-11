import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Eye,
  Calendar,
  MessageSquare,
  Share2,
  Pencil,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CommentSection from "@/components/article/CommentSection";
import { formatDate, readingTime } from "@/lib/utils";

interface Props {
  params: { id: string };
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {

  const supabase = await createClient();

  let { data: article } = await supabase
    .from("articles")
    .select("title, content, thumbnail, cover_image")
    .eq("slug", params.id)
    .maybeSingle();

  if (!article) {
    ({ data: article } = await supabase
      .from("articles")
      .select("title, content, thumbnail, cover_image")
      .eq("id", params.id)
      .maybeSingle());
  }

  if (!article) {
    return {
      title: "Artikel",
      description: "Artikel CodeIn",
    };
  }

  const title = article.title;

  const description =
    article.content
      ?.replace(/<[^>]+>/g, "")
      .slice(0, 160) || "Artikel CodeIn";

  const BASE_URL = "https://codein-umb.vercel.app";

  const rawImage =
    article.cover_image ||
    article.thumbnail ||
    `${BASE_URL}/og/default.jpg`;

  const image = rawImage.startsWith("http")
    ? rawImage
    : `${BASE_URL}${rawImage.startsWith("/") ? "" : "/"}${rawImage}`;

  return {
    title: { absolute: title },
    description,

    openGraph: {
      title,
      description,

      url: `${BASE_URL}/articles/${params.id}`,

      siteName: "CodeIn",

      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],

      locale: "id_ID",

      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Try slug first, then id
  let { data: article } = await supabase
    .from("articles")
    .select("*, profiles(*)")
    .eq("slug", params.id)
    .eq("published", true)
    .single();

  if (!article) {
    ({ data: article } = await supabase
      .from("articles")
      .select("*, profiles(*)")
      .eq("id", params.id)
      .single());
  }

  if (!article) notFound();

  // Increment views
  await supabase
    .from("articles")
    .update({ views: (article.views || 0) + 1 })
    .eq("id", article.id);

  const { data: comments } = await supabase
    .from("comments")
    .select("*, profiles(*)")
    .eq("article_id", article.id)
    .order("created_at", { ascending: true });

  const isAuthor = user?.id === article.author_id;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-16 bg-white dark:bg-dark-900">
        {/* Cover */}
        {article.cover_image && (
          <div className="w-full h-64 sm:h-80 lg:h-96 overflow-hidden bg-gray-100 dark:bg-dark-800">
            <img
              src={article.cover_image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          {/* Back */}
          <Link
            href="/articles"
            className="btn-ghost text-sm mb-8 -ml-2 gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" /> Semua Artikel
          </Link>

          {/* Title */}
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white leading-tight mb-6">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pb-8 border-b border-gray-100 dark:border-dark-600 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white text-sm font-bold overflow-hidden">
                {(article as any).profiles?.avatar_url ? (
                  <img
                    src={(article as any).profiles.avatar_url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  ((article as any).profiles?.full_name || "A")[0].toUpperCase()
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {(article as any).profiles?.full_name || "Anonymous"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Penulis
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />{" "}
                {formatDate(article.created_at)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {readingTime(article.content)}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" /> {article.views} views
              </span>
            </div>
            {isAuthor && (
              <Link
                href={`/articles/${article.id}/edit`}
                className="btn-secondary text-sm py-1.5 gap-1.5 ml-auto"
              >
                <Pencil className="w-3.5 h-3.5" /> Edit
              </Link>
            )}
          </div>

          {/* Content */}
          <article
            className="prose-codein-html"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Comments */}
          <div className="mt-16 pt-8 border-t border-gray-100 dark:border-dark-600">
            <h2 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-500" />
              Diskusi ({comments?.length || 0})
            </h2>
            <CommentSection
              articleId={article.id}
              initialComments={(comments as any) || []}
              currentUser={user}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
