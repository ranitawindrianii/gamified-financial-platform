"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Sword, Trophy, User, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

const mobileItems = [
  { icon: LayoutDashboard, label: "Home", href: "/dashboard" },
  { icon: Sword, label: "Misi", href: "/misi" },
  { icon: TrendingUp, label: "Simulasi", href: "/simulasi" },
  { icon: Trophy, label: "Rank", href: "/leaderboard" },
  { icon: User, label: "Profil", href: "/profil" },
]

export function MobileNav() {
  const pathname = usePathname()
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-sidebar border-t border-sidebar-border flex items-center justify-around px-2 py-2">
      {mobileItems.map((item) => {
        const active = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all",
              active ? "text-primary" : "text-muted-foreground"
            )}
          >
            <item.icon className={cn("w-5 h-5", active && "text-primary")} />
            <span className="text-[10px] font-bold">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
