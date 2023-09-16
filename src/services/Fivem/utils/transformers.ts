import {
  DEFAULT_SERVER_LOCALE,
  DEFAULT_SERVER_LOCALE_COUNTRY,
  filterServerProjectName,
  hasPrivateConnectEndpoint,
} from "./serverUtils"
import { master } from "../proto/master"
import { GameName } from "../types"
import { ServerCitizenSchemaType } from "@/schemas/servers/CitizenSchema"

const arrayAt = <T>(array: T[], index: number): T | undefined => {
  if (index < 0) {
    return array[array.length + index]
  }

  return array[index]
}

interface ServerBaseProps {
  joinId: string
  projectName: string
  country: string
}

export function serverAddress2ServerView(address: string): ServerBaseProps {
  const fakeHostname = `⚠️ Server is loading or failed to load (${address}) ⚠️`

  return {
    joinId: address,
    projectName: fakeHostname,
    country: DEFAULT_SERVER_LOCALE_COUNTRY,
  }
}

export function masterListServerData2ServerView(joinId: string, data: master.IServerData): ServerCitizenSchemaType {
  return Object.assign(
    serverAddress2ServerView(joinId),
    {
      playersCurrent: data.clients || 0,
      playersMax: data.svMaxclients || 0,
      isPrivate: hasPrivateConnectEndpoint(data.connectEndPoints),
    },
    processServerDataVariables(data.vars),
  )
}

interface ServerVariablesProps {
  projectName: string
  gameName: string
  country?: string
}

export function processServerDataVariables(vars?: { [key: string]: string } | null): ServerVariablesProps {
  const view: ServerVariablesProps = {
    projectName: '',
    gameName: GameName.FiveM,
  }

  if (!vars) {
    return view
  }

  for (const [key, value] of Object.entries(vars)) {
    switch (true) {
      case key === 'sv_projectName': {
        view.projectName = filterServerProjectName(value as string)

        continue
      }
      case key === 'locale': {
        const locale = getCanonicalLocale(value as string)

        view.country = arrayAt(locale.split('-'), -1) || '??'

        continue
      }
      case key === 'gamename': {
        view.gameName = value

        continue
      }
    }
  }

  return view
}

function getCanonicalLocale(locale: string): string {
  try {
    return locale
  } catch {
    return DEFAULT_SERVER_LOCALE
  }
}
