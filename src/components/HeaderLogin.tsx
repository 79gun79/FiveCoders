import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import channelImg from '../assets/channelImg.svg';
import { FaRegBell } from 'react-icons/fa';
import NotificationDropdown from './NotificationDropdown';
import { dummyNotifications } from '../data/dummyChannels';
import { Notification } from '../types/notification';
import { client } from '../services/axios';

export default function HeaderLogin() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] =
    useState<Notification[]>(dummyNotifications);
  const [myData, setMyData] = useState<[]>([]);
  const [Image, setImage] = useState<string>('');

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

  const handleClick = () => {
    navigate(`/mypage/${myData}`, { state: myData });
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

  client(`/users/${myData}`).then((response) =>
    setImage(response.data.image || channelImg),
  );

  useEffect(() => {
    client('/auth-user').then((response) => setMyData(response.data._id));
    console.log('check');
  }, [myData]);

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
      <div>
        <img
          onClick={handleClick}
          src={Image}
          alt="channelImg"
          className="h-[38px] w-[38px] cursor-pointer rounded-full object-cover"
        />
      </div>
    </div>
  );
}
