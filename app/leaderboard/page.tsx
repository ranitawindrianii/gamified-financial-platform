import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, Crown, Zap, Flame, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

const students = [
  { rank: 1, name: "Siti Rahayu", class: "8A", xp: 3200, coins: 8500, streak: 14, badges: 8, avatar: "S" },
  { rank: 2, name: "Budi Santoso", class: "8B", xp: 2950, coins: 7800, streak: 10, badges: 7, avatar: "B" },
  { rank: 3, name: "Arya Pratama", class: "8A", xp: 2740, coins: 7200, streak: 7, badges: 6, avatar: "A", isMe: true },
  { rank: 4, name: "Dewi Kusuma", class: "8C", xp: 2600, coins: 6900, streak: 9, badges: 6, avatar: "D" },
  { rank: 5, name: "Fajar Nugroho", class: "8B", xp: 2450, coins: 6400, streak: 5, badges: 5, avatar: "F" },
  { rank: 6, name: "Rina Melati", class: "8A", xp: 2300, coins: 6100, streak: 12, badges: 5, avatar: "R" },
  { rank: 7, name: "Hendra Wijaya", class: "8C", xp: 2100, coins: 5700, streak: 3, badges: 4, avatar: "H" },
  { rank: 8, name: "Lina Kartika", class: "8B", xp: 1950, coins: 5200, streak: 6, badges: 4, avatar: "L" },
  { rank: 9, name: "Tono Prabowo", class: "8A", xp: 1800, coins: 4900, streak: 4, badges: 3, avatar: "T" },
  { rank: 10, name: "Maya Putri", class: "8C", xp: 1650, coins: 4500, streak: 2, badges: 3, avatar: "M" },
]

const topColors = ["text-yellow-400", "text-gray-300", "text-orange-400"]
const topIcons = [Crown, Medal, Medal]

export default function LeaderboardPage() {
  const top3 = students.slice(0, 3)
  const rest = students.slice(3)

  return (
    <div className="space-y-6 pb-20 md:pb-0 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-foreground">
          Papan <span className="text-primary">Peringkat</span>
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Bersaing dengan teman-temanmu. Raih posisi teratas!
        </p>
      </div>

      {/* My rank highlight */}
      <Card className="bg-primary/10 border-primary/30">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center text-xl font-black text-primary">
            A
          </div>
          <div className="flex-1">
            <p className="font-black text-foreground">Arya Pratama <span className="text-xs text-muted-foreground font-semibold ml-1">Kamu</span></p>
            <p className="text-xs text-muted-foreground">Kelas 8A &bull; Level 7</p>
          </div>
          <div className="flex items-center gap-4 text-right">
            <div>
              <p className="text-2xl font-black text-primary">#3</p>
              <p className="text-xs text-muted-foreground">Peringkat</p>
            </div>
            <div>
              <p className="text-lg font-black text-foreground">2.740</p>
              <p className="text-xs text-muted-foreground">XP</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="mingguan">
        <TabsList className="bg-secondary border border-border">
          <TabsTrigger value="mingguan" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold">
            Minggu Ini
          </TabsTrigger>
          <TabsTrigger value="bulanan" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold">
            Bulan Ini
          </TabsTrigger>
          <TabsTrigger value="semua" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold">
            Sepanjang Masa
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mingguan" className="mt-6 space-y-4">
          {/* Podium */}
          <Card className="bg-card border-border overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-black text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                <Trophy className="w-4 h-4 text-primary" />
                Top 3 Petualang
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-end justify-center gap-4 py-4">
                {/* 2nd */}
                <PodiumCard student={top3[1]} pos={2} />
                {/* 1st */}
                <PodiumCard student={top3[0]} pos={1} />
                {/* 3rd */}
                <PodiumCard student={top3[2]} pos={3} />
              </div>
            </CardContent>
          </Card>

          {/* Full table */}
          <div className="space-y-2">
            {students.map((s) => (
              <Card
                key={s.rank}
                className={cn(
                  "bg-card border-border transition-all",
                  s.isMe ? "border-primary/40 bg-primary/5" : "hover:border-border/80"
                )}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <span className={cn(
                    "w-8 text-center font-black text-base shrink-0",
                    s.rank === 1 ? "text-yellow-400" :
                    s.rank === 2 ? "text-gray-300" :
                    s.rank === 3 ? "text-orange-400" :
                    "text-muted-foreground"
                  )}>
                    {s.rank <= 3 ? (
                      (() => {
                        const Icon = topIcons[s.rank - 1]
                        return <Icon className={cn("w-5 h-5 mx-auto", topColors[s.rank - 1])} />
                      })()
                    ) : s.rank}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-secondary border border-border flex items-center justify-center font-black text-foreground shrink-0">
                    {s.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn("font-bold text-sm truncate", s.isMe ? "text-primary" : "text-foreground")}>
                      {s.name}
                      {s.isMe && <span className="text-xs font-semibold text-muted-foreground ml-2">Kamu</span>}
                    </p>
                    <p className="text-xs text-muted-foreground">Kelas {s.class}</p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="hidden sm:block text-center">
                      <p className="text-xs text-muted-foreground flex items-center gap-1 justify-center">
                        <Flame className="w-3 h-3 text-orange-400" />{s.streak}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-foreground text-sm">{s.xp.toLocaleString("id-ID")}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-0.5 justify-end">
                        <Zap className="w-3 h-3 text-accent" /> XP
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bulanan" className="mt-6">
          <div className="flex items-center justify-center h-40 text-muted-foreground text-sm font-semibold">
            Data bulanan akan tersedia akhir bulan ini.
          </div>
        </TabsContent>

        <TabsContent value="semua" className="mt-6">
          <div className="flex items-center justify-center h-40 text-muted-foreground text-sm font-semibold">
            Peringkat sepanjang masa sedang dihitung.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PodiumCard({
  student,
  pos,
}: {
  student: { name: string; avatar: string; xp: number; isMe?: boolean }
  pos: number
}) {
  const heights = { 1: "h-24", 2: "h-16", 3: "h-12" }
  const colors = { 1: "bg-yellow-400/10 border-yellow-400/30", 2: "bg-gray-400/10 border-gray-400/30", 3: "bg-orange-400/10 border-orange-400/30" }
  const textColors = { 1: "text-yellow-400", 2: "text-gray-300", 3: "text-orange-400" }
  const avatarColors = { 1: "border-yellow-400/50 bg-yellow-400/10", 2: "border-gray-400/50 bg-gray-400/10", 3: "border-orange-400/50 bg-orange-400/10" }
  const Icon = topIcons[pos - 1]
  return (
    <div className="flex flex-col items-center gap-2 flex-1">
      <div className={cn("w-12 h-12 rounded-full border-2 flex items-center justify-center font-black text-foreground", avatarColors[pos as 1|2|3])}>
        {student.avatar}
      </div>
      <p className={cn("text-xs font-bold text-center", student.isMe ? "text-primary" : "text-foreground")}>
        {student.name.split(" ")[0]}
      </p>
      <p className="text-xs text-muted-foreground">{student.xp.toLocaleString("id-ID")} XP</p>
      <div className={cn("w-full rounded-t-xl border flex items-start justify-center pt-2", heights[pos as 1|2|3], colors[pos as 1|2|3])}>
        <Icon className={cn("w-5 h-5", textColors[pos as 1|2|3])} />
      </div>
    </div>
  )
}
