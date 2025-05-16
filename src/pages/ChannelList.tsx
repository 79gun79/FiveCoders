import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChannelCard from '../components/ChannelCard';
import type { Channel } from '../types/channel';
import IsLoggedInModal from '../components/IsLoggedInModal';
import { fetchChannels, deleteChannel } from '../services/channelApi';
import { useAuthStore } from '../stores/authStore';
import {
  getSubscribedChannels,
  setSubscribedChannels,
} from '../utils/localSubscribe';
import CreateChannelForm from '../components/CreateChannelForm';
import { FaTrashAlt } from 'react-icons/fa';
import { createPortal } from 'react-dom';
import { getImagePreview, setImagePreview } from '../utils/localImage';
import { channelData } from '../data/channelData';

export default function ChannelList() {
  const navigate = useNavigate();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [subscribes, setSubscribes] = useState<string[]>([]);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const [modalOpen, setModalOpen] = useState(false);
  const [createChannelModalOpen, setCreateChannelModalOpen] = useState(false);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // 인덱스 매핑 테이블
  const [indexMapping, setIndexMapping] = useState<Record<string, number>>({});

  const toggleSubscribe = (id: string) => {
    if (!isLoggedIn) {
      setModalOpen(true);
      return;
    }

    const updatedSubscribes = subscribes.includes(id)
      ? subscribes.filter((sub) => sub !== id)
      : [...subscribes, id];

    setSubscribes(updatedSubscribes);
    setSubscribedChannels(updatedSubscribes);
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

        // 인덱스 매핑 생성
        const mapping = channels.reduce<Record<string, number>>(
          (acc, channel, index) => {
            acc[channel._id] = index;
            return acc;
          },
          {},
        );
        setIndexMapping(mapping);

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
      }
    };

    const initialSubscribedChannels = getSubscribedChannels();
    setSubscribes(initialSubscribedChannels);

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

      {modalOpen && <IsLoggedInModal onClose={() => setModalOpen(false)} />}

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
