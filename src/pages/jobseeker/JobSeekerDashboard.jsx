import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export const JobSeekerDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/applications/my", { withCredentials: true })
      .then((res) => {
        // Normalize API response
        const apps = Array.isArray(res.data)
          ? res.data
          : res.data?.applications || [];
        setApplications(apps);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const statuses = [
    {
      key: "APPLIED",
      label: "Applied",
      border: "border-blue-500",
      text: "text-blue-500",
    },
    {
      key: "UNDER_REVIEW",
      label: "Under Review",
      border: "border-yellow-500",
      text: "text-yellow-500",
    },
    {
      key: "SELECTED",
      label: "Selected",
      border: "border-green-500",
      text: "text-green-500",
    },
    {
      key: "REJECTED",
      label: "Rejected",
      border: "border-red-500",
      text: "text-red-500",
    },
    {
      key: "WITHDRAWN",
      label: "Withdrawn",
      border: "border-gray-500",
      text: "text-gray-500",
    },
  ];

  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="relative w-full min-h-screen overflow-hidden p-6">
      {/* Animated background */}
      <motion.img
        src="/images/job-dashboard.png"
        alt="Job Dashboard"
        className="w-full h-full object-cover brightness-50 blur-sm absolute top-0 left-0 z-0"
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Dashboard Title */}
      <motion.h1
        className="text-3xl font-bold mb-6 mt-20 text-center text-white z-10 relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Jobseeker Dashboard
      </motion.h1>

      {/* Status Summary Cards */}
      <motion.div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4 z-10 relative">
        {statuses.map((status, i) => (
          <motion.div
            key={status.key}
            className={`border-2 ${status.border} bg-white/10 text-center p-4 rounded-xl shadow-md  transition-transform cursor-pointer`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * i }}
          >
            <h2 className={`text-2xl font-bold ${status.text}`}>
              {status.key === "APPLIED"
                ? applications.length
                : statusCounts[status.key] || 0}
            </h2>
            <p className={`capitalize ${status.text}`}>{status.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Applications */}
      <motion.div
        className="mt-8 bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 z-10 relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-xl text-white font-semibold mb-2">
          Recent Applications
        </h2>

        {loading ? (
          <p className="text-sm text-gray-300">Loading applications...</p>
        ) : applications.length === 0 ? (
          <p className="text-sm text-gray-300">No applications submitted yet.</p>
        ) : (
          <ul className="text-gray-100">
            {applications.slice(0, 5).map((app) => (
              <li key={app.id} className="mb-1">
                {app.jobTitle} - {app.status.replaceAll("_", " ")}
              </li>
            ))}
            {applications.length > 5 && (
              <li className="text-sm text-gray-400">
                +{applications.length - 5} more
              </li>
            )}
          </ul>
        )}
      </motion.div>
    </div>
  );
};
