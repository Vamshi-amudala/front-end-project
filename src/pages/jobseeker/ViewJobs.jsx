import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ViewJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/applications/available", {
          withCredentials: true,
        });
        setJobs(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching available jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs
    .filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "company") return a.company.localeCompare(b.company);
      if (sortBy === "salary") return Number(a.salary) - Number(b.salary);
      if (sortBy === "exp") return Number(a.exp) - Number(b.exp);
      return 0;
    });

  return (
    <div className="relative h-full w-full overflow-auto">
      <motion.img
        src="/images/post-job.png"
        alt="view jobs"
        className="fixed h-full w-full object-cover blur-sm brightness-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <div className="relative z-10 min-h-screen p-8 flex flex-col items-center">
        <h1 className="text-white text-4xl font-mono font-extrabold mb-8 text-center tracking-wide mt-12">
          Active Jobs
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full max-w-6xl">
          <input
            type="text"
            placeholder=" Search by title, company, or location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-3 rounded-lg w-full sm:w-2/3 bg-gray-200 text-black shadow focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-3 rounded-lg w-full sm:w-1/3 text-black shadow focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-gray-200"
          >
            <option value="">Sort By</option>
            <option value="title">Title</option>
            <option value="company">Company</option>
            <option value="salary">Salary</option>
            <option value="exp">Experience</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-8 w-full max-w-6xl">
          {loading ? (
            <p className="text-white col-span-full text-xl text-center">Loading jobs...</p>
          ) : filteredJobs.length === 0 ? (
            <p className="text-white col-span-full text-xl text-center">No jobs found.</p>
          ) : (
            filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                className="bg-white/15 p-6 rounded-xl text-white cursor-pointer shadow-lg backdrop-blur-md transform transition-transform duration-300 hover:scale-105 hover:bg-white/20 hover:z-10 relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => navigate(`/job-card/${job.id}`)}
              >
                <h2 className="text-2xl mb-2 text-emerald-400 font-mono font-extrabold">
                  {job.title}
                </h2>
                <p className="text-lg font-medium text-yellow-300 mb-1">{job.company}</p>
                <p className="text-gray-300 text-sm mb-3">{job.location}</p>
                <p className="text-gray-200 text-sm mb-3 line-clamp-4">
                  <span className="font-semibold">Description: </span>
                  {job.description}
                </p>

                <div className="flex justify-between items-center text-gray-100 text-sm mt-4">
                  <p className="bg-emerald-600/40 px-3 py-1 rounded-full text-sm">
                    Salary: {job.salary}
                  </p>
                  <p className="bg-red-600/40 px-3 py-1 rounded-full text-sm">
                    Exp: {job.exp} yrs
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
