"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Coins,
  LayoutDashboard,
  Sword,
  Trophy,
  User,
  BookOpen,
  TrendingUp,
  LogOut,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Sword, label: "Misi & Kuis", href: "/misi" },
  { icon: TrendingUp, label: "Simulasi Anggaran", href: "/simulasi" },
  { icon: BookOpen, label: "Materi Belajar", href: "/materi" },
  { icon: Trophy, label: "Leaderboard", href: "/leaderboard" },
  { icon: User, label: "Profil Saya", href: "/profil" },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex flex-col w-64 min-h-screen bg-sidebar border-r border-sidebar-border sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
        <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
          <Coins className="w-5 h-5 text-primary" />
        </div>
        <span className="text-xl font-black text-primary">FinQuest</span>
      </div>

      {/* Player mini card */}
      <div className="mx-4 mt-4 p-4 rounded-2xl bg-secondary border border-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center text-lg font-black text-primary">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-foreground truncate">Arya Pratama</p>
            <p className="text-xs text-muted-foreground">Level 7 · Finance Explorer</p>
          </div>
        </div>
        {/* XP Bar */}
        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-accent" />
              XP
            </span>
            <span className="text-accent font-bold">1.240 / 1.500</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all"
              style={{ width: "82%" }}
            />
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all",
                active
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5", active ? "text-primary" : "text-muted-foreground")} />
              {item.label}
              {active && (
                <span className="ml-auto w-2 h-2 rounded-full bg-primary" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 py-4 border-t border-sidebar-border">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
        >
          <LogOut className="w-5 h-5" />
          Keluar
        </Link>
      </div>
    </aside>
  )
}
