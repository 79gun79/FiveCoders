import profile from '../assets/imgs/기본 프로필.png';
import setting from '../assets/icons/Setting.svg';
import { twMerge } from 'tailwind-merge';
import MyInfo from '../components/MyInfo';
import MyPost from '../components/MyPost';
import userData from '../types/UserData';
import MyComment from '../components/MyComment';
import { useState } from 'react';
import { Link } from 'react-router';

export default function MyPage() {
  const userName = userData((state) => state.userName);
  const userEmail = userData((state) => state.userEmail);
  const [content, setContent] = useState('최신');
  const [selectedBtn, setSelectedBtn] = useState('최신');

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

  return (
    <>
      <div className="relative mt-[54px] flex flex-col items-center">
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
            <MyInfo />
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
