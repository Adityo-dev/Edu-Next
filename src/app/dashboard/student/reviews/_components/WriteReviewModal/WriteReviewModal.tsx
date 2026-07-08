/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useModal } from '@/context/ModalContext';
import { useAddReviewMutation } from '@/redux/features/reviews/studentReview.api';
import { Loader2, Star } from 'lucide-react';
import { useState } from 'react';

const WriteReviewModal = () => {
  const { data, closeModal } = useModal();
  const [addReview, { isLoading }] = useAddReviewMutation();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const courseId = data?._id;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!comment.trim()) {
      setError('Please write a review comment.');
      return;
    }

    try {
      const res = await addReview({ courseId, rating, comment }).unwrap();
      if (res.success) {
        closeModal();
      }
    } catch (err: any) {
      setError(err?.data?.message || err?.message || 'Failed to submit review');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-2">
      {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-500">{error}</div>}

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">Rating</label>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <button type="button" key={i} onClick={() => setRating(i + 1)}>
              <Star
                size={28}
                fill={i < rating ? '#ffc107' : 'none'}
                color="#ffc107"
                className="cursor-pointer transition-colors"
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">Your Review</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="focus:border-primary focus:ring-primary w-full rounded-md border border-slate-200 p-3 text-sm focus:ring-1 focus:outline-none"
          placeholder="Tell us what you thought about this course..."
          disabled={isLoading}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={closeModal}
          disabled={isLoading}
          className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary flex items-center gap-2 rounded-md px-4 py-2 text-sm font-bold text-white hover:bg-[#2a6159] disabled:opacity-50"
        >
          {isLoading && <Loader2 size={16} className="animate-spin" />}
          Submit Review
        </button>
      </div>
    </form>
  );
};

export default WriteReviewModal;
