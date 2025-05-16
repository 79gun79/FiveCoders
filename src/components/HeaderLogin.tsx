import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import channelImg from '../assets/channelImg.svg';
import { FaRegBell } from 'react-icons/fa';
import NotificationDropdown from './NotificationDropdown';
import { Notification } from '../types/notification';
import { twMerge } from 'tailwind-merge';
import Button from './Button';
import { client } from '../services/axios';
import { useAuthStore } from '../stores/authStore';
import { useImageStore } from '../stores/imageStore';

export default function HeaderLogin() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [myData, setMyData] = useState<[]>([]);
  const [Image, setImage] = useState<string>('');
  const updatedImage = useImageStore((state) => state.profileImage);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const logout = useAuthStore((state) => state.logout);
  // const isUpdate = useRef(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
    setNotificationCount((prev) => Math.max(prev - 1, 0));
  };

  const toggleNotificationDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen((prev) => {
      if (!prev) setProfileDropdown(false);
      return !prev;
    });
  };

  const toggleProfileDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setProfileDropdown((prev) => {
      if (!prev) setIsDropdownOpen(false);
      return !prev;
    });
  };

  // 알림 api - PUT /notifications/seen 할 때 이어서 구현할 예정
  const handleClear = () => {
    setNotifications([]);
    setNotificationCount(0);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
        setProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const logoutHandler = () => {
    client.post('/logout');
    logout();
    setModalOpen(false);
    navigate('/');
  };

  useEffect(() => {
    client('/auth-user').then((response) => setMyData(response.data._id));
  }, []);

  useEffect(() => {
    if (myData!.length !== 0) {
      client(`/users/${myData}`).then((response) =>
        setImage(response.data.image || channelImg || updatedImage),
      );
    }
  }, [myData, Image, updatedImage]);

  return (
    <div className="absolute right-6 flex items-center gap-3">
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleNotificationDropdown}
          type="button"
          className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
        >
          <FaRegBell className="h-7 w-7 text-[var(--color-main)]" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-red-caution)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--color-bg-white)]">
              {notificationCount > 99 ? '99+' : notificationCount}
            </span>
          )}
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 z-50 mt-2">
            <NotificationDropdown
              isOpen={isDropdownOpen}
              onClear={handleClear}
              notifications={notifications}
              onRead={markNotificationAsRead}
            />
          </div>
        )}
      </div>

      <div className="relative" ref={profileRef}>
        <button
          type="button"
          onClick={toggleProfileDropdown}
          className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full"
        >
          <img
            src={Image}
            alt="channelImg"
            className="h-10 w-10 object-cover"
          />
        </button>
        {profileDropdown && (
          <div className="absolute top-full right-0 z-50 mt-2 w-[100px] rounded-xl border border-[var(--color-gray2)] bg-[var(--color-bg-white)] shadow-md">
            <ul className="text-[14px] text-[var(--color-text-black)]">
              <li className="border-b border-[var(--color-gray2)]">
                <Link to={`/mypage/${myData}`} state={myData}>
                  <button
                    onClick={() => setProfileDropdown(false)}
                    className="w-full cursor-pointer rounded-t-xl px-4 py-3 text-center hover:bg-[var(--color-gray2)]"
                  >
                    마이페이지
                  </button>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    setProfileDropdown(false);
                    setModalOpen(true);
                  }}
                  className="w-full cursor-pointer rounded-b-xl px-4 py-3 text-center text-[var(--color-red-caution)] hover:bg-[var(--color-gray2)]"
                >
                  로그아웃
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {modalOpen && (
        <>
          <div className="fixed inset-0 z-100 bg-[var(--color-text-black)] opacity-50"></div>
          <div className="fixed inset-0 z-150 flex items-center justify-center">
            <div className="w-[400px] rounded-[8px] bg-white p-8 text-center shadow-lg">
              <p className="mb-[32px] text-[18px] font-medium">
                로그아웃 하시겠습니까?
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  className={twMerge(
                    'btn-style-modal',
                    'border border-[var(--color-gray4)] bg-white text-[var(--color-text-black)] hover:bg-[var(--color-gray1)]',
                  )}
                  onClick={() => setModalOpen(false)}
                >
                  아니오
                </Button>
                <Button className="btn-style-modal" onClick={logoutHandler}>
                  예
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
