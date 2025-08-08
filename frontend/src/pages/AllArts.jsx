import React, { useEffect, useState } from 'react';
import axios from "axios";
import Loader from "../components/loader/Loader";
import ArtCard from '../components/ArtCard/ArtCard';
const AllArts = () => {
   const [Data, setData] = useState();
    useEffect(() => {
        const fetch = async()=>{
          const response = await axios.get("https://theaffinity-artstore.onrender.com/api/v1/arts/get-all-arts");
          setData(response.data.data);
        };
        fetch();
    }, []);
  return (
    <div className="bg-gradient-to-b from-[#FFF5F9] via-[#e7c3b1] to-[#f5e6da] px-12 py-8">
      <h4 className="text-xl sm:text-5xl text-[#4B001F] font-semibold whitespace-nowrap text-center mt-3 mb-5" style={{ fontFamily: "'Marcellus', serif" }}>All Collections</h4> 
       <h4 className="text-xs sm:text-xl text-[#4B001F] whitespace-nowrap text-center mt-1" style={{ fontFamily: "'Marcellus', serif" }}>Welcome, Explore our store with a coffee</h4> 
    {!Data && <div className='w-full h-screen flex items-center justify-center'><Loader /></div>}
    <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {Data && Data.map((items,i)=> <div key={i}>
        <ArtCard data={items}/>{" "}
      </div>)}
    </div>
    </div>
  )
}

export default AllArts
