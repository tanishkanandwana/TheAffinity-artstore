// import React from 'react'
// import Hero from "../components/Home/Hero"; 
// import RecentlyAdded from '../components/Home/RecentlyAdded';
// import Newsletter from '../components/Home/Newsletter';
// import CarouselCategories from '../components/CarouselCategories';
// import SpecialMemories from '../components/Home/SpecialMemories';
// import CustomerReviews from '../components/Home/CustomerReviews';

// const Home = () => {
//   return (
//     <div className="bg-white  text-white"style={{ fontFamily: "'Cinzel Decorative', cursive" }}>
//       {/* Announcement / Promotional Strip */}
// <div
//   className="
//     w-full
//     h-9 sm:h-10
//       bg-[#8B681B]
//   text-[#E5C46A]
//     flex items-center justify-center
//     text-center
//     px-3
//     overflow-hidden
//   "
// >
//   <p
//     className="
//       text-[10px]
//       sm:text-xs
//       md:text-sm
//       font-semibold
//       tracking-wide
//       whitespace-nowrap
//     "
//   >
//     ✦ Diwali Gifting is here, Orders are now open!✦
//   </p>
// </div>

// <Hero />
//       {/* <Hero /> */}

//         <div className="px-10 py-8"></div>
// <CarouselCategories />

//       <RecentlyAdded />
    
//     <SpecialMemories />
//     <Newsletter />
//     <CustomerReviews />
//     </div>
//   )
// }

// export default Home



//bg-[#d9b8a9] text-[#3e2b2e] rgb(254, 248, 245)  #e0cbb5ff   #a17863ff   #473027ff



import React from 'react';
import Hero from "../components/Home/Hero";
import RecentlyAdded from '../components/Home/RecentlyAdded';
import Newsletter from '../components/Home/Newsletter';
import CarouselCategories from '../components/CarouselCategories';
import SpecialMemories from '../components/Home/SpecialMemories';
import CustomerReviews from '../components/Home/CustomerReviews';

const Home = () => {
  return (
    <div
      className="bg-white text-white flex flex-col"
      style={{ fontFamily: "'Cinzel Decorative', cursive" }}
    >
      {/* Announcement Strip */}
      <div
        className="
          w-full h-9 sm:h-10
          bg-[#8B681B]
          text-[#E5C46A]
          flex items-center justify-center
          text-center px-3 overflow-hidden
          relative z-30
        "
      >
        <p className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-wide whitespace-nowrap">
          ✦ Diwali Gifting is here, Orders are now open! ✦
        </p>
      </div>

      {/* MOBILE: Hero image with categories overlaid on top */}
      <div className="relative md:hidden">
        <Hero />

        <div className="absolute top-0 left-0 right-0 z-20">
          <CarouselCategories />
        </div>
      </div>

      {/* DESKTOP: Keep the original Hero and category positions */}
      <div className="hidden md:block order-1">
        <Hero />
      </div>

      <div className="hidden md:block order-3">
        <CarouselCategories />
      </div>

      {/* Existing desktop spacing */}
      <div className="hidden md:block order-2 px-10 py-8" />

      {/* Remaining homepage sections */}
      <div className="order-4">
        <RecentlyAdded />
        <SpecialMemories />
        <Newsletter />
        <CustomerReviews />
      </div>
    </div>
  );
};

export default Home;
