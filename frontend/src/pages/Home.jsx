import React from 'react'
import Hero from "../components/Home/Hero"; 
import RecentlyAdded from '../components/Home/RecentlyAdded';
import Newsletter from '../components/Home/Newsletter';
import CarouselCategories from '../components/CarouselCategories';

const Home = () => {
  return (
    <div className="bg-white  text-white"style={{ fontFamily: "'Cinzel Decorative', cursive" }}>
      <Hero />

        <div className="px-10 py-8"></div>
<CarouselCategories />

      <RecentlyAdded />
    <Newsletter />
    </div>
  )
}

export default Home
//bg-[#d9b8a9] text-[#3e2b2e] rgb(254, 248, 245)  #e0cbb5ff   #a17863ff   #473027ff