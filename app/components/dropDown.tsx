"use client"
import { UseFormRegisterReturn } from "react-hook-form"
import { motion, Variants, easeIn } from "framer-motion"
export function DropDown({name, reg}: {name: string, reg: UseFormRegisterReturn}){
    const area_map ={
    'Super built-up  Area': 4,
    'Built-up  Area': 3,
    'Plot  Area': 2,
    'Carpet  Area': 1
    }
    
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
        className="w-full flex justify-center items-center gap-x-4 mt-2">
        <label 
        className="text-sm sm:text-2xl text-[#5836bf] font-serif font-semibold"
        >{name}:</label>
        <select {...reg}
        className="sm:p-2 text-sm sm:text-xl font-bold font-serif bg-purple-600
        text-[whitesmoke] cursor-pointer rounded-lg border-2 border-stone-50">
            {Object.entries(area_map).map(([label, value])=>(
                <option 
                key={value}
                value={value}
                className={"hover:text-xl hover:bg-white hover:text-purple-700"}
                >
                    {label}
                </option>
            ))}
        </select>
      </motion.div>
    )
}