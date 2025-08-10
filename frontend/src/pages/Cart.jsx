import React, {useState, useEffect} from 'react';
import Loader from '../components/loader/Loader';
import { AiFillDelete } from "react-icons/ai";
import{useNavigate} from "react-router-dom";
import axios from "axios";
import { CiShoppingCart } from "react-icons/ci";
import emptyCartImage from './emptycart.png';
import { toast } from 'react-hot-toast';
import Lottie from "lottie-react";
import emptyCartAnimation from "../assets/lottie/empty.json"
import { motion } from 'framer-motion';


const Cart = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState();
  const [Total, setTotal] = useState(0);
  const headers  ={
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
  const fetch = async()=>{
    const res = await axios.get("https://theaffinity-artstore.onrender.com/api/v1/cart/get-user-cart", {headers});
    setCart(res.data.data);
  };
  fetch();
  }, [Cart]);
  

  const deleteItem = async(artid)=>{
    const response = await axios.put(`https://theaffinity-artstore.onrender.com/api/v1/cart/remove-from-cart/${artid}`,{},{headers});
    // alert(response.data.message);
    toast.success(response.data.message);

  };

  useEffect(() => {
   if(Cart && Cart.length > 0) {
    let total = 0;
    Cart.map((items)=>{
    total += items.price;      
    });
    setTotal(total);
    total = 0;
   }
  }, [Cart]);
  
  const placeOrder = async()=>{
    try {
      const response = await axios.post(`https://theaffinity-artstore.onrender.com/api/v1/orders/place-order`,{order: Cart.map(item => item._id)},{headers});
      // alert(response.data.message);
      toast.success(response.data.message);
      navigate("/profile/orderHistory");
    } catch (error) {
     console.log(error); 
    }
  }
  return (
    <div className='bg-gradient-to-b from-[#FFF5F9] via-[#e7c3b1] to-[#f5e6da]  px-12 py-8  min-h-screen' style={{ fontFamily: "'Cinzel Decorative', cursive" }}>
    {!Cart && <div className='w-full h-screen flex items-center justify-center' style={{ fontFamily: "'Cinzel Decorative', cursive" }}><Loader /></div>}
    {Cart && Cart.length === 0 && (
      <div className='h-screen'>
        <div className='h-[100%] flex items-center justify-center flex-col'style={{ fontFamily: "'Cinzel Decorative', cursive" }}>
          <h1 className='text-3xl lg:text-4xl font-semibold text-white' style={{ fontFamily: "'Cinzel Decorative', cursive" }}>Empty Cart</h1>
          {/* <img 
          src={emptyCartImage }
           alt="empty cart"
           className='lg:h-[20vh] rounded-full' /> */}
           <Lottie
  animationData={emptyCartAnimation}
  loop={true}
  className='h-[20vh] lg:h-[30vh]'
/>


        </div>

      </div>

    )}
    {Cart && Cart.length > 0 && (
    <>
    <h1 className='text-4xl flex items-center justify-center font-semibold text-[#4B001F] mb-8'style={{ fontFamily: "'Cinzel Decorative', cursive" }}>My Cart<span className='ms-2 mt-1'><CiShoppingCart /></span></h1>
   {Cart.map((items, i) => (
  <div
    key={i}
    className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-[#FFF5F9] items-start gap-4"style={{ fontFamily: "'Cinzel Decorative', cursive" }}
  >
    {/* Image on Left */}
    <img
      src={items.url}
      alt="/"
      className="h-[20vh] w-[20vh] object-cover rounded"
    />

    {/* Right Side Content */}
    <div className="flex flex-col justify-between w-full">
      {/* Title + Description */}
      <div className="mb-4">
        <h1 className="text-2xl text-pink-500 font-semibold">{items.title}</h1>
        <p className="text-xl text-zinc-400 mt-2">
          {items.desc.slice(0, 100)}...
        </p>
      </div>

      {/* Price + Delete Button */}
      <div className="flex items-center justify-between">
        <h2 className="text-lime-600 text-2xl font-semibold">₹ {items.price}</h2>
        <button
          className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-4"
          onClick={() => deleteItem(items._id)}
        >
          <AiFillDelete />
        </button>
      </div>
    </div>
  </div>
))}
    
    </>

    )}
    {Cart && Cart.length > 0 && (
      <div className='mt-4 w-full flex ites-center justify-end'>
        <div className='p-4  rounded'style={{ fontFamily: "'Cinzel Decorative', cursive" }}>
          <h1 className='text-3xl text-[#473027ff] font-semibold'>Total amount</h1>
          <div className='mt-3 flex items-center justify-between text-xl text-white'>
            <h2>Quantity: {Cart.length} </h2> <h2 className='text-lime-600 text-xl font-semibold'> ₹{Total}</h2>
          </div>
          <div className='w-[100%] mt-3'>
            <button className='bg-lime-500 text-white rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-lime-600 text-white' onClick={placeOrder}>Place order</button>
          </div>

        </div>

      </div>
    )}
    </div>
  )
}

export default Cart
