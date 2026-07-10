import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";
import video from '../../assets/mambas.mp4';


// import { link } from "motion/react-client"
const Hero = () => {
  return (
    <div>
      <section
        id="home-section"
        className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      >
        {" "}
        {/* Removed text-center from here */}
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={video} // IMPORTANT: Replace with your actual video file path
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          Your browser does not support the video tag.
        </video>
        {/* Overlay to make text readable */}
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        {/* Content (Text & CTA) */}
        <div
          className="
        relative z-20
        text-white
        container
        mx-auto
        px-4 sm:px-6 lg:px-8
        py-8 sm:py-12 md:py-16
        text-left     
      "
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg">
            Dominate the Court. Join the Clique.
          </h1>
          <p className="text-lg md:text-xl font-medium mb-8 drop-shadow-md">
            Experience the thrill of victory with Clique Mambas. Elevate your
            game and be part of a winning legacy.
          </p>

          {/* Call to Action Buttons -  left-aligned */}
          <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
            {" "}
            <Link
              to="/about"
              className="
              bg-[#000080]
              hover:bg-[#000066]
              text-white
              font-semibold
              px-8 py-3
              rounded-full
              shadow-lg
              transition-all duration-300
              transform hover:scale-105
            "
            >
              About Us
            </Link>
            {/* <Link
              to="/schedule"
              className="
              bg-transparent
              border-2 border-[#000080]
              text-white
              hover:bg-[#000080]
              hover:text-white
              font-semibold
              px-8 py-3
              rounded-full
              shadow-md hover:shadow-[#000080]/50
              transition-all duration-300
              transform hover:scale-105
              backdrop-blur-sm
              "
            >
              View Schedule
            </Link> */}
          </div>
          {/* Social Media Icons Section */}
          <div className="flex justify-start items-center gap-6 mt-10 z-20 flex-wrap sm:justify-start lg:justify-start ">
            {/* Instagram Icon */}
            <a
              href="https://www.instagram.com/cliquemambas/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white hover:text-pink-500 transition-transform duration-300 transform hover:scale-125"
            >
              <FaInstagram className="text-3xl" />
            </a>

            {/* Gmail/Email Icon - NEW ADDITION */}
            <a
              href="mailto:cliquemambasmbb@gmail.com"
              aria-label="Email"
              className="text-white hover:text-red-500 transition-transform duration-300 transform hover:scale-125"
            >
              <FaEnvelope className="text-3xl" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
