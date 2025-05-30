import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import notFound from "../assets/notFound.png"; 
import Navbar from "../components/Nav/NavBar";


const NotFound = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle navigation to the home page
  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-white flex flex-col items-center justify-center font-sans overflow-hidden">
      {/* Main content area, centered on the page */}
      <main className="p-4 w-full flex flex-col items-center justify-center">
        <motion.div
          // Removed card features: bg-white, rounded-lg, shadow-xl, p-8
          className="max-w-2xl w-full text-center" // Content is now directly on the page
          initial={{ opacity: 0, y: 20 }} // Adjusted initial animation to come from slightly above
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* 404 Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-8 flex justify-center"
          >
            <img
              src={notFound}
              alt="404 Error - Page not found illustration"
              className="max-w-xs md:max-w-sm h-auto"
            />
          </motion.div>

          {/* 404 Text - Font size scales with screen size */}
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            404
          </motion.h1>

          {/* Page Not Found Title - Font size scales with screen size */}
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Page not found
          </motion.h2>

          {/* Description - Font size scales with screen size */}
          <motion.p
            className="text-base md:text-lg text-gray-600 leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            Sorry, the page you are looking for cannot be found. Please check
            the URL or try navigating back to the homepage.
          </motion.p>

          {/* Buttons */}
          <div className="flex justify-center"> 
            <motion.button
              onClick={handleGoHome}
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                font-semibold
                px-8 py-3
                rounded-lg
                shadow-lg
                transition-all duration-300
                transform hover:scale-105
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                text-base flex items-center justify-center" // Added flex to center icon
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Go back to home page &nbsp;&rarr;
            </motion.button>
            {/* Removed the "Get help" button */}
          </div>
        </motion.div>
      </main>
    </div>
    </>
    
  );
};

export default NotFound;