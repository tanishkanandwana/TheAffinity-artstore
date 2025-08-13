import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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



//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!pieceType || !description || !preferredDate || !contact) {
//     alert("Please fill all the required fields");
//     return;
//   }

//   const formData = new FormData();
//   formData.append("pieceType", pieceType);
//   formData.append("description", description);
//   formData.append("preferredDate", preferredDate);
//   formData.append("contact", contact);
//  const headers ={
//     id: localStorage.getItem("id"),
//     authorization: `Bearer ${localStorage.getItem("token")}`
//     ,
//   };
//   for (let i = 0; i < files.length; i++) {
//     formData.append("referenceMedia", files[i]);
//   }

//   try {
//     const token = localStorage.getItem("token"); // ✅ get, not set
//     const userId = localStorage.getItem("userId"); // ✅ get, not set

//     const response = await axios.post("https://theaffinity-artstore.onrender.com/api/v1/custom-requests", formData,{
//      "Content-Type": "multipart/form-data"
//     });

//     let data;
//     const contentType = response.headers.get("content-type");
//     if (contentType && contentType.indexOf("application/json") !== -1) {
//       data = await res.json();
//     } else {
//       const text = await res.text();
//       throw new Error(`Unexpected response from server: ${text}`);
//     }

//     if (res.ok) {
//       alert("Custom request created successfully!");
//       navigate("/my-custom-requests");
//     } else {
//       alert(data.message || "Failed to create custom request");
//     }
//   } catch (error) {
//     console.error("Error submitting custom request:", error);
//     alert("Something went wrong. Please try again.");
//   }
// };
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

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  try {
    const response = await axios.post(
      "https://theaffinity-artstore.onrender.com/api/v1/custom-requests",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          id: userId,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert("Custom request created successfully!");
    navigate("/my-custom-requests");
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
