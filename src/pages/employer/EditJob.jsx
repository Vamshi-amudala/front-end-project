import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from "react-router-dom";

export const EditJob = () => {
//   const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const jobId = queryParams.get("id"); // Get job ID from URL

  const resolver = yupResolver(
    yup.object().shape({
      title: yup.string().required("Job title is required"),
      description: yup.string().required("Job description is required"),
      location: yup.string().required("Job location is required"),
      company: yup.string().required("Company name is required"),
      salary: yup.string().required("Salary is required"),
      exp: yup.string().required("Experience is required"),
      status: yup.string()
    })
  );

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver });
  const [loading, setLoading] = useState(false);

  // Fetch existing job data
  useEffect(() => {
    if (jobId) {
      axios.get(`http://localhost:8080/api/jobs/${jobId}`, { withCredentials: true })
        .then(res => {
          reset(res.data); // Populate form with fetched data
        })
        .catch(() => toast.error("Failed to load job details."));
    }
  }, [jobId, reset]);

  const onSubmit = async (data) => {
    if (!data.status) data.status = "OPEN";
    setLoading(true);
    try {
      await axios.put(`http://localhost:8080/api/jobs/${jobId}`, data, { withCredentials: true });
      toast.success("Job updated successfully!");
      navigate("/manage-jobs"); // Redirect to job list after edit
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gray-900 flex items-center justify-center">
      {/* Background */}
      <motion.img
        src="/images/post-job.png"
        alt="post-job"
        className="absolute h-full w-full object-cover scale-110 blur-sm"
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div className="absolute inset-0 bg-black/50 backdrop-brightness-100" transition={{ duration: 1 }} />

      {/* Form */}
      <div className="relative z-10 w-full max-w-md p-8 glassmorphism rounded-2xl shadow-xl backdrop-blur-md bg-white/10 border border-white/20 mt-10">
        <motion.h1 className="text-white text-3xl font-bold text-center mb-6">
          Edit Job
        </motion.h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <input {...register("title")} placeholder="Job Title"
            className="w-full p-3 bg-white/10 border border-white/30 rounded-xl placeholder-white/70 text-white focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all" />
          {errors.title && <p className="text-red-400 text-sm">{errors.title.message}</p>}

          <textarea {...register("description")} placeholder="Description" rows={4}
            className="w-full p-3 bg-white/10 border border-white/30 rounded-xl placeholder-white/70 text-white focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all" />
          {errors.description && <p className="text-red-400 text-sm">{errors.description.message}</p>}

          <input {...register("location")} placeholder="Location"
            className="w-full p-3 bg-white/10 border border-white/30 rounded-xl placeholder-white/70 text-white focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all" />
          {errors.location && <p className="text-red-400 text-sm">{errors.location.message}</p>}

          <input {...register("company")} placeholder="Company"
            className="w-full p-3 bg-white/10 border border-white/30 rounded-xl placeholder-white/70 text-white focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all" />
          {errors.company && <p className="text-red-400 text-sm">{errors.company.message}</p>}

          <input {...register("salary")} type="number" placeholder="Salary"
            className="w-full p-3 bg-white/10 border border-white/30 rounded-xl placeholder-white/70 text-white focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all" />
          {errors.salary && <p className="text-red-400 text-sm">{errors.salary.message}</p>}

          <input {...register("exp")} type="number" placeholder="Experience"
            className="w-full p-3 bg-white/10 border border-white/30 rounded-xl placeholder-white/70 text-white focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all" />
          {errors.exp && <p className="text-red-400 text-sm">{errors.exp.message}</p>}

          <select {...register("status")}
            className="w-full p-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all">
            <option value="OPEN">Open</option>
            <option value="CLOSED">Closed</option>
          </select>

          <button type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? "Updating..." : "Update Job"}
          </button>
        </form>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};
