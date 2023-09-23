export interface ServerPageType {
  bannerUrl: string | null;
  createdAt: string;
  customId: string;
  description: string | null;
  followers: number;
  id: string;
  likes: number;
  ownerId: string | null;
  reviews: number;
  views: number;
}

export interface ServerDynamicType {
  hostName: string,
  playersCurrent: number,
  playersMax: number,
}