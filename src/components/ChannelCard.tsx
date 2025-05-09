import { TiStarFullOutline } from 'react-icons/ti';
import type { ChannelItem } from '../types/channel';

type ChannelCardProps = ChannelItem & {
  onClick?: () => void;
  onBookmarkToggle: () => void;
};

export default function ChannelCard({
  name,
  isSubscribe,
  imageUrl,
  onClick,
  onBookmarkToggle,
}: ChannelCardProps) {
  return (
    <div
      onClick={onClick}
      className="relative h-[180px] w-[260px] cursor-pointer overflow-hidden rounded-[12px] bg-[var(--color-bg-white)] shadow-md transition-shadow duration-300 hover:shadow-xl"
    >
      <img
        src={imageUrl}
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
            onBookmarkToggle();
          }}
          aria-label="즐겨찾기 토글"
        >
          <TiStarFullOutline
            className={`text-[20px] transition-colors ${
              isSubscribe
                ? 'text-[var(--color-sub)]'
                : 'text-[var(--color-gray4)] hover:text-[var(--color-sub)]'
            }`}
          />
        </button>
      </div>
    </div>
  );
}
