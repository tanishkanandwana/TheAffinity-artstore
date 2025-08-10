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
    <div className='h-[100%] p-0 md:p-4 text-white'style={{ fontFamily: "'Cinzel Decorative', cursive" }}>
      <h1 className='text-3xl md:text-4xl font-semibold text-[#4B001F] mb-6'style={{ fontFamily: "'Cinzel Decorative', cursive" }}>
        Settings
      </h1>
    
         <div className='w-full max-w-3xl bg-[#d9bdaa] p-4 rounded-l shadow-lg border-none'>
          <label
    htmlFor="address"
    className="block text-lg font-semibold mb-1 text-[#4B001F] text-center"
    style={{ fontFamily: "'Cinzel Decorative', cursive" }}
  >
    Address
  </label>

         <textarea
    id="address"
    className="w-full p-4 rounded-lg bg-[#e3ccc0] border-none shadow-sm text-[#4B001F] font-semibold"
    rows="3"
    placeholder="Enter your address"
    name="address"
    value={Value.address}
    onChange={change}
    style={{ fontFamily: "'Cinzel Decorative', cursive" }}
  />
        </div>
         <div className="mt-6 flex justify-end">
    <button
      className="bg-[#4B001F] text-white px-8 py-3 font-semibold rounded-lg hover:bg-[#2e0013] transition-all duration-300 shadow-md"
      onClick={submitAddress}
    >
      Update
    </button>
  </div>
      
    </div>
  )}
  </>
};

export default Settings
