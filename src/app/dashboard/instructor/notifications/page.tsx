'use client';

import { BookOpen, CircleDollarSign, Star, Users } from 'lucide-react';
import { useState } from 'react';
import NotificationsFilter from './_components/NotificationsFilter/NotificationsFilter';
import NotificationsHeader from './_components/NotificationsHeader/NotificationsHeader';
import NotificationsList from './_components/NotificationsList/NotificationsList';

const notificationsData = [
  {
    id: 1,
    icon: <CircleDollarSign size={16} />,
    title: 'New Course Sale!',
    message: 'Sumaiya Akter enrolled in Complete Web Development Bootcamp. You earned ৳1,200.',
    time: '2 hours ago',
    read: false,
    color: 'bg-emerald-50 text-primary',
  },
  {
    id: 2,
    icon: <Star size={16} />,
    title: 'New Review Received',
    message: 'Arif Hossain left a 5-star review on React.js Advanced Masterclass.',
    time: 'Yesterday',
    read: false,
    color: 'bg-yellow-50 text-yellow-500',
  },
  {
    id: 3,
    icon: <BookOpen size={16} />,
    title: 'Course Approved!',
    message: 'Your course "Node.js & Express API Development" has been approved and is now live.',
    time: '2 days ago',
    read: false,
    color: 'bg-blue-50 text-blue-500',
  },
  {
    id: 4,
    icon: <Users size={16} />,
    title: 'New Student Enrolled',
    message: 'Nusrat Jahan enrolled in Complete Web Development Bootcamp.',
    time: '3 days ago',
    read: true,
    color: 'bg-emerald-50 text-primary',
  },
  {
    id: 5,
    icon: <CircleDollarSign size={16} />,
    title: 'Withdrawal Processed',
    message: 'Your withdrawal request of ৳8,000 has been approved and sent to your bKash account.',
    time: '4 days ago',
    read: true,
    color: 'bg-emerald-50 text-primary',
  },
];

const InstructorNotificationsPage = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter((n) => !n.read).length;
  const filtered = filter === 'unread' ? notifications.filter((n) => !n.read) : notifications;

  return (
    <div className="space-y-6">
      <NotificationsHeader
        unreadCount={unreadCount}
        notifications={notifications}
        setNotifications={setNotifications}
      />

      <NotificationsFilter
        filter={filter}
        setFilter={setFilter}
        unreadCount={unreadCount}
        notifications={notifications}
      />

      <NotificationsList
        filtered={filtered}
        setNotifications={setNotifications}
        notifications={notifications}
      />
    </div>
  );
};

export default InstructorNotificationsPage;
