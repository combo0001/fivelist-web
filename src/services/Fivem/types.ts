import { master } from './proto/master'

export enum ServerViewDetailsLevel {
  Address = 0,
  Historical = 50,
  Live = 100,
  DynamicDataJson = 101,
  InfoAndDynamicDataJson = 199,
  MasterList = 201,
  MasterListFull = 299,
}

export enum ServerPureLevel {
  None = '0',
  AudioAndGraphicsAllowed = '1',
  NoModsAllowed = '2',
}

export interface IServerViewPlayer {
  endpoint: string
  id: number
  identifiers: string[]
  name: string
  ping: number
}

export enum GameName {
  FiveM = 'gta5',
  RedM = 'rdr3',
  LibertyM = 'ny',
  Launcher = 'launcher',
}

export interface IServerView {
  id: string
  detailsLevel: ServerViewDetailsLevel

  locale: string
  localeCountry: string
  hostname: string

  projectName: string

  rawVariables: Record<string, string>

  joinId?: string

  historicalAddress?: string
  historicalIconURL?: string | null

  connectEndPoints?: string[]
  projectDescription?: string

  upvotePower?: number
  burstPower?: number

  offline?: true

  iconVersion?: number | null

  licenseKeyToken?: string | null
  mapname?: string | null
  gametype?: string | null
  gamename?: string | null
  fallback?: any
  private?: boolean
  scriptHookAllowed?: boolean
  enforceGameBuild?: string
  pureLevel?: ServerPureLevel

  premium?: null | 'pt' | 'au' | 'ag' | string

  bannerConnecting?: string
  bannerDetail?: string

  canReview?: boolean

  ownerID?: string
  ownerName?: string
  ownerAvatar?: string
  ownerProfile?: string

  activitypubFeed?: string
  onesyncEnabled?: boolean
  server?: string | null
  supportStatus?: 'supported' | 'end_of_support' | 'end_of_life' | 'unknown'

  playersMax?: number
  playersCurrent?: number

  tags?: string[]
  players?: IServerViewPlayer[]
  resources?: string[]

  variables?: Record<string, string>
}

export interface IServer {
  address: string
  data: master.IServerData
}

export interface IFullServerData {
  EndPoint: string
  Data: {
    clients?: number
    selfReportedClients?: number

    server?: string

    support_status?: string

    svMaxclients?: number
    sv_maxclients?: number

    burstPower?: number
    upvotePower: number

    connectEndPoints: string[]

    enhancedHostSupport?: boolean
    fallback?: boolean
    private?: boolean
    valid?: false

    gametype?: string
    hostname?: string
    iconVersion?: number
    lastSeen: string
    mapname?: string

    ownerID?: string
    ownerName?: string
    ownerAvatar?: string
    ownerProfile?: string

    players: IServerViewPlayer[]
    resources?: string[]

    vars?: Record<string, string>
  }
}
