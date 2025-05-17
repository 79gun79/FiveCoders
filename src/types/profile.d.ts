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
  likes: LikeData[];
  comments: CommentData[];
  _id: string;
  author: string;
  title: string;
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
