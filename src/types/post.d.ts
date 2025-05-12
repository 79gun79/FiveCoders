type CommentType = {
  commentId: number;
  comment: string;
  coverImage: string; // 유저 이미지
  userName: string;
};

type PostType = {
  postId: number;
  content: string;
  image: string; // 파일 이미지
  coverImage: string; // 유저 이미지
  userName: string;
  comments: CommentType[];
};

type PostStore = {
  allPosts: Record<string, PostType[]>;
  createPost: (channelId: string, newPost: string) => void;
  deletePost: (channelId: string, postId: number) => void;
};
// 모든 게시글들을 관리하기 위한 전역상태의 타입
