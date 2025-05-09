import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Channel } from "../types/channel";

import IsLoggedInModal from "./IsLoggedInModal";

import { fetchChannels } from "../services/channelApi";
import { useAuthStore } from "../stores/authStore";

import globeIcon from "../assets/globe.svg";
import homeIcon from "../assets/home.svg";
import { TiStarFullOutline } from "react-icons/ti";
import { getSubscribedChannels } from "../utils/localSubscribe";

export default function Sidebar() {
  const navigate = useNavigate();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [subscribes, setSubscribes] = useState<string[]>([]);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [modalOpen, setModalOpen] = useState(false);


  //구독한 채널 목록
  const subscribedChannels = channels.filter((channel) =>
    subscribes.includes(channel._id)
  );

  //채널 구독
  //로그인 O : 구독한 채널 있으면 채널 목록 표시 / 없으면 +커뮤니티 찾기 표시 -> /channels로 리다이렉트
  //로그인 X : + 커뮤니티 찾기 표시 -> 로그인하세요 모달
  useEffect(() => {
    setSubscribes(getSubscribedChannels);
  }, []);

  useEffect(() => {
    const getChannels = async () => {
      try {
        const data = await fetchChannels();
        setChannels(data);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    getChannels();
  }, []);

  //모달 핸들러
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <aside className="sticky top-0 w-[280px] h-screen border-r border-[var(--color-gray4)] bg-white)] flex flex-col">
      <nav>
        <ul className="p-3">
          <li
            className="flex items-center px-6 py-3 rounded-xl hover:bg-[var(--color-gray2)] cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={homeIcon} className="w-5.5 h-5.5 mr-[13px] " />
            <span className="font-bold">홈</span>
          </li>
          <li
            className="flex items-center px-6 py-3 rounded-xl hover:bg-[var(--color-gray2)] cursor-pointer"
            onClick={() => navigate("/channellist")}
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
        {subscribedChannels.length <= 0 ? (
          <div className="p-2.5">
            <span
              onClick={() => {
                if (isLoggedIn) {
                  navigate("/channellist");
                } else {
                  openModal();
                }
              }}
              className="block text-[14px]  text-[var(--color-gray6)] px-8 py-2.5  hover:bg-[var(--color-gray2)] cursor-pointer select-none"
            >
              + 커뮤니티 찾기
            </span>
          </div>
        ) : (
          <ul className="p-2.5">
            {subscribedChannels.map((item) => (
              <li
                key={item._id}
                className="flex items-center text-[16px] px-5.5 py-2.5 rounded-xl hover:bg-[var(--color-gray2)] cursor-pointer "
              >
                <div className="w-6 h-6 mr-3 flex-shrink-0 rounded-full overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt="channelImg"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="flex-1 text-sm">{item.name}</span>
                <button>
                  <TiStarFullOutline
                    className={`text-[20px] transition-colors ${"text-[var(--color-orange)] hover:text-[var(--color-gray3)]"}`}
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
        {modalOpen && <IsLoggedInModal onClose={closeModal} />}
      </div>
    </aside>
  );
}
