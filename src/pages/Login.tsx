import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import ValidateInput from '../components/ValidateInput';
import { validateEmail } from '../utils/validators';
import { useState } from 'react';
import Input from '../components/Input';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuthStore } from '../stores/authStore';
import { client } from '../services/axios';
import { customToast } from '../utils/customToast';
import background from '../assets/imgs/tile.png';

export default function Login() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await client.post('/login', {
        email,
        password,
      });
      //console.log('로그인 응답:', data);

      const role = data.user.role;
      const isAdmin = role === 'SuperAdmin';

      login(data.token, isAdmin);
      navigate('/');
    } catch (error) {
      console.log(error);
      customToast('이메일/비밀번호를 확인하세요.', 'error');
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
          <h1 className="mb-8 text-center text-3xl font-extrabold">로그인</h1>
          <form className="space-y-4" onSubmit={loginHandler}>
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
            <Button type="submit" className="btn-style mt-8 mb-4">
              로그인
            </Button>
          </form>
          <div className="mb-10 flex items-center text-sm">
            <span className="text-(--color-gray8)">새로 오셨나요?</span>
            <a
              href="#"
              className="ml-1 text-(--color-main) hover:underline"
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
