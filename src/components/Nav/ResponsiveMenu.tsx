import { motion, AnimatePresence } from "framer-motion";
import { NavBarMenu } from "../../MockData/NavData"; // Assuming this path is correct
import { MdClose } from "react-icons/md"; // Import a close icon

// Define the props interface
interface ResponsiveMenuProps {
  isOpen: boolean;
  onClose: () => void; // Expecting a function to close the menu
}

const ResponsiveMenu: React.FC<ResponsiveMenuProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence mode="wait">
      {/* Conditionally render the motion.div based on isOpen */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -100 }} // Starts above and invisible
          animate={{ opacity: 1, y: 0 }} // Slides down and fades in
          exit={{ opacity: 0, y: -100 }} // Slides up and fades out on exit
          transition={{ duration: 0.3 }}
          // Styling for the overlay/container of the mobile menu
          className="absolute top-20 left-0 w-full min-h-[calc(100vh-5rem)] bg-white z-20 overflow-y-auto lg:hidden"
        >
          {/* Menu content container */}
          <div
            className=" text-xl font-semibold uppercase bg-gradient-to-br from-primary-darker to-blue-900 text-white py-12 m-4 rounded-3xl relative shadow-2xl overflow-hidden ">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-5 text-white text-4xl leading-none"
              aria-label="Close menu"
            >
              <MdClose /> {/* Using MdClose icon */}
            </button>

            <ul className="flex flex-col justify-center items-center gap-8">
              {NavBarMenu.map((item) => (
                <li key={item.id}>
                  {/* Clicking a link should also close the menu */}
                  <a href={item.link} onClick={onClose}>
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveMenu;
