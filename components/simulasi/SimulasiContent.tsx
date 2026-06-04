"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { TrendingUp, ArrowRight, CheckCircle2, ShoppingCart, BookOpen, Gamepad2, PiggyBank, HandHeart } from "lucide-react"
import { cn } from "@/lib/utils"

const iconMap: Record<string, any> = {
    ShoppingCart,
    BookOpen,
    Gamepad2,
    PiggyBank,
    HandHeart,
}

const categories = [
    { key: "makan", label: "Makan & Jajan", icon: "ShoppingCart", color: "text-primary", barColor: "bg-primary", recommended: 50 },
    { key: "sekolah", label: "Kebutuhan Sekolah", icon: "BookOpen", color: "text-blue-400", barColor: "bg-blue-400", recommended: 20 },
    { key: "hiburan", label: "Hiburan", icon: "Gamepad2", color: "text-orange-400", barColor: "bg-orange-400", recommended: 10 },
    { key: "tabungan", label: "Tabungan", icon: "PiggyBank", color: "text-yellow-400", barColor: "bg-yellow-400", recommended: 10 },
    { key: "berbagi", label: "Berbagi", icon: "HandHeart", color: "text-accent", barColor: "bg-accent", recommended: 10 },
]

function fmt(n: number) {
    return `Rp ${n.toLocaleString("id-ID")}`
}

interface SimulasiContentProps {
    initialAlloc: Record<string, number>
    totalBudget: number,
    finalAlloc?: any
}

export function SimulasiContent({ initialAlloc, totalBudget, finalAlloc }: SimulasiContentProps) {
    const [alloc, setAlloc] = useState<Record<string, number>>(initialAlloc)
    const [submitted, setSubmitted] = useState(false)
    const [earnedXp, setEarnedXp] = useState(0)

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
    const calculateXp = () => {
        if (score.score === 4) return 150
        if (score.score === 3) return 100
        if (score.score === 2) return 50
        return 0
    }
    const xp = calculateXp()

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
                    Kelola uang saku virtual {fmt(totalBudget)}/minggu. Atur alokasi terbaik dan lihat skormu!
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
                    <form onSubmit={async (e) => {
                        e.preventDefault()
                        if (remaining !== 0) return
                        try {
                            const res = await fetch('/api/budgets', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ alloc, xp })
                            })
                            if (!res.ok) {
                                console.error('save failed', await res.text())
                                return
                            }
                            setEarnedXp(xp)
                            setSubmitted(true)
                        } catch (err) {
                            console.error(err)
                        }
                    }}>
                        <h2 className="font-black text-foreground text-lg">Atur Alokasi</h2>
                        {categories.map((c) => {
                            const Icon = iconMap[c.icon]
                            return (
                                <Card key={c.key} className="bg-card border-border">
                                    <CardContent className="p-5">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <Icon className={cn("w-5 h-5", c.color)} />
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
                                            className="[&>span:first-child]:bg-muted **:[[role=slider]]:bg-primary **:[[role=slider]]:border-primary [&>span:first-child>span]:bg-primary"
                                        />
                                        <p className="text-xs text-muted-foreground mt-2">
                                            Rekomendasi: <span className="font-bold text-foreground">{c.recommended}%</span>
                                        </p>
                                    </CardContent>
                                </Card>
                            )
                        })}

                        <Button
                            type="submit"
                            className="w-full bg-primary text-primary-foreground font-black text-base py-6 rounded-xl glow-gold hover:bg-primary/90"
                            disabled={remaining !== 0}
                        >
                            {remaining > 0 ? `Sisa ${remaining}% belum dialokasikan` : remaining < 0 ? `Anggaran berlebih ${Math.abs(remaining)}%` : "Evaluasi Anggaranku"}
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </form>
                </div>

                <div className="space-y-4">
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
