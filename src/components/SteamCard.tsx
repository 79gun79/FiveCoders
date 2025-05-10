import { useEffect, useState } from 'react';
import SteamIconBig from '../assets/steam-big.svg';
import SteamIconSm from '../assets/steam-small.svg';
import { getOwnedGames, getPlayerSummaries } from '../services/steamApi';

interface SteamPlayer {
  steamid: string;
  personaname: string;
  avatarfull: string;
  profileurl: string;
}

interface GameInfo {
  appid: number;
  name: string;
  playtime_forever: number; //분 단위
  game_count: number;
}

//임시로 저의스팀아이디를 공개합니다 ..ㅎ
const steamId = '76561198972680084';

export default function SteamCard() {
  const [card, setCard] = useState<SteamPlayer | null>(null);
  const [games, setGames] = useState<number>(0);
  const [totalPlaytime, setTotalPlaytime] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //프로필 정보 조회
        const players = await getPlayerSummaries([steamId]);
        setCard(players[0]);

        //보유 게임 수 조회
        const ownedGames = await getOwnedGames(steamId);
        setGames(ownedGames.game_count);

        //전체 플레이 타임
        const total = ownedGames.games.reduce(
          (acc: number, game: GameInfo) => acc + game.playtime_forever,
          0,
        );
        setTotalPlaytime(total);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (!card) return <div>Loading</div>;
  return (
    <>
      <div className="relative h-[160px] w-[260px] overflow-hidden rounded-xl bg-gradient-to-r from-[#141E30] to-[#243B55]">
        <div className="flex items-center px-4 py-4">
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

        <div className="absolute top-1/2 right-14 z-30 -translate-y-1/2">
          <div className="mt-1.5 space-y-1 text-[12px] font-semibold text-white">
            <h1 className="text-[15px]">{card.personaname}</h1>
            <div className="flex">
              <span>보유한 게임</span>
              <span className="ml-2">{games}</span>
            </div>
            <div className="flex">
              <span>총 플레이타임</span>
              <span className="ml-2">{(totalPlaytime / 60).toFixed(0)}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
