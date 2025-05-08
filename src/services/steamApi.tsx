import axios from "axios";

const STEAM_API_KEY = import.meta.env.VITE_STEAM_API_KEY;
//const BASE_URL = "http://api.steampowered.com";

export const getPlayerSummaries = async (steamIds: string[]) => {
  const ids = steamIds.join(",");
  const url = `/steam-api/ISteamUser/GetPlayerSummaries/v0002/`;
  const params = {
    key: STEAM_API_KEY,
    steamids: ids,
    format: "json",
  };

  const response = await axios.get(url, { params });
  return response.data.response.players;
};
