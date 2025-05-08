import { twMerge } from "tailwind-merge";

export default function ChooseCommunity() {
  return (
    <>
      <div
        className={twMerge(
          "postBorder",
          "absolute right-0 top-13 flex flex-col w-[175px] h-[fit] z-20 bg-white p-[10px] "
        )}
      >
        <p>즐겨찾는 커뮤니티</p>
        <p>전체 커뮤니티</p>
      </div>
    </>
  );
}
