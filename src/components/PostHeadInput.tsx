import { twMerge } from 'tailwind-merge';
import { forwardRef } from 'react';

type OnlyLiterals<T> = T extends string
  ? string extends T
    ? never
    : T
  : never;

type ReactInputType = OnlyLiterals<
  React.InputHTMLAttributes<HTMLInputElement>['type']
>;

type InputProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'type'> & {
  type?: Exclude<ReactInputType, 'radio' | 'checkbox' | 'range'>;
};

const PostHeadInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, type = 'text', ...rest } = props;
  return (
    <input
      ref={ref}
      type={type}
      className={twMerge('input-style', className)}
      {...rest}
    />
  );
});

export default PostHeadInput;
// Ref를 사용하기위한 포스트 제목 입력창
