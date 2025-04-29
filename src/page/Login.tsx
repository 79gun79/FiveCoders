import Button from "../components/Button";
import Input from "../components/Input";
import ValidateInput, { validateEmail } from "../components/ValidateInput";
import { useState } from "react";

//import { useNavigate } from "react-router";

export default function Login() {
  //const navgiate = useNavigate();
  //const {setToken} = useAuthStore()
  const [email, setEmail] = useState("");
  //const [error, setError] = useState('')
  //const [isLoading, setIsLoading] = useState(false)

  //navigate("/home", { replace: true });
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-400">
        <div className="bg-white rounded-3xl shadow-lg p-10 w-full max-w-md">
          <h1 className="text-3xl font-extrabold text-center mb-8">Log In</h1>
          <ValidateInput
            type="email"
            value={email}
            onChange={setEmail}
            validate={validateEmail}
            placeholder="Email"
          />
          <Input type="password" placeholder="Password" className="mb-8 mt-4" />
          <Button type="submit" className="btn-style mb-4">
            Log In
          </Button>
          <div className="flex items-center mb-10 text-sm">
            <span className="text-[#484848]">New to gammue?</span>
            <a href="#" className="ml-1 text-[#51B8B2] hover:underline ">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
