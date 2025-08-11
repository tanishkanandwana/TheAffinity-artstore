import React, { Suspense, lazy, useEffect, useState } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./store/auth";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

// Lazy imports
const Home = lazy(() => import("./pages/Home"));
const AllArts = lazy(() => import("./pages/AllArts"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Cart = lazy(() => import("./pages/Cart"));
const Profile = lazy(() => import("./pages/Profile"));
const Favourites = lazy(() => import("./components/Profile/Favourites"));
const UserOrderHistory = lazy(() => import("./components/Profile/UserOrderHistory"));
const Settings = lazy(() => import("./components/Profile/Settings"));
const AllOrders = lazy(() => import("./pages/AllOrders"));
const Addnewcollec = lazy(() => import("./pages/Addnewcollec"));
const UpdateArt = lazy(() => import("./pages/UpdateArt"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const ViewArtDetails = lazy(() => import("./components/ViewArtDetails/ViewArtDetails"));
const CustomRequestForm = lazy(() => import("./components/CustomRequest/CustomRequestForm"));
const MyCustomRequests = lazy(() => import("./components/Profile/MyCustomRequests"));
const ViewRequests = lazy(() => import("./pages/ViewRequests"));

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
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

    if (storedId && storedToken && storedRole) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(storedRole));
    }
    setIsReady(true);
  }, [dispatch]);

  if (!isReady || role === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/all-arts" element={<AllArts />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/updateArt/:id" element={<UpdateArt />} />
          <Route path="/view-art-details/:id" element={<ViewArtDetails />} />

          {/* Custom Request Form - protected route */}
          <Route
            path="/custom-request-form"
            element={
              <ProtectedRoute>
                <CustomRequestForm />
              </ProtectedRoute>
            }
          />

          {/* Profile routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          >
            {role === "user" ? (
              <>
                <Route index element={<Favourites />} />
                <Route path="my-custom-requests" element={<MyCustomRequests />} />
              </>
            ) : (
              <>
                <Route index element={<AllOrders />} />
                <Route
                  path="view-requests"
                  element={
                    <AdminRoute>
                      <ViewRequests />
                    </AdminRoute>
                  }
                />
              </>
            )}
            <Route path="orderHistory" element={<UserOrderHistory />} />
            <Route path="settings" element={<Settings />} />
            <Route
              path="add-art"
              element={
                role === "admin" ? (
                  <Addnewcollec />
                ) : (
                  <div>Not Authorized</div>
                )
              }
            />
          </Route>
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
};

export default App;

// import React, { Suspense, lazy,useEffect, useState } from "react";
// import axios from "axios";
// import { Toaster } from "react-hot-toast";
// import { Routes, Route } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { authActions } from "./store/auth";
// import Home from "./pages/Home";
// import Navbar from "./components/Navbar/Navbar";
// import Footer from "./components/Footer/Footer";
// import AllArts from "./pages/AllArts";
// import CategoryPage from "./pages/CategoryPage";
// import Login from "./pages/login";
// import SignUp from "./pages/SignUp";
// import Cart from "./pages/Cart";
// import Profile from "./pages/Profile";
// import Favourites from "./components/Profile/Favourites";
// import UserOrderHistory from "./components/Profile/UserOrderHistory";
// import Settings from "./components/Profile/Settings";
// import AllOrders from "./pages/AllOrders";
// import Addnewcollec from "./pages/Addnewcollec";
// import UpdateArt from "./pages/UpdateArt";
// import AboutUs from "./pages/AboutUs";
// import ContactUs from "./pages/ContactUs";
// import ViewArtDetails from "./components/ViewArtDetails/ViewArtDetails";
// import MyCustomRequests from "./components/Profile/MyCustomRequests";
// import CustomRequestForm from "./components/CustomRequest/CustomRequestForm";
// import ViewRequests from "./components/Profile/MyCustomRequests";



// const Home = lazy(() => import("./pages/Home"));
// const AllArts = lazy(() => import("./pages/AllArts"));
// const CategoryPage = lazy(() => import("./pages/CategoryPage"));
// const Login = lazy(() => import("./pages/login"));
// const SignUp = lazy(() => import("./pages/SignUp"));
// const Cart = lazy(() => import("./pages/Cart"));
// const Profile = lazy(() => import("./pages/Profile"));
// const Favourites = lazy(() => import("./components/Profile/Favourites"));
// const UserOrderHistory = lazy(() => import("./components/Profile/UserOrderHistory"));
// const Settings = lazy(() => import("./components/Profile/Settings"));
// const AllOrders = lazy(() => import("./pages/AllOrders"));
// const Addnewcollec = lazy(() => import("./pages/Addnewcollec"));
// const UpdateArt = lazy(() => import("./pages/UpdateArt"));
// const AboutUs = lazy(() => import("./pages/AboutUs"));
// const ContactUs = lazy(() => import("./pages/ContactUs"));
// const ViewArtDetails = lazy(() => import("./components/ViewArtDetails/ViewArtDetails"));

// const CustomRequestForm = lazy(() => import("./components/CustomRequest/CustomRequestForm"));
// const MyCustomRequests = lazy(() => import("./components/Profile/MyCustomRequests"));
// const ViewRequests = lazy(() => import("./pages/ViewRequests"));

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
//   const [isReady, setIsReady] = useState(false);

//   useEffect(() => {
//     const storedId = localStorage.getItem("id");
//     const storedToken = localStorage.getItem("token");
//     const storedRole = localStorage.getItem("role");

//     console.log("Stored values:", { storedId, storedToken, storedRole });

//     if (storedId && storedToken && storedRole) {
//       dispatch(authActions.login());
//       dispatch(authActions.changeRole(storedRole));
//       console.log("Dispatched login and role change for:", storedRole);
//     }
//     setIsReady(true);
//   }, [dispatch]);

//   useEffect(() => {
//     console.log("Current user role:", role);
//   }, [role]);

//   if (!isReady || role === null) {
//     // Wait until role is known and ready before rendering
//     return <div>Loading...</div>;
//   }


//    return (
//     <div>
//       <Toaster position="top-center" reverseOrder={false} />
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/all-arts" element={<AllArts />} />
//         <Route path="/about-us" element={<AboutUs />} />
//         <Route path="/category/:categoryName" element={<CategoryPage />} />
//         <Route path="/contact-us" element={<ContactUs />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/updateArt/:id" element={<UpdateArt />} />
//         <Route path="/view-art-details/:id" element={<ViewArtDetails />} />

//         {/* Custom Request Form accessible for users outside profile */}
//         <Route path="/custom-request-form" element={<CustomRequestForm />} />

//         {/* Profile Routes */}
//         <Route path="/profile" element={<Profile />}>
//           {role === "user" ? (
//             <>
//               <Route index element={<Favourites />} />
//               <Route path="my-custom-requests" element={<MyCustomRequests />} />
//             </>
//           ) : (
//             <>
//               <Route index element={<AllOrders />} />
//               <Route path="view-requests" element={<ViewRequests />} />
//             </>
//           )}
//           <Route path="orderHistory" element={<UserOrderHistory />} />
//           <Route path="settings" element={<Settings />} />
//           <Route
//             path="add-art"
//             element={role === "admin" ? <Addnewcollec /> : <div>Not Authorized</div>}
//           />
//         </Route>
//       </Routes>
//       <Footer />
//     </div>
//   );
// };

// //   return (
// //     <div>
// //       <Toaster position="top-center" reverseOrder={false} />
// //       <Navbar />
// //       <Routes>
// //         <Route path="/" element={<Home />} />
// //         <Route path="/all-arts" element={<AllArts />} />
// //         <Route path="/about-us" element={<AboutUs />} />
// //         <Route path="/category/:categoryName" element={<CategoryPage />} />
// //         <Route path="/contact-us" element={<ContactUs />} />
// //         <Route path="/cart" element={<Cart />} />

// //         <Route path="/profile" element={<Profile />}>
// //           {role === "user" ? (
// //             <Route index element={<Favourites />} />
// //           ) : (
// //             <Route index element={<AllOrders />} />
// //           )}
// //           <Route path="orderHistory" element={<UserOrderHistory />} />
// //           <Route path="settings" element={<Settings />} />
         
// //           <Route
// //             path="add-art"
// //             element={role === "admin" ? <Addnewcollec /> : <div>Not Authorized</div>}
// //           />
        
// //         </Route>

// //         <Route path="/signup" element={<SignUp />} />
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/updateArt/:id" element={<UpdateArt />} />
// //         <Route path="/view-art-details/:id" element={<ViewArtDetails />} />
      
// //       </Routes>
// //       <Footer />
// //     </div>
// //   );
// // };

// export default App;