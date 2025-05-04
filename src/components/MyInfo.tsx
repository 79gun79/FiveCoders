import { twMerge } from "tailwind-merge";

export default function MyInfo() {
  return (
    <>
      <div className="inlin-grid ml-[46px] content-center">
        <div className="flex border-[0.5px] rounded-[8px] h-[79px] w-[388.38px] text-center justify-center p-[7.11px] divide-x-[0.5px] divide-solid divide-[var(--color-gray5)]">
          <div className=" w-[121.09px] content-center justify-center">
            <div className="text-T01 m-[-3px]">게시글</div>
            <div className={twMerge("number")}>40</div>
          </div>
          <div className="w-[121.09px] content-center justify-center">
            <div className="text-T01 m-[-3px]">팔로워</div>
            <div className={twMerge("number")}>10</div>
          </div>
          <div className="w-[121.09px] content-center justify-center">
            <div className="text-T01 m-[-3px]">팔로잉</div>
            <div className={twMerge("number")}>20</div>
          </div>
        </div>
      </div>
    </>
  );
}
