import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './css/index.css';
import App from './App.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // 토스트 메시지 적용을 위한 설정

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContainer limit={1} />
    <App />
  </StrictMode>,
);
