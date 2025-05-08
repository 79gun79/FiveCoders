import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { VscHome, VscGlobe } from "react-icons/vsc";
import { TiStarFullOutline } from "react-icons/ti";

import { Channel, ChannelItem } from "../types/channel";

import placeholderIcon from "../assets/channelImg.svg";
import globeIcon from "../assets/globe.svg";
import homeIcon from "../assets/home.svg";
import { dummyChannels } from "../data/dummyChannels";

export default function Sidebar() {
  const navigate = useNavigate();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [subscribes, setSubscribes] = useState<string[]>([]);

  const toggleSubscride = (id: string) => {
    setSubscribes((prev) =>
      prev.includes(id) ? prev.filter((sub) => sub !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        //API호출 추후 업데이트
        //임시데이터 사용
        setChannels(dummyChannels);
      } catch (error) {
        console.error("Date load fail :", error);
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
    <aside className="w-[280px] h-screen border-r border-[var(--color-gray4)] bg-white)] flex flex-col">
      <nav>
        <ul className="p-3">
          <li
            className="flex items-center px-6 py-3 rounded-xl hover:bg-[var(--color-gray2)] cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img src={homeIcon} className="w-5.5 h-5.5 mr-[13px] " />
            <span className="font-bold">홈</span>
          </li>
          <li
            className="flex items-center px-6 py-3 rounded-xl hover:bg-[var(--color-gray2)] cursor-pointer"
            onClick={() => navigate('/channellist')}
          >
            <img src={globeIcon} className="w-5.5 h-5.5 mr-[13px] " />
            <span className="font-bold">커뮤니티</span>
          </li>
        </ul>
      </nav>
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center px-8 mt-[10px]">
          <span className="flex-1 h-px bg-[var(--color-gray4)]" />
        </div>
        <h2 className="text-[16px] text-[var(--color-gray8)] px-8 py-2 mt-[25px]">
          즐겨찾는 커뮤니티
        </h2>
        <ul className="p-2.5">
          {channelItem.map((item) => (
            <li
              key={item.id}
              className="flex items-center text-[16px] px-5.5 py-2.5 rounded-xl hover:bg-[var(--color-gray2)] cursor-pointer"
            >
              <div className="w-6 h-6 mr-3 flex-shrink-0 rounded-full overflow-hidden">
                <img src={item.imageUrl} alt="channelImg" className="w-full h-full object-cover" />
              </div>
              <span className="flex-1 text-sm">{item.name}</span>
              <button onClick={() => toggleSubscride(item.id)}>
                <TiStarFullOutline
                  className={`text-[20px] transition-colors ${item.isSubscribe
                      ? "text-[var(--color-sub)] hover:text-[var(--color-sub)]"
                      : "text-[var(--color-gray4)] hover:text-[var(--color-sub)]"
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