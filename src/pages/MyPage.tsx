import profile from '../assets/imgs/기본 프로필.png';
import setting from '../assets/icons/Setting.svg';
import { twMerge } from 'tailwind-merge';
import MyInfo from '../components/MyInfo';
import MyPost from '../components/MyPost';
// import userData from '../data/UserData';
import MyComment from '../components/MyComment';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { client } from '../services/axios';

export default function MyPage() {
  const [userName, setUserName] = useState<string>();
  const [userEmail, setUserEmail] = useState<string>();
  const [userPost, setUserPost] = useState<PostData[]>([]);
  const [userFollowing, setUserFollowing] = useState<MyFollowing[]>([]);
  const [userFollower, setUserFollower] = useState<MyFollower[]>([]);
  const [userComment, setUserComment] = useState<CommentData[]>([]);
  const [content, setContent] = useState('최신');
  const [selectedBtn, setSelectedBtn] = useState('최신');
  const userId = '680b2cb73fc74c12d94141ad';
  // userId를 불러오는 방법 찾기

  const buttonList = ['최신', '내 글', '댓글'];

  const handleContentButton = (e) => {
    const { name } = e.target;
    setContent(name);
    setSelectedBtn(e.currentTarget.innerText);
  };

  const selectComponent = {
    최신: [
      <MyPost userName={userName} myPost={userPost} />,
      <MyComment userName={userName} userComment={userComment} />,
    ],
    '내 글': <MyPost userName={userName} myPost={userPost} />,
    댓글: <MyComment userName={userName} userComment={userComment} />,
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        client(`/users/${userId}`).then(
          (response) => (
            setUserName(response.data.fullName),
            setUserPost(response.data.posts),
            setUserEmail(response.data.email),
            setUserFollower(response.data.followers),
            setUserFollowing(response.data.following),
            setUserComment(response.data.comments)
          ),
        );
      } catch (error) {
        console.error('Error: ', error);
      }
    };
    getUser();
  }, []);

  return (
    <>
      <div className="relative mx-[160px] mt-[15px] flex flex-col items-center">
        <div>
          <div className="flex">
            <img
              src={profile}
              alt="profile"
              className="mr-[18px] size-[80px] overflow-hidden rounded-full object-fill"
            />
            <div className="left-[100px] inline-block content-center">
              <span className="block text-[24px]">{userName}</span>
              <span className="block text-[18px] text-[var(--color-gray7)]">{userEmail}</span>
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
