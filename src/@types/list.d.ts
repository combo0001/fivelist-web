/* eslint-disable no-unused-vars */

declare namespace ListType {
  interface Server {
    name: string
    description: string
    clients: number
    slots: number
    followers: number
    likes: number
    reviews: number
    hasVip: boolean
    cfxHash: string
  }
}
