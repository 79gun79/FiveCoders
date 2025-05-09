import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ChannelCard from "../components/ChannelCard";
import type { Channel, ChannelItem } from "../types/channel";
import { dummyChannels } from "../data/dummyChannels.ts";

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
      const genre = channel.description || "기타";
      const item: ChannelItem = {
        id: channel._id,
        name: channel.name,
        isSubscribe: subscribes.includes(channel._id),
        genre,
        imageUrl: channel.imageUrl || "/images/placeholder.jpg",
      };
      if (!acc[genre]) acc[genre] = [];
      acc[genre].push(item);
      return acc;
    },
    {},
  );

  return (
    <>
      <h1 className="text-[28px] font-bold relative inline-block mb-15">
        커뮤니티
        <span className="absolute bottom-[-9px] left-0 w-[97px] h-[4px] bg-[var(--color-main)]" />
      </h1>
      {Object.entries(groupedByGenre).map(([genre, items]) => (
        <div key={genre} className="mb-20">
          <h2 className="text-xl font-semibold mb-6">{genre}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[32px] gap-y-[24px]">
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
    </>
  );
}
