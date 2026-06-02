"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sword, Zap, Lock, CheckCircle2, Clock, Star, ChevronRight } from "lucide-react"
import { QuizModal } from "@/components/misi/quiz-modal"

const allMissions = [
  {
    id: 1,
    title: "Kebutuhan vs Keinginan",
    desc: "Bedakan antara kebutuhan dan keinginan dalam skenario kehidupan sehari-hari siswa SMP.",
    type: "Kuis",
    xp: 80,
    coins: 50,
    difficulty: "Mudah",
    status: "available",
    questions: 10,
    time: "10 menit",
  },
  {
    id: 2,
    title: "Buat Anggaran Bulanan",
    desc: "Rancang anggaran uang saku bulananmu dengan alokasi yang tepat untuk kebutuhan dan tabungan.",
    type: "Misi",
    xp: 120,
    coins: 80,
    difficulty: "Sedang",
    status: "available",
    questions: null,
    time: "15 menit",
  },
  {
    id: 3,
    title: "Jebakan Diskon",
    desc: "Hadapi skenario promosi dan diskon. Bisakah kamu membuat keputusan belanja yang bijak?",
    type: "Kuis",
    xp: 100,
    coins: 65,
    difficulty: "Sedang",
    status: "done",
    questions: 8,
    time: "8 menit",
  },
  {
    id: 4,
    title: "Tabungan Impian",
    desc: "Hitung berapa lama kamu perlu menabung untuk membeli barang impian dengan uang sakumu.",
    type: "Misi",
    xp: 150,
    coins: 100,
    difficulty: "Sedang",
    status: "available",
    questions: null,
    time: "20 menit",
  },
  {
    id: 5,
    title: "Investasi Sederhana",
    desc: "Pelajari konsep investasi dasar dan simulasikan keuntungan dari tabungan berbunga.",
    type: "Kuis",
    xp: 200,
    coins: 130,
    difficulty: "Sulit",
    status: "locked",
    questions: 12,
    time: "15 menit",
  },
  {
    id: 6,
    title: "Krisis Keuangan!",
    desc: "Uang sakumu hilang! Buat rencana darurat dan prioritaskan pengeluaran paling penting.",
    type: "Misi",
    xp: 250,
    coins: 150,
    difficulty: "Sulit",
    status: "locked",
    questions: null,
    time: "25 menit",
  },
]

const difficultyColor: Record<string, string> = {
  Mudah: "bg-accent/10 text-accent border-accent/20",
  Sedang: "bg-primary/10 text-primary border-primary/20",
  Sulit: "bg-red-500/10 text-red-400 border-red-500/20",
}

const typeColor: Record<string, string> = {
  Kuis: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Misi: "bg-orange-500/10 text-orange-400 border-orange-500/20",
}

export default function MisiPage() {
  const [activeQuiz, setActiveQuiz] = useState<(typeof allMissions)[0] | null>(null)

  const available = allMissions.filter((m) => m.status === "available")
  const done = allMissions.filter((m) => m.status === "done")
  const locked = allMissions.filter((m) => m.status === "locked")

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-foreground">
          Misi & <span className="text-primary">Kuis</span>
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Selesaikan misi dan kuis untuk mendapatkan XP, koin, dan lencana.
        </p>
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Tersedia", count: available.length, color: "text-primary" },
          { label: "Selesai", count: done.length, color: "text-accent" },
          { label: "Terkunci", count: locked.length, color: "text-muted-foreground" },
        ].map((s) => (
          <Card key={s.label} className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <p className={`text-2xl font-black ${s.color}`}>{s.count}</p>
              <p className="text-xs text-muted-foreground font-semibold mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="semua">
        <TabsList className="bg-secondary border border-border">
          <TabsTrigger value="semua" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold">
            Semua
          </TabsTrigger>
          <TabsTrigger value="misi" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold">
            Misi
          </TabsTrigger>
          <TabsTrigger value="kuis" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold">
            Kuis
          </TabsTrigger>
          <TabsTrigger value="selesai" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold">
            Selesai
          </TabsTrigger>
        </TabsList>

        {[
          { value: "semua", list: allMissions },
          { value: "misi", list: allMissions.filter((m) => m.type === "Misi") },
          { value: "kuis", list: allMissions.filter((m) => m.type === "Kuis") },
          { value: "selesai", list: done },
        ].map(({ value, list }) => (
          <TabsContent key={value} value={value} className="mt-4 space-y-4">
            {list.map((m) => (
              <Card
                key={m.id}
                className={`bg-card border-border transition-all ${
                  m.status === "locked" ? "opacity-60" : "card-hover"
                }`}
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                        m.status === "done"
                          ? "bg-accent/10"
                          : m.status === "locked"
                          ? "bg-muted/30"
                          : "bg-primary/10"
                      }`}
                    >
                      {m.status === "done" ? (
                        <CheckCircle2 className="w-6 h-6 text-accent" />
                      ) : m.status === "locked" ? (
                        <Lock className="w-6 h-6 text-muted-foreground" />
                      ) : (
                        <Sword className="w-6 h-6 text-primary" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-black text-foreground">{m.title}</h3>
                        <Badge className={`text-[10px] border ${typeColor[m.type]}`} variant="outline">
                          {m.type}
                        </Badge>
                        <Badge className={`text-[10px] border ${difficultyColor[m.difficulty]}`} variant="outline">
                          {m.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{m.desc}</p>

                      <div className="flex flex-wrap items-center gap-4 text-xs">
                        <span className="flex items-center gap-1 text-primary font-bold">
                          <Zap className="w-3.5 h-3.5" /> +{m.xp} XP
                        </span>
                        <span className="font-bold text-yellow-400">+{m.coins} Koin</span>
                        {m.questions && (
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Star className="w-3.5 h-3.5" /> {m.questions} soal
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-3.5 h-3.5" /> {m.time}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {m.status === "done" ? (
                        <Badge className="bg-accent/10 text-accent border-accent/20 font-bold" variant="outline">
                          Selesai
                        </Badge>
                      ) : m.status === "locked" ? (
                        <Badge className="bg-muted/30 text-muted-foreground border-border" variant="outline">
                          Terkunci
                        </Badge>
                      ) : (
                        <Button
                          size="sm"
                          className="bg-primary text-primary-foreground font-bold rounded-xl"
                          onClick={() => m.type === "Kuis" ? setActiveQuiz(m) : undefined}
                        >
                          {m.type === "Kuis" ? "Mulai Kuis" : "Kerjakan"}
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>

      {activeQuiz && (
        <QuizModal mission={activeQuiz} onClose={() => setActiveQuiz(null)} />
      )}
    </div>
  )
}
