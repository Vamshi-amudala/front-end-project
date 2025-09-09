import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 w-screen h-screen overflow-hidden">
      {/* Animated Background */}
      <motion.img
        src="/images/home-page.jpg"
        alt="background"
        className="w-full h-full object-cover blur-sm scale-110"
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
        transition={{ duration: 6, ease: "easeInOut", repeat:Infinity, repeatType:"reverse" }}
      />

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-black/40 backdrop-brightness-50"
        transition={{ duration: 1 }}
      ></motion.div>

      {/* Central Content */}
      <section className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-12">
        {/* Title */}
        <motion.h1
          className="text-gray-200 text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg text-glow"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Welcome to <span className="text-emerald-500">CareerForge</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-gray-300 text-lg sm:text-2xl md:text-3xl font-mono mb-8 text-glow"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        >
          Find your dream job today
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {/* Join Us Button */}
          <motion.button
            onClick={() => navigate("/register")}
            className="text-white text-sm sm:text-base font-semibold py-2 px-4 sm:px-8 border border-gray-600 rounded-full shadow-lg relative overflow-hidden group"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Join Us</span>
            <span className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-100 transition duration-300"></span>
          </motion.button>

          {/* Explore Jobs Button */}
          <motion.button
            onClick={() => navigate("/login")}
            className="text-white text-sm sm:text-base font-semibold py-2 px-4 sm:px-8 border border-gray-600 rounded-full shadow-lg relative overflow-hidden group"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Explore Jobs</span>
            <span className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-100 transition duration-300"></span>
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};
