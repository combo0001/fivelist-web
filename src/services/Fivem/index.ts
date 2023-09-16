import { master } from './proto/master'
import { FrameReader } from './utils/frameReader'
import { Deferred } from './utils/deferred'
import { GameName, IServerView } from './types'
import { masterListServerData2ServerView } from './utils/transformers'

const FIVEM_FRONT_END_STREAM_URL = 'https://servers-frontend.fivem.net/api/servers/stream/'


const decodeServer = (frame: Uint8Array): master.IServer => {
  return master.Server.decode(frame)
}

const readBodyToServers = async (gameName: GameName, onServer: (server: IServerView) => void, readerBody: ReadableStream<Uint8Array>): Promise<void> => {
  const deferred = new Deferred<void>()

  const frame = new FrameReader(
    readerBody,
    (frame) => {
      try {
        const srv = decodeServer(frame)
  
        if (srv.EndPoint && srv.Data) {
          const serverGameName = srv.Data?.vars?.gamename || GameName.FiveM
  
          if (gameName === serverGameName) {
            const serverView = masterListServerData2ServerView(srv.EndPoint, srv.Data)
  
            onServer(serverView)
          }
        }
      } catch (err) {
        console.log('Error reading server', err)
      }
    },
    deferred.resolve,
  )

  frame.read()

  await deferred.promise
}

export async function getAllMasterListServers(gameName: GameName, onServer: (server: IServerView) => void): Promise<void> {
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

  await readBodyToServers(gameName, onServer, response.body)
}