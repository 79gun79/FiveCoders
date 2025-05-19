import { useEffect, useState } from 'react';
import profileImg from '../assets/channelImg.svg';
import { Link, useSearchParams } from 'react-router-dom';
import { client } from '../services/axios';
import SearchPost from '../components/SearchPost';
import { User } from '../types/user';
import { Post } from '../types/post';

export default function Search() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');
  const [userTab, setUserTab] = useState(true);
  const [searchData, setSearchData] = useState<[User | Post]>();
  const [loading, setLoading] = useState(true);

  const filteredTags = [
    'p',
    'strong',
    'em',
    'u',
    's',
    'a',
    'img',
    'span',
    'br',
  ];
  const generateTagRegex = () => {
    const tagPattern = filteredTags.join('|');
    return new RegExp(`<\\/?(?:${tagPattern})\\b[^>]*>`, 'gi');
  }; // 해당 태그만 필터링

  const cleanHTMLTags = (str: string) => {
    const regex = generateTagRegex();
    return str.replace(regex, ''); // 해당 태그 안의 내용을 제거
  };

  useEffect(() => {
    setLoading(true);
    client(`/search/all/${searchQuery}`) //
      .then((response) => {
        const filteredData = response.data.filter(
          (item: Record<string, string>) => {
            if ('title' in item) {
              const plainText = cleanHTMLTags(item.title);
              return plainText.includes(searchQuery ?? '');
            }
            return true;
          },
        );
        setSearchData(filteredData);
      })
      .finally(() => {
        setLoading(false);
        setUserTab(true);
      });
  }, [searchQuery]);

  return (
    <>
      <div className="mx-[200px] min-w-[640px]">
        <div className="mb-9.5 text-xl">
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
        {/* 로딩중 */}
        {loading && (
          // <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#141E30]/70">
          <div className="z-50 flex h-120 items-center justify-center">
            <svg
              aria-hidden="true"
              className="h-8 w-8 animate-spin fill-[var(--color-main)] text-[var(--color-bg-white)]"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        )}

        {/* 사용자 검색 */}
        {!loading &&
          userTab &&
          searchData
            ?.filter((e) => 'fullName' in e)
            .map((user) => (
              <div>
                <div className="relative my-3 flex items-center border border-[#d9d9d9] px-6 py-7">
                  <img
                    src={user.image || profileImg}
                    alt={`${user.fullName}`}
                    className="mr-6 h-14 w-14 rounded-full"
                  />
                  <span className="text-xl font-bold">{user.fullName}</span>
                  <Link
                    to={`/mypage/${user._id}`}
                    state={user._id}
                    className="absolute right-6.5 cursor-pointer rounded-[8px] bg-[var(--color-gray1)] p-2 text-[var(--color-gray8)] hover:bg-[var(--color-main)] hover:text-white"
                  >
                    프로필 보기
                  </Link>
                </div>
              </div>
            ))}
        {!loading &&
          userTab &&
          searchData?.filter((e) => 'fullName' in e).length === 0 && (
            <div className="flex h-[300px] items-center justify-center">
              <div className="text-[18px] font-medium text-[var(--color-gray4)]">
                검색 결과가 없습니다.
              </div>
            </div>
          )}

        {/* 게시글 검색 */}
        {!loading &&
          !userTab &&
          searchData
            ?.filter((e) => 'title' in e)
            .map((data) => <SearchPost key={data._id} searchId={data._id} />)}

        {!loading &&
          !userTab &&
          searchData?.filter((e) => 'title' in e).length == 0 && (
            <div className="flex h-[300px] items-center justify-center">
              <div className="text-[18px] font-medium text-[var(--color-gray4)]">
                검색 결과가 없습니다.
              </div>
            </div>
          )}
      </div>
    </>
  );
}
