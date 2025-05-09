import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { VscHome, VscGlobe } from "react-icons/vsc";
import { TiStarFullOutline } from 'react-icons/ti';

import { Channel, ChannelItem } from '../types/channel';

import placeholderIcon from '../assets/channelImg.svg';
import globeIcon from '../assets/globe.svg';
import homeIcon from '../assets/home.svg';
import { dummyChannels } from '../data/dummyChannels';

export default function Sidebar() {
  const navigate = useNavigate();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [subscribes, setSubscribes] = useState<string[]>([]);

  const toggleSubscride = (id: string) => {
    setSubscribes((prev) =>
      prev.includes(id) ? prev.filter((sub) => sub !== id) : [...prev, id],
    );
  };

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        //API호출 추후 업데이트
        //임시데이터 사용
        setChannels(dummyChannels);
      } catch (error) {
        console.error('Date load fail :', error);
      }
    };
    fetchChannels();
  }, []);

  const channelItem: ChannelItem[] = channels.map((channel) => ({
    id: channel._id,
    name: channel.name,
    imageUrl: channel.imageUrl || placeholderIcon,
    isSubscribe: subscribes.includes(channel._id),
  }));

  return (
    <aside className="flex h-screen w-[280px] flex-col border-r border-[var(--color-gray4)] bg-[var(--color-bg-white)]">
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
            onClick={() => navigate('/channellist')}
          >
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
              <div className="mr-3 h-6 w-6 flex-shrink-0 overflow-hidden rounded-full">
                <img
                  src={item.imageUrl}
                  alt="channelImg"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="flex-1 text-sm">{item.name}</span>
              <button onClick={() => toggleSubscride(item.id)}>
                <TiStarFullOutline
                  className={`text-[20px] transition-colors ${
                    item.isSubscribe
                      ? 'text-[var(--color-sub)] hover:text-[var(--color-sub)]'
                      : 'text-[var(--color-gray4)] hover:text-[var(--color-sub)]'
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
