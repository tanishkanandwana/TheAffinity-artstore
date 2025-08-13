import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const MyCustomRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchMyRequests = async () => {
      try {
        const res = await axios.get(
          "https://theaffinity-artstore.onrender.com/api/v1/customRequests/my",
          { headers }
        );
        setRequests(res.data.data);
      } catch (error) {
        console.error("Failed to fetch requests", error);
        Swal.fire("Error", "Failed to load your custom requests", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchMyRequests();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading your custom requests...
      </div>
    );

  if (!requests.length)
    return (
      <div className="text-center mt-10 text-gray-600 text-xl">
        You have no custom requests yet.
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-[#4B001F]" style={{ fontFamily: "'Cinzel Decorative', cursive" }}>
        My Custom Requests
      </h1>

      {requests.map((req) => (
        <div
          key={req._id}
          className="mb-6 border border-gray-300 rounded p-4 bg-[#FDF8F6]"
        >
          <div className="flex flex-wrap justify-between mb-2">
            <div>
              <strong>Piece Type:</strong> {req.pieceType}
            </div>
            <div>
              <strong>Status:</strong>{" "}
              <span
                className={
                  req.status === "Pending"
                    ? "text-yellow-600"
                    : req.status === "In Progress"
                    ? "text-blue-600"
                    : "text-green-600"
                }
              >
                {req.status}
              </span>
            </div>
          </div>

          <div className="mb-2">
            <strong>Description:</strong> {req.description}
          </div>

          <div className="mb-2">
            <strong>Preferred Date:</strong>{" "}
            {new Date(req.preferredDate).toLocaleDateString()}
          </div>

          <div className="mb-4">
            <strong>Contact:</strong> {req.contact}
          </div>

          {req.referenceMedia && req.referenceMedia.length > 0 && (
            <div className="mb-4">
              <strong>Reference Media:</strong>
              <div className="flex flex-wrap gap-2 mt-1">
                {req.referenceMedia.map((media, i) => (
                  <a
                    key={i}
                    href={media.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border rounded overflow-hidden"
                    title="View Reference Media"
                  >
                    {/* Show image or video preview */}
                    {media.url.match(/\.(mp4|mov|webm)$/i) ? (
                      <video
                        src={media.url}
                        controls
                        className="w-32 h-20 object-cover"
                      />
                    ) : (
                      <img
                        src={media.url}
                        alt={`Reference media ${i + 1}`}
                        className="w-32 h-20 object-cover"
                      />
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Admin Responses */}
          <div>
            <strong>Admin Responses:</strong>
            {req.adminResponses && req.adminResponses.length > 0 ? (
              req.adminResponses.map((resp, i) => (
                <div
                  key={i}
                  className="mt-2 p-3 border border-gray-300 rounded bg-white"
                >
                  <p>{resp.message}</p>
                  {resp.sampleMedia && resp.sampleMedia.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {resp.sampleMedia.map((media, idx) => (
                        <a
                          key={idx}
                          href={media.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border rounded overflow-hidden"
                          title="View Sample Media"
                        >
                          {media.url.match(/\.(mp4|mov|webm)$/i) ? (
                            <video
                              src={media.url}
                              controls
                              className="w-32 h-20 object-cover"
                            />
                          ) : (
                            <img
                              src={media.url}
                              alt={`Sample media ${idx + 1}`}
                              className="w-32 h-20 object-cover"
                            />
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                  <small className="text-gray-400 mt-1 block">
                    {new Date(resp.date).toLocaleString()}
                  </small>
                </div>
              ))
            ) : (
              <p className="mt-1 text-gray-500">No responses yet.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyCustomRequests;
