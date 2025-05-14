//import DFCard from '../components/DFCard';
import DiscordCard from '../components/DiscordCard';
import GameCarousel from '../components/GameCarousel';
import SteamCard from '../components/SteamCard';

export default function Home() {
  return (
    <>
      <div className="mx-[200px]">
        <h1>Home Component</h1>
        <div className="flex gap-1.5">
          <SteamCard />
          <DiscordCard />
          {/* <DFCard /> */}
        </div>
        <div className="flex items-center justify-center">
          <GameCarousel />
        </div>
      </div>
    </>
  );
}
