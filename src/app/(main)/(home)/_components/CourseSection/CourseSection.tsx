import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const courses = [
  {
    id: 1,
    title: 'Web Development',
    price: '30.00',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000',
  },
  {
    id: 2,
    title: 'UI/UX Design',
    price: '32.00',
    image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1000',
    highlight: true,
  },
  {
    id: 3,
    title: 'Digital Marketing',
    price: '25.00',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1000',
  },
  {
    id: 4,
    title: 'Creative Writing',
    price: '35.00',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1000',
  },
  {
    id: 5,
    title: 'Leadership Skills',
    price: '25.00',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000',
  },
  {
    id: 6,
    title: 'Data Analytics',
    price: '29.00',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000',
  },
];

const CourseSection = () => {
  return (
    <section className="bg-[#F9FAFB] py-20">
      <div className="mx-auto max-w-400 px-6">
        {/* Section Header */}
        <div className="mb-12 flex flex-col justify-between md:flex-row md:items-end">
          <div className="max-w-xl">
            <h2 className="mb-4 text-4xl font-bold text-[#0F172A]">
              Explore Our <span className="text-[#34796F]">Courses</span>
            </h2>
            <p className="leading-relaxed text-slate-500">
              Discover a variety of expertly crafted courses designed to help you gain skills, grow
              your knowledge, and achieve your goals.
            </p>
          </div>
          <button className="mt-6 rounded-lg bg-[#34796F] px-6 py-3 font-medium text-white transition-all hover:bg-[#2a6159] active:scale-95 md:mt-0">
            View More
          </button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.map((course) => (
            <div key={course.id} className="group cursor-pointer">
              {/* Image Container */}
              <div className="relative mb-4 h-60 w-full overflow-hidden rounded-md transition-all duration-500 ease-in-out group-hover:shadow-md group-hover:shadow-emerald-100">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                  priority={course.id <= 3}
                />

                <div className="absolute inset-0 flex items-center justify-center bg-[#34796F]/10 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100">
                  <div className="translate-y-4 transform rounded-full bg-[#34796F] p-4 text-white shadow-xl transition-transform duration-300 group-hover:translate-y-0">
                    <ArrowUpRight size={24} strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              {/* Course Info */}
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xl font-semibold text-[#0F172A] transition-colors duration-300 group-hover:text-[#34796F]">
                  {course.title}
                </h3>

                <span className={`text-xl font-semibold text-[#0F172A]`}>${course.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseSection;
