import { startTransition, useOptimistic } from 'react';
import { useState, useEffect } from 'react';
import { createLike, deleteLike } from '../services/likesApi';

export const stateLike = (initialPost: Post) => {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [post, setPost] = useState<Post | null>(initialPost);

  const [optPostData, updateOptPost] = useOptimistic(
    post,
    (
      curPostData,
      action: { type: 'add' | 'remove'; userId: string; likeId?: string },
    ) => {
      if (!curPostData) return null;

      if (action.type === 'add') {
        const id = String(Date.now());
        return {
          ...curPostData,
          likes: [
            ...curPostData.likes,
            {
              _id: id,
              user: action.userId,
              post: curPostData._id,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
        };
      } else if (action.type === 'remove' && action.likeId) {
        return {
          ...curPostData,
          likes: curPostData.likes.filter((like) => like._id !== action.likeId),
        };
      }

      return curPostData;
    },
  );

  useEffect(() => {
    setCurrentUserId('681db16a890af552f3055777');
  }, []);

  const isLiked =
    currentUserId && Array.isArray(optPostData?.likes)
      ? optPostData.likes.some((like) => like.user === currentUserId)
      : false; // 좋아요 눌렀는지 판단

  const isPending = optPostData !== post; // 상태 변경 여부 판단

  const toggleLike = async () => {
    if (!optPostData || !currentUserId) return;

    const userLike = optPostData.likes.find(
      (like) => like.user === currentUserId,
    );

    if (userLike) {
      startTransition(() => {
        updateOptPost({
          type: 'remove',
          userId: currentUserId,
          likeId: userLike._id,
        });
      });

      try {
        await deleteLike(userLike._id);

        setPost((post) => ({
          ...post!,
          likes: post!.likes.filter((like) => like._id !== userLike._id),
        }));
      } catch (err) {
        console.error('좋아요 삭제 실패:', err);
      }
    } else {
      startTransition(() => {
        updateOptPost({
          type: 'add',
          userId: currentUserId,
        });
      });

      try {
        const res = await createLike(optPostData._id);
        const newLike = res.data;

        setPost((post) => ({
          ...post!,
          likes: [...post!.likes, newLike],
        }));
      } catch (err) {
        console.error('좋아요 추가 실패:', err);
      }
    }
  };

  return {
    isLiked,
    toggleLike,
    likes: optPostData?.likes || [],
    isPending,
  };
};
