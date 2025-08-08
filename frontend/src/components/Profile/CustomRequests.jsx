// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Loader from "../loader/Loader";

// const CustomRequests = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const headers = {
//     id: localStorage.getItem("id"),
//     authorization: `Bearer ${localStorage.getItem("token")}`,
//   };

//   useEffect(() => {
//     const fetchCustomRequests = async () => {
//       try {
//         const id = localStorage.getItem("id");
//         const response = await axios.get(
//           `https://theaffinity-artstore.onrender.com/api/v1/custom-request/user/${id}`,
//           { headers }
//         );
//         setRequests(response.data);
//       } catch (error) {
//         console.error("Error fetching custom requests", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCustomRequests();
//   }, []);

//   if (loading) return <Loader />;

//   return (
//     <div className="text-white">
//       <h2 className="text-2xl font-bold mb-4">Your Custom Requests</h2>
//       {requests.length === 0 ? (
//         <p>No custom requests yet.</p>
//       ) : (
//         <div className="space-y-4">
//           {requests.map((req, i) => (
//             <div key={i} className="border border-pink-200 p-4 rounded bg-pink-800">
//               <p><strong>Gift Type:</strong> {req.giftType}</p>
//               <p><strong>Description:</strong> {req.description}</p>
//               <p><strong>Preferred Date:</strong> {new Date(req.preferredDate).toDateString()}</p>
//               <p><strong>Status:</strong> {req.status}</p>
//               {req.referenceFile && (
//                 <p><a href={req.referenceFile} className="text-blue-300 underline" target="_blank" rel="noreferrer">View Reference</a></p>
//               )}
//               {req.adminOptions?.length > 0 && (
//                 <div className="mt-2">
//                   <p className="font-semibold">Options:</p>
//                   <ul className="list-disc list-inside">
//                     {req.adminOptions.map((opt, index) => (
//                       <li key={index}>{opt}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomRequests;

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
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Customize Your Gift</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Gift Type (e.g., Digital Portrait)"
          value={giftType}
          onChange={(e) => setGiftType(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />

        <textarea
          placeholder="Detailed Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />

        <input
          type="date"
          value={preferredDate}
          onChange={(e) => setPreferredDate(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />

        <input
          type="email"
          placeholder="Your Email or Phone"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />

        <input
          type="url"
          placeholder="Reference Image/Video URL (optional)"
          value={referenceFile}
          onChange={(e) => setReferenceFile(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default CustomRequestForm;
