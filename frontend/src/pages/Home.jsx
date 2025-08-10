import React from 'react'
import Hero from "../components/Home/Hero"; 
import RecentlyAdded from '../components/Home/RecentlyAdded';
// import Newsletter from '../components/Home/Newsletter';
import CarouselCategories from '../components/CarouselCategories';

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-[#FFF5F9] via-[#e7c3b1] to-[#f5e6da] text-white px-10 py-8 "style={{ fontFamily: "'Cinzel Decorative', cursive" }}>
      <Hero />
<CarouselCategories />

      <RecentlyAdded />
    {/* <Newsletter /> */}
    </div>
  )
}

export default Home
//bg-[#d9b8a9] text-[#3e2b2e] #f0d6c9ff  #f3efefff   #a17863ff   #473027ff