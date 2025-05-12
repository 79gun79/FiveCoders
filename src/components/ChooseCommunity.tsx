import { TiStarFullOutline } from 'react-icons/ti';
import { twMerge } from 'tailwind-merge';
import { useEffect, useState } from 'react';
import { IoIosList } from 'react-icons/io';
import { Channel } from '../types/channel';
import { dummyChannels } from '../data/dummyChannels';

export default function ChooseCommunity({
  onChange,
}: {
  onChange: (
    channelName: string,
    channelIcon: string,
    channelId: string,
  ) => void;
}) {
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    setChannels(dummyChannels);
  }, []);

  return (
    <>
      <div
        className={twMerge(
          'listBorder',
          'absolute top-13 right-0 z-20 flex flex-col text-[12px] font-medium text-[var(--color-text-black)]',
        )}
      >
        <div className="flex items-center gap-[6px]">
          <TiStarFullOutline className="text-[var(--color-sub)]" size={17} />
          <span className="leading-[30px]">즐겨찾는 커뮤니티</span>
        </div>
        <ul className="gap-[7px] px-1 pb-[10px] text-[13px] font-normal"></ul>
        <hr className="mr-[20px] border border-[var(--color-gray3)]" />
        <div className="mt-1 flex items-center gap-[6px]">
          <IoIosList className="text-black" size={17} />
          <span className="leading-[30px]">전체 커뮤니티</span>
        </div>
        <ul className="gap-[7px] px-1 pb-[10px] text-[13px] font-normal">
          {channels.map((v) => (
            <li
              key={v._id}
              className="flex cursor-pointer items-center gap-2"
              onClick={() => onChange(v.name, v.imageUrl, v._id)}
            >
              <img
                className={twMerge('postProfile', 'h-[20px] w-[20px]')}
                src={v.imageUrl}
                alt="icon"
              />
              <span className="leading-[30px]">{v.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
