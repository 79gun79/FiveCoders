import { Bounce, toast } from 'react-toastify';

export const infoToast = (str: string) => {
  toast.info(str, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
  });
};
