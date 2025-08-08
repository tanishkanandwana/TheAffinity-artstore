import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message submitted! (You can connect this to a backend later)");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="h-screen p-8 bg-gradient-to-b from-[#FFF5F9] via-[#e7c3b1] to-[#f5e6da]  text-[#4B001F]" style={{ fontFamily: "'Marcellus', serif" }}>
      <h1 className="text-4xl text-center font-bold mb-10">Contact Us</h1>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-[#FDF8F6] shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <label className="block mb-4">
          <span className="text-gray-700">Hey, Your Good Name</span>
          <input
            type="text"
            name="name"
            className="w-full mt-1 p-2 border rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Your Email</span>
          <input
            type="email"
            name="email"
            className="w-full mt-1 p-2 border rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Write your Message</span>
          <textarea
            name="message"
            rows="4"
            className="w-full mt-1 p-2 border rounded"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        <button
          type="submit"
          className="bg-[#661638] text-white py-2 px-6 rounded hover:bg-pink-800 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
