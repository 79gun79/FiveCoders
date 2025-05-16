type CommentType = {
  _id: string;
  comment: string;
  author: {
    fullName: string;
    image: string;
  };
  post: string;
  createdAt: string;
  updatedAt: string;
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
