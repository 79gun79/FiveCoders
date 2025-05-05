import { twMerge } from "tailwind-merge";
import userData from "../store/UserData";

export default function MyInfo() {
  const myPost = userData((state) => state.myPost);
  const myFollower = userData((state) => state.myFollower);
  const myFollowing = userData((state) => state.myFollowing);

  return (
    <>
      <div className="inlin-grid ml-[46px] content-center">
        <div className="flex border-[0.5px] rounded-[8px] h-[79px] w-[388.38px] text-center justify-center p-[7.11px] divide-x-[0.5px] divide-solid divide-[var(--color-gray5)]">
          <div className=" w-[121.09px] content-center justify-center">
            <div className="text-T01 m-[-3px]">게시글</div>
            <div className={twMerge("number")}>{myPost}</div>
          </div>
          <div className="w-[121.09px] content-center justify-center">
            <div className="text-T01 m-[-3px]">팔로워</div>
            <div className={twMerge("number")}>{myFollower}</div>
          </div>
          <div className="w-[121.09px] content-center justify-center">
            <div className="text-T01 m-[-3px]">팔로잉</div>
            <div className={twMerge("number")}>{myFollowing}</div>
          </div>
        </div>
      </div>
    </>
  );
}
