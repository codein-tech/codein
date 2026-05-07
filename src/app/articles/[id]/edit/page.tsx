"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Send,
  Trash2,
  Eye,
  EyeOff,
  Image,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/Toast";
import Navbar from "@/components/layout/Navbar";
import TelegraphEditor from "@/components/article/TelegraphEditor";

export default function EditArticlePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [preview, setPreview] = useState(false);
  const [articleId, setArticleId] = useState("");
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();
  const { showToast } = useToast();

  useEffect(() => {
    const id = params.id as string;
    supabase
      .from("articles")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error }: { data: Article | null; error: any }) => {
        if (error || !data) {
          router.push("/dashboard");
          return;
        }
        setTitle(data.title);
        setContent(data.content);
        setCoverImage(data.cover_image || "");
        setPublished(data.published);
        setArticleId(data.id);
      });
  }, [params.id]);

  const handleSave = async (pub: boolean) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("articles")
      .update({
        title,
        content,
        cover_image: coverImage || null,
        published: pub,
        updated_at: new Date().toISOString(),
      })
      .eq("id", articleId)
      .select()
      .single();

    if (error) showToast(error.message, "error");
    else {
      showToast("Artikel diperbarui!", "success");
      router.push(pub ? `/articles/${data.slug}` : "/dashboard");
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (
      !confirm("Yakin hapus artikel ini? Tindakan ini tidak bisa dibatalkan.")
    )
      return;
    setDeleting(true);
    const { error } = await supabase
      .from("articles")
      .delete()
      .eq("id", articleId);
    if (error) showToast(error.message, "error");
    else {
      showToast("Artikel dihapus", "info");
      router.push("/dashboard");
    }
    setDeleting(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-16 bg-white dark:bg-dark-900">
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
                onClick={handleDelete}
                disabled={deleting}
                className="btn-ghost text-sm gap-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Trash2 className="w-4 h-4" /> Hapus
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
                <Send className="w-4 h-4" />{" "}
                {published ? "Perbarui" : "Publikasikan"}
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          {preview ? (
            /* ── Preview ── */
            <div className="max-w-3xl mx-auto">
              {coverImage && (
                <img
                  src={coverImage}
                  alt=""
                  className="w-full h-64 object-cover rounded-2xl mb-8"
                />
              )}
              <h1 className="font-display font-bold text-4xl text-gray-900 dark:text-white mb-6">
                {title}
              </h1>
              <div
                className="prose-codein-html"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          ) : (
            /* ── Editor ── */
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Cover */}
              <div>
                <label className="label flex items-center gap-2">
                  <Image className="w-4 h-4 text-blue-500" /> Gambar Cover (URL)
                </label>
                <input
                  type="url"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://..."
                  className="input-field"
                />
                {coverImage && (
                  <div className="mt-2 rounded-xl overflow-hidden h-48 bg-gray-100 dark:bg-dark-700">
                    <img
                      src={coverImage}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Title */}
              <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Judul artikel..."
                rows={2}
                className="w-full bg-transparent text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-gray-600 resize-none focus:outline-none leading-snug"
              />

              <hr className="border-gray-100 dark:border-dark-600" />

              {/* Telegraph editor */}
              <TelegraphEditor
                value={content}
                onChange={setContent}
                placeholder="Edit konten artikel kamu di sini..."
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
