import { client } from './axios';

export const createLike = async (postId: string) => {
  try {
    const res = await client.post(`/likes/create`, {
      postId: postId,
    });
    console.log('updated');
    return res;
  } catch (err) {
    console.error('좋아요 실패:', err);
    throw err;
  }
};

export const deleteLike = async (_id: string) => {
  try {
    await client.delete(`/likes/delete`, {
      data: { id: _id },
    });
  } catch (err) {
    console.error('좋아요 제거 실패:', err);
    throw err;
  }
};
