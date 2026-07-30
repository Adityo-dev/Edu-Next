import { Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Blog - EduNext',
  description: 'Read the latest updates and articles from EduNext.',
};

function LendingBlogPage() {
  return (
    <section>
      <div className="bg-primary mt-20 px-6 py-16 text-center">
        <div className="relative z-10 mx-auto max-w-400 px-6 text-center">
          <h1 className="mb-3 text-4xl font-bold text-white md:text-5xl">
            Our <span className="text-yellow-400">Blog</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/75">
            Read the latest news, tips, and tutorials on digital skills, freelancing, and career
            growth.
          </p>
        </div>
      </div>

      {/* ── Coming Soon Section  */}
      <section className="py-20">
        <div className="mx-auto max-w-400 px-6 text-center">
          <div className="text-primary mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
            <Sparkles size={28} />
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-3xl">
            Our Blog is <span className="text-primary">Coming Soon</span>
          </h2>
          <p className="mx-auto max-w-md text-slate-500">
            We are working hard to bring you amazing articles and tutorials. Check back soon!
          </p>
        </div>
      </section>
    </section>
  );
}

export default LendingBlogPage;
