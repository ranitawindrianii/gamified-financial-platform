"use client"

import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Coins, ChevronRight } from 'lucide-react'
import { login } from './actions'
import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [serverError, setServerError] = useState("")
    const [showErrorModal, setShowErrorModal] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const result = await login(formData)

        if (result?.error) {
            setServerError(result.error)
            setShowErrorModal(true)
            return
        }

        router.push('/dashboard')
    }

    return (
        <main className="min-h-screen bg-background flex items-center justify-center p-4 relative">
            <div
                className="fixed inset-0 opacity-5 pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(oklch(0.78 0.17 80) 1px, transparent 1px), linear-gradient(90deg, oklch(0.78 0.17 80) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />
            <div className="relative z-10 w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 mb-4 float-anim">
                        <Coins className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-3xl font-black shine-text">FinQuest</h1>
                    <p className="text-muted-foreground text-sm mt-1">Platform Gamifikasi Keuangan</p>
                </div>

                <Card className="border-border bg-card">
                    <CardContent className="p-8">
                        <h2 className="text-xl font-bold text-foreground mb-1">Selamat Datang!</h2>
                        <p className="text-muted-foreground text-sm mb-6">
                            Masuk untuk melanjutkan petualangan finansialmu
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username" className="text-foreground font-semibold">
                                    Username / NIS
                                </Label>
                                <Input
                                    id="username"
                                    name="username"
                                    placeholder="Masukkan username atau NIS"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-foreground font-semibold">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Masukkan password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                                />
                            </div>
                            <div className="">
                                <Button
                                    type="submit"
                                    className="w-full bg-primary text-primary-foreground font-bold text-base py-6 rounded-xl glow-gold hover:bg-primary/90"
                                >
                                    Mulai Petualangan <ChevronRight className="w-5 h-5 ml-2" />
                                </Button>
                            </div>
                            <div className="mt-4 text-center text-sm text-muted-foreground ">
                                Belum punya akun?{' '}
                                <button
                                    type="button"
                                    className="hover:text-primary transition-colors"
                                    onClick={() => router.push('/register')}
                                >
                                    Daftar sekarang
                                </button>
                            </div>
                            <div className="text-center text-sm text-muted-foreground">
                                atau{' '}
                                <button
                                    type="button"
                                    className="hover:text-primary transition-colors"
                                    onClick={() => router.push('/')}
                                >
                                    Kembali ke halaman utama
                                </button>
                            </div>
                        </form>

                        <Dialog open={showErrorModal} onOpenChange={setShowErrorModal}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Error Login</DialogTitle>
                                </DialogHeader>
                                <DialogDescription>
                                    {serverError || "Terjadi kesalahan saat login."}
                                </DialogDescription>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                            Tutup
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardContent>
                </Card>

                <p className="text-center text-xs text-muted-foreground mt-6">
                    Platform Edukasi Keuangan untuk Siswa &bull; v1.0
                </p>
            </div>
        </main>
    )
}