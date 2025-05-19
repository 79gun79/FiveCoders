import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Channel } from '../types/channel';
import { fetchChannels } from '../services/channelApi';
import { useAuthStore } from '../stores/authStore';
import globeIcon from '../assets/globe.svg';
import homeIcon from '../assets/home.svg';
import { TiStarFullOutline } from 'react-icons/ti';
import { getImagePreview } from '../utils/localImage';
import UserList from './UserList';
import { channelIndexMapping } from '../utils/channelIndexMapping';
import { customToast } from '../utils/customToast';
import { useSubscriptionStore } from '../stores/subscriptionStore';
import { unsubscribeChannel } from '../services/subscribeChannelApi';
import { fetchCurrentUser } from '../services/userApi';
import { useModalStore } from '../stores/modalStore';
import { channelData } from '../data/channelData';

export default function Sidebar() {
  const navigate = useNavigate();
  const [channels, setChannels] = useState<Channel[]>([]);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  //구독 상태 전역 상태 관리
  const subscribes = useSubscriptionStore((state) => state.subscribes);
  //const setSubscribes = useSubscriptionStore((state) => state.setSubscribes);

  //구독한 채널 목록
  const subscribedChannels = channels.filter((channel) =>
    subscribes.includes(channel._id),
  );

  // 채널/유저 힌 번에 목록 불러오기
  useEffect(() => {
    const loadAllData = async () => {
      try {
        const [channelData, userData] = await Promise.all([
          fetchChannels(),
          fetchCurrentUser(),
        ]);
        setChannels(channelData);
        useSubscriptionStore
          .getState()
          .setSubscribes(
            userData.following?.map((follow) => follow.user) || [],
          );
      } catch (error) {
        console.error('Error: ', error);
      }
    };
    loadAllData();
  }, []);

  //구독 취소 핸들러 (별 아이콘 클릭)
  const unSubscribedHandler = async (
    e: React.MouseEvent,
    channelId: string,
  ) => {
    e.stopPropagation();
    await unsubscribeChannel(channelId);
    await useSubscriptionStore.getState().syncSubscribes();
    customToast('구독이 취소되었습니다.', 'info');
  };

  //모달 상태 전역 관리
  const { isLogInModal } = useModalStore();

  //채널 인덱스 저장
  const indexMap = channelIndexMapping(channels);

  //채널 이동 핸들러
  const channelClickHandler = (chanelId: string) => {
    const index = indexMap[chanelId];
    navigate(`/channel/${index}`);
  };

  return (
    <aside className="sticky top-0 flex h-screen w-[70px] flex-col border-r border-[var(--color-gray4)] bg-white xl:w-[280px]">
      <nav className="my-2.5 h-[130px] flex-col items-center">
        <ul className="p-3">
          <li
            className="flex cursor-pointer items-center justify-center rounded-xl py-3 hover:bg-[var(--color-gray2)] xl:justify-start xl:px-6"
            onClick={() => navigate('/')}
          >
            <img src={homeIcon} className="mb-2 h-5.5 w-5.5 xl:mr-[13px]" />
            <span className="hidden font-bold xl:inline">홈</span>
          </li>
          <li
            className="flex cursor-pointer items-center justify-center rounded-xl py-3 hover:bg-[var(--color-gray2)] xl:justify-start xl:px-6"
            onClick={() => navigate('/channel')}
          >
            <img src={globeIcon} className="h-5.5 w-5.5 xl:mr-[13px]" />
            <span className="hidden font-bold xl:inline">커뮤니티</span>
          </li>
        </ul>
      </nav>
      {/* 채널 목록과 유저리스트 */}
      <div className="flex min-h-0 flex-1 flex-col">
        {/* 채널 목록 */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="flex items-center px-4 xl:px-8">
            <span className="h-px flex-1 bg-[var(--color-gray4)]" />
          </div>
          <h2 className="mt-[25px] hidden px-8 py-2 text-[16px] text-[var(--color-gray8)] xl:block">
            즐겨찾는 커뮤니티
          </h2>
          {subscribedChannels.length <= 0 ? (
            <div className="p-3">
              <span
                onClick={() => {
                  if (isLoggedIn) {
                    navigate('/channel');
                  } else {
                    isLogInModal(true);
                  }
                }}
                className="hidden cursor-pointer px-2 py-2.5 text-[14px] text-[var(--color-gray6)] select-none hover:bg-[var(--color-gray2)] xl:block xl:px-8"
              >
                + 커뮤니티 찾기
              </span>
              <span
                onClick={() => {
                  if (isLoggedIn) {
                    navigate('/channel');
                  } else {
                    isLogInModal(true);
                  }
                }}
                className="block cursor-pointer rounded-full p-2 text-center text-[24px] text-[var(--color-gray6)] hover:bg-[var(--color-gray2)] xl:hidden"
                title="커뮤니티 찾기"
              >
                +
              </span>
            </div>
          ) : (
            <ul className="p-2.5">
              {subscribedChannels.map((item) => (
                <li
                  key={item._id}
                  className="flex cursor-pointer items-center justify-center rounded-xl py-2.5 hover:bg-[var(--color-gray2)] xl:justify-start xl:px-5.5"
                  onClick={() => channelClickHandler(item._id)}
                >
                  <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full xl:mr-3">
                    <img
                      src={
                        channelData.find(
                          (channel) => channel.name === item.name,
                        )?.bannerImg ||
                        getImagePreview(item._id) ||
                        homeIcon
                      }
                      alt="channelImg"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="test-sm hidden flex-1 xl:inline">
                    {item.name}
                  </span>
                  <button
                    onClick={(e) => unSubscribedHandler(e, item._id)}
                    className="hidden xl:block"
                  >
                    <TiStarFullOutline
                      className={`text-[20px] transition-colors ${'text-[var(--color-orange)] hover:text-[var(--color-gray3)]'}`}
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="flex items-center px-2 xl:px-6">
            <span className="h-px flex-1 bg-[var(--color-gray4)]" />
          </div>
          <UserList />
        </div>
      </div>
    </aside>
  );
}
