import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from "../../store/auth";

const Sidebar = ({data}) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const role = useSelector((state) => state.auth.role);
  return (
    <div className='bg-[#ccb0a2ff] p-4 rounded flex flex-col items-center justify-between h-[100%]' style={{ fontFamily: "'Marcellus', serif" }}>
      <div className='flex items-center flex-col justify-center' style={{ fontFamily: "'Marcellus', serif" }}><img src={data.avatar} className='h-[15vh]' alt="" />
    <p className='mt-3 text-xl text-lime-50 font-semibold'>
        {data.username}
    </p>
    <p className='mt-1 text-xs text-lime-50' style={{ fontFamily: "'Marcellus', serif" }}>{data.email}</p>
    <div className='w-full mt-4 h-[1px] bg-lime-50 hidden lg:block'></div></div>
   {role === "user" && (
     <div className='w-full flex-col items-center justify-center hidden lg:flex' style={{ fontFamily: "'Marcellus', serif" }}>
        <Link to="/profile" className="text-lime-50 font-semibold w-full py-2 text-center hover:text-xl rounded transition-all duration-600">
        Favorites
        </Link>

        <Link 
        to="/profile/orderHistory" className="text-lime-50 font-semibold w-full py-2 mt-4 text-center hover:text-xl rounded transition-all duration-600">
            Order History
        </Link>

 <Link 
      to="/profile/custom-requests" className="text-lime-50 font-semibold w-full py-2 mt-4 text-center hover:text-xl rounded transition-all duration-600">
      Custom Requests
    </Link>

    <Link to="/profile/settings" className="text-lime-50 font-semibold w-full py-2 mt-4 text-center hover:text-xl rounded transition-all duration-600">
    Settings
    </Link>
    </div>
   )}
  {role === "admin" && ( <div className='w-full flex-col items-center justify-center hidden lg:flex'>
        <Link to="/profile" className="text-lime-50 font-semibold w-full py-2 text-center hover:bg-text-xl rounded transition-all duration-600">
        All Orders
        </Link>

<Link to="/profile/custom-requests" className="text-lime-50 font-semibold w-full py-2 mt-4 text-center hover:text-xl rounded transition-all duration-600">
  Custom Requests
</Link>


        <Link 
        to="/profile/add-art" className="text-lime-50 font-semibold w-full py-2 mt-4 text-center hover:text-xl rounded transition-all duration-600">
            Add new collection
        </Link>
   
    </div>)}

    <button className='bg-pink-900 w-3/6 lg:w-full mt-4 lg:mt-0 text-lime-50 font-semibold flex items-center justify-center py-2 rounded hover:bg-lime-100 hover:text-pink-800 transition-all duration-600'
    onClick={() => {
      dispatch(authActions.logout());
        dispatch(authActions.changeRole("user"));
        localStorage.clear("id");
         localStorage.clear("token");
          localStorage.clear("role");
          history("/");
    }}>
    Log Out<FaArrowRightFromBracket className='ms-2'/>
    
    </button>
    </div>
  );
};
 
export default Sidebar
 