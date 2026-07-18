import React, { useEffect, useState } from "react";
import axios from "axios";

const MyCustomRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        "https://theaffinity-artstore.onrender.com/api/v1/custom-requests/my-requests",
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setRequests(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl mb-6">
        My Custom Requests
      </h1>

      {requests.map((req) => (
        <div
          key={req._id}
          className="border p-4 mb-4 rounded"
        >
          <p>
            <strong>Artwork:</strong>
            {req.artworkType}
          </p>
 <p>
  <strong>Description:</strong>
  {req.description}
</p>

<p>
  <strong>Preferred Date:</strong>
  {new Date(req.preferredDate).toLocaleDateString()}
</p>

<p>
  <strong>Contact:</strong>
  {req.contact}
</p>
          
         <p>
  <strong>Status:</strong>{" "}
  <span
    className={
      req.status === "completed"
        ? "text-green-600 font-semibold"
        : req.status === "in-progress"
        ? "text-blue-600 font-semibold"
        : "text-yellow-600 font-semibold"
    }
  >
    {req.status}
  </span>
</p>

         {req.file && (
  <div className="mt-3">
    <p>
      <strong>Reference Image:</strong>
    </p>

    <a
      href={req.file}
      target="_blank"
      rel="noreferrer"
    >
      <img
        src={req.file}
        alt="Reference"
        className="w-48 h-48 object-cover border rounded mt-2"
      />
    </a>
  </div>
)}
       {req.adminResponse && (
  <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 mt-3 rounded">
    <strong>Message from Admin:</strong>

    <p>{req.adminResponse}</p>
  </div>
)}
        </div>
      ))}
    </div>
  );
};

export default MyCustomRequests;