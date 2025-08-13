

import React from 'react'; 
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


const Hero = () => {
  
  const slides = [
    {
      image: './Brand.png',
      heading: 'The Affinity',
      subheading: 'Art that celebrates, Gifts that connect',
    },
    {
      image: './image1',
      heading: 'Gifts with Soul',
      subheading: 'Where art meets heart',
    },
    {
      image: './image2',
      heading: 'Curated for You',
      subheading: 'Personalized gifting, timeless touch',
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    arrows: false,
  };

  return (
   <div className="relative w-full h-[70vh] sm:h-[85vh] overflow-hidden flex items-center justify-center">
      
      {/* Hero Image (centered) */}
      <motion.img
        src="./Brand.png"
        alt="hero"
        className="absolute w-auto h-[80%] sm:h-[100%] max-h-[80vh] object-contain  z-0 opacity-80 top-6 sm:top-0"
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Optional dark/gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-lime/100 via-black/30 to-pink/40 z-10  sm:min-h-[80vh]"></div>

      {/* Centered Text Content */}
    <div className="relative z-20 flex flex-col justify-center sm:justify-center items-center text-center min-h-[80vh] sm:min-h-[70vh] px-4 pt-8 sm:pt-0">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl lg:text-[7rem] text-white soft-glow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ fontFamily: "'Cinzel Decorative', cursive" }}
          transition={{ duration: 1.2 }}
        >
           THE AFFINITY
        </motion.h1>

        <motion.p
          className="mt-4 text-lg sm:text-xl md:text-2xl text-white font-medium soft-glow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{ fontFamily: "'Cinzel Decorative', cursive" }}
        >
          Art that celebrates, Gifts that connect 
        </motion.p>

        <motion.div
          className="mt-6 md:mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {/* Explore Collections Button */}
          <Link
            to="/all-arts"
            className="
              relative
              text-base sm:text-lg md:text-xl lg:text-2xl
              font-semibold
              px-6 md:px-10
              py-2 md:py-3
              text-white
              rounded-full
              border-2
              border-transparent
              bg-gradient-to-r from-[#a67364] via-transparent to-[#a67364]
              hover:bg-gradient-to-r hover:from-[#6e433d] hover:via-transparent hover:to-[#6e433d]
              hover:text-white
              transition-all duration-600
              glow-text
            "
          >
            Explore Collections
          </Link>

          {/* Customize Yours Button */}
          <Link
            to="/custom-request"
            className="
              relative
              text-base sm:text-lg md:text-xl lg:text-2xl
              font-semibold
              px-6 md:px-10
              py-2 md:py-3
              text-white
              rounded-full
              border-2
              border-white
              bg-transparent
              hover:bg-[#FDF8F6] hover:text-[#895a4f]
              transition-all duration-500
              glow-text
            "
          >
            Customize Yours
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;