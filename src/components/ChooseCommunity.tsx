import { TiStarFullOutline } from 'react-icons/ti';
import { twMerge } from 'tailwind-merge';
// import placeholderIcon from "../assets/channelImg.svg";
import fcOnline from '../assets/fcOnline.jpg';
import { useEffect, useState } from 'react';
import { IoIosList } from 'react-icons/io';

export default function ChooseCommunity({
  onChange,
}: {
  onChange: (c1: string, c2: string) => void;
}) {
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    const fetchChaanels = async () => {
      try {
        setChannels([
          {
            authRequired: false,
            posts: [],
            _id: '68171bbe833d4243f6b9fb4f',
            name: '서든어택',
            description: 'string',
            createdAt: '2025-05-04T07:48:14.080Z',
            updatedAt: '2025-05-04T07:48:14.080Z',
            __v: 0,
          },
          {
            authRequired: false,
            posts: [],
            _id: '68171bd2833d4243f6b9fb54',
            name: '배틀그라운드',
            description: 'string',
            createdAt: '2025-05-04T07:48:34.491Z',
            updatedAt: '2025-05-04T07:48:34.491Z',
            __v: 0,
          },
          {
            authRequired: false,
            posts: [],
            _id: '68171c0a833d4243f6b9fb58',
            name: '오버워치',
            description: 'string',
            createdAt: '2025-05-04T07:49:30.839Z',
            updatedAt: '2025-05-04T07:49:30.839Z',
            __v: 0,
          },
          {
            authRequired: false,
            posts: [],
            _id: '68171c15833d4243f6b9fb5c',
            name: 'FC온라인',
            description: 'string',
            createdAt: '2025-05-04T07:49:41.747Z',
            updatedAt: '2025-05-04T07:49:41.747Z',
            __v: 0,
          },
        ]);
      } catch (error) {
        console.error('Date load fail :', error);
      }
    };
    fetchChaanels();
  }, []);

  const channelList: ChannelList[] = channels.map((v) => ({
    id: v._id,
    name: v.name,
    icon: fcOnline,
  }));

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
        <ul className="gap-[7px] px-1 pb-[10px] text-[13px] font-normal">
          {channelList.map((v) => (
            <li
              key={v.id}
              className="flex items-center gap-2"
              onClick={() => onChange(v.name, v.icon)}
            >
              <img
                className={twMerge('postProfile', 'h-[20px] w-[20px]')}
                src={v.icon}
                alt="icon"
              />
              <span className="leading-[30px]">{v.name}</span>
            </li>
          ))}
        </ul>
        <hr className="mr-[20px] border border-[var(--color-gray3)]" />
        <div className="mt-1 flex items-center gap-[6px]">
          <IoIosList className="text-black" size={17} />
          <span className="leading-[30px]">전체 커뮤니티</span>
        </div>
        <ul className="gap-[7px] px-1 pb-[10px] text-[13px] font-normal">
          {channelList.map((v) => (
            <li
              key={v.id}
              className="flex items-center gap-2"
              onClick={() => onChange(v.name, v.icon)}
            >
              <img
                className={twMerge('postProfile', 'h-[20px] w-[20px]')}
                src={v.icon}
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
