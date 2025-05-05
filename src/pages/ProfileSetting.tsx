import profile from "../assets/imgs/리터.png";
import CancelBtn from "../components/CancelBtn";
import CurrentPassWord from "../components/CurrentPassWord";
import NewCheck from "../components/NewCheck";
import NewPassword from "../components/NewPassword";
import ProfileInput from "../components/NickNameInput";
import SaveBtn from "../components/SaveBtn";

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
            <div className="h-3.75"></div>
            <button className="text-ST01 bg-[var(--color-gray1)] py-2.5 px-3 rounded-xl">
              프로필 사진 변경
            </button>
          </div>
        </div>
        <div className="mt-13.5">
          <span className="block text-ST01">닉네임</span>
          <ProfileInput />
        </div>
        <div className="mt-6.5">
          <span className="block text-ST01">기존 비밀번호</span>
          <CurrentPassWord />
        </div>

        <div className="mt-6.5">
          <span className="block text-ST01">새 비밀번호</span>
          <NewPassword />
        </div>
        <div className="mt-6.5">
          <span className="block text-ST01">새 비밀번호 확인</span>
          <NewCheck />
        </div>
        <div className="flex w-[80%] justify-end mt-6.75">
          <CancelBtn />
          <SaveBtn />
        </div>
        <div className="h-10"></div>
      </div>
    </>
  );
}
