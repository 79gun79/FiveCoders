import { useEffect, useState } from 'react';
import SteamIconBig from '../assets/steam-big.svg';
import SteamIconSm from '../assets/steam-small.svg';
import { getPlayerSummaries } from '../services/steamApi';

interface SteamPlayer {
  steamid: string;
  personaname: string;
  avatarfull: string;
  profileurl: string;
}

const steamId = '76561198972680084';
export default function SteamCard() {
  //const [card, setCard] = useState<SteamPlayer[]>([]);
  const [card, setCard] = useState<SteamPlayer | null>(null);
  useEffect(() => {
    getPlayerSummaries([steamId]).then((players) => {
      setCard(players[0]);
    });
  }, []);
  if (!card) return <div>Loading</div>;
  return (
    <>
      <div className="relative h-[160px] w-[260px] overflow-hidden rounded-xl bg-gradient-to-r from-[#141E30] to-[#243B55]">
        <div className="flex items-center px-4 py-3.5">
          <img
            src={SteamIconSm}
            alt="steamIcon"
            className="h-[24px] w-[24px] select-none"
            draggable={false}
          />
          <h1 className="ml-2 text-[14px] font-semibold text-white">STEAM</h1>
        </div>
        <img
          src={SteamIconBig}
          alt="steamIcon"
          className="absolute top-0 left-[107px] h-[174px] w-[174px] select-none"
          draggable={false}
        />
        <img
          className="ml-[27px] h-[64px] w-[64px] rounded-xl"
          src={card.avatarfull}
        />

        <div className="absolute top-1/2 right-18 z-30 -translate-y-1/2">
          <div className="mt-1.5 space-y-1 text-[12px] font-semibold text-white">
            <h1 className="text-[14px]">{card.personaname}</h1>
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
