type Channel = {
  _id: string;
  name: string;
  description: string;
  authRequired: boolean;
  posts: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type ChannelItem = {
  id: string;
  name: string;
  isSubscribe: boolean;
};

type ChannelList = {
  id: string;
  name: string;
  icon: string;
};
