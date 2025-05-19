import axios from 'axios';
import { useAuthStore } from '../stores/authStore';

export const client = axios.create({
  baseURL:
    window.location.hostname === 'localhost'
      ? 'import.meta.env.VITE_API_URL'
      : '/api',
  // withCredentials: true,
});

//요청 인터셉터
client.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

let retry = false;

//토큰 갱신 로직
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 403 && !retry) {
      console.log('token Fail'); //token refresh
      retry = true;
      try {
        //토큰 represh
        const { data } = await client.post('/token');

        //zustand 상태 업데이트
        useAuthStore.setState({
          accessToken: data.accessToken,
          isLoggedIn: true,
        });
        retry = false;

        //원본 요청 재시도
        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
        return client(originalRequest);
      } catch (error) {
        //리프레시 토큰도 만료된 경우 강제 로그아웃
        useAuthStore.getState().logout(); //상태 초기화, 로그아웃 처리
        window.location.href = '/login'; //로그인 페이지로 이동
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);
