import { MdMenu } from 'react-icons/md';
import logo from '../../assets/logo.png';
import { NavBarMenu } from '../../MockData/NavData';
import { useState } from 'react';
import ResponsiveMenu from './ResponsiveMenu';
import Banner from './Banner';
import { motion } from 'motion/react';

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
      <div>
      <nav className="flex justify-between items-center py-1 mx-auto container">
        {/* LOGO SECTION */}
        <div className="container flex justify-between items-center py-3">
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
                 <a
                    href={item.link}
                    className="
                      inline-block
                      text-black
                      hover:text-primary
                      relative
                      after:content-['']
                      after:absolute
                      after:w-full
                      after:h-[2px]               
                      after:bottom-0
                      after:left-0
                      after:bg-primary            
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
                </li>
              );
            })}
          </ul>
        </div>

        {/* CTA button */}
        <div className="hidden lg:block mx-5">
          <button className="text-white bg-primary font-semibold rounded-full px-5 py-2 hover:bg-primary-darker transition-colors duration-300 cursor-pointer">Discover</button>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="lg:hidden px-4" onClick={() => setIsOpen(!isOpen)}>
          <MdMenu className='text-3xl cursor-pointer' />
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
