import { SimulasiContent } from "@/components/simulasi/SimulasiContent"
import { createClient } from "@/lib/supabase/server"

const TOTAL_BUDGET = 200000

export default async function SimulasiPage() {
  const supabase = await createClient()

  const { data: userData } = await supabase.auth.getUser()
  const userId = userData?.user?.id

  let initialAlloc: Record<string, number> = {
    makan: 0,
    sekolah: 0,
    hiburan: 0,
    tabungan: 0,
    berbagi: 0,
  }

  if (userId) {
    const { data: profileData } = await supabase
      .from("profiles")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle()

    const profile_id = profileData?.id

    if (profile_id) {
      const { data: budgetData } = await supabase
        .from("budgets")
        .select("food_budget, school_budget, entertainment_budget, savings_budget, charity_budget")
        .eq("profile_id", profile_id)
        .maybeSingle()

      if (budgetData) {
        initialAlloc = {
          makan: budgetData.food_budget ?? 0,
          sekolah: budgetData.school_budget ?? 0,
          hiburan: budgetData.entertainment_budget ?? 0,
          tabungan: budgetData.savings_budget ?? 0,
          berbagi: budgetData.charity_budget ?? 0,
        }
      }
    }
  }

  return <SimulasiContent initialAlloc={initialAlloc} totalBudget={TOTAL_BUDGET} />
}
