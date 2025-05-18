import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ChannelCard from '../components/ChannelCard';
import type { Channel } from '../types/channel';
import { fetchChannels, deleteChannel } from '../services/channelApi';
import { useAuthStore } from '../stores/authStore';
import CreateChannelForm from '../components/CreateChannelForm';
import { FaTrashAlt } from 'react-icons/fa';
import { createPortal } from 'react-dom';
import { getImagePreview, setImagePreview } from '../utils/localImage';
import { channelData } from '../data/channelData';
import { channelIndexMapping } from '../utils/channelIndexMapping';
import { useSubscriptionStore } from '../stores/subscriptionStore';
import { customToast } from '../utils/customToast';
import {
  subscribeChannel,
  unsubscribeChannel,
} from '../services/subscribeChannelApi';
import { useModalStore } from '../stores/modalStore';

export default function ChannelList() {
  const navigate = useNavigate();
  const [channels, setChannels] = useState<Channel[]>([]);
  //const [subscribes, setSubscribes] = useState<string[]>([]);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const [createChannelModalOpen, setCreateChannelModalOpen] = useState(false);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  //구독 상태 전역 상태 관리
  const subscribes = useSubscriptionStore((state) => state.subscribes);
  const syncSubscribes = useSubscriptionStore((state) => state.syncSubscribes);

  //모달 상태 전역 관리
  const { isLogInModal } = useModalStore();

  //다중 클릭 방지
  const [subscribeLock, setSubscribeLock] = useState(false);
  const subscribeTimeout = useRef<NodeJS.Timeout | null>(null);

  // 인덱스 매핑 테이블
  const [indexMapping, setIndexMapping] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  //구독/구독취소 핸들러
  const toggleSubscribe = async (id: string) => {
    if (!isLoggedIn) {
      isLogInModal(true);
      return;
    }
    if (subscribeLock) return;
    setSubscribeLock(true);

    try {
      if (subscribes.includes(id)) {
        await unsubscribeChannel(id);
        customToast('구독이 취소되었습니다.', 'info');
      } else {
        await subscribeChannel(id);
        customToast('채널을 구독하였습니다.', 'success');
      }
      await syncSubscribes(); //서버와 동기화
    } catch (error) {
      customToast('오류가 발생했습니다.', 'error');
      console.error(error);
    } finally {
      if (subscribeTimeout.current) clearTimeout(subscribeTimeout.current);
      subscribeTimeout.current = setTimeout(
        () => setSubscribeLock(false),
        1000,
      );
    }
  };

  const onClickDeleteBtn = (id: string) => {
    setDeleteTargetId(id);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!deleteTargetId) return;

    try {
      await deleteChannel(deleteTargetId);
      setChannels((prev) =>
        prev.filter((channel) => channel._id !== deleteTargetId),
      );
      setDeleteConfirmOpen(false);
      setDeleteTargetId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateChannelClick = () => {
    setCreateChannelModalOpen(true);
  };

  const closeCreateChannelModal = () => {
    setCreateChannelModalOpen(false);
  };

  const handleChannelCreated = (channel: Channel) => {
    setChannels((prev) => [...prev, channel]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const channels = await fetchChannels();
        setChannels(channels);

        // 인덱스 매핑 함수 이용 utils/channelIndexMapping.ts
        const mapping = channelIndexMapping(channels);
        setIndexMapping(mapping);

        //구독 상태 동기화
        const { syncSubscribes } = useSubscriptionStore.getState();
        await syncSubscribes();

        //이미지 프리뷰 설정
        channels.forEach((channel) => {
          const matchedChannel = channelData.find(
            (c) => c.name === channel.name,
          );
          if (!getImagePreview(channel._id) && matchedChannel) {
            setImagePreview(channel._id, matchedChannel.bannerImg);
          }
        });
      } catch (error) {
        console.error('채널 불러오기 실패', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const groupedByGenre = channels.reduce<Record<string, Channel[]>>(
    (acc, channel) => {
      const genre = channel.description || '기타';
      if (!acc[genre]) acc[genre] = [];
      acc[genre].push(channel);
      return acc;
    },
    {},
  );

  return (
    <>
      {loading && (
        <div className="z-50 flex h-120 items-center justify-center">
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

      {!loading && (
        <div className="mx-[100px]">
          <div className="mb-18 flex items-center justify-between pr-4">
            <h1 className="relative inline-block text-[28px] font-bold">
              커뮤니티
              <span className="absolute bottom-[-9px] left-0 h-[4px] w-[97px] bg-[var(--color-main)]" />
            </h1>

            {isAdmin && (
              <button
                onClick={handleCreateChannelClick}
                className="cursor-pointer rounded-md bg-[var(--color-main)] px-4 py-2 text-sm font-semibold text-[var(--color-bg-white)] transition-colors hover:bg-[var(--color-sub)]"
              >
                + 채널 생성
              </button>
            )}
          </div>

          {Object.entries(groupedByGenre).map(([genre, items]) => (
            <div key={genre} className="mb-20">
              <h2 className="mb-4 text-xl font-semibold">{genre}</h2>
              <div className="grid grid-cols-1 gap-x-[32px] gap-y-[24px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {items.map((channel) => (
                  <ChannelCard
                    key={channel._id}
                    {...channel}
                    onClick={() =>
                      navigate(`/channel/${indexMapping[channel._id]}`)
                    }
                    onBookmarkClick={() => toggleSubscribe(channel._id)}
                    isSubscribe={subscribes.includes(channel._id)}
                  >
                    {isAdmin && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onClickDeleteBtn(channel._id);
                        }}
                        className="group hover:bg-red-70 absolute top-1 right-1 z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[var(--color-gray3)] bg-[var(--color-bg-white)] shadow-sm transition hover:text-[var(--color-red-caution)]"
                      >
                        <FaTrashAlt
                          className="text-[var(--color-gray4)] transition group-hover:text-[var(--color-red-caution)]"
                          size={16}
                        />
                      </button>
                    )}
                  </ChannelCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {createChannelModalOpen && (
        <CreateChannelForm
          onClose={closeCreateChannelModal}
          onCreate={handleChannelCreated}
        />
      )}

      {deleteConfirmOpen &&
        createPortal(
          <>
            <div
              onClick={() => setDeleteConfirmOpen(false)}
              className="fixed inset-0 z-[1000] bg-[var(--color-text-black)] opacity-50"
            />
            <div
              className="fixed inset-0 z-[1001] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-[400px] rounded-[8px] bg-[var(--color-bg-white)] p-8 text-center shadow-lg">
                <p className="mb-[28px] text-[18px] font-medium">
                  채널을 삭제하시겠습니까?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setDeleteConfirmOpen(false)}
                    className="btn-style-modal rounded border border-[var(--color-gray4)] bg-[var(--color-bg-white)] px-4 py-2 text-[var(--color-text-black)] hover:bg-[var(--color-gray3)]"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleDeleteConfirmed}
                    className="btn-style-modal rounded bg-red-600 px-4 py-2 text-[var(--color-bg-white)] hover:bg-red-700"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          </>,
          document.body,
        )}
    </>
  );
}
