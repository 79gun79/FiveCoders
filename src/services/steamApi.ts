import axios from 'axios';

const STEAM_API_KEY = import.meta.env.VITE_STEAM_API_KEY;

//프로필 정보
export const getPlayerSummaries = async (steamIds: string[]) => {
  const ids = steamIds.join(',');
  const url = `/steam-api/ISteamUser/GetPlayerSummaries/v0002/`;
  const params = {
    key: STEAM_API_KEY,
    steamids: ids,
    format: 'json',
  };

  const response = await axios.get(url, { params });
  return response.data.response.players;
};

//소유한 게임 정보 (플레이 타임 포함)
export const getOwnedGames = async (steamId: string) => {
  const url = `/steam-api/IPlayerService/GetOwnedGames/v0001/`;
  const params = {
    key: STEAM_API_KEY,
    steamid: steamId,
    include_appinfo: 1,
    format: 'json',
  };
  const response = await axios.get(url, { params });
  return response.data.response;
};

//최근 플레이한 게임
export const getRecentlyPlayedGames = async (steamIds: string[]) => {
  const ids = steamIds.join(',');
  const url = `/steam-api/IPlayerService/GetRecentlyPlayedGames/v0001/`;
  const params = {
    key: STEAM_API_KEY,
    steamids: ids,
    format: 'json',
  };
  const response = await axios.get(url, { params });
  return response.data.response.players;
};
