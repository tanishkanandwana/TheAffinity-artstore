import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from "../../store/auth";

const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const role = useSelector((state) => state.auth.role);

  return (
    <div className='bg-[#ccb0a2ff] p-4 rounded flex flex-col items-center justify-between h-[100%]' style={{ fontFamily: "'Cinzel Decorative', cursive" }}>
      
      {/* Profile Info */}
      <div className='flex items-center flex-col justify-center'>
        <img src={data.avatar} className='h-[15vh]' alt="" />
        <p className='mt-3 text-xl text-lime-50 font-semibold'>Hi, {data.username}</p>
        <p className='mt-1 text-xs text-lime-50'>{data.email}</p>
        <div className='w-full mt-4 h-[1px] bg-lime-50 hidden lg:block'></div>
      </div>

      {/* User Menu */}
      {role === "user" && (
        <div className='w-full flex-col items-center justify-center hidden lg:flex'>
          <Link to="/profile" className="text-lime-50 font-semibold w-full py-2 text-center hover:text-xl rounded transition-all duration-600">
            Favorites
          </Link>

 <Link to="/profile/my-custom-requests" className="text-lime-50 font-semibold w-full py-2 mt-4 text-center hover:text-xl rounded transition-all duration-600">
      My Custom Requests
    </Link>

          <Link to="/profile/orderHistory" className="text-lime-50 font-semibold w-full py-2 mt-4 text-center hover:text-xl rounded transition-all duration-600">
            Order History
          </Link>

        
          

          <Link to="/profile/settings" className="text-lime-50 font-semibold w-full py-2 mt-4 text-center hover:text-xl rounded transition-all duration-600">
            Settings
          </Link>
        </div>
      )}

      {/* Admin Menu */}
      {role === "admin" && (
        <div className='w-full flex-col items-center justify-center hidden lg:flex'>
          <Link to="/profile" className="text-lime-50 font-semibold w-full py-2 text-center hover:text-xl rounded transition-all duration-600">
            All Orders
          </Link>

         <Link to="/profile/view-requests" className="text-lime-50 font-semibold w-full py-2 mt-4 text-center hover:text-xl rounded transition-all duration-600">
      View Requests
    </Link>

          <Link to="/profile/add-art" className="text-lime-50 font-semibold w-full py-2 mt-4 text-center hover:text-xl rounded transition-all duration-600">
            Add New Collection
          </Link>
        </div>
      )}

      {/* Logout */}
      <button
        className='bg-[#f5eae5] w-3/6 lg:w-full mt-4 lg:mt-0 text-[#4B001F] font-semibold flex items-center justify-center py-2 rounded hover:bg-white transition-all duration-600'
        onClick={() => {
          dispatch(authActions.logout());
          dispatch(authActions.changeRole("user"));
          localStorage.clear();
          history("/");
        }}
      >
        Log Out <FaArrowRightFromBracket className='ms-2'/>
      </button>
    </div>
  );
};

export default Sidebar;