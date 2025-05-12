import axios from 'axios';

const DF_API_KEY = import.meta.env.VITE_DF_KEY;

export const dfAPI = axios.create({
  baseURL: 'https://api.neople.co.kr/',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${DF_API_KEY}`,
  },
});

// export const DFCharacterInfo = async (
//   characterName: string,
//   server: string,
// ) => {
//   const url = `/df/servers/${server}/characters?characterName=${characterName}&apikey=${DF_API_KEY}`;
//   const params = {
//     key: DF_API_KEY,
//     server: 'hilder',
//     characterName: '활쏘는설월화',
//   };
//   const response = await axios.get(url, { params });
//   return response.data.characterName;
// };
