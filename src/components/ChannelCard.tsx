import { TiStarFullOutline } from "react-icons/ti";
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
            className="relative w-[260px] h-[180px] rounded-[12px] overflow-hidden bg-[var(--color-bg-white)] shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        >
            <img
                src={imageUrl}
                alt={name}
                className="w-full h-[130px] object-cover"
            />

            <div className="absolute top-0 left-0 w-full h-[130px] bg-black/30 pointer-events-none" />

            <div className="absolute bottom-0 left-0 w-full h-[50px] bg-[var(--color-bg-white)] flex items-center justify-between px-4">
                <span className="text-sm font-medium text-[var(--color-black)]">{name}</span>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onBookmarkToggle();
                    }}
                    aria-label="즐겨찾기 토글"
                >
                    <TiStarFullOutline
                        className={`text-[20px] transition-colors ${isSubscribe
                                ? "text-[var(--color-sub)]"
                                : "text-[var(--color-gray4)] hover:text-[var(--color-sub)]"
                            }`}
                    />
                </button>
            </div>
        </div>
    );
}