import { MdMenu } from "react-icons/md";
import logo from "../../assets/logo.png";
import { NavBarMenu } from "../../MockData/NavData"; // Ensure this path is correct
import { useState } from "react";
import ResponsiveMenu from "./ResponsiveMenu";
import Banner from "./Banner";
import { motion } from "framer-motion"; // Correct import for framer-motion
import { Link } from "react-router-dom"; // IMPORTANT: Import Link for internal routing

const NavBar = () => {

  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the menu open/close state
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to explicitly close the menu
  const closeMenu = () => {
    setIsOpen(false);
  };
  

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <div className="bg-gradient-to-r from-black/70 to-gray-700/50 z-20 sticky top-0 backdrop-blur-md">
          <nav className="flex justify-between items-center py-1 mx-auto container top-0 z-50 w-full">
            {/* LOGO SECTION */}
            <div className="container flex justify-between items-center py-3">
              {/* This logo link uses a direct <a> tag, which is fine for navigating to the root */}
              <a href="/">
                <div className="flex items-center font-bold">
                  <img
                    src={logo}
                    alt="logo"
                    className="navbar-logo h-20 w-auto max-w-full rounded-md object-contain"
                  />
                  {/* <p>Clique Mambas</p> */}
                </div>
              </a>
            </div>

            {/* MENU SECTION */}
            <div className="hidden lg:block">
              <ul className="flex items-center gap-6 font-semibold">
                {NavBarMenu.map((item) => {
                  return (
                    <li key={item.id}>
                      {/* Conditional rendering based on the 'target' property */}
                      {item.target ? (
                        // If 'target' exists (like for the Admin link), render a standard <a> tag
                        <a
                          href={item.link}
                          target={item.target} // This will be "_blank" for Admin
                          rel={item.rel}       // This will be "noopener noreferrer" for Admin
                          className="
                            inline-block
                            text-white              /* Changed from black to white for dark background */
                            hover:text-amber-500
                            relative
                            after:content-['']
                            after:absolute
                            after:w-full
                            after:h-[2px]
                            after:bottom-0
                            after:left-0
                            after:bg-amber-500
                            after:scale-x-0
                            after:origin-left
                            after:transition-transform
                            after:duration-300
                            after:ease-out
                            hover:after:scale-x-100
                          "
                        >
                          {item.title}
                        </a>
                      ) : (
                        // Otherwise (for internal links), render a React Router <Link> component
                        <Link
                          to={item.link}
                          className="
                            inline-block
                            text-white              /* Changed from black to white for dark background */
                            hover:text-amber-500
                            relative
                            after:content-['']
                            after:absolute
                            after:w-full
                            after:h-[2px]
                            after:bottom-0
                            after:left-0
                            after:bg-amber-500
                            after:scale-x-0
                            after:origin-left
                            after:transition-transform
                            after:duration-300
                            after:ease-out
                            hover:after:scale-x-100
                          "
                        >
                          {item.title}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* CTA button */}
            <div className="hidden lg:block mx-5">
              <button
                className=" bg-primary
              hover:bg-primary-darker
              text-white
              font-semibold
              px-8 py-3
              rounded-full
              shadow-lg
              transition-all duration-300
              transform hover:scale-105"
              >
                Discover
              </button>
            </div>

            {/* Mobile Hamburger Menu */}
            <div className="lg:hidden px-4" onClick={toggleMenu}> {/* Using the toggleMenu function */}
              <MdMenu className="text-3xl cursor-pointer text-white" /> {/* Added text-white */}
            </div>
          </nav>

          {/* Mobile SideBar */}
          <ResponsiveMenu isOpen={isOpen} onClose={closeMenu} />

          <Banner />
        </div>
      </motion.div>
    </>
  );
};

export default NavBar;

