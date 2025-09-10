import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const ViewJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
    const [sortBy, setSortBy] = useState("");
    const navigate = useNavigate();

    // Fetch jobs from backend
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/jobs", { withCredentials: true });
                setJobs(res.data);
            } catch (error) {
                toast.error("Error fetching jobs");
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    // Debounce search input
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500); // 500ms delay

        return () => clearTimeout(handler); // Cleanup on next effect
    }, [searchTerm]);

    // Filter and sort jobs
    const filteredJobs = jobs
        .filter(job =>
            job.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            job.company.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            job.location.toLowerCase().includes(debouncedSearch.toLowerCase())
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
            {/* Background Image */}
            <motion.img
                src="/images/post-job.png"
                alt="view jobs"
                className="fixed top-0 left-0 h-full w-full object-cover blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            />

            {/* Overlay */}
            <div className="relative z-10 min-h-screen p-8 flex flex-col items-center bg-black/70">
                
                {/* Heading */}
                <h1 className="text-white text-4xl font-bold mb-8 text-center">Active Jobs</h1>

                {/* Search and Sort */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full max-w-6xl">
                    <input
                        type="text"
                        placeholder="Search by title, company, or location"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2 rounded w-full sm:w-2/3 text-black"
                    />
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="p-2 rounded w-full sm:w-1/3 text-black"
                    >
                        <option value="">Sort By</option>
                        <option value="title">Title</option>
                        <option value="company">Company</option>
                        <option value="salary">Salary</option>
                        <option value="exp">Experience</option>
                    </select>
                </div>

                {/* Jobs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-6xl">
                    {loading ? (
                        <p className="text-white col-span-full text-xl text-center">Loading jobs...</p>
                    ) : filteredJobs.length === 0 ? (
                        <p className="text-white col-span-full text-xl text-center">No jobs found.</p>
                    ) : (
                        filteredJobs.map((job) => (
                            <motion.div
                                key={job.id}
                                className="bg-white/20 p-8 rounded-xl text-white cursor-pointer shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-white/25"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => navigate(`/jobs/${job.id}`)}
                            >
                                <h2 className="text-2xl mb-2 text-emerald-400 font-mono font-extrabold">{job.title}</h2>
                                <p className="text-lg font-medium text-yellow-300 mb-1">{job.company}</p>
                                <p className="text-gray-400 text-sm mb-2">{job.location}</p>
                                <p className="text-gray-300 mb-2"><span className="font-semibold">Description:</span> {job.description}</p>
                                <div className="flex justify-between text-gray-200 text-sm mt-2">
                                    <p><span className="font-semibold">Salary:</span> {job.salary}</p>
                                    <p className="text-red-500"><span className="font-semibold">Experience:</span> {job.exp}</p>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
