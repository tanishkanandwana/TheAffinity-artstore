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
            <strong>Status:</strong>
            {req.status}
          </p>

          {req.file && (
            <a
              href={req.file}
              target="_blank"
              rel="noreferrer"
            >
              View Uploaded Image
            </a>
          )}

          {req.adminResponse && (
            <div className="bg-yellow-100 p-3 mt-3 rounded">
              <strong>
                Message from Admin:
              </strong>

              <p>{req.adminResponse}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyCustomRequests;