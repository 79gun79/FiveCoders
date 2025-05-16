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
  likes: Like[];
  comments: CommentType[];
};
