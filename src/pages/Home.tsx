//import DFCard from '../components/DFCard';
import DiscordCard from '../components/DiscordCard';
import GameCarousel from '../components/GameCarousel';
import SteamCard from '../components/SteamCard';
import joystick from '../assets/icons/joystick.svg';
import confetti from '../assets/icons/confetti.svg';
import { useEffect, useRef, useState } from 'react';
import Input from '../components/Input';
import GameDropdown from '../components/GameDropdown';

type CardType = 'steam' | 'discord';

interface Card {
  type: CardType;
  id: string;
}

export default function Home() {
  const [cards, setCards] = useState<Card[]>([]);
  const [showAddCard, setShowAddCard] = useState(false);
  const [selectedType, setSelectedType] = useState('steam');
  const [inputId, setInputId] = useState('');
  const addCardRef = useRef<HTMLDivElement>(null);

  //연동 카드 추가 닫기
  useEffect(() => {
    if (!showAddCard) return;
    const handler = (e: MouseEvent) => {
      if (
        addCardRef.current &&
        !addCardRef.current.contains(e.target as Node)
      ) {
        setShowAddCard(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showAddCard]);

  const addCardHandler = () => {
    setShowAddCard(true);
    //선택 항목의 기본 값은 steam
    setSelectedType('steam');
    setInputId('');
  };

  const createCardHandler = () => {
    if (selectedType && inputId) {
      setCards([...cards, { type: selectedType as CardType, id: inputId }]);
      setShowAddCard(false);
    }
  };

  const renderCard = (card: Card, idx: number) => {
    if (card.type === 'steam') {
      return <SteamCard key={idx} id={card.id} />;
    }
    if (card.type === 'discord') {
      return <DiscordCard key={idx} id={card.id} />;
    }
    return null;
  };

  return (
    <div className="mx-auto flex max-w-[1020px] flex-col items-center justify-center">
      <div className="w-full items-start">
        <div className="flex items-center">
          <img src={joystick} alt="icon" className="mr-2 h-[25px] w-[25px]" />
          <h1 className="py-2 text-[20px] font-bold text-[var(--color-main)]">
            게이머 카드
          </h1>
        </div>
        <div className="mb-2 flex items-center gap-2">
          {cards.map((card, idx) => renderCard(card, idx))}
          {showAddCard ? (
            <div
              className="flex h-[180px] flex-col items-start space-x-2 rounded-lg border-2 border-dashed border-[var(--color-main)] p-4"
              ref={addCardRef}
            >
              <GameDropdown
                value={selectedType as 'steam' | 'discord' | ''}
                onChange={(code) => setSelectedType(code)}
              />
              <Input
                className="my-2 rounded border px-2 py-2"
                placeholder="ID 입력"
                value={inputId}
                onChange={(e) => setInputId(e.target.value)}
              />
              <div className="my-3 flex w-full justify-center">
                <button
                  className="cursor-pointer rounded bg-[var(--color-main)] px-3 py-2 text-white transition hover:bg-[var(--color-sub)]"
                  onClick={createCardHandler}
                >
                  연동
                </button>
              </div>
            </div>
          ) : (
            <button
              className="flex h-[140px] w-[200px] flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 text-[var(--color-gray5)] hover:bg-[var(--color-gray3)]"
              onClick={addCardHandler}
            >
              <span className="text-3xl">＋</span>
            </button>
          )}
          {/* <SteamCard />
          <DiscordCard /> */}
          {/* <DFCard /> */}
        </div>
      </div>
      <div className="w-full items-start">
        <div className="mt-5 flex items-center">
          <img src={confetti} alt="icon" className="mr-2 h-[33px] w-[33px]" />
          <h1 className="py-2 text-[25px] font-bold text-[var(--color-main)]">
            업데이트 소식
          </h1>
        </div>
        <div className="m-[20px] w-[960px]">
          <GameCarousel />
        </div>
      </div>
    </div>
  );
}
