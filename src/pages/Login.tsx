import { useNavigate } from 'react-router';
import Button from '../components/Button';
import ValidateInput from '../components/ValidateInput';
import { validateEmail } from '../utils/validators';
import { useState } from 'react';
import Input from '../components/Input';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

//import { useNavigate } from "react-router";

export default function Login() {
  //const navgiate = useNavigate();
  //const {setToken} = useAuthStore()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  //const [error, setError] = useState('')
  //const [isLoading, setIsLoading] = useState(false)
  //navigate("/home", { replace: true });

  const navigate = useNavigate();
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-400">
        <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-lg">
          <h1 className="mb-8 text-center text-3xl font-extrabold">로그인</h1>
          <form className="space-y-4">
            <ValidateInput
              type="email"
              value={email}
              onChange={setEmail}
              validate={validateEmail}
              placeholder="이메일"
            />
            <div className="relative">
              <Input
                type={visible ? 'text' : 'password'}
                value={password}
                placeholder="비밀번호"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute top-1/2 right-4 flex -translate-y-1/2 items-center text-[#757575] hover:text-[#51B8B2] focus:outline-none"
                onClick={() => setVisible((v) => !v)}
              >
                {visible ? (
                  <FaEyeSlash className="h-5 w-5" />
                ) : (
                  <FaEye className="h-5 w-5" />
                )}
              </button>
            </div>
          </form>
          <Button type="submit" className="btn-style mt-8 mb-4">
            로그인
          </Button>
          <div className="mb-10 flex items-center text-sm">
            <span className="text-[#484848]">새로 오셨나요?</span>
            <a
              href="#"
              className="ml-1 text-[#51B8B2] hover:underline"
              onClick={(e) => {
                e.preventDefault();
                navigate('/signup');
              }}
            >
              회원가입
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
