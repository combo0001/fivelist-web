import { master } from './proto/master'
import { FrameReader } from './utils/frameReader'
import { Deferred } from './utils/deferred'
import { GameName } from './types'
import { masterListServerData2ServerView } from './utils/transformers'
import { ServerCitizenSchemaType } from '@/schemas/servers/CitizenSchema'

const FIVEM_FRONT_END_STREAM_URL = 'https://servers-frontend.fivem.net/api/servers/stream/'

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

export async function getServerEndpoint(cfxHash: string): Promise<void> {
  'use server'
  if (typeof window !== 'undefined') {
    throw new Error('Server endpoint getter triggered by client')
  }
}