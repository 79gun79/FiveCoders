import axios from 'axios';

export const GetUserData = axios.create({
  baseURL:
    'https://api.neople.co.kr/df/servers/hilder/characters/변신캐설월화?apikey=EUfKHxHnDl5WUBVDwDbIQfCoQE4x4OGI',
});
