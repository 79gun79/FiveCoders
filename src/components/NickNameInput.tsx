import { useState } from 'react';
import userData from '../types/UserData';

export default function NickNameInput() {
  const [isInputClicked, setIsInputClicked] = useState(false);
  const userName = userData((state) => state.userName);
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
            isInputClicked === true ? '' : '2자 이상, 8자 이하로 입력해주세요'
          }
          defaultValue={userName}
        />
      </div>
    </>
  );
}
