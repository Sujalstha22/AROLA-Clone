import React from 'react';
import WaterRipple from '../components/WaterRipple/WaterRipple';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <section className="relative h-dvh w-screen overflow-hidden">
      {/* WATER RIPPLE BACKGROUND */}
      <div className="absolute inset-0 z-10">
        <WaterRipple
          image="/contact-bg.jpeg"
          rippleStrength={1.5}
          distortionStrength={0.35}
        />
      </div>

      {/* CONTACT CONTENT */}
      <div className="fixed right-0 z-20 flex h-full w-[50vw] items-center justify-end px-4 md:px-8 lg:px-16 xl:px-24">
        <ContactForm />
      </div>
    </section>
  );
};

export default Contact;
