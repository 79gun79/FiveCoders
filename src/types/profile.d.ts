type UserData = {
  id: string;
  userName: string;
  userEmail: string;
  userPost: number;
  userFollower: number;
  userFollowing: number;
  userPassWord: string;
  newPassWord: string | null;
  checkPassWord: string | null;
};

type PostData = {
  lieks: LikeData[];
  comments: CommentData[];
  _id: string;
  author: string;
  title: string;
  update: string;
};

type LikeData = {
  _id: string;
  user: string;
  post: string;
};

type CommentData = {
  id: string;
  author: string;
  comment: string;
  post: string;
  update: string;
};

type MyFollowing = {
  id: string;
  user: string;
  update: string;
};

type MyFollower = {
  id: string;
  user: string;
  update: string;
};

type Tooltip = {
  content: string;
};

type dfData = {
  serverId: string;
  characterId: string;
  characterName: string;
  level: string;
  jobGrowName: string;
  fame: number;
};
