"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Coins, Shield, Trophy, Zap, TrendingUp, BookOpen, ChevronRight, Star, Target, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export default function LandingPage() {
  const [view, setView] = useState<"landing" | "login" | "register">("landing")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/dashboard")
  }

  if (view === "login") {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-4 relative">
        <div
          className="fixed inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.78 0.17 80) 1px, transparent 1px), linear-gradient(90deg, oklch(0.78 0.17 80) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 mb-4 float-anim">
              <Coins className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-black shine-text">FinQuest</h1>
            <p className="text-muted-foreground text-sm mt-1">Platform Gamifikasi Keuangan</p>
          </div>

          <Card className="border-border bg-card">
            <CardContent className="p-8">
              <h2 className="text-xl font-bold text-foreground mb-1">Selamat Datang!</h2>
              <p className="text-muted-foreground text-sm mb-6">
                Masuk untuk melanjutkan petualangan finansialmu
              </p>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-foreground font-semibold">
                    Username / NIS
                  </Label>
                  <Input
                    id="username"
                    placeholder="Masukkan username atau NIS"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground font-semibold">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground font-bold text-base py-6 rounded-xl glow-gold hover:bg-primary/90"
                >
                  Mulai Petualangan
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </form>
              <div className="mt-4 text-center">
                <button
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setView("landing")}
                >
                  Kembali ke halaman utama
                </button>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Platform Edukasi Keuangan untuk Siswa &bull; v1.0
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.78 0.17 80) 1px, transparent 1px), linear-gradient(90deg, oklch(0.78 0.17 80) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
            <Coins className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xl font-black text-primary">FinQuest</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground font-semibold">
          <a href="#fitur" className="hover:text-primary transition-colors">
            Fitur
          </a>
          <a href="#cara-main" className="hover:text-primary transition-colors">
            Cara Main
          </a>
          <a href="#tentang" className="hover:text-primary transition-colors">
            Tentang
          </a>
        </div>
        <Button
          onClick={(e) => handleLogin(e)}
          className="bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90"
        >
          Masuk
        </Button>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-20 pb-24">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-bold mb-6">
          <Star className="w-4 h-4 fill-primary" />
          Platform Gamifikasi #1 untuk Siswa
        </div>

        <h1 className="text-5xl md:text-7xl font-black leading-tight text-balance max-w-4xl">
          <span className="shine-text">Financial</span>
          <br />
          <span className="text-foreground">Adventure</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed text-pretty">
          Kuasai seni mengelola uang saku dan ambil keputusan finansial yang cerdas lewat misi seru,
          kuis interaktif, dan petualangan dunia keuangan yang menantang.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <Button
            onClick={(e) => { handleLogin(e)}}
            size="lg"
            className="bg-primary text-primary-foreground font-black text-lg px-8 py-7 rounded-xl glow-gold hover:bg-primary/90"
          >
            Mulai Petualangan Gratis
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-border text-foreground font-bold text-lg px-8 py-7 rounded-xl hover:bg-secondary"
          >
            Lihat Demo
          </Button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-16 pt-8 border-t border-border w-full max-w-2xl">
          {[
            { value: "2.400+", label: "Siswa Aktif" },
            { value: "150+", label: "Misi Tersedia" },
            { value: "98%", label: "Senang Belajar" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-black text-primary">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1 font-semibold">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="fitur" className="relative z-10 px-6 py-16 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-foreground">
            Kenapa <span className="text-primary">FinQuest</span>?
          </h2>
          <p className="text-muted-foreground mt-3 text-lg">Belajar keuangan tidak pernah semenyenangkan ini</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <Card key={f.title} className="bg-card border-border card-hover cursor-pointer">
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${f.iconBg}`}>
                  <f.icon className={`w-6 h-6 ${f.iconColor}`} />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How to Play */}
      <section id="cara-main" className="relative z-10 px-6 py-16 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-12">Cara Bermain</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={s.title} className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/40 flex items-center justify-center">
                  <span className="text-2xl font-black text-primary">{i + 1}</span>
                </div>
                <h3 className="font-bold text-lg text-foreground">{s.title}</h3>
                <p className="text-muted-foreground text-sm text-center leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4 text-balance">
            Siap memulai <span className="text-primary">petualangan keuanganmu</span>?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Bergabunglah dengan ribuan siswa yang sudah cerdas finansial
          </p>
          <Button
            onClick={() => setView("login")}
            size="lg"
            className="bg-primary text-primary-foreground font-black text-lg px-10 py-7 rounded-xl glow-gold hover:bg-primary/90"
          >
            Daftar Sekarang - Gratis!
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Coins className="w-5 h-5 text-primary" />
          <span className="font-black text-primary text-lg">FinQuest</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Platform Gamifikasi Keuangan untuk Siswa &bull; Edukasi Finansial yang Menyenangkan
        </p>
      </footer>
    </main>
  )
}

const features = [
  {
    icon: Zap,
    title: "Kuis Interaktif",
    desc: "Uji pengetahuan keuanganmu lewat kuis dengan soal pilihan ganda, benar/salah, dan skenario pengambilan keputusan.",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
  },
  {
    icon: Trophy,
    title: "Sistem XP & Lencana",
    desc: "Kumpulkan poin pengalaman (XP), dan dapatkan lencana eksklusif untuk setiap pencapaian keuanganmu.",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: TrendingUp,
    title: "Simulasi Anggaran",
    desc: "Kelola uang saku virtual, rencanakan pengeluaran, dan lihat bagaimana keputusanmu memengaruhi kondisi keuangan.",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
  },
]

const steps = [
  {
    title: "Buat Akun & Pilih Karakter",
    desc: "Daftar dengan NIS sekolahmu, pilih avatar petualangmu, dan tentukan target keuangan pertama.",
  },
  {
    title: "Selesaikan Misi & Kuis",
    desc: "Kerjakan misi harian dan mingguan. Jawab kuis keuangan untuk mendapatkan XP dan koin.",
  },
  {
    title: "Naik Level & Raih Prestasi",
    desc: "Kumpulkan lencana, masuk papan peringkat, dan jadilah Financial Hero di kelasmu!",
  },
]
