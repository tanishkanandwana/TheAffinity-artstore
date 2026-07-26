import React from "react";
import { motion } from "framer-motion";

const memories = [
  {
    image: "review6.jpg",
     clientName: "",
    title: "",
    desc: "Miss. Aayushi"
  },
  {
    image: "review10.jpg",
     clientName: "",
    title: "",
    desc: "Mr.Utkarsh"
  },
  {
    image: "review2.jpg",
     clientName: "",
    title: "",
    desc: "Miss. Jiya"
  },
  {
    image: "review3.jpg",
     clientName: "",
    title: "",
    desc: "Miss. Urvashi"
  },
  {
    image: "review8.jpg",
     clientName: "",
    title: "",
    desc: "Mr. Tirth"
  },
  {
    image: "review4.jpg",
     clientName: "",
    title: "",
    desc: "Miss. Dhanvi"
  },
  {
    image: "review5.jpg",
     clientName: "",
    title: "",
    desc: "Miss. Srishti"
  },
  {
    image: "review1.jpg",
     clientName: "",
    title: "",
    desc: "Miss. Swasti"
  },
  {
    image: "review7.jpg",
     clientName: "",
    title: "",
    desc: "Miss. Riya"
  },
  {
    image: "review8.jpg",
     clientName: "",
    title: "",
    desc: "Miss. Nisha"
  }

];

const CustomerReviews = () => {
  return (
    <div className="relative py-20 overflow-hidden">

      {/* Background Video */}    
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/gift-wrapping-woman-tie-a-white-ribbon-bow.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10">

        <h2
          className="text-center text-xl md:text-3xl text-white mb-4"
          style={{ fontFamily: "'Cinzel Decorative', cursive" }}
        >
       
        </h2>

        <p
          className="text-center text-[#f5e6da] mb-12"
          style={{ fontFamily: "'Marcellus', serif" }}
        >
          
        </p>

        {/* Sliding Cards */}
        <div className="overflow-hidden">

          <motion.div
            className="flex gap-6 w-max"
            animate={{
              x: ["0%", "-50%"]
            }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: "linear"
            }}
          >
            {[...memories, ...memories].map((item, index) => (
              <div
                key={index}
                className="relative w-[260px] md:w-[320px]
                rounded-3xl
                overflow-hidden
                bg-white/10
                backdrop-blur-md
                border border-white/20
                shadow-2xl"
              >
                {item.clientName && (
  <span
    className="
      absolute top-3 right-3 z-20
      bg-[#661638]
      text-white
      px-4 py-1
      text-sm
      rounded-full
    "
  >
    {item.clientName}
  </span>
)}
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-64 w-full object-cover"
                />

                <div className="p-4">
                  <h3
                    className="text-xl text-white mb-2"
                    style={{
                      fontFamily: "'Cinzel Decorative', cursive"
                    }}
                  >
                    {item.title}
                  </h3>

                  <p className="text-[#f5e6da] text-sm">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;