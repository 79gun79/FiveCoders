import { twMerge } from "tailwind-merge";

export default function ChannelButton({
  bgColor,
  children,
  isBorder,
}: {
  bgColor?: string;
  children: string;
  isBorder: boolean;
}) {
  return (
    <>
      <button
        className={twMerge(
          "w-[104px] h-[34px] text-[14px] bg-[var(--color-main)] border-[var(--color-main)] text-[var(--color-black)] rounded-[14px]",
          bgColor,
          isBorder ? "border" : ""
        )}
      >
        {children}
      </button>
    </>
  );
}
