import { Link } from "react-router";
import Button from "../components/Button";
import CurrentPassWord from "../components/CurrentPassWord";
import NewCheck from "../components/NewCheck";
import NewPassword from "../components/NewPassword";
import NickNameInput from "../components/NickNameInput";
import ProfileUpload from "../components/ProfileUpload";

export default function ProfileSetting() {
  return (
    <>
      <div className="flex-col content-center justify-start ml-40 mt-12">
        <span className="text-H02">프로필 설정</span>
        <div className="flex mt-12.5 content-center items-center">
          <ProfileUpload />
        </div>
        <div className="mt-13.5">
          <span className="block text-ST01">닉네임</span>
          <NickNameInput />
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
          <Link to="/mypage">
            <Button className="cancel text-T02">취소</Button>
          </Link>
          <Link to="/mypage">
            <Button className="ml-2 apply text-T02">저장하기</Button>
          </Link>
        </div>
        <div className="h-10"></div>
      </div>
    </>
  );
}
