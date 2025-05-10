import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from './Button';
import placeholderIcon from '../assets/channelImg.svg';

export default function CommentForm({
  addComment,
}: {
  addComment: (comment: string) => void;
}) {
  const [comment, setComment] = useState('');
  const postComment = () => {
    if (!comment.trim()) return;
    addComment(comment);
    setComment('');
  };

  return (
    <>
      <div className="flex items-start gap-[10px] px-1 py-[20px]">
        <img src={placeholderIcon} alt="profile" className="postProfile" />
        <div className="h-[110px] flex-1 rounded-xl bg-[var(--color-gray2)] p-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="댓글을 작성해 주세요"
            rows={2}
            className={twMerge(
              'textBasic',
              'w-full resize-none placeholder-[var(--color-gray5)] outline-none',
            )}
          />

          <div className="flex justify-end">
            <Button
              className={twMerge(
                'btn-style-comment',
                'bg-[var(--color-main)] text-[14px] text-white hover:bg-[var(--color-sub)]',
              )}
              onClick={postComment}
            >
              게시
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
