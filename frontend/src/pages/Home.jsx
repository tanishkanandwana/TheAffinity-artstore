import React from 'react'
import Hero from "../components/Home/Hero"; 
import RecentlyAdded from '../components/Home/RecentlyAdded';
import Newsletter from '../components/Home/Newsletter';
import CarouselCategories from '../components/CarouselCategories';
import SpecialMemories from '../components/Home/SpecialMemories';
import CustomerReviews from '../components/Home/CustomerReviews';

const Home = () => {
  return (
    <div className="bg-white  text-white"style={{ fontFamily: "'Cinzel Decorative', cursive" }}>
      {/* Announcement / Promotional Strip */}
<div
  className="
    w-full
    h-9 sm:h-10
      bg-[#F8F4F0]
  text-black
    flex items-center justify-center
    text-center
    px-3
    overflow-hidden
  "
>
  <p
    className="
      text-[10px]
      sm:text-xs
      md:text-sm
      font-semibold
      tracking-wide
      whitespace-nowrap
    "
  >
    ✦ DIWALI COLLECTION DROPPING SOON ✦
  </p>
</div>

<Hero />
      {/* <Hero /> */}

        <div className="px-10 py-8"></div>
<CarouselCategories />

      <RecentlyAdded />
    
    <SpecialMemories />
    <Newsletter />
    <CustomerReviews />
    </div>
  )
}

export default Home
//bg-[#d9b8a9] text-[#3e2b2e] rgb(254, 248, 245)  #e0cbb5ff   #a17863ff   #473027ff