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
import { customToast } from '../utils/customToast';
import {
  subscribeChannel,
  unsubscribeChannel,
} from '../services/subscribeChannelApi';

export default function ChannelPage({ id }: { id: string }) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn); // 로그인 상태 확인
  const [isOpen, setIsOpen] = useState(false);
  const [channelData, setChannelData] = useState<Channel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);

  //구독 상태 전역 관리 및 서버 동기화
  const subscribes = useSubscriptionStore((state) => state.subscribes);
  const syncSubscribes = useSubscriptionStore((state) => state.syncSubscribes);

  const channelId = channelData?._id ?? '';
  const isSubscribed = subscribes.includes(channelId);

  const SubscribedHandler = async () => {
    if (subscribing) return; // 1초 동안 클릭 막음
    setSubscribing(true);

    // 구독/구독취소 로직
    try {
      if (isSubscribed) {
        await unsubscribeChannel(channelId);
        customToast('구독이 취소되었습니다.', 'info');
      } else {
        await subscribeChannel(channelId);
        customToast('채널을 구독하였습니다.', 'success');
      }
      await syncSubscribes(); // 서버와 동기화
    } catch (error) {
      customToast('오류가 발생했습니다.', 'error');
      console.error(error);
    } finally {
      setTimeout(() => setSubscribing(false), 1000);
    }
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

        //구독 상태 서버 동기화
        const { syncSubscribes } = useSubscriptionStore.getState();
        await syncSubscribes();
      } catch (err) {
        console.error('채널 불러오기 실패:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChannelData();
  }, [id]);
  const bannerImage = channelData ? getImagePreview(channelData._id) : '';
  return (
    <>
      {isLoading && (
        <div className="z-50 flex h-110 w-full items-center justify-center">
          <svg
            aria-hidden="true"
            className="h-8 w-8 animate-spin fill-[var(--color-main)] text-[var(--color-bg-white)]"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      )}
      {!isLoading && channelData && (
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
      {!isLoading && !channelData && <p>채널 정보를 불러올 수 없습니다.</p>}
    </>
  );
}
