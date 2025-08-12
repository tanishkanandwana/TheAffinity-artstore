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
      const res = await axios.post("https://theaffinity-artstore.onrender.com/api/v1/newsletter/", { email });
      setMessage(res.data.message);
      setEmail("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="relative overflow-hidden rounded-lg">
      {/* Background video with soft brightness and saturation */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0 filter brightness-90 saturate-90"
        src="/daypainting.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Light pastel translucent overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#f7ebe7]/40 z-10 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-20 py-10 px-4 text-center text-[#6e433d] max-w-xl mx-auto">
        <h2 className="text-3xl font-semibold mb-2">Stay Inspired ✨</h2>
        <p className="mb-6">
          Subscribe to get updates on new collections, offers, and art stories.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row justify-center items-center gap-3"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full sm:flex-1 px-4 py-2 rounded-full border border-[#caa89c] bg-white/80 placeholder-[#a67c73] focus:outline-none focus:ring-2 focus:ring-[#a67364] text-[#6e433d]"
            required
          />
          <button
            type="submit"
            className="bg-[#a67364] hover:bg-[#6e433d] transition-colors text-white px-6 py-2 rounded-full"
          >
            Subscribe
          </button>
        </form>

        {message && <p className="mt-4 text-green-600">{message}</p>}
        {error && <p className="mt-4 text-white">{error}</p>}
      </div>
    </div>
  );
};

export default Newsletter;
;


// import React, { useState } from "react";
// import axios from "axios";

// const Newsletter = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setError("");

//     try {
//       const res = await axios.post("https://your-backend-url/api/newsletter", { email });
//       setMessage(res.data.message);
//       setEmail("");
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="relative overflow-hidden rounded-lg">
//       {/* Background video */}
//       <video
//         className="absolute top-0 left-0 w-full h-full object-cover z-0"
//         src="/daypainting.mp4"
//         autoPlay
//         loop
//         muted
//         playsInline
//       />

//       {/* Overlay for better text visibility */}
//       <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 z-10"></div>

//       {/* Content */}
//       <div className="relative z-20 py-10 px-4 text-center text-white max-w-xl mx-auto">
//         <h2 className="text-3xl font-semibold mb-2">Stay Inspired ✨</h2>
//         <p className="mb-6">
//           Subscribe to get updates on new collections, offers, and art stories.
//         </p>

//         <form
//           onSubmit={handleSubmit}
//           className="flex flex-col sm:flex-row justify-center items-center gap-3"
//         >
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             className="w-full sm:flex-1 px-4 py-2 rounded-full border border-white bg-transparent placeholder-white focus:outline-none focus:ring-2 focus:ring-white text-white"
//             required
//           />
//           <button
//             type="submit"
//             className="bg-pink-400 hover:bg-pink-600 transition-colors text-white px-6 py-2 rounded-full"
//           >
//             Subscribe
//           </button>
//         </form>

//         {message && <p className="mt-4 text-green-300">{message}</p>}
//         {error && <p className="mt-4 text-red-400">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default Newsletter;

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";

// const Newsletter = () => {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

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
//       {/* Background Video with subtle tint */}
//       <video
//         className="absolute top-0 left-0 w-full h-full object-cover z-0 filter brightness-90 saturate-90"
//         src="/daypainting.mp4"
//         autoPlay
//         loop
//         muted
//         playsInline
//       />

//       {/* Soft pastel translucent overlay */}
//       <div className="absolute inset-0 bg-[#f7ebe7]/50 z-10 backdrop-blur-sm" />

//       {/* Top and Bottom gentle gradient overlays for subtle vignette */}
//       <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-b from-[#f7ebe7]/80 to-transparent z-20" />
//       <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-[#f7ebe7]/80 to-transparent z-20" />

//       {/* Content */}
//       <div className="relative z-30 flex flex-col items-center justify-center h-full px-6 text-center text-[#6e433d]">
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
//           onSubmit={handleSubmit}
//         >
//           <input
//             type="email"
//             placeholder="Enter your email"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full sm:flex-1 px-4 py-3 rounded-full border border-[#caa89c] focus:outline-none text-[#6e433d] placeholder:text-[#c9a59a] bg-white/80 backdrop-blur-sm"
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
