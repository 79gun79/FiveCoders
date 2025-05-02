import profile from "../assets/imgs/리터.png";
import setting from "../assets/icons/Setting.svg";

export default function MyPage() {
  return (
    <>
      <div className="flex flex-col items-center relative h-[100%] mt-[54px]">
        <div>
          <div className="flex">
            <img
              src={profile}
              alt="profile"
              className="rounded-full h-[90px] w-[90px] overflow-hidden object-fill mr-[18px]"
            />
            <div className="inline-block left-[100px] content-center">
              <span className="block text-[28px]">설월화</span>
              <span className="block text-[20px]">neung_3@naver.com</span>
            </div>
            <div className="inlin-grid ml-[46px] content-center">
              <div className="flex border-[0.5px] rounded-[8px] h-[79px] w-[388.38px] text-center justify-center p-[7.11px] divide-x-[0.5px] divide-solid divide-[#9e9e9e]">
                <div className=" w-[121.09px] h-[64.78px] content-center">
                  <div className="text-[18px] m-[-3px]">게시글</div>
                  <div className="text-[18px] font-bold">40</div>
                </div>
                <div className="w-[121.09px] h-[64.78px] content-center">
                  <div className=" text-[18px] m-[-3px]">팔로워</div>
                  <div className="text-[18px] font-bold">10</div>
                </div>
                <div className="w-[121.09px] h-[64.78px] content-center">
                  <div className="text-[18px] m-[-3px]">팔로잉</div>
                  <div className="text-[18px] font-bold">20</div>
                </div>
              </div>
            </div>
            <button className="ml-[81.62px] h-[32px]">
              <img src={setting} alt="setting" />
            </button>
          </div>
          {/* 개인 프로필 정보 */}
        </div>
      </div>
    </>
  );
}
