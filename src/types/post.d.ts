type CommentType = {
  commentId: number;
  comment: string;
  coverImage: string; // 유저 이미지
  userName: string;
};

type Post = {
  _id: string;
  image: string;
  imagePublicId: string;
  title: string;
  channel: Channel;
  author: User;
  createdAt: string;
  updatedAt: string;
  likes: string[];
  comments: CommentType[];
};

type PostStore = {
  allPosts: Record<string, Post[]>;
  fetchPosts: (channelId: string) => void;
  // createPost: (channelId: string, newPost: string) => void;
  // deletePost: (channelId: string, postId: string) => void;
};
// 모든 게시글들을 관리하기 위한 전역상태의 타입
