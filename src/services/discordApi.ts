import axios from 'axios';

const BASE_URL = 'https://discordlookup.mesalytic.moe/v1';
export const getDiscordUser = async (userId: string) => {
  const url = `${BASE_URL}/user/${userId}`;
  const response = await axios.get(url);
  return response.data;
};
