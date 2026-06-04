"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function handleRegister(formData: FormData) {
    const supabase = await createClient()

    const username = formData.get("username") as string
    const nis = formData.get("nis") as string
    const fullName = formData.get("fullName") as string
    const password = formData.get("password") as string

    if (username.trim().toLowerCase() === "admin") {
        return { error: "Username tidak boleh 'admin'." }
    }

    const email = `${username}@student.sch.id` // Generate email based on username

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                username,
                nis,
                fullName,
            },
        }
    })

    if (error) {
        return { error: error.message }
    }

    const user = data?.user
    if (!user?.id) {
        return { error: "Pendaftaran gagal: user tidak ditemukan setelah signup." }
    }

    const { error: profileError } = await supabase
        .from('profiles')
        .insert([
            {
                user_id: user.id,
                nis,
                fullname: fullName,
            },
        ])

    if (profileError) {
        return { error: profileError.message }
    }

    // Store profile data in user metadata
    await supabase.auth.updateUser({
        data: {
            profile: {
                fullname: fullName,
                experience: 0,
                nis: nis,
            }
        }
    })

    redirect('/login')
}
