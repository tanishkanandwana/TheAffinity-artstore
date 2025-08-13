import React, { useEffect, useState } from 'react';
import axios from "axios";
import Loader from '../loader/Loader';
import Swal from 'sweetalert2';
import {Link, useNavigate, useParams } from 'react-router-dom'
import { GoNote } from "react-icons/go";
import { FaHeart } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { useSelector } from 'react-redux';
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill, RiTextSpacing } from "react-icons/ri";
import { FaStar } from "react-icons/fa";


const ViewArtDetails = () => {



// testing brooooo
const [reviews, setReviews] = useState([]);
const [userRating, setUserRating] = useState(0);
const [comment, setComment] = useState("");
const [reviewSubmitted, setReviewSubmitted] = useState(false);
 const [Data, setData] = useState();

const backendBaseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:1000";
const fixedImageUrl =
  Data && Data.url
    ? Data.url.startsWith("http")
      ? Data.url.replace("http://localhost:1000", backendBaseURL)
      : `${backendBaseURL}/images/${Data.url}`
    : "/placeholder.jpg"; // Or keep it as ""




 const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
 const role = useSelector((state) => state.auth.role);

useEffect(() => {
  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${backendBaseURL}/api/v1/arts/${id}/reviews`);
      setReviews(res.data);
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    }
  };
  if (Data) fetchReviews();
}, [Data]);

// Submit review handler
const handleReviewSubmit = async () => {
  try {
    await axios.post(
      `${backendBaseURL}/api/v1/arts/${id}/review`,
      { rating: userRating, comment },
      {
        headers: {
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    Swal.fire("Success", "Review submitted!", "success");
    setReviewSubmitted(true);
  } catch (err) {
    console.error(err);
    Swal.fire("Error", err?.response?.data?.message || "Failed to submit review", "error");
  }
};



  const { id } = useParams();
  const navigate = useNavigate();

  // const [Data, setData] = useState();

  // Place at the top inside the component

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`https://theaffinity-artstore.onrender.com/api/v1/arts/get-art-by-id/${id}`);
        setData(response.data.data);
      } catch (err) {
        console.error("Error fetching art by ID", err);
      }
    };
    fetch();
  }, [id]);

  if (!Data) {
    return (
      <div className="flex items-center justify-center h-screen bg-pink-900">
        <Loader />
      </div>
    );
  }
  const headers ={
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    artid: id,
  };
  const handleFav = async()=>{
    const response = await axios.put("https://theaffinity-artstore.onrender.com/api/v1/favourites/add-art-to-favourite",{},{headers})
    // alert(response.data.message);
      Swal.fire({
      icon: 'success',
      title: 'Added to favorites!',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
    });
    
  }

  const handleCart = async()=>{
    const response = await axios.put("https://theaffinity-artstore.onrender.com/api/v1/cart/add-to-cart",{},{headers})
    // alert(response.data.message);
      Swal.fire({
      icon: 'success',
      title: 'Added to cart',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
    });
    
    
  };

  const deleteArt = async () => {
   const response = await axios.delete("https://theaffinity-artstore.onrender.com/api/v1/arts/delete-art", {headers});
  //  alert(response.data.message);
    Swal.fire({
    icon: 'success',
    title: 'deleted',
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
  });
  
   navigate("/all-arts");
  };

  return (
   <>
   {Data &&  <div className="px-4 md:px-12 py-8 bg-gradient-to-b from-[#FFF5F9] via-[#e7c3b1] to-[#f5e6da] flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-3/6">
       <div className=' flex flex-col lg:flex-row justify-around  px-12 py-14 rounded'> 
        {/* <img src={Data.url} alt={Data.type || "Art"} className="h-[40vh] md:h-[70vh] lg:h-[70vh] rounded" /> */}
     <img
  src={fixedImageUrl}
  alt={Data.type || "Art"}
className="h-[40vh] md:h-[70vh] lg:h-[70vh] rounded-lg border border-zinc-400 shadow-md"

/>
{/* text-[#e1786d]  */}


       {isLoggedIn === true && role === "user" &&  (<div className='flex flex-row lg:flex-col mt-4 items-center justify-between lg:justify-start mt-4 lg:mt-1 px-3'>
          <button className='bg-white rounded-full lg:rounded-full text-s p-3 -ml-3 lg:ml-1  lg:mr-1 text-[#e1786d] flex items-center justify-center' onClick={handleFav}><FaHeart /><span className='ms-0  block lg:hidden'></span></button>
          <button className='text-[#d9a441]  bg-white rounded-full lg:rounded-full text-s p-3 mt-0 -mr-3 lg:ml-1 lg:mr-1 lg:mt-4 text-lime-600 flex items-center justify-center' onClick={handleCart}><MdShoppingCart /><span className='ms-0 block lg:hidden'></span></button>
          </div>)}

          {isLoggedIn === true && role === "admin" &&  (<div className='flex flex-row lg:flex-col mt-4 items-center justify-between lg:justify-start mt-4 lg:mt-1 px-3'>
          <Link to={`/updateArt/${id}`}  className='bg-white text-lime-500 rounded lg:rounded-full text-l p-3 -ml-3 lg:ml-1  lg:mr-1 text-red-600 flex items-center justify-center'>
            <MdEdit />
          <span className='ms-0  block lg:hidden'>
            Edit
            </span>
            </Link>
          <button className='text-red-500 bg-white rounded lg:rounded-full text-l p-3 mt-0 -mr-3 lg:ml-1 lg:mr-1 lg:mt-4 text-lime-600 flex items-center justify-center' 
          onClick={deleteArt}>
            <RiDeleteBin6Fill />
          <span className='ms-0 block lg:hidden'>
            Delete Product
            </span>
            </button>
          </div>)}

       </div>
      </div>
      <div className="p-6 w-full lg:w-3/6">
        <h2 className="text-[#4B001F] text-center shadow text-4xl font-bold"  style={{ fontFamily: "'Marcellus', serif" }}>{Data.type}</h2>
        <p className="text-zinc-400 text-lg text-center mt-1"  style={{ fontFamily: "'Marcellus', serif" }}>{Data.form}</p>
         <p className="text-[#473027ff] mt-10 text-xl font-seibold"  style={{ fontFamily: "'Marcellus', serif" }}>{Data.desc}</p>
            {/* <p className="text-lime-100 mt-1 text-lg">{Data.maker}</p> */}
        <p className="mt-4 text-lime-700 text-2xl  font-semibold"  style={{ fontFamily: "'Marcellus', serif" }}>₹ {Data.price}</p>


                {/* testing just testing */}

{/* RATING DISPLAY SECTION */}
<div className="mt-8">
  <h3 className="text-[#4B001F] text-2xl font-semibold mb-1"  style={{ fontFamily: "'Marcellus', serif" }}>Our Customer Reviews</h3>
  
  {reviews.length === 0 && <p className="text-zinc-400 italic"  style={{ fontFamily: "'Marcellus', serif" }}>No reviews yet.</p>}
  
  {reviews.map((rev, index) => (
    <div key={index} className="mb-4 bg-pink-800 p-3 rounded shadow text-white">
      <div className="flex items-center mb-1">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} color={i < rev.rating ? "#ffc107" : "#ccc"} />
        ))}
        <span className="ml-2 text-sm text-lime-200">{rev.name}</span>
      </div>
      <p className="text-sm">{rev.comment}</p>
    </div>
  ))}
</div>

{/* SUBMIT REVIEW SECTION - Only for user and not submitted yet */}
{isLoggedIn && role === "user" && !reviewSubmitted && (
  <div className="mt-8">
    <h4 className="text-white text-lg font-semibold mb-2">Leave a Review</h4>
    <div className="flex space-x-1 mb-2">
      {[1, 2, 3, 4, 5].map((val) => (
        <FaStar
          key={val}
          className="cursor-pointer"
          color={val <= userRating ? "#ffc107" : "#ccc"}
          onClick={() => setUserRating(val)}
        />
      ))}
    </div>
    <textarea
      className="w-full p-2 rounded bg-pink-100 text-black mb-2"
      rows="3"
      placeholder="Your comment..."
      value={comment}
      onChange={(e) => setComment(e.target.value)}
    ></textarea>
    <button
      onClick={handleReviewSubmit}
      className="bg-[#facbc6] text-[#4B001F] border border-white hover:bg-[#f0d6c9ff] px-4 py-2 rounded font-semibold"
    >
      Submit Review
    </button>
  </div>
)}


{/* done  */}


























      </div>
    </div>}
    {!Data && <div className="h-screen bg-pink-700 flex items-center justify-center"><Loader />{" "}</div>}
   </>
  );
};

export default ViewArtDetails; 

// const ViewArtDetails = () => {
//         const { id } = useParams();
      
//          const [Data, setData] = useState();
//     useEffect(() => {
//         const fetch = async()=>{
//           const response = await axios.get(`http://localhost:1000/api/v1/get-art-by-id/${id}`

//           );
//         //   console.log(response);
//           setData(response.data.data);
//         };
//         fetch();
//     }, []);
//   return (
//     <div className="px-12 py-8 bg-pink-900 flex gap-8">
//         <div className="bg-pink-700 rounded p-4 h-screen w-3/6 flex items-center justify-center"><img src= {Data.url} alt="/" className="h-[70vh]"/></div>
//         <div className="p-4 w-3/6"></div>
      
//     </div>
//   )
// }

// export default ViewArtDetails
