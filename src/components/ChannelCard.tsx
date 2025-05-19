import { useEffect, useState } from 'react';
import { TiStarFullOutline } from 'react-icons/ti';
import type { ReactNode } from 'react';
import type { Channel } from '../types/channel';
import defaultChannelImg from '../assets/channelImg.svg';
import { getImagePreview } from '../utils/localImage';
import { channelData } from '../data/channelData';

type ChannelCardProps = Channel & {
  onClick?: () => void;
  onBookmarkClick?: () => void;
  isSubscribe?: boolean;
  children?: ReactNode;
};

export default function ChannelCard({
  _id,
  name,
  onClick,
  onBookmarkClick,
  isSubscribe = false,
  children,
}: ChannelCardProps) {
  const [localImage, setLocalImage] = useState<string | null>(null);

  useEffect(() => {
    const preview = getImagePreview(_id);
    if (preview) {
      setLocalImage(preview);
    }
    //console.log(_id);
    //console.log(preview);
  }, [_id]);

  const matchedChannel = channelData.find((channel) => channel.name === name);
  const bannerImg = matchedChannel?.bannerImg || defaultChannelImg;

  return (
    <div
      onClick={onClick}
      className="relative h-[180px] w-[260px] cursor-pointer overflow-hidden rounded-[12px] bg-[var(--color-bg-white)] shadow-md transition-shadow duration-300 hover:shadow-xl"
    >
      <img
        src={localImage || bannerImg}
        alt={name}
        className="h-[130px] w-full object-cover"
      />
      <div className="pointer-events-none absolute top-0 left-0 h-[130px] w-full bg-black/30" />
      <div className="absolute bottom-0 left-0 flex h-[50px] w-full items-center justify-between bg-[var(--color-bg-white)] px-4">
        <span className="text-sm font-medium text-[var(--color-black)]">
          {name}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBookmarkClick?.();
          }}
          aria-label="즐겨찾기"
          className="cursor-pointer"
        >
          <TiStarFullOutline
            className={`text-[20px] transition-colors ${
              isSubscribe
                ? 'text-[var(--color-orange)]'
                : 'text-[var(--color-gray4)] hover:text-[var(--color-orange)]'
            }`}
          />
        </button>
      </div>
      {children && (
        <div className="absolute top-2 right-2 z-10">{children}</div>
      )}
    </div>
  );
}
