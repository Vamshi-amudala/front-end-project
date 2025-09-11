import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch profile once when component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8080/users/profile", {
          withCredentials: true,
        });
        setProfile(response.data);
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <p className="text-white text-lg">Loading profile...</p>;
  if (!profile) return <p className="text-white text-lg">No profile found</p>;

  return (
    <div className="relative h-full w-full overflow-y-auto p-6 ">
      {/* Background animation */}
      <motion.img
        src="/images/profile.png"
        className="h-full w-full object-cover fixed blur-sm brightness-50"
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 12,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        alt="background"
      />

      {/* Profile info card */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-white backdrop-brightness-50 ">
        <motion.div
          className=" p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto scrollbar-hide"
          initial={{ opacity: 0.25 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeIn" }}
        >
          <h1 className="text-center text-4xl font-bold mb-5 p-2 font-mono">Profile</h1>
          <div className="text-white space-y-4 text-xl">
            {/* Full Name */}
            <div className="grid grid-cols-[150px_auto] gap-2">
              <span className="text-emerald-500 font-semibold font-mono">Full name :</span>
              <span>{profile.fullName}</span>
            </div>
            {/* Email */}
            <div className="grid grid-cols-[150px_auto] gap-2">
              <span className="text-emerald-500 font-semibold font-mono">Email :</span>
              <span>{profile.email}</span>
            </div>
            {/* Phone */}
            <div className="grid grid-cols-[150px_auto] gap-2">
              <span className="text-emerald-500 font-semibold font-mono">Phone :</span>
              <span>{profile.phone}</span>
            </div>
            {/* Address */}
            <div className="grid grid-cols-[150px_auto] gap-2">
              <span className="text-emerald-500 font-semibold font-mono">Address :</span>
              <span>{profile.address}</span>
            </div>
            {/* Education */}
            <div className="grid grid-cols-[150px_auto] gap-2">
              <span className="text-emerald-500 font-semibold font-mono">Education :</span>
              <span>{profile.education}</span>
            </div>
            {/* Experience */}
            <div className="grid grid-cols-[150px_auto] gap-2">
              <span className="text-emerald-500 font-semibold font-mono">Experience :</span>
              <span>{profile.exp}</span>
            </div>
            {/* Skills */}
            <div className="grid grid-cols-[150px_auto] gap-2">
              <span className="text-emerald-500 font-semibold font-mono">Skills :</span>
              <div className="flex flex-wrap gap-2">
                {profile.skills && profile.skills.length > 0 ? (
                  profile.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-emerald-600/30 text-emerald-300 px-2 py-1 rounded-lg text-sm"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span>No skills yet</span>
                )}
              </div>
            </div>
            {/* Projects */}
            <div className="grid grid-cols-[150px_auto] gap-2">
              <span className="text-emerald-500 font-semibold font-mono">Projects :</span>
              <div className="space-y-3">
                {profile.projects && profile.projects.length > 0 ? (
                  profile.projects.map((project, i) => (
                    <div key={i} className="p-3 border border-white/10 rounded-lg bg-black/20">
                      <p className="font-bold text-emerald-400">{project.projectName}</p>
                      <p className="text-sm text-gray-300">{project.description}</p>
                    </div>
                  ))
                ) : (
                  <span>No projects yet</span>
                )}
              </div>
            </div>
          </div>

          {/* Update Profile Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => navigate("/job-profile/edit")}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg"
            >
              Update Profile
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
