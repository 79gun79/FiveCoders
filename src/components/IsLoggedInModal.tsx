import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';
import Button from './Button';
import { useNavigate } from 'react-router';

export default function IsLoggedInModal({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const handleConfirm = () => {
    navigate('/login');
    onClose();
  };

  return createPortal(
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-[1000] bg-black opacity-50"
      />
      <div className="fixed inset-0 z-[1001] flex items-center justify-center">
        <div className="w-[400px] rounded-[8px] bg-white p-8 text-center shadow-lg">
          <p className="text-[18px] font-medium">
            로그인이 필요한 서비스입니다
          </p>
          <p className="mb-[32px] text-[18px] font-medium">
            로그인 하시겠습니까?
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={onClose}
              className={twMerge(
                'btn-style-modal',
                'border border-[var(--color-gray4)] bg-white text-[var(--color-text-black)] hover:bg-[var(--color-gray1)]',
              )}
            >
              아니오
            </Button>
            <Button className="btn-style-modal" onClick={handleConfirm}>
              예
            </Button>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}
