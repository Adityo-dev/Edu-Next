'use client';

import SectionHeader from '@/components/dashboard/SectionHeader/SectionHeader';
import LeaveReview from './_components/LeaveReview/LeaveReview';
import ReviewsList from './_components/ReviewsList/ReviewsList';
import ReviewsStats from './_components/ReviewsStats/ReviewsStats';

const MyReviewsPage = () => {
  return (
    <section className="space-y-6">
      <SectionHeader
        title="My Reviews"
        description="Manage the reviews you have left for your courses."
      />
      <ReviewsStats />
      <ReviewsList />
      <LeaveReview />
    </section>
  );
};

export default MyReviewsPage;
