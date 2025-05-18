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
import { fetchCurrentUser } from '../services/userAPI';
import { useModalStore } from '../stores/modalStore';

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

  //채널 구독
  //로그인 O : 구독한 채널 있으면 채널 목록 표시 / 없으면 +커뮤니티 찾기 표시 -> /channels로 리다이렉트
  //로그인 X : + 커뮤니티 찾기 표시 -> 로그인하세요 모달

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
    <aside className="sticky top-0 flex h-screen w-[280px] flex-col border-r border-[var(--color-gray4)] bg-white">
      <nav className="my-2.5 h-[130px] flex-col items-center">
        <ul className="p-3">
          <li
            className="flex cursor-pointer items-center rounded-xl px-6 py-3 hover:bg-[var(--color-gray2)]"
            onClick={() => navigate('/')}
          >
            <img src={homeIcon} className="mr-[13px] h-5.5 w-5.5" />
            <span className="font-bold">홈</span>
          </li>
          <li
            className="flex cursor-pointer items-center rounded-xl px-6 py-3 hover:bg-[var(--color-gray2)]"
            onClick={() => navigate('/channel')}
          >
            <img src={globeIcon} className="mr-[13px] h-5.5 w-5.5" />
            <span className="font-bold">커뮤니티</span>
          </li>
        </ul>
      </nav>
      {/* 채널 목록과 유저리스트 */}
      <div className="flex min-h-0 flex-1 flex-col">
        {/* 채널 목록 */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="flex items-center px-8">
            <span className="h-px flex-1 bg-[var(--color-gray4)]" />
          </div>
          <h2 className="mt-[25px] px-8 py-2 text-[16px] text-[var(--color-gray8)]">
            즐겨찾는 커뮤니티
          </h2>
          {subscribedChannels.length <= 0 ? (
            <div className="p-2.5">
              <span
                onClick={() => {
                  if (isLoggedIn) {
                    navigate('/channel');
                  } else {
                    isLogInModal(true);
                  }
                }}
                className="block cursor-pointer px-8 py-2.5 text-[14px] text-[var(--color-gray6)] select-none hover:bg-[var(--color-gray2)]"
              >
                + 커뮤니티 찾기
              </span>
            </div>
          ) : (
            <ul className="p-2.5">
              {subscribedChannels.map((item) => (
                <li
                  key={item._id}
                  className="flex cursor-pointer items-center rounded-xl px-5.5 py-2.5 text-[16px] hover:bg-[var(--color-gray2)]"
                  onClick={() => channelClickHandler(item._id)}
                >
                  <div className="mr-3 h-6 w-6 flex-shrink-0 overflow-hidden rounded-full">
                    <img
                      src={getImagePreview(item._id) || homeIcon}
                      alt="channelImg"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="flex-1 text-sm">{item.name}</span>
                  <button onClick={(e) => unSubscribedHandler(e, item._id)}>
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
          <div className="flex items-center px-6">
            <span className="h-px flex-1 bg-[var(--color-gray4)]" />
          </div>
          <UserList />
        </div>
      </div>
    </aside>
  );
}
