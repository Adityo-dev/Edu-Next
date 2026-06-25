// 'use client';

// import CustomTable from '@/components/dashboard/CustomTable/CustomTable';
// import DynamicTableFilterBar from '@/components/dashboard/DynamicTableFilterBar/DynamicTableFilterBar';
// import { useState } from 'react';

// import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
// import { TColumn } from '@/types/custom-table.types';
// import { ITableFilter } from '@/types/table-filter.types';

// export interface ITransaction {
//   id: string;
//   student: string;
//   course: string;
//   amount: number;
//   commission: number;
//   instructorEarning: number;
//   method: string;
//   date: string;
// }

// const TransactionsTable = () => {
//   const [search, setSearch] = useState('');
//   const [methodFilter, setMethodFilter] = useState('all');

//   const transactionsData: ITransaction[] = [
//     {
//       id: 'TXN-001',
//       student: 'Sumaiya Akter',
//       course: 'Web Development Bootcamp',
//       amount: 1500,
//       commission: 300,
//       instructorEarning: 1200,
//       date: 'Apr 22, 2025',
//       method: 'bKash',
//     },
//     {
//       id: 'TXN-002',
//       student: 'Nusrat Jahan',
//       course: 'UI/UX Design Masterclass',
//       amount: 1800,
//       commission: 360,
//       instructorEarning: 1440,
//       date: 'Apr 21, 2025',
//       method: 'Nagad',
//     },
//     {
//       id: 'TXN-003',
//       student: 'Arif Hossain',
//       course: 'React.js Advanced',
//       amount: 1600,
//       commission: 320,
//       instructorEarning: 1280,
//       date: 'Apr 20, 2025',
//       method: 'bKash',
//     },
//     {
//       id: 'TXN-004',
//       student: 'Fatima Begum',
//       course: 'Freelancing Masterclass',
//       amount: 999,
//       commission: 200,
//       instructorEarning: 799,
//       date: 'Apr 19, 2025',
//       method: 'Rocket',
//     },
//     {
//       id: 'TXN-005',
//       student: 'Tanvir Islam',
//       course: 'Digital Marketing',
//       amount: 1200,
//       commission: 240,
//       instructorEarning: 960,
//       date: 'Apr 18, 2025',
//       method: 'bKash',
//     },
//   ];

//   const filteredData = transactionsData.filter((t) => {
//     const matchSearch =
//       t.student.toLowerCase().includes(search.toLowerCase()) ||
//       t.course.toLowerCase().includes(search.toLowerCase()) ||
//       t.id.toLowerCase().includes(search.toLowerCase());
//     const matchMethod = methodFilter === 'all' || t.method.toLowerCase() === methodFilter;
//     return matchSearch && matchMethod;
//   });

//   const TransactionsTableConfig: TColumn<ITransaction>[] = [
//     {
//       header: 'TRANSACTION ID',
//       cell: (row) => <span className="font-mono text-xs">{row?.id}</span>,
//     },
//     {
//       header: 'STUDENT',
//       cell: (row) => <span className="font-semibold">{row?.student}</span>,
//     },
//     {
//       header: 'COURSE',
//       cell: (row) => <span className="line-clamp-1 max-w-xs">{row?.course}</span>,
//     },
//     {
//       header: 'AMOUNT',
//       cell: (row) => <span className="font-semibold">৳{row?.amount.toLocaleString()}</span>,
//     },
//     {
//       header: 'COMMISSION',
//       cell: (row) => <span className="text-secondary font-semibold">৳{row?.commission}</span>,
//     },
//     {
//       header: 'INSTRUCTOR EARNING',
//       cell: (row) => (
//         <span className="text-primary font-semibold">
//           ৳{row?.instructorEarning.toLocaleString()}
//         </span>
//       ),
//     },
//     {
//       header: 'METHOD',
//       cell: (row) => <DynamicBadge text={row?.method} />,
//     },
//     {
//       header: 'DATE',
//       accessor: 'date',
//     },
//   ];

//   const TransactionsFilters: ITableFilter[] = [
//     {
//       type: 'select',
//       name: 'method-filter',
//       placeholder: 'Payment Method',
//       options: [
//         { label: 'All', value: 'all' },
//         { label: 'bKash', value: 'bkash' },
//         { label: 'Nagad', value: 'nagad' },
//         { label: 'Rocket', value: 'rocket' },
//       ],
//       onChange: (val) => setMethodFilter(val),
//       value: methodFilter,
//     },
//     {
//       type: 'search',
//       name: 'search',
//       placeholder: 'Search transactions...',
//       onChange: (val) => setSearch(val),
//       value: search,
//     },
//   ];

//   return (
//     <div className="dashboard-card-container space-y-4 p-3">
//       {/* Header Title */}
//       <h2 className="text-lg font-semibold">Recent Transactions</h2>
//       {/* Table Filter */}
//       <DynamicTableFilterBar
//         fields={TransactionsFilters}
//         filter={methodFilter}
//         setFilter={setMethodFilter}
//         search={search}
//         setSearch={setSearch}
//       />
//       {/* Table */}
//       <CustomTable columns={TransactionsTableConfig} data={filteredData} />
//     </div>
//   );
// };

// export default TransactionsTable;

function TransactionsTable() {
  return <div>TransactionsTable</div>;
}

export default TransactionsTable;
