import { twMerge } from "tailwind-merge";
import Button from "./Button";

export default function IsLoggedInModal() {
  return (
    <>
      <div className="bg-white w-[400px] p-8 ">
        <div className="text-center mb-[32px]">
          <p className="text-[18px] font-medium">
            로그인이 필요한 서비스입니다
          </p>
          <p className="text-[18px] font-medium">로그인 하시겠습니까?</p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Button
            className={twMerge(
              "btn-style-modal",
              "bg-white hover:bg-[#f2f2f2] text-[var(--color-black)] border border-[#bdbdbd]"
            )}
          >
            아니오
          </Button>
          <Button className="btn-style-modal">예</Button>
        </div>
      </div>
    </>
  );
}
