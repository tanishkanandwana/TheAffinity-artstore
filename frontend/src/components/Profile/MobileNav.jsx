import React from 'react'
import { Link } from 'react-router-dom'
import {  useSelector } from 'react-redux';

const MobileNav = () => {
  const role = useSelector((state) => state.auth.role);
  return (
    <>
    {role === "user" && (
      <div className='w-full flex lg:hidden items-center justify-between mt-4'>
       <Link to="/profile" className="text-lime-50 font-semibold w-full  text-center hover:bg-pink-900 rounded transition-all duration-600">
              Favorites
              </Link>
      
              <Link 
              to="/profile/orderHistory" className="text-lime-50 font-semibold w-full text-center hover:bg-pink-900 rounded transition-all duration-600">
                  Order History
              </Link>

           <Link 
      to="/profile/custom-requests" className="text-lime-50 font-semibold w-full text-center hover:bg-pink-900 rounded transition-all duration-600">
      Custom Requests
    </Link>


          <Link to="/profile/settings" className="text-lime-50 font-semibold w-full  text-center hover:bg-pink-900 rounded transition-all duration-600">
          Settings
          </Link>
    </div>
    )}
     {role === "admin" && (
      <div className='w-full flex lg:hidden items-center justify-between mt-4'>
       <Link to="/profile" className="text-lime-50 font-semibold w-full  text-center hover:bg-pink-900 rounded transition-all duration-600">
              All orders
              </Link>
      
<Link to="/profile/custom-requests" className="text-lime-50 font-semibold w-full text-center hover:bg-pink-900 rounded transition-all duration-600">
  Custom Requests
</Link>


              <Link 
              to="/profile/add-art" className="text-lime-50 font-semibold w-full text-center hover:bg-pink-900 rounded transition-all duration-600">
                 Add new collection
              </Link>
         
    </div>
    )}
    </>
  );
};

export default MobileNav
