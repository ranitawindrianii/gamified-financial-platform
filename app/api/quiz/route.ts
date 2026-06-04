import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const xp = Number(body?.xp ?? 0)
    
    if (xp <= 0) return NextResponse.json({ error: "invalid_xp" }, { status: 400 })

    const supabase = await createClient()
    const { data: userData } = await supabase.auth.getUser()
    const userId = userData?.user?.id
    if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 })

    const { data: profileData } = await supabase
      .from("profiles")
      .select("id, experience")
      .eq("user_id", userId)
      .maybeSingle()

    const profile_id = profileData?.id
    if (!profile_id) return NextResponse.json({ error: "profile_not_found" }, { status: 400 })

    const currentXp = profileData?.experience ?? 0
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ experience: currentXp + xp, kuis_taken : 1 })
      .eq("id", profile_id)

    if (updateError) return NextResponse.json({ error: (updateError as any)?.message ?? String(updateError) }, { status: 500 })

    return NextResponse.json({ success: true, totalXp: currentXp + xp })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
