import profile from "../assets/imgs/기본 프로필.png";
import userData from "../store/UserData";

export default function MyComment() {
  const userName = userData((state) => state.userName);
  return (
    <>
      <div className="block commentBox">
        <div className="flex">
          <img
            src={profile}
            alt="프로필"
            className="w-[50px] h-[50px] rounded-full"
          />
          <div className="block ml-[8.12px]">
            <span className="block text-H03">{userName}</span>
            <div className="h-[7px]"></div>
            <span className="block text-ST02">내 댓글입니다</span>
          </div>
        </div>
      </div>
    </>
  );
}
