import { useEffect, useState } from 'react';
import { getUser } from '../services/dfAPI';
import logo_big from '../assets/던파로고.png';
import logo_small from '../assets/던파로고미니.png';
import fame from '../assets/명성치.png';

const serverId = 'hilder';
const charName = '변신캐설월화';

export default function DFCard() {
  const [server, setServer] = useState<string>();
  // const [nickname, setNickname] = useState<string>();
  const [myFame, setMyFame] = useState<number>();
  const [myJob, setMyJob] = useState<string>();
  const [level, setLevel] = useState<number>();
  const [characterId, setCharacterId] = useState<string>();

  const serverName = () => {
    if (serverId === 'hilder') {
      setServer('힐더');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const player = await getUser(serverId, charName);
        console.log(player);
        setMyFame(player.rows[0].fame);
        setMyJob(player.rows[0].jobGrowName);
        setLevel(player.rows[0].level);
        setCharacterId(player.rows[0].characterId);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    serverName();
  }, []);

  return (
    <>
      <h1>dfCard Component</h1>
      <div className="relative flex h-[160px] w-[260px] justify-start overflow-hidden rounded-xl bg-gradient-to-t from-[var(--color-gray7)] to-[var(--color-gray4)] p-[10px]">
        <img
          src={logo_small}
          className="absolute w-[35px] select-none"
          alt="미니로고"
        />
        <img
          src={`https://img-api.neople.co.kr/df/servers/${serverId}/characters/${characterId}?zoom=1`}
          alt=""
          className="absolute top-[-48px] left-[-5px] h-[200px] select-none"
        />
        <img
          src={logo_big}
          className="absolute top-10 left-[100px] size-[80%] select-none"
          draggable={false}
          alt="던파로고"
        />
        <div className="absolute top-1/4 right-8 block content-center text-center">
          <span className="textST1 block text-[var(--color-gray3)]">
            Lv.{level}
          </span>
          <span className="textT1 block">{charName}</span>
          <span className="textST1 block text-[var(--color-gray3)]">
            {myJob} | {server}
          </span>
          <span className="textST1 flex justify-center text-[var(--color-main)]">
            <img src={fame} alt="" className="mt-[3px] h-[13px] w-[15px]" />
            {myFame}
          </span>
        </div>
      </div>
    </>
  );
}
