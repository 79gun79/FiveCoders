import { useState } from "react";

export default function NickNameInput() {
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
            isInputClicked === true ? "" : "2자 이상, 8자 이하로 입력해주세요"
          }
        />
      </div>
    </>
  );
}
