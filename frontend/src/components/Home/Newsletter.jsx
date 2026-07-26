import React, { useState } from "react";
import axios from "axios";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post("https://theaffinity-artstore.onrender.com/api/v1/newsletter/", { email });
      setMessage(res.data.message);
      setShowPopup(true);
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
      <div className="relative z-20 py-10 px-4 text-center text-[#661638] max-w-xl mx-auto">
        <h2 className="text-3xl font-semibold mb-2">Stay Connected</h2>
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
            placeholder="Email Address"
            className="w-full sm:flex-1 px-4 py-2 rounded-full border border-[#caa89c] bg-white/80 placeholder-[#a67c73] focus:outline-none focus:ring-2 focus:ring-[#a67364] text-[#6e433d]"
            required
          />
          <button
            type="submit"
            className="bg-[#661638] hover:bg-[#752048] transition-colors text-white px-6 py-2 rounded-full"
          >
            Subscribe
          </button>
        </form>

        {message && <p className="mt-4 text-green-600">{message}</p>}
        {error && <p className="mt-4 text-white">{error}</p>}
      </div>
      {showPopup && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-2xl shadow-xl text-center max-w-sm mx-4">
      <h3 className="text-xl font-semibold text-[#661638] mb-3">
        🎉 Subscription Successful!
      </h3>

      <p className="text-gray-600 mb-4">
        Thank you for subscribing to The Affinity Arts Newsletter.
      </p>

      <button
        onClick={() => setShowPopup(false)}
        className="bg-[#661638] text-white px-4 py-2 rounded-full"
      >
        Close
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default Newsletter;


