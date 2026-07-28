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
        // Calculate the exact fill percentage for the current star (0 to 100)
        const fillPercentage = Math.min(Math.max(rating - i, 0), 1) * 100;

        return (
          <div key={i} className="relative">
            <Star size={size} fill="none" color={color} />
            {fillPercentage > 0 && (
              <div
                className="absolute top-0 left-0 overflow-hidden"
                style={{ width: `${fillPercentage}%` }}
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
