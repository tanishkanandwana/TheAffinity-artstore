import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const SendNewsletterUpdate = () => {
  const token = useSelector((state) => state.auth.token);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");
    if (!subject || !message) {
      setErrorMsg("Please fill subject and message.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "https://theaffinity-artstore.onrender.com/api/v1/newsletter/send-update",
        { subject, message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            id: localStorage.getItem("id") || "",
          },
        }
      );
      setSuccessMsg(res.data.message);
      setSubject("");
      setMessage("");
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "Failed to send updates. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Send Newsletter Update</h2>
      {successMsg && <p className="text-green-600 mb-2">{successMsg}</p>}
      {errorMsg && <p className="text-red-600 mb-2">{errorMsg}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border p-2 rounded"
          disabled={loading}
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          className="border p-2 rounded"
          disabled={loading}
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          {loading ? "Sending..." : "Send Update"}
        </button>
      </form>
    </div>
  );
};

export default SendNewsletterUpdate;
