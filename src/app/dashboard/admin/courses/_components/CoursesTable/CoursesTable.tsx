'use client';

import CustomTable from '@/components/dashboard/CustomTable/CustomTable';
import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
import DynamicTableActions from '@/components/dashboard/DynamicTableActions/DynamicTableActions';
import DynamicTableFilterBar from '@/components/dashboard/DynamicTableFilterBar/DynamicTableFilterBar';
import { useState } from 'react';

import { TColumn } from '@/types/custom-table.types';
import { ITableFilter } from '@/types/table-filter.types';
import Image from 'next/image';

export interface ICourse {
  id: number;
  title: string;
  instructor: string;
  category: string;
  students: number;
  price: number;
  status: string;
  submittedDate: string;
  image: string;
}

const CourseManagementTable = () => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const coursesData: ICourse[] = [
    {
      id: 1,
      title: 'Complete Web Development Bootcamp',
      instructor: 'Md. Rafiqul Islam',
      category: 'Web Development',
      students: 320,
      price: 1500,
      status: 'published',
      submittedDate: 'Jan 10, 2025',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=600',
    },
    {
      id: 2,
      title: 'UI/UX Design Masterclass with Figma',
      instructor: 'Farhan Hossain',
      category: 'UI/UX Design',
      students: 210,
      price: 1800,
      status: 'published',
      submittedDate: 'Feb 5, 2025',
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=600',
    },
    {
      id: 3,
      title: 'Node.js & Express API Development',
      instructor: 'Md. Rafiqul Islam',
      category: 'Web Development',
      students: 0,
      price: 1600,
      status: 'pending',
      submittedDate: 'Apr 18, 2025',
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=600',
    },
    {
      id: 4,
      title: 'Digital Marketing from Zero to Hero',
      instructor: 'Nasrin Sultana',
      category: 'Digital Marketing',
      students: 180,
      price: 1200,
      status: 'published',
      submittedDate: 'Mar 1, 2025',
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f5a07d?q=80&w=600',
    },
    {
      id: 5,
      title: 'Advanced Python Programming',
      instructor: 'Imran Hossain',
      category: 'Data Analytics',
      students: 0,
      price: 1800,
      status: 'pending',
      submittedDate: 'Apr 20, 2025',
      image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=600',
    },
    {
      id: 6,
      title: 'Freelancing Masterclass',
      instructor: 'Sabbir Hossain',
      category: 'Freelancing',
      students: 240,
      price: 999,
      status: 'published',
      submittedDate: 'Dec 1, 2024',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600',
    },
  ];

  const filteredData = coursesData.filter((c) => {
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || c.status === filter;
    return matchSearch && matchFilter;
  });

  const CourseTableConfig: TColumn<ICourse>[] = [
    {
      header: 'COURSE',
      cell: (row) => (
        <div className="flex items-center gap-3 py-1">
          <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-sm border border-white/5">
            <Image src={row?.image} alt={row?.title} fill className="object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-text-primary line-clamp-1 max-w-xs text-sm font-semibold">
              {row?.title}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: 'INSTRUCTOR',
      accessor: 'instructor',
    },
    {
      header: 'CATEGORY',
      cell: (row) => (
        <span className="text-primary rounded-sm bg-emerald-50 px-2.5 py-1 text-xs font-semibold">
          {row?.category}
        </span>
      ),
    },
    {
      header: 'STUDENTS',
      accessor: 'students',
    },
    {
      header: 'PRICE',
      cell: (row) => <span className="text-primary font-bold">৳{row?.price.toLocaleString()}</span>,
    },
    {
      header: 'STATUS',
      cell: (row) => (
        <DynamicBadge
          text={row?.status}
          color={row?.status === 'published' ? '#34796f' : '#d97706'}
        />
      ),
    },
    {
      header: 'ACTION',
      cell: (row) => (
        <DynamicTableActions
          actions={[
            {
              type: 'view',
              onClick: () => {},
            },
            ...(row?.status === 'pending'
              ? [
                  {
                    type: 'save',
                    onClick: () => {},
                  },
                  {
                    type: 'close',
                    onClick: () => {},
                  },
                ]
              : [
                  {
                    type: 'delete',
                    onClick: () => {},
                  },
                ]),
          ]}
        />
      ),
    },
  ];

  const CourseFilters: ITableFilter[] = [
    {
      type: 'select',
      name: 'status-filter',
      placeholder: 'Status',
      options: [
        { label: 'Status: All', value: 'all' },
        { label: 'Published', value: 'published' },
        { label: 'Pending', value: 'pending' },
      ],
      onChange: (val) => setFilter(val),
      value: filter,
    },
    {
      type: 'search',
      name: 'search',
      placeholder: 'Search courses...',
      onChange: (val) => setSearch(val),
      value: search,
    },
  ];

  return (
    <div className="space-y-5">
      <DynamicTableFilterBar
        fields={CourseFilters}
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
      />
      <CustomTable columns={CourseTableConfig} data={filteredData} />
    </div>
  );
};

export default CourseManagementTable;
