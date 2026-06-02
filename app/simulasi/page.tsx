"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { TrendingUp, PiggyBank, ShoppingCart, Bike, BookOpen, Gamepad2, ArrowRight, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

const totalBudget = 150000

const categories = [
  { key: "makan", label: "Makan & Jajan", icon: ShoppingCart, color: "text-primary", barColor: "bg-primary", recommended: 50 },
  { key: "transport", label: "Transportasi", icon: Bike, color: "text-blue-400", barColor: "bg-blue-400", recommended: 20 },
  { key: "alat", label: "Alat Belajar", icon: BookOpen, color: "text-accent", barColor: "bg-accent", recommended: 15 },
  { key: "hiburan", label: "Hiburan", icon: Gamepad2, color: "text-orange-400", barColor: "bg-orange-400", recommended: 10 },
  { key: "tabungan", label: "Tabungan", icon: PiggyBank, color: "text-yellow-400", barColor: "bg-yellow-400", recommended: 5 },
]

function fmt(n: number) {
  return `Rp ${n.toLocaleString("id-ID")}`
}

export default function SimulasiPage() {
  const [alloc, setAlloc] = useState<Record<string, number>>({
    makan: 45,
    transport: 20,
    alat: 15,
    hiburan: 10,
    tabungan: 10,
  })
  const [submitted, setSubmitted] = useState(false)

  const total = Object.values(alloc).reduce((a, b) => a + b, 0)
  const remaining = 100 - total

  const updateAlloc = (key: string, val: number) => {
    setAlloc((prev) => ({ ...prev, [key]: val }))
  }

  const getScore = () => {
    const savingsOk = alloc.tabungan >= 10
    const eatOk = alloc.makan <= 50
    const entertainOk = alloc.hiburan <= 20
    const balanced = Math.abs(remaining) <= 0
    const score = [savingsOk, eatOk, entertainOk, balanced].filter(Boolean).length
    return { savingsOk, eatOk, entertainOk, balanced, score }
  }

  const score = getScore()

  const tips: { text: string; ok: boolean }[] = [
    { text: "Alokasi tabungan minimal 10%", ok: score.savingsOk },
    { text: "Pengeluaran makan tidak melebihi 50%", ok: score.eatOk },
    { text: "Hiburan tidak melebihi 20%", ok: score.entertainOk },
    { text: "Total alokasi tepat 100%", ok: score.balanced },
  ]

  return (
    <div className="space-y-6 pb-20 md:pb-0 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-foreground">
          Simulasi <span className="text-primary">Anggaran</span>
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Kelola uang saku virtual Rp 150.000/minggu. Atur alokasi terbaik dan lihat skormu!
        </p>
      </div>

      {/* Budget overview */}
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-black text-foreground">Uang Saku Mingguan</p>
                <p className="text-2xl font-black text-primary">{fmt(totalBudget)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground font-semibold">Sisa Dialokasikan</p>
              <p className={cn("text-2xl font-black", remaining === 0 ? "text-accent" : remaining < 0 ? "text-destructive" : "text-foreground")}>
                {remaining}%
              </p>
            </div>
          </div>

          {/* Stacked bar */}
          <div className="h-4 rounded-full overflow-hidden flex gap-0.5">
            {categories.map((c) => (
              <div
                key={c.key}
                className={cn("h-full transition-all rounded-sm", c.barColor)}
                style={{ width: `${alloc[c.key]}%` }}
              />
            ))}
            {remaining > 0 && (
              <div className="h-full bg-muted flex-1 rounded-sm" />
            )}
          </div>
          <div className="flex flex-wrap gap-3 mt-3">
            {categories.map((c) => (
              <div key={c.key} className="flex items-center gap-1.5">
                <div className={cn("w-2.5 h-2.5 rounded-sm", c.barColor)} />
                <span className="text-xs text-muted-foreground">{c.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sliders */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-black text-foreground text-lg">Atur Alokasi</h2>
          {categories.map((c) => (
            <Card key={c.key} className="bg-card border-border">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <c.icon className={cn("w-5 h-5", c.color)} />
                    <span className="font-bold text-foreground">{c.label}</span>
                  </div>
                  <div className="text-right">
                    <span className={cn("text-lg font-black", c.color)}>{alloc[c.key]}%</span>
                    <p className="text-xs text-muted-foreground">{fmt((alloc[c.key] / 100) * totalBudget)}</p>
                  </div>
                </div>
                <Slider
                  value={[alloc[c.key]]}
                  onValueChange={([v]) => updateAlloc(c.key, v)}
                  min={0}
                  max={70}
                  step={1}
                  className="[&>span:first-child]:bg-muted [&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary [&>span:first-child>span]:bg-primary"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Rekomendasi: <span className="font-bold text-foreground">{c.recommended}%</span>
                </p>
              </CardContent>
            </Card>
          ))}

          <Button
            className="w-full bg-primary text-primary-foreground font-black text-base py-6 rounded-xl glow-gold hover:bg-primary/90"
            onClick={() => setSubmitted(true)}
            disabled={remaining !== 0}
          >
            {remaining !== 0 ? `Sisa ${remaining}% belum dialokasikan` : "Evaluasi Anggaranku"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Score card */}
        <div className="space-y-4">
          <h2 className="font-black text-foreground text-lg">Evaluasi</h2>
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-black text-muted-foreground uppercase tracking-wide">
                Skor Pengelolaan
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-center mb-4">
                <p className="text-5xl font-black text-primary">{submitted ? score.score : "—"}</p>
                <p className="text-muted-foreground text-sm mt-1">dari 4 kriteria</p>
                {submitted && (
                  <p className={cn(
                    "text-sm font-bold mt-2",
                    score.score === 4 ? "text-accent" : score.score >= 2 ? "text-primary" : "text-destructive"
                  )}>
                    {score.score === 4 ? "Anggaran Sempurna!" : score.score >= 2 ? "Cukup Baik" : "Perlu Perbaikan"}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                {tips.map((t) => (
                  <div key={t.text} className={cn(
                    "flex items-start gap-2 p-2.5 rounded-lg text-xs",
                    submitted
                      ? t.ok ? "bg-accent/10 text-foreground" : "bg-destructive/10 text-foreground"
                      : "bg-secondary text-muted-foreground"
                  )}>
                    <CheckCircle2 className={cn(
                      "w-4 h-4 shrink-0 mt-0.5",
                      submitted ? (t.ok ? "text-accent" : "text-destructive") : "text-muted-foreground"
                    )} />
                    <span className="font-semibold">{t.text}</span>
                  </div>
                ))}
              </div>

              {submitted && score.score === 4 && (
                <div className="mt-4 p-3 rounded-xl bg-primary/10 border border-primary/20 text-center">
                  <p className="text-primary font-bold text-sm">+150 XP diperoleh!</p>
                  <p className="text-yellow-400 font-bold text-sm">+100 Koin!</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Reference budget */}
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <p className="font-black text-sm text-foreground mb-3">Referensi Anggaran Ideal</p>
              {categories.map((c) => (
                <div key={c.key} className="flex justify-between text-xs py-1 border-b border-border last:border-0">
                  <span className="text-muted-foreground">{c.label}</span>
                  <span className={cn("font-bold", c.color)}>{c.recommended}%</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
