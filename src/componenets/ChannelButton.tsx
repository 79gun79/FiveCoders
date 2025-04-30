import { twMerge } from "tailwind-merge";

export default function ChannelButton({
  bgColor,
  isBorder,
  icon,
  children,
}: {
  bgColor?: string;
  isBorder: boolean;
  icon: string;
  children: React.ReactNode;
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
        <span className="flex items-center justify-center gap-1">
          <img src={icon} alt="plus" className="w-4 h-4" />
          {children}
        </span>
      </button>
    </>
  );
}
