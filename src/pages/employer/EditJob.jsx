import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

export const EditJob = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const jobId = queryParams.get("id");

  const schema = yup.object().shape({
    title: yup.string().required("Job title is required"),
    description: yup.string().required("Job description is required"),
    location: yup.string().required("Job location is required"),
    company: yup.string().required("Company name is required"),
    salary: yup.number().typeError("Salary must be a number").required("Salary is required"),
    exp: yup.number().typeError("Experience must be a number").required("Experience is required"),
    status: yup.string().oneOf(["OPEN", "CLOSED"]).required("Status is required")
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!jobId) return;
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/jobs/${jobId}`, { withCredentials: true });
        reset(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load job details.");
      }
    };
    fetchJob();
  }, [jobId, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    if (!data.status) data.status = "OPEN";

    try {
      await axios.put(`http://localhost:8080/api/jobs/${jobId}`, data, { withCredentials: true });
      toast.success("Job updated successfully!");
     
      setTimeout(() => navigate("/manage-jobs"), 1000);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full flex items-start justify-center bg-gray-900 overflow-hidden pt-16 sm:pt-20 lg:pt-24 pb-6 min-h-[80vh] px-4 sm:px-6 lg:px-8">
      
      <motion.img
        src="/images/post-job.png"
        alt="post-job"
        className="absolute h-full w-full object-cover scale-110 blur-sm"
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div className="absolute inset-0 bg-black/50" />

     
      <div className="relative z-10 w-full max-w-sm sm:max-w-md lg:max-w-lg p-4 sm:p-6 lg:p-8 glassmorphism rounded-xl shadow-xl backdrop-blur-md bg-white/10 border border-white/20">
        <motion.h1 className="text-white text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">Edit Job</motion.h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 sm:gap-4">
          <input {...register("title")} placeholder="Job Title" className="input-field w-full p-3 bg-white/10 border border-white/30 rounded-xl placeholder-white/70 text-white focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all text-sm sm:text-base" />
          {errors.title && <p className="text-red-400 text-sm">{errors.title.message}</p>}

          <textarea {...register("description")} placeholder="Description" rows={3} className="input-field w-full p-3 bg-white/10 border border-white/30 rounded-xl placeholder-white/70 text-white focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all text-sm sm:text-base resize-none" />
          {errors.description && <p className="text-red-400 text-sm">{errors.description.message}</p>}

          <input {...register("location")} placeholder="Location" className="input-field w-full p-3 bg-white/10 border border-white/30 rounded-xl placeholder-white/70 text-white focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all text-sm sm:text-base" />
          {errors.location && <p className="text-red-400 text-sm">{errors.location.message}</p>}

          <input {...register("company")} placeholder="Company" className="input-field w-full p-3 bg-white/10 border border-white/30 rounded-xl placeholder-white/70 text-white focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all text-sm sm:text-base" />
          {errors.company && <p className="text-red-400 text-sm">{errors.company.message}</p>}

          <input {...register("salary")} type="number" placeholder="Salary" className="input-field w-full p-3 bg-white/10 border border-white/30 rounded-xl placeholder-white/70 text-white focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all text-sm sm:text-base" />
          {errors.salary && <p className="text-red-400 text-sm">{errors.salary.message}</p>}

          <input {...register("exp")} type="number" placeholder="Experience" className="input-field w-full p-3 bg-white/10 border border-white/30 rounded-xl placeholder-white/70 text-white focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all text-sm sm:text-base" />
          {errors.exp && <p className="text-red-400 text-sm">{errors.exp.message}</p>}

          <select {...register("status")} className="input-field w-full p-3 bg-white/10 border border-white/30 rounded-xl placeholder-white/20 text-white focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all text-sm sm:text-base">
            <option value="OPEN" className="text-black">Open</option>
            <option value="CLOSED" className="text-black">Closed</option>
          </select>

          <button type="submit" disabled={loading} className="w-full py-3 mt-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base">
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
         toastClassName="!mt-16 sm:!mt-20 lg:!mt-20 !z-[10050]"
      />
    </div>
  );
};