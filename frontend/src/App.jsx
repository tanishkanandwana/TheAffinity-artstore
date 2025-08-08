 import React, { useEffect } from 'react'
import axios from 'axios';
// Add interceptor here once, globally
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      alert("Session expired. Please log in again.");
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);


import { Toaster } from 'react-hot-toast';
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom"; 
import AllArts from "./pages/AllArts"
import CategoryPage from './pages/CategoryPage';
import Login from "./pages/login";
import SignUp from "./pages/SignUp";
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import ArtCard from './components/ArtCard/ArtCard';
import Loader from './components/loader/Loader';
import ViewArtDetails from './components/ViewArtDetails/ViewArtDetails';
import { useSelector, useDispatch } from "react-redux";
import Favourites from './components/Profile/Favourites';
import CustomRequestForm from "./pages/CustomRequestForm";

import { authActions } from './store/auth';
import UserOrderHistory from './components/Profile/UserOrderHistory';
import Settings from './components/Profile/Settings';
import AllOrders from './pages/AllOrders';
import Addnewcollec from './pages/Addnewcollec';
import UpdateArt from './pages/UpdateArt';
import CustomRequests from "./components/Profile/CustomRequests";
import AllCustomRequests from './components/Profile/AllCustomRequests';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';



const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (
      localStorage.getItem("id") &&
       localStorage.getItem("token") &&
        localStorage.getItem("role") )
    {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  },[]);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
   <Navbar />
   <Routes>
  <Route exact path ="/" element ={<Home />}/>
  <Route path ="/all-arts" element ={<AllArts />}/>
  <Route path="/about-us" element={<AboutUs />} />
 <Route path="/category/:categoryName" element={<CategoryPage />} />


  <Route path="/contact-us" element={<ContactUs />} />
  <Route path="/custom-request" element={<CustomRequestForm />} />

   <Route  path ="/cart" element ={<Cart />}/>
   

<Route path="/profile" element={<Profile />}>
  {/* Default route based on role */}
  {role === "user" ? (
    <Route index element={<Favourites />} />
  ) : (
    <Route index element={<AllOrders />} />
  )}

  {/* Shared logic */}
  <Route path="orderHistory" element={<UserOrderHistory />} />
  <Route path="settings" element={<Settings />} />
  <Route
    path="custom-requests"
    element={
      role === "admin" ? (
        <AllCustomRequests />
      ) : role === "user" ? (
        <CustomRequests />
      ) : (
        <div>Not Authorized</div>
      )
    }
  />
  <Route
    path="add-art"
    element={role === "admin" ? <Addnewcollec /> : <div>Not Authorized</div>}
  />
</Route>



                   <Route  path ="/SignUp" element ={<SignUp />}/>
  <Route  path ="/Login" element ={<Login />}/>
   <Route  path ="/updateArt/:id" element ={<UpdateArt />}/>
  <Route path ="view-art-details/:id" element={<ViewArtDetails />}/>
 </Routes>
  <Footer />
      
   
   
     
    </div>
  );
};

export default App;


