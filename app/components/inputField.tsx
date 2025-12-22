"use client"
import { UseFormRegisterReturn } from "react-hook-form"
import { easeIn, motion, Variants } from "framer-motion"
export function InputField({name, reg}: {name: string, reg: UseFormRegisterReturn}){
    const slideFromLeft: Variants = {
        start:{
            x: -100,
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
        className="w-full flex flex-col justify-center items-center
          mt-2"
        >
            <label
            className="text-lg sm:text-2xl text-[#5836bf] font-serif font-semibold"
            >{name}:</label>
            <textarea {...reg} placeholder = {`enter the ${name}
(Vicinity, such as Richmond Town, Brigade Road, etc)`} 
            className={`w-[90%] rounded-md text-[#52497d] border-2 border-purple-500
                p-2 sm:p-4 font-serif text-md sm:text-xl`}
            /> 
        </motion.div>
     )
}