import {
  DEFAULT_SERVER_LOCALE,
  DEFAULT_SERVER_LOCALE_COUNTRY,
  filterServerProjectDesc,
  filterServerProjectName,
  hasPrivateConnectEndpoint,
} from "./serverUtils"
import { master } from "../proto/master"
import { IServer, IServerView, ServerViewDetailsLevel } from "../types"

const arrayAt = <T>(array: T[], index: number): T | undefined => {
  if (index < 0) {
    return array[array.length + index]
  }

  return array[index]
}

export function serverAddress2ServerView(address: string): IServerView {
  const fakeHostname = `⚠️ Server is loading or failed to load (${address}) ⚠️`

  return {
    id: address,
    detailsLevel: ServerViewDetailsLevel.Address,
    hostname: fakeHostname,
    locale: DEFAULT_SERVER_LOCALE,
    localeCountry: DEFAULT_SERVER_LOCALE_COUNTRY,
    projectName: fakeHostname,
    rawVariables: {},
  }
}

export function masterListServerData2ServerView(joinId: string, data: master.IServerData): IServerView {
  const serverView = Object.assign(
    serverAddress2ServerView(joinId),
    {
      joinId,
      detailsLevel: ServerViewDetailsLevel.MasterList,
      enforceGameBuild: data.vars?.['sv_enforceGameBuild'],
      gametype: data.gametype,
      mapname: data.mapname,
      server: data.server,
      hostname: data.hostname || '',
      playersMax: data.svMaxclients || 0,
      playersCurrent: data.clients || 0,
      burstPower: data.burstPower || 0,
      upvotePower: data.upvotePower || 0,
      connectEndPoints: data.connectEndPoints,
      private: hasPrivateConnectEndpoint(data.connectEndPoints),
      rawVariables: data.vars || {},
    },
    processServerDataVariables(data.vars),
  )

  if (data.hasOwnProperty('iconVersion')) {
    serverView.iconVersion = data.iconVersion
  }

  if (!serverView.projectName) {
    serverView.upvotePower = 0
  }

  return serverView
}

type VarsView = Partial<Pick<IServerView, | 'tags'
                                          | 'locale'
                                          | 'premium'
                                          | 'gamename'
                                          | 'canReview'
                                          | 'variables'
                                          | 'pureLevel'
                                          | 'projectName'
                                          | 'bannerDetail'
                                          | 'rawVariables'
                                          | 'localeCountry'
                                          | 'onesyncEnabled'
                                          | 'activitypubFeed'
                                          | 'licenseKeyToken'
                                          | 'bannerConnecting'
                                          | 'enforceGameBuild'
                                          | 'scriptHookAllowed'
                                          | 'projectDescription'
>>

export function processServerDataVariables(vars?: IServer['data']['vars']): VarsView {
  const view: VarsView = {
    projectName: '',
  }

  if (!vars) {
    return view
  }

  view.variables = {}

  for (const [key, value] of Object.entries(vars)) {
    const lckey = key.toLowerCase()

    switch (true) {
      case key === 'sv_projectName': {
        view.projectName = filterServerProjectName(value as string)
        continue
      }
      case key === 'sv_projectDesc': {
        view.projectDescription = filterServerProjectDesc(value as string)
        continue
      }
      case key === 'sv_licenseKeyToken': {
        view.licenseKeyToken = value
        continue
      }
      case key === 'sv_scriptHookAllowed': {
        view.scriptHookAllowed = value === 'true'
        continue
      }
      case key === 'gamename': {
        view.gamename = value
        continue
      }
      case key === 'activitypubFeed': {
        view.activitypubFeed = value
        continue
      }
      case key === 'premium': {
        view.premium = value
        continue
      }
      case key === 'locale': {
        view.locale = getCanonicalLocale(value as string)
        view.localeCountry = arrayAt(view.locale.split('-'), -1) || '??'
        continue
      }
      case key === 'sv_enforceGameBuild': {
        if (value) {
          view.enforceGameBuild = value
        }
        continue
      }
    }

    view.variables![key] = value
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
