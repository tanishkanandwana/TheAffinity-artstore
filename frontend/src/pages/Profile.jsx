import React from 'react'
import Sidebar from '../components/Profile/Sidebar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useEffect } from 'react';
import { useState } from 'react';
import Loader from '../components/loader/Loader'
import MobileNav from '../components/Profile/MobileNav'


const Profile = () => {
  // const isLoggedIn = useSelector();
  const [Profile, setProfile] = useState();
  const headers ={
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
useEffect(() => {
  const fetch = async() => {
    const response = await axios.get("https://theaffinity-artstore.onrender.com/api/v1/users/get-user-information",{headers});
    setProfile(response.data);
  };
  fetch();
}, []);

  
  // return (
  //   <div className="bg-pink-700 px-2 md:px-12 flex flex-col md:flex-row  py-8 gap-4 text-white">
  //   {!Profile && <div className='w-full h-[100%] flex items-center justify-center'><Loader /></div>}
  //   {Profile &&  <>
  //     <div className='w-full md:w-1/6  h-auto lg:h-screen'>
  //       <Sidebar data={Profile}/>
  //       <MobileNav />
  //     </div>
  //     <div className='w-full md:w-5/6'>

     
  //       <Outlet />
  //     </div>
  //    </>}
  //   </div>
  // )
  return (
  <div className="bg-gradient-to-b from-[#FFF5F9] via-[#e7c3b1] to-[#f5e6da]  px-12 py-8 px-2 md:px-12 flex flex-col md:flex-row py-8 gap-4 text-white">
    {!Profile ? (
      <div className='w-full h-[100%] flex items-center justify-center'>
        <Loader />
      </div>
    ) : (
      <>
        <div className='w-full md:w-1/6 h-auto lg:h-screen'>
          <Sidebar data={Profile} />
          <MobileNav />
        </div>
      </>
    )}
    
    {/* Always render Outlet even if profile is not ready */}
    <div className='w-full md:w-5/6'>
      <Outlet />
    </div>
  </div>
);

}

export default Profile
