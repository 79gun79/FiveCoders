import { useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from './Button';
import placeholderIcon from '../assets/channelImg.svg';

export default function CommentForm({
  addComment,
}: {
  addComment: (comment: string) => void;
}) {
  const [comment, setComment] = useState(''); // 댓글 입력 내용
  const [isFocused, setFocused] = useState(false); // 댓글 창 포커스 상태
  const commentRef = useRef<HTMLTextAreaElement>(null); // 댓글 입력 내용 줄 수 확인 용도

  const postComment = () => {
    if (!comment.trim()) return;
    addComment(comment);
    setComment('');
  };

  const resizeComment = () => {
    if (commentRef.current) {
      commentRef.current.style.height = 'auto';
      commentRef.current.style.height = `${commentRef.current.scrollHeight}px`;
    } // 댓글 입력 내용에 따라 입력창 크기 변화
  };

  return (
    <>
      <div className="flex items-start gap-[10px] px-1 py-[20px]">
        <img src={placeholderIcon} alt="profile" className="postProfile" />
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
            >
              게시
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
