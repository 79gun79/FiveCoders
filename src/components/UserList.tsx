import { useEffect, useState } from 'react';
import { User } from '../types/user';
import defaultProfileImg from '../assets/imgs/defaultProfileImg.png';
import { fetchUsers } from '../services/userApi';
import { useNavigate } from 'react-router';

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch((err) => console.error(err));
  }, []);

  //온라인 유저 먼저 보이도록 정렬
  const sortedUsers = [...users].sort((a, b) => {
    return (b.isOnline ? 1 : 0) - (a.isOnline ? 1 : 0);
  });

  //유저 클릭 시 유저 페이지로 이동\
  const userClickhandler = (userId: string) => {
    navigate(`/mypage/${userId}`);
  };

  return (
    <>
      <div className="hide-scrollbar">
        <h2 className="mt-[25px] flex items-center justify-center px-8 py-2 text-[16px] text-[var(--color-gray8)] xl:justify-start">
          <span className="text-xl">👾</span>
          <span className="ml-2 hidden xl:inline">겜뮤 친구들</span>
        </h2>
        <ul className="flex flex-col items-center p-2.5 xl:items-stretch">
          {sortedUsers.map((user) => (
            <li
              key={user._id}
              className="flex cursor-pointer items-center rounded-xl px-4 py-2.5 text-[16px] hover:bg-[var(--color-gray2)]"
              onClick={() => userClickhandler(user._id)}
            >
              <div className="relative h-8 w-8 xl:mr-3">
                <img
                  src={
                    user.image && user.image.trim() !== ''
                      ? user.image
                      : defaultProfileImg
                  }
                  alt={user.fullName}
                  className="h-8 w-8 rounded-full border border-gray-200 object-cover"
                />
                <span
                  className={`absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white ${user.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}
                />
              </div>
              <span className="test-sm hidden flex-1 xl:inline">
                {user.fullName}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
