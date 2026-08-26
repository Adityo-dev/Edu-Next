import CTASection from '../(home)/_components/CTASection/CTASection';
import AboutHero from './_components/AboutHero/AboutHero';
import AboutStats from './_components/AboutStats/AboutStats';
import MissionAndVision from './_components/MissionAndVision/MissionAndVision';
import OurJourney from './_components/OurJourney/OurJourney';
import OurStory from './_components/OurStory/OurStory';
import OurValues from './_components/OurValues/OurValues';
import WhyChooseUs from './_components/WhyChooseUs/WhyChooseUs';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <div style={{ background: 'linear-gradient(160deg, #fdf9f0 0%, #f5f8f5 50%, #eef5f0 100%)' }}>
        <OurStory />
        <MissionAndVision />
      </div>
      <AboutStats />
      <OurJourney />
      <div style={{ background: 'linear-gradient(160deg, #fdf9f0 0%, #f5f8f5 50%, #eef5f0 100%)' }}>
        <OurValues />
        <WhyChooseUs />
      </div>
      <CTASection />
    </div>
  );
};

export default AboutUsPage;
