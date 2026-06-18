'use client';

import CustomTable from '@/components/dashboard/CustomTable/CustomTable';
import DynamicTableActions from '@/components/dashboard/DynamicTableActions/DynamicTableActions';
import DynamicTableFilterBar from '@/components/dashboard/DynamicTableFilterBar/DynamicTableFilterBar';
import { useState } from 'react';

import { TColumn } from '@/types/custom-table.types';
import { ITableFilter } from '@/types/table-filter.types';
import Image from 'next/image';

export interface IUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: string;
  courses: number;
  image: string;
}

const UsersTable = () => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const usersData: IUser[] = [
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

  const filteredData = usersData.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const UsersTableConfig: TColumn<IUser>[] = [
    {
      header: 'USER',
      cell: (row) => (
        <div className="flex items-center gap-3">
          <Image
            src={row?.image}
            alt={row?.name}
            width={36}
            height={36}
            className="rounded-full border-2 border-emerald-50"
          />
          <div className="flex flex-col">
            <span className="font-bold">{row?.name}</span>
            <span className="text-text-secondary text-xs">{row?.email}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'ROLE',
      cell: (row) => (
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${row?.role === 'instructor' ? 'bg-blue-50 text-blue-600' : 'text-primary bg-emerald-50'}`}
        >
          {row?.role}
        </span>
      ),
    },
    {
      header: 'STATUS',
      cell: (row) => (
        <span
          className={`flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${row?.status === 'active' ? 'text-primary bg-emerald-50' : 'bg-red-50 text-red-500'}`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${row?.status === 'active' ? 'bg-primary' : 'bg-red-500'}`}
          />
          {row?.status}
        </span>
      ),
    },
    {
      header: 'COURSES',
      accessor: 'courses',
    },
    {
      header: 'JOIN DATE',
      accessor: 'joinDate',
    },
    {
      header: 'ACTION',
      cell: (row) => (
        <DynamicTableActions
          actions={[
            {
              type: row?.status === 'active' ? 'suspend' : 'save',
              onClick: () => {},
            },
            {
              type: 'delete',
              onClick: () => {},
            },
          ]}
        />
      ),
    },
  ];

  const UsersFilters: ITableFilter[] = [
    {
      type: 'select',
      name: 'role-filter',
      placeholder: 'Role',
      options: [
        { label: 'All', value: 'all' },
        { label: 'Student', value: 'student' },
        { label: 'Instructor', value: 'instructor' },
      ],
      onChange: (val) => setRoleFilter(val),
      value: roleFilter,
    },
    {
      type: 'search',
      name: 'search',
      placeholder: 'Search users...',
      onChange: (val) => setSearch(val),
      value: search,
    },
  ];

  return (
    <div className="dashboard-card-container space-y-5 p-3">
      <DynamicTableFilterBar
        fields={UsersFilters}
        filter={roleFilter}
        setFilter={setRoleFilter}
        search={search}
        setSearch={setSearch}
      />
      <CustomTable columns={UsersTableConfig} data={filteredData} />
    </div>
  );
};

export default UsersTable;
