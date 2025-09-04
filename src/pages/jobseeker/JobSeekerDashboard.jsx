import { motion } from "framer-motion";

export const JobSeekerDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 text-white p-8">
      {/* Header */}
      <motion.h1
        className="text-3xl font-bold mb-6 mt-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Jobseeker Dashboard
      </motion.h1>

      {/* Dashboard Image / Banner */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="rounded-xl overflow-hidden shadow-lg"
      >
        <img
          src="/images/job-dashboard.png"
          alt="Job Dashboard"
          className="w-full h-64 object-cover"
        />
      </motion.div>

      {/* Example sections */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold mb-2">📌 Saved Jobs</h2>
          <p className="text-sm text-gray-300">You haven’t saved any jobs yet.</p>
        </motion.div>

        <motion.div
          className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-2">📄 Applications</h2>
          <p className="text-sm text-gray-300">No applications submitted yet.</p>
        </motion.div>
      </div>
    </div>
  );
};
