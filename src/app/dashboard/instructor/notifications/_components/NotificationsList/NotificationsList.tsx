/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bell, Trash2 } from 'lucide-react';

interface NotificationsListProps {
  filtered: any[];
  setNotifications: (n: any[]) => void;
  notifications: any[];
}

const NotificationsList = ({
  filtered,
  setNotifications,
  notifications,
}: NotificationsListProps) => {
  return (
    <>
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-md border border-slate-100 bg-white py-20 text-center shadow-xs">
          <Bell size={40} className="mb-4 text-slate-300" />
          <p className="font-bold text-slate-400">No notifications</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((notif) => (
            <div
              key={notif.id}
              className={`group flex items-start gap-4 rounded-md border p-4 transition-all ${!notif.read ? 'border-emerald-100 bg-white shadow-xs' : 'border-slate-100 bg-white opacity-70'}`}
            >
              <div
                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-sm ${notif.color}`}
              >
                {notif.icon}
              </div>
              <div className="flex-1">
                <div className="mb-0.5 flex items-center gap-2">
                  <p className="text-sm font-bold">{notif.title}</p>
                  {!notif.read && <span className="bg-secondary h-2 w-2 rounded-full" />}
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">{notif.message}</p>
                <p className="text-text-secondary mt-1 text-xs">{notif.time}</p>
              </div>
              <button
                onClick={() => setNotifications(notifications.filter((n) => n.id !== notif.id))}
                className="mt-0.5 shrink-0 text-slate-300 opacity-0 transition-all group-hover:opacity-100 hover:text-red-400"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default NotificationsList;
