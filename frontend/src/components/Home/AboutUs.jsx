import React from 'react';

const AboutUs = () => {
  return (
    <section className="w-full bg-white">
      <picture>
        {/* Mobile and small devices */}
        <source
          media="(max-width: 767px)"
          srcSet="/ABOUTSD.png"
        />

        {/* Desktop and laptop devices */}
        <img
          src="/ABOUT.png"
          alt="About The Affinity Arts"
          className="block w-full h-auto"
          loading="lazy"
        />
      </picture>
    </section>
  );
};

export default AboutUs;