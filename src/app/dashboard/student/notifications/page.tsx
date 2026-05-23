'use client';

import { Award, Bell, BookOpen, CheckCheck, MessageSquare, Trash2, Video } from 'lucide-react';
import { useState } from 'react';

const notificationsData = [
  {
    id: 1,
    type: 'live',
    icon: <Video size={16} />,
    title: 'Live Session Starting Soon',
    message: 'React Advanced Patterns session starts in 30 minutes. Join now to not miss it.',
    time: '30 min ago',
    read: false,
    color: 'bg-red-50 text-red-500',
  },
  {
    id: 2,
    type: 'certificate',
    icon: <Award size={16} />,
    title: 'Certificate Ready!',
    message: 'Your certificate for Freelancing: From Beginner to Pro is ready to download.',
    time: '2 hours ago',
    read: false,
    color: 'bg-yellow-50 text-yellow-500',
  },
  {
    id: 3,
    type: 'course',
    icon: <BookOpen size={16} />,
    title: 'New Lesson Published',
    message: 'A new lesson "Redux Toolkit" has been added to Web Development Bootcamp.',
    time: 'Yesterday',
    read: false,
    color: 'bg-blue-50 text-blue-500',
  },
  {
    id: 4,
    type: 'support',
    icon: <MessageSquare size={16} />,
    title: 'Support Ticket Resolved',
    message: 'Your ticket TKT-001 has been resolved by the admin team.',
    time: '2 days ago',
    read: true,
    color: 'bg-emerald-50 text-primary',
  },
  {
    id: 5,
    type: 'course',
    icon: <BookOpen size={16} />,
    title: 'Course Enrollment Confirmed',
    message: 'You have successfully enrolled in Digital Marketing from Zero to Hero.',
    time: '3 days ago',
    read: true,
    color: 'bg-blue-50 text-blue-500',
  },
  {
    id: 6,
    type: 'certificate',
    icon: <Award size={16} />,
    title: 'Certificate Ready!',
    message: 'Your certificate for Data Analytics with Python & Excel is ready to download.',
    time: '1 week ago',
    read: true,
    color: 'bg-yellow-50 text-yellow-500',
  },
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const filtered = filter === 'unread' ? notifications.filter((n) => !n.read) : notifications;

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-text-primary flex items-center gap-2 text-2xl font-black">
              Notifications
              {unreadCount > 0 && (
                <span className="bg-secondary rounded-full px-2.5 py-0.5 text-sm font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </h1>
            <p className="text-text-secondary mt-1 text-sm">
              Stay updated with your learning activity.
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-2 rounded-sm border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50"
            >
              <CheckCheck size={15} />
              Mark All Read
            </button>
          )}
        </div>

        {/* Filter */}
        <div className="flex w-fit overflow-hidden rounded-sm border border-slate-200 bg-white shadow-xs">
          {[
            { key: 'all', label: `All (${notifications.length})` },
            { key: 'unread', label: `Unread (${unreadCount})` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as typeof filter)}
              className={`px-5 py-2.5 text-sm font-semibold transition-all ${
                filter === tab.key ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Notifications */}
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
                className={`group flex items-start gap-4 rounded-md border p-4 transition-all ${
                  !notif.read
                    ? 'border-emerald-100 bg-white shadow-xs'
                    : 'border-slate-100 bg-white opacity-70'
                }`}
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
                  onClick={() => deleteNotification(notif.id)}
                  className="mt-0.5 shrink-0 text-slate-300 opacity-0 transition-all group-hover:opacity-100 hover:text-red-400"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
