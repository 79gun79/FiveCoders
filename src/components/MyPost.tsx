import CommnetButton from "./CommentButton";
import LikeButton from "./LikeButton";
import profile from "../assets/imgs/리터.png";

export default function MyPost() {
  return (
    <>
      <div className="block w-[100%] h-[196px] border-[0.3px] mt-[40px] pt-[20px] px-[23.35px] rounded-3xl  shadow-2xl">
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
        <div className="border-1 mt-[45px] border-[var(--color-gray3)]"></div>
        <div className="mt-5 justify-center content-center flex">
          <LikeButton />
          <div className="w-[34%]"></div>
          <CommnetButton />
        </div>
      </div>
      {/* 게시글 박스 */}
    </>
  );
}
