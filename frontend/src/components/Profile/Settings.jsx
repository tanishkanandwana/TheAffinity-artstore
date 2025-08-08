import React, { useEffect, useState} from 'react'
import axios from 'axios';
import Loader from '../loader/Loader';
import Swal from 'sweetalert2';

const Settings = () => {
  const [Value, setValue] = useState({ address: ""});
  const [ProfileData, setProfileData] = useState();
  const headers ={
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const {name, value} = e.target;
    setValue({...Value, [name]: value});
  };

  useEffect(() => {
    const fetch = async ()=>{
      const response =  await axios.get(
        "https://theaffinity-artstore.onrender.com/api/v1/users/get-user-information",
        {headers}
      );
      setProfileData(response.data);
      setValue({ address: response.data.address });
    };
    fetch();
  }, []);
  

  const submitAddress = async() => {
    const response = await axios.put("https://theaffinity-artstore.onrender.com/api/v1/users/update-address", Value, {headers});
    // alert(response.data.message);
     Swal.fire({
          icon: 'success',
          title: 'Address updated!',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
        });
  };
  return <>
  {!ProfileData && <div className='w-full h-[100%] flex items-center justify-center'><Loader /></div>}{" "}
  {ProfileData && (
    <div className='h-[100%] p-0 md:p-4 text-pink-500'>
      <h1 className='text-3xl md:text-5xl font-semibold text-pink-800 mb-8'>
        Settings
      </h1>
      <div className='flex gap-12'>
        <div className=''>
          <label htmlFor=''>Username</label>
          <p className='p-2 rounded bg-pink-900 mt-2 font-semibold'>
            {ProfileData.username}
          </p>
        </div>
        <div className=''>
          <label htmlFor=''>Email</label>
          <p className='p-2 rounded bg-pink-900 mt-2 font-semibold'>
            {ProfileData.email}
          </p>
        </div>
        </div>
         <div className=''>
          <label htmlFor=''>Address</label>
        <textarea
        className='p-2 rounded bg-pink-900 mt-2 font-semibold'
        rows = "5"
        placeholder = "Address"
        name = "address"
        value = {Value.address}
        onChange={change}
        />
        </div>
        <div className='mt-4 flex justify-end'>
          <button className='bg-lime-500 text-white px-8 py-3 font-semibold rounded hover:bg-lime-600 transition-all duration-600' onClick={submitAddress}>Update</button>
        </div>
      
    </div>
  )}
  </>
};

export default Settings
