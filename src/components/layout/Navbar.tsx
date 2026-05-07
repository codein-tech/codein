"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Sun, Moon, Code2, Search, Bell, LogOut, User, LayoutDashboard, PenSquare } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useTheme } from "@/components/ui/ThemeProvider";
import { cn } from "@/lib/utils";
import type { Profile } from "@/lib/types/database";
import Image from 'next/image'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user) {
        supabase
          .from("profiles")
          .select("*")
          .eq("id", data.user.id)
          .single()
          .then(({ data: p }) => setProfile(p));
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/articles", label: "Artikel" },
    { href: "/#about", label: "Tentang" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "glass shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
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
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  pathname === link.href
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-700"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-2">
            <button onClick={toggleTheme} className="btn-ghost p-2">
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-700 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white text-xs font-bold overflow-hidden">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      (profile?.full_name || user.email || "U")[0].toUpperCase()
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 max-w-[100px] truncate">
                    {profile?.full_name || user.email?.split("@")[0]}
                  </span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 card shadow-xl py-1 border border-gray-100 dark:border-dark-600 z-50">
                    <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors" onClick={() => setDropdownOpen(false)}>
                      <LayoutDashboard className="w-4 h-4 text-blue-500" /> Dashboard
                    </Link>
                    <Link href="/articles/new" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors" onClick={() => setDropdownOpen(false)}>
                      <PenSquare className="w-4 h-4 text-blue-500" /> Tulis Artikel
                    </Link>
                    <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors" onClick={() => setDropdownOpen(false)}>
                      <User className="w-4 h-4 text-blue-500" /> Profil
                    </Link>
                    <hr className="my-1 border-gray-100 dark:border-dark-600" />
                    <button onClick={handleLogout} className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth/login" className="btn-ghost text-sm py-2">Masuk</Link>
                <Link href="/auth/register" className="btn-primary text-sm py-2">Daftar</Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button onClick={toggleTheme} className="btn-ghost p-2">
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={() => (setMenuOpen(!menuOpen), setScrolled(true))} className="btn-ghost p-2">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100 dark:border-dark-600 pt-4 space-y-1 animate-fade-in">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="block px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors" onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
            <hr className="my-2 border-gray-100 dark:border-dark-600" />
            {user ? (
              <>
                <Link href="/dashboard" className="block px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">Logout</button>
              </>
            ) : (
              <div className="flex gap-2 px-2 pt-2">
                <Link href="/auth/login" className="btn-secondary flex-1 justify-center text-sm" onClick={() => setMenuOpen(false)}>Masuk</Link>
                <Link href="/auth/register" className="btn-primary flex-1 justify-center text-sm" onClick={() => setMenuOpen(false)}>Daftar</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
