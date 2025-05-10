import { useEffect, useState } from 'react';
//import { VscHome, VscGlobe } from "react-icons/vsc";
import { TiStarFullOutline } from 'react-icons/ti';

import placeholderIcon from '../assets/channelImg.svg';
import globeIcon from '../assets/globe.svg';
import homeIcon from '../assets/home.svg';

export default function Sidebar() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [subscribes, setSubscribes] = useState<string[]>([]);

  const toggleSubscride = (id: string) => {
    setSubscribes((prev) =>
      prev.includes(id) ? prev.filter((sub) => sub !== id) : [...prev, id],
    );
  };

  useEffect(() => {
    const fetchChaanels = async () => {
      try {
        //API호출 추후 업데이트
        //임시데이터 사용
        setChannels([
          {
            authRequired: false,
            posts: [],
            _id: '68171bbe833d4243f6b9fb4f',
            name: '오버워치',
            description: 'string',
            createdAt: '2025-05-04T07:48:14.080Z',
            updatedAt: '2025-05-04T07:48:14.080Z',
            __v: 0,
          },
          {
            authRequired: false,
            posts: [],
            _id: '68171bd2833d4243f6b9fb54',
            name: '리그 오브 레전드',
            description: 'string',
            createdAt: '2025-05-04T07:48:34.491Z',
            updatedAt: '2025-05-04T07:48:34.491Z',
            __v: 0,
          },
          {
            authRequired: false,
            posts: [],
            _id: '68171c0a833d4243f6b9fb58',
            name: 'FC 온라인',
            description: 'string',
            createdAt: '2025-05-04T07:49:30.839Z',
            updatedAt: '2025-05-04T07:49:30.839Z',
            __v: 0,
          },
          {
            authRequired: false,
            posts: [],
            _id: '68171c15833d4243f6b9fb5c',
            name: '발로란트',
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

  const channelItem: ChannelItem[] = channels.map((channel) => ({
    id: channel._id,
    name: channel.name,
    icon: placeholderIcon,
    isSubscribe: subscribes.includes(channel._id),
  }));

  return (
    <aside className="bg-white)] flex h-screen w-[280px] flex-col border-r border-[var(--color-gray4)]">
      <nav>
        <ul className="p-3">
          <li className="flex cursor-pointer items-center rounded-xl px-6 py-3 hover:bg-[var(--color-gray2)]">
            <img src={homeIcon} className="mr-[13px] h-5.5 w-5.5" />
            <span className="font-bold">홈</span>
          </li>
          <li className="flex cursor-pointer items-center rounded-xl px-6 py-3 hover:bg-[var(--color-gray2)]">
            <img src={globeIcon} className="mr-[13px] h-5.5 w-5.5" />
            <span className="font-bold">커뮤니티</span>
          </li>
        </ul>
      </nav>
      <div className="flex-1 overflow-y-auto">
        <div className="mt-[10px] flex items-center px-8">
          <span className="h-px flex-1 bg-[var(--color-gray4)]" />
        </div>
        <h2 className="mt-[25px] px-8 py-2 text-[16px] text-[var(--color-gray8)]">
          즐겨찾는 커뮤니티
        </h2>
        <ul className="p-2.5">
          {channelItem.map((item) => (
            <li
              key={item.id}
              className="flex cursor-pointer items-center rounded-xl px-5.5 py-2.5 text-[16px] hover:bg-[var(--color-gray2)]"
            >
              <div className="mr-3 h-8 w-8 flex-shrink-0">
                <img src={placeholderIcon} alt="icon" />
              </div>
              <span className="flex-1 text-sm">{item.name}</span>
              <button onClick={() => toggleSubscride(item.id)}>
                <TiStarFullOutline
                  className={`text-[20px] transition-colors ${
                    item.isSubscribe
                      ? 'text-[var(--color-sub)] hover:text-[var(--color-main)]'
                      : 'text-[var(--color-gray4)] hover:text-[var(--color-main)]'
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
