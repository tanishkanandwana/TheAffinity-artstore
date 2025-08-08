import React from 'react';

const AboutUs = () => {
  return (
    <div className="relative h-screen w-full rounded-r-2xl shadow-2xl overflow-hidden">
      {/* Background video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/gift-wrapping-woman-tie-a-white-ribbon-bow.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

      {/* Content */}
      <div
        className="relative z-10 flex flex-col justify-center items-center h-full px-6"
        style={{ fontFamily: "'Marcellus', serif" }}
      >
        <h1 className="text-4xl text-[#F5E6DA] text-center font-bold mb-6">THE AFFINITY</h1>
        <p className="text-lg text-[#DCC9B8] text-center leading-relaxed max-w-xl">
          -Because Gifting is more than a Tradition - It's how we Celebrate, Connect, and Remember.
          <br />
          From Affinity to THE AFFINITY, We offer 'Handmade pieces' -<br />
          Crafted from your Custom Ideas or chosen from our Curated Collections.
          <br />
          <br />
          Tell us your story, or Explore ours-
          <br />
          Our every piece is-
          <br />
          Made with Heart
          <br />
          Meant to be Felt
          <br />
          From us to you.
          <br />
          With Love - THE AFFINITY🤎
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
