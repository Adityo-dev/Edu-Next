/* eslint-disable @typescript-eslint/no-explicit-any */
import { Mail, Star } from 'lucide-react';
import Image from 'next/image';

interface StudentsTableProps {
  filtered: any[];
}

const StudentsTable = ({ filtered }: StudentsTableProps) => {
  return (
    <div className="overflow-hidden rounded-md border border-slate-100 bg-white shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-5 py-4 text-left text-xs font-bold tracking-wider text-slate-500 uppercase">
                Student
              </th>
              <th className="px-5 py-4 text-left text-xs font-bold tracking-wider text-slate-500 uppercase">
                Course
              </th>
              <th className="px-5 py-4 text-left text-xs font-bold tracking-wider text-slate-500 uppercase">
                Progress
              </th>
              <th className="px-5 py-4 text-left text-xs font-bold tracking-wider text-slate-500 uppercase">
                Rating
              </th>
              <th className="px-5 py-4 text-left text-xs font-bold tracking-wider text-slate-500 uppercase">
                Last Active
              </th>
              <th className="px-5 py-4 text-left text-xs font-bold tracking-wider text-slate-500 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((student) => (
              <tr key={student.id} className="transition-colors hover:bg-slate-50">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={student.image}
                      alt={student.name}
                      width={36}
                      height={36}
                      className="rounded-full border-2 border-emerald-50"
                    />
                    <div>
                      <p className="font-bold">{student.name}</p>
                      <p className="text-text-secondary text-xs">{student.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <p className="line-clamp-1 max-w-xs text-xs text-slate-600">{student.course}</p>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${student.progress === 100 ? 'bg-yellow-400' : 'bg-primary'}`}
                        style={{ width: `${student.progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-slate-600">{student.progress}%</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  {student.rating > 0 ? (
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          fill={i < student.rating ? '#ffc107' : 'none'}
                          color="#ffc107"
                        />
                      ))}
                    </div>
                  ) : (
                    <span className="text-text-secondary text-xs">No review</span>
                  )}
                </td>
                <td className="px-5 py-4">
                  <span className="text-text-secondary text-xs">{student.lastActive}</span>
                </td>
                <td className="px-5 py-4">
                  <button className="flex items-center gap-1.5 rounded-sm border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50">
                    <Mail size={12} /> Message
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsTable;
