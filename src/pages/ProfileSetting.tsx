import profile from "../assets/imgs/리터.png";

export default function ProfileSetting() {
  return (
    <>
      <div className="flex-col content-center justify-start ml-40 mt-12">
        <span className="text-H02">프로필 설정</span>
        <div className="flex mt-12.5 content-center items-center">
          <img src={profile} alt="프로필" className="h-30 w-30 rounded-full" />
          <div className="ml-8.5">
            <span className="block text-T01">이메일</span>
            <span className="mt-2.75 block text-T01">neung_3@naver.com</span>
            <input
              type="file"
              className="rounded-xl bg-[var(--color-gray1)] px-2.5"
            />
          </div>
        </div>
        <div className="mt-13.5">
          <span className="block text-ST01">닉네임</span>
          <input type="text" className="border-b-1 w-[80%] my-3.75 text-T02" />
        </div>
        <div className="mt-6.5">
          <span className="block text-ST01">기존 비밀번호</span>
          <input
            type="text"
            className="border-b-1 w-[80%] my-3.75 text-T02 placeholder:text-T02 placeholder:text-[var(--color-gray4)]"
            placeholder="현재 비밀번호를 입력해 주세요"
          />
        </div>

        <div className="mt-6.5">
          <span className="block text-ST01">새 비밀번호</span>
          <input
            type="text"
            className="border-b-1 w-[80%] my-3.75 text-T02 placeholder:text-T02 placeholder:text-[var(--color-gray4)]"
            placeholder="8자 이상, 16자 이하의 특수문자 포함"
          />
        </div>
        <div className="mt-6.5">
          <span className="block text-ST01">새 비밀번호 확인</span>
          <input
            type="text"
            className="border-b-1 w-[80%] my-3.75 text-T02 placeholder:text-T02 placeholder:text-[var(--color-gray4)]"
            placeholder="비밀번호를 한 번 더 입력해 주세요"
          />
        </div>
        <div className="flex w-[80%] justify-end mt-6.75">
          <button className="bg-[var(--color-gray3)] hover:bg-[var(--color-gray5)] cursor-pointer rounded-full px-5 py-2.5">
            취소
          </button>
          <button className="ml-2 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] px-3.25 py-2.5 text-T02 text-[var(--color-white)] cursor-pointer rounded-full">
            저장하기
          </button>
        </div>
      </div>
    </>
  );
}
