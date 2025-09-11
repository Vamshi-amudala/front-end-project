import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const JobCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/jobs/${id}`, {
          withCredentials: true,
        });
        setJob(res.data);
      } catch (error) {
        toast.error("Error fetching job details");
      } finally {
        setLoading(false);
      }
    };
    fetchJobDetails();
  }, [id]);

  const handleApply = async () => {
    if (!job) return;
    setApplying(true);
    try {
      await axios.post(
        "http://localhost:8080/api/applications/apply",
        { jobTitle: job.title },
        { withCredentials: true }
      );
      toast.success("Applied successfully!");
      navigate("/view-jobs");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Failed to apply");
      } else {
        toast.error("Network error. Try again later.");
      }
    } finally {
      setApplying(false);
    }
  };

  const handleCancel = () => {
    navigate("/view-jobs");
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <motion.img
        src="/images/faq-page.jpg"
        alt="job-card"
        className="fixed w-full h-full object-cover blur-sm brightness-50"
      />

      <div className="flex justify-center items-center mt-12">
        <div className="bg-white/15 p-8 rounded-xl text-white shadow-lg backdrop-blur-md max-w-3xl w-full m-4 z-10 mt-20">
          {loading ? (
            <p>Loading...</p>
          ) : job ? (
            <>
              <h2 className="text-3xl font-bold mb-4">{job.title}</h2>
              <p className="mb-2">
                <strong>Company:</strong> {job.company}
              </p>
              <p className="mb-2">
                <strong>Location:</strong> {job.location}
              </p>
              <p className="mb-2">
                <strong>Salary:</strong> ${job.salary}
              </p>
              <p className="mb-2">
                <strong>Experience Required:</strong> {job.exp} years
              </p>
              <p className="mb-4">
                <strong>Description:</strong> {job.description}
              </p>

              <div className="flex flex-row justify-center items-center gap-5">
                <button
                  className="border-2 border-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg hover:scale-105 duration-300 transition-colors"
                  onClick={handleApply}
                  disabled={applying}
                >
                  <span className="animate-spin">{applying ? "Applying...." : "Apply Now"}</span>
                </button>
                <button
                  className="border-2 border-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg hover:scale-105 duration-300 transition-colors"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <p>Job not found.</p>
          )}
        </div>
      </div>
    </div>
  );
};
