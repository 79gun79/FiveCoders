import { useEffect, useState } from 'react';
import { getUser } from '../services/dfAPI';
import logo_big from '../assets/던파로고.png';
import logo_small from '../assets/던파로고미니.png';
import fame from '../assets/명성치.png';
import { IoIosSettings } from 'react-icons/io';

// const serverId = 'hilder';
// const charName = '변신캐설월화';

export default function DFCard() {
  const [myFame, setMyFame] = useState<number>();
  const [myJob, setMyJob] = useState<string>('');
  const [level, setLevel] = useState<number>();
  const [characterId, setCharacterId] = useState<string>('');
  // const [server, setServer] = useState<string>();
  const [input, setInput] = useState<string>('');
  const [nickName, setNickName] = useState<string>('');
  const [sInput, setSInput] = useState<string>('');
  const [server, setServer] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);

  const onChange = (e) => {
    setInput(e.target.value);
  };

  const onChange2 = (e) => {
    setSInput(e.target.value);
  };

  const onClick = () => {
    setNickName(input);
    setServer(sInput);
    setInput('');
    setVisible(true);
  };

  const onSetting = () => {
    setVisible(false);
  };

  const serverName = () => {
    if (sInput === '힐더') {
      setServer('hilder');
    } else if (sInput === '안톤') {
      setServer('anton');
    } else if (sInput === '바칼') {
      setServer('bakal');
    } else if (sInput === '카인') {
      setServer('cain');
    } else if (sInput === '카시야스') {
      setServer('casillas');
    } else if (sInput === '디레지에') {
      setServer('diregie');
    } else if (sInput === '프레이') {
      setServer('prey');
    } else if (sInput === '시로코') {
      setServer('siroco');
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const player = await getUser(server, nickName);
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
  }, [nickName, server]);

  return (
    <>
      <div className="relative flex h-[160px] w-[260px] justify-start overflow-hidden rounded-xl bg-gradient-to-t from-[var(--color-gray7)] to-[var(--color-gray4)] p-[10px]">
        <img
          src={logo_small}
          className="absolute w-[35px] select-none"
          alt="미니로고"
        />
        <img
          src={`https://img-api.neople.co.kr/df/servers/${server}/characters/${characterId}?zoom=1`}
          alt=""
          className="absolute top-[-48px] left-[-5px] h-[200px] select-none"
        />
        <img
          src={logo_big}
          className="absolute top-10 left-[100px] size-[80%] select-none"
          draggable={false}
          alt="던파로고"
        />
        {visible && (
          <div>
            <div className="absolute top-1/4 right-6 block content-center text-center">
              <span className="textST1 block text-[var(--color-gray3)]">
                Lv.{level}
              </span>
              <span className="textT1 block text-[var(--color-white)]">
                {nickName}
              </span>
              <span className="textST1 block text-[var(--color-gray3)]">
                {myJob} | {sInput}
              </span>
              <span className="textST1 flex justify-center text-[var(--color-main)]">
                <img src={fame} alt="" className="mt-[3px] h-[13px] w-[15px]" />
                {myFame}
              </span>
            </div>
            <button
              className="absolute right-3 cursor-pointer"
              onClick={onSetting}
            >
              <IoIosSettings className="fill-white" />
            </button>
          </div>
        )}
        {!visible && (
          <div className="absolute top-10/35 left-5">
            <div className="w-[150px]">
              <input
                type="text"
                placeholder="서버"
                onChange={onChange2}
                className="mb-3 rounded-sm border-1 bg-white text-center"
              />
              <input
                type="text"
                placeholder="닉넴"
                className="rounded-sm border-1 bg-white text-center"
                onChange={onChange}
                value={input}
              />
              <button
                onClick={onClick}
                className="absolute top-18 left-40 w-[50px] rounded-sm border-1 bg-[var(--color-gray3)]"
              >
                저장
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
