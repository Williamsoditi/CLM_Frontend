import React, { useState } from "react";
import NavBar from "../components/Nav/NavBar";
import { motion } from "framer-motion";
import logo from "../../src/assets/logo.png";
import Footer from "../components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
    honeypot: "", // Hidden field for bot detection
  });

  type FormFields =
    | "firstName"
    | "lastName"
    | "email"
    | "phoneNumber"
    | "message";
  type ErrorsType = Partial<Record<FormFields, string>>;

  const [errors, setErrors] = useState<ErrorsType>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    // Clear error for the field as user types
    if (errors[id as FormFields]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[id as FormFields];
        return newErrors;
      });
    }
  };

  const validate = () => {
    let newErrors: ErrorsType = {};
    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid.";
    }
    if (!formData.message) newErrors.message = "Message is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. HONEYPOT CHECK: If the hidden field is filled, ignore the bot
    if (formData.honeypot) {
      console.warn("Bot detected.");
      setSubmitMessage("Your message has been sent successfully!"); // Lie to the bot
      return;
    }

    if (!validate()) {
      setSubmitMessage("Please correct the errors before submitting.");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      // REPLACE 'YOUR_FORM_ID' with your actual Formspree ID
      // WILL CHANGE THIS TO THE CLIQUE MAMBAS FORMSPREE ID WHEN SET UP
      const response = await fetch("https://formspree.io/f/xaqnegob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phoneNumber,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitMessage("Your message has been sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          message: "",
          honeypot: "",
        });
        setErrors({});
      } else {
        throw new Error("Submission failed.");
      }
    } catch (error) {
      setSubmitMessage("Error sending message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Framer Motion animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f1f2f6]">
      <NavBar />
      <div className="flex-grow flex items-center justify-center py-10">
        <motion.div
          className="flex flex-col md:flex-row bg-white rounded-lg shadow-xl overflow-hidden max-w-6xl w-full mx-4 md:mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Section: "We'd love to hear from you" */}
          <div className="w-full md:w-1/2 bg-gradient-to-r from-[#1a202c] to-gray-950/70 text-white p-8 md:p-16 flex flex-col justify-between relative overflow-hidden">
            {/* Top-left logo */}
            <motion.div
              className="absolute top-4 left-4 md:top-8 md:left-8"
              variants={itemVariants}
            >
              <span className="text-white text-lg font-semibold flex items-center md:block sm:hidden">
                <a href="/">
                  <div className="flex items-center font-bold">
                    <img
                      src={logo}
                      alt="logo"
                      className="block navbar-logo h-20 w-auto max-w-full rounded-md object-contain md:h-12 lg:h-16 xl:h-20"
                    />
                    {/* <p>Clique Mambas</p> */}
                  </div>
                </a>
              </span>
            </motion.div>

            <motion.div className="relative z-10" variants={itemVariants}>
              <h1 className="text-4xl md:text-6xl font-serif leading-tight mt-12 md:mt-20 mb-8">
                We'd love to <br /> hear from you.
              </h1>
            </motion.div>

            {/* Bottom-left links */}
            <motion.div
              className="text-sm space-y-2 mt-auto relative z-10"
              variants={itemVariants}
            >
              {/* <p className="text-gray-400">
                Privacy Policy · Modern Day Statement · Social Impact Statement
              </p> */}
            </motion.div>
          </div>

          {/* Right Section: Contact Form */}
          <div className="w-full md:w-1/2 p-8 md:p-16 bg-white">
            <motion.h2
              className="text-3xl md:text-4xl font-semibold mb-8 md:mb-10 text-gray-800"
              variants={itemVariants}
            >
              Contact us
            </motion.h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 uppercase"
                  >
                    FIRST NAME
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`mt-1 block w-full px-0.5 border-0 border-b-2 ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    } focus:ring-0 focus:border-black placeholder-gray-400 text-gray-900 focus:outline-none transition-colors duration-200`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 uppercase"
                  >
                    LAST NAME
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`mt-1 block w-full px-0.5 border-0 border-b-2 ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    } focus:ring-0 focus:border-black placeholder-gray-400 text-gray-900 focus:outline-none transition-colors duration-200`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 uppercase"
                  >
                    EMAIL
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`mt-1 block w-full px-0.5 border-0 border-b-2 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } focus:ring-0 focus:border-black placeholder-gray-400 text-gray-900 focus:outline-none transition-colors duration-200`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700 uppercase"
                  >
                    PHONE NUMBER
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    placeholder="Enter phone number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="mt-1 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-black placeholder-gray-400 text-gray-900 focus:outline-none transition-colors duration-200"
                  />
                </motion.div>
              </div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 uppercase"
                >
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  placeholder="Enter your message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4} // Use textarea for multi-line input
                  disabled={isSubmitting}
                  className={`mt-1 block w-full px-0.5 border-0 border-b-2 ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  } focus:ring-0 focus:border-black placeholder-gray-400 text-gray-900 resize-y focus:outline-none transition-colors duration-200`}
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                )}
              </motion.div>

              {submitMessage && (
                <motion.p
                  className={`text-sm ${
                    submitMessage.includes("successfully")
                      ? "text-green-600"
                      : "text-red-600"
                  } mt-2`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {submitMessage}
                </motion.p>
              )}

              <motion.button
                type="submit"
                className="mt-8 flex items-center text-lg font-medium  group disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                disabled={isSubmitting}
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
                <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">
                  &rarr;
                </span>
              </motion.button>
            </form>

            <motion.div
              className="mt-12 md:mt-16 pt-8 border-t border-gray-200"
              variants={itemVariants}
            >
              <div className="mt-4 flex space-x-6 text-gray-500 text-sm">
                <a
                  href="mailto:Cliquemambas1960@gmail.com"
                  className="hover:text-gray-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cliquemambas1960@gmail.com
                </a>
                <a
                  href="https://www.instagram.com/cliquemambas/"
                  className="hover:text-gray-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
