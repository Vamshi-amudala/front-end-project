import { motion } from "framer-motion";

export const Services = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background */}
      <motion.img
        src="/images/services-page.jpg"
        alt="background"
        className="absolute top-0 left-0 w-full h-full object-cover blur-sm scale-105"
        initial={{ scale: 1.4 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeInOut",repeat:Infinity, repeatType:"reverse" }}
      />

      <div className="absolute inset-0 bg-black/40 backdrop-brightness-50">
        <section className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center overflow-y-auto">
          
          {/* Heading */}
          <motion.h1
            className="text-gray-200 text-5xl font-bold mb-10 drop-shadow-lg text-glow"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            What we provide
          </motion.h1>

          {/* Cards Container */}
          <div className="grid grid-cols-2 gap-10 mt-5 text-white">
            
            {/* Card 1 */}
            <motion.div
              className="border-2 border-white rounded-lg shadow-xl p-6 bg-white/10 backdrop-blur-md hover:scale-105 transition-all duration-300 ease-in-out"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            //  whileHover={{ scale: 1.07 }}
            >
              <h1 className="text-3xl font-bold mb-4 relative inline-block group text-glow">
                For Job Seekers
              </h1>
              <ul className="space-y-3 text-md font-mono p-2">
                <li>Explore thousands of verified job listings across industries</li>
                <li>Create a standout professional profile to showcase your skills</li>
                <li>Receive personalized job recommendations tailored to your career goals</li>
                <li>Connect directly with top recruiters and hiring managers</li>
              </ul>
            </motion.div>


            <motion.div
              className="border-2 border-white rounded-lg shadow-xl p-6 bg-white/10 backdrop-blur-md hover:scale-105 transition-all duration-300 ease-in-out"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              // whileHover={{ scale: 1.07 }}
            >
              <h1 className="text-3xl font-bold mb-4 relative inline-block group text-glow">
                For Employers
              </h1>
              <ul className="space-y-3 text-md font-mono p-2">
                <li>Post job openings and reach a vast pool of qualified candidates</li>
                <li>Utilize advanced search filters to find the perfect fit for your team</li>
                <li>Manage applications and track candidate progress in one place</li>
                <li>Enhance your employer brand with a dedicated company profile</li>
              </ul>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};
