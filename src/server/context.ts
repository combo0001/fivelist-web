/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Database } from '@/@types/supabase'
import { getSupabaseByRequest } from '@/utils/supabaseHealper'
import { Session, SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { inferAsyncReturnType } from '@trpc/server'
import { CreateNextContextOptions } from '@trpc/server/adapters/next'

interface CreateInnerContextOptions extends Partial<CreateNextContextOptions> {
  supabase: SupabaseClient<Database, 'public'>
  session: Session | null
}

export async function createContextInner(opts?: CreateInnerContextOptions) {
  return {
    supabase: opts?.supabase,
    session: opts?.session,
  }
}

export async function createContext({ req, res }: CreateNextContextOptions) {
  const supabase = await getSupabaseByRequest(req)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const contextInner = await createContextInner({ session, supabase })

  return {
    ...contextInner,
    req,
    res,
  }
}

export type Context = inferAsyncReturnType<typeof createContextInner>
