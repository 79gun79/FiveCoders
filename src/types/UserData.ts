import { create } from 'zustand';
import { postData } from './PostData';

const postNum = postData.length;

const userData = create<UserType>(() => ({
  userId: 1,
  userName: '설월화',
  userEmail: 'seolwolwha@naver.com',
  myPassWord: 'seolwolwha123~',
  myPost: postNum,
  myFollower: 40,
  myFollowing: 30,
  newPassWord: null,
  checkPassWord: null,
}));

export default userData;
