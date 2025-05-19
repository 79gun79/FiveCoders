import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  //외부 api활용을 위한 proxy설정
  server: {
    proxy: {
      //steam api로 시작하는 요청을 steam web api로 프록시
      '/steam-api': {
        target: 'http://api.steampowered.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/steam-api/, ''),
        secure: false,
      },
      '/df-api': {
        target: 'https://api.neople.co.kr',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/df-api/, ''),
        secure: false,
      },
    },
  },
});
