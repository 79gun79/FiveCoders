import { useState } from "react";
import Button from "../components/Button";
import ValidateInput, {
  validateEmail,
  validateUsername,
  validatePassword,
} from "../components/ValidateInput";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-400">
        <div className="bg-white rounded-3xl shadow-lg p-10 w-full max-w-md">
          <h1 className="text-3xl font-extrabold text-center mb-8">Sign Up</h1>
          <ValidateInput
            value={username}
            onChange={setUsername}
            validate={validateUsername}
            placeholder="Username"
          />
          <ValidateInput
            type="email"
            value={email}
            onChange={setEmail}
            validate={validateEmail}
            placeholder="Email"
          />
          <ValidateInput
            type="password"
            value={password}
            onChange={setPassword}
            validate={validatePassword}
            placeholder="Password"
          />
          <Button type="submit" className="btn-style mt-8 mb-4">
            Sign Up
          </Button>
          <div className="flex items-center mb-10 text-sm">
            <span className="text-[#484848]">Already a gammuer?</span>
            <a href="#" className="ml-1 text-[#51B8B2] hover:underline ">
              Log In
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
