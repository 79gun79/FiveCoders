import setting from '../assets/icons/Setting.svg';
import { twMerge } from 'tailwind-merge';
import MyInfo from '../components/MyInfo';
import MyPost from '../components/MyPost';
// import userData from '../data/UserData';
import MyComment from '../components/MyComment';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { client } from '../services/axios';
import prof from '../assets/imgs/기본 프로필.png';

export default function MyPage() {
  const [userName, setUserName] = useState<string>();
  const [userEmail, setUserEmail] = useState<string>();
  const [userPost, setUserPost] = useState<PostData[]>([]);
  const [userFollowing, setUserFollowing] = useState<MyFollowing[]>([]);
  const [userFollower, setUserFollower] = useState<MyFollower[]>([]);
  const [userComment, setUserComment] = useState<CommentData[]>([]);
  const [userData, setUserData] = useState<[]>([]);
  const [image, setImage] = useState('');
  const [content, setContent] = useState('최신');
  const [selectedBtn, setSelectedBtn] = useState('최신');
  const [loading, setLoading] = useState<boolean>(true);
  const [myData, setMyData] = useState<[]>([]);
  const [disabled, setDisabled] = useState(false);

  const location = useLocation();

  const userId = location.state;

  const buttonList = ['최신', '게시글', '댓글'];

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
    게시글: <MyPost userName={userName} myPost={userPost} image={image} />,
    댓글: (
      <MyComment userName={userName} userComment={userComment} image={image} />
    ),
  };

  const checkUser = () => {
    if (userData !== myData) {
      setDisabled(false);
    } else if (userData === myData) {
      setDisabled(true);
    }
  };
  console.log(disabled);

  console.log(userId);

  useEffect(() => {
    client('/auth-user').then((response) => setMyData(response.data._id));
    client(`/users/${userData}`).then(
      (response) => (
        setUserName(response.data.fullName),
        setUserPost(response.data.posts),
        setUserEmail(response.data.email),
        setUserFollower(response.data.followers),
        setUserFollowing(response.data.following),
        setUserComment(response.data.comments),
        setImage(response.data.image || prof)
        // checkUser()
      ),
    );
    setUserData(userId);
  }, [userData]);

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  return (
    <>
      <div className="relative mx-[160px] mt-[15px] flex flex-col items-center">
        {!loading && (
          <div>
            <div className="flex">
              <img
                src={image}
                alt="profileImg"
                className="mr-[18px] size-[80px] overflow-hidden rounded-full object-fill"
              />
              <div className="left-[100px] inline-block content-center">
                <span className="block text-[24px]">{userName}</span>
                <span className="block text-[18px] text-[var(--color-gray7)]">
                  {userEmail}
                </span>
              </div>
              <MyInfo
                myPost={userPost.length}
                myFollowing={userFollowing.length}
                myFollower={userFollower.length}
              />
              {disabled && (
                <Link to="/setting">
                  <button className="ml-[81.62px] h-[32px] cursor-pointer select-none">
                    <img src={setting} alt="setting" />
                  </button>
                </Link>
              )}
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
        )}
      </div>
      {loading ? (
        <div className="absolute inset-0 z-50 flex h-screen items-center justify-center">
          <svg
            aria-hidden="true"
            className="h-10 w-10 animate-spin fill-[var(--color-main)] text-[var(--color-bg-white)]"
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
      ) : null}
    </>
  );
}
// 불러오는 포스트와 댓글은 시간 순서로 정렬하도록 추후 수정
