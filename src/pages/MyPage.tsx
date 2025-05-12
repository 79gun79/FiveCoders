import profile from '../assets/imgs/기본 프로필.png';
import setting from '../assets/icons/Setting.svg';
import { twMerge } from 'tailwind-merge';
import MyInfo from '../components/MyInfo';
import MyPost from '../components/MyPost';
// import userData from '../data/UserData';
import MyComment from '../components/MyComment';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { UserAPI } from '../services/UserAPI';

export default function MyPage() {
  const [userName, setUserName] = useState<string>();
  const [userEmail, setUserEmail] = useState<string>();
  const [userPost, setUserPost] = useState<PostData[]>([]);
  const [userFollowing, setUserFollowing] = useState<MyFollowing[]>([]);
  const [userFollower, setUserFollower] = useState<MyFollower[]>([]);
  const [content, setContent] = useState('최신');
  const [selectedBtn, setSelectedBtn] = useState('최신');

  const fetchUserName = async () => {
    const result = await UserAPI.get('/users/680b2cb73fc74c12d94141ad');
    setUserName(result.data.fullName);
  };

  const fetchUserEmail = async () => {
    const result = await UserAPI.get('/users/680b2cb73fc74c12d94141ad');
    setUserEmail(result.data.email);
  };

  const fetchUserPost = async () => {
    const result = await UserAPI.get('/users/680b2cb73fc74c12d94141ad');
    setUserPost(result.data.posts);
  };

  const fetchUserFollowing = async () => {
    const result = await UserAPI.get('/users/680b2cb73fc74c12d94141ad');
    setUserFollowing(result.data.following);
  };

  const fetchUserFollower = async () => {
    const result = await UserAPI.get('/users/680b2cb73fc74c12d94141ad');
    setUserFollower(result.data.followers);
  };

  const buttonList = ['최신', '내 글', '댓글'];

  const handleContentButton = (e) => {
    const { name } = e.target;
    setContent(name);
    setSelectedBtn(e.currentTarget.innerText);
  };

  const selectComponent = {
    최신: [<MyPost />, <MyComment />],
    '내 글': <MyPost />,
    댓글: <MyComment />,
  };

  useEffect(() => {
    fetchUserName();
    fetchUserEmail();
    fetchUserPost();
    fetchUserFollowing();
    fetchUserFollower();
  }, []);

  return (
    <>
      <div className="relative mx-[160px] mt-[54px] flex flex-col items-center">
        <div>
          <div className="flex">
            <img
              src={profile}
              alt="profile"
              className="mr-[18px] size-[90px] overflow-hidden rounded-full object-fill"
            />
            <div className="left-[100px] inline-block content-center">
              <span className="block text-[28px]">{userName}</span>
              <span className="block text-[20px]">{userEmail}</span>
            </div>
            <MyInfo
              myPost={userPost.length}
              myFollowing={userFollowing.length}
              myFollower={userFollower.length}
            />
            <Link to="/setting">
              <button className="ml-[81.62px] h-[32px] cursor-pointer">
                <img src={setting} alt="setting" />
              </button>
            </Link>
          </div>
          {/* 개인 프로필 정보 */}
          <div className="h-[53px]"></div>
          <div className="flex">
            {buttonList.map((item) => {
              return (
                <button
                  className={twMerge(
                    'button ' +
                      (item === selectedBtn
                        ? 'community-tab-active'
                        : 'community-tab'),
                  )}
                  onClick={handleContentButton}
                  name={item}
                >
                  {item}
                </button>
              );
            })}
            <div className="inline-block w-[100%] border-b-2 border-[var(--color-gray3)]"></div>
            {/* 버튼 에리어 */}
          </div>
          <div>{content && <div>{selectComponent[content]}</div>}</div>
        </div>
      </div>
    </>
  );
}
// 불러오는 포스트와 댓글은 시간 순서로 정렬하도록 추후 수정
