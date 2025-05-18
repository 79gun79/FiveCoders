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
      <div>
        <h2 className="mt-[25px] px-8 py-2 text-[16px] text-[var(--color-gray8)]">
          겜뮤 친구들 👾
        </h2>
        <ul className="p-2.5">
          {sortedUsers.map((user) => (
            <li
              key={user._id}
              className="flex cursor-pointer items-center rounded-xl px-5.5 py-2.5 text-[16px] hover:bg-[var(--color-gray2)]"
              onClick={() => userClickhandler(user._id)}
            >
              <span
                className={`mr-2 h-2 w-2 rounded-full ${
                  user.isOnline ? 'bg-green-500' : 'bg-gray-400'
                }`}
              />
              <img
                src={
                  user.image && user.image.trim() !== ''
                    ? user.image
                    : defaultProfileImg
                }
                alt={user.fullName}
                className="mr-3 h-6 w-6 rounded-full border border-gray-200 object-cover"
              />
              <span className="flex-1 text-sm">{user.fullName}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
