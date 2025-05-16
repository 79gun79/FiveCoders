import { client } from './axios';
import { Channel } from '../types/channel';

export const fetchChannels = async (): Promise<Channel[]> => {
  const { data } = await client.get('/channels');
  return data;
};

export const createChannel = async (channelData: {
  authRequired: boolean;
  description: string;
  name: string;
}) => {
  const response = await client.post('/channels/create', channelData);
  return response.data;
};

export const deleteChannel = async (channelId: string) => {
  const response = await client.delete('/channels/delete', {
    data: { id: channelId },
  });
  return response.data;
};
