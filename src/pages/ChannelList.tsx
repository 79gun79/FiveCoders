import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ChannelCard from '../components/ChannelCard';
import type { Channel, ChannelItem } from '../types/channel';
import { dummyChannels } from '../data/dummyChannels';

export default function ChannelList() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [subscribes, setSubscribes] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleSubscribe = (id: string) => {
    setSubscribes((prev) =>
      prev.includes(id) ? prev.filter((sub) => sub !== id) : [...prev, id],
    );
  };

  useEffect(() => {
    setChannels(dummyChannels);
  }, []);

  const groupedByGenre = channels.reduce<Record<string, ChannelItem[]>>(
    (acc, channel) => {
      const genre = channel.description || '기타';
      const item: ChannelItem = {
        id: channel._id,
        name: channel.name,
        isSubscribe: subscribes.includes(channel._id),
        imageUrl: channel.imageUrl || '/images/placeholder.jpg',
      };
      if (!acc[genre]) acc[genre] = [];
      acc[genre].push(item);
      return acc;
    },
    {},
  );

  return (
    <>
      <div className="mx-[100px]">
        <h1 className="relative mb-15 inline-block text-[28px] font-bold">
          커뮤니티
          <span className="absolute bottom-[-9px] left-0 h-[4px] w-[97px] bg-[var(--color-main)]" />
        </h1>

        {Object.entries(groupedByGenre).map(([genre, items]) => (
          <div key={genre} className="mb-20">
            <h2 className="mb-6 text-xl font-semibold">{genre}</h2>
            <div className="grid grid-cols-1 gap-x-[32px] gap-y-[24px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {items.map((item) => (
                <ChannelCard
                  key={item.id}
                  {...item}
                  onClick={() => navigate(`/channel/${item.id}`)}
                  onBookmarkToggle={() => toggleSubscribe(item.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
