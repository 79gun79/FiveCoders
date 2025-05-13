import { useEffect, useState } from 'react';
import { getUser } from '../services/dfAPI';
import logo_big from '../assets/던파로고.png';
import logo_small from '../assets/던파로고미니.png';

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
      <div className="relative flex h-[160px] w-[260px] justify-start overflow-hidden rounded-xl border-1 bg-red-200 bg-gradient-to-r from-[#141E30] to-[#243B55] p-[10px]">
        <img src={logo_small} className="w-[50px] " alt="미니로고" />
        <img
          src={`https://img-api.neople.co.kr/df/servers/${serverId}/characters/${characterId}?zoom=1`}
          alt=""
          className=" border-1 border-red-500"
        />
        <img
          src={logo_big}
          className="absolute top-15 left-[100px] size-[80%] select-none"
          draggable={false}
          alt="던파로고"
        />
        <div className="block">
          <span className="block">{charName}</span>
          <span className="block">{server}</span>
          <span className="block">명성치: {myFame}</span>
          <span className="block">직업: {myJob}</span>
          <span className="block">레벨: {level}</span>
        </div>
      </div>
    </>
  );
}
