import { useNavigate } from 'react-router-dom';
import { Notification } from '../types/notification';
import defaultProfileImg from '../assets/imgs/defaultProfileImg.png';

type NotificationCardProps = Notification & {
  onRead: (id: string) => void;
};

export default function NotificationCard({
  id,
  createdAt,
  isRead,
  notificationType,
  postId,
  author,
  comment,
  onRead,
}: NotificationCardProps) {
  const navigate = useNavigate();

  // 알림 누르면 해당 글로 이동하는 부분 구현 못하겟슴다. . .
  const handleClick = () => {
    onRead(id);
    navigate(`/channel/${3}#${postId}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = String(date.getFullYear()).slice(2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
  };

  const renderContent = () => {
    if (notificationType === 'like') {
      return `${author.fullName}님이 회원님의 게시글을 좋아합니다.`;
    } else if (notificationType === 'comment') {
      return `${author.fullName}님이 댓글을 남겼습니다: ${comment?.comment ?? ''}`;
    }
    return '';
  };

  return (
    <div
      className="flex cursor-pointer items-start gap-1 px-4 py-3 hover:bg-[var(--color-gray1)]"
      onClick={handleClick}
    >
      <div className="flex items-center justify-center w-5 h-full mt-3">
        <span
          className={`h-2 w-2 rounded-full ${isRead ? 'bg-[var(--color-gray3)]' : 'bg-[var(--color-red-caution)]'
            }`}
        />
      </div>

      <div className="h-8 w-8 shrink-0 mr-2">
        <img
          src={author.image ?? defaultProfileImg}
          alt="profile"
          className="h-full w-full rounded-full object-cover"
        />
      </div>

      <div className="flex flex-col text-sm w-[230px]">
        <p className="line-clamp-2 text-[13px] text-[var(--color-gray6)] break-words">
          {renderContent()}
        </p>
        <p className="mt-1 text-[11px] text-[var(--color-gray4)]">
          {formatDate(createdAt)}
        </p>
      </div>
    </div>
  );
}