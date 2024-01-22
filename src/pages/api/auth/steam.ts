import { getUserCustomId } from '@/server/routers/users/utils/getUserCustomId'
import { isUserValid } from '@/server/routers/users/utils/isUserValid'
import { getUserIdentifier } from '@/services/Auth/Steam'
import { getBaseURL } from '@/utils/getBaseURL'
import { getSupabaseByRequest } from '@/utils/supabaseHealper'
import { NextApiHandler } from 'next'

const BASE_URL = getBaseURL()

const handler: NextApiHandler = async (req, res): Promise<any> => {
  if (req.method !== 'GET') {
    return res.setHeader('Allow', ['GET']).status(405).end('Method not allowed')
  }

  const supabase = await getSupabaseByRequest(req)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!supabase || !session || !isUserValid(session)) {
    return res.redirect(BASE_URL)
  }

  const userCustomId = await getUserCustomId(supabase, session.user.id)
  const identifier = await getUserIdentifier(req)

  if (identifier) {
    const { error: upsertError } = await supabase
      .from('user_connections')
      .upsert({
        user_id: session.user.id,
        connection: 'STEAM',
        identifier,
      })

    if (!upsertError) {
      // await registerActivity(supabase, {
      //   userId: session.user.id,
      //   message: `Conexão com ${input.connection} adicionada`,
      //   points: 10,
      // })

      await res.revalidate(`/users/${userCustomId}`)
    }
  }

  return res.redirect(`${BASE_URL}/users/${userCustomId}/edit`)
}

export default handler
