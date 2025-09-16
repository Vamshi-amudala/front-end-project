import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ManageJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/jobs/my", { withCredentials: true })
      .then(res => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load jobs.");
        setLoading(false);
      });
  }, []);

  const updateStatus = (jobId, status) => {
    axios.put(`/api/jobs/${jobId}/status?status=${status}`, {}, { withCredentials: true })
      .then(() => {
        setJobs(jobs.map(job => job.id === jobId ? { ...job, status } : job));
        if (selectedJob) setSelectedJob({ ...selectedJob, status });
      })
      .catch(() => alert("Failed to update status."));
  };

  return (
    <div className="relative min-h-screen w-screen overflow-hidden">
      <motion.img
        src="/images/manage-jobs.png"
        alt="manage-jobs"
        className="absolute inset-0 w-full h-full object-cover blur-sm"
        initial={{ scale: 1.4 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
      />
      <motion.div className="absolute inset-0 bg-black/40 backdrop-brightness-90"></motion.div>

      <div className="absolute inset-0 p-4 sm:p-6 lg:p-10 overflow-auto mt-16 sm:mt-12 lg:mt-10">
        <motion.h1 
          className="text-2xl sm:text-3xl lg:text-4xl text-white font-bold mb-4 sm:mb-6 text-center mt-2 sm:mt-3 font-serif"
          initial={{ y: -50, opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Manage Jobs
        </motion.h1>

        {loading && <p className="text-white text-center">Loading jobs...</p>}
        {!loading && !jobs.length && <p className="text-gray-300 text-center">You haven't posted any jobs yet.</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 p-2 sm:p-5">
          {jobs.map(job => (
            <motion.div
              key={job.id}
              className="p-6 sm:p-8 lg:p-10 cursor-pointer rounded-2xl shadow-xl bg-white/15 border border-white/40 backdrop-blur-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={() => setSelectedJob(job)}
            >
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-100 font-sans tracking-wide">
                {job.title}{" "}
                <small
                  className={job.status === "OPEN"
                    ? "text-emerald-400 drop-shadow-[0_0_6px_rgba(16,185,129,0.6)]"
                    : "text-red-400"}
                >
                  ({job.status})
                </small>
              </h2>

              <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-200">
                <span className="text-gray-400 font-semibold">Company:</span>{" "}
                <span className="text-slate-100">{job.company}</span> |{" "}
                <span className="text-gray-400 font-semibold">Package:</span>{" "}
                <span className="text-emerald-300 font-medium">{job.salary}</span>
              </p>

              <p className="mt-1 text-sm sm:text-base text-gray-200">
                <span className="text-gray-400 font-semibold">Location:</span>{" "}
                <span className="text-slate-100">{job.location}</span> |{" "}
                <span className="text-gray-400 font-semibold">Experience:</span>{" "}
                <span className="text-sky-300 font-medium">{job.exp} yrs</span>
              </p>

              <p className="mt-2 sm:mt-3 leading-relaxed text-sm sm:text-base text-gray-200">
                <span className="text-gray-300 font-bold">Requirements:</span>{" "}
                {job.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedJob && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex justify-center items-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 max-w-sm sm:max-w-md lg:max-w-lg w-full shadow-2xl text-white font-serif max-h-[90vh] overflow-y-auto"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-4">{selectedJob.title}</h2>
              <div className="text-sm sm:text-base space-y-2">
                <p><strong>Company:</strong> <span className="text-gray-300">{selectedJob.company}</span></p>
                <p><strong>Location:</strong> <span className="text-gray-300">{selectedJob.location}</span></p>
                <p><strong>Experience:</strong> <span className="text-gray-300">{selectedJob.exp}</span> yrs</p>
                <p><strong>Salary:</strong> <span className="text-gray-300">₹{selectedJob.salary}</span></p>
                <p><strong>Status:</strong> <span className="text-gray-300">{selectedJob.status}</span></p>
              </div>

              <div className="mt-4 sm:mt-6 flex gap-2 sm:gap-3 flex-wrap p-2 sm:p-5 font-serif">
                {selectedJob.status !== "OPEN" && (
                  <button
                    className="bg-transparent text-white px-3 sm:px-4 py-2 rounded-xl hover:bg-green-600 border-2 border-green-500 text-xs sm:text-sm"
                    onClick={() => updateStatus(selectedJob.id, "OPEN")}
                  >
                    Mark Open
                  </button>
                )}
                {selectedJob.status !== "CLOSED" && (
                  <button
                    className="bg-transparent border-2 border-red-500 text-white px-3 sm:px-4 py-2 rounded-xl hover:bg-red-600 text-xs sm:text-sm"
                    onClick={() => updateStatus(selectedJob.id, "CLOSED")}
                  >
                    Mark Closed
                  </button>
                )}
                <button
                  className="bg-transparent border-2 border-orange-500 text-white px-3 sm:px-4 py-2 rounded-xl hover:bg-orange-600 text-xs sm:text-sm"
                  onClick={() => navigate(`/edit-job?id=${selectedJob.id}`)}
                >
                  Edit Details
                </button>

                <button
                  className="border-gray-400 bg-transparent border-2 text-white px-3 sm:px-4 py-2 rounded-xl hover:bg-teal-500 text-xs sm:text-sm"
                  onClick={() => setSelectedJob(null)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};