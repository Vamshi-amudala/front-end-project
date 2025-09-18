import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import StatsCard from "../../components/StatsCard";
import StatsCards from "../../components/StatsCards";
import { useNavigate } from "react-router-dom";

export const EmployerDashboard = () => {
  const navigate = useNavigate();
  const [activeJobs, setActiveJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/jobs/my", {
          withCredentials: true,
        });
        setActiveJobs(res.data);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      }
    };

    const fetchApplications = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/applications/employer",
          { withCredentials: true }
        );
        setApplications(res.data);
      } catch (err) {
        console.error("Failed to fetch applications:", err);
      }
    };

    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:8080/users/profile", {
          withCredentials: true,
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchJobs();
    fetchApplications();
    fetchProfile();
  }, []);

  const pendingApplications = applications.filter(
    (app) => app.status === "UNDER_REVIEW" || app.status === "APPLIED"
  );
  const hiredCandidates = applications.filter(
    (app) => app.status === "SELECTED"
  );
  const totalApplications = applications;

  return (
    <div className="relative w-full min-h-screen overflow-y-auto bg-gradient-to-br">
      {/* Background */}
      <motion.img
        src="/images/emp-dash.png"
        className="fixed inset-0 w-full h-full object-cover blur-sm scale-110"
        alt="emp-dash"
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Overlay + Content */}
      <motion.div
        className="relative z-10 gap-4 bg-black/40 backdrop-brightness-90 p-4 sm:p-6 lg:p-8"
        transition={{ duration: 1 }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-2xl sm:text-3xl lg:text-4xl text-white font-extrabold mb-4 sm:mb-6 mt-16 sm:mt-18 lg:mt-20 text-center px-2"
        >
          Welcome back, {profile?.fullName || "Employer"}!
        </motion.h1>

        {/* Stats Section */}
        <section className="mb-4 sm:mb-6">
          <StatsCards>
            {[
              { title: "Active Jobs", count: activeJobs.length, color: "gray" },
              {
                title: "Pending Applications",
                count: pendingApplications.length,
                color: "orange",
              },
              {
                title: "Hired Candidates",
                count: hiredCandidates.length,
                color: "green",
              },
              {
                title: "Total Applications",
                count: totalApplications.length,
                color: "blue",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <StatsCard
                  title={item.title}
                  count={item.count}
                  color={item.color}
                />
              </motion.div>
            ))}
          </StatsCards>
        </section>

        <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mt-6 sm:mt-8 text-center font-serif px-2">
          Here's a snapshot of your hiring progress. Stay on top of your
          applications and active jobs!
        </p>

        {/* Profile Section */}
        {profile && (
          <motion.div
            className="text-center p-1 text-gray-300 flex flex-col items-center font-mono rounded-lg w-full h-full max-w-xs sm:max-w-md lg:max-w-lg mx-auto mt-6 sm:mt-8 px-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold bg-white/10 rounded-xl hover:scale-105 duration-500 cursor-pointer p-3 sm:p-4">
              {profile.fullName}
            </h2>
            {profile.companyName && (
              <p className="text-lg sm:text-xl lg:text-2xl mt-2 sm:mt-3">
                {profile.companyName}
              </p>
            )}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-5 font-sans justify-center w-full">
              <button
                onClick={() => navigate("/profile")}
                className="px-3 sm:px-4 py-2 border-2 border-teal-700 rounded-lg hover:bg-teal-500 hover:scale-105 transition-transform duration-1000 text-white text-sm sm:text-base w-full sm:w-auto"
              >
                View Full Profile
              </button>
              <button
                onClick={() => navigate("/profile/edit")}
                className="px-3 sm:px-4 py-2 border-2 border-yellow-600 rounded-lg hover:bg-orange-600 hover:scale-105 transition-transform duration-1000 text-white text-sm sm:text-base w-full sm:w-auto"
              >
                Update Profile
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
