import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import StatsCard from "../../components/StatsCard";
import StatsCards from "../../components/StatsCards";
import { Postjobs } from "./PostJob";

export const EmployerDashboard = () => {
  const [activeJobs, setActiveJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/jobs/my", { withCredentials: true });
        setActiveJobs(res.data);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      }
    };

    const fetchApplications = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/jobs/my", { withCredentials: true });
        setApplications(res.data);
      } catch (err) {
        console.error("Failed to fetch applications:", err);
      }
    };

    fetchJobs();
    fetchApplications();
  }, []);

  // Calculate metrics
  const pendingApplications = applications.filter(app => app.status === "UNDER_REVIEW" || app.status === "APPLIED");
  const hiredCandidates = applications.filter(app => app.status === "SELECTED");
  const totalApplications = applications;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br">
      {/* Animated Background */}
      <motion.img
        src="/images/emp-dash.png"
        className="w-full h-full object-cover blur-sm scale-110"
        alt="emp-dash"
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      />

      <motion.div
        className="absolute inset-0 z-10 gap-2 bg-black/40 backdrop-brightness-90 p-6"
        transition={{ duration: 1 }}
      >
        {/* Stats Cards Section */}
        <section className="mt-20">
        
           <StatsCards>
            {[
                { title: "Active Jobs", count: activeJobs.length },
                { title: "Pending Applications", count: pendingApplications.length },
                { title: "Hired Candidates", count: hiredCandidates.length },
                { title: "Total Applications", count: totalApplications.length },
            ].map((item) => (
                <motion.div
                key={item.title}
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 300 }}
                >
                <StatsCard title={item.title} count={item.count} />
                </motion.div>
            ))}
            </StatsCards>
        </section>
      </motion.div>
    </div>
  );
};
