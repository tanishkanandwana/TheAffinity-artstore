import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Navbar = () => {
  const links = [
    { title: "Home", link: "/" },
    { title: "All Arts", link: "/all-arts" },
    { title: "Cart", link: "/cart" },
    { title: "About us", link: "/about-us" },
      
    { title: "My Profile", link: "/profile" },
 
    { title: "Admin Profile", link: "/profile" },
  ];

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  // Adjust links based on auth
 const visibleLinks = links.filter((link) => {
  if (!isLoggedIn && (link.title === "My Profile" || link.title === "Admin Profile" || link.title === "Cart")) {
    return false;
  }

  if (isLoggedIn && role === "user" && link.title === "Admin Profile") {
    return false;
  }

  if (isLoggedIn && role === "admin" && link.title === "My Profile") {
    return false;
  }

  return true;
});


  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <>
      <nav className="z-50 sticky top-0 shadow-md flex 	bg-[#661638] text-white pl-8 py-4 items-center justify-between h-16 text-l" style={{ fontFamily: "'Cinzel Decorative', cursive" }}>
        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center">
          {visibleLinks.map((item, i) => (
            <div key={item.title || i}>
              {(item.title === "Profile" || item.title === "Admin Profile") ? (
                <Link
                  to={item.link}
                  className="px-4 py-1 border border-white-500 rounded hover:bg-white hover:text-pink-800 transition-all duration-600"
                >
                  {item.title}
                </Link>
              ) : (
                <Link
                  to={item.link}
                  className="hover:text-soft-glow transition-all duration-300"
                >
                  {item.title}
                </Link>
              )}
            </div>
          ))}

          {/* Auth Buttons */}
          {!isLoggedIn && (
            <div className="flex gap-4 ml-4">
              <Link to="/Login" className="px-4 py-1 border border-white-500 rounded hover:bg-white hover:text-pink-800 transition-all duration-600">
                LogIn
              </Link>
              <Link to="/SignUp" className="px-4 py-1 bg-white text-pink-800 rounded hover:bg-pink-800 hover:text-white border border-white-500 transition-all duration-600">
                SignUp
              </Link>
            </div>
          )}
        </div>

        {/* Hamburger Button */}
        <button
          className="block md:hidden text-white text-2xl hover:text-[#DFB2A6]"
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
        >
          <FaGripLines />
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/mylogo.png" alt="logo" className="h-20 mb-2 relative top-1 object-contain rounded" />
        </Link>
      </nav>

      {/* Mobile Nav */}
 <motion.div
  initial={{ x: "-100%" }}
  animate={{ x: isMobileNavOpen ? 0 : "-100%" }}
  transition={{ duration: 0.4, ease: "easeInOut" }}
  className="backdrop-blur-md bg-[#EFDAD4]/70 h-screen w-[70%] fixed top-0 left-0 z-40 flex flex-col justify-center items-center gap-8 rounded-r-2xl shadow-2xl"
>
        {visibleLinks.map((item, i) => (
          <Link
            key={item.title || i}
            to={item.link}
            onClick={() => setIsMobileNavOpen(false)}
            className="text-white text-2xl mb-8 font-semibold hover:text-[#DFB2A6] transition-all duration-300"
          >
            {item.title}
          </Link>
        ))}

        {!isLoggedIn && (
          <>
            <Link
              to="/Login"
              onClick={() => setIsMobileNavOpen(false)}
              className="px-8 py-2 mb-6 text-3xl font-semibold border border-white-500 rounded text-white hover:bg-[#DFB2A6] hover:text-white transition-all duration-600"
            >
              LogIn
            </Link>
            <Link
              to="/SignUp"
              onClick={() => setIsMobileNavOpen(false)}
              className="px-8 py-2 mb-8 text-3xl font-semibold bg-white text-[#DEB9AF] rounded hover:bg-[#CFA39A] hover:text-white border border-white-500 transition-all duration-600"
            >
              SignUp
            </Link>
          </>
        )}
      </motion.div>
    </>
  );
};

export default Navbar;

