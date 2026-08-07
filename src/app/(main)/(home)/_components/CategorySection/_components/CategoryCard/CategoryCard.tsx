import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { TCategory } from '@/redux/features/categories/categoriesApi';

interface CategoryCardProps {
  cat: TCategory;
  isYellowStyle: boolean;
}

const CategoryCard = ({ cat, isYellowStyle }: CategoryCardProps) => {
  return (
    <Link
      href={`/courses?category=${encodeURIComponent(cat?.name || '')}`}
      className={`group relative flex h-95 w-full cursor-pointer flex-col overflow-hidden rounded-md p-6 shadow-sm transition-all duration-500 ${
        isYellowStyle ? 'bg-[#FEF5E7]' : 'bg-[#EEF5F5]'
      }`}
    >
      {isYellowStyle ? (
        <>
          <div className="flex w-full grow flex-col">
            <h3 className="mb-2.5 text-2xl font-semibold">{cat?.name}</h3>
            <p className="text-text-secondary line-clamp-3 w-full leading-relaxed">
              {cat?.description ||
                'Explore courses in this category to enhance your skills and knowledge.'}
            </p>
          </div>
          <div className="flex items-end justify-between">
            <div className="bg-primary flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight size={24} />
            </div>
            {/* Pixel Perfect Cut Image */}
            <div className="relative h-40 w-40 overflow-hidden rounded-tl-[5rem] rounded-tr-md rounded-br-3xl rounded-bl-3xl border-[6px] border-white/60 shadow-xl shadow-black/5">
              {cat?.image && (
                <Image
                  src={cat.image}
                  alt={cat?.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}
            </div>
          </div>
        </>
      ) : (
        /* Data Analytics Style (Teal Card) */
        <>
          <div className="flex justify-between">
            <div className="bg-primary flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight size={24} />
            </div>

            <div className="relative h-40 w-40 overflow-hidden rounded-tl-[5rem] rounded-tr-md rounded-br-3xl rounded-bl-3xl border-[6px] border-white/60 shadow-xl shadow-black/5">
              {cat?.image && (
                <Image
                  src={cat.image}
                  alt={cat?.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}
            </div>
          </div>

          <div className="mt-auto">
            <h3 className="mb-2.5 text-2xl font-semibold">{cat?.name}</h3>
            <p className="text-text-secondary line-clamp-3 leading-relaxed">
              {cat?.description ||
                'Explore courses in this category to enhance your skills and knowledge.'}
            </p>
          </div>
        </>
      )}
    </Link>
  );
};

export default CategoryCard;
