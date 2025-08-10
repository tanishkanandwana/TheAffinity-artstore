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
  const [Options, setOptions] = useState(-1); // index of order with open dropdown
  const [orderStatusUpdates, setOrderStatusUpdates] = useState({}); // status per order ID
  const [userDiv, setUserDiv] = useState('hidden');
  const [userDivData, setUserDivData] = useState(null);

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          'https://theaffinity-artstore.onrender.com/api/v1/orders/get-all-orders',
          { headers }
        );
        const data = response.data.data;

        if (Array.isArray(data) && data.length > 0) data.splice(data.length - 1, 1);
        setAllOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };
    fetchOrders();
  }, []);

  // Called when dropdown opens for a specific order index
  const openOptions = (i) => {
    const order = AllOrders[i];
    setOptions(i);
    // Initialize the selected status for this order
    setOrderStatusUpdates((prev) => ({
      ...prev,
      [order._id]: order.status,
    }));
  };

  // Called when status dropdown changes
  const change = (orderId, newStatus) => {
    setOrderStatusUpdates((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));
  };

  // Called on clicking the submit button to update status
  // const submitChanges = async (i) => {
  //   const order = AllOrders[i];
  //   const updatedStatus = orderStatusUpdates[order._id];

  //   if (!updatedStatus || updatedStatus === order.status) {
  //     // No change - do nothing or maybe close dropdown
  //     setOptions(-1);
  //     return;
  //   }

  //   try {
  //     await axios.put(
  //       `https://theaffinity-artstore.onrender.com/api/v1/update-status/${order._id}`,
  //       { status: updatedStatus },
  //       { headers }
  //     );

  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Status updated successfully!',
  //       toast: true,
  //       position: 'top-end',
  //       showConfirmButton: false,
  //       timer: 2000,
  //     });

  //     // Update local order status immediately
  //     const updatedOrders = [...AllOrders];
  //     updatedOrders[i].status = updatedStatus;
  //     setAllOrders(updatedOrders);
  //     setOptions(-1);
  //   } catch (err) {
  //     console.error('Failed to update status:', err);
  //   }
  // };
const submitChanges = async (i) => {
  const id = AllOrders[i]._id;
  const updatedStatus = orderStatusUpdates[id]; // get updated status from state

  try {
    const response = await axios.put(
      `https://theaffinity-artstore.onrender.com/api/v1/orders/update-status/${id}`,
      { status: updatedStatus },  // send status properly in body
      { headers }
    );

    Swal.fire({
      icon: 'success',
      title: 'Status updated successfully!',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
    });

    // Update local state to trigger UI refresh
    const updatedOrders = [...AllOrders];
    updatedOrders[i].status = updatedStatus;
    setAllOrders(updatedOrders);

    setOptions(-1); // close dropdown
  } catch (err) {
    console.error('Failed to update status:', err);
  }
};


  return (
    <>
      {!AllOrders ? (
        <div className="h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      ) : AllOrders.length > 0 ? (
        <div className="h-[100%] p-0 md:p-4 text-[#4B001F]">
          <h1 className="text-3xl md:text-5xl font-semibold text-[#4B001F] mb-8">
            All Orders
          </h1>

          {/* Header Row */}
          <div
            className="mt-4 bg-gradient-to-b from-[#FFF5F9] via-[#e7c3b1] to-[#f5e6da] w-full rounded py-2 px-4 flex gap-2"
            style={{ fontFamily: "'Cinzel Decorative', cursive" }}
          >
            <div className="w-[3%] text-center">Sr.</div>
            <div className="w-[22%]">Arts</div>
            <div className="w-[45%]">Description</div>
            <div className="w-[9%]">Price</div>
            <div className="w-[16%]">Status</div>
            <div className="w-[10%] md:w-[5%]">
              <FaUserLarge />
            </div>
          </div>

          {/* Orders List */}
          {AllOrders.map((items, i) => {
            if (!items.art) {
              return (
                <div
                  key={items._id || i}
                  className="bg-[#FDF8F6] w-full rounded py-2 px-4 flex gap-2 text-red-500"
                >
                  <div
                    className="w-[40%] md:w-[22%]"
                    style={{ fontFamily: "'Cinzel Decorative', cursive" }}
                  >
                    Art Not Found
                  </div>
                </div>
              );
            }
            return (
              <div
                key={items._id || i}
                className="bg-[#FDF8F6] w-full rounded py-2 px-4 flex gap-2 hover:bg-[#F5E6DA] cursor-pointer transition-all duration-400"
                style={{ fontFamily: "'Cinzel Decorative', cursive" }}
              >
                <div className="w-[3%] text-center">{i + 1}</div>
                <div className="w-[40%] md:w-[22%]">
                  <Link
                    to={`/view-art-details/${items.art._id}`}
                    className="hover:text-blue-400"
                  >
                    {items.art.type}
                  </Link>
                </div>
                <div className="w-0 md:w-[45%] hidden md:block">
                  <h1>{items.art.desc.slice(0, 50)}...</h1>
                </div>
                <div className="w-[17%] md:w-[9%]">₹{items.art.price}</div>
                <div className="w-[30%] md:w-[16%]">
                  <button
                    onClick={() => openOptions(i)}
                    className="hover:scale-105 transition-all"
                  >
                    {items.status === 'Order placed' ? (
                      <span className="text-yellow-500">{items.status}</span>
                    ) : items.status === 'Canceled' ? (
                      <span className="text-red-500">{items.status}</span>
                    ) : (
                      <span className="text-green-500">{items.status}</span>
                    )}
                  </button>

                  {/* Dropdown for status update */}
                  <div className={`${Options === i ? 'block' : 'hidden'} flex mt-4`}>
                    <select
                      className="bg-white"
                      onChange={(e) => change(items._id, e.target.value)}
                      value={orderStatusUpdates[items._id] || items.status}
                    >
                      {['Order placed', 'Out for delivery', 'Delivered', 'Canceled'].map(
                        (status, idx) => (
                          <option key={idx} value={status}>
                            {status}
                          </option>
                        )
                      )}
                    </select>
                    <button
                      className="text-green-500 hover:text-pink-600 mx-2"
                      onClick={() => submitChanges(i)}
                    >
                      <FaCheck />
                    </button>
                  </div>
                </div>

                <div className="w-[10%] md:w-[5%]">
                  <button
                    className="text-xl hover:text-orange-500"
                    onClick={() => {
                      setUserDiv('fixed');
                      setUserDivData(items.user);
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
        <div className="text-center text-pink-700 text-xl mt-10">No Orders Found</div>
      )}

      {userDivData && (
        <SeeUserData
          userDivData={userDivData}
          userDiv={userDiv}
          setuserDiv={setUserDiv}
        />
      )}
    </>
  );
};

export default AllOrders;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Loader from '../components/loader/Loader';
// import { FaUserLarge } from 'react-icons/fa6';
// import { FaCheck } from 'react-icons/fa';
// import { IoOpenOutline } from 'react-icons/io5';
// import SeeUserData from './SeeUserData';
// import { Link } from 'react-router-dom';
// import Swal from 'sweetalert2';

// const AllOrders = () => {
//   const [AllOrders, setAllOrders] = useState([]);
//   const [Options, setOptions] = useState(-1);
//   const [Values, setValues] = useState({ status: '' });
//   const [orderStatusUpdates, setOrderStatusUpdates] = useState({});

//   const [userDiv, setuserDiv] = useState('hidden');
//   const [userDivData, setuserDivData] = useState(null);

//   const headers = {
//     id: localStorage.getItem('id'),
//     authorization: `Bearer ${localStorage.getItem('token')}`,
//   };

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         // const response = await axios.get('http://localhost:1000/api/v1/get-all-orders', { headers });
//         const response = await axios.get('https://theaffinity-artstore.onrender.com/api/v1/orders/get-all-orders', { headers });

//         const data = response.data.data;
        
// console.log("Fetched Orders (admin):", data); // Add this

//         // Remove last item if needed
//         if (Array.isArray(data) && data.length > 0) data.splice(data.length - 1, 1);
//         setAllOrders(data);
//       } catch (error) {
//         console.error('Failed to fetch orders:', error);
//       }
//     };
//     fetchOrders();
//   }, []); 

//   const change = (e) => {
//     const { value } = e.target;
//     setValues({ status: value });
//   };

//   const submitChanges = async (i) => {
//     const id = AllOrders[i]._id;
//     try {
//       const response = await axios.put(
//         `https://theaffinity-artstore.onrender.com/api/v1/update-status/${id}`,
//         Values,
//         { headers }
//       );
//       // alert(response.data.message);
//        Swal.fire({
//             icon: 'success',
//             title: 'status updated successfully!',
//             toast: true,
//             position: 'top-end',
//             showConfirmButton: false,
//             timer: 2000,
//           });
//     } catch (err) {
//       console.error('Failed to update status:', err);
//     }
//   };

//   return (
//     <>
//       {!AllOrders ? (
//         <div className='h-[100%] flex items-center justify-center'>
//           <Loader />
//         </div>
//       ) : AllOrders.length > 0 ? (
//         <div className='h-[100%] p-0 md:p-4 text-[#4B001F]'>
//           <h1 className='text-3xl md:text-5xl font-semibold text-pink-800 mb-8'>
//             All Orders
//           </h1>

//           {/* Header Row */}
//           <div className='mt-4 bg-gradient-to-b from-[#FFF5F9] via-[#e7c3b1] to-[#f5e6da]  w-full rounded py-2 px-4 flex gap-2'style={{ fontFamily: "'Cinzel Decorative', cursive" }}>
//             <div className='w-[3%] text-center'>Sr.</div>
//             <div className='w-[22%]'>Arts</div>
//             <div className='w-[45%]'>Description</div>
//             <div className='w-[9%]'>Price</div>
//             <div className='w-[16%]'>Status</div>
//             <div className='w-[10%] md:w-[5%]'>
//               <FaUserLarge />
//             </div>
//           </div>

          
//    {AllOrders.map((items, i) => {
//     console.log('Order item:', items);
//   if (!items.art) {
//     return (
//       <div key={items._id || i} className='bg-[#FDF8F6] w-full rounded py-2 px-4 flex gap-2 text-red-500'>
//         <div className='w-[40%] md:w-[22%]'style={{ fontFamily: "'Cinzel Decorative', cursive" }}>Art Not Found</div>
//       </div>
//     );
//   }
//   return (
//     <div
//       key={items._id || i}
//       className='bg-[#FDF8F6] w-full rounded py-2 px-4 flex gap-2 hover:bg-[#F5E6DA] cursor-pointer transition-all duration-400'style={{ fontFamily: "'Cinzel Decorative', cursive" }}
//     >
//       <div className='w-[3%] text-center'>{i + 1}</div>
//       <div className='w-[40%] md:w-[22%]'>
//         <Link to={`/view-art-details/${items.art._id}`} className='hover:text-blue-400'>
//           {items.art.type}
//         </Link>
//       </div>
//       <div className='w-0 md:w-[45%] hidden md:block'>
//         <h1>{items.art.desc.slice(0, 50)}...</h1>
//       </div>
//       <div className='w-[17%] md:w-[9%]'>₹{items.art.price}</div>
//       <div className='w-[30%] md:w-[16%]'>
//         <button onClick={() => setOptions(i)} className='hover:scale-105 transition-all'>
//           {items.status === 'Order placed' ? (
//             <span className='text-yellow-500'>{items.status}</span>
//           ) : items.status === 'Canceled' ? (
//             <span className='text-red-500'>{items.status}</span>
//           ) : (
//             <span className='text-green-500'>{items.status}</span>
//           )}
//         </button>

//         <div className={`${Options === i ? 'block' : 'hidden'} flex mt-4`}>
//           <select
//             className='bg-gray-800'
//             onChange={change}
//             value={Values.status}
//           >
//             {['Order placed', 'Out for delivery', 'Delivered', 'Canceled'].map((status, idx) => (
//               <option key={idx} value={status}>
//                 {status}
//               </option>
//             ))}
//           </select>
//           <button
//             className='text-green-500 hover:text-pink-600 mx-2'
//             onClick={() => {
//               setOptions(-1);
//               submitChanges(i);
//             }}
//           >
//             <FaCheck />
//           </button>
//         </div>
//       </div>

//       <div className='w-[10%] md:w-[5%]'>
//         <button
//           className='text-xl hover:text-orange-500'
//           onClick={() => {
//             setuserDiv('fixed');
//             setuserDivData(items.user);
//           }}
//         >
//           <IoOpenOutline />
//         </button>
//       </div>
//     </div>
//   );
// })}

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
