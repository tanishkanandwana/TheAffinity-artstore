
// import React, { useEffect, useState } from 'react';
// import Loader from "../loader/Loader";
// import axios from "axios";
// import ArtCard from '../ArtCard/ArtCard';
// import { motion } from 'framer-motion';

// const RecentlyAdded = () => {
//     const [Data, setData] = useState();
//     useEffect(() => {
//         const fetch = async()=>{
//           const response = await axios.get("https://theaffinity-artstore.onrender.com/api/v1/arts/get-recent-arts",
//                 {
//         withCredentials: true,  // 👈 Required for CORS + cookies/token handling
//       }
//           );
//           setData(response.data.data);
//         };
//         fetch();
//     }, []);
    
//   return (
//     <div className="mt-8 -px-1 md:px-8">
      

// <div className="-mt-8 px-4 md:px-8 z-30 relative">
// <motion.h4
//   className="text-4xl sm:text-4xl text-lime-50 font-semibold text-center  mt-5"
//   // style={{ fontFamily: "'Playfair Display', serif" }}
//   // style={{ fontFamily: "'Italiana', serif" }}
//   // style={{ fontFamily: "'Cardo', serif" }}
// style={{ fontFamily: "'Marcellus', serif" }}


//   //  style={{ fontFamily: "'Great Vibes', cursive" }}
//   initial={{ opacity: 0, y: 20 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.8 }}
// >
//    Trending Collections. .  </motion.h4> </div>
//     {!Data && <div className="flex items-center justify-center my-8"><Loader /> </div>}
//     <div className="my-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-4">
//       {Data && Data.map((items,i)=> <div key={i}>
//         <ArtCard data={items}/>{" "}
//       </div>)}
//     </div>
//     </div>
//   )
// }

// export default RecentlyAdded




import React, { useEffect, useState } from 'react';
import Loader from "../loader/Loader";
import axios from "axios";
import ArtCard from '../ArtCard/ArtCard';
import { motion } from 'framer-motion';

const RecentlyAdded = () => {
  const [Data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("https://theaffinity-artstore.onrender.com/api/v1/arts/get-recent-arts", {
        withCredentials: true,
      });
      setData(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className="-mt-6 px-3 sm:mt-0 sm:px-6 md:px-8 z-30 relative">
      <div className='flex justify-center'>
        <motion.h4
          className="text-3xl sm:text-4xl text-white font-semibold text-center mt-20"
          style={{ fontFamily: "'Marcellus', serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Most loved Collections...  
        </motion.h4>
      </div>

      {!Data && <div className="flex items-center justify-center my-8"><Loader /></div>}

      <div className="my-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-2 sm:px-4">
        {Data && Data.map((items, i) => (
          <div key={i}>
            <ArtCard data={items} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyAdded;