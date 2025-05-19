import { client } from './axios';
import { Follow } from '../types/follow';

//api의 user - follow/unfollow 를 채널 subscribe/unsubscribe로 사용
export const subscribeChannel = async (channelId: string) => {
  // userId 대신 채널ID를 넣어서 사용
  await client.post('/follow/create', { userId: channelId });
};

export const unsubscribeChannel = async (channelId: string) => {
  // followId는 팔로우(구독) 관계의 유저 _id
  const { data: user } = await client.get('/auth-user');
  const targetFollow = user.following.find(
    (follow: Follow) => follow.user === channelId,
  );

  if (targetFollow) {
    await client.delete('/follow/delete', {
      data: { id: targetFollow._id },
    });
  }
};
