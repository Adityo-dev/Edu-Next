import { ArrowRight, Clock } from 'lucide-react';
import Image from 'next/image';

export interface IBlogPost {
  id: number | string;
  title: string;
  description: string;
  image: string;
  category: string;
  readTime: string;
}

interface BlogCardProps {
  post: IBlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <div className="group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-md bg-white shadow-xs transition-all duration-300 hover:shadow-md hover:shadow-emerald-100/50">
      {/* Image */}
      <div className="relative h-52 w-full shrink-0 overflow-hidden">
        <Image
          src={post?.image}
          alt={post?.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Category */}
        <span className="bg-primary absolute top-4 left-4 rounded-sm px-3 py-1 text-xs font-medium text-white">
          {post?.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex grow flex-col p-4">
        {/* Read Time */}
        <div className="text-text-secondary mb-3 flex items-center gap-1.5">
          <Clock size={13} />
          <span className="text-xs font-medium">{post?.readTime}</span>
        </div>

        {/* Title */}
        <h3 className="group-hover:text-primary mb-2 line-clamp-2 text-base leading-snug font-semibold transition-colors duration-300">
          {post?.title}
        </h3>

        {/* Description */}
        <p className="text-text-secondary mb-3 line-clamp-2 text-sm leading-relaxed">
          {post?.description}
        </p>

        {/* Bottom Section (pushed to bottom by mt-auto) */}
        <div className="mt-auto shrink-0">
          {/* Divider */}
          <div className="mb-2 h-px w-full bg-slate-100" />

          {/* Read More */}
          <div className="flex items-center justify-between">
            <span className="text-primary text-sm font-semibold">Read Article</span>
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
              <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
