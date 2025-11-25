// import React, { useState } from "react";

// const CustomRequestForm = () => {
//   const [formData, setFormData] = useState({
//     artworkType: "",
//     description: "",
//     preferredDate: "",
//     contact: "",
//     file: null,
//   });

//   // handle inputs
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // handle file upload
//   const handleFileChange = (e) => {
//     setFormData({ ...formData, file: e.target.files[0] });
//   };

//   // temporary submit
// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     console.log("Form Data:", formData);
// //   };
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   const data = new FormData();
//   data.append("artworkType", formData.artworkType);
//   data.append("description", formData.description);
//   data.append("preferredDate", formData.preferredDate);
//   data.append("contact", formData.contact);
//   if (formData.file) {
//     data.append("file", formData.file); // Cloudinary will handle this
//   }

//   try {
//     const response = await fetch("https://theaffinity-artstore.onrender.com/api/v1/custom-requests", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT if login system
//       },
//       body: data,
//     });

//     const result = await response.json();
//     if (response.ok) {
//       alert("Request submitted successfully ✅");
//       console.log(result);
//     } else {
//       alert(result.message || "Something went wrong ❌");
//     }
//   } catch (error) {
//     console.error("Error submitting request:", error);
//     alert("Error while submitting request ❌");
//   }
// };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">Customise Your Artwork</h2>
      
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="artworkType"
//           placeholder="Artwork Type"
//           value={formData.artworkType}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />

//         <textarea
//           name="description"
//           placeholder="Detailed Description"
//           value={formData.description}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />

//         <input
//           type="date"
//           name="preferredDate"
//           value={formData.preferredDate}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />

//         <input
//           type="text"
//           name="contact"
//           placeholder="Your Contact Info"
//           value={formData.contact}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />

//         <input
//           type="file"
//           accept="image/*,video/*"
//           onChange={handleFileChange}
//           className="w-full p-2 border rounded"
//         />

//         <button
//           type="submit"
//           className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
//         >
//           Submit Request
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CustomRequestForm;

import React from 'react'

const CustomRequestForm = () => {
  return (
    <div>
      Coming soon !
    </div>
  )
}

export default CustomRequestForm
