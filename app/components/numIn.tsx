"use client"
import { UseFormRegisterReturn } from "react-hook-form";
import { motion, Variants, easeIn } from "framer-motion";

export function NumInp({
  title,
  reg,
  bhk
}: {
  title: string,
  reg: UseFormRegisterReturn,
  bhk?: string
}) {

  const slideFromLeft: Variants = {
    start: {
      x: 60,
      opacity: 0
    },
    stop: {
      x: 0,
      opacity: 1,
      transition: {
        ease: easeIn,
        duration: 0.6
      }
    }
  };

  return (
    <motion.div
      variants={slideFromLeft}
      initial="start"
      animate="stop"
      className="w-full flex flex-col items-center gap-y-4 mt-4"
    >
      {/* Label */}
      <label className="text-lg sm:text-2xl text-purple-700 font-serif font-semibold tracking-wide">
        {bhk ? `${title} (${bhk})` : title}
      </label>

      {/* Input */}
      <input
        type="number"
        {...reg}
        placeholder={`Enter the ${title}`}
        className="
          w-[90%] sm:w-[70%]
          px-4 py-2 sm:px-6 sm:py-3
          rounded-xl
          bg-linear-to-br from-white to-purple-50
          text-purple-900 font-semibold font-mono
          border border-purple-300
          shadow-md

          focus:outline-none
          focus:ring-2 focus:ring-purple-400
          focus:shadow-lg

          placeholder:text-purple-400

          transition-all duration-200
        "
      />
    </motion.div>
  );
}