import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

const budgetItems = [
  { label: "Saldo Minggu Ini", value: "Rp 75.000", change: "+5.000", positive: true },
  { label: "Pengeluaran", value: "Rp 45.000", change: "-10.000", positive: false },
  { label: "Tabungan", value: "Rp 30.000", change: "+15.000", positive: true },
]

const spending = [
  { label: "Makan & Jajan", pct: 60, color: "bg-primary" },
  { label: "Transportasi", pct: 20, color: "bg-accent" },
  { label: "Alat Tulis", pct: 10, color: "bg-blue-400" },
  { label: "Lain-lain", pct: 10, color: "bg-muted-foreground" },
]

export function BudgetSnapshot() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-accent" />
          </div>
          <CardTitle className="text-foreground text-base font-black">Anggaran Saya</CardTitle>
        </div>
        <Link href="/simulasi">
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary font-bold text-xs p-1">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        {budgetItems.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-semibold">{item.label}</p>
            <div className="text-right">
              <p className="text-sm font-black text-foreground">{item.value}</p>
              <p className={`text-xs font-bold flex items-center gap-0.5 justify-end ${item.positive ? "text-accent" : "text-destructive"}`}>
                {item.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {item.change}
              </p>
            </div>
          </div>
        ))}

        <div className="pt-2">
          <p className="text-xs text-muted-foreground font-semibold mb-3">Distribusi Pengeluaran</p>
          <div className="space-y-2">
            {spending.map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="font-bold text-foreground">{s.pct}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
