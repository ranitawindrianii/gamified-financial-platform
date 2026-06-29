import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { Shield } from "lucide-react"


export async function BadgeShowcase() {

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

  const earnedBadgeCount = badges.filter((b) => b.earned).length

  // const badges = [
  //   { emoji: "💰", name: "Penabung Pertama", earned: true },
  //   { emoji: "🎯", name: "Tepat Anggaran", earned: true },
  //   { emoji: "⚡", name: "Kuis Kilat", earned: true },
  //   { emoji: "🏆", name: "Top 3 Kelas", earned: true },
  //   { emoji: "📚", name: "Rajin Belajar", earned: false },
  //   { emoji: "🚀", name: "Level 10", earned: false },
  // ]
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-foreground text-base font-black">Lencana Saya</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">{earnedBadgeCount} dari {badges.length} diraih</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-4 gap-3">
          {badges.map((b) => (
            <div
              key={b.name}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${b.earned
                  ? "bg-primary/5 border-primary/20"
                  : "bg-muted/20 border-border opacity-40 grayscale"
                }`}
            >
              <span className="text-2xl">{b.emoji}</span>
              <p className="text-[10px] font-bold text-center text-foreground leading-tight">{b.name}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
