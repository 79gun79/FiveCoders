import { twMerge } from 'tailwind-merge';
import Button from './Button';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../stores/authStore';
import { client } from '../services/axios';

export default function IsLoggedOutModal({ onClose }: { onClose: () => void }) {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const logoutHandler = () => {
    client.post('/logout');
    logout();
    onClose();
    navigate('/');
  };

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-100 bg-[var(--color-text-black)] opacity-50"
      ></div>
      <div className="fixed inset-0 z-400 flex items-center justify-center">
        <div className="w-[400px] rounded-[8px] bg-white p-8 text-center shadow-lg">
          <p className="mb-[32px] text-[18px] font-medium">
            로그아웃 하시겠습니까?
          </p>
          <div className="flex justify-center gap-4">
            <Button
              className={twMerge(
                'btn-style-modal',
                'border border-[var(--color-gray4)] bg-white text-[var(--color-text-black)] hover:bg-[var(--color-gray1)]',
              )}
              onClick={onClose}
            >
              아니오
            </Button>
            <Button className="btn-style-modal" onClick={logoutHandler}>
              예
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
