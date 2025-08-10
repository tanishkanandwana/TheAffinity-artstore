//  import React, { useEffect } from 'react'
// import axios from 'axios';
// // Add interceptor here once, globally
// axios.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response && (error.response.status === 401 || error.response.status === 403)) {
//       alert("Session expired. Please log in again.");
//       localStorage.clear();
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );


// import { Toaster } from 'react-hot-toast';
// import Home from "./pages/Home";
// import Navbar from "./components/Navbar/Navbar";
// import Footer from "./components/Footer/Footer";
// import { Routes, Route } from "react-router-dom"; 
// import AllArts from "./pages/AllArts"
// import CategoryPage from './pages/CategoryPage';
// import Login from "./pages/login";
// import SignUp from "./pages/SignUp";
// import Cart from './pages/Cart';
// import Profile from './pages/Profile';
// import ArtCard from './components/ArtCard/ArtCard';
// import Loader from './components/loader/Loader';
// import ViewArtDetails from './components/ViewArtDetails/ViewArtDetails';
// import { useSelector, useDispatch } from "react-redux";
// import Favourites from './components/Profile/Favourites';
// import { authActions } from './store/auth';
// import UserOrderHistory from './components/Profile/UserOrderHistory';
// import Settings from './components/Profile/Settings';
// import AllOrders from './pages/AllOrders';
// import Addnewcollec from './pages/Addnewcollec';
// import UpdateArt from './pages/UpdateArt';
// import AboutUs from './pages/AboutUs';
// import ContactUs from './pages/ContactUs';
// import UserCustomRequests from './pages/UserCustomRequests';
// import CustomRequestForm from "./pages/CustomRequestForm";
// import AdminCustomRequests from './pages/AdminCustomRequests';


// const App = () => {
//   const dispatch = useDispatch();
//   const role = useSelector((state) => state.auth.role);
//   useEffect(() => {
//     if (
//       localStorage.getItem("id") &&
//        localStorage.getItem("token") &&
//         localStorage.getItem("role") )
//     {
//       dispatch(authActions.login());
//       dispatch(authActions.changeRole(localStorage.getItem("role")));
//     }
//   },[]);

//   return (
//     <div>
//       <Toaster position="top-center" reverseOrder={false} />
//    <Navbar />
//    <Routes>
//   <Route exact path ="/" element ={<Home />}/>
//   <Route path ="/all-arts" element ={<AllArts />}/>
//   <Route path="/about-us" element={<AboutUs />} />
//  <Route path="/category/:categoryName" element={<CategoryPage />} />


//   <Route path="/contact-us" element={<ContactUs />} />

//    <Route  path ="/cart" element ={<Cart />}/>



// <Route path="/profile" element={<Profile />}>
//   {/* Default route based on role */}
//   {role === "user" ? (
//     <Route index element={<Favourites />} />
//   ) : (
//     <Route index element={<AllOrders />} />
//   )}

//   {/* Shared logic */}
//   <Route path="orderHistory" element={<UserOrderHistory />} />
//   <Route path="settings" element={<Settings />} />
//     <Route path="custom-requests" element={<UserCustomRequests />} />

//   <Route
//     path="add-art"
//     element={role === "admin" ? <Addnewcollec /> : <div>Not Authorized</div>
      
//     }
//   />

//    <Route
//             path="custom-requests-admin"
//            element={role === "admin" ? <AdminCustomRequests /> : <div>Not Authorized</div>}
//            />  
  
// </Route>



//                    <Route  path ="/SignUp" element ={<SignUp />}/>
//   <Route  path ="/Login" element ={<Login />}/>
//    <Route  path ="/updateArt/:id" element ={<UpdateArt />}/>
//   <Route path ="view-art-details/:id" element={<ViewArtDetails />}/>
//    <Route path="/custom-request-form" element={<CustomRequestForm />} />
//  </Routes>
//   <Footer />
      
   
   
     
//     </div>
//   );
// };

// export default App;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./store/auth";

import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AllArts from "./pages/AllArts";
import CategoryPage from "./pages/CategoryPage";
import Login from "./pages/login";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Favourites from "./components/Profile/Favourites";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Settings from "./components/Profile/Settings";
import AllOrders from "./pages/AllOrders";
import Addnewcollec from "./pages/Addnewcollec";
import UpdateArt from "./pages/UpdateArt";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";

import CustomRequestForm from "./pages/CustomRequestForm";
import AdminCustomRequests from "./pages/AdminCustomRequests";
import ViewArtDetails from "./components/ViewArtDetails/ViewArtDetails";
import UserCustomRequests from "./pages/UserCustomRequests";
// Axios interceptor (global)
// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && (error.response.status === 401 || error.response.status === 403)) {
//       alert("Session expired. Please log in again.");
//       localStorage.clear();
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

// const App = () => {
//   const dispatch = useDispatch();
//   const role = useSelector((state) => state.auth.role);

//  const [isReady, setIsReady] = useState(false);

//   useEffect(() => {
//      console.log("Role updated:", role);
//     if (
//       localStorage.getItem("id") &&
//       localStorage.getItem("token") &&
//       localStorage.getItem("role")
//     ) {
//       dispatch(authActions.login());
//       dispatch(authActions.changeRole(localStorage.getItem("role")));
//     }
//     setIsReady(true);
//   }, [dispatch]);
//     console.log("Current user role:", role);

//       console.log("Current user role:", role);
//   if (!isReady) {
//     return <div>Loading...</div>;  // or your own loader component
//   }

// Axios interceptor (global)
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      alert("Session expired. Please log in again.");
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedId = localStorage.getItem("id");
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    console.log("Stored values:", { storedId, storedToken, storedRole });

    if (storedId && storedToken && storedRole) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(storedRole));
      console.log("Dispatched login and role change for:", storedRole);
    }
    setIsReady(true);
  }, [dispatch]);

  useEffect(() => {
    console.log("Current user role:", role);
  }, [role]);

  if (!isReady || role === null) {
    // Wait until role is known and ready before rendering
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-arts" element={<AllArts />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/profile" element={<Profile />}>
          {role === "user" ? (
            <Route index element={<Favourites />} />
          ) : (
            <Route index element={<AllOrders />} />
          )}
          <Route path="orderHistory" element={<UserOrderHistory />} />
          <Route path="settings" element={<Settings />} />
          <Route
            path="custom-requests"
            element={role === "user" ? <UserCustomRequests /> : <div>Not Authorized</div>}
          />
          <Route
            path="add-art"
            element={role === "admin" ? <Addnewcollec /> : <div>Not Authorized</div>}
          />
          <Route
            path="custom-requests-admin"
            element={role === "admin" ? <AdminCustomRequests /> : <div>Not Authorized</div>}
          />
        </Route>

        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/updateArt/:id" element={<UpdateArt />} />
        <Route path="/view-art-details/:id" element={<ViewArtDetails />} />
        <Route path="/custom-request-form" element={<CustomRequestForm />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;