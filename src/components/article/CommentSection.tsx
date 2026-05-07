"use client";

import { useState } from "react";
import { Send, Trash2, MessageSquare } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/Toast";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import type { Comment, Profile } from "@/types/database";
import type { User } from "@supabase/supabase-js";

interface Props {
  articleId: string;
  initialComments: (Comment & { profiles?: Profile })[];
  currentUser: User | null;
}

export default function CommentSection({ articleId, initialComments, currentUser }: Props) {
  const [comments, setComments] = useState(initialComments);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    if (!currentUser) { showToast("Masuk untuk berkomentar", "info"); return; }

    setLoading(true);
    const { data, error } = await supabase
      .from("comments")
      .insert({ article_id: articleId, author_id: currentUser.id, content: text.trim() })
      .select("*, profiles(*)")
      .single();

    if (error) {
      showToast(error.message, "error");
    } else {
      setComments((prev) => [...prev, data as any]);
      setText("");
      showToast("Komentar berhasil dikirim!", "success");
    }
    setLoading(false);
  };

  const handleDelete = async (commentId: string) => {
    const { error } = await supabase.from("comments").delete().eq("id", commentId);
    if (!error) {
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      showToast("Komentar dihapus", "info");
    }
  };

  return (
    <div className="space-y-6">
      {/* Form */}
      {currentUser ? (
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white text-xs font-bold shrink-0">
            {currentUser.email?.[0].toUpperCase()}
          </div>
          <div className="flex-1 flex gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Tulis komentar..."
              className="input-field flex-1"
              disabled={loading}
            />
            <button type="submit" disabled={loading || !text.trim()} className="btn-primary px-4 py-2.5">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      ) : (
        <div className="p-4 bg-blue-50 dark:bg-blue-500/10 rounded-xl border border-blue-100 dark:border-blue-500/20 text-sm text-blue-700 dark:text-blue-300">
          <Link href="/auth/login" className="font-semibold hover:underline">Masuk</Link> untuk ikut berdiskusi.
        </div>
      )}

      {/* Comments List */}
      {comments.length === 0 ? (
        <div className="text-center py-10 text-gray-400 dark:text-gray-500">
          <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Belum ada komentar. Jadilah yang pertama!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white text-xs font-bold shrink-0 overflow-hidden">
                {comment.profiles?.avatar_url ? (
                  <img src={comment.profiles.avatar_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  (comment.profiles?.full_name || "A")[0].toUpperCase()
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {comment.profiles?.full_name || "Anonymous"}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">{formatDate(comment.created_at)}</span>
                  {currentUser?.id === comment.author_id && (
                    <button onClick={() => handleDelete(comment.id)} className="ml-auto opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 transition-all">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
