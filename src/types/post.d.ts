type CommentType = {
  commentId: number;
  comment: string;
  coverImage: string; // 유저 이미지
  userName: string;
};

type PostType = {
  postId: number;
  title: string;
  image: string; // 파일 이미지
  coverImage: string; // 유저 이미지
  userName: string;
  comments: CommentType[];
};

type ChannelType = {
  authRequired: boolean;
  posts: PostType[];
  channelId: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};
// 채널 정보와 게시글 정보의 타입 지정
