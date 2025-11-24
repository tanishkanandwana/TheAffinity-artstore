import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="bg-[#FDF8F6] text-[#896c5dff] px-8 py-10">
      {/* Brand Title & Tagline */}
      <div className="mb-2">
        <h1
          className="text-4xl font-semibold flex justify-end"
          style={{ fontFamily: "'Cinzel Decorative', cursive" }}
        >
          THE AFFINITY
        </h1>
        <p
          className="text-md italic mt-1 flex justify-end"
          style={{ fontFamily: "'Cinzel Decorative', cursive" }}
        >
          “Art that Celebrates, Gifts that Connect”
        </p>
      </div>

      {/* Elegant Divider */}
      <div className="border-t border-[#d3b9aa] my-2 w-3/4 mx-auto opacity-50"></div>

      {/* Footer Content */}
      <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-0 px-2">

  
         <div>
       
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-soft-glow transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/all-arts" className="hover:text-soft-glow transition">
                All Arts
              </Link>
            </li>
            <li>
              <Link to="/custom-request-form" className="hover:text-soft-glow transition">
                Customize Your Gift
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="hover:text-soft-glow transition">
                About Us
              </Link>
            </li>
          </ul>
        </div>


        {/* Instagram Link */}
        <div>
        
        
          <p className="mt-10"style={{ fontFamily: "'Cinzel Decorative', cursive" }}>
            Email: affinityarts@gmail.com
          </p>
      <a
            href="https://www.instagram.com/theaffinityarts"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-soft-glow transition duration-300 mt-2"
            style={{ fontFamily: "'Cinzel Decorative', cursive" }}
          >
            <FaInstagram className="text-xl" />
             Our Instagram
          </a>
            
        </div>

        {/* Newsletter Placeholder (optional) */}
        {/* 
        <div>
          <h2 className="text-lg mb-4 font-semibold" style={{ fontFamily: "'Cinzel Decorative', cursive" }}>
            Stay Updated
          </h2>
          <input
            type="email"
            placeholder="Enter your email"
            className="px-3 py-2 border border-[#d3b9aa] bg-transparent placeholder-[#b49787] rounded-md focus:outline-none focus:border-[#896c5dff]"
          />
          <button className="ml-2 px-4 py-2 bg-[#896c5dff] text-white rounded-md hover:bg-[#a5826d] transition">
            Subscribe
          </button>
        </div> 
        */}
      </div>

      {/* Divider */}
      <div className="border-t mb-6 border-[#d3b9aa] w-full opacity-40"></div>

      {/* Copyright */}
      <h1
        className="text-sm font-semibold text-center"
        style={{ fontFamily: "'Cinzel Decorative', cursive" }}
      >
        &copy; 2025 THE AFFINITY. All rights reserved.
      </h1>
    </div>
  );
};

export default Footer;
