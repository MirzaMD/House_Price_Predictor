import { UseFormRegisterReturn } from "react-hook-form";
import { motion, Variants, easeIn } from "framer-motion";
import { useState, useEffect } from "react";
export function Avail({title, reg}:{title:string, reg: UseFormRegisterReturn}){
   const months = {
    "Ready To Move": 0,
    "January": 1,
    "February": 2,
    "March": 3,
    "April": 4,
    "May": 5,
    "June": 6,
    "July": 7,
    "August": 8,
    "September": 9,
    "October": 10,
    "November": 11,
    "December": 12
};
const [aval, setAval] = useState<number>(0)
const [mon, setMon] = useState<number>(0)
const [year, setYear] = useState<number>(0)
useEffect(()=>{
    if(mon == 0){
        setYear(0)
    }
    setAval((year*100) + mon) 
}, [mon, year])
useEffect(()=>{
},[aval, mon, year])
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
        className="w-full flex flex-col justify-center items-center gap-y-4 mt-2"
        >  
            <label 
            className="text-sm sm:text-2xl text-[#5836bf] font-serif font-semibold"
            >{title}:</label>
            <input type="number" value={aval} hidden {...reg}/>
            <div className={`w-full flex justify-evenly items-center`}>
            <select
            onChange={(e)=>setMon(Number(e.target.value))}
            className="sm:p-2 text-sm sm:text-xl font-bold font-serif bg-purple-600
            text-[whitesmoke] cursor-pointer rounded-lg border-2 border-stone-50"
            >
             {Object.entries(months).map(([key, value])=>(
                <option key = {value}
                value = {value}
                className={"hover:text-xl hover:bg-white hover:text-purple-700"}
                > 
                {key}
                </option>
             ))}
            </select>
            <select
            onChange={(e)=>setYear(Number(e.target.value))}
            disabled={mon == 0}
            className="sm:p-2 text-sm sm:text-xl font-bold font-mono bg-purple-600
            text-[whitesmoke] cursor-pointer rounded-lg border-2 border-stone-50"
            >
                {[0, 19, 20, 21, 22,23, 24, 25].map((val, idx)=>(
                    <option
                    key={idx}
                    value={val}
                    className={"hover:text-xl hover:bg-white hover:text-purple-700 font-mono"}
                    >
                    {mon !== 0?val:0}
                    </option>
                ))}
            </select>
            </div>
        </motion.div>
    )
}