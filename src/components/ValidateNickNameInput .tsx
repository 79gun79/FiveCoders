import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import SettingInput from './SettingInput';

type InputType = 'text';

type InputValidationProps = {
  type?: InputType;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  validate: (v: string) => string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
};

export default function ValidateNickNameInput({
  type = 'text',
  value,
  onChange,
  onBlur,
  validate,
  className,
}: InputValidationProps) {
  const [touched, setTouched] = useState(false);
  const error = touched ? validate(value) : '';
  const [isInputClicked, setIsInputClicked] = useState(false);

  return (
    <>
      <div>
        <SettingInput
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => {
            setIsInputClicked(true);
          }}
          onBlur={(e) => {
            setIsInputClicked(false);
            setTouched(true);
            if (onBlur) onBlur(e);
          }}
          placeholder={
            isInputClicked === true ? '' : '2자 이상, 8자 이하로 입력해주세요'
          }
          className={twMerge(
            'h-[53px] w-full',
            error ? 'bg-red-50 text-[#FF7043]' : '',
            className,
          )}
        />
      </div>
      {error && (
        <p className="mt-[-10px] min-h-[20px] text-sm font-medium text-[#D32F2F]">
          {error || ' '}
        </p>
      )}
    </>
  );
}
