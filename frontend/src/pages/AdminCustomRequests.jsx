import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminCustomRequests = () => {
  const [requests, setRequests] = useState([]);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        "https://theaffinity-artstore.onrender.com/api/v1/custom-requests",
        { headers }
      );

      setRequests(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateRequest = async (id, status, adminResponse) => {
    try {
      await axios.put(
        `https://theaffinity-artstore.onrender.com/api/v1/custom-requests/${id}`,
        {
          status,
          adminResponse,
        },
        { headers }
      );

      fetchRequests();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6">
        All Custom Requests
      </h1>

      {requests.map((req) => (
        <RequestCard
          key={req._id}
          request={req}
          updateRequest={updateRequest}
        />
      ))}
    </div>
  );
};

const RequestCard = ({ request, updateRequest }) => {
  const [status, setStatus] = useState(request.status);
  const [message, setMessage] = useState(
    request.adminResponse || ""
  );

  return (
    <div className="border p-4 rounded mb-4 bg-white">

      <h2>{request.user?.name}</h2>

      <p>
        <strong>Artwork:</strong> {request.artworkType}
      </p>

      <p>
        <strong>Description:</strong> {request.description}
      </p>

      <p>
        <strong>Contact:</strong> {request.contact}
      </p>

      {request.file && (
        <a
          href={request.file}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500"
        >
          View Uploaded Image
        </a>
      )}

      <div className="mt-3">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">
            Pending
          </option>

          <option value="in-progress">
            In Progress
          </option>

          <option value="completed">
            Completed
          </option>
        </select>
      </div>

      <textarea
        className="w-full border mt-3 p-2"
        placeholder="Message to customer..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        className="bg-green-600 text-white px-4 py-2 mt-3 rounded"
        onClick={() =>
          updateRequest(
            request._id,
            status,
            message
          )
        }
      >
        Save Update
      </button>
    </div>
  );
};

export default AdminCustomRequests;