type UserType = {
  userId: number;
  userName: string;
  userEmail: string;
  myPost: number;
  myFollower: number;
  myFollowing: number;
  myPassWord: string;
  newPassWord: string | null;
  checkPassWord: string | null;
};

type PostType = {
  postId: number;
  authorId: number;
  title: string;
  channelId: number;
};

type CommentType = {
  commentId: number;
  authorId: number;
  comment: string;
  channelId: number;
};
