"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, Save, Send, Image } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";
import Navbar from "@/components/layout/Navbar";
import TelegraphEditor from "@/components/article/TelegraphEditor";

export default function NewArticlePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const { showToast } = useToast();

  const handleSave = async (pub: boolean) => {
    if (!title.trim() || !content.trim()) {
      showToast("Judul dan konten wajib diisi", "error");
      return;
    }
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/auth/login");
      return;
    }

    const { data, error } = await supabase
      .from("articles")
      .insert({
        title: title.trim(),
        content: content.trim(),
        cover_image: coverImage.trim() || null,
        slug: slugify(title),
        published: pub,
        author_id: user.id,
        views: 0,
      })
      .select()
      .single();

    if (error) {
      showToast(error.message, "error");
    } else {
      showToast(pub ? "Artikel dipublikasikan!" : "Draf tersimpan!", "success");
      router.push(pub ? `/articles/${data.slug}` : "/dashboard");
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-16 bg-white dark:bg-dark-900">
        {/* Top bar */}
        <div className="sticky top-16 z-30 glass border-b border-gray-100 dark:border-dark-700">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            <Link href="/dashboard" className="btn-ghost text-sm gap-1.5">
              <ArrowLeft className="w-4 h-4" /> Kembali
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPreview(!preview)}
                className={`btn-ghost text-sm gap-1.5 ${preview ? "text-blue-600 bg-blue-50 dark:bg-blue-500/10" : ""}`}
              >
                {preview ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
                {preview ? "Edit" : "Preview"}
              </button>
              <button
                onClick={() => handleSave(false)}
                disabled={loading}
                className="btn-secondary text-sm py-2 gap-1.5"
              >
                <Save className="w-4 h-4" /> Simpan Draf
              </button>
              <button
                onClick={() => handleSave(true)}
                disabled={loading}
                className="btn-primary text-sm py-2 gap-1.5"
              >
                <Send className="w-4 h-4" /> Publikasikan
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          {preview ? (
            /* ── Preview Mode ── */
            <div className="max-w-3xl mx-auto">
              {coverImage && (
                <img
                  src={coverImage}
                  alt=""
                  className="w-full h-64 object-cover rounded-2xl mb-8"
                />
              )}
              <h1 className="font-display font-bold text-4xl text-gray-900 dark:text-white mb-6 leading-tight">
                {title || "Judul Artikel"}
              </h1>
              <div
                className="prose-codein-html"
                dangerouslySetInnerHTML={{
                  __html:
                    content || "<p>Konten artikel akan tampil di sini...</p>",
                }}
              />
            </div>
          ) : (
            /* ── Editor Mode ── */
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Cover Image */}
              <div>
                <label className="label flex items-center gap-2">
                  <Image className="w-4 h-4 text-blue-500" /> Gambar Cover (URL)
                </label>
                <input
                  type="url"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="input-field"
                />
                {coverImage && (
                  <div className="mt-2 rounded-xl overflow-hidden h-48 bg-gray-100 dark:bg-dark-700">
                    <img
                      src={coverImage}
                      alt=""
                      className="w-full h-full object-cover"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  </div>
                )}
              </div>

              {/* Title */}
              <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Judul artikel yang menarik..."
                rows={2}
                className="w-full bg-transparent text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-gray-600 resize-none focus:outline-none leading-snug"
              />

              <hr className="border-gray-100 dark:border-dark-600" />

              {/* Telegraph-style rich editor */}
              <TelegraphEditor
                value={content}
                onChange={setContent}
                placeholder="Mulai tulis artikel kamu di sini... Gunakan toolbar di atas untuk bold, italic, quote, heading, gambar, dll."
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
