import React, { useState} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';
const Addnewcollec = () => {
    const [Data, setData] = useState({
        url: "",
        type: "",
        maker: "",
        price: "",
        desc: "",
        form: "",
    });
     const headers ={
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
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
            const response = await axios.post("https://theaffinity-artstore.onrender.com/api/v1/arts/add-art", 
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
            alert(response.data.message);
        }
    } catch (error) {
        // alert(error.response.data.message);
        Swal.fire({
              icon: 'success',
              title: 'Added successfully!',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 2000,
            });
            
    }
  };

  return (

  <div className='h-[100%] p-0 md:p-4'>
    <h1 className='text-3xl md:text-5xl font-semibold text-[#4B001F] mb-8'>Add collection</h1>
    <div className='p-4 bg-gradient-to-b from-[#FFF5F9] via-[#e7c3b1] to-[#f5e6da]  rounded'>
        <div>
            <label htmlFor='' className='text-[#4B001F]'>Image</label>
            <input 
            type="text"
            className='w-full mt-2 bg-[#FDF8F6] text-gray-700 p-2 outline-none'
            placeholder='url of image'
            name="url"
            required
            value={Data.url}
            onChange={change}
            />
        </div>
        <div className='mt-4'>
            <label htmlFor='' className='text-[#4B001F]'>
                Collection type 
            </label>
            <input 
            type="text"
            className='w-full mt-2 bg-[#FDF8F6] text-gray-700 p-2 outline-none'
            placeholder='type of collection'
            name="type"
            required
            value={Data.type}
            onChange={change}  />
        </div>
         <div className='mt-4'>
            <label htmlFor='' className='text-[#4B001F]'>
                Maker 
            </label>
            <input 
            type="text"
            className='w-full mt-2 bg-[#FDF8F6] text-gray-700 p-2 outline-none'
            placeholder='maker'
            name="maker"
            required
            value={Data.maker}
            onChange={change}  />
        </div>

        <div className='mt-4 flex gap-4'>
            <div className='w-3/6'>
             <label htmlFor='' className='text-[#4B001F]'>Form</label>
                <input 
            type="text"
            className='w-full mt-2 bg-[#FDF8F6] text-gray-700 p-2 outline-none'
            placeholder='Artform'
            name="form"
            required
            value={Data.form}
            onChange={change}  />
            </div>
            <div className='w-3/6'>
              <label htmlFor='' className='text-[#4B001F]'>Price</label>
                <input 
            type="number"
            className='w-full mt-2 bg-[#FDF8F6] text-gray-700 p-2 outline-none'
            placeholder='Price'
            name="price"
            required
            value={Data.price}
            onChange={change}  /></div>
        </div>
        <div className='mt-4'>
             <label htmlFor='' className='text-[#4B001F]'>Description of collection</label>
             <textarea
             className='w-full mt-2 bg-[#FDF8F6] text-gray-700 p-2 outline-none'
             rows="5"
             placeholder='description of collection'
             name="desc"
             required
             value={Data.desc}
             onChange={change} />
        </div>

        <button className='mt-4 px-3 bg-[#4B001F] text-white font-semibold py-2 rounded hover:bg-[#4B001F] hover:text-gray-700 transition-all duration-600' onClick={submit}>
            Add collection
        </button>
        

    </div>
  </div>
  );
};

export default Addnewcollec
