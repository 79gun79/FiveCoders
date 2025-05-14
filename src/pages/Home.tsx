//import DFCard from '../components/DFCard';
import DiscordCard from '../components/DiscordCard';
import SteamCard from '../components/SteamCard';

export default function Home() {
  return (
    <>
      <div className="mx-[120px]">
        <h1>Home Component</h1>
        <SteamCard />
        <DiscordCard />
        {/* <DFCard /> */}
      </div>
    </>
  );
}
