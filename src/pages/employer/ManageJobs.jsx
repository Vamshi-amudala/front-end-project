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
        initial={{ scale:1.4}}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease:"easeInOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
      />
      <motion.div className="absolute inset-0 bg-black/40 backdrop-brightness-90"></motion.div>

      {/* Content */}
      <div className="absolute inset-0 p-10 overflow-auto mt-10">
        <motion.h1 className="text-4xl text-white font-bold mb-6 text-center mt-3 font-serif"
        initial={{ y:-50, opacity: 0.5 }}
        animate={{ y:0, opacity: 1 }}
        transition={{ duration: 1 }}
        >Manage Jobs</motion.h1>

        {loading && <p className="text-white">Loading jobs...</p>}
        {!loading && !jobs.length && <p className="text-gray-300">You haven’t posted any jobs yet.</p>}

        <div className="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-5  ">
          {jobs.map(job => (
           <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeInOut" }}
  key={job.id}
  className="border-gray-300 filter p-10 cursor-pointer hover:scale-105 transition-transform glassmorphism rounded-2xl shadow-xl bg-white/15 border-white/40 backdrop-blur-lg"
  whileHover={{ scale: 1.05 }}
  onClick={() => setSelectedJob(job)}
>
  {/* Job Title */}
  <h2 className="text-2xl font-bold text-slate-100 font-sans tracking-wide">
    {job.title}{" "}
    <small
      className={
        job.status === "OPEN"
          ? "text-emerald-400 drop-shadow-[0_0_6px_rgba(16,185,129,0.6)]"
          : "text-red-400"
      }
    >
      ({job.status})
    </small>
  </h2>

  {/* Company & Package */}
  <p className="mt-3">
    <span className="text-gray-400 font-semibold">Company:</span>{" "}
    <span className="text-slate-100">{job.company}</span> |{" "}
    <span className="text-gray-400 font-semibold">Package:</span>{" "}
    <span className="text-emerald-300 font-medium">{job.salary}</span>
  </p>

  {/* Location & Experience */}
  <p className="mt-1">
    <span className="text-gray-400 font-semibold">Location:</span>{" "}
    <span className="text-slate-100">{job.location}</span> |{" "}
    <span className="text-gray-400 font-semibold">Experience:</span>{" "}
    <span className="text-sky-300 font-medium">{job.exp} yrs</span>
  </p>

  {/* Requirements */}
  <p className="mt-3 leading-relaxed">
    <span className="text-gray-300 font-bold">Requirements:</span>{" "}
    <span className="text-gray-200 font-sans">{job.description}</span>
  </p>
</motion.div>

          ))}
        </div>
      </div>

      {/* Job Detail Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex justify-center items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 max-w-md w-full shadow-2xl text-white font-serif"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <h2 className="text-2xl font-bold mb-4">{selectedJob.title}</h2>
              <p><strong>Company:</strong> <span className="text-gray-300">{selectedJob.company}</span></p>
              <p><strong>Location:</strong> <span className="text-gray-300">{selectedJob.location}</span></p>
              <p><strong>Experience:</strong> <span className="text-gray-300">{selectedJob.exp}</span> yrs</p>
              <p><strong>Salary:</strong> <span className="text-gray-300">₹{selectedJob.salary}</span></p>
              <p><strong>Status:</strong> <span className="text-gray-300">{selectedJob.status}</span></p>

              <div className="mt-6 flex gap-3 flex-wrap p-5 font-serif">
                {selectedJob.status !== "OPEN" && (
                  <button
                    className="bg-transparent text-white px-4 py-2 rounded-xl hover:bg-green-600 border-2 border-green-500"
                    onClick={() => updateStatus(selectedJob.id, "OPEN")}
                  >
                    Mark Open
                  </button>
                )}
                {selectedJob.status !== "CLOSED" && (
                  <button
                    className="bg-transparent border-2 border-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
                    onClick={() => updateStatus(selectedJob.id, "CLOSED")}
                  >
                    Mark Closed
                  </button>
                )}
                <button
                  className="bg-transparent border-2 border-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600"
                  onClick={() => navigate(`/edit-job?id=${selectedJob.id}`)}
                >
                  Edit Details
                </button>

                <button
                  className="border-gray-400 bg-transparent border-2 text-white px-4 py-2 rounded-xl hover:bg-teal-500"
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
