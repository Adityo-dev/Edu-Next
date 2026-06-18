'use client';

import SectionHeader from '@/components/dashboard/SectionHeader/SectionHeader';
import RatingOverview from './_components/RatingOverview/RatingOverview';
import ReviewsList from './_components/ReviewsList/ReviewsList';

const InstructorReviewsPage = () => {
  return (
    <div className="space-y-6">
      <SectionHeader title="Reviews" description="See what your students are saying." />

      {/* Rating Overview */}
      <RatingOverview />

      {/* Reviews List */}
      <ReviewsList />
    </div>
  );
};

export default InstructorReviewsPage;
