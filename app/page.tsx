"use client"

import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { FaChartLine, FaArrowRight } from "react-icons/fa"

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.2
    }
  }
}

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

export default function Home() {
  return (
    <div
      className="min-h-screen w-full flex flex-col justify-center items-center 
      bg-linear-to-br from-slate-100 via-stone-50 to-slate-200"
     >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-3xl px-6 text-center"
      >

        <motion.div
          variants={item}
          className="flex justify-center mb-6"
        >
          <FaChartLine className="text-5xl text-purple-600 drop-shadow-md" />
        </motion.div>

        <motion.h1
          variants={item}
          className="text-4xl sm:text-6xl font-extrabold text-slate-800"
          style={{ textShadow: "2px 2px 2px #d1d5db" }}
        >
          Smart Property Price Prediction
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 text-base sm:text-lg text-slate-600 font-medium"
        >
          A machine-learning powered estimator designed to deliver accurate
          and data-driven house price predictions in Bangalore (India), with clarity and confidence.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex justify-center"
        >
          <Link href="/land">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                flex items-center gap-x-3
                px-8 py-4 rounded-xl
                bg-purple-600 text-white
                font-semibold text-lg
                shadow-lg shadow-purple-300
                hover:bg-purple-700
                transition-all
                cursor-pointer
              "
            >
              Launch Predictor
              <FaArrowRight className="text-xl" />
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 text-sm font-mono text-slate-500"
      >
        Crafted by Mirza Hussain
      </motion.p>
    </div>
  )
}
