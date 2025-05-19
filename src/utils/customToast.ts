import { Slide, toast, ToastIcon, ToastPosition } from 'react-toastify';

type ToastType = 'success' | 'error' | 'warning' | 'info';

// 공통된 옵션 정의
const commonOptions = {
  position: 'top-center' as ToastPosition,
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'light',
  transition: Slide,
};

export const customToast = (
  message: string,
  type: ToastType,
  icon?: ToastIcon | false,
  color?: string,
  backgroundColor?: string,
) => {
  const toastFn = {
    success: toast.success,
    error: toast.error,
    warning: toast.warning,
    info: toast.info,
  }[type];

  toastFn(message, {
    ...commonOptions,
    icon,
    style: {
      color: color || '#000',
      backgroundColor: backgroundColor || '#fff',
      whiteSpace: 'pre-wrap',
    },
  });
};
