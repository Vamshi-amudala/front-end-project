import { motion } from "framer-motion"
export const Features = () => {
  const features = [
    {
      title: "Smart Matching",
      description: "Our AI-powered algorithm carefully analyzes your skills, experience, and career goals to connect you with the most relevant job opportunities. No more wasting time on irrelevant listings—only the jobs that fit you reach your dashboard."
    },
    {
      title: "Quick Apply",
      description: "Apply to multiple jobs instantly using your saved profile and documents. This eliminates repetitive form filling, saves time, and lets you focus on preparing for interviews."
    },
    {
      title: "Secure Platform",
      description: "All your personal and professional information is protected with industry-standard encryption and security protocols. Explore opportunities and communicate with employers with full confidence."
    },
    {
      title: "Real-time Updates",
      description: "Receive instant notifications about new jobs, application status changes, and employer responses, ensuring you never miss an important opportunity and can act quickly."
    }
  ];

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <img
        src="/images/features-page.webp"
        alt="background"
        className="absolute top-0 left-0 w-full h-full object-cover blur-sm scale-105"
      />

      <div className="absolute inset-0 bg-black/40 ">
        <section className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center overflow-y-auto">
          <motion.h1 className="text-gray-200 text-5xl font-bold mb-10 drop-shadow-lg text-glow"
          initial={{opacity:0, scale:0.7}}
          animate={{opacity:1, scale:1}}
          transition={{duration:1.2, ease:"easeInOut"}}

          >
            Why Choose CareerForge
          </motion.h1>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-5 text-white"
          initial={{opacity:0.8, scale:0.9}}
          animate={{opacity:1, scale:1}}
          transition={{duration:1, ease:"easeIn"}}
          >
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="rounded-lg hover:scale-105 transition-all duration-300 ease-in-out shadow-xl p-6 backdrop-brightness-50"
                initial={{opacity:0.8, scale:0.9}}
                animate={{opacity:1, scale:1}}
                transition={{duration:1.2, ease:"easeIn"}}
              >
                <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2 text-glow">
                  <span>{feature.icon}</span> {feature.title}
                </h2>
                <p className="text-md font-mono leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </motion.div>
        </section>
      </div>
    </div>
  );
};
