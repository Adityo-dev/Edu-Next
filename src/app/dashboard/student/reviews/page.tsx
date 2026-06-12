'use client';

import ReviewsHeader from './_components/ReviewsHeader/ReviewsHeader';
import ReviewsStats from './_components/ReviewsStats/ReviewsStats';
import ReviewsList from './_components/ReviewsList/ReviewsList';
import LeaveReview from './_components/LeaveReview/LeaveReview';

const reviewsData = [
  {
    id: 1,
    course: 'Freelancing: From Beginner to Pro',
    instructor: 'Sabbir Hossain',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600',
    rating: 5,
    review:
      'This course completely changed my life! I started freelancing after finishing it and now earn consistently every month. Highly recommended for anyone who wants to start their freelancing journey.',
    date: 'April 12, 2025',
    status: 'published',
  },
  {
    id: 2,
    course: 'Graphic Design with Adobe Illustrator',
    instructor: 'Mithila Rahman',
    image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=600',
    rating: 4,
    review:
      'Great course with very detailed explanations. The projects were practical and helped me build a strong portfolio. Would love more advanced content in future.',
    date: 'March 8, 2025',
    status: 'published',
  },
  {
    id: 3,
    course: 'Data Analytics with Python & Excel',
    instructor: 'Imran Hossain',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=600',
    rating: 5,
    review:
      'Excellent content! Very well structured and easy to follow. The instructor explains complex topics in a very simple way.',
    date: 'February 22, 2025',
    status: 'pending',
  },
];

const pendingReviewCourses = [
  {
    id: 4,
    course: 'Complete Web Development Bootcamp',
    instructor: 'Md. Rafiqul Islam',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=600',
  },
];

const MyReviewsPage = () => {
  const publishedCount = reviewsData.filter((r) => r.status === 'published').length;
  const pendingCount = reviewsData.filter((r) => r.status === 'pending').length;

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <ReviewsHeader />

        {/* Stats */}
        <ReviewsStats
          totalCount={reviewsData.length}
          publishedCount={publishedCount}
          pendingCount={pendingCount}
        />

        {/* Reviews List */}
        <ReviewsList reviews={reviewsData} />

        {/* Leave Review */}
        <LeaveReview courses={pendingReviewCourses} />
      </div>
    </div>
  );
};

export default MyReviewsPage;
