import { CheckCircle, Star, Trash2, XCircle } from 'lucide-react';
import Image from 'next/image';

interface Review {
  id: number;
  student: string;
  studentImage: string;
  course: string;
  instructor: string;
  rating: number;
  text: string;
  date: string;
  status: string;
}

const isSpam = (text: string) =>
  text.includes('WWW.') || text.includes('http') || text.toUpperCase() === text;

interface ReviewsListProps {
  reviews: Review[];
}

const ReviewsList = ({ reviews }: ReviewsListProps) => {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className={`rounded-md border bg-white p-5 shadow-xs ${review.status === 'pending' ? 'border-yellow-100' : isSpam(review.text) ? 'border-red-100' : 'border-slate-100'}`}
        >
          <div className="flex gap-4">
            <Image
              src={review.studentImage}
              alt={review.student}
              width={44}
              height={44}
              className="h-11 w-11 shrink-0 rounded-full border-2 border-emerald-50"
            />
            <div className="flex-1">
              <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-bold">{review.student}</p>
                  <p className="text-text-secondary text-xs">
                    {review.course} • {review.instructor}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {isSpam(review.text) && (
                    <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-500">
                      ⚠️ Spam Detected
                    </span>
                  )}
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${review.status === 'pending' ? 'bg-yellow-50 text-yellow-600' : review.status === 'approved' ? 'text-primary bg-emerald-50' : 'bg-red-50 text-red-500'}`}
                  >
                    {review.status}
                  </span>
                </div>
              </div>
              <div className="mb-2 flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    fill={i < review.rating ? '#ffc107' : 'none'}
                    color="#ffc107"
                  />
                ))}
                <span className="text-text-secondary ml-2 text-xs">{review.date}</span>
              </div>
              <p className="text-text-secondary mb-4 text-sm leading-relaxed">{review.text}</p>
              {review.status === 'pending' && (
                <div className="flex gap-2">
                  <button className="bg-primary flex items-center gap-2 rounded-sm px-5 py-2 text-xs font-bold text-white hover:bg-[#2a6159]">
                    <CheckCircle size={13} /> Approve
                  </button>
                  <button className="flex items-center gap-2 rounded-sm border border-red-100 px-5 py-2 text-xs font-bold text-red-400 hover:bg-red-50">
                    <XCircle size={13} /> Reject
                  </button>
                  <button className="flex items-center gap-2 rounded-sm border border-slate-200 px-5 py-2 text-xs font-bold text-slate-500 hover:bg-slate-50">
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;
