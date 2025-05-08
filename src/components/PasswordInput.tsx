import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Input from "./Input";

type PasswordInputProps = {
  value: string;
  onChange: (v: string) => void;
  validate: (v: string) => string;
  placeholder?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export default function PasswordInput({
  value,
  onChange,
  validate,
  placeholder = "비밀번호",
  onBlur,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const [touched, setTouched] = useState(false);

  const error = touched ? validate(value) : "";

  return (
    <div>
      <div className="relative">
        <Input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={(e) => {
            setTouched(true);
            if (onBlur) onBlur(e);
          }}
          placeholder={placeholder}
          className={`${
            error
              ? "border border-[#FF7043] bg-red-50 text-[#FF7043] outline-[#FF7043] outline-1 "
              : ""
          }`}
        />
        <button
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center text-[#757575] hover:text-[#51B8B2] focus:outline-none"
          onClick={() => setVisible((v) => !v)}
          tabIndex={-1}
          aria-label={visible ? "비밀번호 숨기기" : "비밀번호 보기"}
        >
          {visible ? (
            <FaEyeSlash className="w-5 h-5" />
          ) : (
            <FaEye className="w-5 h-5" />
          )}
        </button>
      </div>
      <p
        className={`mt-2 text-sm text-[#D32F2F] font-medium ${
          error ? "" : "invisible"
        }`}
      >
        {error || " "}
      </p>
    </div>
  );
}
