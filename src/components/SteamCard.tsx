import SteamIconBig from "../assets/steam-big.svg";
import SteamIconSm from "../assets/steam-small.svg";

export default function SteamCard() {
  return (
    <>
      <div className="w-[260px] h-[160px] rounded-xl bg-gradient-to-r from-[#141E30] to-[#243B55] overflow-hidden relative">
        <div className="flex items-center px-4 py-3.5">
          <img
            src={SteamIconSm}
            alt="steamIcon"
            className="w-[24px] h-[24px] select-none"
            draggable={false}
          />
          <h1 className="font-semibold text-[14px] text-white ml-2">STEAM</h1>
        </div>
        <img
          src={SteamIconBig}
          alt="steamIcon"
          className="absolute left-[107px] top-0 w-[174px] h-[174px] select-none"
          draggable={false}
        />
        <div className="absolute right-18 top-1/2 -translate-y-1/2 z-30">
          <div className="text-white text-[12px] font-semibold space-y-1">
            <h1 className="text-[14px]">username</h1>
            <div className="flex">
              <span>게임</span>
              <span className="ml-2">35</span>
            </div>
            <div className="flex">
              <span>업적</span>
              <span className="ml-2">125</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
