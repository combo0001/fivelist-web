import { master } from './proto/master'
import { FrameReader } from './utils/frameReader'
import { Deferred } from './utils/deferred'
import { GameName, IServerDynamic } from './types'
import { masterListServerData2ServerView } from './utils/transformers'
import { ServerCitizenSchemaType } from '@/schemas/servers/CitizenSchema'

const FIVEM_FRONT_END_STREAM_URL = 'https://servers-frontend.fivem.net/api/servers/stream/'
const FIVEM_JOIN_ENDPOINT = 'https://cfx.re/join/'
const FIVEM_DYNAMIC_ENDPOINT = 'dynamic.json'

const decodeServer = (frame: Uint8Array): master.IServer => {
  return master.Server.decode(frame)
}

const readBodyToServers = async (readerBody: ReadableStream<Uint8Array>): Promise<ServerCitizenSchemaType[]> => {
  const deferred = new Deferred<void>()
  const serverList: ServerCitizenSchemaType[] = []

  new FrameReader(
    readerBody,
    (frame) => {
      const srv = decodeServer(frame)

      if (srv.EndPoint && srv.Data) {
        const serverGameName = srv.Data?.vars?.gamename || GameName.FiveM

        if (GameName.FiveM === serverGameName) {
          const serverView = masterListServerData2ServerView(srv.EndPoint, srv.Data)

          serverList.push(serverView)
        }
      }
    },
    deferred.resolve,
  )

  await deferred.promise

  return serverList
} 

export async function getAllMasterListServers(): Promise<ServerCitizenSchemaType[]> {
  'use client';
  if (typeof window === 'undefined') {
    throw new Error('Master list triggered by server')
  }
  
  const response = await fetch(FIVEM_FRONT_END_STREAM_URL, { 
    method: 'GET', 
    headers: { 'Accept-Encoding': 'gzip' },
  })

  if (!response.ok || !response.body) {
    throw new Error('Empty body of all servers stream')
  }

  return await readBodyToServers(response.body)
}

export async function getServerEndpoint(cfxHash: string): Promise<string | null> {
  'use server'
  if (typeof window !== 'undefined') {
    throw new Error('Server endpoint getter triggered by client')
  }

  const response = await fetch(`${FIVEM_JOIN_ENDPOINT}${cfxHash}`, { method: 'GET' })

  if (!response.ok) {
    throw new Error('Empty body of join')
  }

  return response.headers.get('x-citizenfx-url')
}

export async function getServerDynamic(endpoint: string): Promise<IServerDynamic | null> {
  'use server'
  if (typeof window !== 'undefined') {
    throw new Error('Server dynamic getter triggered by client')
  }

  const response = await fetch(`${endpoint}${FIVEM_DYNAMIC_ENDPOINT}`, { method: 'GET' })

  if (!response.ok) {
    throw new Error('Empty body of join')
  }

  const result = await response.json() as any

  return {
    clients: Number(result.clients),
    gametype: result.gametype,
    hostname: result.hostname,
    iv: Number(result.iv),
    mapname: result.mapname,
    sv_maxclients: Number(result.sv_maxclients)
  }
}