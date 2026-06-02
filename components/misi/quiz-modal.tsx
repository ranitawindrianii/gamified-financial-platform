"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, Zap, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

const quizQuestions = [
  {
    q: "Mana yang termasuk KEBUTUHAN bagi siswa SMP?",
    options: ["Sepatu baru yang lagi tren", "Buku tulis dan alat belajar", "Minuman boba kekinian", "Game online terbaru"],
    answer: 1,
    explanation: "Buku tulis dan alat belajar adalah kebutuhan karena diperlukan untuk aktivitas belajar sehari-hari.",
  },
  {
    q: "Kamu punya uang saku Rp 50.000. Cara terbaik mengelolanya adalah...",
    options: [
      "Habiskan semua untuk jajan",
      "Simpan semua, tidak belanja apapun",
      "Bagi: 60% kebutuhan, 30% tabungan, 10% lain-lain",
      "Pinjamkan ke teman",
    ],
    answer: 2,
    explanation: "Membagi uang saku sesuai proporsi kebutuhan, tabungan, dan fleksibel adalah cara pengelolaan keuangan yang bijak.",
  },
  {
    q: "Ada diskon 50% untuk sepatu seharga Rp 200.000 (jadi Rp 100.000). Kamu tidak butuh sepatu baru. Apa yang kamu lakukan?",
    options: [
      "Langsung beli karena murah",
      "Tidak beli karena tidak butuh",
      "Beli 2 sekalian karena hemat",
      "Pinjam uang untuk beli",
    ],
    answer: 1,
    explanation: "Diskon bukan alasan untuk membeli barang yang tidak dibutuhkan. Uang yang tidak dibelanjakan bisa ditabung.",
  },
]

interface QuizModalProps {
  mission: { title: string; xp: number; coins: number }
  onClose: () => void
}

type Phase = "quiz" | "result"

export function QuizModal({ mission, onClose }: QuizModalProps) {
  const [phase, setPhase] = useState<Phase>("quiz")
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)

  const q = quizQuestions[current]
  const total = quizQuestions.length
  const progress = ((current + (answered ? 1 : 0)) / total) * 100

  const handleSelect = (idx: number) => {
    if (answered) return
    setSelected(idx)
    setAnswered(true)
    if (idx === q.answer) setScore((s) => s + 1)
  }

  const handleNext = () => {
    if (current + 1 >= total) {
      setPhase("result")
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
      setAnswered(false)
    }
  }

  const earnedXp = Math.round((score / total) * mission.xp)
  const earnedCoins = Math.round((score / total) * mission.coins)

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="bg-card border-border text-foreground max-w-lg w-full">
        {phase === "quiz" ? (
          <>
            <DialogHeader>
              <div className="flex items-center justify-between mb-2">
                <DialogTitle className="text-base font-black text-foreground">{mission.title}</DialogTitle>
                <span className="text-xs text-muted-foreground font-bold">
                  {current + 1} / {total}
                </span>
              </div>
              <Progress value={progress} className="h-2 bg-muted [&>div]:bg-primary" />
            </DialogHeader>

            <div className="mt-4 space-y-4">
              <p className="text-base font-bold text-foreground leading-relaxed">{q.q}</p>

              <div className="space-y-3">
                {q.options.map((opt, idx) => {
                  const isCorrect = idx === q.answer
                  const isSelected = idx === selected
                  let style = "bg-secondary border-border text-foreground hover:border-primary/50"
                  if (answered) {
                    if (isCorrect) style = "bg-accent/10 border-accent text-foreground"
                    else if (isSelected && !isCorrect) style = "bg-destructive/10 border-destructive text-foreground"
                    else style = "bg-secondary border-border text-muted-foreground opacity-60"
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all flex items-center gap-3",
                        style,
                        !answered && "cursor-pointer hover:bg-muted/50"
                      )}
                    >
                      <span className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-black shrink-0",
                        answered && isCorrect ? "border-accent text-accent" :
                        answered && isSelected && !isCorrect ? "border-destructive text-destructive" :
                        "border-border text-muted-foreground"
                      )}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      {opt}
                      {answered && isCorrect && <CheckCircle2 className="w-4 h-4 text-accent ml-auto shrink-0" />}
                      {answered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-destructive ml-auto shrink-0" />}
                    </button>
                  )
                })}
              </div>

              {answered && (
                <div className={cn(
                  "p-3 rounded-xl text-sm leading-relaxed border",
                  selected === q.answer
                    ? "bg-accent/10 border-accent/30 text-foreground"
                    : "bg-destructive/10 border-destructive/30 text-foreground"
                )}>
                  <p className="font-bold mb-1">
                    {selected === q.answer ? "Benar!" : "Belum tepat."}
                  </p>
                  <p className="text-muted-foreground text-xs">{q.explanation}</p>
                </div>
              )}

              {answered && (
                <Button
                  onClick={handleNext}
                  className="w-full bg-primary text-primary-foreground font-bold rounded-xl"
                >
                  {current + 1 >= total ? "Lihat Hasil" : "Soal Berikutnya"}
                </Button>
              )}
            </div>
          </>
        ) : (
          <div className="py-4 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mx-auto float-anim">
              <Trophy className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-foreground">
                {score === total ? "Sempurna!" : score >= total / 2 ? "Bagus!" : "Coba Lagi!"}
              </h2>
              <p className="text-muted-foreground text-sm mt-2">
                Kamu menjawab{" "}
                <span className="text-primary font-bold">
                  {score}/{total}
                </span>{" "}
                soal dengan benar.
              </p>
            </div>
            <div className="flex justify-center gap-6">
              <div className="text-center">
                <div className="flex items-center gap-1 justify-center text-primary font-black text-xl">
                  <Zap className="w-5 h-5" />
                  +{earnedXp}
                </div>
                <p className="text-xs text-muted-foreground mt-1">XP</p>
              </div>
              <div className="text-center">
                <p className="text-yellow-400 font-black text-xl">+{earnedCoins}</p>
                <p className="text-xs text-muted-foreground mt-1">Koin</p>
              </div>
            </div>
            <Button
              onClick={onClose}
              className="w-full bg-primary text-primary-foreground font-bold rounded-xl"
            >
              Kembali ke Misi
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
