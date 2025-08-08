import React from 'react'
import Hero from "../components/Home/Hero"; 
import RecentlyAdded from '../components/Home/RecentlyAdded';
import CarouselCategories from '../components/CarouselCategories';

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-[#FFF5F9] via-[#e7c3b1] to-[#f5e6da] text-white px-10 py-8 ">
      <Hero />
<CarouselCategories />

      <RecentlyAdded />
   
    </div>
  )
}

export default Home
//bg-[#d9b8a9] text-[#3e2b2e] #e7c3b1  #f5e6da   #a17863ff   #473027ff