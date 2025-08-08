import React from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';



const ArtCard = ({data, favourite}) => {
  
 console.log("data.url =", data.url);

  const backendBaseURL = "https://theaffinity-artstore.onrender.com";

  // const fixedImageUrl = data.url.startsWith("http")
  //   ? data.url.replace("http://localhost:1000", backendBaseURL)
  //   : `${backendBaseURL}/images/${data.url}`;




    const fixedImageUrl =
  data.url?.startsWith("http://localhost:1000") || data.url?.startsWith("https://localhost:1000")
    ? data.url.replace("http://localhost:1000", backendBaseURL).replace("https://localhost:1000", backendBaseURL)
    : data.url?.startsWith("http") 
      ? data.url 
      : `${backendBaseURL}/images/${data.url}`;

  const headers ={
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    artid: data._id,
  };
  const handleRemoveArt = async() => {
    const response = await axios.put("https://theaffinity-artstore.onrender.com/api/v1/favourites/remove-art-from-favourite",{},{headers});
    // alert(response.data.message);
    Swal.fire({
  icon: 'success',
  title: 'Item removed from favorites!',
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
});

  };
 
  return (
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
  whileHover={{
    scale: 1.08,
    transition: { duration: 0.4, ease: "easeInOut" }
  }}
  className="rounded-lg shadow-md"
>
    <div className='bg-[#661638] rounded p-2 flex flex-col' style={{ fontFamily: "'Marcellus', serif" }}>
      <Link to={`/view-art-details/${data._id}`}>
    
    
   
      <div className="bg-[#f5e6da] rounded-2xl shadow-md overflow-hidden">
    
      <div className="aspect-[3/4]" >
         <img 
  src={fixedImageUrl} 
  alt={data.type || "art image"} 
  className="w-full h-full object-cover"
/>

        </div>
        <div className='p-2'>
      <h2 className="mt-4 text-xl font-semibold text-center text-[#382b24ff]">{data.type}</h2>
      <p className="mt-2 text-pink-700 font-semibold"> {data.form}</p>
      <p className="-mt-1 text-lime-500 font-semibold ">₹ {data.price}</p>
      </div> 

    
      </div> 
      </Link>
  {favourite && (<button className='bg-[#f5e6da] px-4 py-2 rounded-lg border border-pink-900 text-pink-600 hover:bg-[#e7c3b1] hover:text-white mt-4' onClick={handleRemoveArt}>Remove from favourites

  </button>)}

    </div>
    </motion.div>
  );
};

export default ArtCard;


