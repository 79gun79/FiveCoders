export default function NotLoginUser() {
	return (
		<div className="absolute flex items-center right-8 gap-3">
			<button className="bg-[#51B8B2] cursor-pointer rounded-full h-[44px] px-5 text-[#FAFAFA] font-bold">
				로그인
			</button>
			<button className="bg-[#FAFAFA] cursor-pointer rounded-full h-[44px] px-5 text-[#1F1F1F] font-bold border-1 border-[#BDBDBD]">
				회원가입
			</button>
		</div>
	);
}
