import { StatCard } from "@/components/dashboard/stat-card"
import { DailyMissions } from "@/components/dashboard/daily-missions"
import { BudgetSnapshot } from "@/components/dashboard/budget-snapshot"
import { BadgeShowcase } from "@/components/dashboard/badge-showcase"
import { Coins, Zap, Trophy, Flame } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const formattedDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  const welcomeMessage = user?.user_metadata?.profile?.firstname
    ? `Selamat datang kembali, ${user.user_metadata.profile.firstname}!`
    : `Selamat datang di dashboard Anda!`

  const xp = user?.user_metadata?.profile?.experience ?? 0
  const level = Math.floor(xp / 100) + 1
  const missionsCompleted = 47 // Placeholder for missions completed

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-muted-foreground text-sm font-semibold">{formattedDate}</p>
          <h1 className="text-2xl md:text-3xl font-black text-foreground mt-1">
            Halo, <span className="text-primary">{user?.user_metadata.profile.firstname}</span>! 👋
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            { welcomeMessage }
          </p>
        </div>
        {/* Streak badge */}
        {/* <div className="flex items-center gap-2 bg-card border border-border rounded-2xl px-4 py-3">
          <Flame className="w-5 h-5 text-orange-400" />
          <div>
            <p className="text-xs text-muted-foreground font-semibold">Streak</p>
            <p className="text-lg font-black text-foreground">Financial Planning</p>
          </div>
        </div> */}
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
        <StatCard
          icon={Zap}
          label="Total XP"
          value={xp.toLocaleString("id-ID")}
          sub={`Level ${level}`}
          accent="primary"
        />
        <StatCard
          icon={Flame}
          label="Misi Selesai"
          value={missionsCompleted.toString()}
          sub="Misi & Kuis"
          accent="accent"
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 space-y-6">
          <DailyMissions />
          <BadgeShowcase />
        </div>
        <div className="space-y-6">
          <BudgetSnapshot />
        </div>
      </div>
    </div>
  )
}
