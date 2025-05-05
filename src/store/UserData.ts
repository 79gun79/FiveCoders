import { create } from "zustand";

const userData = create<UserData>(() => ({
  userId: 1,
  userName: "설월화",
  userEmail: "seolwolwha@naver.com",
  myPassWord: "seolwolwha123~",
  myPost: 30,
  myFollower: 40,
  myFollowing: 30,
  newPassWord: null,
  checkPassWord: null,
}));

export default userData;
