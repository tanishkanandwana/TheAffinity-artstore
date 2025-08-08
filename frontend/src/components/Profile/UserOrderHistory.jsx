import React, {useEffect, useState} from 'react';
import axios from "axios";
import Loader from "../loader/Loader";
import dataimage from './data.png';
import { Link } from 'react-router-dom';
import ViewArtDetails from '../ViewArtDetails/ViewArtDetails';


const UserOrderHistory = () => {
  const [OrderHistory, setOrderHistory] = useState();
  const headers ={
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
  const fetch = async () => {
    try {
      const response = await axios.get("https://theaffinity-artstore.onrender.com/api/v1/orders/get-order-history", { headers });
      console.log("Fetched Orders:", response.data.data);
      console.log("Sample Order:", response.data.data[0]);
      // console.log(" Order history response:", response.data); 
      setOrderHistory(response.data.data);
    } catch (error) {
      console.error(" Error loading order history:", error);
      setOrderHistory([]);
    }
  };
  fetch();
  
}, []);

  return (
  <>
   {!OrderHistory && (<div className=' flex items-center justify-center h-[100%]'><Loader /></div>)}
   {OrderHistory && OrderHistory.length ===0 && (
    <div className='h-[80vh] p-4 text-lime-100'>
      <div className='h-[100%] flex flex-col items-center justify-center'>
        <h1 className='text-5xl font-semibold text-pink-800 mb-8'>No Order History</h1>
        <img src={dataimage} alt="" className='h-[20vh] mb-8' />

      </div>

    </div>
   )}

   {OrderHistory && OrderHistory.length >0 && (
    <div className='h-[100%] p-0 md:p-4 text-pink-700'>
      <h1 className='text-3xl md:text-5xl mb-8 font-semibold text-pink-800'>Your Order History</h1>
      <div className='mt-4 bg-pink-600 w-full rounded py-2 px-4 flex gap-2'>
        <div className='w-[3%]'>
          <h1 className='text-center'>Sr.</h1>
        </div>
        <div className='w-[22%]'>
          <h1 className=''>Arts</h1>
        </div>
        <div className='w-[45%]'>
          <h1 className=''>Description</h1>
        </div>
        <div className='w-[9%]'>
          <h1 className=''>Price</h1>
        </div>
        <div className='w-[16%]'>
          <h1 className=''>Status</h1>
        </div>
        <div className='w-none md:w-[5%] hidden md:block'>
          <h1 className=''>Mode</h1>
        </div>
      </div>

    {OrderHistory.filter(item => item.art).map((items,i) => (        
      <div className='bg-pink-900 w-full rounded py-2 px-4 flex gap-4 hover:bg-lime-300 hover:cursor-pointer'>
        <div className='w-[3%]'>
          <h1 className='text-center'>{i+1}</h1>

        </div>
        <div className='w-[22%]'>
     {items.art ? (
  <Link to={`view-art-details/${items.art._id}`} className="hover:text-blue-300">
    {items.art.type}
  </Link>
) : (
  <span className='text-red-200'>Art Not Found</span>
)}


        </div>
        <div className='w-[45%]'>
          <h1 className=''>{items.art?.desc?.slice(0,50) ?? 'No description availaible'}...</h1>
        </div>
        <div className='w-[9%]'>
          <h1 className=''>₹{items.art?.price ?? 'N/A'}</h1>
        </div>
        <div className='w-[16%]'>
          <h1 className='font-semibold text-lime-600'>{items.status === "Order placed" ? (
            <div className='text-yellow-500'>{items.status}</div>
          ):items.status === "Canceled" ? (
            <div className='text-red-500'>{items.status}</div>
          ) :(
            items.status
          )}</h1>
        </div>
        <div className='w-none md:w-[5%] hidden md:block'>
          <h1 className='text-sm text-lime-100'>COD</h1>
        </div>
      </div>
    ))}


    
    </div>
   )}


  </>
  )
};

export default UserOrderHistory

