import { useState } from 'react';

export default function NewPassword() {
  const [isInputClicked, setIsInputClicked] = useState(false);
  return (
    <>
      <div>
        <input
          type="text"
          className="input text-T02 w-185"
          onFocus={() => {
            setIsInputClicked(true);
          }}
          onBlur={() => {
            setIsInputClicked(false);
          }}
          placeholder={
            isInputClicked === true
              ? ''
              : '8자 이상, 16자 이하 특수문자를 포함하여 입력해 주세요'
          }
        />
      </div>
    </>
  );
}
