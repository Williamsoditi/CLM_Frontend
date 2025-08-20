import { motion, AnimatePresence } from "framer-motion";
import { NavBarMenu } from "../../MockData/NavData";
import { MdClose } from "react-icons/md"; 

// Define the props interface
interface ResponsiveMenuProps {
  isOpen: boolean;
  onClose: () => void; 
}

const ResponsiveMenu: React.FC<ResponsiveMenuProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }} 
          animate={{ opacity: 1, x: 0 }} 
          exit={{ opacity: 0, x: "100%" }} 
          transition={{ duration: 0.3 }}
          className="top-20 left-0 w-full min-h-[calc(100vh-5rem)] bg-white z-20 overflow-y-auto lg:hidden"
        >
          {/* Menu content container */}
          <div
            className="text-xl font-semibold uppercase bg-gradient-to-br from-primary-darker to-blue-900 text-white py-12 m-4 rounded-3xl relative shadow-2xl overflow-hidden"
          >
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