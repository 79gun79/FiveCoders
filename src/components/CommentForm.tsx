import { useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from './Button';
import placeholderIcon from '../assets/channelImg.svg';
import { client } from '../services/axios';
import { customToast } from '../utils/customToast';
import { useRefreshStore } from '../stores/refreshStore';
import { createNotification } from '../services/notificationApi';
import { User } from '../types/user';

export default function CommentForm({
  postId,
  user,
}: {
  postId: string;
  user: User;
}) {
  const [comment, setComment] = useState('');
  const [isFocused, setFocused] = useState(false);
  const commentRef = useRef<HTMLTextAreaElement>(null);

  const refresh = useRefreshStore((state) => state.refresh);
  const doRefresh = useRefreshStore((state) => state.do);
  const resetRefresh = useRefreshStore((state) => state.reset);

  const [throttle, setThrottle] = useState(false);

  const postComment = () => {
    if (comment.trim().length === 0) {
      customToast('댓글을 입력해주세요.', 'error');
      return;
    }

    setThrottle(true);

    client
      .post(`/comments/create`, {
        postId,
        comment,
      })
      .then((res) => {
        const commentId = res.data._id;
        const postIdFromRes = res.data.post;

        return client.get(`/posts/${postIdFromRes}`).then((postRes) => {
          const postAuthorId = postRes.data.author._id;

          if (user._id !== postAuthorId) {
            return createNotification({
              notificationType: 'comment',
              notificationTypeId: commentId,
              userId: postAuthorId,
              postId: postIdFromRes,
              comment,
            });
          }
        });
      })
      .then(() => (refresh === 0 ? doRefresh() : resetRefresh()))
      .then(() => setComment(''))
      .catch((error) => console.log(`에러 발생: ${error}`))
      .finally(() => setThrottle(false));
  };

  const resizeComment = () => {
    if (commentRef.current) {
      commentRef.current.style.height = 'auto';
      commentRef.current.style.height = `${commentRef.current.scrollHeight}px`;
    }
  };

  return (
    <>
      <div className="flex items-start gap-[10px] px-1 py-[20px]">
        <img
          src={user.image || placeholderIcon}
          alt="profile"
          className="postProfile"
        />
        <div
          className={twMerge(
            'h-min-[110px] flex-1 rounded-xl bg-[var(--color-gray1)] p-4',
            isFocused ? 'commentBorder' : '',
          )}
        >
          <textarea
            ref={commentRef}
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              resizeComment();
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="댓글을 작성해 주세요"
            rows={2}
            className={twMerge(
              'textBasic',
              'w-full resize-none placeholder-[var(--color-gray4)] outline-none',
            )}
          />

          <div className="flex justify-end">
            <Button
              className={twMerge(
                'btn-style-comment',
                'bg-[var(--color-main)] text-[14px] text-white hover:bg-[var(--color-sub)]',
              )}
              onClick={postComment}
              disabled={throttle}
            >
              게시
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
