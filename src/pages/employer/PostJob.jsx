import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Postjobs = () => {
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

  const onSubmit = async (data) => {
    if (!data.status) data.status = "OPEN";
    try {
      await axios.post("http://localhost:8080/api/jobs", data, { withCredentials: true });
      
      toast.success("Job posted successfully!");

      reset(); 
      
      document.querySelector('input[name="title"]')?.focus();

    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">

      <motion.img
        src="/images/post-job.png"
        alt="post-job"
        className="absolute h-full w-full object-cover scale-110 blur-sm"
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      />

      <motion.div className="absolute inset-0 bg-black/50 backdrop-brightness-100" transition={{ duration: 1 }} />

      <div className="relative z-10 w-full max-w-sm sm:max-w-md lg:max-w-lg p-6 sm:p-8 lg:p-10 glassmorphism rounded-2xl shadow-xl backdrop-blur-md bg-white/10 border border-white/20 mt-16 sm:mt-12 lg:mt-10">
        <motion.h1 className="text-white text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">
          Post a Job
        </motion.h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 sm:gap-4">
          <input {...register("title")} placeholder="Job Title"
            className="w-full p-3 bg-white/10 border border-white/30 rounded-xl placeholder-white/70 text-white focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all text-sm sm:text-base" />
          {errors.title && <p className="text-red-400 text-sm">{errors.title.message}</p>}

          <input {...register("description")} placeholder="Description"
            className="w-full p-3 bg-white/10 border border-white/30 rounded-xl placeholder-white/70 text-white focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all text-sm sm:text-base" />
          {errors.description && <p className="text-red-400 text-sm">{errors.description.message}</p>}

          <input {...register("location")} placeholder="Location"
            className="w-full p-3 bg-white/10 border border-white/30 rounded-xl placeholder-white/70 text-white focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all text-sm sm:text-base" />
          {errors.location && <p className="text-red-400 text-sm">{errors.location.message}</p>}

          <input {...register("company")} placeholder="Company"
            className="w-full p-3 bg-white/10 border border-white/30 rounded-xl placeholder-white/70 text-white focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all text-sm sm:text-base" />
          {errors.company && <p className="text-red-400 text-sm">{errors.company.message}</p>}

          <input {...register("salary")} placeholder="Salary"
            className="w-full p-3 bg-white/10 border border-white/30 rounded-xl placeholder-white/70 text-white focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all text-sm sm:text-base" />
          {errors.salary && <p className="text-red-400 text-sm">{errors.salary.message}</p>}

          <input {...register("exp")} placeholder="Experience"
            className="w-full p-3 bg-white/10 border border-white/30 rounded-xl placeholder-white/70 text-white focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all text-sm sm:text-base" />
          {errors.exp && <p className="text-red-400 text-sm">{errors.exp.message}</p>}

          <button type="submit"
            className="w-full py-3 mt-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform text-sm sm:text-base">
            Post Job
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