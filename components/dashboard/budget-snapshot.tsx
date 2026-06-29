import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

export async function BudgetSnapshot() {
  const supabase = await createClient()

  let totalBudget = 0
  const { data: userData } = await supabase.auth.getUser()
  const userId = userData?.user?.id

  let initialAlloc: Record<string, number> = {
    makan: 0,
    sekolah: 0,
    hiburan: 0,
    tabungan: 0,
    berbagi: 0,
  }

  if (userId) {
    const { data: profileData } = await supabase
      .from("profiles")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle()

    const profile_id = profileData?.id

    if (profile_id) {
      const { data: budgetData } = await supabase
        .from("budgets")
        .select("food_budget, school_budget, entertainment_budget, savings_budget, charity_budget, weekly_budget")
        .eq("profile_id", profile_id)
        .maybeSingle()

      if (budgetData) {
        initialAlloc = {
          makan: budgetData.food_budget ?? 0,
          sekolah: budgetData.school_budget ?? 0,
          hiburan: budgetData.entertainment_budget ?? 0,
          tabungan: budgetData.savings_budget ?? 0,
          berbagi: budgetData.charity_budget ?? 0,
        }
        totalBudget = budgetData.weekly_budget ?? 0
      }
    }
  }

  const budgetItems = [
    { label: "Saldo Minggu Ini", value: { totalBudget }.totalBudget.toLocaleString("id-ID", { style: "currency", currency: "IDR" }) },
  ]

  const spending = [
    { label: "Makan & Jajan", pct: initialAlloc.makan || 0, color: "bg-primary" },
    { label: "Kebutuhan Sekolah", pct: initialAlloc.sekolah || 0, color: "bg-blue-400" },
    { label: "Hiburan", pct: initialAlloc.hiburan || 0, color: "bg-red-400" },
    { label: "Tabungan", pct: initialAlloc.tabungan || 0, color: "bg-green-400" },
    { label: "Berbagi", pct: initialAlloc.berbagi || 0, color: "bg-accent" },
  ]

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
            <p className="text-sm text-muted-foreground font-semibold">{item.label}</p>
            <div className="text-right">
              <p className="text-sm font-black text-foreground">{item.value}</p>
            </div>
          </div>
        ))}

        <div className="pt-2">
          <p className="text-xs text-muted-foreground font-semibold mb-3">Distribusi Anggaran</p>
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
