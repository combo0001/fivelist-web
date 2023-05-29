/* eslint-disable no-unused-vars */

declare namespace ServersType {
  interface ServerObject {
    name: string
    description: string
    clients: number
    slots: number
    tags: { [key: string]: string }
    cfxHash: string
    endpoint: string
    likes: number
    followers: number
    reviews: number
    hasVip: boolean
    bannerURL: string
  }

  interface Provider extends ServerObject {}
}
