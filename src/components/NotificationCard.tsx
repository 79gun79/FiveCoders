import { useNavigate } from 'react-router-dom';
import { Notification } from '../types/notification';
import defaultProfileImg from '../assets/imgs/defaultProfileImg.png';
import { useEffect, useState } from 'react';
import { getPostById } from '../services/postApi';
import { fetchChannels } from '../services/channelApi';
import { Channel } from '../types/channel';
import LoadingUI from './LoadingUI';
import { Post } from '../types/post';

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
  const [post, setPost] = useState<Post | null>(null);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);

  const handleClick = () => {
    onRead(id);
    const channelIndex = channels.findIndex(
      (channel) => channel._id === post?.channel._id,
    );
    navigate(`/channel/${channelIndex}#${postId}`);
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
      return `${author.fullName}님이 댓글을 남겼습니다:${
        comment?.comment ? ' ' + comment.comment : ''
      }`;
    }
    return '';
  };

  useEffect(() => {
    const loadChannels = async () => {
      try {
        const ch = await fetchChannels();
        setChannels(ch);
      } catch (error) {
        console.error('채널 정보를 불러오지 못했습니다.', error);
      }
    };
    loadChannels();
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true); // 로딩 시작

      try {
        const response = await getPostById(postId);
        setPost(response.data);
      } catch (err) {
        console.error(`게시물 정보를 불러오지 못했습니다.`, err);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };
    fetchPost();
  }, [postId]);

  if (loading) {
    return <LoadingUI />;
  }

  return (
    <div
      className="flex cursor-pointer items-start gap-3 px-4 py-3 hover:bg-[var(--color-gray1)]"
      onClick={handleClick}
    >
      <div className="pt-3">
        <span
          className={`block h-2 w-2 rounded-full ${
            isRead ? 'bg-[var(--color-gray3)]' : 'bg-[var(--color-red-caution)]'
          }`}
        />
      </div>

      <div className="h-8 w-8 shrink-0">
        <img
          src={author.image ?? defaultProfileImg}
          alt="profile"
          className="h-full w-full rounded-full object-cover"
        />
      </div>

      <div className="flex max-w-[230px] flex-col text-sm">
        <p className="line-clamp-2 text-[13px] break-words text-[var(--color-gray6)]">
          {renderContent()}
        </p>
        <p className="mt-1 text-[11px] text-[var(--color-gray4)]">
          {formatDate(createdAt)}
        </p>
      </div>
    </div>
  );
}
