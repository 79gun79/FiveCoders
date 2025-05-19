import NotificationCard from './NotificationCard';
import { Notification } from '../types/notification';

type Props = {
  isOpen: boolean;
  onClear: () => void;
  notifications: Notification[];
  onRead: (id: string) => void;
};

export default function NotificationDropdown({
  isOpen,
  onClear,
  notifications,
  onRead,
}: Props) {
  if (!isOpen) return null;

  const hasNotifications = notifications.length > 0;

  return (
    <div className="absolute top-full -right-[55px] z-50 mt-0 max-h-[400px] w-[320px] overflow-x-hidden overflow-y-auto rounded-xl border border-[var(--color-gray2)] bg-[var(--color-bg-white)]">
      <div className="flex justify-between px-4 pt-4 pb-2 font-bold">
        <span className="text-[16px]">알림</span>
        {hasNotifications && (
          <button
            onClick={onClear}
            className="cursor-pointer text-[12px] text-[var(--color-gray7)] hover:text-[var(--color-text-black)]"
          >
            모두 읽기
          </button>
        )}
      </div>

      <div
        className={`flex min-h-[290px] flex-col ${!hasNotifications ? 'justify-center' : ''}`}
      >
        {!hasNotifications ? (
          <span className="mb-8 text-center text-[14px] text-[var(--color-gray6)]">
            새로운 알림이 없습니다.
          </span>
        ) : (
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id}>
                <NotificationCard {...notification} onRead={onRead} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
