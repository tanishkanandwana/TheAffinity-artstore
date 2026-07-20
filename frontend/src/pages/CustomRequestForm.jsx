import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const CustomRequestForm = () => {
  const [formData, setFormData] = useState({
    artworkType: "",
    description: "",
    preferredDate: "",
    contact: "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.artworkType ||
      !formData.description ||
      !formData.preferredDate ||
      !formData.contact
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("artworkType", formData.artworkType);
      data.append("description", formData.description);
      data.append("preferredDate", formData.preferredDate);
      data.append("contact", formData.contact);

      if (file) {
        data.append("file", file);
      }

      await axios.post(
        "https://theaffinity-artstore.onrender.com/api/v1/custom-requests",
       
        data,
        {
          headers: {
            ...headers,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Custom request sent successfully ✨");

      setFormData({
        artworkType: "",
        description: "",
        preferredDate: "",
        contact: "",
      });

      setFile(null);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-10 overflow-hidden">
      <video
  className="absolute top-0 left-0 w-full h-full object-cover"
  src="/gift-wrapping-woman-tie-a-white-ribbon-bow.mp4"
  autoPlay
  loop
  muted
  playsInline
/>
<div className="absolute inset-0 bg-[#2b0e18]/30" />
      {/* <div className="relative z-10 w-full max-w-2xl bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-white/30"> */}

<div className="relative z-10 w-full max-w-2xl
bg-white/20
backdrop-blur-xl
shadow-[0_8px_32px_rgba(0,0,0,0.25)]
rounded-3xl
p-8
border border-white/20">
        <h1
          className="text-3xl md:text-5xl text-center text-white/90 mb-4 tracking-wide"
          style={{ fontFamily: "'Cinzel Decorative', cursive" }}
        >
          Customize Your Gift
        </h1>

      <p
  className="text-center text-white/90 mb-8 leading-relaxed"
  style={{ fontFamily: "'Marcellus', serif" }}
>
  Every handmade piece begins with a story.
  Share yours and we'll craft something uniquely yours.
</p>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block mb-2 text-white/90 font-semibold">
              Artwork Type
            </label>

            <input
              type="text"
              name="artworkType"
              value={formData.artworkType}
              onChange={handleChange}
              placeholder="Example: Resin Art, Crochet, Birthday Hamper..."
              className="w-full bg-white/80 border border-[#d8c4b5] rounded-xl px-4 py-3 outline-none focus:border-[#661638] focus:ring-2 focus:ring-[#e7c3b1] transition-all"
            />
          </div>

          <div>
            <label className="block mb-2 text-white/90 font-semibold">
              Describe Your Idea
            </label>

            <textarea
              rows="5"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell us what you'd love us to create..."
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#a67364]"
            />
          </div>

          <div>
            <label className="block mb-2  text-white/90 font-semibold">
              Preferred Delivery Date
            </label>

            <input
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#a67364]"
            />
          </div>

          <div>
            <label className="block mb-2  text-white/90 font-semibold">
              Contact Information
            </label>

            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="enter your whatsapp/Correct Instagram ID"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#a67364]"
            />
          </div>

          <div>
            <label className="block mb-2  text-white/90 font-semibold">
              Upload Reference Image
            </label>

            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#661638] to-[#8c3153] hover:scale-[1.02] text-white py-3 rounded-xl transition-all duration-300 shadow-lg"
          >
            {loading ? "Sending..." : "Send Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomRequestForm;