import { useEffect, useState } from 'react';
import { getUser } from '../services/dfAPI';
import logo_small from '../assets/dnf-small.png';
import dnfBg from '../assets/dnfBg.png';
import fame from '../assets/fame.png';
import { IoCloseCircle } from 'react-icons/io5';

interface DFCardProps {
  id: string;
  server: string;
  onDelete: (id: string) => void;
}

interface DFProfile {
  fame: number;
  job: string;
  level: number;
  characterId: string;
  nickname: string;
  server: string;
}

const serverKorToEng: Record<string, string> = {
  힐더: 'hilder',
  안톤: 'anton',
  바칼: 'bakal',
  카인: 'cain',
  카시야스: 'casillas',
  디레지에: 'diregie',
  프레이: 'prey',
  시로코: 'siroco',
};

const getServerCode = (server: string) => {
  // 한글이면 변환, 이미 영문이면 그대로 반환
  return serverKorToEng[server] || server;
};

export default function DFCard({ id, server, onDelete }: DFCardProps) {
  const [profile, setProfile] = useState<DFProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const code = getServerCode(server);
    if (!id || !code) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const player = await getUser(code, id);
        const row = player.rows[0];

        setProfile({
          fame: row.fame,
          job: row.jobGrowName,
          level: row.level,
          characterId: row.characterId,
          nickname: row.characterName,
          server: code,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, server]);

  return (
    <div
      className="relative flex h-[160px] w-[260px] justify-start overflow-hidden rounded-xl bg-cover bg-center bg-no-repeat p-[10px]"
      style={{ backgroundImage: `url(${dnfBg})` }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <img
        src={logo_small}
        className="absolute w-[35px] select-none"
        alt="dnf-icon"
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
      {profile && (
        <>
          <img
            src={`https://img-api.neople.co.kr/df/servers/${profile.server}/characters/${profile.characterId}?zoom=1`}
            alt=""
            className="dro absolute top-[-48px] left-[-18px] h-[200px] drop-shadow-[0_8px_16px_rgba(0,0,0,1)] select-none"
          />
          <div className="flex items-center">
            <div className="absolute right-4 block content-center rounded-md bg-[var(--color-black)]/60 px-4 py-2 text-center">
              <span className="textST1 block text-[var(--color-gray3)]">
                Lv.{profile.level}
              </span>
              <span className="textT1 block text-[var(--color-white)]">
                {profile.nickname}
              </span>
              <span className="textST1 block text-[var(--color-gray3)]">
                {profile.job} | {profile.server}
              </span>
              <span className="textST1 flex justify-center text-[var(--color-main)]">
                <img
                  src={fame}
                  alt=""
                  className="mt-[3px] mr-[2px] h-[13px] w-[15px]"
                />
                {profile.fame}
              </span>
            </div>
          </div>
        </>
      )}
      {loading && (
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
      )}
    </div>
  );
}
