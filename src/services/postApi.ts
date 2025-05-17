import { client } from './axios';

type PostCreateReq = {
  title: string;
  channelId: string;
  image?: File;
};

type PostUpdateReq = {
  postId: string;
  title: string;
  image?: File;
  imageToDeletePublicId?: string;
  channelId: string;
};

export const getPostById = async (postId: string) => {
  try {
    const res = await client.get(`/posts/${postId}`);
    return res;
  } catch (err) {
    console.error('게시물 가져오기 실패:', err);
    throw err;
  }
};

export const createPost = async ({
  title,
  channelId,
  image,
}: PostCreateReq) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('channelId', channelId);
  if (image) formData.append('image', image);

  try {
    const res = await client.post('/posts/create', formData);
    return res;
  } catch (err) {
    console.error('게시물 생성 실패: ', err);
    throw err;
  }
};

export const deletePost = async (postId: string) => {
  try {
    await client.delete(`/posts/delete`, {
      data: { id: postId },
    });
  } catch (err) {
    console.error('게시물 삭제 실패:', err);
    throw err;
  }
};

export const updatePost = async ({
  postId,
  title,
  image,
  imageToDeletePublicId,
  channelId,
}: PostUpdateReq) => {
  const formData = new FormData();
  formData.append('postId', postId);
  formData.append('title', title);
  formData.append('channelId', channelId);
  if (image) formData.append('image', image);
  if (imageToDeletePublicId)
    formData.append('imageToDeletePublicId', imageToDeletePublicId);

  try {
    const res = await client.put('/posts/update', formData);
    return res;
  } catch (err) {
    console.error('게시물 수정 실패 : ', err);
    throw err;
  }
};
