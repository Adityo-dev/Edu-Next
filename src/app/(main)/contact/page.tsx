import ContactHero from './_components/ContactHero/ContactHero';
import ContactInfo from './_components/ContactInfo/ContactInfo';
import ContactForm from './_components/ContactForm/ContactForm';
import CTASection from '../(home)/_components/CTASection/CTASection';

export const metadata = {
  title: 'Contact Support',
  description: 'Get in touch with the EduNext support team.',
};

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <CTASection />
    </div>
  );
};

export default ContactPage;
