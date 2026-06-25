// /* eslint-disable no-console */
// 'use client';

// import CustomTable from '@/components/dashboard/CustomTable/CustomTable';
// import DynamicBadge from '@/components/dashboard/DynamicBadge/DynamicBadge';
// import DynamicTableActions from '@/components/dashboard/DynamicTableActions/DynamicTableActions';
// import DynamicTableFilterBar from '@/components/dashboard/DynamicTableFilterBar/DynamicTableFilterBar';
// import { useState } from 'react';

// import { useModal } from '@/context/ModalContext';
// import { TColumn } from '@/types/custom-table.types';
// import { ITableFilter } from '@/types/table-filter.types';
// import { Star } from 'lucide-react';
// import Image from 'next/image';

// export interface ICourseMember {
//   id: string;
//   title: string;
//   category: string;
//   students: number;
//   revenue: number;
//   rating: number;
//   reviews: number;
//   lessons: number;
//   status: 'Published' | 'Pending' | 'Draft';
//   image: string;
//   createdAt: string;
// }

// const CourseManagementTable = () => {
//   const { openModal } = useModal();

//   const [filter, setFilter] = useState('all');
//   const [search, setSearch] = useState('');

//   const coursesData: ICourseMember[] = [
//     {
//       id: '1',
//       title: 'Complete Web Development Bootcamp',
//       category: 'Web Development',
//       students: 320,
//       revenue: 18000,
//       rating: 4.9,
//       reviews: 89,
//       lessons: 48,
//       status: 'Published',
//       image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=600',
//       createdAt: 'Jan 2025',
//     },
//     {
//       id: '2',
//       title: 'React.js Advanced Masterclass',
//       category: 'Web Development',
//       students: 210,
//       revenue: 12600,
//       rating: 4.8,
//       reviews: 54,
//       lessons: 36,
//       status: 'Published',
//       image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600',
//       createdAt: 'Feb 2025',
//     },
//     {
//       id: '3',
//       title: 'Node.js & Express API Development',
//       category: 'Web Development',
//       students: 0,
//       revenue: 0,
//       rating: 0,
//       reviews: 0,
//       lessons: 24,
//       status: 'Pending',
//       image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=600',
//       createdAt: 'Apr 2025',
//     },
//     {
//       id: '4',
//       title: 'JavaScript ES6+ Fundamentals',
//       category: 'Web Development',
//       students: 180,
//       revenue: 9000,
//       rating: 4.7,
//       reviews: 42,
//       lessons: 28,
//       status: 'Published',
//       image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600',
//       createdAt: 'Nov 2024',
//     },
//     {
//       id: '5',
//       title: 'CSS & Tailwind Mastery',
//       category: 'Web Development',
//       students: 0,
//       revenue: 0,
//       rating: 0,
//       reviews: 0,
//       lessons: 20,
//       status: 'Draft',
//       image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=600',
//       createdAt: 'Apr 2025',
//     },
//   ];

//   // handle search
//   const handleSearchCourses = (val: string) => {
//     console.log('Searching for course:', val);
//   };

//   // handle filter
//   const handleSelectStatus = (val: string) => {
//     console.log('Status Filter updated:', val);
//   };

//   // Table column configuration
//   const CourseTableConfig: TColumn<ICourseMember>[] = [
//     {
//       header: 'COURSE',
//       cell: (row) => (
//         <div className="flex items-center gap-3 py-1">
//           <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-sm border border-white/5">
//             <Image src={row?.image} alt={row?.title} fill className="object-cover" />
//           </div>
//           <div className="flex flex-col">
//             <span className="text-text-primary line-clamp-1 text-sm font-semibold">
//               {row?.title}
//             </span>
//             <span className="mt-0.5 text-xs font-medium">
//               {row?.lessons} lessons • {row?.createdAt}
//             </span>
//           </div>
//         </div>
//       ),
//     },
//     {
//       header: 'STUDENTS',
//       accessor: 'students',
//     },
//     {
//       header: 'REVENUE',
//       cell: (row) => (
//         <span className="text-primary font-bold">৳{row?.revenue.toLocaleString()}</span>
//       ),
//     },
//     {
//       header: 'RATING',
//       cell: (row) => (
//         <>
//           {row?.rating > 0 ? (
//             <div className="flex items-center gap-1.5">
//               <Star size={13} fill="#ffc107" color="#ffc107" />
//               <span className="font-semibold">{row?.rating}</span>
//               <span>({row?.reviews})</span>
//             </div>
//           ) : (
//             <span>No reviews</span>
//           )}
//         </>
//       ),
//     },
//     {
//       header: 'STATUS',
//       cell: (row) => (
//         <DynamicBadge
//           text={row?.status}
//           color={
//             row?.status === 'Published'
//               ? '#34796f'
//               : row?.status === 'Pending'
//                 ? '#d97706'
//                 : '#6b7280'
//           }
//         />
//       ),
//     },
//     {
//       header: 'ACTION',
//       cell: (row) => (
//         <DynamicTableActions
//           actions={[
//             {
//               type: 'view',
//               onClick: () => {
//                 console.log('Viewing course:', row?.id);
//               },
//             },
//             {
//               type: 'edit',
//               onClick: () => {
//                 console.log('Editing course:', row?.id);
//               },
//             },
//             {
//               type: 'delete',
//               onClick: () => {
//                 openModal({
//                   view: 'DELETE_CONFIRM',
//                   data: { deleteItem: row?.title, onConfirm: () => {} },
//                 });
//               },
//             },
//           ]}
//         />
//       ),
//     },
//   ];

//   // Table filter configuration
//   const CourseFilters: ITableFilter[] = [
//     {
//       type: 'select',
//       name: 'status-filter',
//       placeholder: 'Status',
//       options: [
//         { label: 'Status: All', value: 'all' },
//         { label: 'Published', value: 'published' },
//         { label: 'Pending', value: 'pending' },
//         { label: 'Draft', value: 'draft' },
//       ],
//       onChange: handleSelectStatus,
//       value: filter,
//     },
//     {
//       type: 'search',
//       name: 'search',
//       placeholder: 'Search courses...',
//       onChange: handleSearchCourses,
//       value: search,
//     },
//   ];

//   return (
//     <div className="space-y-5">
//       <DynamicTableFilterBar
//         fields={CourseFilters}
//         filter={filter}
//         setFilter={setFilter}
//         search={search}
//         setSearch={setSearch}
//       />

//       <CustomTable columns={CourseTableConfig} data={coursesData} />
//     </div>
//   );
// };

// export default CourseManagementTable;

function CoursesTable() {
  return <div>CoursesTable</div>;
}

export default CoursesTable;
