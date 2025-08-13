import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AdminCustomRequests = () => {
  const [requests, setRequests] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [statusUpdates, setStatusUpdates] = useState({});
  const [messageUpdates, setMessageUpdates] = useState({});
  const [fileUploads, setFileUploads] = useState({});

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetch all custom requests (admin)
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(
          "https://theaffinity-artstore.onrender.com/api/v1/customRequests",
          { headers }
        );
        setRequests(res.data.data);
      } catch (error) {
        console.error("Failed to fetch requests", error);
        Swal.fire("Error", "Failed to fetch custom requests", "error");
      }
    };

    fetchRequests();
  }, []);

  // Open edit form for a request
  const openEdit = (index) => {
    setEditingIndex(index);
    const req = requests[index];
    setStatusUpdates({ [req._id]: req.status });
    setMessageUpdates({ [req._id]: "" });
    setFileUploads({ [req._id]: null });
  };

  // Handle status dropdown change
  const handleStatusChange = (id, value) => {
    setStatusUpdates((prev) => ({ ...prev, [id]: value }));
  };

  // Handle admin message textarea change
  const handleMessageChange = (id, value) => {
    setMessageUpdates((prev) => ({ ...prev, [id]: value }));
  };

  // Handle file input change
  const handleFileChange = (id, files) => {
    setFileUploads((prev) => ({ ...prev, [id]: files }));
  };

  // Submit update PATCH request
  const submitUpdate = async (index) => {
    const req = requests[index];
    const formData = new FormData();

    if (statusUpdates[req._id]) formData.append("status", statusUpdates[req._id]);
    if (messageUpdates[req._id]) formData.append("message", messageUpdates[req._id]);

    if (fileUploads[req._id]) {
      for (const file of fileUploads[req._id]) {
        formData.append("sampleMedia", file);
      }
    }

    try {
      await axios.patch(
        `https://theaffinity-artstore.onrender.com/api/v1/customRequests/${req._id}`,
        formData,
        {
          headers: {
            ...headers,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Request updated successfully!",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
      });

      // Option 1: Refresh all requests after update
      const updatedRequests = [...requests];
      updatedRequests[index].status = statusUpdates[req._id];
      // Optionally, add admin response locally too or refetch from backend
      setRequests(updatedRequests);

      setEditingIndex(-1);
    } catch (error) {
      console.error("Update failed", error);
      Swal.fire("Error", "Failed to update request", "error");
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">All Custom Requests</h1>

      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">User</th>
            <th className="border px-3 py-2">Piece Type</th>
            <th className="border px-3 py-2">Description</th>
            <th className="border px-3 py-2">Preferred Date</th>
            <th className="border px-3 py-2">Contact</th>
            <th className="border px-3 py-2">Status</th>
            <th className="border px-3 py-2">Admin Response</th>
            <th className="border px-3 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((req, i) => (
            <tr key={req._id} className="hover:bg-gray-50">
              <td className="border px-3 py-2">{req.user?.username || "N/A"}</td>
              <td className="border px-3 py-2">{req.pieceType}</td>
              <td className="border px-3 py-2 max-w-xs truncate">{req.description}</td>
              <td className="border px-3 py-2">
                {new Date(req.preferredDate).toLocaleDateString()}
              </td>
              <td className="border px-3 py-2">{req.contact}</td>
              <td className="border px-3 py-2">{req.status}</td>
              <td className="border px-3 py-2 max-w-sm">
                {req.adminResponses?.length > 0
                  ? req.adminResponses.map((resp, idx) => (
                      <div key={idx} className="mb-2 border p-2 rounded bg-gray-50">
                        <p>{resp.message}</p>
                        {resp.sampleMedia?.map((media, i) => (
                          <a
                            key={i}
                            href={media.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline mr-2"
                          >
                            Sample {i + 1}
                          </a>
                        ))}
                        <small className="text-gray-400">
                          {new Date(resp.date).toLocaleString()}
                        </small>
                      </div>
                    ))
                  : "No response yet"}
              </td>

              <td className="border px-3 py-2">
                {editingIndex === i ? (
                  <div className="flex flex-col gap-2">
                    <select
                      value={statusUpdates[req._id] || ""}
                      onChange={(e) => handleStatusChange(req._id, e.target.value)}
                      className="border p-1"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>

                    <textarea
                      placeholder="Admin message"
                      value={messageUpdates[req._id] || ""}
                      onChange={(e) => handleMessageChange(req._id, e.target.value)}
                      className="border p-1 resize-none"
                      rows={3}
                    />

                    <input
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      onChange={(e) => handleFileChange(req._id, e.target.files)}
                    />

                    <div className="flex gap-2">
                      <button
                        onClick={() => submitUpdate(i)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingIndex(-1)}
                        className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => openEdit(i)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}

          {requests.length === 0 && (
            <tr>
              <td colSpan={8} className="text-center p-4 text-gray-600">
                No custom requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCustomRequests;
