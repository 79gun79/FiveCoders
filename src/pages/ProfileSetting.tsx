import { Link } from 'react-router';
import Button from '../components/Button';
import ProfileUpload from '../components/ProfileUpload';
import { validatePassword, validateUsername } from '../utils/validators';
import { useEffect, useState } from 'react';
import ValidateNickNameInput from '../components/ValidateNickNameInput ';
import { twMerge } from 'tailwind-merge';
import ValidatePasswordInput from '../components/ValidatePasswordInput';
import Tooltip from '../components/Tooltip';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { client } from '../services/axios';

export default function ProfileSetting() {
  // const userPassWord = userData((state) => state.myPassWord);
  const [userEmail, setUserEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [userPassWord, setUserPassword] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const userId = '680b2cb73fc74c12d94141ad';

  const validateConfirmPassword = (value: string) => {
    if (value !== password && value !== '') {
      return '비밀번호가 일치하지 않습니다.';
    }
  };

  const validateNewPassword = (value: string) => {
    const isPassword = validatePassword(value);
    if (isPassword === '8~16자, 영문 숫자 특수문자 모두 포함' && value !== '') {
      return '8~16자, 영문 대소문자와 숫자, 특수문자 모두 포함해주세요';
    } else if (
      isPassword !== '8~16자, 영문 숫자 특수문자 모두 포함' &&
      value === currentPassword
    ) {
      return '새 비밀번호를 입력해 주세요';
    }
  };

  const validateCurrentPassword = (value: string) => {
    if (value !== userPassWord && value !== '') {
      return '비밀번호가 다릅니다';
    }
  };

  const isFormValid =
    (username &&
      currentPassword &&
      !validateCurrentPassword(currentPassword) &&
      password === '') ||
    (username &&
      currentPassword &&
      !validateCurrentPassword(currentPassword) &&
      password &&
      confirmPassword &&
      !validatePassword(password) &&
      password === confirmPassword &&
      !validateNewPassword(password));

  const notify = () => {
    if (isFormValid === true) {
      toast.success('저장되었습니다', { closeButton: false });
      setCurrentPassword('');
      setPassword('');
      setConfirmPassword('');
      setButtonDisabled(true);
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
    client(`/users/${userId}`).then((response) =>
      setUsername(response.data.fullName),
    );
    client(`/users/${userId}`).then((response) =>
      setUserPassword(response.data.password),
    );
    console.log(userPassWord);
    client(`/users/${userId}`).then((response) => {
      setUserEmail(response.data.email);
    });
  }, []);

  return (
    <>
      <div className="mx-50 flex flex-col content-center items-start justify-start">
        <span className="textH2">프로필 설정</span>
        <div className="mt-12.5 flex content-center items-center">
          <ProfileUpload userEmail={userEmail} />
        </div>
        <div className="mt-13.5">
          <div className="flex items-center">
            <span className="textST1 block">닉네임</span>
            <Tooltip content="닉네임을 변경하기 위해서는 현재 비밀번호를 함께 입력해주세요">
              <button>?</button>
            </Tooltip>
          </div>
          <ValidateNickNameInput
            value={username}
            onChange={setUsername}
            validate={validateUsername}
            placeholder="2자 이상, 8자 이하로 입력해주세요"
            className={twMerge('input text-T02 w-185')}
          />
        </div>
        <div className="mt-6.5">
          <span className="textST1 block">기존 비밀번호</span>
          <ValidatePasswordInput
            value={currentPassword}
            onChange={setCurrentPassword}
            validate={validateCurrentPassword}
            placeholder="현재 비밀번호를 입력해 주세요"
            className={twMerge('input text-T02 w-185')}
          />
        </div>

        <div className="mt-6.5">
          <span className="textST1 block">새 비밀번호</span>
          <ValidatePasswordInput
            value={password}
            onChange={setPassword}
            validate={validateNewPassword}
            placeholder="8자 이상, 16자 이하 영문 대소문자와 숫자, 특수문자를 포함하여 입력해 주세요"
            className={twMerge('input text-T02 w-185')}
          />
        </div>
        <div className="mt-6.5">
          <span className="textST1 block">새 비밀번호 확인</span>
          <ValidatePasswordInput
            value={confirmPassword}
            onChange={setConfirmPassword}
            validate={validateConfirmPassword}
            placeholder="새 비밀번호를 한 번 더 입력해 주세요"
            className={twMerge('input text-T02 w-185')}
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
    </>
  );
}
