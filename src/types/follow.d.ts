export type Follow = {
  _id: string;
  user: string; // 구독(팔로우) 대상의 ID (채널ID)
  follower: string; // 나의 ID
  createdAt: string;
  updatedAt: string;
};
