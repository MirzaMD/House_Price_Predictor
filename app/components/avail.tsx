import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";

export function Avail({
  title,
  setValue
}: {
  title: string;
  setValue: UseFormSetValue<any>;
}) {
  const months = {
    "Ready To Move": 13,
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

  const [mon, setMon] = useState<number>(0);
  const [year, setYear] = useState<number>(20);

  useEffect(() => {
    if (mon === 13) setYear(25);

    const value = mon === 13 ? 13 : year * 12 + mon;
    setValue("availability", value, { shouldValidate: true });
  }, [mon, year, setValue]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col items-center gap-y-5 mt-4"
    >
      {/* Label */}
      <label className="text-lg sm:text-2xl text-purple-700 font-serif font-semibold tracking-wide">
        {title}
      </label>

      {/* Container */}
      <div className="flex gap-4 sm:gap-6">
        
        {/* Month Select */}
        <select
          onChange={(e) => setMon(Number(e.target.value))}
          className="
            px-4 py-2 sm:px-6 sm:py-3
            rounded-xl
            bg-linear-to-br from-purple-700 to-purple-400
            text-white font-semibold
            shadow-md
            border border-purple-300
            focus:outline-none focus:ring-2 focus:ring-purple-400
            hover:scale-105 transition-all duration-200
            cursor-pointer
          "
        >
          {Object.entries(months).map(([key, value]) => (
            <option
              key={value}
              value={value}
              className="text-black bg-white"
            >
              {key}
            </option>
          ))}
        </select>

        {/* Year Select */}
        <select
          onChange={(e) => setYear(Number(e.target.value))}
          disabled={mon === 13}
          className={`
            px-4 py-2 sm:px-6 sm:py-3
            rounded-xl
            font-semibold
            shadow-md
            border
            focus:outline-none focus:ring-2
            transition-all duration-200
            cursor-pointer
            ${
              mon === 13
                ? "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
                : "bg-linear-to-br from-purple-700 to-purple-400 text-white border-indigo-300 hover:scale-105 focus:ring-indigo-400"
            }
          `}
        >
          {[25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15].map((val) => (
            <option key={val} value={val} className="text-black bg-white">
              20{val}
            </option>
          ))}
        </select>
      </div>

      {/* Helper text */}
      <p className="text-xs sm:text-sm text-gray-500 font-mono">
        Select possession month & year
      </p>
    </motion.div>
  );
}