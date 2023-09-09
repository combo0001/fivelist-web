import { useClientUser } from "@/providers/UserProvider"
import { ConnectionsSchemaType } from "@/schemas/ConnectionSchema"
import { UserIdentitySchemaType } from "@/schemas/users/IdentitySchema"
import { getConnectionOptions } from "@/utils/connectionsLinks"
import { trpc } from "@/utils/trpc"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AuthUser(): JSX.Element {
  const router = useRouter()

  const { user } = useClientUser()
  const addUserConnection = trpc.users.addUserConnection.useMutation()

  const handleOnAuth = async (redirectURL: string): Promise<void> => {
    const fragment = new URLSearchParams(window.location.search);
    
    const connection = fragment.get('state') as ConnectionsSchemaType

    if (connection) {
      const options = getConnectionOptions(connection)
      
      if (options) {
        const identifier = await options.getUserIdentifier(fragment)
        
        if (identifier) {
          await addUserConnection.mutateAsync({
            connection,
            identifier
          })
        }
      }
    }

    router.push(redirectURL)
  }

  useEffect(() => {
    if (!user) return

    handleOnAuth(`/users/${user.customId}/edit`)
  }, [ user ])

  return (
    <></>
  )
}
