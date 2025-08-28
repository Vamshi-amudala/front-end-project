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
        transition={{ duration: 6, ease: "easeInOut" }}
      />

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-black/40 backdrop-brightness-50"
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      ></motion.div>

      {/* Content */}
      <section className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
        {/* Title */}
        <motion.h1
          className="text-gray-200 text-5xl font-bold mb-6 drop-shadow-lg text-glow"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Welcome to <span className="text-blue-400">Careerly</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-gray-300 text-2xl font-mono mb-8 text-glow"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        >
          Find your dream job today
        </motion.p>

        {/* Buttons with staggered animation */}
        <motion.div
          className="flex gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {/* Join Us button */}
          <motion.button
            onClick={() => navigate("/register")}
            className="text-white font-semibold py-2 px-8 border border-gray-600 rounded-full shadow-lg relative overflow-hidden group"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Join Us</span>
            <span className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-100 transition duration-300"></span>
          </motion.button>

          {/* Explore Jobs button */}
          <motion.button
            onClick={() => navigate("/login")}
            className="text-white font-semibold py-2 px-8 border border-gray-600 rounded-full shadow-lg relative overflow-hidden group"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.1 }}
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
