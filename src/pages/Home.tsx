import DFCard from '../components/DFCard';
import DiscordCard from '../components/DiscordCard';
import GameCarousel from '../components/GameCarousel';
import SteamCard from '../components/SteamCard';

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="flex gap-1.5">
          <SteamCard />
          <DiscordCard />
          <DFCard />
        </div>
        <div className="m-[20px] w-[960px]">
          <GameCarousel />
        </div>
      </div>
    </>
  );
}
