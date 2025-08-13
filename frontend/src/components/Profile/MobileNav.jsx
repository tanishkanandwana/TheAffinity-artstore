// import React from 'react'
// import { Link } from 'react-router-dom'
// import {  useSelector } from 'react-redux';

// const MobileNav = () => {
//   const role = useSelector((state) => state.auth.role);
//   return (
//     <>
//     {role === "user" && (
//       <div className='w-full  flex lg:hidden items-center justify-between mt-4'>
//        <Link to="/profile" className="text-lime-50 font-semibold w-full  text-center hover:bg-pink-900 rounded transition-all duration-600"style={{ fontFamily: "'Cinzel Decorative', cursive" }}>
//               Favorites
//               </Link>
      
//               <Link 
//               to="/profile/orderHistory" className="text-lime-50 font-semibold w-full text-center hover:bg-pink-900 rounded transition-all duration-600"style={{ fontFamily: "'Cinzel Decorative', cursive" }}>
//                   Order History
//               </Link>


//           <Link to="/profile/settings" className="text-lime-50 font-semibold w-full  text-center hover:bg-pink-900 rounded transition-all duration-600"style={{ fontFamily: "'Cinzel Decorative', cursive" }}>
//           Settings
//           </Link>
//     </div>
//     )}
//      {role === "admin" && (
//       <div className='w-full flex lg:hidden items-center justify-between mt-4'>
//        <Link to="/profile" className="text-lime-50 font-semibold w-full  text-center hover:bg-pink-900 rounded transition-all duration-600"style={{ fontFamily: "'Cinzel Decorative', cursive" }}>
//               All orders
//               </Link>
      
//               <Link 
//               to="/profile/add-art" className="text-lime-50 font-semibold w-full text-center hover:bg-pink-900 rounded transition-all duration-600"style={{ fontFamily: "'Cinzel Decorative', cursive" }}>
//                  Add new collection
//               </Link>
         
//     </div>
//     )}
//     </>
//   );
// };

// export default MobileNav

import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MobileNav = () => {
  const role = useSelector((state) => state.auth.role);

  return (
    <>
      {role === "user" && (
        <div className="w-full flex lg:hidden items-center justify-between mt-4 px-2">
          <Link
            to="/profile"
            className="text-lime-50 font-semibold flex-1 text-center py-2 hover:bg-pink-900 rounded transition-all duration-300 mx-1"
            style={{ fontFamily: "'Cinzel Decorative', cursive" }}
          >
            Favorites
          </Link>

          <Link
            to="/profile/orderHistory"
            className="text-lime-50 font-semibold flex-1 text-center py-2 hover:bg-pink-900 rounded transition-all duration-300 mx-1"
            style={{ fontFamily: "'Cinzel Decorative', cursive" }}
          >
            Order History
          </Link>

          <Link
            to="/profile/settings"
            className="text-lime-50 font-semibold flex-1 text-center py-2 hover:bg-pink-900 rounded transition-all duration-300 mx-1"
            style={{ fontFamily: "'Cinzel Decorative', cursive" }}
          >
            Settings
          </Link>
        </div>
      )}

      {role === "admin" && (
        <div className="w-full flex lg:hidden items-center justify-between mt-4 px-2">
          <Link
            to="/profile"
            className="text-lime-50 font-semibold flex-1 text-center py-2 hover:bg-pink-900 rounded transition-all duration-300 mx-1"
            style={{ fontFamily: "'Cinzel Decorative', cursive" }}
          >
            All Orders
          </Link>

          <Link
            to="/profile/add-art"
            className="text-lime-50 font-semibold flex-1 text-center py-2 hover:bg-pink-900 rounded transition-all duration-300 mx-1"
            style={{ fontFamily: "'Cinzel Decorative', cursive" }}
          >
            Add New Collection
          </Link>
        </div>
      )}
    </>
  );
};

export default MobileNav;