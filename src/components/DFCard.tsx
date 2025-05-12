import { useEffect, useState } from 'react';
import { dfAPI } from '../services/dfAPI';

const DF_API_KEY = import.meta.env.VITE_DF_KEY;
const myServer = 'hilder';
const myNickname = '활쏘는설월화';
const myCharacterId = 'd484c38866b960b1db8cc912a01fe594';

export default function DFCard() {
  // const [server, setServer] = useState<string>();
  const [nickname, setNickname] = useState<string>();
  // const [characterId, setCharacterId] = useState<string>();

  const fetchData = async () => {
    const result = await dfAPI.get(
      `df/servers/${myServer}/characters/${myNickname}&apikey=${DF_API_KEY}`,
    );
    setNickname(result.data.userName);
    console.log(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>dfCard Component</h1>
      <img
        src={`https://img-api.neople.co.kr/df/servers/${myServer}/characters/${myCharacterId}?zoom=1`}
        alt=""
      />
      <span>{nickname}</span>
    </>
  );
}
