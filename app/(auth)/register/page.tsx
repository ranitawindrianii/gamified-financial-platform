"use client"

import Link from "next/link"
import { useState, type FormEvent } from "react"
// import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { handleRegister } from "./actions"

const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/

export default function RegisterPage() {
    const [username, setUsername] = useState("")
    // const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [nis, setNis] = useState("")
    const [fullName, setFullName] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [nisError, setNisError] = useState("")
    const [serverError, setServerError] = useState("")
    const [showErrorModal, setShowErrorModal] = useState(false)
    // const [className, setClassName] = useState("")
    // const router = useRouter()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (username.trim().toLowerCase() === "admin") {
            setUsernameError("Username tidak boleh 'admin'.")
            return
        }

        if (!strongPasswordRegex.test(password)) {
            setPasswordError(
                "Password harus minimal 8 karakter dan menyertakan huruf kecil, huruf besar, angka, dan simbol."
            )
            return
        }

        if (!/^[0-9]+$/.test(nis.trim())) {
            setNisError("NIS harus berupa angka saja.")
            return
        }

        setUsernameError("")
        setPasswordError("")
        setNisError("")
        setServerError("")

        try {
            const formData = new FormData(e.currentTarget)
            const result = await handleRegister(formData)
            if (result?.error) {
                setServerError(result.error)
                setShowErrorModal(true)
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error)
            setServerError(message)
            setShowErrorModal(true)
        }
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
                    <h1 className="text-3xl font-black shine-text">Daftar FinQuest</h1>
                    <p className="text-muted-foreground text-sm mt-1">Buat akun untuk memulai perjalanan edukasi finansialmu</p>
                </div>

                <Card className="border-border bg-card">
                    <CardContent className="p-8">
                        <h2 className="text-xl font-bold text-foreground mb-1">Buat Akun Baru</h2>
                        <p className="text-muted-foreground text-sm mb-6">
                            Isi data diri berikut untuk membuat akun siswa.
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username" className="text-foreground font-semibold">
                                    Username
                                </Label>
                                <Input
                                    id="username"
                                    name="username"
                                    placeholder="Masukkan username"
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value)
                                        if (usernameError) setUsernameError("")
                                    }}
                                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                                />
                                {usernameError ? (
                                    <p className="text-sm text-destructive mt-1">{usernameError}</p>
                                ) : null}
                            </div>
{/* 
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-foreground font-semibold">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Masukkan email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                                />
                            </div> */}

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
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                        if (passwordError) setPasswordError("")
                                    }}
                                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                                />
                                {passwordError ? (
                                    <p className="text-sm text-destructive mt-1">{passwordError}</p>
                                ) : null}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="nis" className="text-foreground font-semibold">
                                    NIS
                                </Label>
                                <Input
                                    id="nis"
                                    name="nis"
                                    placeholder="Masukkan NIS"
                                    value={nis}
                                    onChange={(e) => {
                                        setNis(e.target.value)
                                        if (nisError) setNisError("")
                                    }}
                                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                                />
                                {nisError ? (
                                    <p className="text-sm text-destructive mt-1">{nisError}</p>
                                ) : null}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="fullName" className="text-foreground font-semibold">
                                    Nama Lengkap
                                </Label>
                                <Input
                                    id="fullName"
                                    name="fullName"
                                    placeholder="Masukkan nama lengkap"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                                />
                            </div>

                            {/* <div className="space-y-2">
                                <Label htmlFor="className" className="text-foreground font-semibold">
                                    Kelas
                                </Label>
                                <Input
                                    id="className"
                                    placeholder="Masukkan kelas"
                                    value={className}
                                    onChange={(e) => setClassName(e.target.value)}
                                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                                />
                            </div> */}

                            <Button
                                type="submit"
                                className="w-full bg-primary text-primary-foreground font-bold text-base py-6 rounded-xl glow-gold hover:bg-primary/90"
                            >
                                Daftar Sekarang
                            </Button>
                        </form>

                        <Dialog open={showErrorModal} onOpenChange={setShowErrorModal}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Error Registrasi</DialogTitle>
                                </DialogHeader>
                                <DialogDescription>
                                    {serverError || "Terjadi kesalahan saat mendaftar."}
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

                        <div className="mt-4 text-center">
                            <p className="text-sm text-muted-foreground">
                                Sudah punya akun?{" "}
                                <Link href="/login" className="text-sm text-primary hover:underline transition-colors">
                                    Masuk di sini
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <p className="text-center text-xs text-muted-foreground mt-6">
                    Platform Edukasi Keuangan untuk Siswa • v1.0
                </p>
            </div>
        </main>
    )
}
