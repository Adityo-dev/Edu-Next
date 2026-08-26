import CTASection from '../(home)/_components/CTASection/CTASection';
import ContactForm from './_components/ContactForm/ContactForm';
import ContactHero from './_components/ContactHero/ContactHero';
import ContactInfo from './_components/ContactInfo/ContactInfo';

export const metadata = {
  title: 'Contact Support',
  description: 'Get in touch with the EduNext support team.',
};

const ContactPage = () => {
  return (
    <section className="mt-20">
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <CTASection />
    </section>
  );
};

export default ContactPage;
