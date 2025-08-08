import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateArt = () => {
        const [Data, setData] = useState({
        url: "",
        type: "",
        maker: "",
        price: "",
        desc: "",
        form: "",
    });
    
const { id } = useParams();
const navigate = useNavigate();

 const headers ={
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
     artid: id,
  };
  const change = (e) => {
    const { name,value } = e.target;
    setData({ ...Data, [name]: value});
  };

  const submit = async() => {
    try {
        if(
             Data.url === "" ||
        Data.type === "" ||
        Data.maker === "",
        Data.price === "" ||
        Data.desc === "" ||
        Data.form === ""
        ){
            alert("All field are required");
        }else{
            const response = await axios.put("https://theaffinity-artstore.onrender.com/api/v1/arts/update-art", 
                Data, {headers}
            );
            setData({
                  url: "",
        type: "",
        maker: "",
        price: "",
        desc: "",
        form: "",
            });
              // console.log(response);
            // alert(response.data.message);
             Swal.fire({
                  icon: 'success',
                  title: 'updated successfully!',
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 2000,
                });
             navigate(`/view-art-details/${id}`)
        }
    } catch (error) {
        alert(error.response.data.message);
       
    }
  };
   useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`https://theaffinity-artstore.onrender.com/api/v1/arts/get-art-by-id/${id}`);
        setData(response.data.data);
      } catch (err) {
        console.error("Error fetching art by ID", err);
      }
    };
    fetch();
  }, [id]);

  return (
     <div className='bg-gradient-to-b from-[#FFF5F9] via-[#e7c3b1] to-[#f5e6da]  h-[100%] p-0 md:p-4'>
    <h1 className='text-3xl md:text-5xl font-semibold text-lime-100  mb-8'>Update collection</h1>
    <div className='p-4 bg-pink-700 rounded'>
        <div>
            <label htmlFor='' className='text-lime-100'>Image</label>
            <input 
            type="text"
            className='w-full mt-2 bg-pink-600 text-lime-100 p-2 outline-none'
            placeholder='url of image'
            name="url"
            required
            value={Data.url}
            onChange={change}
            />
        </div>
        <div className='mt-4'>
            <label htmlFor='' className='text-lime-100'>
                Collection type 
            </label>
            <input 
            type="text"
            className='w-full mt-2 bg-pink-600 text-lime-100 p-2 outline-none'
            placeholder='type of collection'
            name="type"
            required
            value={Data.type}
            onChange={change}  />
        </div>
         <div className='mt-4'>
            <label htmlFor='' className='text-lime-100'>
                Maker 
            </label>
            <input 
            type="text"
            className='w-full mt-2 bg-pink-600 text-lime-100 p-2 outline-none'
            placeholder='maker'
            name="maker"
            required
            value={Data.maker}
            onChange={change}  />
        </div>

        <div className='mt-4 flex gap-4'>
            <div className='w-3/6'>
             <label htmlFor='' className='text-lime-100'>Form</label>
                <input 
            type="text"
            className='w-full mt-2 bg-pink-600 text-lime-100 p-2 outline-none'
            placeholder='Artform'
            name="form"
            required
            value={Data.form}
            onChange={change}  />
            </div>
            <div className='w-3/6'>
              <label htmlFor='' className='text-lime-100'>Price</label>
                <input 
            type="number"
            className='w-full mt-2 bg-pink-600 text-lime-100 p-2 outline-none'
            placeholder='Price'
            name="price"
            required
            value={Data.price}
            onChange={change}  /></div>
        </div>
        <div className='mt-4'>
             <label htmlFor='' className='text-lime-100'>Description of collection</label>
             <textarea
             className='w-full mt-2 bg-pink-600 text-lime-100 p-2 outline-none'
             rows="5"
             placeholder='description of collection'
             name="desc"
             required
             value={Data.desc}
             onChange={change} />
        </div>

        <button className='mt-4 px-3 bg-lime-500 text-white font-semibold py-2 rounded hover:bg-lime-600 transition-all duration-600' onClick={submit}>
            Update collection
        </button>
        

    </div>
  </div>
  )
}

export default UpdateArt
