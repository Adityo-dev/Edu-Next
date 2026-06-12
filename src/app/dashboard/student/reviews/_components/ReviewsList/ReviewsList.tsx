'use client';

import { Edit, Star, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface Review {
  id: number;
  course: string;
  instructor: string;
  image: string;
  rating: number;
  review: string;
  date: string;
  status: string;
}

interface ReviewsListProps {
  reviews: Review[];
}

const ReviewsList = ({ reviews }: ReviewsListProps) => {
  const [editId, setEditId] = useState<number | null>(null);
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState('');

  return (
    <div>
      <h2 className="mb-4 text-lg font-bold">Submitted Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="dashboard-card-container">
            <div className="flex gap-4">
              <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-sm">
                <Image src={review.image} alt={review.course} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="mb-1 flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold">{review.course}</h3>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      review.status === 'published'
                        ? 'text-primary bg-emerald-50'
                        : 'bg-yellow-50 text-yellow-600'
                    }`}
                  >
                    {review.status === 'published' ? 'Published' : 'Pending Review'}
                  </span>
                </div>

                <p className="text-text-secondary mb-2 text-xs">{review.instructor}</p>

                {/* Stars */}
                <div className="mb-2 flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < review.rating ? '#ffc107' : 'none'}
                      color="#ffc107"
                    />
                  ))}
                  <span className="ml-1 text-xs text-slate-500">{review.date}</span>
                </div>

                {editId === review.id ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <button key={i} onClick={() => setNewRating(i + 1)}>
                          <Star
                            size={20}
                            fill={i < newRating ? '#ffc107' : 'none'}
                            color="#ffc107"
                            className="cursor-pointer"
                          />
                        </button>
                      ))}
                    </div>
                    <textarea
                      value={newText}
                      onChange={(e) => setNewText(e.target.value)}
                      rows={3}
                      className="focus:border-primary w-full rounded-sm border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
                      placeholder="Update your review..."
                    />
                    <div className="flex gap-2">
                      <button
                        className="bg-primary rounded-sm px-4 py-2 text-xs font-bold text-white"
                        onClick={() => setEditId(null)}
                      >
                        Save Changes
                      </button>
                      <button
                        className="rounded-sm border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-500"
                        onClick={() => setEditId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-text-secondary mb-3 line-clamp-2 text-sm leading-relaxed">
                      {review.review}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditId(review.id);
                          setNewText(review.review);
                          setNewRating(review.rating);
                        }}
                        className="flex items-center gap-1.5 rounded-sm border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                      >
                        <Edit size={12} /> Edit
                      </button>
                      <button className="flex items-center gap-1.5 rounded-sm border border-red-100 px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-50">
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsList;
