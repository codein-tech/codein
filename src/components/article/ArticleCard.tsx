"use client";

import Link from "next/link";
import { Clock, Eye, User, Calendar } from "lucide-react";
import { formatDate, readingTime, truncate } from "@/lib/utils";
import type { Article } from "@/lib/types/database";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  return (
    <Link href={`/articles/${article.slug}`} className={`card group block overflow-hidden hover:-translate-y-1 transition-all duration-300 ${featured ? "md:flex gap-6" : ""}`}>
      {/* Cover */}
      {article.cover_image && (
        <div className={`overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 dark:from-dark-700 dark:to-dark-600 ${featured ? "md:w-80 md:shrink-0 h-48 md:h-auto" : "h-48"}`}>
          <img
            src={article.cover_image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      )}
      {!article.cover_image && (
        <div className={`bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center ${featured ? "md:w-80 md:shrink-0 h-48 md:h-auto" : "h-48"}`}>
          <span className="text-4xl font-display font-bold text-white/20">
            {article.title[0]?.toUpperCase()}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className={`font-display font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug mb-2 ${featured ? "text-xl" : "text-base"}`}>
          {article.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4 flex-1">
          {truncate(article.content.replace(/<[^>]*>/g, ""), 120)}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white text-xs font-bold overflow-hidden">
              {article.profiles?.avatar_url ? (
                <img src={article.profiles.avatar_url} alt="" className="w-full h-full object-cover" />
              ) : (
                (article.profiles?.full_name || "A")[0].toUpperCase()
              )}
            </div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              {article.profiles?.full_name || "Anonymous"}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" /> {article.views}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {readingTime(article.content)}
            </span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-dark-600">
          <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> {formatDate(article.created_at)}
          </span>
        </div>
      </div>
    </Link>
  );
}
