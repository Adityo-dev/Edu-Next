/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { Edit, Eye, MoreVertical, Star, Trash2, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const statusConfig: Record<string, string> = {
  published: 'bg-emerald-50 text-primary',
  pending: 'bg-yellow-50 text-yellow-600',
  draft: 'bg-slate-100 text-slate-500',
};

interface CoursesTableProps {
  filtered: any[];
  openMenu: number | null;
  setOpenMenu: (id: number | null) => void;
}

const CoursesTable = ({ filtered, openMenu, setOpenMenu }: CoursesTableProps) => {
  return (
    <div className="overflow-hidden rounded-md border border-slate-100 bg-white shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-5 py-4 text-left text-xs font-bold tracking-wider text-slate-500 uppercase">
                Course
              </th>
              <th className="px-5 py-4 text-left text-xs font-bold tracking-wider text-slate-500 uppercase">
                Students
              </th>
              <th className="px-5 py-4 text-left text-xs font-bold tracking-wider text-slate-500 uppercase">
                Revenue
              </th>
              <th className="px-5 py-4 text-left text-xs font-bold tracking-wider text-slate-500 uppercase">
                Rating
              </th>
              <th className="px-5 py-4 text-left text-xs font-bold tracking-wider text-slate-500 uppercase">
                Status
              </th>
              <th className="px-5 py-4 text-left text-xs font-bold tracking-wider text-slate-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((course) => (
              <tr key={course.id} className="transition-colors hover:bg-slate-50">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-sm">
                      <Image src={course.image} alt={course.title} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="line-clamp-1 font-bold">{course.title}</p>
                      <p className="text-text-secondary text-xs">
                        {course.lessons} lessons • {course.createdAt}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Users size={14} />
                    {course.students.toLocaleString()}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="text-primary font-bold">৳{course.revenue.toLocaleString()}</span>
                </td>
                <td className="px-5 py-4">
                  {course.rating > 0 ? (
                    <div className="flex items-center gap-1">
                      <Star size={13} fill="#ffc107" color="#ffc107" />
                      <span className="font-semibold">{course.rating}</span>
                      <span className="text-text-secondary text-xs">({course.reviews})</span>
                    </div>
                  ) : (
                    <span className="text-text-secondary text-xs">No reviews</span>
                  )}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${statusConfig[course.status]}`}
                  >
                    {course.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="relative flex items-center gap-2">
                    <Link
                      href={`/courses/${course.id}`}
                      className="flex h-8 w-8 items-center justify-center rounded-sm border border-slate-200 text-slate-500 hover:bg-slate-50"
                    >
                      <Eye size={14} />
                    </Link>
                    <Link
                      href={`/dashboard/instructor/courses/${course.id}/edit`}
                      className="flex h-8 w-8 items-center justify-center rounded-sm border border-slate-200 text-slate-500 hover:bg-slate-50"
                    >
                      <Edit size={14} />
                    </Link>
                    <button
                      onClick={() => setOpenMenu(openMenu === course.id ? null : course.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-sm border border-slate-200 text-slate-500 hover:bg-slate-50"
                    >
                      <MoreVertical size={14} />
                    </button>
                    {openMenu === course.id && (
                      <div className="absolute top-9 right-0 z-20 w-36 rounded-sm border border-slate-100 bg-white shadow-md">
                        <button className="flex w-full items-center gap-2 px-4 py-2.5 text-xs font-semibold text-red-500 hover:bg-red-50">
                          <Trash2 size={13} /> Delete Course
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoursesTable;
