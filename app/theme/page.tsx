'use client'

import {
  Coins,
  Trophy,
  Zap,
  Flame,
  Star,
  Target,
  Wallet,
  PiggyBank,
  Gift,
  Heart,
  TrendingUp,
  Award,
  Shield,
  Crown,
  Gem,
  Sparkles,
  ChevronRight,
  Play,
  BookOpen,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

export default function ThemeShowcasePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HERO SECTION - Layout Visual 1 */}
      <section className="relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          {/* Header Navigation */}
          <header className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-3">
              <div className="icon-circle-primary w-12 h-12">
                <Coins className="w-6 h-6" />
              </div>
              <span className="text-2xl font-extrabold">
                <span className="text-gradient-primary">Fin</span>
                <span className="text-gradient-gold">Quest</span>
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-medium">Beranda</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-medium">Fitur</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-medium">Tentang</a>
              <Button variant="outline" className="btn-ghost-adventure">Masuk</Button>
              <Button className="btn-adventure">Mulai Gratis</Button>
            </nav>
          </header>

          {/* Hero Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Platform Gamifikasi Keuangan #1</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-black leading-tight">
                <span className="text-foreground">Petualangan </span>
                <span className="shine-text">Finansial</span>
                <span className="text-foreground"> untuk Siswa SMP</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Belajar kelola uang saku dengan cara seru! Selesaikan misi, kumpulkan koin, naik level, dan jadi ahli keuangan masa depan.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="btn-adventure">
                  <Play className="w-5 h-5" />
                  Mulai Petualangan
                </button>
                <button className="btn-ghost-adventure">
                  <BookOpen className="w-5 h-5" />
                  Pelajari Lebih Lanjut
                </button>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <p className="text-3xl font-black text-gradient-primary">50K+</p>
                  <p className="text-sm text-muted-foreground">Siswa Aktif</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div>
                  <p className="text-3xl font-black text-gradient-gold">1.2M</p>
                  <p className="text-sm text-muted-foreground">Misi Selesai</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div>
                  <p className="text-3xl font-black text-gradient-primary">98%</p>
                  <p className="text-sm text-muted-foreground">Puas Belajar</p>
                </div>
              </div>
            </div>

            {/* Hero Visual - Game Card Preview */}
            <div className="relative">
              <div className="card-achievement p-6 space-y-6 glow-gold">
                {/* Player Header */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-black text-primary-foreground">
                    AN
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">Andi Pratama</h3>
                    <p className="text-sm text-muted-foreground">Kelas 8A - SMP Nusantara</p>
                  </div>
                  <div className="badge-gold">Level 12</div>
                </div>

                {/* XP Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress ke Level 13</span>
                    <span className="font-semibold text-xp">2,450 / 3,000 XP</span>
                  </div>
                  <div className="progress-xp">
                    <div className="progress-xp-fill" style={{ width: '82%' }} />
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 rounded-xl bg-secondary/50">
                    <Coins className="w-6 h-6 mx-auto text-coin mb-1" />
                    <p className="text-lg font-bold">4,280</p>
                    <p className="text-xs text-muted-foreground">Koin</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-secondary/50">
                    <Trophy className="w-6 h-6 mx-auto text-primary mb-1" />
                    <p className="text-lg font-bold">#24</p>
                    <p className="text-xs text-muted-foreground">Peringkat</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-secondary/50">
                    <Flame className="w-6 h-6 mx-auto text-streak mb-1" />
                    <p className="text-lg font-bold">7</p>
                    <p className="text-xs text-muted-foreground">Hari Streak</p>
                  </div>
                </div>

                {/* Badges Preview */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Lencana:</span>
                  <div className="flex -space-x-2">
                    {[PiggyBank, Wallet, Target, Star, Award].map((Icon, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-accent/20 border-2 border-card flex items-center justify-center">
                        <Icon className="w-4 h-4 text-accent" />
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs font-bold text-muted-foreground">
                      +8
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 float-anim">
                <div className="badge-coin text-base px-4 py-2">
                  <Coins className="w-5 h-5" />
                  +100 Koin
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 float-anim" style={{ animationDelay: '1s' }}>
                <div className="badge-xp text-base px-4 py-2">
                  <Zap className="w-5 h-5" />
                  +250 XP
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STYLE GUIDE SECTION */}
      <section className="border-t border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold mb-3">Panduan Gaya Visual</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Sistem desain lengkap untuk platform Financial Adventure
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Color Palette */}
            <Card className="card-adventure">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="icon-circle-primary w-8 h-8">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  Palet Warna
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Primary Colors */}
                <div>
                  <p className="text-sm font-semibold mb-3 text-muted-foreground">WARNA UTAMA</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary shadow-card" />
                      <div>
                        <p className="font-semibold text-sm">Primary (Teal)</p>
                        <p className="text-xs text-muted-foreground">Kepercayaan finansial</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-accent shadow-card" />
                      <div>
                        <p className="font-semibold text-sm">Accent (Gold)</p>
                        <p className="text-xs text-muted-foreground">Hadiah & pencapaian</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Colors */}
                <div>
                  <p className="text-sm font-semibold mb-3 text-muted-foreground">WARNA STATUS</p>
                  <div className="flex gap-3">
                    <div className="flex-1 p-3 rounded-lg bg-success/15 border border-success/30 text-center">
                      <p className="text-sm font-semibold text-success">Berhasil</p>
                    </div>
                    <div className="flex-1 p-3 rounded-lg bg-warning/15 border border-warning/30 text-center">
                      <p className="text-sm font-semibold text-warning">Peringatan</p>
                    </div>
                    <div className="flex-1 p-3 rounded-lg bg-error/15 border border-error/30 text-center">
                      <p className="text-sm font-semibold text-error">Gagal</p>
                    </div>
                    <div className="flex-1 p-3 rounded-lg bg-info/15 border border-info/30 text-center">
                      <p className="text-sm font-semibold text-info">Info</p>
                    </div>
                  </div>
                </div>

                {/* Gamification Colors */}
                <div>
                  <p className="text-sm font-semibold mb-3 text-muted-foreground">WARNA GAMIFIKASI</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="badge-xp"><Zap className="w-4 h-4" /> XP</span>
                    <span className="badge-coin"><Coins className="w-4 h-4" /> Koin</span>
                    <span className="badge-streak"><Flame className="w-4 h-4" /> Streak</span>
                    <span className="badge-level"><Star className="w-4 h-4" /> Level</span>
                  </div>
                </div>

                {/* Category Colors */}
                <div>
                  <p className="text-sm font-semibold mb-3 text-muted-foreground">KATEGORI MISI</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-misi-tabungan/15">
                      <PiggyBank className="w-4 h-4 text-misi-tabungan" />
                      <span className="text-sm font-medium">Tabungan</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-misi-belanja/15">
                      <Wallet className="w-4 h-4 text-misi-belanja" />
                      <span className="text-sm font-medium">Belanja Cerdas</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-misi-investasi/15">
                      <TrendingUp className="w-4 h-4 text-misi-investasi" />
                      <span className="text-sm font-medium">Investasi</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-misi-donasi/15">
                      <Heart className="w-4 h-4 text-misi-donasi" />
                      <span className="text-sm font-medium">Donasi</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Typography */}
            <Card className="card-adventure">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="icon-circle-gold w-8 h-8">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  Tipografi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-sm font-semibold mb-3 text-muted-foreground">FONT FAMILY</p>
                  <p className="text-lg">
                    <span className="font-bold">Nunito</span> - Font utama, rounded & friendly
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-semibold text-muted-foreground">HEADING STYLES</p>
                  <div className="space-y-2 p-4 rounded-xl bg-secondary/30">
                    <p className="text-4xl font-black">Judul Utama (4xl/Black)</p>
                    <p className="text-2xl font-extrabold">Subjudul (2xl/ExtraBold)</p>
                    <p className="text-xl font-bold">Heading Kartu (xl/Bold)</p>
                    <p className="text-lg font-semibold">Label Penting (lg/Semibold)</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-semibold text-muted-foreground">BODY & CAPTION</p>
                  <div className="space-y-2">
                    <p className="text-base">Teks paragraf standar (base/Regular)</p>
                    <p className="text-sm text-muted-foreground">Teks sekunder atau caption (sm/Muted)</p>
                    <p className="text-xs text-muted-foreground">Label kecil atau metadata (xs/Muted)</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-semibold text-muted-foreground">EFEK TEKS SPESIAL</p>
                  <p className="text-2xl font-black shine-text">Teks Berkilau Premium</p>
                  <p className="text-2xl font-black shine-gold">Teks Emas Achievement</p>
                  <p className="text-2xl font-black text-gradient-primary">Gradient Primary</p>
                </div>
              </CardContent>
            </Card>

            {/* Buttons & Interactive */}
            <Card className="card-adventure">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="icon-circle-success w-8 h-8">
                    <Play className="w-4 h-4" />
                  </div>
                  Tombol & Interaktif
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-sm font-semibold mb-3 text-muted-foreground">TOMBOL UTAMA</p>
                  <div className="flex flex-wrap gap-3">
                    <button className="btn-adventure">
                      <Play className="w-4 h-4" />
                      Mulai Misi
                    </button>
                    <button className="btn-reward">
                      <Gift className="w-4 h-4" />
                      Klaim Hadiah
                    </button>
                    <button className="btn-ghost-adventure">
                      <ChevronRight className="w-4 h-4" />
                      Lihat Semua
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-3 text-muted-foreground">TOMBOL SHADCN VARIANTS</p>
                  <div className="flex flex-wrap gap-3">
                    <Button>Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-3 text-muted-foreground">BADGE PERINGKAT</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="badge-bronze">Perunggu</span>
                    <span className="badge-silver">Perak</span>
                    <span className="badge-gold">Emas</span>
                    <span className="badge-platinum">Platinum</span>
                    <span className="badge-diamond">Berlian</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-3 text-muted-foreground">BADGE STATUS</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Belum Mulai</Badge>
                    <Badge variant="outline">Terkunci</Badge>
                    <Badge className="bg-success/15 text-success border-success/30 hover:bg-success/20">Selesai</Badge>
                    <Badge className="bg-warning/15 text-warning border-warning/30 hover:bg-warning/20">Sedang Berjalan</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress & Indicators */}
            <Card className="card-adventure">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="icon-circle-xp w-8 h-8">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  Progress & Indikator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-sm font-semibold mb-3 text-muted-foreground">PROGRESS BAR ADVENTURE</p>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress Utama</span>
                        <span className="font-semibold">75%</span>
                      </div>
                      <div className="progress-adventure">
                        <div className="progress-adventure-fill" style={{ width: '75%' }} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>XP ke Level Selanjutnya</span>
                        <span className="font-semibold text-xp">1,800 / 2,500</span>
                      </div>
                      <div className="progress-xp">
                        <div className="progress-xp-fill" style={{ width: '72%' }} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress Misi</span>
                        <span className="font-semibold text-success">3 / 5 Selesai</span>
                      </div>
                      <div className="progress-mission">
                        <div className="progress-mission-fill" style={{ width: '60%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-3 text-muted-foreground">SHADCN PROGRESS</p>
                  <Progress value={65} className="h-3" />
                </div>

                <div>
                  <p className="text-sm font-semibold mb-3 text-muted-foreground">ICON CONTAINERS</p>
                  <div className="flex gap-3">
                    <div className="icon-circle-primary w-12 h-12">
                      <Target className="w-6 h-6" />
                    </div>
                    <div className="icon-circle-gold w-12 h-12">
                      <Coins className="w-6 h-6" />
                    </div>
                    <div className="icon-circle-success w-12 h-12">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <div className="icon-circle-xp w-12 h-12">
                      <Zap className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* LAYOUT VISUAL 2 - Dashboard Style */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold mb-3">Contoh Layout Dashboard</h2>
            <p className="text-muted-foreground">Area konten utama dengan navigasi samping</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Mini Sidebar */}
            <div className="lg:col-span-1">
              <Card className="card-adventure sticky top-6">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/10 text-primary">
                    <Target className="w-5 h-5" />
                    <span className="font-semibold">Dashboard</span>
                  </div>
                  {[
                    { icon: BookOpen, label: 'Misi Harian' },
                    { icon: Wallet, label: 'Simulasi' },
                    { icon: Trophy, label: 'Papan Peringkat' },
                    { icon: Award, label: 'Koleksi Badge' },
                    { icon: Users, label: 'Profil' },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-3 p-3 rounded-xl text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors cursor-pointer">
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{label}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Stats Row */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: Zap, label: 'Total XP', value: '12,450', color: 'xp', badge: 'badge-xp' },
                  { icon: Coins, label: 'Koin', value: '4,280', color: 'coin', badge: 'badge-coin' },
                  { icon: Trophy, label: 'Peringkat', value: '#24', color: 'primary', badge: 'badge-level' },
                  { icon: Flame, label: 'Streak', value: '7 Hari', color: 'streak', badge: 'badge-streak' },
                ].map(({ icon: Icon, label, value, badge }) => (
                  <Card key={label} className="card-adventure">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className={badge}>
                          <Icon className="w-4 h-4" />
                          {label}
                        </span>
                      </div>
                      <p className="text-2xl font-black">{value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Mission Cards */}
              <Card className="card-adventure">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      Misi Hari Ini
                    </CardTitle>
                    <Badge variant="secondary">3 / 5 Selesai</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { title: 'Catat Pengeluaran Hari Ini', xp: 50, coin: 25, status: 'done', category: 'tabungan' },
                    { title: 'Kuis: Bedakan Kebutuhan vs Keinginan', xp: 100, coin: 50, status: 'done', category: 'belanja' },
                    { title: 'Simulasi Anggaran Mingguan', xp: 150, coin: 75, status: 'active', category: 'investasi' },
                    { title: 'Tantangan: 1 Minggu Tanpa Jajan', xp: 200, coin: 100, status: 'locked', category: 'tabungan' },
                  ].map((mission, i) => (
                    <div key={i} className={`card-mission p-4 ${mission.status === 'locked' ? 'opacity-50' : ''}`}>
                      <div className="flex items-center gap-4">
                        <div className={`icon-circle w-10 h-10 ${
                          mission.category === 'tabungan' ? 'bg-misi-tabungan/15 text-misi-tabungan' :
                          mission.category === 'belanja' ? 'bg-misi-belanja/15 text-misi-belanja' :
                          'bg-misi-investasi/15 text-misi-investasi'
                        }`}>
                          {mission.category === 'tabungan' ? <PiggyBank className="w-5 h-5" /> :
                           mission.category === 'belanja' ? <Wallet className="w-5 h-5" /> :
                           <TrendingUp className="w-5 h-5" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{mission.title}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-xp font-medium">+{mission.xp} XP</span>
                            <span className="text-xs text-coin font-medium">+{mission.coin} Koin</span>
                          </div>
                        </div>
                        {mission.status === 'done' && (
                          <Badge className="bg-success/15 text-success border-success/30">Selesai</Badge>
                        )}
                        {mission.status === 'active' && (
                          <Button size="sm" className="btn-adventure text-sm px-4 py-2">Mulai</Button>
                        )}
                        {mission.status === 'locked' && (
                          <Badge variant="outline">Terkunci</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* SHADOWS & CARDS SHOWCASE */}
      <section className="border-t border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold mb-3">Kartu & Shadow</h2>
            <p className="text-muted-foreground">Variasi style kartu untuk berbagai kebutuhan</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card-adventure p-6 text-center">
              <h3 className="font-bold mb-2">Card Adventure</h3>
              <p className="text-sm text-muted-foreground">Kartu standar dengan hover effect naik dan glow</p>
            </div>
            <div className="card-achievement p-6 text-center">
              <h3 className="font-bold mb-2">Card Achievement</h3>
              <p className="text-sm text-muted-foreground">Kartu untuk pencapaian dengan border gold</p>
            </div>
            <div className="card-mission p-6 text-center">
              <h3 className="font-bold mb-2">Card Mission</h3>
              <p className="text-sm text-muted-foreground">Kartu misi dengan gradient top border</p>
            </div>
          </div>

          <div className="divider-adventure my-12" />

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-card shadow-card text-center">
              <h3 className="font-bold mb-2">Shadow Card</h3>
              <p className="text-sm text-muted-foreground">Shadow standar untuk elevasi ringan</p>
            </div>
            <div className="p-6 rounded-xl bg-card shadow-adventure text-center">
              <h3 className="font-bold mb-2">Shadow Adventure</h3>
              <p className="text-sm text-muted-foreground">Shadow dengan hint warna primary</p>
            </div>
            <div className="p-6 rounded-xl bg-card shadow-elevated text-center">
              <h3 className="font-bold mb-2">Shadow Elevated</h3>
              <p className="text-sm text-muted-foreground">Shadow untuk modal atau popover</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            Financial Adventure Theme Guide - Platform Gamifikasi Keuangan untuk Siswa SMP
          </p>
        </div>
      </footer>
    </main>
  )
}
