import AboutHero from './_components/AboutHero/AboutHero';
import MissionVisionQuote from './_components/MissionVisionQuote/MissionVisionQuote';
import OurMission from './_components/OurMission/OurMission';
import OurVision from './_components/OurVision/OurVision';
import StatsCounter from './_components/StatsCounter/StatsCounter';

function LendingAboutPage() {
  return (
    <section>
      <AboutHero />
      <StatsCounter />
      <MissionVisionQuote />
      <OurMission />
      <OurVision />
    </section>
  );
}

export default LendingAboutPage;
