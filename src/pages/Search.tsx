import { useEffect, useState } from "react";
import profileImg from "../assets/channelImg.svg";
import PostList from "../components/PostList";
import { useSearchParams } from "react-router-dom";
import { client } from "../services/axios";

export default function Search() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const [userTab, setUserTab] = useState(true);
  const [searchData, setSearchData] = useState<[UserType | PostType]>();

  useEffect(() => {
    client(`/search/all/${searchQuery}`) //
      .then((response) => setSearchData(response.data));
    setUserTab(true);
  }, [searchQuery]);

  return (
    <>
      <div className="mb-9.5 w-3xl text-xl">
        <button
          className="search-tab-style"
          onClick={() => setUserTab(true)}
          disabled={userTab}
        >
          사용자
        </button>
        <button
          className="search-tab-style"
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
              <div className="flex items-center border border-[#d9d9d9] relative my-3 px-6 py-7 rounded-3xl">
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
      {userTab && searchData?.filter((e) => "fullName" in e).length === 0 && (
        <div className="text-[18px] font-medium">검색 결과가 없습니다.</div>
      )}

      {/* 게시글 검색 */}
      {!userTab &&
        searchData
          ?.filter((e) => "title" in e)
          .map((post) => (
            <div className="mb-5">
              <PostList
                key={post.postId}
                postId={post.postId}
                title={post.title}
                userName={"(작업중)"}
                image={post.image}
                coverImage={post.coverImage || profileImg}
                comments={post.comments}
              />
            </div>
          ))}

      {!userTab && searchData?.filter((e) => "title" in e).length == 0 && (
        <div className="text-[18px] font-medium">검색 결과가 없습니다.</div>
      )}
    </>
  );
}
