import { client } from './axios';

export const fetchUser = async (): Promise<UserData[]> => {
  const { data } = await client.get('/users/680b2cb73fc74c12d94141ad');
  return data;
};
