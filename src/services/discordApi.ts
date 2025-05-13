import axios from 'axios';

const BASE_URL = 'https://discordlookup.mesalytic.moe/v1';
export const getDiscordUser = async (userId: string) => {
  const url = `${BASE_URL}/user/${userId}`;
  const response = await axios.get(url);
  return response.data;
};

/*
  {
      "id": "604779545018761237",
      "tag": "mesa#0101",
      "badges": [
          "HOUSE_BRAVERY",
          "EARLY_VERIFIED_BOT_DEVELOPER",
          "ACTIVE_DEVELOPER"
      ],
      "avatar": {
          "id": "02a161dcd6d590fbce550d6872468cc7",
          "link": "https://cdn.discordapp.com/avatars/604779545018761237/02a161dcd6d590fbce550d6872468cc7",
          "is_animated": false
      },
      "banner": {
          "id": "a_b987e17d75cc964905b04a575636c60e",
          "link": "https://cdn.discordapp.com/banners/604779545018761237/a_b987e17d75cc964905b04a575636c60e",
          "is_animated": true,
          "color": "#385d6d"
      }
      */
