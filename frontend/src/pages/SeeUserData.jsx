import React from 'react'
import { RxCross1 } from "react-icons/rx";
const SeeUserData = ({ userDivData, userDiv, setuserDiv}) =>{
 return (
    <>
    <div className={`${userDiv} top-5  h-screen w-full bg-[#F5E6DA] opacity-80`}></div>  
    <div className={`${userDiv} top-5 h-screen w-full items-center justify-center`}>
        <div className='bg-[#FDF8F6] rounded p-4 w-[80%] md:w-[50%] lg:w-[40%] text-[#4B001F]'>
            <div className='flex items-center justify-between'>
                <h1 className='text-2xl font-semibold'>User Information</h1>
                <button onClick={() => setuserDiv("hidden")
                }>
                    <RxCross1 />

                </button>
            </div>
            <div className='mt-2'>
                <label htmlFor=''>
                    Username: {" "}
                    <span className='font-semibold'>{userDivData.username}</span>
                </label>
            </div>
            <div className='mt-4'>
                <label htmlFor=''>
                    Email: <span className='font-semibold'>{userDivData.email}</span>
                </label>
            </div>
            <div className='mt-4'>
                <label htmlFor=''>
                    Address: {" "}
                    <span className='font-semibold'>{userDivData.address}</span>
                </label>
            </div>
        </div>
    </div>
    </>
  )
}




export default SeeUserData
