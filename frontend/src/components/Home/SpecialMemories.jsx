import React from "react";
import { motion } from "framer-motion";

const memories = [
  {
    image: "memories1.jpg",
    title: "",
    desc: ""
  },
  {
    image: "memories2.jpeg",
    title: "",
    desc: ""
  },
  {
    image: "memories5.jpeg",
    title: "",
    desc: ""
  },
  {
    image: "memories4.jpg",
    title: "",
    desc: ""
  },
  {
    image: "memories6.jpg",
    title: "",
    desc: ""
  },
   {
    image: "memories7.jpg",
    title: "",
    desc: ""
  },
    {
    image: "memories8.jpg",
    title: "",
    desc: ""
  }

];

const SpecialMemories = () => {
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
          className="text-center text-3xl md:text-5xl text-white mb-4"
          style={{ fontFamily: "'Cinzel Decorative', cursive" }}
        >
          Special Memories We've Created
        </h2>

        <p
          className="text-center text-[#f5e6da] mb-12"
          style={{ fontFamily: "'Marcellus', serif" }}
        >
          Every gift tells a story.
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
                className="w-[260px] md:w-[320px]
                rounded-3xl
                overflow-hidden
                bg-white/10
                backdrop-blur-md
                border border-white/20
                shadow-2xl"
              >
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

export default SpecialMemories;