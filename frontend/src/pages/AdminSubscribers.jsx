// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux"; // or your auth method
// import { Navigate } from "react-router-dom";

// const AdminSubscribers = () => {
//   const role = useSelector((state) => state.auth.role); // your role from redux
//   const [subscribers, setSubscribers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   if (role !== "admin") {
//     return <Navigate to="/" replace />;  // block non-admins
//   }

//   useEffect(() => {
//     const fetchSubscribers = async () => {
//       try {
//         const res = await axios.get("https://theaffinity-artstore.onrender.com/api/v1/newsletter");
//         setSubscribers(res.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSubscribers();
//   }, []);

//   if (loading) return <p>Loading subscribers...</p>;

//   return (
//     <div>
//       <h1>Newsletter Subscribers</h1>
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

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminSubscribers = () => {
  const role = useSelector((state) => state.auth.role);
  const token = useSelector((state) => state.auth.token); // assuming token stored in redux
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
              Authorization: `Bearer ${token}`,  // send auth token
              id: localStorage.getItem("id") || "",  // or however you store user id
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

  if (loading) return <p>Loading subscribers...</p>;

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Newsletter Subscribers</h1>
      <ul>
        {subscribers.map((sub) => (
          <li key={sub._id}>
            {sub.email} - Subscribed on {new Date(sub.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSubscribers;
