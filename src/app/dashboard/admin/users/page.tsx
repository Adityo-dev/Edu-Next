'use client';

import UsersHeader from './_components/UsersHeader/UsersHeader';
import UsersStats from './_components/UsersStats/UsersStats';
import UsersTable from './_components/UsersTable/UsersTable';

const usersData = [
  {
    id: 1,
    name: 'Sumaiya Akter',
    email: 'sumaiya@example.com',
    role: 'student',
    status: 'active',
    joinDate: 'Jan 15, 2025',
    courses: 6,
    image: 'https://i.pravatar.cc/150?u=sumaiya',
  },
  {
    id: 2,
    name: 'Md. Rafiqul Islam',
    email: 'rafiq@example.com',
    role: 'instructor',
    status: 'active',
    joinDate: 'Oct 5, 2022',
    courses: 8,
    image: 'https://i.pravatar.cc/150?u=rafiq',
  },
  {
    id: 3,
    name: 'Nusrat Jahan',
    email: 'nusrat@example.com',
    role: 'student',
    status: 'active',
    joinDate: 'Feb 2, 2025',
    courses: 3,
    image: 'https://i.pravatar.cc/150?u=nusrat',
  },
  {
    id: 4,
    name: 'Farhan Hossain',
    email: 'farhan@example.com',
    role: 'instructor',
    status: 'suspended',
    joinDate: 'Jan 10, 2023',
    courses: 4,
    image: 'https://i.pravatar.cc/150?u=farhan',
  },
  {
    id: 5,
    name: 'Arif Hossain',
    email: 'arif@example.com',
    role: 'student',
    status: 'active',
    joinDate: 'Mar 1, 2025',
    courses: 2,
    image: 'https://i.pravatar.cc/150?u=arif',
  },
  {
    id: 6,
    name: 'Nasrin Sultana',
    email: 'nasrin@example.com',
    role: 'instructor',
    status: 'active',
    joinDate: 'Jun 15, 2023',
    courses: 3,
    image: 'https://i.pravatar.cc/150?u=nasrin',
  },
  {
    id: 7,
    name: 'Rakib Ahmed',
    email: 'rakib@example.com',
    role: 'student',
    status: 'suspended',
    joinDate: 'Apr 10, 2025',
    courses: 1,
    image: 'https://i.pravatar.cc/150?u=rakib2',
  },
];

const UsersManagementPage = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        <UsersHeader />
        <UsersStats users={usersData} />
        <UsersTable />
      </div>
    </div>
  );
};

export default UsersManagementPage;
