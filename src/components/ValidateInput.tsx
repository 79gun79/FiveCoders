import { useState } from 'react';
import Input from './Input';
import { twMerge } from 'tailwind-merge';

type InputType = 'email' | 'number' | 'password' | 'text';

type InputValidationProps = {
  type?: InputType;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  validate: (v: string) => string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
};

export default function ValidateInput({
  type = 'text',
  placeholder,
  value,
  onChange,
  validate,
  onBlur,
  className,
}: InputValidationProps) {
  const [touched, setTouched] = useState(false);
  const error = touched ? validate(value) : '';

  return (
    <>
      <div>
        <Input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={(e) => {
            setTouched(true);
            if (onBlur) onBlur(e);
          }}
          placeholder={placeholder}
          className={twMerge(
            error
              ? 'border border-[#FF7043] bg-red-50 text-[#FF7043] outline-1 outline-[#FF7043]'
              : '',
            className,
          )}
        />
      </div>
      {error && (
        <p className="mt-2 min-h-[20px] text-sm font-medium text-[#D32F2F]">
          {error || ' '}
        </p>
      )}
    </>
  );
}
