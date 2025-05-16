import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Channel } from '../types/channel';

import IsLoggedInModal from './IsLoggedInModal';

import { fetchChannels } from '../services/channelApi';
import { useAuthStore } from '../stores/authStore';

import globeIcon from '../assets/globe.svg';
import homeIcon from '../assets/home.svg';
import { TiStarFullOutline } from 'react-icons/ti';
import { setSubscribedChannels } from '../utils/localSubscribe';
import { getImagePreview } from '../utils/localImage';
import UserList from './UserList';
import { channelIndexMapping } from '../utils/channelIndexMapping';
import { customToast } from '../utils/customToast';
import { useSubscriptionStore } from '../stores/subscriptionStore';

export default function Sidebar() {
  const navigate = useNavigate();
  const [channels, setChannels] = useState<Channel[]>([]);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [modalOpen, setModalOpen] = useState(false);
  //구독 상태 전역 상태 관리
  const subscribes = useSubscriptionStore((state) => state.subscribes);
  const setSubscribes = useSubscriptionStore((state) => state.setSubscribes);

  //구독한 채널 목록
  const subscribedChannels = channels.filter((channel) =>
    subscribes.includes(channel._id),
  );

  //채널 구독
  //로그인 O : 구독한 채널 있으면 채널 목록 표시 / 없으면 +커뮤니티 찾기 표시 -> /channels로 리다이렉트
  //로그인 X : + 커뮤니티 찾기 표시 -> 로그인하세요 모달
  // useEffect(() => {
  //   setSubscribes(getSubscribedChannels()); // 로컬에 저장
  // }, [setSubscribes]);

  //구독한 채널 목록 불러오기
  useEffect(() => {
    const getChannels = async () => {
      try {
        const data = await fetchChannels();
        setChannels(data);
      } catch (error) {
        console.error('Error: ', error);
      }
    };
    getChannels();
  }, []);

  //구독 취소 핸들러 (별 아이콘 클릭)
  const unSubscribedHandler = (e: React.MouseEvent, channelId: string) => {
    e.stopPropagation();
    const update = subscribes.filter((id) => id !== channelId); //목록 갱신
    setSubscribes(update);
    setSubscribedChannels(update); //로컬 저장
    customToast('구독이 취소되었습니다.', 'info');
  };

  //모달 핸들러
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  //채널 인덱스 저장
  const indexMap = channelIndexMapping(channels);

  //채널 이동 핸들러
  const channelClickHandler = (chanelId: string) => {
    const index = indexMap[chanelId];
    navigate(`/channel/${index}`);
  };

  console.log(subscribes);

  return (
    <aside className="sticky top-0 flex h-screen w-[280px] flex-col border-r border-[var(--color-gray4)] bg-white">
      <nav>
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
      <div className="w-[280px] flex-1 overflow-y-auto">
        <div className="mt-[10px] flex items-center px-8">
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
                  openModal();
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
                    src={getImagePreview(item._id)}
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
        {modalOpen && <IsLoggedInModal onClose={closeModal} />}
      </div>
      <UserList />
    </aside>
  );
}
