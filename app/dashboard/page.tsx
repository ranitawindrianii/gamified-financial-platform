import { StatCard } from "@/components/dashboard/stat-card"
import { DailyMissions } from "@/components/dashboard/daily-missions"
import { BudgetSnapshot } from "@/components/dashboard/budget-snapshot"
import { BadgeShowcase } from "@/components/dashboard/badge-showcase"
import { WeeklyProgress } from "@/components/dashboard/weekly-progress"
import { Coins, Zap, Trophy, Flame } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6 pb-20 md:pb-0">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-muted-foreground text-sm font-semibold">Senin, 2 Juni 2026</p>
          <h1 className="text-2xl md:text-3xl font-black text-foreground mt-1">
            Halo, <span className="text-primary">Arya</span>! 👋
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Kamu punya <span className="text-primary font-bold">3 misi</span> yang menunggu diselesaikan.
          </p>
        </div>
        {/* Streak badge */}
        <div className="flex items-center gap-2 bg-card border border-border rounded-2xl px-4 py-3">
          <Flame className="w-5 h-5 text-orange-400" />
          <div>
            <p className="text-xs text-muted-foreground font-semibold">Streak</p>
            <p className="text-lg font-black text-foreground">7 hari</p>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Coins}
          label="Koin Terkumpul"
          value="4.850"
          sub="+120 hari ini"
          accent="primary"
        />
        <StatCard
          icon={Zap}
          label="Total XP"
          value="1.240"
          sub="82% ke Level 8"
          accent="accent"
        />
        <StatCard
          icon={Trophy}
          label="Peringkat Kelas"
          value="#3"
          sub="dari 32 siswa"
          accent="primary"
        />
        <StatCard
          icon={Flame}
          label="Misi Selesai"
          value="47"
          sub="minggu ini: 5"
          accent="accent"
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <DailyMissions />
          <WeeklyProgress />
        </div>
        <div className="space-y-6">
          <BudgetSnapshot />
          <BadgeShowcase />
        </div>
      </div>
    </div>
  )
}
