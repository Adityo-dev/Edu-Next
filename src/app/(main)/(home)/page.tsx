import BlogSection from './_components/BlogSection/BlogSection';
import CategorySection from './_components/CategorySection/CategorySection';
import CourseSection from './_components/CourseSection/CourseSection';
import CTASection from './_components/CTASection/CTASection';
import FAQSection from './_components/FAQSection/FAQSection';
import HeroSection from './_components/HeroSection/HeroSection';
import { default as HowItWorksSection } from './_components/HowItWorksSection/HowItWorksSection';
import TestimonialSection from './_components/TestimonialSection/TestimonialSection';

function LendingHomePage() {
  return (
    <section>
      <HeroSection />
      <HowItWorksSection />
      <CategorySection />
      <CourseSection />
      <TestimonialSection />
      <BlogSection />
      <FAQSection />
      <CTASection />
    </section>
  );
}

export default LendingHomePage;
