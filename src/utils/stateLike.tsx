import { startTransition, useOptimistic } from 'react';
import { useState, useEffect } from 'react';
import { createLike, deleteLike } from '../services/likesApi';
import { client } from '../services/axios';
import { customToast } from './customToast';
import { BiSolidLike } from 'react-icons/bi';
import { User } from '../types/user';
import { createNotification } from '../services/notificationApi';
import { Post } from '../types/post';

export const stateLike = (initialPost: Post) => {
  const [currentUserId, setCurrentUserId] = useState<User['_id'] | null>(null);
  const [post, setPost] = useState<Post | null>(initialPost);
  const [throttle, setThrottle] = useState(false);

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
    client('/auth-user').then((response) =>
      setCurrentUserId(response.data._id),
    );
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

    if (userLike && !throttle) {
      setThrottle(true);

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
      } finally {
        setThrottle(false);
      }
    }

    if (!userLike && !throttle) {
      setThrottle(true);

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

        if (post && post.author._id !== currentUserId) {
          await createNotification({
            notificationType: 'like',
            notificationTypeId: newLike._id,
            userId: post.author._id,
            postId: post._id,
          });
        }

        customToast(
          `${post?.author.fullName}님의\n게시글에 좋아요를 눌렀습니다!`,
          'success',
          <BiSolidLike className="text-[var(--color-sub)]" size={24} />,
        );
      } catch (err) {
        console.error('좋아요 추가 실패:', err);
      } finally {
        setThrottle(false);
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
