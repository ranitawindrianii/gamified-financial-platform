import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Zap,
  Shield,
  CheckCircle2,
} from "lucide-react"
import { createClient } from "@/lib/supabase/server"

const stats = [
  { label: "Total XP", value: "1.240", icon: Zap, color: "text-accent" },
  { label: "Kuis Selesai", value: "0", icon: CheckCircle2, color: "text-accent" },
  { label: "Lencana", value: "4/8", icon: Shield, color: "text-primary" },
]

export default async function ProfilPage() {
  const supabase = await createClient()

  const { data: userData } = await supabase.auth.getUser()
  const userId = userData?.user?.id

  let profile: { id?: string; fullname?: string; experience?: number; nis?: string } | null = null

  if (userId) {
    const { data } = await supabase
      .from("profiles")
      .select("id, fullname, experience, nis")
      .eq("user_id", userId)
      .maybeSingle()

    profile = data ?? null
  }

  // Load badges and which ones the profile has earned
  const { data: allBadges } = await supabase.from('badges').select('id, emoji, name, description, rules').order('order', { ascending: true })
  let profileBadgeRows: any[] = []
  if (profile?.id) {
    const { data: pb } = await supabase.from('profile_badge').select('badge_id').eq('profile_id', profile.id)
    profileBadgeRows = pb ?? []
  }

  const badges = (allBadges ?? []).map((b: any) => ({
    emoji: b.emoji ?? '🏅',
    name: b.name ?? 'Badge',
    desc: b.description ?? '',
    rules: b.rules ?? '',
    id: b.id,
    earned: profileBadgeRows.some((r) => r.badge_id === b.id),
  }))

  const xp = profile?.experience ?? 0
  const earnedBadgeCount = badges.filter((b) => b.earned).length
  const statsWithBadges = stats.map((s) => {
    if (s.label === "Lencana") {
      return { ...s, value: `${earnedBadgeCount}/${badges.length}` }
    }
    if (s.label === "Total XP") {
      return { ...s, value: xp.toLocaleString("id-ID") }
    }
    return s
  })

  const level = Math.floor(xp / 100) + 1
  const xpNext = level * 100
  const xpPct = Math.round((xp / xpNext) * 100)
  const fullname = profile?.fullname ?? "User"
  const nis = profile?.nis ?? "00000000"

  return (
    <div className="space-y-6 pb-20 md:pb-0 max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-black text-foreground">
        Profil <span className="text-primary">Saya</span>
      </h1>

      {/* Profile hero */}
      <Card className="bg-card border-border overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 rounded-full bg-primary/20 border-4 border-primary/50 flex items-center justify-center text-4xl font-black text-primary glow-gold">
                {fullname.charAt(0).toUpperCase()}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground text-xs font-black rounded-full w-8 h-8 flex items-center justify-center border-2 border-background">
                {level}
              </div>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-black text-foreground">{fullname}</h2>
              <p className="text-muted-foreground text-sm">NIS: {nis}</p>

              {/* XP bar */}
              <div className="mt-4 max-w-sm mx-auto sm:mx-0">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground font-semibold flex items-center gap-1">
                    <Zap className="w-3 h-3 text-accent" />
                    Level {level}
                  </span>
                  <span className="text-accent font-bold">{xp.toLocaleString("id-ID")} / {xpNext.toLocaleString("id-ID")} XP</span>
                </div>
                <Progress value={xpPct} className="h-3 bg-muted [&>div]:bg-accent rounded-full" />
                <p className="text-xs text-muted-foreground mt-1">
                  {xpNext - xp} XP lagi untuk Level {level + 1}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats grid */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {statsWithBadges.map((s) => (
          <Card key={s.label} className="bg-card border-border">
            <CardContent className="p-3 text-center">
              <s.icon className={`w-5 h-5 mx-auto mb-1.5 ${s.color}`} />
              <p className="font-black text-foreground text-lg leading-none">{s.value}</p>
              <p className="text-[10px] text-muted-foreground mt-1 font-semibold">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Badges */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-foreground text-base font-black">Koleksi Lencana</CardTitle>
                <p className="text-xs text-muted-foreground">
                  {badges.filter((b) => b.earned).length} dari {badges.length} diraih
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-4 gap-3">
              {badges.map((b) => (
                <div
                  key={b.name}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border text-center transition-all ${b.earned
                    ? "bg-primary/5 border-primary/20"
                    : "bg-muted/10 border-border opacity-40 grayscale"
                    }`}
                  title={b.rules}
                >
                  <span className="text-2xl">{b.emoji}</span>
                  <p className="text-sm font-bold text-foreground leading-tight">{b.name}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-3 text-center">
              Hover lencana untuk melihat cara mendapatkannya
            </p>
          </CardContent>
        </Card>

        {/* Activity history */}
        {/* <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <CardTitle className="text-foreground text-base font-black">Riwayat Aktivitas</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {history.map((h, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-secondary border border-border">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <h.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-foreground leading-snug">{h.action}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{h.time}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-black text-accent">+{h.xp} XP</p>
                  <p className="text-[10px] font-bold text-yellow-400">+{h.coins}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card> */}
      </div>
    </div>
  )
}
