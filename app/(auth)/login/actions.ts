'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
    const supabase = await createClient()

    const usernameOrEmail = formData.get('username') as string
    const password = formData.get('password') as string

    const email = usernameOrEmail.includes('@')
        ? usernameOrEmail
        : `${usernameOrEmail}@student.sch.id`

    const { error, data } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
        return { error: error.message }
    }

    // Fetch profile data and store in session metadata
    if (data?.user?.id) {
        const { data: profileData } = await supabase
            .from('profiles')
            .select('fullname, experience, nis')
            .eq('user_id', data.user.id)
            .maybeSingle()

        if (profileData) {
            await supabase.auth.updateUser({
                data: {
                    profile: {
                        fullname: profileData.fullname,
                        experience: profileData.experience,
                        nis: profileData.nis,
                    }
                }
            })
        }
    }

    return { error: null }
}

export async function signup() {
    redirect('/register')
}