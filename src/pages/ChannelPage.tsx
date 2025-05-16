import { twMerge } from 'tailwind-merge';
import { FaPlus } from 'react-icons/fa';
import { TiStarFullOutline } from 'react-icons/ti';
import { useEffect, useState } from 'react';
import PostList from '../components/PostList';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { Channel, ChannelImg } from '../types/channel';
import { client } from '../services/axios';
import { useAuthStore } from '../stores/authStore';
import IsLoggedInModal from '../components/IsLoggedInModal';

export default function ChannelPage({
  id,
  info,
}: {
  id: string;
  info: ChannelImg;
}) {
  const isLoggedIn = useAuthStore.getState().isLoggedIn; // 로그인 상태 확인
  const [isOpen, setIsOpen] = useState(false);

  const [subscribes, setSubscribes] = useState(false); // 채널 구독 상태 관리
  const [channelId, setChannelId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  console.log('채널', id);

  useEffect(() => {
    const fetchChannelId = async () => {
      try {
        const { data } = await client.get<Channel[]>(`/channels`);

        const matchChannel = data.find((v) => v.name === info.name);
        if (!matchChannel) {
          console.log(`채널 ${info.name}을(를) 찾지 못했습니다.`);
          setIsLoading(false);
          return;
        }
        setChannelId(matchChannel._id);
      } catch (err) {
        console.error('채널 불러오기 실패:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchChannelId();
  }, [info]);

  console.log(channelId);

  return (
    <>
      {isLoading ? (
        <p>로딩 중입니다..</p>
      ) : (
        <div className="mb-[50px] flex min-w-[640px] flex-col gap-[30px]">
          <div className="postShadow items-center justify-center">
            <div
              className={twMerge('postBottom', 'h-[155px] border border-b-0')}
            >
              <img
                className="h-full w-full object-cover"
                src={info.bannerImg}
              />
            </div>
            <div
              className={twMerge(
                'postBottom',
                'flex h-[76px] items-center border px-[20px]',
              )}
            >
              <h3 className={twMerge('textH3', 'font-bold')}>{info.name}</h3>
              <TiStarFullOutline
                onClick={() => setSubscribes(!subscribes)}
                className={twMerge(
                  'ml-5 transition-colors hover:text-[var(--color-orange)]',
                  subscribes
                    ? 'text-[var(--color-orange)]'
                    : 'text-[var(--color-gray4)]',
                )}
                size={22}
              />
              <div className="flex-grow"></div>
              <Link
                to={isLoggedIn ? 'create' : '#'}
                state={isLoggedIn ? { channelId: channelId } : {}}
                onClick={(e) => {
                  if (!isLoggedIn) {
                    e.preventDefault();
                    setIsOpen(true);
                  }
                }}
              >
                <Button
                  className={twMerge(
                    'btn-style',
                    'textST1',
                    'h-[36px] w-[91px] px-4 py-2 font-normal',
                  )}
                >
                  <FaPlus className="mr-1 text-white" size={12} />
                  <span>글쓰기</span>
                </Button>
              </Link>
            </div>
          </div>
          <PostList key={channelId} channelId={channelId} />
          {isOpen && <IsLoggedInModal onClose={() => setIsOpen(false)} />}
        </div>
      )}
    </>
  );
}
