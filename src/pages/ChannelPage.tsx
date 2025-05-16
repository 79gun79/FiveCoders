import { twMerge } from 'tailwind-merge';
import { FaPlus } from 'react-icons/fa';
import { TiStarFullOutline } from 'react-icons/ti';
import { useEffect, useState } from 'react';
import PostList from '../components/PostList';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import IsLoggedInModal from '../components/IsLoggedInModal';
import { fetchChannels } from '../services/channelApi';
import { Channel } from '../types/channel';
import { getImagePreview } from '../utils/localImage';
import { useSubscriptionStore } from '../stores/subscriptionStore';
import { setSubscribedChannels } from '../utils/localSubscribe';
import { customToast } from '../utils/customToast';

export default function ChannelPage({ id }: { id: string }) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn); // 로그인 상태 확인
  const [isOpen, setIsOpen] = useState(false);
  const [channelData, setChannelData] = useState<Channel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);

  //구독 상태 전역 관리
  const subscribes = useSubscriptionStore((state) => state.subscribes);
  const setSubscribes = useSubscriptionStore((state) => state.setSubscribes);

  const channelId = channelData?._id ?? '';
  const isSubscribed = subscribes.includes(channelId);

  const SubscribedHandler = () => {
    if (subscribing) return; // 1초 동안 클릭 막음
    setSubscribing(true);

    // 구독/구독취소 로직
    let updated;
    if (isSubscribed) {
      updated = subscribes.filter((subId) => subId !== channelId);
      customToast('구독이 취소되었습니다.', 'info');
    } else {
      updated = [...subscribes, channelId];
      customToast('채널을 구독하였습니다.', 'success');
    }
    setSubscribes(updated);
    setSubscribedChannels(updated);

    // 1초 뒤에 다시 클릭 가능
    setTimeout(() => setSubscribing(false), 1000);
  };

  useEffect(() => {
    const fetchChannelData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchChannels();

        // ✅ 인덱스를 기준으로 채널 정보 가져오기
        const index = parseInt(id, 10);
        if (data[index]) {
          setChannelData(data[index]);
        } else {
          console.error(`해당 인덱스 ${id}에 채널이 없습니다.`);
        }
      } catch (err) {
        console.error('채널 불러오기 실패:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChannelData();
  }, [id]);
  if (!channelData) {
    return <p>해당 채널 정보를 찾을 수 없습니다.</p>;
  }
  const bannerImage = getImagePreview(channelData._id);
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
                src={bannerImage || '/gammue.ico'}
              />
            </div>
            <div
              className={twMerge(
                'postBottom',
                'flex h-[76px] items-center border px-[20px]',
              )}
            >
              <h3 className={twMerge('textH3', 'font-bold')}>
                {channelData.name}
              </h3>
              <TiStarFullOutline
                onClick={SubscribedHandler}
                className={twMerge(
                  'ml-5 transition-colors hover:text-[var(--color-orange)]',
                  isSubscribed
                    ? 'text-[var(--color-orange)]'
                    : 'text-[var(--color-gray4)]',
                )}
                size={22}
              />
              <div className="flex-grow"></div>
              <Link
                to={isLoggedIn ? 'create' : '#'}
                state={isLoggedIn ? { channelId: id } : {}}
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
          <PostList key={channelData._id} channelId={channelData._id} />
          {isOpen && <IsLoggedInModal onClose={() => setIsOpen(false)} />}
        </div>
      )}
    </>
  );
}
