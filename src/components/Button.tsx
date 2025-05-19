import { twMerge } from 'tailwind-merge';

type ButtonProps = {
  className?: string;
} & React.ComponentPropsWithoutRef<'button'>;

export default function Button({
  className = '',
  type = 'button',
  disabled,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={twMerge('text-base', className)}
      {...rest}
    >
      {children}
    </button>
  );
}
