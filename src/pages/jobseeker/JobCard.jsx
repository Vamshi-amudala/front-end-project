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
  const [showConfirm, setShowConfirm] = useState(false); // confirmation modal toggle

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
      setShowConfirm(false); // close modal after applying
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

      <div className="flex justify-center items-center mt-6 sm:mt-12">
        <div className="bg-white/15 p-4 sm:p-6 md:p-8 rounded-xl text-white shadow-lg backdrop-blur-md max-w-3xl w-full m-2 sm:m-4 z-10 mt-10 sm:mt-20">
          {loading ? (
            <p>Loading...</p>
          ) : job ? (
            <>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">{job.title}</h2>
              <p className="mb-2 text-sm sm:text-base">
                <strong>Company:</strong> {job.company}
              </p>
              <p className="mb-2 text-sm sm:text-base">
                <strong>Location:</strong> {job.location}
              </p>
              <p className="mb-2 text-sm sm:text-base">
                <strong>Salary:</strong> ${job.salary}
              </p>
              <p className="mb-2 text-sm sm:text-base">
                <strong>Experience Required:</strong> {job.exp} years
              </p>
              <p className="mb-4 text-sm sm:text-base">
                <strong>Description:</strong> {job.description}
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-5">
                <button
                  className="border-2 border-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg hover:scale-105 duration-300 transition-colors w-full sm:w-auto"
                  onClick={() => setShowConfirm(true)}
                  disabled={applying}
                >
                  <span className="animate-spin">
                    {applying ? "Applying...." : "Apply Now"}
                  </span>
                </button>
                <button
                  className="border-2 border-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg hover:scale-105 duration-300 transition-colors w-full sm:w-auto"
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

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
          <div className="bg-white/20 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-lg text-white max-w-md w-full">
            <h3 className="text-lg sm:text-xl font-bold mb-4">Confirm Application</h3>
            <p className="mb-6 text-sm sm:text-base">
              Your <strong>resume from profile</strong> will be used for this
              application. <br />
              Do you want to continue or update your resume first?
            </p>
            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
              <button
                className="border-2 border-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg order-3 sm:order-1"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="border-2 border-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 order-1 sm:order-2"
                onClick={handleApply}
                disabled={applying}
              >
                {applying && (
                  <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                )}
                {applying ? "Applying..." : "Yes, Apply"}
              </button>
              <button
                className="border-2 border-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg order-2 sm:order-3"
                onClick={() => navigate("/resume")}
              >
                Update Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};