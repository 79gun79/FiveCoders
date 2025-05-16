import { useEffect, useState } from 'react';
import profileImg from '../assets/channelImg.svg';
import { Link, useSearchParams } from 'react-router-dom';
import { client } from '../services/axios';
import SearchPost from '../components/SearchPost';

export default function Search() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');
  const [userTab, setUserTab] = useState(true);
  const [searchData, setSearchData] = useState<[User | Post]>();

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
      });
    setUserTab(true);
  }, [searchQuery]);

  return (
    <>
      <div className="mx-[200px]">
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

        {/* 사용자 검색 */}
        {userTab &&
          searchData
            ?.filter((e) => 'fullName' in e)
            .map((user) => (
              <div>
                <div className="relative my-3 flex items-center border border-[#d9d9d9] px-6 py-7">
                  <img
                    src={user.image || profileImg}
                    alt={`${user.fullName}`}
                    className="mr-6 h-14 w-14"
                  />
                  <span className="text-xl font-bold">{user.fullName}</span>
                  <Link
                    to={`/mypage/${user._id}`} state={user._id}
                    className="absolute right-6.5 cursor-pointer rounded-[8px] bg-[var(--color-gray1)] p-2 text-[var(--color-gray8)] hover:bg-[var(--color-main)] hover:text-white"
                  >
                    프로필 보기
                  </Link>
                </div>
              </div>
            ))}
        {userTab && searchData?.filter((e) => 'fullName' in e).length === 0 && (
          <div className="flex h-[300px] items-center justify-center">
            <div className="text-[18px] font-medium text-[var(--color-gray4)]">
              검색 결과가 없습니다.
            </div>
          </div>
        )}

        {/* 게시글 검색 */}
        {!userTab &&
          searchData
            ?.filter((e) => 'title' in e)
            .map((data) => <SearchPost key={data._id} searchId={data._id} />)}

        {!userTab && searchData?.filter((e) => 'title' in e).length == 0 && (
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
