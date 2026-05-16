import BlogSection from './_components/BlogSection/BlogSection';
import CategorySection from './_components/CategorySection/CategorySection';
import CourseSection from './_components/CourseSection/CourseSection';
import CTASection from './_components/CTASection/CTASection';
import FAQSection from './_components/FAQSection/FAQSection';
import HeroSection from './_components/HeroSection/HeroSection';
import TestimonialSection from './_components/TestimonialSection/TestimonialSection';

function LendingHomePage() {
  return (
    <section>
      <HeroSection />
      <CategorySection />
      <CourseSection />
      <TestimonialSection />
      <FAQSection />
      <BlogSection />
      <CTASection />
    </section>
  );
}

export default LendingHomePage;
