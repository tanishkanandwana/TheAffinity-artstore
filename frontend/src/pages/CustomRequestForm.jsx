import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CustomRequestForm = () => {
  const [giftType, setGiftType] = useState("");
  const [description, setDescription] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [referenceFile, setReferenceFile] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
  const base64Payload = token.split('.')[1];
  const payload = JSON.parse(atob(base64Payload));
  console.log("Decoded token payload:", payload);
} else {
  console.log("No token found in localStorage");
}

    try {
      const response = await axios.post(
        "https://theaffinity-artstore.onrender.com/api/v1/custom-request/submit",
        {
          giftType,
          description,
          preferredDate,
          contactInfo,
          referenceFile,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Request submitted successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Submit Error:", error);
      toast.error("Failed to submit request.");
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/painting.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>

      {/* Form content */}
      <div className="relative z-10 flex justify-center items-center h-full px-4">
        <div className="p-6 max-w-xl w-full bg-white/80 backdrop-blur-md rounded-lg shadow-2xl">
          <h2
            className="text-3xl font-bold mb-6 text-center text-[#4B001F]" style={{ fontFamily: "'Cinzel Decorative', cursive" }}
            
          >
            Customize Your Gift
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 text-[#4B001F]">
            <input
              type="text"
              placeholder="Gift Type (e.g., Digital Portrait)"
              value={giftType}
              onChange={(e) => setGiftType(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded bg-white/80"
            />

            <textarea
              placeholder="Detailed Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded bg-white/80"
            />

            <input
              type="date"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded bg-white/80"
            />

            <input
              type="email"
              placeholder="Your Email"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded bg-white/80"
            />

            <input
              type="url"
              placeholder="Reference Image/Video URL (optional)"
              value={referenceFile}
              onChange={(e) => setReferenceFile(e.target.value)}
              className="w-full px-4 py-2 border rounded bg-white/80"
            />

            <button
              type="submit"
              className="w-full bg-[#4B001F] text-white py-2 rounded hover:bg-[#6a2e48] transition"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomRequestForm;
// https://i.pinimg.com/1200x/65/c6/3c/65c63c48abd73a23cca757cf1b9f9b9d.jpg  