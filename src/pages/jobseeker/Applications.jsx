import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmWithdrawId, setConfirmWithdrawId] = useState(null); // for popup
  const [withdrawing, setWithdrawing] = useState(false); // spinner state

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("/api/applications/my", {
          withCredentials: true,
        });
        const data = Array.isArray(response.data) ? response.data : [];
        setApplications(data);
      } catch (err) {
        console.error("Failed to fetch applications", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "APPLIED":
        return "text-blue-500";
      case "REJECTED":
        return "text-red-600";
      case "WITHDRAWN":
        return "text-yellow-400";
      case "SELECTED":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const handleWithdraw = async (id) => {
    try {
      setWithdrawing(true); // start spinner
      const response = await axios.put(
        `/api/applications/applied-jobs/${id}/withdraw`,
        {},
        { withCredentials: true }
      );

      // Update UI after withdraw
      setApplications((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status: "WITHDRAWN" } : app
        )
      );

      console.log("Application withdrawn:", response.data);
      setConfirmWithdrawId(null); // close popup
    } catch (err) {
      console.error("Failed to withdraw application", err);
    } finally {
      setWithdrawing(false); // stop spinner
    }
  };

  return (
    <div className="relative h-full w-full overflow-y-auto p-6">
      {/* Animated Background */}
      <motion.img
        src="/images/applications.png"
        className="h-full w-full object-cover fixed blur-sm z-0 brightness-50"
        alt="applications"
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Foreground Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center pt-28 mt-20 w-full px-4">
        <motion.h1 className="text-white text-4xl font-bold mb-2 mt-40"
        initial={{opacity:0.7, y:-25}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.8, ease:"easeIn"}}
        >My Applications</motion.h1>

        {loading ? (
          <p className="text-white text-xl">Loading applications...</p>
        ) : applications.length === 0 ? (
          <p className="text-white text-xl">No applications found.</p>
        ) : (
          <div className="w-full max-w-6xl rounded-2xl glassmorphism p-6">
            <table className="min-w-full bg-white/15 cursor-pointer">
              <thead className="bg-teal-900/50">
                <tr>
                  <th className="py-4 px-6 text-left text-white">Job Title</th>
                  <th className="py-4 px-6 text-left text-white">Company</th>
                  <th className="py-4 px-6 text-left text-white">Location</th>
                  <th className="py-4 px-6 text-left text-white">Experience</th>
                  <th className="py-4 px-6 text-left text-white">Status</th>
                  <th className="py-4 px-6 text-left text-white">Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-white/15 border-b border-white/20 transition-colors duration-300 hover:scale-y-95 backdrop-brightness-50"
                  >
                    <td className="py-4 px-6 font-semibold text-white/90">
                      {app.job?.title}
                    </td>
                    <td className="py-4 px-6 text-white/90">{app.job?.company}</td>
                    <td className="py-4 px-6 text-white/90">{app.job?.location}</td>
                    <td className="py-4 px-6 text-white/90">{app.job?.exp}</td>
                    <td className={`py-4 px-6 font-bold ${getStatusClass(app.status)}`}>
                      {app.status}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {app.status === "APPLIED" ? (
                        <button
                          onClick={() => setConfirmWithdrawId(app.id)}
                          className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500 transition-colors duration-300"
                        >
                          Withdraw
                        </button>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Popup */}
      {confirmWithdrawId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white/90 rounded-xl shadow-lg p-6 max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Confirm Withdraw</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to withdraw this application?
            </p>
            <div className="flex justify-center gap-4">
              {withdrawing ? (
                <div className="flex items-center justify-center w-full">
                  <div className="w-6 h-6 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="ml-3 text-gray-700">Processing...</span>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => handleWithdraw(confirmWithdrawId)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Yes, Withdraw
                  </button>
                  <button
                    onClick={() => setConfirmWithdrawId(null)}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
