import { HiTrash } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';
import Button from './Button';
import defaultProfileImage from '../assets/channelImg.svg';
import { client } from '../services/axios';
import { useRefreshStore } from '../stores/refreshStore';
import { customToast } from '../utils/customToast';
import { customConfirm } from '../utils/customConfirm';

export default function CommentList({
  commentId,
  authorId,
  authorName,
  comment,
  profileImg,
  userId,
}: {
  commentId: string;
  authorId: string;
  authorName: string;
  comment: string;
  profileImg: string;
  userId: string;
}) {
  const refresh = useRefreshStore((state) => state.refresh);
  const doRefresh = useRefreshStore((state) => state.do);
  const resetRefresh = useRefreshStore((state) => state.reset);

  const commentDelete = async () => {
    const isConfirmed = await customConfirm('댓글을 삭제하시겠습니까?');
    const deleteComment = { id: `${commentId}` };
    if (!isConfirmed) return;

    try {
      await client
        .delete(`/comments/delete`, { data: deleteComment })
        .then(() => (refresh === 0 ? doRefresh() : resetRefresh()));
      customToast(
        '댓글이 삭제되었습니다.',
        'success',
        <HiTrash className="text-[var(--color-sub)]" size={24} />,
      );
    } catch (error) {
      customToast('댓글 삭제에 실패했습니다.', 'error');
      throw error;
    }
  };

  return (
    <>
      <div
        className={twMerge('postBottom', 'flex flex-col gap-2 px-1 py-[16px]')}
      >
        <div className="flex items-center gap-[10px]">
          <img
            src={profileImg || defaultProfileImage}
            alt="profile"
            className="postProfile"
          />
          <p className="text-base font-medium">{authorName}</p>
          <div className="flex-grow"></div>
          {userId === authorId && (
            <Button
              onClick={commentDelete}
              className={twMerge('btn-style-post', 'h-fit w-[37px]')}
            >
              <HiTrash className="text-[var(--color-gray4)]" size={13} />
            </Button>
          )}
        </div>
        <p className="textST1 ml-[42px] text-[var(--color-gray8)]">{comment}</p>
      </div>
    </>
  );
}
