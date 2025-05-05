import { useState } from "react";

export default function CurrentPassWord() {
  const [isInputClicked, setIsInputClicked] = useState(false);
  return (
    <>
      <div>
        <input
          type="text"
          className="input text-T02"
          onFocus={() => {
            setIsInputClicked(true);
          }}
          onBlur={() => {
            setIsInputClicked(false);
          }}
          placeholder={
            isInputClicked === true ? "" : "현재 비밀번호를 입력해 주세요"
          }
        />
      </div>
    </>
  );
}
