import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ViewApplicants = () => {
  const [applications, setApplications] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const employerId = localStorage.getItem("employerId");

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = () => {
    axios
      .get("/api/applications/employer", { withCredentials: true })
      .then((res) => {
        setApplications(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("❌ Failed to load applications.");
        setLoading(false);
      });
  };

  const updateStatus = (appId, newStatus) => {
    axios
      .put(
        `/api/applications/${appId}/status`,
        { status: newStatus },
        { withCredentials: true }
      )
      .then(() => {
        alert("✅ Status updated!");
        setApplications((prev) =>
          prev.map((a) =>
            a.id === appId ? { ...a, status: newStatus } : a
          )
        );
      })
      .catch((err) => {
        alert("❌ Failed: " + (err.response?.data || err.message));
      });
  };

  const handleViewResume = async (resumeUrl) => {
    if (!resumeUrl) return;

    const filename = resumeUrl.split('/').pop();
    const viewUrl = `/api/resume/view/${filename}`;

    try {
      const response = await fetch(viewUrl, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        }
      });

      if (!response.ok) {
        alert("❌ Failed to load resume.");
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => window.URL.revokeObjectURL(url), 1000);

    } catch (err) {
      console.error("Error viewing resume:", err);
      alert("❌ Error loading resume.");
    }
  };

  const jobTitles = [...new Set(applications.map((app) => app.job.title))];

  const filteredApps = applications.filter((app) => {
    const jobMatch = selectedJob ? app.job.title === selectedJob : true;
    const statusMatch = selectedStatus ? app.status === selectedStatus : true;
    return jobMatch && statusMatch;
  });

  const statusColors = {
    APPLIED: "bg-blue-200 text-blue-800",
    UNDER_REVIEW: "bg-yellow-200 text-yellow-800",
    SELECTED: "bg-green-200 text-green-800",
    REJECTED: "bg-red-200 text-red-800",
    WITHDRAWN: "bg-gray-200 text-gray-800",
  };

  return (
    <div className="relative w-full h-full min-h-screen overflow-hidden">
      <motion.img
        src="/images/view-applicants.png"
        alt="View Applicants"
        className="h-screen w-full object-cover blur-sm"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex flex-col items-center text-white p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <motion.div
          className="z-10 p-4 rounded-2xl shadow-lg mt-16 sm:mt-18 lg:mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            View Applicants
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-xl mx-auto">
            Manage and review all your job applications in one place.
          </p>
        </motion.div>

        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md sm:max-w-none justify-center">
          <select
            className="p-2 sm:p-3 rounded text-black font-bold font-mono bg-white text-sm sm:text-base w-full sm:w-auto"
            value={selectedJob}
            onChange={(e) => setSelectedJob(e.target.value)}
          >
            <option value="">All Jobs</option>
            {jobTitles.map((title) => (
              <option key={title} value={title} className="bg-white/30">
                {title}
              </option>
            ))}
          </select>

          <select
            className="p-2 sm:p-3 rounded text-black font-mono font-bold text-sm sm:text-base w-full sm:w-auto"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="" className="font-bold">All Statuses</option>
            {Object.keys(statusColors).map((status) => (
              <option key={status} value={status}>
                {status.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 sm:mt-6 w-full max-w-xs sm:max-w-2xl lg:max-w-4xl space-y-3 sm:space-y-4">
          {loading ? (
            <p className="text-center text-gray-300">Loading applications...</p>
          ) : filteredApps.length === 0 ? (
            <p className="text-center text-gray-300">
              No applications found for this filter.
            </p>
          ) : (
            filteredApps.map((app) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                key={app.id}
                className="glassmorphism bg-white/20 text-white rounded-lg p-4 sm:p-6 shadow-md"
                whileHover={{ scale: 1.02 }}
              >
                <h2 className="font-bold text-lg sm:text-xl mb-2">
                  {app.applicant.fullName}{" "}
                  <span className="text-gray-200 text-sm sm:text-base block sm:inline">
                    ({app.applicant.email})
                  </span>
                </h2>
                
                <div className="space-y-1 text-sm sm:text-base">
                  <p>📞 {app.applicant.phone}</p>
                  <p>🎓 {app.applicant.education}</p>
                  <p className="mt-2">
                    💼 <strong>{app.job.title}</strong> at{" "}
                    <strong>{app.job.company}</strong>
                  </p>
                  <p>
                    📍 {app.job.location} | 🕒 {app.job.exp} years
                  </p>
                </div>

                <div className="mt-3 font-semibold flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-sm sm:text-base">Current Status:</span>
                  <span
                    className={`px-2 py-1 rounded text-xs sm:text-sm w-fit ${
                      statusColors[app.status] || "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {app.status.replace("_", " ")}
                  </span>
                </div>

                <div className="mt-3">
                  <label className="block text-sm font-medium mb-1">
                    Update Status:
                  </label>
                  <select
                    className="p-2 rounded text-white font-mono w-full bg-white/20 text-sm sm:text-base"
                    defaultValue=""
                    onChange={(e) => {
                      if (e.target.value) updateStatus(app.id, e.target.value);
                      e.target.value = "";
                    }}
                  >
                    <option value="" disabled>
                      Select new status
                    </option>
                    {["UNDER_REVIEW", "SELECTED", "REJECTED"].map(
                      (status) =>
                        status !== app.status && (
                          <option key={status} value={status} className="font-mono text-black bg-white/30">
                            {status.replace("_", " ")}
                          </option>
                        )
                    )}
                  </select>
                </div>

                <a
                  href={`/api/resume/view/application/${app.resumeUrl.split('/').pop()}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-3 text-emerald-300 hover:underline cursor-pointer text-sm sm:text-base"
                >
                  📄 View Resume
                </a>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};