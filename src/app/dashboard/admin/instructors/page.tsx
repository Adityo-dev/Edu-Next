/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import SectionHeader from '@/components/dashboard/SectionHeader/SectionHeader';
import { useGetBadgeRequestsQuery } from '@/redux/features/admin/instructorManagement/adminInstructor.api';
import { TInstructorBadgeRequest } from '@/types/adminInstructor.types';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import InstructorDetail from './_components/InstructorDetail/InstructorDetail';
import InstructorsList from './_components/InstructorsList/InstructorsList';
import InstructorsStats from './_components/InstructorsStats/InstructorsStats';

const InstructorBadgeRequestsPage = () => {
  const { data, isLoading } = useGetBadgeRequestsQuery({ page: 1, limit: 10 });
  const [selected, setSelected] = useState<TInstructorBadgeRequest | null>(null);
  const [showMobileDetails, setShowMobileDetails] = useState(false);

  const instructors = data?.data?.instructors || [];

  useEffect(() => {
    if (instructors.length > 0 && !selected) {
      setSelected(instructors[0]);
    }
  }, [instructors, selected]);

  const handleSelect = (instructor: TInstructorBadgeRequest) => {
    setSelected(instructor);
    setShowMobileDetails(true);
  };

  const handleActionComplete = () => {
    setSelected(null);
    setShowMobileDetails(false);
  };

  return (
    <div className="mx-auto space-y-5">
      <div className={showMobileDetails ? 'hidden lg:block' : 'block'}>
        <SectionHeader
          title="Instructor Badge Requests"
          description="Review and approve instructor badge applications."
        />
        <div className="mt-5">
          <InstructorsStats pendingCount={data?.data?.pagination?.total || instructors.length} />
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-slate-400">
          Loading requests...
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className={`lg:col-span-2 ${showMobileDetails ? 'hidden lg:block' : 'block'}`}>
            <InstructorsList
              instructors={instructors}
              selectedId={selected?._id ?? null}
              onSelect={handleSelect}
            />
          </div>

          <div className={`${showMobileDetails ? 'block' : 'hidden lg:block'}`}>
            {showMobileDetails && (
              <button
                onClick={() => setShowMobileDetails(false)}
                className="hover:text-primary mb-4 flex items-center gap-2 text-sm font-semibold text-slate-600 lg:hidden"
              >
                <ArrowLeft size={16} /> Back to List
              </button>
            )}
            <InstructorDetail instructor={selected} onActionComplete={handleActionComplete} />
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorBadgeRequestsPage;
