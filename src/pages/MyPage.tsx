import profile from "../assets/imgs/리터.png";

export default function MyPage() {
  return (
    <>
      <div className="flex flex-col justify-center items-center relative p-[38px]">
        <div className="w-[80%]">
          <div>
            <div className="flex">
              <img
                src={profile}
                alt="profile"
                className="rounded-full h-[100px] w-[100px] overflow-hidden object-fill mr-[18px]"
              />
              <div className="inline-block left-[100px] content-center">
                <span className="block text-[12px]">
                  게임에 쓴 돈이 전혀 궁금하지 않은
                </span>
                <span className="block text-[28px]">설월화</span>
                <span className="block text-[16px]">@seolwolwha</span>
              </div>
              <div className="inline-grid ml-[20px]">
                <div className="inline-flex border-2 rounded-[25px] p-[5px]">
                  <div className="pr-[10px] pl-[10px] content-center">
                    게시글
                  </div>
                  <div className="pr-[10px] border-r-[1px] content-center">
                    40
                  </div>
                  <div className="pr-[10px] pl-[10px] content-center">
                    팔로워
                  </div>
                  <div className="pr-[10px] border-r-[1px] content-center">
                    10
                  </div>
                  <div className="pr-[10px] pl-[10px] content-center">
                    팔로잉
                  </div>
                  <div className="pr-[10px] content-center">20</div>
                </div>
                <div className="inline-block border-2 rounded-[25px] pl-[10px] pt-[5px] pb-[5px] mt-[10px] content-center">
                  히히 재밌어요
                </div>
              </div>
            </div>
            {/* 개인 프로필 정보 */}
          </div>
          <div className="absolute top-[78px] right-[238px] text-[#51B8B2]">
            설정
          </div>
          <div className="border-[0.5px] mt-[20px] mb-[20px]"></div>
          <div className="mb-[20px]">User card area</div>
          <div className="border-2 h-[90px] w-[220px] rounded-[20px] relative"></div>
          <div className="h-[10px]"></div>
          <div className="border-[0.5px] mt-[20px] mb-[20px]"></div>
        </div>
      </div>
    </>
  );
}
