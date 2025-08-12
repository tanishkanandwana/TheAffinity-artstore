import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminSubscribers = () => {
  const role = useSelector((state) => state.auth.role);
  const token = useSelector((state) => state.auth.token); // token stored in redux
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  if (role !== "admin") {
    return <Navigate to="/" replace />; // block non-admins
  }

  useEffect(() => {
    const fetchSubscribers = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(
          "https://theaffinity-artstore.onrender.com/api/v1/newsletter",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              id: localStorage.getItem("id") || "",
            },
          }
        );
        setSubscribers(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load subscribers.");
      } finally {
        setLoading(false);
      }
    };
    fetchSubscribers();
  }, [token]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this subscriber?"
    );
    if (!confirmDelete) return;

    setDeleteError("");
    setDeleteLoading(true);

    try {
      await axios.delete(
        `https://theaffinity-artstore.onrender.com/api/v1/newsletter/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            id: localStorage.getItem("id") || "",
          },
        }
      );

      // Remove deleted subscriber from UI
      setSubscribers((prevSubs) => prevSubs.filter((sub) => sub._id !== id));
    } catch (err) {
      console.error("Failed to delete subscriber:", err);
      setDeleteError("Failed to delete subscriber. Try again.");
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) return <p>Loading subscribers...</p>;

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Newsletter Subscribers</h1>

      {deleteError && <p className="text-red-500 mb-4">{deleteError}</p>}

      <ul>
        {subscribers.map((sub) => (
          <li key={sub._id} className="flex justify-between items-center py-2 border-b">
            <span>
              {sub.email} - Subscribed on {new Date(sub.date).toLocaleDateString()}
            </span>

            <button
              onClick={() => handleDelete(sub._id)}
              disabled={deleteLoading}
              className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
            >
              {deleteLoading ? "Deleting..." : "Delete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSubscribers;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// const AdminSubscribers = () => {
//   const role = useSelector((state) => state.auth.role);
//   const token = useSelector((state) => state.auth.token); // assuming token stored in redux
//   const [subscribers, setSubscribers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   if (role !== "admin") {
//     return <Navigate to="/" replace />; // block non-admins
//   }

//   useEffect(() => {
//     const fetchSubscribers = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         const res = await axios.get(
//           "https://theaffinity-artstore.onrender.com/api/v1/newsletter",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,  // send auth token
//               id: localStorage.getItem("id") || "",  // or however you store user id
//             },
//           }
//         );
//         setSubscribers(res.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load subscribers.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSubscribers();
//   }, [token]);

//   if (loading) return <p>Loading subscribers...</p>;

//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Newsletter Subscribers</h1>
//       <ul>
//         {subscribers.map((sub) => (
//           <li key={sub._id}>
//             {sub.email} - Subscribed on {new Date(sub.date).toLocaleDateString()}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AdminSubscribers;
