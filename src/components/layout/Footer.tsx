import Link from "next/link";
import { Code2, Github, Instagram, Twitter,MessagesSquare, MapPin, Mail } from "lucide-react";
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-dark-800 border-t border-gray-100 dark:border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center">
                <Image
                  src="/images/codein.png"
                  alt="CodeIn Logo"
                  width={48}
                  height={48}
                  className="object-contain rounded-full"
                />
              </div>
              <span className="font-display font-bold text-xl text-gray-900 dark:text-white">
                Code<span className="text-blue-500">In</span>
              </span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
              Komunitas IT untuk mahasiswa Universitas Muhammadiyah Bengkulu. Belajar, berbagi, dan berkolaborasi bersama.
            </p>
            <div className="flex items-center gap-1.5 mt-4 text-sm text-gray-500 dark:text-gray-400">
              <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
              <span>Universitas Muhammadiyah Bengkulu</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-sm text-gray-500 dark:text-gray-400">
              <Mail className="w-4 h-4 text-blue-500 shrink-0" />
              <span>codeinumb@gmail.com</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold text-gray-900 dark:text-white mb-4">Navigasi</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "Beranda" },
                { href: "/articles", label: "Artikel" },
                { href: "/#about", label: "Tentang Kami" },
                { href: "https://chat.whatsapp.com/LZWwynFIE148HJiz3Zg0DD", label: "Bergabung" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display font-semibold text-gray-900 dark:text-white mb-4">Ikuti Kami</h4>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "https://www.instagram.com/codein.umb", label: "Instagram" },
                { icon: Github, href: "https://github.com/codein-tech", label: "GitHub" },
                { icon: MessagesSquare, href: "https://chat.whatsapp.com/LZWwynFIE148HJiz3Zg0DD", label: "WhatsApp" },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white dark:bg-dark-700 border border-gray-200 dark:border-dark-600 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-blue-500 hover:border-blue-400 transition-all hover:-translate-y-0.5">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-dark-600 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} CodeIn — Komunitas IT UMB. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Made with ❤️ by CodeIn Team
          </p>
        </div>
      </div>
    </footer>
  );
}
