'use client';

import {
  BadgePercent,
  Bell,
  BookOpen,
  CheckCheck,
  CircleDollarSign,
  MessageSquare,
  ShieldCheck,
  Trash2,
  Users,
} from 'lucide-react';
import { useState } from 'react';

const notificationsData = [
  {
    id: 1,
    icon: <ShieldCheck size={16} />,
    title: 'New Instructor Application',
    message: 'Tanvir Ahmed applied as an instructor. Expertise: Mobile App Development.',
    time: '1 hour ago',
    read: false,
    color: 'bg-yellow-50 text-yellow-500',
    url: '/dashboard/admin/instructors',
  },
  {
    id: 2,
    icon: <CircleDollarSign size={16} />,
    title: 'Withdrawal Request',
    message: 'Md. Rafiqul Islam requested withdrawal of ৳8,000 to bKash.',
    time: '3 hours ago',
    read: false,
    color: 'bg-blue-50 text-blue-500',
    url: '/dashboard/admin/withdrawals',
  },
  {
    id: 3,
    icon: <BookOpen size={16} />,
    title: 'New Course Submitted',
    message: 'Node.js & Express API Development by Md. Rafiqul Islam is pending review.',
    time: 'Yesterday',
    read: false,
    color: 'bg-emerald-50 text-primary',
    url: '/dashboard/admin/courses',
  },
  {
    id: 4,
    icon: <MessageSquare size={16} />,
    title: 'New Support Ticket',
    message: 'Sumaiya Akter opened a ticket: Cannot access course videos after payment.',
    time: 'Yesterday',
    read: true,
    color: 'bg-orange-50 text-secondary',
    url: '/dashboard/admin/support',
  },
  {
    id: 5,
    icon: <Users size={16} />,
    title: 'New User Registered',
    message: '48 new users registered this week. Total users: 5,240.',
    time: '2 days ago',
    read: true,
    color: 'bg-purple-50 text-purple-500',
    url: '/dashboard/admin/users',
  },
  {
    id: 6,
    icon: <BadgePercent size={16} />,
    title: 'Revenue Milestone',
    message: 'EduNext crossed ৳2,48,500 in total revenue this month!',
    time: '3 days ago',
    read: true,
    color: 'bg-emerald-50 text-primary',
    url: '/dashboard/admin/revenue',
  },
];

const AdminNotificationsPage = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter((n) => !n.read).length;
  const filtered = filter === 'unread' ? notifications.filter((n) => !n.read) : notifications;

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
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
            <p className="text-text-secondary mt-1 text-sm">Platform activity and alerts.</p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={() => setNotifications(notifications.map((n) => ({ ...n, read: true })))}
              className="flex items-center gap-2 rounded-sm border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              <CheckCheck size={15} /> Mark All Read
            </button>
          )}
        </div>

        <div className="flex w-fit overflow-hidden rounded-sm border border-slate-200 bg-white shadow-xs">
          {[
            { key: 'all', label: `All (${notifications.length})` },
            { key: 'unread', label: `Unread (${unreadCount})` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as typeof filter)}
              className={`px-5 py-2.5 text-sm font-semibold transition-all ${filter === tab.key ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

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
      </div>
    </div>
  );
};

export default AdminNotificationsPage;
