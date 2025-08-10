import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import axios from "axios";
const SignUp = () => {
  const [Values, setValues] = useState({ 
    username: "",
     email:"",
     password:"",
    address:"",
  });
  const navigate = useNavigate();

  const change = (e)=> {
    const{name,value} = e.target;
    setValues({...Values, [name]: value});
  };

  const submit = async()=>{
    try {
      if(Values.username === "" || Values.email === "" || Values.password === "" || Values.address === ""){
        alert("All fields are required");
      }
      else{
        const response = await axios.post("https://theaffinity-artstore.onrender.com/api/v1/users/sign-up", Values);
         toast.success(response.data.message);
        
        navigate("/LogIn");
      }
      

      }
      
     catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5F9] via-[#e7c3b1] to-[#f5e6da]  px-12 py-8 flex items-center justify-center">
      <div className="bg-[#FDF8F6] rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
      <p className="text-[#4B001F] text-2xl font-semibold flex items-center justify-center"style={{ fontFamily: "'Cinzel Decorative', cursive" }}>Sign Up</p>
      <div className='mt-4'>
        <div>
          <label htmlFor='' className='text-gray-700'style={{ fontFamily: "'Cinzel Decorative', cursive" }}>
            Username
          </label>

        

          <input
          type="text"
          className="w-full mt-2 border text-gray-700 p-2 outline-none"
          placeholder="your username"
          name="username"
          required 
          value = {Values.username}
          onChange={change}
            />
        </div>

        <div className='mt-4'>
          <label htmlFor='' className='text-gray-700'style={{ fontFamily: "'Cinzel Decorative', cursive" }}>
            Email
          </label>
          <input
            type="text"
          className="w-full mt-2  border text-gray-700 p-2 outline-none"
          placeholder="your email"
          name="email"
          required 
              value = {Values.email}
          onChange={change}
          />
        </div>

          <div className='mt-4'>
          <label htmlFor='' className='text-gray-700'style={{ fontFamily: "'Cinzel Decorative', cursive" }}>
            Password
          </label>
          <input
            type="password"
          className="w-full mt-2 border text-gray-700 p-2 outline-none"
          placeholder="set your password"
          name="password"
          required
              value = {Values.password}
          onChange={change}
          />
        </div>

        <div className='mt-4'>
          <label htmlFor='' className='text-gray-700'style={{ fontFamily: "'Cinzel Decorative', cursive" }}>
            Address
          </label>
          <textarea
          className="w-full mt-2 border text-gray-700 p-2 outline-none"
          rows="5"
          placeholder="your full address"
          name="address"
          required 
              value = {Values.address}
          onChange={change}
          />
        </div>

        <div className='mt-4'>
          <button className='w-full bg-blue-400 text-white font-semibold py-2 rounded hover:bg-blue-500 hover:text-blue-100 transition' onClick={submit}>Sign Up</button>
        </div>
        <p className='flex mt-4 items-center justify-center text-gray-400'>Or</p>
        <p className='flex mt-4 items-center justify-center text-gray-400'>Already have an account? &nbsp; 
          <Link to="/Login" className='hover:text-gray-500'>
          <u>LogIn</u>
          </Link>
        </p>
      </div>
      </div>
     
    </div>
  )
}

export default SignUp
