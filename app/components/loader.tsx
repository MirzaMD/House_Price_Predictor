"use client"
import { motion, Variants, easeInOut, easeIn } from "framer-motion"
import { useEffect, useState } from "react"
export function Loading() {
  const container: Variants = {
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const bar: Variants = {
    initial: {
      scaleY: 0.3,
    },
    animate: {
      scaleY: [0.3, 0.4, 0.5, 0.8, 1],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: "mirror",
        ease: easeInOut,
      },
    },
  }
  const fadingText: Variants ={
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            ease: easeIn,
            duration: 5,
            repeat: Infinity,
            repeatType: "mirror"
        }
    }
  }
  const [changingText, setChangingText] = useState<boolean>(false)
  const [ text, setText ] = useState<string>("Estimating price...")
  const [countDown, setCountDown] = useState<number>(120)

  useEffect(()=>{
    const intervalID = setInterval(()=>{
        setCountDown((cur)=> {
            if(cur == 0){
                return 120
            }
            return cur - 1
        })
        setText(()=>{
            if(changingText){
                return "Estimating Price..."
            }
            return "Render awaking server..."
        })
        setChangingText((cur)=> !cur)
    }, 1000)
    return () =>{
        clearInterval(intervalID)
    }
  }, [countDown])
  return (
    <div className={`w-full flex flex-col justify-center items-center`}>
    <motion.div
      variants={container}
      initial="initial"
      animate="animate"
      className="sm:w-[400px] w-[200px] h-[250px]
      flex justify-center items-end gap-3"
    >
      <motion.div
        variants={bar}
        style={{ originY: 1 }}
        className="sm:h-[150px] h-[100px] w-[30px] sm:w-[60px] bg-purple-500"
      />
      <motion.div
        variants={bar}
        style={{ originY: 1 }}
        className="sm:h-[180px] h-[120px] w-[30px] sm:w-[60px] bg-purple-500"
      />
      <motion.div
        variants={bar}
        style={{ originY: 1 }}
        className="sm:h-[210px] h-[140px] w-[30px] sm:w-[60px] bg-purple-500"
      />
    </motion.div>
    <motion.p 
    variants={fadingText}
    initial="initial"
    animate="animate"
    className="text-sm sm:text-3xl text-purple-500 font-serif font-bold"
    >
        {text} 
    </motion.p>
    <p 
    className={`text-lg sm:text-5xl text-purple-700 font-extrabold font-mono`}>
        {countDown}
    </p>
    </div>
  )
}
