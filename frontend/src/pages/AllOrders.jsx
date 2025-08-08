

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/loader/Loader';
import { FaUserLarge } from 'react-icons/fa6';
import { FaCheck } from 'react-icons/fa';
import { IoOpenOutline } from 'react-icons/io5';
import SeeUserData from './SeeUserData';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AllOrders = () => {
  const [AllOrders, setAllOrders] = useState([]);
  const [Options, setOptions] = useState(-1);
  const [Values, setValues] = useState({ status: '' });
  const [userDiv, setuserDiv] = useState('hidden');
  const [userDivData, setuserDivData] = useState(null);

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // const response = await axios.get('http://localhost:1000/api/v1/get-all-orders', { headers });
        const response = await axios.get('https://theaffinity-artstore.onrender.com/api/v1/orders/get-all-orders', { headers });

        const data = response.data.data;
        
console.log("Fetched Orders (admin):", data); // Add this

        // Remove last item if needed
        if (Array.isArray(data) && data.length > 0) data.splice(data.length - 1, 1);
        setAllOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };
    fetchOrders();
  }, []); 

  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const submitChanges = async (i) => {
    const id = AllOrders[i]._id;
    try {
      const response = await axios.put(
        `https://theaffinity-artstore.onrender.com/api/v1/update-status/${id}`,
        Values,
        { headers }
      );
      // alert(response.data.message);
       Swal.fire({
            icon: 'success',
            title: 'status updated successfully!',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
          });
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  return (
    <>
      {!AllOrders ? (
        <div className='h-[100%] flex items-center justify-center'>
          <Loader />
        </div>
      ) : AllOrders.length > 0 ? (
        <div className='h-[100%] p-0 md:p-4 text-[#4B001F]'>
          <h1 className='text-3xl md:text-5xl font-semibold text-pink-800 mb-8'>
            All Orders
          </h1>

          {/* Header Row */}
          <div className='mt-4 bg-gradient-to-b from-[#FFF5F9] via-[#e7c3b1] to-[#f5e6da]  w-full rounded py-2 px-4 flex gap-2'>
            <div className='w-[3%] text-center'>Sr.</div>
            <div className='w-[22%]'>Arts</div>
            <div className='w-[45%]'>Description</div>
            <div className='w-[9%]'>Price</div>
            <div className='w-[16%]'>Status</div>
            <div className='w-[10%] md:w-[5%]'>
              <FaUserLarge />
            </div>
          </div>

          
   {AllOrders.map((items, i) => {
    console.log('Order item:', items);
  if (!items.art) {
    return (
      <div key={items._id || i} className='bg-[#FDF8F6] w-full rounded py-2 px-4 flex gap-2 text-red-500'>
        <div className='w-[40%] md:w-[22%]'>Art Not Found</div>
      </div>
    );
  }
  return (
    <div
      key={items._id || i}
      className='bg-[#FDF8F6] w-full rounded py-2 px-4 flex gap-2 hover:bg-[#F5E6DA] cursor-pointer transition-all duration-400'
    >
      <div className='w-[3%] text-center'>{i + 1}</div>
      <div className='w-[40%] md:w-[22%]'>
        <Link to={`/view-art-details/${items.art._id}`} className='hover:text-blue-400'>
          {items.art.type}
        </Link>
      </div>
      <div className='w-0 md:w-[45%] hidden md:block'>
        <h1>{items.art.desc.slice(0, 50)}...</h1>
      </div>
      <div className='w-[17%] md:w-[9%]'>₹{items.art.price}</div>
      <div className='w-[30%] md:w-[16%]'>
        <button onClick={() => setOptions(i)} className='hover:scale-105 transition-all'>
          {items.status === 'Order placed' ? (
            <span className='text-yellow-500'>{items.status}</span>
          ) : items.status === 'Canceled' ? (
            <span className='text-red-500'>{items.status}</span>
          ) : (
            <span className='text-green-500'>{items.status}</span>
          )}
        </button>

        <div className={`${Options === i ? 'block' : 'hidden'} flex mt-4`}>
          <select
            className='bg-gray-800'
            onChange={change}
            value={Values.status}
          >
            {['Order placed', 'Out for delivery', 'Delivered', 'Canceled'].map((status, idx) => (
              <option key={idx} value={status}>
                {status}
              </option>
            ))}
          </select>
          <button
            className='text-green-500 hover:text-pink-600 mx-2'
            onClick={() => {
              setOptions(-1);
              submitChanges(i);
            }}
          >
            <FaCheck />
          </button>
        </div>
      </div>

      <div className='w-[10%] md:w-[5%]'>
        <button
          className='text-xl hover:text-orange-500'
          onClick={() => {
            setuserDiv('fixed');
            setuserDivData(items.user);
          }}
        >
          <IoOpenOutline />
        </button>
      </div>
    </div>
  );
})}

        </div>
      ) : (
        <div className='text-center text-pink-700 text-xl mt-10'>No Orders Found</div>
      )}

      {userDivData && (
        <SeeUserData
          userDivData={userDivData}
          userDiv={userDiv}
          setuserDiv={setuserDiv}
        />
      )}
    </>
  );
};

export default AllOrders;


// import React, { useEffect, useState} from 'react'
// import axios from 'axios';
// import Loader from '../components/loader/Loader';
// import { FaUserLarge } from "react-icons/fa6";
// import { FaCheck } from "react-icons/fa";
// import { IoOpenOutline } from "react-icons/io5";
// import SeeUserData from './SeeUserData';


// const AllOrders = () => {
//   const [AllOrders, setAllOrders] = useState()
//   const [Options, setOptions] = useState(-1);
//   const [Values, setValues] = useState({ status: ""})
//   const [userDiv, setuserDiv] = useState("hidden");
//   const [userDivData, setuserDivData] = useState();
//     const headers ={
//     id: localStorage.getItem("id"),
//     authorization: `Bearer ${localStorage.getItem("token")}`,
//   };
//   useEffect(() => {
//     const fetch = async () => {
//       const response = await axios.get("http://localhost:1000/api/v1/get-all-orders",
//         {headers}
//       );
//        setAllOrders(response.data.data);
//     };
//    fetch();
//   }, [AllOrders]);

//   const change = (e) => {
//     const { value } = e.target;
//     setValues({ status:value});
//   };

//   const submitChanges = async (i) => {
//     const id = OrderHistory[i]._id;
//     const response = await axios.put(
//       `http://localhost:1000/api/v1/update-status/${id}`,
//       Values,
//       {headers}
//     );
//     alert(response.data.message);
//   };
  
//   AllOrders && AllOrders.splice(AllOrders.length - 1, 1);
//   return 
//   <>
//   {!AllOrders && (
//     <div className='h-[100%] flex items-center justify-center'>
//       <Loader />
//       </div>
//   )}

//   {AllOrders && AllOrders.length > 0 && (
//      <div className='h-[100%] p-0 md:p-4 text-lime-100'>
//       <h1 className='text-3xl md:text-5xl mb-8 font-semibold text-pink-800 mb-8'>All Orders</h1>
//       <div className='mt-4 bg-pink-600 w-full rounded py-2 px-4 flex gap-2'>
//         <div className='w-[3%]'>
//           <h1 className='text-center'>Sr.</h1>
//         </div>
//         <div className='w-[22%]'>
//           <h1 className=''>Arts</h1>
//         </div>
//         <div className='w-[45%]'>
//           <h1 className=''>Description</h1>
//         </div>
//         <div className='w-[9%]'>
//           <h1 className=''>Price</h1>
//         </div>
//         <div className='w-[16%]'>
//           <h1 className=''>Status</h1>
//         </div>
//         <div className='w-[10%] md:w-[5%]'>
//           <h1 className=''>
//             <FaUserLarge />
//           </h1>
//         </div>
//       </div>

//       {AllOrders && AllOrders.map((items,i)=> (
//         <div className='bg-pink-700 w-full rounded py-2  px-4 flex gap-2 hover:bg-pink-800 hover:cursor-pointer transition-all duration-400'>
//           <div className='w-[3%]'>
//             <h1 className='text-center'>{i+1}</h1>
//           </div>
//           <div className='w-[40%] md:w-[22%]'>
//             <Link to={`/view-art-details/${items.art._id}`} 
//             className="hover-text-blue-400">
//                 {items.art.type}
//             </Link>
//           </div>
//           <div className='w-0 md:w-[45%] hidden md:block'>
//             <h1 className='' >{items.art.desc.slice(0,50)}...</h1>
//           </div>
//           <div className='w-[17%] md:w-[9%]'>
//             <h1 className=''> ₹{items.art.price}</h1>
//           </div>
//           <div className='w-[30%] md:w-[16%]'>
//             <h1 className='fonr-semibold'>
//               <button className='hover:scale-105 transition-all duration-400' onClick={()=> setOptions(i)}>
//                 {items.status === "Order placed" ? (
//                   <div className='text-yellow-500'>{items.status}</div>
//                 ) : items.status === "Canceled" ? (
//                   <div className='text-red-500'>{items.status}</div>
//                 ) : ( <div className='text-green-500'>{items.status}</div>

//                 )}
//               </button>
//               <div className= {`${Options === i ? "block" : "hidden"} 
//               flex mt-4`}>
//                 <select name ="status" id="" className='bg-gray-800'
//                 onChange={change} 
//                 value={Values.status}>
//                   {[
//                     "Order placed",
//                     "Out for delivery",
//                     "Delivered",
//                     "Canceled",
//                   ].map((items,i) => (
//                     <option value={items} key={i}>
//                       {items}
//                     </option>
//                   ))
//                   }
//                 </select>
//                 <button className='text-green-500 hover:text-pink-600 mx-2'
//                 onClick={() => {
//                   setOptions(-1);
//                   submitChanges(i);
//                 }}
//                 >
//                   <FaCheck /></button>
//               </div>
//             </h1>
//           </div>
//           <div className='w-[10%] md:w-[5%]'>
//             <button className='text-xl hover:text-orange-500'
//             onClick={() => {
//               setuserDiv("fixed");
//               setuserDivData(items.user);
//             }}>
//               <IoOpenOutline />

//             </button>
//           </div>
//         </div>
//       ))}
//       </div>
//   )}

// {userDivData && (
//   <SeeUserData
//   userDivData={userDivData}
//   userDiv={userDiv}
//   setuserDiv={setuserDiv}
//   />
// )}
//   </>;
  
// };

// export default AllOrders

//  {AllOrders.map((items, i) => (
//             <div
//               key={i}
//               className='bg-pink-700 w-full rounded py-2 px-4 flex gap-2 hover:bg-pink-800 cursor-pointer transition-all duration-400'
//             >
//               <div className='w-[3%] text-center'>{i + 1}</div>
//               <div className='w-[40%] md:w-[22%]'>
//                 <Link to={`/view-art-details/${items.art._id}`} className='hover:text-blue-400'>
//                   {items.art.type}
//                 </Link>
//               </div>
//               <div className='w-0 md:w-[45%] hidden md:block'>
//                 <h1>{items.art.desc.slice(0, 50)}...</h1>
//               </div>
//               <div className='w-[17%] md:w-[9%]'>₹{items.art.price}</div>
//               <div className='w-[30%] md:w-[16%]'>
//                 <button onClick={() => setOptions(i)} className='hover:scale-105 transition-all'>
//                   {items.status === 'Order placed' ? (
//                     <span className='text-yellow-500'>{items.status}</span>
//                   ) : items.status === 'Canceled' ? (
//                     <span className='text-red-500'>{items.status}</span>
//                   ) : (
//                     <span className='text-green-500'>{items.status}</span>
//                   )}
//                 </button>

//                 <div className={`${Options === i ? 'block' : 'hidden'} flex mt-4`}>
//                   <select
//                     className='bg-gray-800'
//                     onChange={change}
//                     value={Values.status}
//                   >
//                     {['Order placed', 'Out for delivery', 'Delivered', 'Canceled'].map((status, idx) => (
//                       <option key={idx} value={status}>
//                         {status}
//                       </option>
//                     ))}
//                   </select>
//                   <button
//                     className='text-green-500 hover:text-pink-600 mx-2'
//                     onClick={() => {
//                       setOptions(-1);
//                       submitChanges(i);
//                     }}
//                   >
//                     <FaCheck />
//                   </button>
//                 </div>
//               </div>
//               <div className='w-[10%] md:w-[5%]'>
//                 <button
//                   className='text-xl hover:text-orange-500'
//                   onClick={() => {
//                     setuserDiv('fixed');
//                     setuserDivData(items.user);
//                   }}
//                 >
//                   <IoOpenOutline />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className='text-center text-pink-700 text-xl mt-10'>No Orders Found</div>
//       )}

//       {userDivData && (
//         <SeeUserData
//           userDivData={userDivData}
//           userDiv={userDiv}
//           setuserDiv={setuserDiv}
//         />
//       )}
//     </>
//   );
// };

// export default AllOrders;
