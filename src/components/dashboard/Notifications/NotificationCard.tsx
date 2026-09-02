import { CheckCheck, Trash2 } from 'lucide-react';
import { INotification } from '@/types/notifications.types';
import { GetRelativeTime } from '@/utils/formatDateTime';
import { getNotificationStyle } from './Notifications';

interface NotificationCardProps {
  notification: INotification;
  // eslint-disable-next-line no-unused-vars
  onMarkRead?: (id: string) => void;
  // eslint-disable-next-line no-unused-vars
  onDelete?: (id: string) => void;
}

const NotificationCard = ({ notification, onMarkRead, onDelete }: NotificationCardProps) => {
  const style = getNotificationStyle(notification?.type);
  const Icon = style.icon;

  return (
    <div
      className={`group flex items-start gap-4 rounded-md border p-3 transition-all ${
        !notification?.isRead ? 'border-primary/30 bg-white' : 'border-border bg-white opacity-65'
      }`}
    >
      <div
        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-sm"
        style={{ backgroundColor: `${style.color}1A`, color: style.color }}
      >
        <Icon size={16} color={style.color} />
      </div>
      <div className="flex-1">
        <div className="mb-0.5 flex items-center gap-2">
          <p className="text-sm font-semibold">{notification?.title}</p>
          {!notification?.isRead && <span className="bg-secondary h-2 w-2 rounded-full" />}
        </div>
        <p className="text-text-secondary text-sm leading-relaxed">{notification?.message}</p>
        <p className="text-text-secondary mt-1 text-xs">
          {GetRelativeTime(notification?.createdAt)}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2 transition-all">
        {!notification?.isRead && onMarkRead && (
          <button
            onClick={() => onMarkRead(notification?._id)}
            className="text-success cursor-pointer transition-all hover:scale-110"
            title="Mark as read"
          >
            <CheckCheck size={16} />
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(notification?._id)}
            className="text-danger cursor-pointer transition-all hover:scale-110"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationCard;
