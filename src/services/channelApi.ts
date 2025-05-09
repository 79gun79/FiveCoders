import { client } from './axios';
import { Channel } from '../types/channel';

export const fetchChannels = async (): Promise<Channel[]> => {
  const { data } = await client.get('/channels');
  return data;
};
