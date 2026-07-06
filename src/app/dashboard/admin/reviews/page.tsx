'use client';

import ReviewsList from './_components/ReviewsList/ReviewsList';
import ReviewsStats from './_components/ReviewsStats/ReviewsStats';

const reviewsData = [
  {
    id: 1,
    student: 'Sumaiya Akter',
    studentImage: 'https://i.pravatar.cc/150?u=sumaiya',
    course: 'Complete Web Development Bootcamp',
    instructor: 'Md. Rafiqul Islam',
    rating: 5,
    text: 'This course completely changed my life! Best instructor on EduNext. Highly recommended for anyone starting web development.',
    date: 'Apr 22, 2025',
    status: 'pending',
  },
  {
    id: 2,
    student: 'Nusrat Jahan',
    studentImage: 'https://i.pravatar.cc/150?u=nusrat',
    course: 'UI/UX Design Masterclass',
    instructor: 'Farhan Hossain',
    rating: 1,
    text: 'Waste of money. The instructor barely explains anything. Very disappointed with this course.',
    date: 'Apr 21, 2025',
    status: 'pending',
  },
  {
    id: 3,
    student: 'Arif Hossain',
    studentImage: 'https://i.pravatar.cc/150?u=arif',
    course: 'React.js Advanced Masterclass',
    instructor: 'Md. Rafiqul Islam',
    rating: 5,
    text: 'The best React course I have ever taken. Every concept is explained clearly with real-world examples.',
    date: 'Apr 20, 2025',
    status: 'pending',
  },
  {
    id: 4,
    student: 'Rakib Ahmed',
    studentImage: 'https://i.pravatar.cc/150?u=rakib2',
    course: 'Digital Marketing',
    instructor: 'Nasrin Sultana',
    rating: 4,
    text: 'Very practical course. I started getting freelancing work after completing just half of the course.',
    date: 'Apr 18, 2025',
    status: 'approved',
  },
  {
    id: 5,
    student: 'Spam User',
    studentImage: 'https://i.pravatar.cc/150?u=spam',
    course: 'Freelancing Masterclass',
    instructor: 'Sabbir Hossain',
    rating: 5,
    text: 'BUY CHEAP COURSES AT WWW.FAKECOURSE.COM!!!',
    date: 'Apr 17, 2025',
    status: 'rejected',
  },
];

const ReviewModerationPage = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto space-y-6">
        <div>
          <h1 className="text-text-primary text-2xl font-black">Review Moderation</h1>
          <p className="text-text-secondary mt-1 text-sm">
            Approve or reject student reviews before they go public.
          </p>
        </div>
        <ReviewsStats reviews={reviewsData} />
        <ReviewsList />
      </div>
    </div>
  );
};

export default ReviewModerationPage;
