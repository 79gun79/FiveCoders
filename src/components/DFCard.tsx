import { useEffect, useState } from 'react';
import { getUser } from '../services/dfAPI';

const myServer = 'hilder';
const myNickname = '활쏘는설월화';
const myCharacterId = 'd484c38866b960b1db8cc912a01fe594';

export default function DFCard() {
  // const [server, setServer] = useState<string>();
  // const [nickname, setNickname] = useState<string>();
  const [myFame, setMyFame] = useState<number>();
  const [myJob, setMyJob] = useState<string>();
  const [level, setLevel] = useState<number>();
  // const [characterId, setCharacterId] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const player = await getUser(myServer, myNickname);
        console.log(player);
        setMyFame(player.fame);
        setMyJob(player.jobGrowName);
        setLevel(player.level);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>dfCard Component</h1>
      <img
        src={`https://img-api.neople.co.kr/df/servers/${myServer}/characters/${myCharacterId}?zoom=1`}
        alt=""
      />
      <span>{myNickname}</span>
      <span>{myFame}</span>
      <span>{myJob}</span>
      <span>{level}</span>
    </>
  );
}
