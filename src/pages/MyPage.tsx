import profile from "../assets/imgs/리터.png";
import setting from "../assets/icons/Setting.svg";
import { twMerge } from "tailwind-merge";
import like from "../assets/icons/Like.svg";
import comment from "../assets/icons/Reply.svg";

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
            <button
              className={twMerge(
                "button border-[var(--color-gray3)] hover:border-[var(--color-secondary)]"
              )}
            >
              내 글
            </button>
            <button
              className={twMerge(
                "button border-[var(--color-gray3)] hover:border-[var(--color-secondary)]"
              )}
            >
              댓글
            </button>
            <div className="inline-block w-[100%] border-b-2 border-[var(--color-gray3)]"></div>
            {/* 버튼 에리어 */}
          </div>
          <div className="block w-[100%] h-[196px] border-1 mt-[40px] pt-[20px] px-[23.35px] rounded-[50px]  shadow-2xl">
            <div className="flex">
              <img
                src={profile}
                alt="프로필"
                className="w-[50px] h-[50px] rounded-full border-1"
              />
              <div className="block ml-[8.12px]">
                <span className="block text-H03">능2버섯</span>
                <div className="h-[7px]"></div>
                <span className="block text-ST02">
                  나는...능이버섯이다...능이 해내야 한다...
                </span>
              </div>
            </div>
            <div className="border-1 mt-[45px] border-[#636363]"></div>
            <div className="mt-[7.56px]">
              <button className={twMerge("community-button text-T02")}>
                <img src={like} alt="좋아요" className="inline-flex mr-2" />
                like
              </button>
              <button className={twMerge("community-button text-T02 ml-5")}>
                <img src={comment} alt="댓글" className="inline-flex mr-2" />
                58
              </button>
            </div>
          </div>
          {/* 게시글 박스 */}
          <div className="block w-[100%] h-[196px] border-1 mt-[40px] pt-[20px] px-[23.35px] rounded-[50px]  shadow-2xl">
            <div className="flex">
              <img
                src={profile}
                alt="프로필"
                className="w-[50px] h-[50px] rounded-full border-1"
              />
              <div className="block ml-[8.12px]">
                <span className="block text-H03">능2버섯</span>
                <div className="h-[7px]"></div>
                <span className="block text-ST02">
                  나는...능이버섯이다...능이 해내야 한다...
                </span>
              </div>
            </div>
            <div className="border-1 mt-[45px] border-[#636363]"></div>
            <div className="mt-[7.56px]">
              <button className={twMerge("community-button text-T02")}>
                <img src={like} alt="좋아요" className="inline-flex mr-2" />
                like
              </button>
              <button className={twMerge("community-button text-T02 ml-5")}>
                <img src={comment} alt="댓글" className="inline-flex mr-2" />
                58
              </button>
            </div>
          </div>
          {/* 게시글 박스 */}
          <div className="block w-[100%] h-[196px] border-1 mt-[40px] pt-[20px] px-[23.35px] rounded-[50px]  shadow-2xl">
            <div className="flex">
              <img
                src={profile}
                alt="프로필"
                className="w-[50px] h-[50px] rounded-full border-1"
              />
              <div className="block ml-[8.12px]">
                <span className="block text-H03">능2버섯</span>
                <div className="h-[7px]"></div>
                <span className="block text-ST02">
                  나는...능이버섯이다...능이 해내야 한다...
                </span>
              </div>
            </div>
            <div className="border-1 mt-[45px] border-[#636363]"></div>
            <div className="mt-[7.56px]">
              <button className={twMerge("community-button text-T02")}>
                <img src={like} alt="좋아요" className="inline-flex mr-2" />
                like
              </button>
              <button className={twMerge("community-button text-T02 ml-5")}>
                <img src={comment} alt="댓글" className="inline-flex mr-2" />
                58
              </button>
            </div>
          </div>
          {/* 게시글 박스 */}
        </div>
      </div>
    </>
  );
}
