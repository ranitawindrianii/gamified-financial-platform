import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const alloc = body?.alloc
        if (!alloc) return NextResponse.json({ error: "invalid_payload" }, { status: 400 })

        const supabase = await createClient()
        const { data: userData } = await supabase.auth.getUser()
        const userId = userData?.user?.id
        if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 })

        const { data: profileData } = await supabase
            .from("profiles")
            .select("id")
            .eq("user_id", userId)
            .maybeSingle()

        const profile_id = profileData?.id
        if (!profile_id) return NextResponse.json({ error: "profile_not_found" }, { status: 400 })

        const payload = {
            profile_id,
            food_budget: alloc.makan ?? 0,
            school_budget: alloc.sekolah ?? 0,
            entertainment_budget: alloc.hiburan ?? 0,
            savings_budget: alloc.tabungan ?? 0,
            charity_budget: alloc.berbagi ?? 0,
            weekly_budget: body?.totalBudget ?? 0,
        }

        const { data, error } = await supabase
            .from("budgets")
            .upsert(payload, { onConflict: "profile_id" })
            .select()
            .maybeSingle()

        if (error) return NextResponse.json({ error: (error as any)?.message ?? String(error) }, { status: 500 })

        return NextResponse.json({ data })
    } catch (err) {
        return NextResponse.json({ error: (err as Error).message }, { status: 500 })
    }
}
