import { Link } from 'react-router-dom';

export default function HeaderNotLogin() {
  return (
    <div className="absolute right-6 flex items-center gap-3">
      <Link to={'/login'}>
        <button className="h-[44px] cursor-pointer rounded-full bg-[#51B8B2] px-4 font-bold text-[#FAFAFA]">
          로그인
        </button>
      </Link>
      <Link to={'/signup'}>
        <button className="h-[44px] cursor-pointer rounded-full border-1 border-[#BDBDBD] bg-[#FAFAFA] px-4 font-bold text-[#1F1F1F]">
          회원가입
        </button>
      </Link>
    </div>
  );
}
