'use client';

import { Award, BookOpen, MessageSquare, Video } from 'lucide-react';
import { useState } from 'react';
import NotificationsHeader from './_components/NotificationsHeader/NotificationsHeader';
import NotificationsFilter from './_components/NotificationsFilter/NotificationsFilter';
import NotificationsList from './_components/NotificationsList/NotificationsList';

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
        <NotificationsHeader unreadCount={unreadCount} markAllRead={markAllRead} />

        {/* Filter */}
        <NotificationsFilter
          filter={filter}
          setFilter={setFilter}
          totalCount={notifications.length}
          unreadCount={unreadCount}
        />

        {/* Notifications List */}
        <NotificationsList notifications={filtered} deleteNotification={deleteNotification} />
      </div>
    </div>
  );
};

export default NotificationsPage;
