import type { User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"

interface AuthData {
  email: string
  password: string
}

export async function signIn(data: AuthData): Promise<User> {
  const { data: authData, error } = await supabase.auth.signInWithPassword(data)

  if (error) throw error
  if (!authData.user) throw new Error("No user returned from sign in")

  return authData.user
}
