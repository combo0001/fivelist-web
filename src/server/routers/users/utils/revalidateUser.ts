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
    } else {
      if (!ctx.supabase) return

      const { data: selectData, error: selectError } = await ctx.supabase
        .from('users')
        .select('customId:custom_id')
        .eq('id', user.id)

      if (selectError) return

      customId = selectData[0].customId
    }

    if (!customId) return
    
    res.revalidate(`/users/${user.customId}`).catch(() => { })
  }
}