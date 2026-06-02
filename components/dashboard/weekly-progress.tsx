import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"

const days = [
  { day: "Sen", xp: 120, missions: 2 },
  { day: "Sel", xp: 80, missions: 1 },
  { day: "Rab", xp: 200, missions: 3 },
  { day: "Kam", xp: 150, missions: 2 },
  { day: "Jum", xp: 90, missions: 1 },
  { day: "Sab", xp: 180, missions: 3 },
  { day: "Min", xp: 60, missions: 1 },
]

const maxXp = Math.max(...days.map((d) => d.xp))

export function WeeklyProgress() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-accent" />
          </div>
          <div>
            <CardTitle className="text-foreground text-base font-black">Progress Minggu Ini</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">Total 880 XP diperoleh</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-end gap-2 h-28">
          {days.map((d) => {
            const heightPct = (d.xp / maxXp) * 100
            const isToday = d.day === "Sen"
            return (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-muted-foreground">{d.xp}</span>
                <div className="w-full rounded-t-md relative" style={{ height: `${heightPct}%` }}>
                  <div
                    className={`absolute inset-0 rounded-t-md ${isToday ? "bg-primary" : "bg-accent/50"}`}
                  />
                </div>
                <span className={`text-[11px] font-bold ${isToday ? "text-primary" : "text-muted-foreground"}`}>
                  {d.day}
                </span>
              </div>
            )
          })}
        </div>
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-primary" />
            <span className="text-xs text-muted-foreground">Hari ini</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-accent/50" />
            <span className="text-xs text-muted-foreground">Hari lain</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
