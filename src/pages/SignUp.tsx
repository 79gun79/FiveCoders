import { useState } from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import {
  validateEmail,
  validateUsername,
  validatePassword,
} from '../utils/validators';
import PasswordInput from '../components/PasswordInput';
import ValidateInput from '../components/ValidateInput';
import { client } from '../services/axios';
import axios from 'axios';
import background from '../assets/imgs/tile.png';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  //비밀 번호 확인 일치 검사
  const validateConfirmPassword = (value: string) => {
    if (value !== password) {
      return '비밀번호가 일치하지 않습니다.';
    }
    return '';
  };

  const navigate = useNavigate();

  //모든 입력이 유효한지
  const isFormValid =
    username &&
    email &&
    password &&
    confirmPassword &&
    !validateUsername(username) &&
    !validateEmail(email) &&
    !validatePassword(password) &&
    password === confirmPassword;

  //회원가입 핸들러
  const signUpHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await client.post('/signup', {
        fullName: username,
        email,
        password,
      });
      navigate('/login');
    } catch (error) {
      //console.log(error);
      if (axios.isAxiosError(error)) {
        const message = error.response?.data;
        if (
          typeof message === 'string' &&
          message.includes('The email address is already being used.')
        ) {
          alert('이미 가입된 이메일입니다.');
        } else {
          alert(message || '회원가입 실패');
        }
      } else {
        alert('예상치 못한 오류 발생');
      }
    }
  };

  return (
    <>
      <div
        className="flex min-h-screen items-center justify-center"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'auto',
          backgroundPosition: 'top left',
          backgroundRepeat: 'repeat',
        }}
      >
        <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-lg">
          <h1 className="mb-8 text-center text-3xl font-extrabold">
            회원 가입
          </h1>
          <form className="space-y-4" onSubmit={signUpHandler}>
            <ValidateInput
              value={username}
              onChange={setUsername}
              validate={validateUsername}
              placeholder="닉네임"
            />
            <ValidateInput
              type="email"
              value={email}
              onChange={setEmail}
              validate={validateEmail}
              placeholder="이메일"
            />
            <PasswordInput
              value={password}
              onChange={setPassword}
              validate={validatePassword}
              placeholder="비밀번호"
            />
            <PasswordInput
              value={confirmPassword}
              onChange={setConfirmPassword}
              validate={validateConfirmPassword}
              placeholder="비밀번호 확인"
            />
            <Button
              type="submit"
              disabled={!isFormValid}
              className="btn-style disabled:bg-(--color-gray3 mt-8 mb-4"
            >
              가입하기
            </Button>
          </form>
          <div className="mb-10 flex items-center text-sm">
            <span className="text-(--color-gray8)">이미 회원이신가요?</span>
            <a
              href="#"
              className="ml-1 text-(--color-main) hover:underline"
              onClick={(e) => {
                e.preventDefault();
                navigate('/login');
              }}
            >
              로그인
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
