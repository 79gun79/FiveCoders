import { Link } from 'react-router';
import Button from '../components/Button';
import { validatePassword, validateUsername } from '../utils/validators';
import { useEffect, useState } from 'react';
import ValidateNickNameInput from '../components/ValidateNickNameInput ';
import { twMerge } from 'tailwind-merge';
import ValidatePasswordInput from '../components/ValidatePasswordInput';
// import Tooltip from '../components/Tooltip';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { client } from '../services/axios';
import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import ProfileUpload from '../components/ProfileUpload';

import prof from '../assets/imgs/defaultProfileImg.png';
import { useImageStore, usePreviewImage } from '../stores/imageStore';

export default function ProfileSetting() {
  const [userEmail, setUserEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [userData, setUserData] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [saveImage, setSaveImage] = useState<File | null | string>();
  const [loading, setLoading] = useState<boolean>(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const token = useAuthStore.getState().accessToken;
  const updatedPrevImage = usePreviewImage((state) => state.previewImage);
  const setProfileImage = useImageStore((state) => state.setProfileImage);

  const validateConfirmPassword = (value: string) => {
    if (value !== password && value !== '') {
      return '비밀번호가 일치하지 않습니다.';
    }
    return '';
  };

  const validateNewPassword = (value: string) => {
    const isPassword = validatePassword(value);
    if (isPassword === '8~16자, 영문 숫자 특수문자 모두 포함' && value !== '') {
      return '8~16자, 영문 대소문자와 숫자, 특수문자 모두 포함해주세요';
    }
    return '';
  };

  const validateNickName = (value: string) => {
    const isNickName = validateUsername(value);
    if (isNickName === '2~8자 이내 영문 또는 한글' && value !== '') {
      return '2~8자 이내 영문 또는 한글로 입력해주세요';
    } else if (isNickName === '2~8자 이내 영문 또는 한글' && value === '') {
      return '변경하실 닉네임을 입력해 주세요';
    }
    return '';
  };

  const isFormValid =
    (username && !validateUsername(username) && password === '') ||
    (username &&
      !validateUsername(username) &&
      password &&
      confirmPassword &&
      !validatePassword(password) &&
      password === confirmPassword &&
      !validateNewPassword(password));

  const notify = async () => {
    if (isFormValid === true) {
      setPassword('');
      setConfirmPassword('');
      setButtonDisabled(true);
      try {
        axios.put(
          `${API_URL}settings/update-user`,
          {
            fullName: username,
            username: '',
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } catch (error) {
        console.log(error);
      }
      if (password !== '') {
        try {
          axios.put(
            `${API_URL}settings/update-password`,
            {
              password: password,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
        } catch (error) {
          console.log(error);
        }
      }
      setLoading(true);
      if (saveImage !== '') {
        try {
          const formData = new FormData();
          formData.append('image', saveImage || prof);

          await axios({
            method: 'post',
            url: `${API_URL}users/upload-photo`,
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          });
          setProfileImage(saveImage);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
          toast.success('저장되었습니다', { closeButton: false });
          setButtonDisabled(false);
        }
      }
    } else {
      toast.error('다시 확인해주세요', { closeButton: false });
      setButtonDisabled(true);
      const timer = setTimeout(() => {
        setButtonDisabled(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  };

  useEffect(() => {
    client('/auth-user').then((response) => setUserData(response.data._id));
    if (userData) {
      client(`/users/${userData}`).then((response) => [
        setUsername(response.data.fullName),
        setUserEmail(response.data.email),
        setSaveImage(updatedPrevImage || response.data.image || prof),
      ]);
    }
  }, [userData, buttonDisabled, updatedPrevImage]);

  return (
    <>
      <div className="flex min-w-[850px] justify-center">
        <div className="flex flex-col content-center justify-start">
          <span className="textH2">프로필 설정</span>
          <div className="mt-12.5 flex">
            <ProfileUpload userEmail={userEmail} userData={userData} />
          </div>
          <div className="mt-13.5">
            <div className="flex items-center">
              <span className="textST1 block text-[var(--color-gray7)]">
                닉네임
              </span>
              {/* <Tooltip content="닉네임을 변경하기 위해서는 현재 비밀번호를 함께 입력해주세요" /> */}
            </div>
            <ValidateNickNameInput
              value={username}
              onChange={setUsername}
              validate={validateNickName}
              placeholder="2자 이상, 8자 이하로 입력해주세요"
              className={twMerge('input text-T02 w-[850px]')}
            />
          </div>
          <div className="mt-6.5">
            <span className="textST1 block text-[var(--color-gray7)]">
              새 비밀번호
            </span>
            <ValidatePasswordInput
              value={password}
              onChange={setPassword}
              validate={validateNewPassword}
              placeholder="8자 이상, 16자 이하 영문 대소문자와 숫자, 특수문자를 포함하여 입력해 주세요"
              className={twMerge('input text-T02 w-[850px]')}
            />
          </div>
          <div className="mt-6.5">
            <span className="textST1 block text-[var(--color-gray7)]">
              새 비밀번호 확인
            </span>
            <ValidatePasswordInput
              value={confirmPassword}
              onChange={setConfirmPassword}
              validate={validateConfirmPassword}
              placeholder="새 비밀번호를 한 번 더 입력해 주세요"
              className={twMerge('input text-T02 w-[850px]')}
            />
          </div>
          <div className="mt-6.75 flex w-[100%] content-end items-end justify-end">
            <Link to={`/mypage/${userData}`} state={userData}>
              <Button className="cancel textT2">취소</Button>
            </Link>
            <Button
              className="apply textT2 ml-2 disabled:bg-[var(--color-gray8)]"
              disabled={buttonDisabled}
              onClick={notify}
            >
              저장하기
            </Button>
            <ToastContainer
              position="bottom-center"
              autoClose={500}
              hideProgressBar={true}
              newestOnTop={false}
              transition={Slide}
              closeOnClick={false}
            />
          </div>
          <div className="h-10"></div>
        </div>
        {loading ? (
          <div className="absolute inset-0 z-50 flex h-screen items-center justify-center bg-[#141E30]/10">
            <svg
              aria-hidden="true"
              className="h-8 w-8 animate-spin fill-[var(--color-main)] text-[var(--color-bg-white)]"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        ) : null}
      </div>
    </>
  );
}
