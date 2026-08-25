import BlogSection from './_components/BlogSection/BlogSection';
import CategorySection from './_components/CategorySection/CategorySection';
import TopRatedCourses from './_components/TopRatedCourses/TopRatedCourses';
import CTASection from './_components/CTASection/CTASection';
import FAQSection from './_components/FAQSection/FAQSection';
import HeroSection from './_components/HeroSection/HeroSection';
import { default as HowItWorksSection } from './_components/HowItWorksSection/HowItWorksSection';
import TestimonialSection from './_components/TestimonialSection/TestimonialSection';
import BecomeInstructorSection from './_components/BecomeInstructorSection/BecomeInstructorSection';

function LendingHomePage() {
  return (
    <section>
      <HeroSection />
      <CategorySection />
      <div style={{ background: 'linear-gradient(160deg, #fdf9f0 0%, #f5f8f5 50%, #eef5f0 100%)' }}>
        <TopRatedCourses />
        <HowItWorksSection />
      </div>
      <BecomeInstructorSection />
      <div style={{ background: 'linear-gradient(160deg, #fdf9f0 0%, #f5f8f5 50%, #eef5f0 100%)' }}>
        <TestimonialSection />
        <BlogSection />
      </div>
      <FAQSection />
      <CTASection />
    </section>
  );
}

export default LendingHomePage;
