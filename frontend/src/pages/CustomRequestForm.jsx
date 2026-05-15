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
        "https://theaffinity-artstore.onrender.com/api/v1/custom-request",
       
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
    <div className="min-h-screen bg-[#f8f3ef] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-3xl p-8">

        <h1
          className="text-3xl md:text-5xl text-center text-[#6e433d] mb-4"
          style={{ fontFamily: "'Cinzel Decorative', cursive" }}
        >
          Customize Yours ✨
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Share your idea, inspiration, or reference images —
          we’ll create something meaningful for you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block mb-2 text-[#6e433d] font-semibold">
              Artwork Type
            </label>

            <input
              type="text"
              name="artworkType"
              value={formData.artworkType}
              onChange={handleChange}
              placeholder="Example: Resin Art, Crochet Bouquet..."
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#a67364]"
            />
          </div>

          <div>
            <label className="block mb-2 text-[#6e433d] font-semibold">
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
            <label className="block mb-2 text-[#6e433d] font-semibold">
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
            <label className="block mb-2 text-[#6e433d] font-semibold">
              Contact Information
            </label>

            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Phone number / Instagram ID"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#a67364]"
            />
          </div>

          <div>
            <label className="block mb-2 text-[#6e433d] font-semibold">
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
            className="w-full bg-[#895a4f] hover:bg-[#6e433d] text-white py-3 rounded-xl transition-all duration-300"
          >
            {loading ? "Sending..." : "Send Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomRequestForm;