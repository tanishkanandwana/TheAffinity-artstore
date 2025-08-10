import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../loader/Loader";
import { toast } from "react-hot-toast";

const AllCustomRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "https://theaffinity-artstore.onrender.com/api/v1/custom-request/all",
          { headers }
        );
        console.log("Admin fetched all requests:", response.data);
     
        setRequests(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching requests:", error);
        toast.error("Failed to load custom requests");
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleOptionUpload = async (id) => {
    const adminOptions = prompt("Enter art options URL(s), comma separated:");
    if (!adminOptions) return;

    try {
      const response = await axios.patch(
        `https://theaffinity-artstore.onrender.com/api/v1/custom-request/upload-options/${id}`,
        { adminOptions: adminOptions.split(",") },
        { headers }
      );
      toast.success("Options shared successfully");
      // Refresh list
      setRequests((prev) =>
        prev.map((req) => (req._id === id ? response.data : req))
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload options");
    }
  };

  if (loading) return <Loader />;

  return (
    <>
  
  <div className="p-6">
    <h1 className="text-2xl font-semibold mb-4"style={{ fontFamily: "'Cinzel Decorative', cursive" }}>All Custom Requests</h1>

    {requests.length === 0 ? (
      <p>No custom requests found.</p>
    ) : (
      <div className="space-y-6">
        {requests.map((request) => (
          <div
            key={request._id}
            className="border rounded-lg p-4 shadow-md bg-white"
          >
            <div className="mb-2">
              <strong>User:</strong>{" "}
              {request?.userId?.name} ({request?.userId?.email})
            </div>
            <div className="mb-2">
              <strong>Gift Type:</strong> {request.giftType}
            </div>
            <div className="mb-2">
              <strong>Description:</strong> {request.description}
            </div>
            <div className="mb-2">
              <strong>Preferred Date:</strong>{" "}
              {new Date(request.preferredDate).toLocaleDateString()}
            </div>
            <div className="mb-2">
              <strong>Contact Info:</strong> {request.contactInfo}
            </div>
            {request.referenceFile && (
              <div className="mb-2">
                <strong>Reference:</strong>{" "}
                <a
                  href={request.referenceFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View File
                </a>
              </div>
            )}
            <div className="mb-2">
              <strong>Status:</strong> {request.status}
            </div>

            {/* Admin Options Section */}
            {request.adminOptions?.length > 0 ? (
              <div className="mb-2">
                <strong>Options Shared:</strong>
                <ul className="list-disc ml-6">
                  {request.adminOptions.map((option, index) => (
                    <li key={index}>{option}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-gray-500 italic mb-2">No options shared yet</div>
            )}

            {/* Selected Option (if user selected one) */}
            {request.selectedOption && (
              <div className="mt-2">
                <strong>Selected Option:</strong> {request.selectedOption}
              </div>
            )}

            {/* TODO: Add Upload Options UI here */}
            {/* <UploadOptionsModal requestId={request._id} /> */}
          </div>
        ))}
      </div>
    )}
  </div>


    </>

  );
};

export default AllCustomRequests;
