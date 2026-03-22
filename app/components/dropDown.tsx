"use client"
import { UseFormRegisterReturn } from "react-hook-form"
import { motion, Variants, easeIn } from "framer-motion"

export function DropDown({
  name,
  reg
}: {
  name: string,
  reg: UseFormRegisterReturn
}) {
  const area_map = [
    'Super built-up Area',
    'Built-up Area',
    'Plot Area',
    'Carpet Area'
  ]

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

      {/* Select */}
      <select
        {...reg}
        className="
          w-[85%] sm:w-[60%]
          px-4 py-2 sm:px-6 sm:py-3
          rounded-xl
          bg-linear-to-br from-purple-600 to-indigo-500
          text-white font-semibold
          shadow-md
          border border-purple-300
          focus:outline-none focus:ring-2 focus:ring-purple-400
          hover:scale-105 transition-all duration-200
          cursor-pointer
        "
      >
        {area_map.map((label) => (
          <option
            key={label}
            value={label}
            className="text-black bg-white"
          >
            {label}
          </option>
        ))}
      </select>
    </motion.div>
  )
}