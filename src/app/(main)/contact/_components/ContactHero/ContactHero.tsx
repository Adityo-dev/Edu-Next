const ContactHero = () => {
  return (
    <div className="bg-primary px-6 py-16 text-center">
      {/* Background Dot Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1.5px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-400">
        <h1 className="mb-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">
          Get in <span className="text-warning italic">Touch</span>
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
          Have a question, feedback, or need help with a course? Our support team is always ready to
          assist you on your learning journey.
        </p>
      </div>
    </div>
  );
};

export default ContactHero;
