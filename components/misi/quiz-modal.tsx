"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, Zap, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

const quizQuestions = [
  {
    q: "Menurut data tahun 2023 OECD, posisi Indonesia dalam tingkat literasi keuangan di kawasan ASEAN adalah ...",
    options: ["Peringkat ke-3", "Peringkat ke-4", "Peringkat ke-6", "Peringkat ke-8"],
    answer: 2,
    explanation: "Berdasarkan data OECD, Indonesia berada di peringkat ke-6 dalam tingkat literasi keuangan di kawasan ASEAN, dengan skor 57 yang masih di bawah rata-rata dunia (60).",
    xp: 10,
  },
  {
    q: "Berdasarkan SNLIK OJK, tingkat literasi keuangan nasional Indonesia pada tahun 2025 adalah ...",
    options: ["51,68%", "65,43%", "66,46%", "66,54%"],
    answer: 2,
    explanation: "OJK dan BPS mengumumkan hasil SNLIK 2025 yang menunjukkan indeks literasi keuangan mencapai 66,46% dan indeks inklusi keuangan 80,51%.",
    xp: 10,
  },
  {
    q: "Tingkat literasi keuangan kelompok usia 15-17 tahun pada tahun 2025 tercatat sebesar ...",
    options: ["51,68%", "51,70%", "65,43%", "66,46%"],
    answer: 0,
    explanation: "Berdasarkan hasil SNLIK 2025, kelompok umur 15-17 tahun dan 51-79 tahun memiliki indeks literasi keuangan terendah, yakni masing-masing sebesar 51,68% dan 54,55%.",
    xp: 10,
  },
  {
    q: "Salah satu kelemahan utama sistem barter adalah ...",
    options: ["Nilai barang selalu stabil dan mudah ditentukan", "Pertukaran barang dapat dilakukan tanpa kesepakatan kedua pihak", "Sulit menemukan pihak yang memiliki barang yang diinginkan dan sekaligus menginginkan barang yang kita miliki", "Semua barang dapat dibagi menjadi satuan yang sama"],
    answer: 2,
    explanation: "Kelemahan utama sistem barter ini dikenal dengan istilah 'double coincidence of wants' (kebutuhan yang harus saling bertepatan). Artinya, agar pertukaran bisa terjadi, kedua pihak harus secara bersamaan memiliki barang yang diinginkan pihak lain sekaligus menginginkan barang yang dimiliki pihak lain. Inilah alasan utama mengapa sistem barter digantikan oleh uang sebagai alat tukar yang lebih efisien.",
    xp: 10,
  },
  {
    q: "Manakah pasangan yang menunjukkan perbedaan yang tepat antara uang digital dan uang elektronik (e-money)?",
    options: ["Uang digital: Mobile Banking dan Internet Banking; Uang elektronik: LinkAja dan GoPay", "Uang digital: Flazz dan Brizzi; Uang elektronik: Mobile Banking dan Internet Banking", "Uang digital: Rupiah kertas dan logam; Uang elektronik: Mobile Banking dan Internet Banking", "Uang digital: Cek dan giro; Uang elektronik: uang kertas dan logam"],
    answer: 0,
    explanation: "Uang digital merujuk pada sistem yang mengakses dan memindahkan dana dari rekening bank secara digital, seperti Mobile Banking dan Internet Banking. Sementara uang elektronik (e-money) adalah nilai uang yang disimpan secara elektronik dalam suatu media (server atau chip).",
    xp: 10,
  },
  {
    q: "Seorang siswa membeli buku tulis di koperasi sekolah dan membayarnya dengan uang tunai Rp25.000. Fungsi uang yang ditunjukkan adalah ...",
    options: ["Alat penyimpan nilai", "Alat pembayaran", "Standar pembayaran yang ditunda", "Alat pemindah kekayaan"],
    answer: 1,
    explanation: "Ketika siswa membayar buku tulis dengan uang tunai, uang berfungsi sebagai alat pembayaran, yaitu digunakan untuk menyelesaikan transaksi jual beli secara langsung.",
    xp: 10,
  },
  {
    q: "Rini memiliki uang Rp20.000. Harga bakso naik dari Rp10.000 menjadi Rp15.000 sehingga uangnya tidak cukup untuk membeli bakso dan membayar transportasi. Dampak inflasi tersebut adalah ...",
    options: ["Daya beli meningkat", "Daya beli tetap", "Daya beli menurun", "Daya beli tidak dipengaruhi perubahan harga"],
    answer: 2,
    explanation: "Inflasi menyebabkan harga barang naik, sehingga dengan jumlah uang yang sama, seseorang tidak dapat membeli barang sebanyak sebelumnya. Artinya, daya beli uang menurun.",
    xp: 10,
  },
  {
    q: "Dahlia memiliki uang saku mingguan Rp90.000. Ia ingin membeli makanan dan minuman kekinian Rp35.000, tetapi juga membutuhkan buku tulis Rp25.000 dan biaya fotokopi Rp20.000. Tindakan yang paling tepat adalah ...",
    options: ["Membeli makanan dan minuman kekinian terlebih dahulu", "Membeli buku tulis terlebih dahulu karena merupakan kebutuhan", "Menghabiskan uang untuk membeli makanan dan minuman lalu menunda membeli buku", "Meminjam uang kepada teman"],
    answer: 1,
    explanation: "Dalam pengelolaan keuangan, kebutuhan (needs) harus didahulukan daripada keinginan (wants). Buku tulis dan fotokopi adalah kebutuhan sekolah, sedangkan makanan kekinian adalah keinginan.",
    xp: 20,
  },
  {
    q: "Andi menerima uang saku Rp500.000 per bulan dan ingin membeli tas sekolah Rp300.000 dalam 3 bulan. Tindakan yang paling tepat adalah ...",
    options: ["Menghabiskan uang saku untuk jajan dan hiburan", "Menabung secara teratur dan mengurangi pengeluaran yang tidak penting", "Meminjam uang kepada teman", "Berhenti membeli perlengkapan sekolah yang dibutuhkan"],
    answer: 1,
    explanation: "Untuk mencapai tujuan keuangan, diperlukan perencanaan dan disiplin menabung. Dengan menyisihkan sekitar Rp100.000/bulan, tas senilai Rp300.000 dapat terbeli dalam 3 bulan.",
    xp: 20,
  },
  {
    q: "Joko menerima uang saku Rp500.000 per bulan. Setelah kebutuhan dan tabungan terpenuhi, ia masih memiliki sisa uang. Tindakan yang paling tepat adalah ...",
    options: ["Menghabiskan seluruh sisa uang untuk game online", "Menyimpan seluruh uang tanpa mempertimbangkan orang lain", "Menyisihkan sebagian uang untuk berbagi atau kegiatan sosial sesuai kemampuan", "Memberikan seluruh uang kepada orang lain"],
    answer: 2,
    explanation: "Pengelolaan keuangan yang baik tidak hanya mencakup kebutuhan pribadi, tetapi juga kepedulian sosial. Menyisihkan sebagian untuk berbagi mencerminkan perilaku keuangan yang bijak dan bertanggung jawab.",
    xp: 20,
  },
]

interface QuizModalProps {
  mission: { title: string; xp: number; }
  onClose: () => void
}

type Phase = "quiz" | "result"

export function QuizModal({ mission, onClose }: QuizModalProps) {
  const [phase, setPhase] = useState<Phase>("quiz")
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([])

  const q = quizQuestions[current]
  const total = quizQuestions.length
  const progress = ((current + (answered ? 1 : 0)) / total) * 100

  const handleSelect = (idx: number) => {
    if (answered) return
    setSelected(idx)
    setAnswered(true)
    if (idx === q.answer) {
      setScore((s) => s + 1)
      setCorrectAnswers((prev) => [...prev, current])
    }
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

  const calculateBonusXp = () => {
    let bonus = 0
    // Bonus +30 XP hanya jika semua soal 1-7 (index 0-6) dijawab benar
    const allCorrect1To7 = [0, 1, 2, 3, 4, 5, 6].every((idx) => correctAnswers.includes(idx))
    if (allCorrect1To7) bonus += 30
    
    // Bonus +40 XP hanya jika semua soal 8-10 (index 7-9) dijawab benar
    const allCorrect8To10 = [7, 8, 9].every((idx) => correctAnswers.includes(idx))
    if (allCorrect8To10) bonus += 40
    
    return bonus
  }

  // Base XP adalah jumlah `xp` untuk setiap soal yang dijawab benar
  const baseXp = correctAnswers.reduce((sum, idx) => sum + (quizQuestions[idx]?.xp ?? 0), 0)
  const bonusXp = calculateBonusXp()
  const totalEarnedXp = baseXp + bonusXp
  const [isSaving, setIsSaving] = useState(false)

  const handleCloseWithSave = async () => {
    if (phase === "result" && totalEarnedXp > 0) {
      setIsSaving(true)
      try {
        const res = await fetch("/api/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ xp: totalEarnedXp }),
        })
        if (!res.ok) {
          console.error("Failed to save XP:", await res.text())
        }
      } catch (err) {
        console.error("Error saving XP:", err)
      } finally {
        setIsSaving(false)
        onClose()
      }
    } else {
      onClose()
    }
  }

  return (
    <Dialog open onOpenChange={handleCloseWithSave}>
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
                <div className="text-xs text-muted-foreground mb-2">XP Dasar</div>
                <div className="flex items-center gap-1 justify-center text-primary font-black text-lg">
                  <Zap className="w-4 h-4" />
                  +{baseXp}
                </div>
              </div>
              {bonusXp > 0 && (
                <>
                  <div className="w-px bg-border" />
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground mb-2">Bonus</div>
                    <div className="flex items-center gap-1 justify-center text-accent font-black text-lg">
                      <Zap className="w-4 h-4" />
                      +{bonusXp}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-center">
              <p className="text-primary font-bold text-sm">Total XP: +{totalEarnedXp}</p>
            </div>
            <Button
              onClick={handleCloseWithSave}
              disabled={isSaving}
              className="w-full bg-primary text-primary-foreground font-bold rounded-xl"
            >
              {isSaving ? "Menyimpan XP..." : "Kembali ke Misi"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
