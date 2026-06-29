"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Spinner } from "@/components/ui/spinner"
import { TrendingUp, ArrowRight, ShoppingCart, BookOpen, Gamepad2, PiggyBank, HandHeart } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
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
}

export function SimulasiContent({ initialAlloc, totalBudget }: SimulasiContentProps) {
    const [alloc, setAlloc] = useState<Record<string, number>>(initialAlloc)

    const [budget, setBudget] = useState<number>(() => {
        try {
            const stored = typeof window !== 'undefined' ? localStorage.getItem('totalBudget') : null
            return stored ? Number(stored) : totalBudget
        } catch (e) {
            return totalBudget
        }
    })
    const [open, setOpen] = useState<boolean>(budget === 0)
    const [budgetInput, setBudgetInput] = useState<string>(budget > 0 ? String(budget) : "")
    const [isSaving, setIsSaving] = useState<boolean>(false)

    const total = Object.values(alloc).reduce((a, b) => a + b, 0)
    const remaining = 100 - total

    const updateAlloc = (key: string, val: number) => {
        setAlloc((prev) => ({ ...prev, [key]: val }))
    }

    const saveInitialBudget = () => {
        const val = Number(budgetInput.replace(/[^0-9.-]+/g, '')) || 0
        if (val > 0) {
            try {
                localStorage.setItem('totalBudget', String(val))
            } catch (e) { }
            setBudget(val)
            setOpen(false)
        }
    }

    return (
        <div className="space-y-6 pb-20 md:pb-0 max-w-4xl mx-auto">
            <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
                <DialogContent showCloseButton={false}>
                    <DialogHeader>
                        <DialogTitle>Atur Uang Saku Pertama</DialogTitle>
                        <DialogDescription>Masukkan jumlah uang saku mingguan untuk memulai simulasi.</DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                        <Input
                            type="number"
                            placeholder="Masukkan jumlah (contoh: 50000)"
                            value={budgetInput}
                            onChange={(e) => setBudgetInput(e.target.value)}
                        />
                    </div>
                    <DialogFooter>
                        <div className="flex w-full gap-2">
                            <button
                                className="flex-1 bg-muted text-foreground rounded-md py-2"
                                onClick={() => {
                                    // If user cancels and no budget yet, keep dialog open
                                    if (budget === 0) return
                                    setOpen(false)
                                }}
                            >Batal</button>
                            <button
                                className="flex-1 bg-primary text-primary-foreground rounded-md py-2"
                                onClick={saveInitialBudget}
                            >Simpan</button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <div>
                <h1 className="text-2xl md:text-3xl font-black text-foreground">
                    Simulasi <span className="text-primary">Anggaran</span>
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Kelola uang saku virtual {fmt(budget)}/minggu. Atur alokasi terbaik dan lihat skormu!
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
                                <div className="flex items-center gap-3">
                                    <p className="text-2xl font-black text-primary">{fmt(budget)}</p>
                                    <button
                                        type="button"
                                        className="text-sm text-primary underline"
                                        onClick={() => {
                                            setBudgetInput(String(budget || ''))
                                            setOpen(true)
                                        }}
                                    >
                                        Ubah
                                    </button>
                                </div>
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
                        if (remaining !== 0 || isSaving) return
                        setIsSaving(true)

                        try {
                            const res = await fetch('/api/budgets', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ alloc, totalBudget: budget })
                            })
                            if (!res.ok) {
                                console.error('save failed', await res.text())
                                return
                            }

                            toast({
                                title: 'Anggaran tersimpan',
                                description: 'Alokasi anggaran berhasil disimpan.',
                            })
                        } catch (err) {
                            console.error(err)
                            toast({
                                title: 'Gagal menyimpan',
                                description: 'Terjadi kesalahan, silakan coba lagi.',
                            })
                        } finally {
                            setIsSaving(false)
                        }
                    }}>
                        <h2 className="font-black text-foreground text-lg">Atur Alokasi</h2>
                        {categories.map((c) => {
                            const Icon = iconMap[c.icon]
                            return (
                                <Card key={c.key} className="bg-card border-border mt-2 mb-2">
                                    <CardContent className="p-5">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <Icon className={cn("w-5 h-5", c.color)} />
                                                <span className="font-bold text-foreground">{c.label}</span>
                                            </div>
                                            <div className="text-right">
                                                <span className={cn("text-lg font-black", c.color)}>{alloc[c.key]}%</span>
                                                <p className="text-xs text-muted-foreground">{fmt((alloc[c.key] / 100) * budget)}</p>
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
                            disabled={remaining !== 0 || isSaving}
                        >
                            {isSaving ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Spinner className="w-4 h-4" />
                                    Menyimpan...
                                </span>
                            ) : remaining > 0 ? (
                                `Sisa ${remaining}% belum dialokasikan`
                            ) : remaining < 0 ? (
                                `Anggaran berlebih ${Math.abs(remaining)}%`
                            ) : (
                                "Evaluasi Anggaranku"
                            )}
                            {!isSaving && <ArrowRight className="w-5 h-5 ml-2" />}
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
