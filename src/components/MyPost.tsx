import profile from "../assets/imgs/기본 프로필.png";
import userData from "../store/UserData";
import Button from "./Button";
import { AiFillMessage } from "react-icons/ai";
import { useState } from "react";
import { BiSolidLike } from "react-icons/bi";

export default function MyPost() {
  const userName = userData((state) => state.userName);
  const [clicked, isClicked] = useState(false);

  return (
    <>
      <div className="block postBox">
        <div className="flex">
          <img
            src={profile}
            alt="프로필"
            className="w-[50px] h-[50px] rounded-full"
          />
          <div className="block ml-[8.12px]">
            <span className="block text-H03">{userName}</span>
            <div className="h-[7px]"></div>
            <span className="block text-ST02">테스트 내용입니다</span>
          </div>
        </div>
        <div className="border-1 mt-[45px] border-[var(--color-gray3)]"></div>
        <div className="mt-5 justify-center content-center flex">
          <Button
            className={
              "w-100 text-T02 cursor-pointer hover:bg-[var(--color-gray1)] flex justify-center content-end" +
              (clicked
                ? " text-[var(--color-primary)]"
                : " text-[var(--color-gray5)]")
            }
            onClick={() => isClicked(!clicked)}
          >
            <BiSolidLike className="mr-2 h-5" /> 좋아요
          </Button>
          <Button className="text-T02 comment">
            <AiFillMessage className="mr-2 h-5" />
            58
          </Button>
        </div>
      </div>
      {/* 게시글 박스 */}
    </>
  );
}
