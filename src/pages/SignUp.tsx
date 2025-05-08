import { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import {
  validateEmail,
  validateUsername,
  validatePassword,
} from "../utils/validators";
import PasswordInput from "../components/PasswordInput";
import ValidateInput from "../components/ValidateInput";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  //비밀 번호 확인 일치 검사
  const validateConfirmPassword = (value: string) => {
    if (value !== password) {
      return "비밀번호가 일치하지 않습니다.";
    }
    return "";
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-400">
        <div className=" bg-white rounded-3xl shadow-lg p-10 w-full max-w-md">
          <h1 className="text-3xl font-extrabold text-center mb-8">
            회원 가입
          </h1>
          <form className="space-y-4">
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
          </form>
          <Button type="submit" className="btn-style mt-8 mb-4">
            가입하기
          </Button>
          <div className="flex items-center mb-10 text-sm">
            <span className="text-[#484848]">이미 회원이신가요?</span>
            <a
              href="#"
              className="ml-1 text-[#51B8B2] hover:underline "
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
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
