import {
  BarChart3,
  BookOpen,
  CreditCard,
  FileText,
  FolderOpen,
  Layers,
  LayoutGrid,
  LifeBuoy,
  MessageSquare,
  Settings,
  Sliders,
  Users,
  Video,
  Wallet,
} from 'lucide-react';

export type roleTypes = 'admin' | 'student' | 'instructor';

// =========================================================================
// 1. Super Admin Dashboard Routes List
// =========================================================================
export const AdminRoutes = [
  {
    title: 'Dashboard',
    url: '/dashboard/admin/overview',
    icon: LayoutGrid,
  },
  {
    title: 'User Management',
    url: '/dashboard/admin/user-management',
    icon: Users,
  },
  {
    title: 'System Configs',
    url: '/dashboard/admin/system-configs',
    icon: Sliders,
  },
  {
    title: 'CMS / Content',
    url: '/dashboard/admin/cms-content',
    icon: FileText,
  },
  {
    title: 'Billing',
    url: '/dashboard/admin/billing',
    icon: CreditCard,
  },
  {
    title: 'Support Tickets',
    url: '/dashboard/admin/support-tickets',
    icon: LifeBuoy,
  },
  {
    title: 'Settings',
    url: '/dashboard/admin/settings',
    icon: Settings,
  },
];

// =========================================================================
// 2. Student Dashboard Routes List
// =========================================================================
export const StudentRoutes = [
  {
    title: 'Overview',
    url: '/dashboard/student/overview',
    icon: LayoutGrid,
  },
  {
    title: 'My Courses',
    url: '/dashboard/student/my-courses',
    icon: BookOpen,
  },
  {
    title: 'Interactive Classroom',
    url: '/dashboard/student/classroom',
    icon: Video,
  },
  {
    title: 'Support Chat',
    url: '/dashboard/student/support-chat',
    icon: MessageSquare,
  },
  {
    title: 'Order History',
    url: '/dashboard/student/orders',
    icon: CreditCard,
  },
  {
    title: 'Settings',
    url: '/dashboard/student/settings',
    icon: Settings,
  },
];

// =========================================================================
// 3. Instructor / Teacher Dashboard Routes List
// =========================================================================
export const InstructorRoutes = [
  {
    title: 'Overview',
    url: '/dashboard/instructor/overview',
    icon: LayoutGrid,
  },
  {
    title: 'Course Studio',
    url: '/dashboard/instructor/course-studio',
    icon: FolderOpen,
  },
  {
    title: 'Analytics & Revenue',
    url: '/dashboard/instructor/analytics',
    icon: BarChart3,
  },
  {
    title: 'Curriculum Builder',
    url: '/dashboard/instructor/curriculum-builder',
    icon: Layers,
  },
  {
    title: 'Earnings & Payouts',
    url: '/dashboard/instructor/payouts',
    icon: Wallet,
  },
  {
    title: 'Settings',
    url: '/dashboard/instructor/settings',
    icon: Settings,
  },
];
