export type Channel = {
  _id: string;
  name: string;
  description: string;
  authRequired: boolean;
  posts: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  imageUrl: string;
};

export type ChannelItem = {
  id: string;
  name: string;
  isSubscribe: boolean;
  imageUrl: string;
  genre?: string;
};