import { TCategory } from '@/redux/features/categories/categoriesApi';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CategoryCardProps {
  cat: TCategory;
  isYellowStyle: boolean;
}

const CategoryCard = ({ cat, isYellowStyle }: CategoryCardProps) => {
  return (
    <Link
      href={`/courses?category=${encodeURIComponent(cat?.name || '')}`}
      className={`group relative flex h-80 w-full cursor-pointer flex-col overflow-hidden rounded-md p-5 shadow-sm transition-all duration-500 sm:h-85 sm:p-6 md:h-90 ${
        isYellowStyle ? 'bg-[#FEF5E7]' : 'bg-[#EEF5F5]'
      }`}
    >
      {isYellowStyle ? (
        <>
          <div className="flex w-full grow flex-col">
            <h3 className="mb-2 text-lg font-semibold sm:text-xl">{cat?.name}</h3>
            <p className="text-text-secondary line-clamp-2 w-full text-sm leading-relaxed sm:line-clamp-3 sm:text-base">
              {cat?.description ||
                'Explore courses in this category to enhance your skills and knowledge.'}
            </p>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div className="bg-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-lg transition-transform duration-500 group-hover:rotate-45 sm:h-12 sm:w-12">
              <ArrowUpRight size={22} className="sm:h-6 sm:w-6" />
            </div>
            {/* Pixel Perfect Cut Image */}
            <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-tl-[3rem] rounded-tr-md rounded-br-3xl rounded-bl-3xl border-4 border-white/60 shadow-xl shadow-black/5 sm:rounded-tl-[4rem] md:rounded-tl-[5rem]">
              {cat?.image && (
                <Image
                  src={cat.image}
                  alt={cat?.name}
                  fill
                  quality={60}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}
            </div>
          </div>
        </>
      ) : (
        /* Data Analytics Style (Teal Card) - Reverse Layout */
        <>
          <div className="mb-4 flex justify-between">
            <div className="bg-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-lg transition-transform duration-500 group-hover:rotate-45 sm:h-12 sm:w-12">
              <ArrowUpRight size={22} className="sm:h-6 sm:w-6" />
            </div>

            <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-tl-[3rem] rounded-tr-md rounded-br-3xl rounded-bl-3xl border-4 border-white/60 shadow-xl shadow-black/5 sm:rounded-tl-[4rem] md:rounded-tl-[5rem]">
              {cat?.image && (
                <Image
                  src={cat.image}
                  alt={cat?.name}
                  fill
                  quality={60}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}
            </div>
          </div>

          <div className="mt-auto">
            <h3 className="mb-2 text-lg font-semibold sm:text-xl">{cat?.name}</h3>
            <p className="text-text-secondary line-clamp-2 text-base leading-relaxed sm:line-clamp-3">
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
