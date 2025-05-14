import { gameNewsData } from '../data/gameNewsData';
import GameNewsCard from './GameNewsCard';

export default function GameCarousel() {
  return (
    <div className="carousel">
      {gameNewsData.map((game, idx) => (
        <GameNewsCard
          key={idx}
          imgSrc={game.imgSrc}
          link={game.link}
        ></GameNewsCard>
      ))}
    </div>
  );
}
