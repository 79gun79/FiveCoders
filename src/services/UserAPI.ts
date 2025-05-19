import { client } from './axios';
import { User } from '../types/user';

//모든 유저 가져오기
export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await client.get('/users/get-users');
  return data;
};

// 현재 로그인한 유저 정보 가져오기
export const fetchCurrentUser = async (): Promise<User> => {
  const { data } = await client.get<User>('/auth-user');
  return data;
};
