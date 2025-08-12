import React, { useState } from "react";
import axios from "axios";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post("https://theaffinity-artstore.onrender.com/api/v1/newsletter", { email });
      setMessage(res.data.message);
      setEmail("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-[#f0d6c9] py-10 px-4 text-center">
      <h2 className="text-2xl font-semibold text-[#a88f85] mb-2">Stay Inspired ✨</h2>
      <p className="text-[#7a6058] mb-6">
        Subscribe to get updates on new collections, offers, and art stories.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-lg mx-auto"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full sm:w-auto flex-1 px-4 py-2 text-gray-600 rounded-full border border-[#e3ccc0] focus:outline-none focus:ring-2 focus:ring-[#e3ccc0]"
          required
        />
        <button
          type="submit"
          className="bg-[#e79791] text-white px-6 py-2 rounded-full hover:bg-[#d77c74] transition-colors duration-300"
        >
          Subscribe
        </button>
      </form>

      {message && <p className="text-green-700 mt-3">{message}</p>}
      {error && <p className="text-red-600 mt-3">{error}</p>}
    </div>
  );
};

export default Newsletter;


// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";

// const Newsletter = () => {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // stop reload

//     if (!email) {
//       alert("Please enter your email");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await axios.post(
//         "https://theaffinity-artstore.onrender.com/api/v1/newsletter/subscribe",
//         { email }
//       );

//       alert(res.data.message || "Subscribed successfully!");
//       setEmail("");
//     } catch (error) {
//       console.error("Subscription error:", error);
//       alert(
//         error.response?.data?.message || "Something went wrong. Try again later."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative w-full h-[400px] sm:h-[500px] mt-10 rounded-xl overflow-hidden shadow-xl">
//       {/* Background Video */}
//       <video
//         className="absolute top-0 left-0 w-full h-full object-cover z-0"
//         src="/daypainting.mp4"
//         autoPlay
//         loop
//         muted
//         playsInline
//       />

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-[#fdf6f3]/70 z-10" />
//       <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-b from-[#fdf6f3] to-transparent z-20" />
//       <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-[#fdf6f3] to-transparent z-20" />

//       {/* Content */}
//       <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center text-[#6e433d]">
//         <motion.h2
//           className="text-3xl sm:text-4xl font-bold mb-4"
//           style={{ fontFamily: "'Cinzel Decorative', cursive" }}
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           Stay Connected
//         </motion.h2>

//         <motion.p
//           className="text-lg sm:text-xl mb-6"
//           style={{ fontFamily: "'Cinzel Decorative', cursive" }}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//         >
//           Subscribe to our newsletter for new arrivals, stories, and exclusive offers.
//         </motion.p>

//         <form
//           className="flex flex-col sm:flex-row gap-4 w-full max-w-xl"
//           onSubmit={handleSubmit} // ✅ call the function here
//         >
//           <input
//             type="email"
//             placeholder="Enter your email"
//             required
//             value={email} // ✅ controlled input
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full sm:flex-1 px-4 py-3 rounded-full border border-[#caa89c] focus:outline-none text-[#6e433d] placeholder:text-[#c9a59a] bg-white/80"
//             style={{ fontFamily: "'Cinzel Decorative', cursive" }}
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="px-6 py-3 rounded-full bg-[#a67364] hover:bg-[#6e433d] text-white transition-all duration-300"
//             style={{ fontFamily: "'Cinzel Decorative', cursive" }}
//           >
//             {loading ? "Subscribing..." : "Subscribe"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Newsletter;
