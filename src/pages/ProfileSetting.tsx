import { Link } from 'react-router';
import Button from '../components/Button';
import ProfileUpload from '../components/ProfileUpload';
import { validatePassword, validateUsername } from '../utils/validators';
import userData from '../types/UserData';
import { useState } from 'react';
import ValidateNickNameInput from '../components/ValidateNickNameInput ';
import { twMerge } from 'tailwind-merge';
import ValidatePasswordInput from '../components/ValidatePasswordInput';

export default function ProfileSetting() {
  const userName = userData((state) => state.userName);
  const userPassWord = userData((state) => state.myPassWord);
  const [username, setUsername] = useState(userName);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const validateConfirmPassword = (value: string) => {
    if (value !== password) {
      return '비밀번호가 일치하지 않습니다.';
    }
    return '';
  };

  const validateCurrentPassword = (value: string) => {
    if (value !== userPassWord) {
      return '비밀번호가 다릅니다';
    }
    return '';
  };

  const isFormValid =
    (username &&
      currentPassword &&
      !validateCurrentPassword(currentPassword)) ||
    (currentPassword &&
      !validateCurrentPassword(currentPassword) &&
      password &&
      confirmPassword &&
      !validatePassword(password) &&
      password === confirmPassword);

  return (
    <>
      <div className="flex w-195 flex-col content-center items-start justify-start">
        <span className="textH2">프로필 설정</span>
        <div className="mt-12.5 flex content-center items-center">
          <ProfileUpload />
        </div>
        <div className="mt-13.5">
          <span className="textST1 block">닉네임</span>
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
            validate={validatePassword}
            placeholder="8자 이상, 16자 이하 특수문자를 포함하여 입력해 주세요"
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
        <div className="mt-6.75 flex w-[95%] justify-end">
          <Link to="/mypage">
            <Button className="cancel textT2">취소</Button>
          </Link>
          <Link to="/mypage">
            <Button className="apply textT2 ml-2" disabled={!isFormValid}>
              저장하기
            </Button>
          </Link>
        </div>
        <div className="h-10"></div>
      </div>
    </>
  );
}
