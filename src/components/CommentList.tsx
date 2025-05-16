import { HiTrash } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';
import Button from './Button';

export default function CommentList({
  commentId,
  comment,
  userName,
  profileImg,
  // onDelete,
}: {
  commentId: string;
  comment: string;
  userName: string;
  profileImg: string;
  // onDelete: (id: string) => void;
}) {
  return (
    <>
      <div
        className={twMerge('postBottom', 'flex flex-col gap-2 px-1 py-[16px]')}
      >
        <div className="flex items-center gap-[10px]">
          <img src={profileImg} alt="profile" className="postProfile" />
          <p className="text-base font-medium">{userName}</p>
          <div className="flex-grow"></div>
          <Button
            // onClick={() => onDelete(commentId)}
            className={twMerge('btn-style-post', 'h-fit w-[37px]')}
          >
            <HiTrash className="text-[var(--color-gray4)]" size={13} />
          </Button>
        </div>
        <p className="textST1 ml-[42px] text-[var(--color-gray8)]">{comment}</p>
      </div>
    </>
  );
}
