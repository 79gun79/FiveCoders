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
  id: string;
  author: string;
  title: string;
  update: Date;
};

type CommentData = {
  id: string;
  author: string;
  comment: string;
  update: Date;
};

type MyFollowing = {
  id: string;
  user: string;
  update: Date;
};

type MyFollower = {
  id: string;
  user: string;
  update: string;
};

type Tooltip = {
  content: string;
  children: React.ReactNode;
};

type dfData = {
  serverId: string;
  characterId: string;
  characterName: string;
  level: string;
  jobGrowName: string;
  fame: number;
};
