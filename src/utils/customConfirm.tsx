import { Slide, toast, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { twMerge } from 'tailwind-merge';
import Button from '../components/Button';

// 공통된 옵션 정의
const commonOptions = {
  position: 'top-center' as ToastPosition,
  autoClose: false,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: false,
  theme: 'light',
  transition: Slide,
};

export const customConfirm = (message: string): Promise<boolean> => {
  return new Promise((resolve) => {
    toast(
      ({ closeToast }) => (
        <div
          className="flex w-full flex-col gap-4 p-2 text-black"
          style={{ whiteSpace: 'pre-wrap' }}
        >
          <p>{message}</p>
          <div className="flex justify-end gap-2">
            <Button
              className={twMerge(
                'btn-style-comment',
                'rounded-xl bg-[var(--color-main)] text-white hover:bg-[var(--color-sub)]',
              )}
              onClick={() => {
                resolve(true);
                closeToast();
              }}
            >
              확인
            </Button>
            <Button
              className={twMerge('btn-style-comment', 'rounded-xl')}
              onClick={() => {
                resolve(false);
                closeToast();
              }}
            >
              취소
            </Button>
          </div>
        </div>
      ),
      {
        ...commonOptions,
        autoClose: false,
      },
    );
  });
};
