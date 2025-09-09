import { useRef, useState } from "react";
import emailjs from "emailjs-com";
import {motion} from "framer-motion";

export const Contact = () => {
  const formRef = useRef();
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null); 

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    setMessage("");

    emailjs
      .sendForm(
        "service_3jbnq6f",
        "template_y9glz7m",
        formRef.current,
        "VVa9SdFu5iwRx9lZq"
      )
 .then(
  () => {
    setIsSuccess(true);
    setMessage("Message sent successfully!");

    
    emailjs.send(
      "service_3jbnq6f",          
      "template_yoejiin",         
      {
        user_name: formRef.current.user_name.value,
        to_email: formRef.current.user_email.value
      },
      "VVa9SdFu5iwRx9lZq"         
    );
  },
  () => {
    setIsSuccess(false);
    setMessage("Failed to send message. Try again.");
  }
)

      .finally(() => setIsSending(false));
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <motion.img
        src="/images/contact-page.jpg"
        className="w-full h-full object-cover blur-sm scale-105"
        alt="Contact Background"

        initial={{scale:1.3}}
        animate={{scale:1}}
        transition={{duration:8, ease:"easeInOut", repeat:Infinity, repeatType:"reverse"}}
      />

      <div className="absolute inset-0 bg-black/50 backdrop-brightness-75 flex items-center justify-center px-6 font-mono">
        <div className="flex flex-col lg:flex-row w-full max-w-6xl gap-10">

          <motion.div className="flex-1 flex flex-col justify-center space-y-6 text-left text-white"
          
          initial={{scale:0.85, opacity:0.5}}
          animate={{scale:1,opacity:1 }}
          transition={{duration:2, ease:"easeInOut"}}
          >
            <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl"><span className="font-semibold">Email:</span> jobloomhq@gmail.com</p>
            <p className="text-xl"><span className="font-semibold">Phone:</span> +91 8464050544</p>
            <p className="text-xl">
              <span className="font-semibold">Address:</span> 4-32/7, Patel Nagar, Hyderabad, Telangana, India
            </p>
            <p className="text-gray-300 text-sm mt-4">© 2025 CareerForge. All rights reserved.</p>
          </motion.div>

          <div className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg">
            <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-6">
              <input
                type="text"
                name="user_name"
                placeholder="Your Name"
                className="w-full p-4 pt-6 rounded-xl bg-white/20 text-white border border-white/30 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition"
                required
              />
              <input
                type="email"
                name="user_email"
                placeholder="Your Email"
                className="w-full p-4 pt-6 rounded-xl bg-white/20 text-white border border-white/30 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                className="w-full p-4 pt-6 rounded-xl bg-white/20 text-white border border-white/30 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition resize-none"
                required
              />

              <button
                type="submit"
                disabled={isSending}
                className={`bg-white/20 hover:bg-white/75 hover:text-gray-600 hover:scale-105 transition text-white font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2
                  ${isSending ? "opacity-50 cursor-not-allowed  hover:scale-100 " : ""}`}
              >
                {isSending && (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                )}
                {isSending ? "Sending..." : "Send Message"}
              </button>

            </form>

            {message && (
              <p
                className={`mt-4 font-semibold text-center ${
                  isSuccess ? "text-green-400" : "text-red-400"
                }`}
              >
                {message}
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
