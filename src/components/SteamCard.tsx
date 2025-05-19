import { useEffect, useState } from 'react';
import SteamIconBig from '../assets/steam-big.svg';
import SteamIconSm from '../assets/steam-small.svg';
import { getOwnedGames, getPlayerSummaries } from '../services/steamApi';
import { IoCloseCircle } from 'react-icons/io5';

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

interface SteamCardProps {
  id: string;
  onDelete: (id: string) => void;
}

export default function SteamCard({ id, onDelete }: SteamCardProps) {
  const [card, setCard] = useState<SteamPlayer | null>(null);
  const [games, setGames] = useState<number>(0);
  const [totalPlaytime, setTotalPlaytime] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        //프로필 정보 조회
        const players = await getPlayerSummaries([id]);
        setCard(players[0]);

        //보유 게임 수 조회
        const ownedGames = await getOwnedGames(id);
        setGames(ownedGames.game_count);

        //전체 플레이 타임
        const total = ownedGames.games.reduce(
          (acc: number, game: GameInfo) => acc + game.playtime_forever,
          0,
        );
        setTotalPlaytime(total);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  //if (!card) return <div>Loading...</div>;
  return (
    <>
      <div
        className="relative h-[160px] w-[260px] overflow-hidden rounded-xl bg-gradient-to-r from-[#141E30] to-[#243B55]"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
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
        {isHover && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
            className="z-50p-1 absolute top-1 right-2 transition-opacity"
          >
            <IoCloseCircle className="h-7 w-7 text-[var(--color-red-caution)] hover:text-[#9B2424]" />
          </button>
        )}
        {card && (
          <img
            className="ml-[27px] h-[64px] w-[64px] rounded-xl"
            src={card.avatarfull}
          />
        )}
        {card && (
          <div className="absolute top-1/2 right-16 z-30 -translate-y-1/2">
            <div className="mt-1.5 space-y-1 text-[12px] font-semibold text-white">
              <h1 className="text-[15px]">{card.personaname}</h1>
              <div className="flex">
                <span>보유한 게임</span>
                <span className="ml-2 w-1 text-right tabular-nums">
                  {games}
                </span>
              </div>
              <div className="flex">
                <span>총 플레이타임</span>
                <span className="ml-2 w-1 text-right tabular-nums">
                  {(totalPlaytime / 60).toFixed(0)}
                </span>
              </div>
            </div>
          </div>
        )}
        {loading || !card ? (
          <div className="absolute inset-0 z-50 flex items-center justify-center rounded-xl bg-[#141E30]/70">
            <svg
              aria-hidden="true"
              className="h-8 w-8 animate-spin fill-[var(--color-main)] text-[var(--color-bg-white)]"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        ) : null}
      </div>
    </>
  );
}
