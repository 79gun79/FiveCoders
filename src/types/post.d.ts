type PostType = {
  id: number;
  title: string;
  image: string;
  userName: string;
  userId: string;
  content: string;
  likeCount: number;
  comments: number;
  channelId: string;
};

type ChannelType = {
  authRequired: boolean;
  channelId: number;
  name: string;
  description: string;
  subscribe: number;
  link: string;
  createdAt: string;
  updatedAt: string;
  posts: PostType[];
};
// 채널 정보와 게시글 정보의 타입 지정
