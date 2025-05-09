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
