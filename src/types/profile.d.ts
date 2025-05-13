type UserData = {
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

type PostData = {
  postId: number;
  authorId: number;
  title: string;
  channelId: number;
};

type CommentData = {
  commentId: number;
  authorId: number;
  comment: string;
  channelId: number;
};

type MyPostData = {
  channelId: number;
  authorId: number;
  title: PostData[];
};

type MyCommentData = {
  authorId: number;
  comment: CommentData[];
};

type Tooltip = {
  content: string;
  children: React.ReactNode;
};
