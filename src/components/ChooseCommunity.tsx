// import { TiStarFullOutline } from 'react-icons/ti';
import { twMerge } from 'tailwind-merge';
import { useEffect, useState } from 'react';
import { IoIosList } from 'react-icons/io';
import { Channel } from '../types/channel';
import { fetchChannels } from '../services/channelApi';
import { getImagePreview } from '../utils/localImage';
import { channelData } from '../data/channelData';

export default function ChooseCommunity({
  onChange,
}: {
  onChange: (
    channelName: string,
    channelIcon: string,
    channelLink: string,
    channelId: string,
  ) => void;
}) {
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchChannels();
        setChannels(data);
      } catch (error) {
        console.error('채널 목록을 불러오는 중 오류가 발생했습니다:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div
        className={twMerge(
          'listBorder',
          'absolute top-13 right-0 z-20 flex flex-col text-[12px] font-medium text-[var(--color-text-black)]',
        )}
      >
        {/* <div className="flex items-center gap-[6px]">
          <TiStarFullOutline className="text-[var(--color-sub)]" size={17} />
          <span className="leading-[30px]">즐겨찾는 커뮤니티</span>
        </div>
        <ul className="gap-[7px] px-1 pb-[10px] text-[13px] font-normal"></ul>
        <hr className="mr-[20px] border border-[var(--color-gray3)]" /> */}
        <div className="mt-1 flex items-center gap-[6px]">
          <IoIosList className="text-black" size={17} />
          <span className="leading-[30px]">전체 커뮤니티</span>
        </div>
        <ul className="gap-[7px] px-1 pb-[10px] text-[13px] font-normal">
          {channels.map((v, index) => {
            const bannerImg =
              channelData.find((channel) => channel.name === v.name)
                ?.bannerImg ||
              getImagePreview(v._id) ||
              '';
            return (
              <li
                key={v._id}
                className="flex cursor-pointer items-center gap-2"
                onClick={() =>
                  onChange(v.name, bannerImg, String(index), v._id)
                }
              >
                <img
                  className={twMerge('postProfile', 'h-[20px] w-[20px]')}
                  src={bannerImg}
                  alt="icon"
                />
                <span className="leading-[30px]">{v.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
