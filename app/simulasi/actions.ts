"use server"
import { createClient } from "@/lib/supabase/server"


export async function simpanSimulasi(
  userId: string,
  alloc: Record<string, number>
) {
  const supabase = await createClient()
  if (!userId) return { error: "User tidak ditemukan" }

  const { data: profileData } = await supabase
    .from("profiles")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle()

  const profile_id = profileData?.id
  if (!profile_id) return { error: "Profil tidak ditemukan" }

  const dataToUpsert = {
    profile_id,
    food_budget: alloc.makan,
    school_budget: alloc.sekolah,
    entertainment_budget: alloc.hiburan,
    savings_budget: alloc.tabungan,
    charity_budget: alloc.berbagi,
  }

  const { error } = await supabase
    .from("budgets")
    .upsert({ ...dataToUpsert }, { onConflict: "profile_id" })

  if (error) {
    return { error: error.message }
  }

  return { error: null }
}