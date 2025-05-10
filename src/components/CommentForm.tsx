import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from './Button';

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
        <img
          src="https://cdn.pixabay.com/photo/2025/03/20/21/00/vulture-9483838_1280.jpg"
          alt="profile"
          className="postProfile"
        />
        <div className="h-[110px] flex-1 rounded-xl bg-[#eeeeee] p-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="댓글을 작성해 주세요"
            rows={2}
            className={twMerge(
              'textBasic',
              'w-full resize-none placeholder-[#5a5a5a] outline-none',
            )}
          />

          <div className="flex justify-end gap-2">
            <Button
              className={twMerge('btn-style-comment', 'text-[14px]')}
              onClick={() => setComment('')}
            >
              취소
            </Button>
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
