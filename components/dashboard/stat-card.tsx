import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string
  sub: string
  accent: "primary" | "accent"
}

export function StatCard({ icon: Icon, label, value, sub, accent }: StatCardProps) {
  return (
    <Card className="bg-card border-border card-hover">
      <CardContent className="p-5">
        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center mb-3",
            accent === "primary" ? "bg-primary/10" : "bg-accent/10"
          )}
        >
          <Icon
            className={cn("w-5 h-5", accent === "primary" ? "text-primary" : "text-accent")}
          />
        </div>
        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">{label}</p>
        <p className="text-2xl font-black text-foreground mt-1">{value}</p>
        <p
          className={cn(
            "text-xs font-semibold mt-1",
            accent === "primary" ? "text-primary" : "text-accent"
          )}
        >
          {sub}
        </p>
      </CardContent>
    </Card>
  )
}
