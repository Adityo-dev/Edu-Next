'use client';

import SectionHeader from '@/components/dashboard/SectionHeader/SectionHeader';
import ReviewsList from './_components/ReviewsList/ReviewsList';
import ReviewsStats from './_components/ReviewsStats/ReviewsStats';

const ReviewModerationPage = () => {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Review Moderation"
        description="Approve or reject student reviews before they go public."
      />
      <ReviewsStats />
      <ReviewsList />
    </div>
  );
};

export default ReviewModerationPage;
