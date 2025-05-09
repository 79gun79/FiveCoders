import { useEffect, useState } from "react";
import profileImg from "../assets/channelImg.svg";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import PostList from "../components/PostList";
import { postsData } from "../data/postsData";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Channel } from "../types/channel";

export default function Search() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");

  const [userTab, setUserTab] = useState(true);
  const [searchData, setSearchData] = useState<[UserType | PostType]>();

  useEffect(() => {
    axios(`http://13.125.208.179:5009/search/all/${searchQuery}`) //
      .then((response) => setSearchData(response.data));
  });

  // 임시
  const channelData: Channel = {
    _id: "1",
    name: "서든어택",
    description: "슈팅",
    authRequired: false,
    posts: postsData,
    createdAt: "",
    updatedAt: "",
    __v: 0,
    imageUrl: "/channelImages/sudden_attack.jpg",
  };

  return (
    <>
      <Header />
      <main className="flex">
        <Sidebar />
        <section className="w-full max-w-4xl mt-[50px] mx-[160px]">
          <div className="mb-9.5 text-xl">
            <button
              className="w-[50%] border-b-2 border-b-[var(--color-gray3)] cursor-pointer disabled:border-b-[var(--color-main)] disabled:cursor-default"
              onClick={() => setUserTab(true)}
              disabled={userTab}
            >
              사용자
            </button>
            <button
              className="w-[50%] border-b-2 border-b-[var(--color-gray3)] cursor-pointer disabled:border-b-[var(--color-main)] disabled:cursor-default"
              onClick={() => setUserTab(false)}
              disabled={!userTab}
            >
              게시글
            </button>
          </div>

          {/* 사용자 검색 */}
          {userTab &&
            searchData
              ?.filter((e) => "fullName" in e)
              .map((user) => (
                <div>
                  <div
                    style={{ boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.1)" }}
                    className="flex items-center relative my-3 px-6 py-7 rounded-3xl"
                  >
                    <img
                      src={user.image || profileImg}
                      alt={`${user.fullName}`}
                      className="w-14 h-14 mr-6"
                    />
                    <span className="font-bold text-xl">{user.fullName}</span>
                    <button className="absolute right-6.5 p-2 cursor-pointer rounded-[8px] bg-[var(--color-gray1)] text-[var(--color-gray8)] hover:bg-[var(--color-main)] hover:text-white">
                      프로필 보기
                    </button>
                  </div>
                </div>
              ))}
          {userTab &&
            searchData?.filter((e) => "fullName" in e).length === 0 && (
              <div className="text-[18px] font-medium">
                검색 결과가 없습니다.
              </div>
            )}

          {/* 게시글 검색 */}
          {!userTab &&
            channelData.posts.map((v) => (
              <div className="mb-5">
                <PostList key={v.postId} {...v} />
              </div>
            ))}
        </section>
      </main>
      <footer></footer>
    </>
  );
}
