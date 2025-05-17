import type { Channel } from '../types/channel';

export function channelIndexMapping(
  channels: Channel[],
): Record<string, number> {
  return channels.reduce<Record<string, number>>((acc, channel, index) => {
    acc[channel._id] = index;
    return acc;
  }, {});
}
