import { useNavigate } from "react-router";
import Button from "../components/Button";
import ValidateInput from "../components/ValidateInput";
import { validateEmail } from "../utils/validators";
import { useState } from "react";
import Input from "../components/Input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuthStore } from "../stores/authStore";
import { client } from "../services/axios";

export default function Login() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await client.post("/login", {
        email,
        password,
      });
      login(data.accessToken);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("이메일/비밀번호를 확인하세요.");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-400">
        <div className="bg-white rounded-3xl shadow-lg p-10 w-full max-w-md">
          <h1 className="text-3xl font-extrabold text-center mb-8">로그인</h1>
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
                type={visible ? "text" : "password"}
                value={password}
                placeholder="비밀번호"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center text-[#757575] hover:text-[#51B8B2] focus:outline-none"
                onClick={() => setVisible((v) => !v)}
              >
                {visible ? (
                  <FaEyeSlash className="w-5 h-5" />
                ) : (
                  <FaEye className="w-5 h-5" />
                )}
              </button>
            </div>
            <Button type="submit" className="btn-style mt-8 mb-4">
              로그인
            </Button>
          </form>
          <div className="flex items-center mb-10 text-sm">
            <span className="text-(--color-gray8)">새로 오셨나요?</span>
            <a
              href="#"
              className="ml-1 text-(--color-main) hover:underline"
              onClick={(e) => {
                e.preventDefault();
                navigate("/signup");
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
