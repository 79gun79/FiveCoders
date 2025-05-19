import DFCard from '../components/DFCard';
import DiscordCard from '../components/DiscordCard';
import GameCarousel from '../components/GameCarousel';
import SteamCard from '../components/SteamCard';
import joystick from '../assets/icons/joystick.svg';
import confetti from '../assets/icons/confetti.svg';
import { AiOutlinePlus } from 'react-icons/ai';
import { useEffect, useRef, useState } from 'react';
import Input from '../components/Input';
import GameDropdown from '../components/GameDropdown';
import { useAuthStore } from '../stores/authStore';
import axios from 'axios';
import { client } from '../services/axios';
import IsLoggedInModal from '../components/IsLoggedInModal';
import TodayBestPost from '../components/TodayBestPost';
import { BsFire } from 'react-icons/bs';

type CardType = 'steam' | 'discord' | 'dnf';

interface Card {
  type: CardType;
  id: string;
  server?: string;
}

export default function Home() {
  const [cards, setCards] = useState<Card[]>([]);
  const [showAddCard, setShowAddCard] = useState(false);
  const [selectedType, setSelectedType] = useState('steam');
  const [inputId, setInputId] = useState('');
  const [inputServer, setInputServer] = useState('');
  const addCardRef = useRef<HTMLDivElement>(null);
  const [cardList, setCardList] = useState<string>('');
  const getAuth = sessionStorage.getItem('auth-storage');
  const API_URL = import.meta.env.VITE_API_URL;
  const token = useAuthStore.getState().accessToken;
  const [username, setUsername] = useState<string>('');
  const [userData, setUserData] = useState<string>('');
  const isLogin = useAuthStore((state) => state.isLoggedIn);
  const [isOpen, setIsOpen] = useState(false);

  //연동 카드 추가 닫기
  useEffect(() => {
    if (!showAddCard) return;
    const handler = (e: MouseEvent) => {
      if (
        addCardRef.current &&
        !addCardRef.current.contains(e.target as Node) &&
        isOpen !== true
      ) {
        setShowAddCard(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showAddCard, isOpen]);

  useEffect(() => {
    if (isLogin === true) {
      if (cardList !== '' && cardList !== undefined) {
        setCards(JSON.parse(cardList));
      }
    } else {
      setCards([]);
    }
    client('/auth-user').then((response) => setUserData(response.data._id));
    if (userData) {
      client(`/users/${userData}`).then((response) => [
        setUsername(response.data.fullName),
        setCardList(response.data.username),
      ]);
    }
  }, [cardList, userData, username, isLogin]);

  const addCardHandler = () => {
    if (useAuthStore.getState().isLoggedIn !== true) {
      setIsOpen(true);
    }
    setShowAddCard(true);
    //선택 항목의 기본 값은 steam
    setSelectedType('steam');
    setInputId('');
  };

  const saveCardData = () => {
    try {
      axios.put(
        `${API_URL}settings/update-user`,
        {
          fullName: username,
          username: JSON.stringify(cards),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  //카드 추가
  const createCardHandler = () => {
    if (selectedType === 'dnf' && getAuth !== null) {
      if (inputId && inputServer) {
        setCards([...cards, { type: 'dnf', id: inputId, server: inputServer }]);
        setShowAddCard(false);
        setInputId('');
        setInputServer('');
      }
    } else if (selectedType && inputId && getAuth !== null) {
      setCards([...cards, { type: selectedType as CardType, id: inputId }]);
      setShowAddCard(false);
    }
  };

  //카드 삭제
  const deleteCardHandler = (cardId: string) => {
    const updatedCards = cards.filter((card) => card.id !== cardId);
    setCards(updatedCards);

    try {
      axios.put(
        `${API_URL}settings/update-user`,
        {
          fullName: username,
          username: JSON.stringify(updatedCards), // cards 대신 updatedCards로 저장
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const renderCard = (card: Card, idx: number) => {
    if (isLogin === true) {
      if (card.type === 'steam') {
        saveCardData();
        return (
          <SteamCard
            key={idx}
            id={card.id}
            onDelete={() => deleteCardHandler(card.id)}
          />
        );
      }
      if (card.type === 'discord') {
        saveCardData();
        return (
          <DiscordCard
            key={idx}
            id={card.id}
            onDelete={() => deleteCardHandler(card.id)}
          />
        );
      }
      if (card.type === 'dnf') {
        saveCardData();
        return (
          <DFCard
            key={idx}
            id={card.id}
            server={card.server!}
            onDelete={() => deleteCardHandler(card.id)}
          />
        );
      }
    }
    return null;
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-[1020px] flex-col items-center justify-center px-8 xl:px-4">
      <div className="flex w-full max-w-[1020px] flex-col gap-y-15">
        <section>
          <div className="mb-5 w-full items-start">
            <div className="flex items-center">
              <img
                src={joystick}
                alt="icon"
                className="mr-2 h-[25px] w-[25px]"
              />
              <h1 className="py-2 text-[20px] font-bold text-[var(--color-main)]">
                게이머 카드
              </h1>
            </div>
            <div className="mb-2 flex items-center gap-2">
              {cards.map((card, idx) => renderCard(card, idx))}
              {showAddCard ? (
                <div
                  className={`flex flex-col items-start space-x-2 rounded-lg border-2 border-dashed border-[var(--color-main)] p-4 ${
                    selectedType === 'dnf' ? 'h-[240px]' : 'h-[180px]'
                  }`}
                  ref={addCardRef}
                >
                  <GameDropdown
                    value={selectedType as 'steam' | 'discord' | 'dnf' | ''}
                    onChange={(code) => setSelectedType(code)}
                  />
                  {selectedType === 'dnf' ? (
                    <>
                      <Input
                        className="mt-2 w-[230px] rounded border px-2 py-2"
                        placeholder="닉네임"
                        value={inputId}
                        onChange={(e) => setInputId(e.target.value)}
                      />
                      <Input
                        className="my-2 w-[230px] rounded border px-2 py-2"
                        placeholder="서버"
                        value={inputServer}
                        onChange={(e) => setInputServer(e.target.value)}
                      />
                    </>
                  ) : (
                    <Input
                      className="my-2 w-[230px] rounded border px-2 py-2"
                      placeholder="ID 입력"
                      value={inputId}
                      onChange={(e) => setInputId(e.target.value)}
                    />
                  )}
                  <div className="my-3 flex w-full justify-center">
                    <button
                      className="cursor-pointer rounded bg-[var(--color-main)] px-3 py-2 text-white transition hover:bg-[var(--color-sub)]"
                      onClick={createCardHandler}
                    >
                      연동
                    </button>
                  </div>
                  {isOpen && (
                    <IsLoggedInModal onClose={() => setIsOpen(false)} />
                  )}
                </div>
              ) : (
                <button
                  className="flex h-[140px] w-[200px] flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 text-[var(--color-gray5)] hover:bg-[var(--color-gray3)]"
                  onClick={addCardHandler}
                >
                  <AiOutlinePlus className="text-3xl text-[var(--color-main)]" />
                </button>
              )}
            </div>
          </div>
        </section>
        <section>
          <div className="w-full items-start">
            <div className="flex items-center">
              <img
                src={confetti}
                alt="icon"
                className="mr-2 h-[33px] w-[33px]"
              />
              <h1 className="py-2 text-[25px] font-bold text-[var(--color-main)]">
                업데이트 소식
              </h1>
            </div>
            <div className="m-[20px] w-[960px]">
              <GameCarousel />
            </div>
          </div>
        </section>
        <section>
          <div className="mt-2.5 w-full items-start">
            <div className="mt-5 flex items-center">
              <BsFire className="mr-3 text-[25px] text-orange-400" />
              <h1 className="py-2 text-[25px] font-bold text-[var(--color-main)]">
                오늘의 인기글
              </h1>
            </div>
            <TodayBestPost />
          </div>
        </section>
      </div>
    </div>
  );
}
