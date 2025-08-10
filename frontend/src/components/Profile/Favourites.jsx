import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ArtCard from "../ArtCard/ArtCard";
import { PiSmileyMeltingFill } from "react-icons/pi";
import Swal from 'sweetalert2';


const Favourites = () => {
const [Favouritearts, setFavouritearts] = useState();

   const headers ={
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
useEffect(() => {
 const fetch = async()=>{
  const response = await axios.get("https://theaffinity-artstore.onrender.com/api/v1/favourites/get-favourite-arts",{headers});
 setFavouritearts(response.data.data);
 };
  fetch();
}, [Favouritearts])


  return (
    <> {Favouritearts?.length === 0 && (<div className='text-3xl font-semibold text-[#f5eae5] h-[100%] flex items-center justify-center w-full' style={{ fontFamily: "'Cinzel Decorative', cursive" }}>
      No Favourite collections 
      <span className='ms-2 mt-3'><PiSmileyMeltingFill /></span>

    </div>)}
    
    <div className='grid grid-cols-4 gap-4 ml-10 \'>
     
     {Favouritearts && Favouritearts.map((items,i)=>
     <div key={i}>
     <ArtCard data={items} favourite={true}/>
     </div>
     )}
    </div>
    
    </>


  )
}

export default Favourites
