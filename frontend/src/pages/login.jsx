
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import {authActions} from "../store/auth";
import {useDispatch} from "react-redux";
import axios from "axios";


const Login = () => {

  const [Values, setValues] = useState({ 
    username: "",
     password:"",
  
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const change = (e)=> {
    const{name,value} = e.target;
    setValues({...Values, [name]: value});
  };

  const submit = async(e)=>{
     e.preventDefault();
    try {
      if(Values.username === "" ||  Values.password === ""){
        alert("All fields are required");
      }
      else{
        const response = await axios.post("https://theaffinity-artstore.onrender.com/api/v1/users/sign-in", Values);
        //console.log(response.data.id);
        console.log("Login response:", response);
        dispatch(authActions.login());
           dispatch(authActions.changeRole(response.data.role));
      localStorage.setItem("id", response.data.id);
       localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
navigate("/profile");
      }
      

      }
      
     catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
     <div className="bg-gradient-to-b from-[#FFF5F9] via-[#e7c3b1] to-[#f5e6da] text-[#4B001F] px-12 py-8 flex items-center justify-center h-screen" >
         <div className="bg-[#FDF8F6] rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
         <p className="text-[#4B001F] text-2xl font-semibold flex items-center justify-center"style={{ fontFamily: "'Cinzel Decorative', cursive" }}>Login</p>
         <div className='mt-4'>
           <div>
             <label htmlFor='' className='text-gray-700'style={{ fontFamily: "'Cinzel Decorative', cursive" }}>
               Username
             </label>
   
             <input
             type="text"
             className="w-full mt-2 text-gray-700 border p-2 outline-none"
             placeholder="your username"
             name="username"
             required
             value={Values.username}
             onChange={change}
             />
           </div>
   
          
   
             <div className='mt-4'>
             <label htmlFor='' className='text-gray-700'style={{ fontFamily: "'Cinzel Decorative', cursive" }}>
               Password
             </label>
             <input
               type="password"
             className="w-full mt-2 text-gray-700 border p-2 outline-none"
             placeholder="enter password"
             name="password"
             required
              value={Values.password}
             onChange={change}
             />
           </div>
   
          
   
           <div className='mt-8'>
             <button className='w-full bg-blue-400 text-white font-semibold py-2 rounded hover:bg-blue-500 hover:text-blue-100 transition'
             onClick={submit}
             >
              Login
              </button>
           </div>
           <p className='flex mt-4 items-center justify-center text-gray-400'>Or</p>
           <p className='flex mt-4 items-center justify-center text-gray-400'>Don't have an account? &nbsp; 
             <Link to="/SignUp" className='hover:text-gray-500'>
             <u>SignUp</u>
             </Link>
           </p>
         </div>
         </div>
        
       </div>
  )
}

export default Login
