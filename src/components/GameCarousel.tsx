import { useEffect, useRef, useState } from 'react';
import { gameNewsData } from '../data/gameNewsData';
//import GameNewsCard from './GameNewsCard';
import { GrNext, GrPrevious } from 'react-icons/gr';

export default function GameCarousel() {
  const [current, setCurrnet] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const length = gameNewsData.length;

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrnet((prev) => (prev + 1) % length);
    }, 3000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, length]);

  const goTo = (idx: number) => setCurrnet(idx);

  const prev = () => setCurrnet((prev) => (prev - 1 + length) % length);
  const next = () => setCurrnet((next) => (next + 1) % length);

  return (
    <div className="relative mx-auto w-full max-w-[960px] z-0">
      <div className="relative h-[335px] overflow-hidden rounded-[10px]">
        {gameNewsData.map((item, idx) => (
          <div
            key={item.link}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === current ? 'z-10 opacity-100' : 'z-0 opacity-0'
            }`}
          >
            <img
              src={item.imgSrc}
              alt={`slide-${idx}`}
              className="block w-full cursor-pointer object-cover"
              //새 창에서 열기
              onClick={() =>
                window.open(item.link, '_blank', 'noopener,noreferrer')
              }
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* 현재 위치 표시 */}
      <div className="absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 space-x-3">
        {gameNewsData.map((_, idx) => (
          <button
            key={idx}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              idx === current
                ? 'scale-125 bg-[var(--color-main)]'
                : 'bg-[var(--color-gray4)]'
            }`}
            onClick={() => goTo(idx)}
          />
        ))}
      </div>

      {/* 이전, 다음 버튼 */}
      <button
        className="absolute top-1/2 left-2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/40 transition hover:bg-white/70"
        onClick={prev}
      >
        <GrPrevious size={24} style={{ color: 'var(--color-main)' }} />
      </button>
      <button
        className="absolute top-1/2 right-2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/40 transition hover:bg-white/70"
        onClick={next}
      >
        <GrNext size={24} style={{ color: 'var(--color-main)' }} />
      </button>
    </div>
  );
}