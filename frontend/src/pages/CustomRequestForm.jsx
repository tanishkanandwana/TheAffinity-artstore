import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomRequestForm = () => {
  const [pieceType, setPieceType] = useState("");
  const [description, setDescription] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [contact, setContact] = useState("");
  const [files, setFiles] = useState([]);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pieceType || !description || !preferredDate || !contact) {
      alert("Please fill all the required fields");
      return;
    }

    const formData = new FormData();
    formData.append("pieceType", pieceType);
    formData.append("description", description);
    formData.append("preferredDate", preferredDate);
    formData.append("contact", contact);

    for (let i = 0; i < files.length; i++) {
      formData.append("referenceMedia", files[i]);
    }

    try {
      const token = localStorage.getItem("token"); // Adjust according to your auth storage
      const userId = localStorage.getItem("userId"); // same here

      const res = await fetch("/api/v1/customrequests", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          id: userId, // your backend expects user id here
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Custom request created successfully!");
        navigate("/my-custom-requests"); // or wherever you want to redirect
      } else {
        alert(data.message || "Failed to create custom request");
      }
    } catch (error) {
      console.error("Error submitting custom request:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-3xl mb-6 font-semibold text-center">Create Custom Request</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Artwork Type"
          value={pieceType}
          onChange={(e) => setPieceType(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border p-2 rounded resize-none"
          rows={4}
        />
        <input
          type="date"
          value={preferredDate}
          onChange={(e) => setPreferredDate(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          accept="image/*,video/*"
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-[#a67364] text-white py-3 rounded hover:bg-[#6e433d] transition"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default CustomRequestForm;
