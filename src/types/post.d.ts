export type Post = {
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
