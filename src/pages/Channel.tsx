import { twMerge } from "tailwind-merge";
import ChannelButton from "../componenets/ChannelButton";
import Post from "../componenets/Post";
import { dummyData } from "../types/dummyData";

export default function Channel() {
  const channelData: ChannelType = {
    authRequired: true,
    channelId: 1,
    name: "붕괴 스타레일",
    description: "붕괴 스타레일 2주년!",
    subscribe: 14,
    link: "https://hsr.hoyoverse.com/ko-kr/home",
    createdAt: "",
    updatedAt: "",
    posts: dummyData,
  };
  return (
    <>
      <div className="relative flex flex-col">
        <div
          className={twMerge(
            "postBorder",
            "mx-auto flex items-center justify-between mb-8 pb-8"
          )}
        >
          <div className="flex items-center gap-10">
            <img
              src="https://cdn.pixabay.com/photo/2021/12/28/14/59/axe-6899518_1280.jpg"
              alt="channel"
              className="w-25 h-25 rounded-full object-cover"
            />
            <div className="flex-col gap-2">
              <h2 className="textH2">{channelData.name}</h2>
              <p className={twMerge("textBase", "text-[18px]")}>
                {channelData.description}
              </p>
              <p className="textBase">구독: {channelData.subscribe}</p>
              <a className="textBase" href={channelData.link}>
                {channelData.link}
              </a>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex flex-row gap-4">
              <ChannelButton bgColor="bg-white" isBorder={true}>
                구독
              </ChannelButton>
              <ChannelButton isBorder={false}>구독중</ChannelButton>
            </div>
            <ChannelButton bgColor="bg-[#E5EBEE]" isBorder={false}>
              글쓰기
            </ChannelButton>
          </div>
        </div>
        <div className="mx-auto flex flex-row gap-8">
          <div className="flex-1">
            <div className="flex flex-col gap-[42px] w-vw">
              {channelData.posts.map((v) => (
                <Post key={v.id} {...v} />
              ))}
            </div>
          </div>
        </div>
        {/* 인기 글 나타내는 부분 일단 절대 위치 지정 */}
        <aside className="absolute top-0 right-10 w-[225px] p-4 border rounded-[22px] h-fit">
          <h4 className="textH4 mb-4">인기 글</h4>
          <ul className="text-[var(--color-black)] text-[16px] space-y-1">
            <li>수프림 등장했다</li>
            <li>나는...농이버섯이다...</li>
          </ul>
        </aside>
      </div>
    </>
  );
}
