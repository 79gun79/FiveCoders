import { Link } from "react-router";

export default function HeaderNotLogin() {
  return (
    <div className="absolute right-6 flex items-center gap-3">
      <Link to={"/login"}>
        <button className="bg-[#51B8B2] cursor-pointer rounded-full h-[44px] px-4 text-[#FAFAFA] font-bold">
          로그인
        </button>
      </Link>
      <Link to={"/signup"}>
        <button className="bg-[#FAFAFA] cursor-pointer rounded-full h-[44px] px-4 text-[#1F1F1F] font-bold border-1 border-[#BDBDBD]">
          회원가입
        </button>
      </Link>
    </div>
  );
}
