import { Star } from 'lucide-react';

interface RenderStarsProps {
  rating: number;
  size?: number;
  color?: string;
}

const RenderStars = ({ rating, size = 14, color = '#ffc107' }: RenderStarsProps) => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => {
        const isFull = rating >= i + 1;
        const isHalf = !isFull && rating >= i + 0.5;

        return (
          <div key={i} className="relative">
            <Star size={size} fill="none" color={color} />
            {(isFull || isHalf) && (
              <div
                className="absolute top-0 left-0 overflow-hidden"
                style={{ width: isHalf ? '50%' : '100%' }}
              >
                <Star size={size} fill={color} color={color} />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default RenderStars;
