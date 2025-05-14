import { Link } from 'react-router';
import Button from '../components/Button';
import { validatePassword, validateUsername } from '../utils/validators';
import { useEffect, useState } from 'react';
import ValidateNickNameInput from '../components/ValidateNickNameInput ';
import { twMerge } from 'tailwind-merge';
import ValidatePasswordInput from '../components/ValidatePasswordInput';
import Tooltip from '../components/Tooltip';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { client } from '../services/axios';
import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import ProfileUpload from '../components/ProfileUpload';

export default function ProfileSetting() {
  const [userEmail, setUserEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [userData, setUserData] = useState<[]>([]);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [saveImage, setSaveImage] = useState<File | null>();
  const API_URL = import.meta.env.VITE_API_URL;
  const token = useAuthStore.getState().accessToken;

  const handleImageChange = (imageFile: File | null) => {
    if (imageFile) {
      setSaveImage(imageFile);
      console.log(imageFile);
    } else {
      setSaveImage(null);
    }
  };

  const validateConfirmPassword = (value: string) => {
    if (value !== password && value !== '') {
      return '비밀번호가 일치하지 않습니다.';
    }
  };

  const validateNewPassword = (value: string) => {
    const isPassword = validatePassword(value);
    if (isPassword === '8~16자, 영문 숫자 특수문자 모두 포함' && value !== '') {
      return '8~16자, 영문 대소문자와 숫자, 특수문자 모두 포함해주세요';
    }
  };

  const validateNickName = (value: string) => {
    const isNickName = validateUsername(value);
    if (isNickName === '2~8자 이내 영문 또는 한글' && value !== '') {
      return '2~8자 이내 영문 또는 한글로 입력해주세요';
    } else if (isNickName === '2~8자 이내 영문 또는 한글' && value === '') {
      return '변경하실 닉네임을 입력해 주세요';
    }
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
    if (isFormValid === true && saveImage) {
      toast.success('저장되었습니다', { closeButton: false });
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

      try {
        const formData = new FormData();
        // console.log('saveImage"', saveImage);
        formData.append('image', saveImage);
        // console.log(...formData);

        await axios({
          method: 'post',
          url: `${API_URL}users/upload-photo`,
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.log(error);
      }
      const timer = setTimeout(() => {
        setButtonDisabled(false);
      }, 1000);
      return () => clearTimeout(timer);
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
    client(`/users/${userData}`).then((response) => [
      setUsername(response.data.fullName),
      setUserEmail(response.data.email),
    ]);
  }, [userData]);

  return (
    <>
      <div className="flex justify-center">
        <div className="flex min-w-[850px] flex-col content-center justify-start">
          <span className="textH2">프로필 설정</span>
          <div className="mt-12.5 flex content-center items-center">
            <ProfileUpload
              userEmail={userEmail}
              changedImage={handleImageChange}
              userData={userData}
            />
          </div>
          <div className="mt-13.5">
            <div className="flex items-center">
              <span className="textST1 block text-[var(--color-gray7)]">
                닉네임
              </span>
              <Tooltip content="닉네임을 변경하기 위해서는 현재 비밀번호를 함께 입력해주세요" />
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
            <Link to="/mypage">
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
      </div>
    </>
  );
}
