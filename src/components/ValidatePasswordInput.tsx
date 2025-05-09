import { useState } from 'react';
import SettingInput from './SettingInput';
import { twMerge } from 'tailwind-merge';

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
  type,
  value,
  onChange,
  validate,
  placeholder = '비밀번호',
  onBlur,
  className,
}: PasswordInputProps) {
  const [touched, setTouched] = useState(false);

  const error = touched ? validate(value) : '';

  return (
    <div>
      <div className="relative">
        <SettingInput
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={(e) => {
            setTouched(true);
            if (onBlur) onBlur(e);
          }}
          placeholder={placeholder}
          className={twMerge(
            `${error ? 'bg-red-50 text-[#FF7043]' : ''}`,
            className,
          )}
        />
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
