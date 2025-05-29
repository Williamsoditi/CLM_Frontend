import { motion } from "framer-motion";
import { useState } from "react"
import { IoCloseSharp } from "react-icons/io5";

const Banner = () => {
    const [ isOpen, setIsOpen ] = useState(true);
    return (
        isOpen && (
            <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="bg-amber-300 text-sm text-center font-semibold p-1 hidden lg:block relative"
            >
                Subscribe Via Email to get latest updates on games and activities
                <a href="#" className="text-secondary ml-1">Subscribe Now</a>
                <div className="absolute top-1/2 right-10 p-2 cursor-pointer -translate-y-1/2" onClick={() => setIsOpen(false)}>
                    <IoCloseSharp className="text-xl"/>
                </div>
            </motion.div>
        )
    )
}

export default Banner
