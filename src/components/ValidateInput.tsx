import { useState } from "react";
import Input from "./Input";

//email 유효성 검사
export const validateEmail = (value: string) => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "올바르지 않은 이메일입니다.";
  }
  return "";
};

//username 유효성 검사
export const validateUsername = (value: string) => {
  if (!/^[A-Za-z가-힣]{2,8}$/.test(value)) {
    return "2~8자 이내 영문 또는 한글";
  }
  return "";
};

//password  유효성 검사
export const validatePassword = (value: string) => {
  if (
    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[\]{};:'",.<>/?`~])[A-Za-z\d!@#$%^&*()\-_=+\[\]{};:'",.<>/?`~]{8,16}$/.test(
      value
    )
  ) {
    return "8~16자, 영문 숫자 특수문자 모두 포함";
  }
  return "";
};

type InputType = "email" | "number" | "password" | "text";

type InputValidationProps = {
  type?: InputType;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  validate: (v: string) => string;
};

export default function ValidateInput({
  type = "text",
  placeholder,
  value,
  onChange,
  validate,
}: InputValidationProps) {
  const [touched, setTouched] = useState(false);
  const error = touched ? validate(value) : "";

  return (
    <>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setTouched(true)}
        placeholder={placeholder}
        className={
          error
            ? "border border-[#FF7043] bg-red-50 text-[#FF7043] outline-[#FF7043] outline-1 "
            : ""
        }
      />
      {error && (
        <p
          className={`mt-2 text-sm text-red-600 font-medium ${
            error ? "mt-2 visible" : "mt-4 invisible"
          }`}
        >
          {error || " "}
        </p>
      )}
    </>
  );
}
