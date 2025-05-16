import { client } from './axios';

export const checkIsAdmin = async (): Promise<boolean> => {
  try {
    const { data } = await client.get('/auth-user');
    return data.role === 'SuperAdmin';
  } catch (error) {
    console.error('관리자 확인 실패:', error);
    return false;
  }
};
