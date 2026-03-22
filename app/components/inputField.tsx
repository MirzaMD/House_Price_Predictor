"use client"
import { UseFormRegisterReturn } from "react-hook-form"
import { easeIn, motion, Variants } from "framer-motion"

export function InputField({
  name,
  reg
}: {
  name: string,
  reg: UseFormRegisterReturn
}) {

  const slideFromLeft: Variants = {
    start: {
      x: -80,
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
  }

  return (
    <motion.div
      variants={slideFromLeft}
      initial="start"
      animate="stop"
      className="w-full flex flex-col items-center gap-y-4 mt-4"
    >
      {/* Label */}
      <label className="text-lg sm:text-2xl text-purple-700 font-serif font-semibold tracking-wide">
        {name}
      </label>

      {/* Textarea */}
      <textarea
        {...reg}
        placeholder={`Enter the ${name}
(Vicinity, e.g. Richmond Town, Brigade Road)`}
        className="
          w-[90%] sm:w-[70%]
          min-h-[100px]
          px-4 py-3 sm:px-6 sm:py-4
          rounded-xl
          bg-linear-to-br from-white to-purple-50
          text-purple-900 font-medium
          border border-purple-300
          shadow-md
          resize-none

          focus:outline-none
          focus:ring-2 focus:ring-purple-400
          focus:shadow-lg

          placeholder:text-purple-400
          transition-all duration-200
        "
      />
    </motion.div>
  )
}