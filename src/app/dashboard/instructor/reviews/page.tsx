'use client';

import RatingOverview from './_components/RatingOverview/RatingOverview';
import ReviewsList from './_components/ReviewsList/ReviewsList';

const InstructorReviewsPage = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        <div>
          <h1 className="text-text-primary text-2xl font-black">Reviews</h1>
          <p className="text-text-secondary mt-1 text-sm">See what your students are saying.</p>
        </div>

        {/* Rating Overview */}
        <RatingOverview />

        {/* Reviews List */}
        <ReviewsList />
      </div>
    </div>
  );
};

export default InstructorReviewsPage;
