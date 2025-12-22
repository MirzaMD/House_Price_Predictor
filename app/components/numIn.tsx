import { UseFormRegisterReturn } from "react-hook-form";
import { motion, Variants, easeIn } from "framer-motion"

export function NumInp({title, reg, bhk}: {title: string, reg: UseFormRegisterReturn, bhk?: string}){
    
     const slideFromLeft: Variants = {
        start:{
            x: 40,
            opacity: 0
        },
        stop: {
            x:0,
            opacity: [0.2, 0.4, 0.6, 0.8, 1],
            transition:{
                ease: easeIn,
                duration: 0.8
            }
        }
    }    
    return(
        <motion.div
        variants={slideFromLeft}
        initial="start"
        animate="stop"
        className="w-full flex flex-col justify-center items-center gap-x-4 mt-2"
        >
            <label 
            className="text-sm sm:text-2xl text-[#5836bf] font-serif font-semibold"
            >{bhk? `${title} (${bhk})`: title}:</label>
            <input type="number" {...reg} 
            className={`w-[90%] rounded-md border-2 border-purple-500 text-md sm:text-xl
                font-mono font-bold text-purple-900`}
            placeholder = {`Enter the ${title}`}    
            />
        </motion.div>
    )
}