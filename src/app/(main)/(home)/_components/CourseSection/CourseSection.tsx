import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { coursesData } from './data/coursesData.data';

const CourseSection = () => {
  return (
    <section className="bg-[#F9FAFB] py-20">
      <div className="mx-auto max-w-400 px-6">
        {/* Section Header */}
        <div className="mb-14 flex flex-col justify-between md:flex-row md:items-end">
          <div className="max-w-xl">
            <h2 className="mb-3 text-5xl leading-tight font-bold tracking-tight text-[#0F172A]">
              Explore Our <span className="text-primary">Courses</span>
            </h2>
            <p className="text-lg leading-relaxed text-slate-500">
              Discover a variety of expertly crafted courses designed to help you gain skills, grow
              your knowledge, and achieve your goals.
            </p>
          </div>
          <button className="bg-primary cursor-pointer rounded-sm px-6 py-3 font-medium text-white transition-all hover:bg-[#2a6159] active:scale-95 md:mt-0">
            View More
          </button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {coursesData.map((course) => (
            <Link href={`/courses/${course?.id}`} key={course?.id} className="group cursor-pointer">
              {/* Image Container */}
              <div className="relative mb-3 h-65 w-full overflow-hidden rounded-md transition-all duration-500 ease-in-out group-hover:shadow-sm group-hover:shadow-emerald-100">
                <Image
                  src={course?.image}
                  alt={course?.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                  priority={course?.id <= 3}
                />

                <div className="bg-primary/10 absolute inset-0 flex items-center justify-center opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100">
                  <div className="bg-primary translate-y-4 transform rounded-full p-4 text-white shadow-md transition-transform duration-300 group-hover:translate-y-0">
                    <ArrowUpRight size={24} strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              {/* Course Info */}
              <div className="flex items-center justify-between px-1">
                <h3 className="group-hover:text-primary text-lg font-semibold text-[#0F172A] transition-colors duration-300">
                  {course?.title}
                </h3>

                <span className={`text-lg font-semibold text-[#0F172A]`}>${course?.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseSection;
