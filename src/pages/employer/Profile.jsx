import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProfile = async () => {
    try {
      const res = await axios.get("http://localhost:8080/users/profile", {
        withCredentials: true,
      });
      setProfile(res.data); // ✅ store profile in state
    } catch (err) {
      setError(err.response ? err.response.data : "Network Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <motion.img
        src="/images/about-page.jpg"
        alt="profile"
        className="h-full w-full object-cover blur-sm brightness-50"
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeInOut" ,repeat:Infinity, repeatType:"reverse"}}
      />

      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center mt-20 text-white p-4 overflow-y-auto">
        <motion.h1
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
          className="text-white text-5xl font-extrabold font-mono"
        >
          Profile
        </motion.h1>

        {/* Loading / Error / Profile Info */}
        {loading && <p className="mt-4 text-gray-300">Loading profile...</p>}
        {error && <p className="mt-4 text-red-400">{error}</p>}
        {profile && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex  flex-col border-2 border-white mt-6 p-6 rounded-lg font-mono bg-black bg-opacity-50"
          >
            <h3 className="text-2xl font-semibold">Name: {profile.fullName}</h3><br></br>
            <p className="mt-2 text-lg"><span className="text-xl text-teal-600 font-bold">Email:</span> {profile.email}</p>
            <p className="mt-2 text-lg">Phone: {profile.phone}</p>
            <p className="mt-2 text-lg">Address: {profile.address}</p>
            <p className="mt-2 text-lg">Education: {profile.education}</p>
            <p className="mt-2 text-lg">Company Name: {profile.companyName}</p>
            <p className="mt-2 text-lg">Company Website: {profile.companyWebsite}</p>
            <p className="mt-2 text-lg">Designation: {profile.designation}</p>
            
          </motion.div>
        )}
      </div>
    </div>
  );
};
