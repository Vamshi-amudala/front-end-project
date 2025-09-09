import { motion } from "framer-motion";

export const About = () => {
  return (
    <div className="relative min-h-screen w-screen overflow-hidden">
      <motion.img
        src="/images/about-page.jpg"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover blur-sm"

        initial={{scale:1.3}}
        animate={{scale:1}}
        transition={{duration:8, ease:"easeInOut", repeat:Infinity, repeatType:"reverse"}}

      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_50%)] pointer-events-none" />

      <section className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center overflow-y-auto backdrop-brightness-50">
        
        <motion.h1 className="text-gray-100 text-5xl font-bold mb-6 drop-shadow-lg text-glow"
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:3, ease:"easeInOut"}}>
          Who We Are
        </motion.h1>


        <motion.p className="text-gray-300 text-lg max-w-3xl mb-10 leading-relaxed font-mono"
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:3, ease:"easeInOut"}}>
          We are a next-gen job platform designed to connect talented job seekers
          with top employers. Our mission is to simplify hiring and empower
          careers with technology-driven solutions.
        </motion.p>


        <motion.h2 className="text-2xl font-semibold text-gray-100 mb-4 text-glow"
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:4, ease:"easeInOut"}}
        >
          Our Mission
        </motion.h2>
        <motion.p className="text-gray-300 max-w-2xl mb-10 text-sm font-mono"
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:4, ease:"easeInOut"}}>
          To connect talent with opportunities through{" "}
          <span className="font-semibold text-white">
            technology, trust, and transparency
          </span>
          .
        </motion.p>

 
        <motion.div className="max-w-3xl w-[90vw] sm:w-auto bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
        initial={{ opacity:0}}
        animate={{ opacity:1}}
        transition={{duration:6, ease:"easeInOut"}}>
          <h3 className="text-xl font-semibold text-gray-100 mb-4">
            Why Choose Us?
          </h3>

          {/* List */}
          <ul className="text-gray-400 space-y-3 list-disc list-inside text-left font-mono">
            {[
              "Smart job matching powered by technology",
              "Trusted platform for both employers & seekers",
              "Fast and transparent hiring process",
              "Opportunities across industries & locations",
            ].map((text, i) => (
              <li key={i} className="hover:text-white  transition-colors">
                {text}
              </li>
            ))}
          </ul>
        </motion.div>
      </section>
    </div>
  );
};
