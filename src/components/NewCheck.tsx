import { useState } from "react";

export default function NewCheck() {
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
            isInputClicked === true ? "" : "비밀번호를 한 번 더 입력해 주세요"
          }
        />
      </div>
    </>
  );
}
