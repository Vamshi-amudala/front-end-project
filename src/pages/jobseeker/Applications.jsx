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
    <div className="relative h-full w-full min-h-screen overflow-y-auto p-4 sm:p-6">
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
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center pt-20 sm:pt-24 lg:pt-28 mt-16 sm:mt-18 lg:mt-20 w-full px-2 sm:px-4">
        <motion.h1 
          className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 mt-20 sm:mt-32 lg:mt-40"
          initial={{opacity:0.7, y:-25}}
          animate={{opacity:1, y:0}}
          transition={{duration:0.8, ease:"easeIn"}}
        >
          My Applications
        </motion.h1>

        {loading ? (
          <p className="text-white text-lg sm:text-xl text-center">Loading applications...</p>
        ) : applications.length === 0 ? (
          <p className="text-white text-lg sm:text-xl text-center">No applications found.</p>
        ) : (
          <div className="w-full max-w-xs sm:max-w-4xl lg:max-w-6xl rounded-2xl glassmorphism p-3 sm:p-6">
            {/* Mobile Card View */}
            <div className="block sm:hidden space-y-3">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-white/15 rounded-lg p-4 border border-white/20"
                >
                  <div className="space-y-2">
                    <h3 className="font-semibold text-white text-lg">{app.job?.title}</h3>
                    <p className="text-white/90 text-sm">{app.job?.company}</p>
                    <p className="text-white/90 text-sm">{app.job?.location}</p>
                    <p className="text-white/90 text-sm">Experience: {app.job?.exp}</p>
                    <p className={`font-bold text-sm ${getStatusClass(app.status)}`}>
                      Status: {app.status}
                    </p>
                    <div className="pt-2">
                      {app.status === "APPLIED" ? (
                        <button
                          onClick={() => setConfirmWithdrawId(app.id)}
                          className="bg-red-400 text-white px-3 py-2 rounded text-sm hover:bg-red-500 transition-colors duration-300 w-full"
                        >
                          Withdraw
                        </button>
                      ) : (
                        <div className="text-center text-white/70 text-sm">-</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-full bg-white/15 cursor-pointer">
                <thead className="bg-teal-900/50">
                  <tr>
                    <th className="py-3 sm:py-4 px-3 sm:px-6 text-left text-white text-sm sm:text-base">Job Title</th>
                    <th className="py-3 sm:py-4 px-3 sm:px-6 text-left text-white text-sm sm:text-base">Company</th>
                    <th className="py-3 sm:py-4 px-3 sm:px-6 text-left text-white text-sm sm:text-base">Location</th>
                    <th className="py-3 sm:py-4 px-3 sm:px-6 text-left text-white text-sm sm:text-base">Experience</th>
                    <th className="py-3 sm:py-4 px-3 sm:px-6 text-left text-white text-sm sm:text-base">Status</th>
                    <th className="py-3 sm:py-4 px-3 sm:px-6 text-left text-white text-sm sm:text-base">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr
                      key={app.id}
                      className="hover:bg-white/15 border-b border-white/20 transition-colors duration-300 hover:scale-y-95 backdrop-brightness-50"
                    >
                      <td className="py-3 sm:py-4 px-3 sm:px-6 font-semibold text-white/90 text-sm sm:text-base">
                        {app.job?.title}
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6 text-white/90 text-sm sm:text-base">{app.job?.company}</td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6 text-white/90 text-sm sm:text-base">{app.job?.location}</td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6 text-white/90 text-sm sm:text-base">{app.job?.exp}</td>
                      <td className={`py-3 sm:py-4 px-3 sm:px-6 font-bold text-sm sm:text-base ${getStatusClass(app.status)}`}>
                        {app.status}
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-6 text-center">
                        {app.status === "APPLIED" ? (
                          <button
                            onClick={() => setConfirmWithdrawId(app.id)}
                            className="bg-red-400 text-white px-3 sm:px-4 py-2 rounded text-sm hover:bg-red-500 transition-colors duration-300"
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
          </div>
        )}
      </div>

      {/* Confirmation Popup */}
      {confirmWithdrawId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white/90 rounded-xl shadow-lg p-4 sm:p-6 max-w-xs sm:max-w-sm w-full text-center">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800">Confirm Withdraw</h2>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
              Are you sure you want to withdraw this application?
            </p>
            <div className="flex justify-center gap-3 sm:gap-4">
              {withdrawing ? (
                <div className="flex items-center justify-center w-full">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="ml-3 text-gray-700 text-sm sm:text-base">Processing...</span>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => handleWithdraw(confirmWithdrawId)}
                    className="bg-red-500 text-white px-3 sm:px-4 py-2 rounded text-sm sm:text-base hover:bg-red-600"
                  >
                    Yes, Withdraw
                  </button>
                  <button
                    onClick={() => setConfirmWithdrawId(null)}
                    className="bg-gray-300 text-gray-800 px-3 sm:px-4 py-2 rounded text-sm sm:text-base hover:bg-gray-400"
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