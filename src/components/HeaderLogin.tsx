import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import channelImg from '../assets/channelImg.svg';
import { FaRegBell } from 'react-icons/fa';
import NotificationDropdown from './NotificationDropdown';
import { dummyNotifications } from '../data/dummyChannels';
import { Notification } from '../types/notification';
import { twMerge } from 'tailwind-merge';
import Button from './Button';
import { client } from '../services/axios';
import { useAuthStore } from '../stores/authStore';

export default function HeaderLogin() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] =
    useState<Notification[]>(dummyNotifications);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const logout = useAuthStore((state) => state.logout);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const notificationCount = notifications.filter((n) => !n.isRead).length;

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({
        ...n,
        isRead: true,
      })),
    );
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  const handleClick = () => setProfileDropdown(!profileDropdown);

  const logoutHandler = () => {
    client.post('/logout');
    logout();
    setModalOpen(false);
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="absolute right-6 flex items-center gap-4" ref={dropdownRef}>
      <div className="relative flex items-center">
        <button onClick={toggleDropdown} className="relative flex items-center">
          <FaRegBell className="h-6.5 w-6.5 cursor-pointer text-[var(--color-main)]" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-red-caution)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--color-bg-white)]">
              {notificationCount > 99 ? '99+' : notificationCount}
            </span>
          )}
        </button>
        <NotificationDropdown
          isOpen={isDropdownOpen}
          onClear={markAllAsRead}
          notifications={notifications}
          onRead={markNotificationAsRead}
        />
      </div>
      <button type="button" onClick={handleClick}>
        <img
          src={channelImg}
          alt="channelImg"
          className="h-full w-full cursor-pointer rounded-full object-cover"
        />
      </button>
      {profileDropdown && (
        <div className="absolute top-11 z-50 flex w-25 flex-col rounded-lg border border-[var(--color-gray3)] bg-white">
          <button
            className="mx-auto w-full rounded-t-lg px-1 py-1 hover:bg-[var(--color-gray1)]"
            onClick={() => setProfileDropdown(false)}
          >
            <Link to="/mypage">마이페이지</Link>
          </button>
          <button
            className="cursor-pointer rounded-b-lg px-1 py-1 text-[#f00] hover:bg-[var(--color-gray1)]"
            onClick={() => {
              setProfileDropdown(false);
              setModalOpen(true);
            }}
          >
            로그아웃
          </button>
        </div>
      )}
      {modalOpen && (
        <>
          <div className="fixed inset-0 z-100 bg-black opacity-50"></div>
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
