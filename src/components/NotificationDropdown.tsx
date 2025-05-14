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
    <div className="absolute -right-[55px] top-full z-50 mt-4 max-h-[400px] w-[340px] overflow-y-auto overflow-x-hidden rounded-xl border border-[var(--color-gray2)] bg-[var(--color-bg-white)]">
      <div className="flex justify-between pt-4 pb-2 px-4 font-bold">
        <span className="text-[16px]">알림</span>
        {hasNotifications && (
          <button
            onClick={onClear}
            className="text-[12px] text-[var(--color-gray7)] hover:text-[var(--color-text-black)] cursor-pointer"
          >
            모두 읽기
          </button>
        )}
      </div>

      <div className="min-h-[300px] flex flex-col justify-center">
        {!hasNotifications ? (
          <span className="mb-8 text-[14px] text-[var(--color-gray6)] text-center">
            새로운 알림이 없습니다.
          </span>
        ) : (
          <ul>
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className="border-b border-[var(--color-gray2)] last:border-none hover:bg-[var(--color-gray5)]"
              >
                <NotificationCard {...notification} onRead={onRead} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}