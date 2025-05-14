import { useState } from 'react';
import SettingInput from './SettingInput';
import { twMerge } from 'tailwind-merge';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

type InputType = 'text';

type PasswordInputProps = {
  type?: InputType;
  value: string;
  onChange: (v: string) => void;
  validate: (v: string) => string;
  placeholder?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className: string;
};

export default function ValidatePasswordInput({
  value,
  onChange,
  validate,
  placeholder,
  onBlur,
  className,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const [touched, setTouched] = useState(false);

  const error = touched ? validate(value) : '';

  const [isInputClicked, setIsInputClicked] = useState(false);

  return (
    <div>
      <div className="relative">
        <SettingInput
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => {
            setIsInputClicked(true);
          }}
          onBlur={(e) => {
            setTouched(true);
            if (onBlur) onBlur(e);
            setIsInputClicked(false);
          }}
          placeholder={isInputClicked === true ? '' : placeholder}
          className={twMerge(
            'h-[53px]',
            `${error ? 'bg-red-50 text-[#FF7043]' : ''}`,
            className,
          )}
        />
        <button
          type="button"
          className="absolute top-1/2 right-4 flex -translate-y-1/2 items-center text-[#757575] hover:text-[#51B8B2] focus:outline-none"
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? (
            <FaEyeSlash className="h-5 w-5" />
          ) : (
            <FaEye className="h-5 w-5" />
          )}
        </button>
      </div>
      <p
        className={`mt-[-10px] text-sm font-medium text-[#D32F2F] ${
          error ? '' : 'invisible'
        }`}
      >
        {error || ' '}
      </p>
    </div>
  );
}
