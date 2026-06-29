"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle, Sword, ChevronRight } from "lucide-react"
import Link from "next/link"

const missions = [
  {
    id: 1,
    title: "Financial Heroes: Dasar-dasar Keuangan",
    desc: "Mengenal konsep uang, literasi keuangan, inflasi, dan sistem keuangan serta mengambil keputusan keuangan sederhana",
    category: "Kuis",
    xp: 200,
    done: true,
    questions: 10,
    time: "15 menit",
  },
]

const categoryColor: Record<string, string> = {
  Anggaran: "bg-primary/10 text-primary border-primary/20",
  Kuis: "bg-accent/10 text-accent border-accent/20",
  Simulasi: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Materi: "bg-orange-500/10 text-orange-400 border-orange-500/20",
}

export function DailyMissions() {
  const done = missions.filter((m) => m.done).length
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <Sword className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-foreground text-base font-black">Misi Hari Ini</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              {done}/{missions.length} selesai
            </p>
          </div>
        </div>
        <Link href="/misi">
          <Button variant="ghost" size="sm" className="text-primary hover:text-accent hover:bg-transparent font-bold text-xs cursor-pointer">
            Lihat Semua
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        {/* Progress bar */}
        <div className="h-2 bg-muted rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${(done / missions.length) * 100}%` }}
          />
        </div>

        {missions.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-3 p-4 rounded-xl border transition-all ${m.done ? "bg-muted/30 border-border opacity-70" : "bg-secondary border-border hover:border-primary/30"
              }`}
          >
            {m.done ? (
              <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            ) : (
              <Circle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <p className={`text-sm font-bold ${m.done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                  {m.title}
                </p>
                <Badge className={`text-[10px] px-2 py-0 border ${categoryColor[m.category]}`} variant="outline">
                  {m.category}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs font-bold text-primary">+{m.xp} XP</span>
              </div>
            </div>
            {!m.done && (
              <Link href="/misi">
                <Button size="sm" className="bg-primary text-primary-foreground font-bold text-xs rounded-lg shrink-0">
                  Mulai
                </Button>
              </Link>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
