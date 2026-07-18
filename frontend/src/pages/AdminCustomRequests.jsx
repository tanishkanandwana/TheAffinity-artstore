import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

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

      toast.success("Request updated successfully ✨");

      fetchRequests();
    } catch (err) {
      console.log(err);
      toast.error("Failed to update request");
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
      <p>
  <strong>Preferred Date:</strong>{" "}
  {new Date(request.preferredDate).toLocaleDateString()}
</p>

<p>
  <strong>Submitted:</strong>{" "}
  {new Date(request.createdAt).toLocaleString()}
</p>

      {/* {request.file && (
        <a
          href={request.file}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500"
        >
          View Uploaded Image
        </a>
      )}

       */}
{request.file && (
  <div className="mt-3">
    <p className="font-semibold mb-2">
      Reference Image:
    </p>

    <a
      href={request.file}
      target="_blank"
      rel="noreferrer"
    >
      <img
        src={request.file}
        alt="Custom Request"
        className="w-48 h-48 object-cover rounded border hover:scale-105 transition"
      />
    </a>
  </div>
)}

      <div className="mt-3">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={
    status === "completed"
      ? "text-green-600 font-semibold"
      : status === "in-progress"
      ? "text-blue-600 font-semibold"
      : "text-yellow-600 font-semibold"
  }
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