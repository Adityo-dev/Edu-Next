// /* eslint-disable no-console */
// 'use client';

// import CustomTable from '@/components/dashboard/CustomTable/CustomTable';
// import DynamicTableActions from '@/components/dashboard/DynamicTableActions/DynamicTableActions';
// import DynamicTableFilterBar from '@/components/dashboard/DynamicTableFilterBar/DynamicTableFilterBar';
// import { useState } from 'react';

// import { Progress } from '@/components/ui/progress';
// import { TColumn } from '@/types/custom-table.types';
// import { ITableFilter } from '@/types/table-filter.types';
// import { Star } from 'lucide-react';
// import Image from 'next/image';

// export interface IStudentMember {
//   id: number;
//   name: string;
//   email: string;
//   image: string;
//   course: string;
//   progress: number;
//   rating: number;
//   enrolledDate: string;
//   lastActive: string;
// }

// const InstructorStudentsPage = () => {
//   // Table Filter state
//   const [filter, setFilter] = useState('all');
//   const [search, setSearch] = useState('');

//   const studentsData: IStudentMember[] = [
//     {
//       id: 1,
//       name: 'Sumaiya Akter',
//       email: 'sumaiya@example.com',
//       image: 'https://i.pravatar.cc/150?u=sumaiya',
//       course: 'Complete Web Development Bootcamp',
//       progress: 72,
//       rating: 5,
//       enrolledDate: 'Jan 15, 2025',
//       lastActive: '2 hours ago',
//     },
//     {
//       id: 2,
//       name: 'Nusrat Jahan',
//       email: 'nusrat@example.com',
//       image: 'https://i.pravatar.cc/150?u=nusrat',
//       course: 'Complete Web Development Bootcamp',
//       progress: 45,
//       rating: 4,
//       enrolledDate: 'Feb 2, 2025',
//       lastActive: 'Yesterday',
//     },
//     {
//       id: 3,
//       name: 'Arif Hossain',
//       email: 'arif@example.com',
//       image: 'https://i.pravatar.cc/150?u=arif',
//       course: 'React.js Advanced Masterclass',
//       progress: 88,
//       rating: 5,
//       enrolledDate: 'Feb 10, 2025',
//       lastActive: '3 days ago',
//     },
//     {
//       id: 4,
//       name: 'Rakib Ahmed',
//       email: 'rakib@example.com',
//       image: 'https://i.pravatar.cc/150?u=rakib2',
//       course: 'React.js Advanced Masterclass',
//       progress: 30,
//       rating: 0,
//       enrolledDate: 'Mar 1, 2025',
//       lastActive: '1 week ago',
//     },
//     {
//       id: 5,
//       name: 'Fatima Begum',
//       email: 'fatima@example.com',
//       image: 'https://i.pravatar.cc/150?u=fatima',
//       course: 'JavaScript ES6+ Fundamentals',
//       progress: 100,
//       rating: 5,
//       enrolledDate: 'Nov 5, 2024',
//       lastActive: '2 weeks ago',
//     },
//     {
//       id: 6,
//       name: 'Tanvir Islam',
//       email: 'tanvir2@example.com',
//       image: 'https://i.pravatar.cc/150?u=tanvir2',
//       course: 'Complete Web Development Bootcamp',
//       progress: 15,
//       rating: 0,
//       enrolledDate: 'Apr 10, 2025',
//       lastActive: 'Today',
//     },
//   ];

//   // handle search log
//   const handleSearchStudents = (val: string) => {
//     console.log('Searching for student:', val);
//   };

//   // handle filter log
//   const handleSelectCourse = (val: string) => {
//     console.log('Course Filter updated:', val);
//   };

//   // Table column configuration
//   const StudentsTableConfig: TColumn<IStudentMember>[] = [
//     {
//       header: 'STUDENT',
//       cell: (row) => (
//         <div className="flex items-center gap-3 py-1">
//           <Image
//             src={row?.image}
//             alt={row?.name}
//             width={36}
//             height={36}
//             className="border-primary rounded-full border-2 object-cover"
//           />
//           <div className="flex flex-col">
//             <span className="text-text-primary text-sm font-semibold">{row?.name}</span>
//             <span className="text-text-secondary text-xs">{row?.email}</span>
//           </div>
//         </div>
//       ),
//     },
//     {
//       header: 'COURSE',
//       cell: (row) => <span className="line-clamp-1 max-w-xs">{row?.course}</span>,
//     },
//     {
//       header: 'PROGRESS',
//       cell: (row) => {
//         const isCompleted = row?.progress === 100;

//         return (
//           <div className="flex items-center gap-2">
//             <Progress
//               value={row?.progress}
//               className="h-1.5 w-20"
//               style={{
//                 backgroundColor: isCompleted ? '#ffc107' : undefined,
//               }}
//             />
//             <span className="font-semibold">{row?.progress}%</span>
//           </div>
//         );
//       },
//     },
//     {
//       header: 'RATING',
//       cell: (row) => (
//         <>
//           {row?.rating > 0 ? (
//             <div className="flex items-center gap-0.5">
//               {Array.from({ length: 5 }).map((_, i) => (
//                 <Star
//                   key={i}
//                   size={12}
//                   fill={i < row?.rating ? '#ffc107' : 'none'}
//                   color="#ffc107"
//                 />
//               ))}
//             </div>
//           ) : (
//             <span>No review</span>
//           )}
//         </>
//       ),
//     },
//     {
//       header: 'LAST ACTIVE',
//       accessor: 'lastActive',
//     },
//     {
//       header: 'ACTION',
//       cell: (row) => (
//         <DynamicTableActions
//           actions={[
//             {
//               type: 'message',
//               onClick: () => {
//                 console.log('Messaging student:', row?.id);
//               },
//             },
//           ]}
//         />
//       ),
//     },
//   ];

//   const dynamicCourseOptions = [
//     { label: 'All Courses', value: 'all' },
//     ...Array.from(new Set(studentsData.map((s) => s.course))).map((course) => ({
//       label: course,
//       value: course,
//     })),
//   ];

//   // Table filter configuration
//   const StudentFilters: ITableFilter[] = [
//     {
//       type: 'select',
//       name: 'course-filter',
//       placeholder: 'Course',
//       options: dynamicCourseOptions,
//       onChange: handleSelectCourse,
//       value: filter,
//     },
//     {
//       type: 'search',
//       name: 'search',
//       placeholder: 'Search students...',
//       onChange: handleSearchStudents,
//       value: search,
//     },
//   ];

//   const filteredStudents = studentsData.filter((s) => {
//     const matchSearch =
//       s.name.toLowerCase().includes(search.toLowerCase()) ||
//       s.email.toLowerCase().includes(search.toLowerCase());
//     const matchCourse = filter === 'all' || s.course === filter;
//     return matchSearch && matchCourse;
//   });

//   return (
//     <div className="space-y-6">
//       <DynamicTableFilterBar
//         fields={StudentFilters}
//         filter={filter}
//         setFilter={setFilter}
//         search={search}
//         setSearch={setSearch}
//       />

//       <CustomTable columns={StudentsTableConfig} data={filteredStudents} />
//     </div>
//   );
// };

// export default InstructorStudentsPage;

function StudentsTable() {
  return <div>StudentsTable</div>;
}

export default StudentsTable;
