'use client';

import CustomTable from '@/components/dashboard/CustomTable/CustomTable';
import DynamicTableFilterBar from '@/components/dashboard/DynamicTableFilterBar/DynamicTableFilterBar';
import { useState } from 'react';

import { TColumn } from '@/types/custom-table.types';
import { ITableFilter } from '@/types/table-filter.types';

export interface ITransaction {
  id: string;
  student: string;
  course: string;
  amount: number;
  commission: number;
  instructorEarning: number;
  method: string;
  date: string;
}

const TransactionsTable = () => {
  const [search, setSearch] = useState('');
  const [methodFilter, setMethodFilter] = useState('all');

  const transactionsData: ITransaction[] = [
    {
      id: 'TXN-001',
      student: 'Sumaiya Akter',
      course: 'Web Development Bootcamp',
      amount: 1500,
      commission: 300,
      instructorEarning: 1200,
      date: 'Apr 22, 2025',
      method: 'bKash',
    },
    {
      id: 'TXN-002',
      student: 'Nusrat Jahan',
      course: 'UI/UX Design Masterclass',
      amount: 1800,
      commission: 360,
      instructorEarning: 1440,
      date: 'Apr 21, 2025',
      method: 'Nagad',
    },
    {
      id: 'TXN-003',
      student: 'Arif Hossain',
      course: 'React.js Advanced',
      amount: 1600,
      commission: 320,
      instructorEarning: 1280,
      date: 'Apr 20, 2025',
      method: 'bKash',
    },
    {
      id: 'TXN-004',
      student: 'Fatima Begum',
      course: 'Freelancing Masterclass',
      amount: 999,
      commission: 200,
      instructorEarning: 799,
      date: 'Apr 19, 2025',
      method: 'Rocket',
    },
    {
      id: 'TXN-005',
      student: 'Tanvir Islam',
      course: 'Digital Marketing',
      amount: 1200,
      commission: 240,
      instructorEarning: 960,
      date: 'Apr 18, 2025',
      method: 'bKash',
    },
  ];

  const filteredData = transactionsData.filter((t) => {
    const matchSearch =
      t.student.toLowerCase().includes(search.toLowerCase()) ||
      t.course.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase());
    const matchMethod = methodFilter === 'all' || t.method.toLowerCase() === methodFilter;
    return matchSearch && matchMethod;
  });

  const TransactionsTableConfig: TColumn<ITransaction>[] = [
    {
      header: 'TRANSACTION ID',
      cell: (row) => <span className="font-mono text-xs text-slate-400">{row?.id}</span>,
    },
    {
      header: 'STUDENT',
      cell: (row) => <span className="font-semibold">{row?.student}</span>,
    },
    {
      header: 'COURSE',
      cell: (row) => (
        <span className="line-clamp-1 max-w-xs text-xs text-slate-600">{row?.course}</span>
      ),
    },
    {
      header: 'AMOUNT',
      cell: (row) => (
        <span className="font-black text-[#0f172a]">৳{row?.amount.toLocaleString()}</span>
      ),
    },
    {
      header: 'COMMISSION',
      cell: (row) => <span className="text-secondary font-bold">৳{row?.commission}</span>,
    },
    {
      header: 'INSTRUCTOR EARNING',
      cell: (row) => (
        <span className="text-primary font-bold">৳{row?.instructorEarning.toLocaleString()}</span>
      ),
    },
    {
      header: 'METHOD',
      cell: (row) => (
        <span className="rounded-sm bg-slate-100 px-2.5 py-1 text-xs font-medium">
          {row?.method}
        </span>
      ),
    },
    {
      header: 'DATE',
      accessor: 'date',
    },
  ];

  const TransactionsFilters: ITableFilter[] = [
    {
      type: 'select',
      name: 'method-filter',
      placeholder: 'Payment Method',
      options: [
        { label: 'All', value: 'all' },
        { label: 'bKash', value: 'bkash' },
        { label: 'Nagad', value: 'nagad' },
        { label: 'Rocket', value: 'rocket' },
      ],
      onChange: (val) => setMethodFilter(val),
      value: methodFilter,
    },
    {
      type: 'search',
      name: 'search',
      placeholder: 'Search transactions...',
      onChange: (val) => setSearch(val),
      value: search,
    },
  ];

  return (
    <div className="space-y-5">
      <div className="border-b border-slate-100 px-1 py-2">
        <h2 className="text-lg font-bold">Recent Transactions</h2>
      </div>
      <DynamicTableFilterBar
        fields={TransactionsFilters}
        filter={methodFilter}
        setFilter={setMethodFilter}
        search={search}
        setSearch={setSearch}
      />
      <CustomTable columns={TransactionsTableConfig} data={filteredData} />
    </div>
  );
};

export default TransactionsTable;
