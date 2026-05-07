markdown

# 🚀 CodeIn — Komunitas IT UMB

Website komunitas teknologi untuk mahasiswa Universitas Muhammadiyah Bengkulu. Dibangun dengan Next.js 14, Tailwind CSS, dan Supabase.

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Frontend | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS |
| Backend | Next.js API Routes |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Fonts | Sora + Plus Jakarta Sans |

---

## 📁 Struktur Project

```
codein/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Landing page
│   │   ├── layout.tsx                  # Root layout
│   │   ├── not-found.tsx               # 404 page
│   │   ├── globals.css                 # Global styles
│   │   ├── auth/
│   │   │   ├── login/page.tsx          # Halaman login
│   │   │   └── register/page.tsx       # Halaman register
│   │   ├── dashboard/
│   │   │   └── page.tsx                # Dashboard user
│   │   ├── articles/
│   │   │   ├── page.tsx                # Daftar artikel
│   │   │   ├── new/page.tsx            # Buat artikel baru
│   │   │   └── [id]/
│   │   │       ├── page.tsx            # Detail artikel
│   │   │       └── edit/page.tsx       # Edit artikel
│   │   └── profile/
│   │       └── page.tsx                # Profil user
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx              # Navbar responsif
│   │   │   └── Footer.tsx              # Footer
│   │   ├── article/
│   │   │   ├── ArticleCard.tsx         # Card artikel
│   │   │   └── CommentSection.tsx      # Sistem komentar
│   │   └── ui/
│   │       ├── ThemeProvider.tsx       # Dark mode
│   │       └── Toast.tsx               # Notifikasi toast
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts               # Supabase browser client
│   │   │   └── server.ts               # Supabase server client
│   │   └── utils.ts                    # Helper functions
│   ├── types/
│   │   └── database.ts                 # TypeScript types
│   └── middleware.ts                   # Auth middleware
├── supabase-schema.sql                 # SQL schema database
├── .env.local.example                  # Contoh environment variables
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

---

## ⚡ Quick Start

### 1. Clone & Install

```bash
# Clone project
git clone 
cd codein

# Install dependencies
npm install
```

### 2. Setup Supabase

1. Buat akun dan project baru di [supabase.com](https://supabase.com)
2. Di Supabase Dashboard → **SQL Editor**, jalankan isi file `supabase-schema.sql`
3. Aktifkan **Email Auth** di Authentication → Providers
4. Copy **Project URL** dan **anon public key** dari Settings → API

### 3. Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Jalankan Dev Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) 🎉

---

## 🗄️ Database Schema

### Tabel `profiles`
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | UUID | Primary key (dari auth.users) |
| username | TEXT | Username unik (opsional) |
| full_name | TEXT | Nama lengkap |
| bio | TEXT | Bio singkat |
| avatar_url | TEXT | URL foto profil |
| role | TEXT | `admin` atau `member` |
| created_at | TIMESTAMPTZ | Waktu dibuat |
| updated_at | TIMESTAMPTZ | Waktu diperbarui |

### Tabel `articles`
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | UUID | Primary key |
| title | TEXT | Judul artikel |
| content | TEXT | Konten artikel |
| cover_image | TEXT | URL gambar cover |
| slug | TEXT | URL-friendly identifier |
| published | BOOLEAN | Status publikasi |
| author_id | UUID | FK ke profiles.id |
| views | INTEGER | Jumlah views |
| created_at | TIMESTAMPTZ | Waktu dibuat |
| updated_at | TIMESTAMPTZ | Waktu diperbarui |

### Tabel `comments`
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | UUID | Primary key |
| article_id | UUID | FK ke articles.id |
| author_id | UUID | FK ke profiles.id |
| content | TEXT | Isi komentar |
| created_at | TIMESTAMPTZ | Waktu dibuat |

---

## ✨ Fitur

- 🏠 **Landing Page** — Hero section, fitur komunitas, tentang kami, CTA
- 📝 **Artikel** — CRUD lengkap, editor, preview mode, cover image via URL
- 🔍 **Search** — Cari artikel berdasarkan judul
- 📄 **Pagination** — Navigasi halaman artikel
- 👤 **Auth** — Register, login, logout dengan Supabase Auth
- 🔐 **Proteksi Route** — Middleware untuk halaman yang memerlukan login
- 📊 **Dashboard** — Statistik artikel dan views
- 💬 **Komentar** — Sistem diskusi pada artikel
- 👑 **Role User** — Admin dan Member
- 🌙 **Dark Mode** — Toggle tema terang/gelap
- 📱 **Responsive** — Mobile, tablet, desktop

---

## 🚀 Deploy ke Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables di Vercel Dashboard
```

Tambahkan environment variables di Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 📜 License

MIT License — CodeIn Team, Universitas Muhammadiyah Bengkulu