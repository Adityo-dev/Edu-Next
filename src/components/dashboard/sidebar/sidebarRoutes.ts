import {
  BadgePercent,
  Bell,
  BookOpen,
  CircleDollarSign,
  ClipboardList,
  GraduationCap,
  LayoutGrid,
  MessageSquare,
  Settings,
  ShieldCheck,
  Star,
  Users,
  Video,
  Wallet,
} from 'lucide-react';

export type roleTypes = 'admin' | 'student' | 'instructor';

// Route guard / role-check এর জন্য prefix matching
export const ROLE_DASHBOARD_PREFIX: Record<roleTypes, string> = {
  admin: '/dashboard/admin',
  instructor: '/dashboard/instructor',
  student: '/dashboard/student',
};

// Login/Register/Navbar এর পর redirect করার জন্য exact landing page
export const ROLE_DASHBOARD_HOME: Record<roleTypes, string> = {
  admin: '/dashboard/admin/overview',
  instructor: '/dashboard/instructor/overview',
  student: '/dashboard/student/overview',
};

// 1. Super Admin Dashboard Routes
export const AdminRoutes = [
  {
    title: 'Overview',
    url: '/dashboard/admin/overview',
    icon: LayoutGrid,
  },
  {
    title: 'Users Management',
    url: '/dashboard/admin/users',
    icon: Users,
  },
  {
    title: 'Courses Management',
    url: '/dashboard/admin/courses',
    icon: BookOpen,
  },
  {
    title: 'Instructor Verification',
    url: '/dashboard/admin/instructors',
    icon: ShieldCheck,
  },
  {
    title: 'Commission Settings',
    url: '/dashboard/admin/commission',
    icon: BadgePercent,
  },
  {
    title: 'Revenue & Payments',
    url: '/dashboard/admin/revenue',
    icon: CircleDollarSign,
  },
  {
    title: 'Withdrawal Requests',
    url: '/dashboard/admin/withdrawals',
    icon: Wallet,
  },
  {
    title: 'Review Moderation',
    url: '/dashboard/admin/reviews',
    icon: Star,
  },
  {
    title: 'Support Tickets',
    url: '/dashboard/admin/support',
    icon: MessageSquare,
  },
  {
    title: 'Notifications',
    url: '/dashboard/admin/notifications',
    icon: Bell,
  },
  {
    title: 'Settings',
    url: '/dashboard/admin/settings',
    icon: Settings,
  },
];

// 2. Student Dashboard Routes
export const StudentRoutes = [
  {
    title: 'Overview',
    url: '/dashboard/student/overview',
    icon: LayoutGrid,
  },
  {
    title: 'My Courses',
    url: '/dashboard/student/courses',
    icon: BookOpen,
  },
  {
    title: 'My Progress',
    url: '/dashboard/student/progress',
    icon: ClipboardList,
  },
  {
    title: 'Live Sessions',
    url: '/dashboard/student/live-sessions',
    icon: Video,
  },
  {
    title: 'Certificates',
    url: '/dashboard/student/certificates',
    icon: GraduationCap,
  },
  {
    title: 'My Reviews',
    url: '/dashboard/student/reviews',
    icon: Star,
  },
  {
    title: 'Support',
    url: '/dashboard/student/support',
    icon: MessageSquare,
  },
  {
    title: 'Notifications',
    url: '/dashboard/student/notifications',
    icon: Bell,
  },
  {
    title: 'Settings',
    url: '/dashboard/student/settings',
    icon: Settings,
  },
];
// 3. Instructor Dashboard Routes
export const InstructorRoutes = [
  {
    title: 'Overview',
    url: '/dashboard/instructor/overview',
    icon: LayoutGrid,
  },
  {
    title: 'My Courses',
    url: '/dashboard/instructor/courses',
    icon: BookOpen,
  },
  {
    title: 'Create Course',
    url: '/dashboard/instructor/courses/create',
    icon: ClipboardList,
  },
  {
    title: 'Live Sessions',
    url: '/dashboard/instructor/live-sessions',
    icon: Video,
  },
  {
    title: 'Students',
    url: '/dashboard/instructor/students',
    icon: Users,
  },
  {
    title: 'Analytics',
    url: '/dashboard/instructor/analytics',
    icon: CircleDollarSign,
  },
  {
    title: 'My Wallet',
    url: '/dashboard/instructor/wallet',
    icon: Wallet,
  },
  {
    title: 'Withdrawal',
    url: '/dashboard/instructor/withdrawal',
    icon: BadgePercent,
  },
  {
    title: 'Reviews',
    url: '/dashboard/instructor/reviews',
    icon: Star,
  },
  {
    title: 'Notifications',
    url: '/dashboard/instructor/notifications',
    icon: Bell,
  },
  {
    title: 'Settings',
    url: '/dashboard/instructor/settings',
    icon: Settings,
  },
];
