import Link from "next/link";
import { Code2, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-dark-900 px-4 text-center">
      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-blue-500/20">
        <Code2 className="w-8 h-8 text-white" />
      </div>
      <h1 className="font-display font-bold text-6xl text-gray-900 dark:text-white mb-4">404</h1>
      <h2 className="font-display font-semibold text-xl text-gray-700 dark:text-gray-300 mb-2">Halaman Tidak Ditemukan</h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
        Halaman yang kamu cari tidak ada atau telah dipindahkan. Coba kembali ke beranda.
      </p>
      <div className="flex gap-3">
        <Link href="/" className="btn-primary">
          <Home className="w-4 h-4" /> Beranda
        </Link>
        <Link href="/articles" className="btn-secondary">
          <ArrowLeft className="w-4 h-4" /> Lihat Artikel
        </Link>
      </div>
    </div>
  );
}
