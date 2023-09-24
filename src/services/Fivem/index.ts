import { master } from './proto/master'
import { FrameReader } from './utils/frameReader'
import { Deferred } from './utils/deferred'
import { GameName } from './types'
import { masterListFullServerData2ServerView, masterListServerData2ServerView } from './utils/transformers'
import { ServerCitizenSchemaType } from '@/schemas/servers/CitizenSchema'
import UserAgent from 'user-agents'
import { ServerDynamicSchemaType } from '@/schemas/servers/DynamicSchema'

const FIVEM_FRONT_END_STREAM_URL = 'https://servers-frontend.fivem.net/api/servers/stream/'
const FIVEM_JOIN_ENDPOINT = 'https://cfx.re/join/'
const FIVEM_FRONT_END_SINGLE = 'https://servers-frontend.fivem.net/api/servers/single/'

const fetchWithTimeout = (input: RequestInfo | URL, init?: RequestInit | undefined, timeout = 5000): Promise<any> => {
  const fetchPromise = fetch(input, init)
  const timeoutPromise = new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Request timed out')), timeout)
  )

  return Promise.race([fetchPromise, timeoutPromise])
}

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
  'use client'
  if (typeof window === 'undefined') {
    throw new Error('Master list triggered by server')
  }
  
  const response = await fetch(FIVEM_FRONT_END_STREAM_URL, { 
    method: 'GET', 
    headers: { 
      'Accept-Encoding': 'gzip'
    },
  })

  if (!response.ok || !response.body) {
    throw new Error('Empty body of all servers stream')
  }

  return await readBodyToServers(response.body)
}

export async function getMasterListServer(address: string): Promise<ServerDynamicSchemaType | null> {
  try {
    const response = await fetch(`${FIVEM_FRONT_END_SINGLE}${address}`, { 
      method: 'GET', 
      headers: { 
        'User-Agent': typeof window !== 'undefined' ? window.navigator.userAgent : new UserAgent().toString()
      },
    })

    if (!response.ok) {
      throw new Error('Empty body of single')
    }

    const result = await response.json()

    if (result.EndPoint && result.Data) {
      return masterListFullServerData2ServerView(result.EndPoint, result.Data)
    }

    return null
  } catch (e) {
    return null
  }
}

export async function getServerEndpoint(cfxHash: string): Promise<string | null> {
  'use server'
  if (typeof window !== 'undefined') {
    throw new Error('Server endpoint getter triggered by client')
  }

  const userAgent = new UserAgent().toString()

  const response = await fetchWithTimeout(`${FIVEM_JOIN_ENDPOINT}${cfxHash}`, { 
    method: 'GET',
    headers: { 
      'User-Agent': userAgent
    }
  }, 2500)

  if (!response.ok) {
    throw new Error('Empty body of join')
  }

  return response.headers.get('x-citizenfx-url')
}
