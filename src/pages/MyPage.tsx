import profile from "../assets/imgs/리터.png";
import setting from "../assets/icons/Setting.svg";
import { twMerge } from "tailwind-merge";
import MyInfo from "../components/MyInfo";
import MyPost from "../components/MyPost";

export default function MyPage() {
  return (
    <>
      <div className="flex flex-col items-center relative mt-[54px]">
        <div>
          <div className="flex">
            <img
              src={profile}
              alt="profile"
              className="rounded-full h-[90px] w-[90px] overflow-hidden object-fill mr-[18px]"
            />
            <div className="inline-block left-[100px] content-center">
              <span className="block text-[28px]">설월화</span>
              <span className="block text-[20px]">neung_3@naver.com</span>
            </div>
            <MyInfo />
            <button className="ml-[81.62px] h-[32px] cursor-pointer">
              <img src={setting} alt="setting" />
            </button>
          </div>
          {/* 개인 프로필 정보 */}
          <div className="h-[53px]"></div>
          <div className="flex">
            <button
              className={twMerge(
                "button border-[var(--color-primary)] hover:border-[var(--color-secondary)]"
              )}
            >
              최신
            </button>
            <button className={twMerge("button community-tab")}>내 글</button>
            <button className={twMerge("button community-tab")}>댓글</button>
            <div className="inline-block w-[100%] border-b-2 border-[var(--color-gray3)]"></div>
            {/* 버튼 에리어 */}
          </div>
          <MyPost />
          <MyPost />
          <MyPost />
        </div>
      </div>
    </>
  );
}
