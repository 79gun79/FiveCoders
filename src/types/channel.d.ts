import { Post } from './post';

export type Channel = {
  _id: string;
  name: string;
  description: string;
  authRequired: boolean;
  posts: Post[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  bannerImg?: string;
  channelId?: string;
};

type ChannelImg = {
  name: string;
  bannerImg: string;
};
