import axios from 'axios';

const DF_API_KEY = import.meta.env.VITE_DF_KEY;

export const getUser = async (serverId: string, charName: string) => {
  const url = `/df-api/df/servers/${serverId}/characters`;
  const params = {
    characterName: charName,
    apikey: DF_API_KEY,
    format: 'json',
  };

  const response = await axios.get(url, { params });
  return response.data;
};
