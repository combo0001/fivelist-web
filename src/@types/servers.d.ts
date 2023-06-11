/* eslint-disable no-unused-vars */

declare enum SocialMediaPlatform {
  INSTAGRAM = 'INSTAGRAM',
  FACEBOOK = 'FACEBOOK',
  TWITTER = 'TWITTER',
  TIKTOK = 'TIKTOK',
  YOUTUBE = 'YOUTUBE',
}

declare namespace ServersType {
  interface ClientsObject {
    now: number
    onDay: number
  }

  interface WebsiteLinksObject {
    label: string
    url: string
  }

  interface SocialMediaLinksObject {
    platform: SocialMediaPlatform
    userId: string
  }

  interface StreamerLiveObject {
    bannerURL: string
    title: string
    streamer: string
    viewers: number
  }

  interface ReviewsObject {
    author: {
      name: string
      avatarURL: string
    }
    rate: 0 | 1 | 2 | 3 | 4 | 5
    message: string
    createdAt: Date
  }

  interface PlayerObject {
    avatarURL: string
    name: string
    likes: number
    startedAt: Date
  }

  type TagsObject = { [key: string]: string }

  interface ServerObject {
    name: string
    description: string
    slots: number
    cfxHash: string
    endpoint: string
    likes: number
    followers: number
    reviews: number
    hasVip: boolean
    bannerURL: string
    clients: ClientsObject
    tags: TagsObject
  }

  interface Provider extends ServerObject {}
}
