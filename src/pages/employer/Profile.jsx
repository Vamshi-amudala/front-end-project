import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect } from "react";

export const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProfile = async () => {
    try {
      const res = await axios.get("http://localhost:8080/users/profile", {
        withCredentials: true,
      });
      setProfile(res.data);
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
    <div className="relative h-full w-full min-h-screen overflow-hidden">
      
      <motion.img
        src="/images/about-page.jpg"
        alt="profile"
        className="h-full w-full object-cover blur-sm brightness-50"
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      />

      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center mt-16 sm:mt-18 lg:mt-20 text-white p-4 sm:p-6 lg:p-8 overflow-y-auto">
        
        <motion.h1
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
          className="text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mono mb-6 sm:mb-8"
        >
          Profile
        </motion.h1>

        
        {loading && <p className="mt-4 text-gray-300 text-center">Loading profile...</p>}
        {error && <p className="mt-4 text-red-400 text-center">{error}</p>}

       
        {profile && (
          <>
          
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              className="flex flex-col border-2 border-white p-4 sm:p-6 rounded-lg font-mono bg-black bg-opacity-50 w-full max-w-sm sm:max-w-md lg:max-w-lg gap-3 sm:gap-4"
            >
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-center">Personal Details</h3>
              <p className="text-sm sm:text-base"><span className="text-teal-400 font-semibold">Name:</span> {profile.fullName}</p>
              <p className="text-sm sm:text-base"><span className="text-teal-400 font-semibold">Email:</span> {profile.email}</p>
              <p className="text-sm sm:text-base"><span className="text-teal-400 font-semibold">Phone:</span> {profile.phone}</p>
              <p className="text-sm sm:text-base"><span className="text-teal-400 font-semibold">Address:</span> {profile.address}</p>
              <p className="text-sm sm:text-base"><span className="text-teal-400 font-semibold">Education:</span> {profile.education}</p>
            </motion.div>

           
            {(profile.companyName || profile.companyWebsite || profile.designation) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.2 }}
                className="flex flex-col border-2 border-white mt-3 sm:mt-4 mb-3 sm:mb-4 p-4 sm:p-6 gap-3 sm:gap-4 rounded-lg font-mono bg-black bg-opacity-50 w-full max-w-sm sm:max-w-md lg:max-w-lg"
              >
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-center">Company Details</h3>
                <p className="text-sm sm:text-base"><span className="text-teal-400 font-semibold">Company Name:</span> {profile.companyName}</p>
                <p className="text-sm sm:text-base"><span className="text-teal-400 font-semibold">Designation:</span> {profile.designation}</p>
                <p className="text-sm sm:text-base"><span className="text-teal-400 font-semibold">Website:</span> {profile.companyWebsite}</p>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};