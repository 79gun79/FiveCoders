import { client } from './axios';
import { User } from '../types/user';

export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await client.get('/users/get-users');
  return data;
};
