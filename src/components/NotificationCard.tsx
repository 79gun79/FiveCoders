import { useNavigate } from 'react-router-dom';
import { Notification } from '../types/notification';

type NotificationCardProps = Notification & {
  onRead: (id: string) => void;
};

export default function NotificationCard({
  id,
  name,
  nickname,
  profileImg,
  createdAt,
  content,
  isRead,
  onRead,
}: NotificationCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    onRead(id);
    navigate(`/channel/${id}`);
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


  return (
    <div
      className="flex items-start gap-4 border-b px-7 py-3 last:border-none hover:bg-[var(--color-gray1)] cursor-pointer"
      onClick={handleClick}
    >
      {profileImg && (
        <div className="relative w-6 h-6 mt-1 aspect-square">
          <img
            src={profileImg}
            alt="profile"
            className="w-full h-full ml-1 rounded-full object-cover"
          />
          {!isRead && (
            <span className="absolute -left-3 top-2 inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-red-caution)]" />
          )}
        </div>
      )}
      <div className="text-sm w-full max-w-[250px]">
        <p className="font-medium truncate">{name}</p>
        <p className="font-medium truncate">{nickname}</p>
        <p className="text-[14px] text-[var(--color-gray6)] truncate">{content}</p>
        <p className="mt-1 text-xs text-[var(--color-gray4)]">
          {formatDate(createdAt)}
        </p>
      </div>
    </div>
  );
}