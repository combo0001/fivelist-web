import { createContext } from "@/server/context"
import { inferAsyncReturnType } from "@trpc/server"

interface UserProps {
  id?: string
  customId?: string
}

export const revalidateUser = async (ctx: inferAsyncReturnType<typeof createContext>, user: UserProps): Promise<void> => {
  const { res } = ctx

  if (res) {
    let customId: string | null = null
    
    if (user.customId) {
      customId = user.customId
    } else if (user.id) {
      if (!ctx.supabase) return

      const { data: selectData, error: selectError } = await ctx.supabase
        .from('users')
        .select('customId:custom_id')
        .eq('id', user.id)
        .single()

      if (selectError) return

      customId = selectData.customId
    }

    if (!customId) return
    
    res.revalidate(`/users/${user.customId}`).catch(() => { })
  }
}