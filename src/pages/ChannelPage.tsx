import { twMerge } from 'tailwind-merge';
import { FaPlus } from 'react-icons/fa';
import { TiStarFullOutline } from 'react-icons/ti';
import { useEffect, useState } from 'react';
import PostList from '../components/PostList';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { fetchChannels } from '../services/channelApi';
import { Channel } from '../types/channel';
import { getImagePreview } from '../utils/localImage';
import { useSubscriptionStore } from '../stores/subscriptionStore';
import { customToast } from '../utils/customToast';
import {
  subscribeChannel,
  unsubscribeChannel,
} from '../services/subscribeChannelApi';
import { useModalStore } from '../stores/modalStore';
import LoadingUI from '../components/LoadingUI';
import { channelData } from '../data/channelData';

export default function ChannelPage({ id }: { id: string }) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn); // 로그인 상태 확인
  const [channelInfo, setChannelInfo] = useState<Channel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);

  //구독 상태 전역 관리 및 서버 동기화
  const subscribes = useSubscriptionStore((state) => state.subscribes);
  const syncSubscribes = useSubscriptionStore((state) => state.syncSubscribes);

  //로그인 모달 상태 전역 관리
  const { isLogInModal } = useModalStore();

  const channelId = channelInfo?._id ?? '';
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
          setChannelInfo(data[index]);
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
  const bannerImage = channelInfo ? getImagePreview(channelInfo._id) : '';

  const matchedChannel = channelData.find(
    (channel) => channel.name === channelInfo?.name,
  );
  const bannerImg = matchedChannel?.bannerImg || '/gammue.ico';

  return (
    <>
      {isLoading && <LoadingUI />}
      {!isLoading && channelInfo && (
        <div className="container mx-auto mb-[50px] flex flex-col gap-[30px]">
          <div className="postShadow w-full items-center justify-center">
            <div
              className={twMerge(
                'postBottom',
                'overflow-hidden border border-b-0',
              )}
            >
              <img
                className="h-[155px] w-full object-cover"
                src={bannerImage || bannerImg}
              />
            </div>
            <div
              className={twMerge(
                'postBottom',
                'flex h-[76px] items-center border px-[20px]',
              )}
            >
              <h3 className={twMerge('textH3', 'font-bold')}>
                {channelInfo.name}
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
                    isLogInModal(true);
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
          <PostList key={channelInfo._id} channelId={channelInfo._id} />
        </div>
      )}
      {!isLoading && !channelInfo && <p>채널 정보를 불러올 수 없습니다.</p>}
    </>
  );
}
