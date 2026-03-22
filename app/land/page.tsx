"use client"
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { easeIn, motion, Variants } from 'framer-motion'
import { InputField } from '../components/inputField'
import { DropDown } from '../components/dropDown'
import { Avail } from '../components/avail'
import { NumInp } from '../components/numIn'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useCallback, useState } from 'react'
import { PriceDisplay } from '../components/price'
import { Loading } from '../components/loader'

const schema = z.object({
  area_type: z.string(),
  availability: z.number(),
  location: z.string().min(1, "enter a valid location"),
  size: z.string().min(1),
  total_sqft: z.string(),
  bath: z.string(),
  balcony: z.string(),
})

type Tschema = z.infer<typeof schema>

export default function LandPage() {
  const { register, reset, handleSubmit, setValue,
    formState: { isSubmitting, errors }
  } = useForm<Tschema>({
    resolver: zodResolver(schema),
    defaultValues: { availability: 0 }
  })

  const route = useRouter()

  const [showPrice, setShowPrice] = useState(false)
  const [amt, setAmt] = useState("")
  const [startLoading, setStartLoading] = useState(false)

  const submitting = useCallback(async (data: Tschema) => {
    setStartLoading(true)

    const payload = {
      area_type: data.area_type,
      availability: data.availability,
      location: data.location.toLowerCase().trim(),
      size: parseInt(data.size),
      total_sqft: parseFloat(data.total_sqft),
      bath: parseInt(data.bath) || 0,
      balcony: parseInt(data.balcony) || 0
    }

    try {
      const res = await axios.post(
        "https://house-price-predictor-backend-4.onrender.com/predict",
        payload
      )

      if (res.status === 200) {
        setAmt(res.data.prediction)
        setShowPrice(true)
        reset()
      }
    } catch (err) {
      console.log(err)
    } finally {
      setStartLoading(false)
    }
  }, [])

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeIn }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submitting)}
      className="min-h-screen flex flex-col items-center justify-start
      bg-linear-to-br from-slate-100 via-white to-purple-100"
    >

      {/* HEADER */}
      <div className="w-full h-[110px] flex items-center justify-center
      bg-linear-to-r from-purple-700 to-indigo-900 shadow-lg fixed">

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-2xl sm:text-4xl font-bold text-white tracking-wide "
        >
          House Price Predictor
        </motion.h1>
      </div>
      <div className="h-20"></div>
      {!showPrice ? (
  
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="w-[95%] sm:w-[70%] lg:w-[50%]
          bg-white mt-10 p-6 sm:p-8 rounded-2xl shadow-xl
          flex flex-col gap-6"
        >

          {!startLoading ? (
            <>
              <DropDown name="Area Type" reg={register("area_type")} />
              {errors.area_type && <Error msg={errors.area_type.message} />}

              <Avail title="Availability" setValue={setValue} />
              {errors.availability && <Error msg={errors.availability.message} />}

              <InputField name="Location" reg={register("location")} />
              {errors.location && <Error msg={errors.location.message} />}

              <NumInp title="Size" bhk="BHK" reg={register("size")} />
              {errors.size && <Error msg={errors.size.message} />}

              <NumInp title="Total Square Feet" reg={register("total_sqft")} />
              {errors.total_sqft && <Error msg={errors.total_sqft.message} />}

              <NumInp title="Bathrooms" reg={register("bath")} />
              {errors.bath && <Error msg={errors.bath.message} />}

              <NumInp title="Balconies" reg={register("balcony")} />
              {errors.balcony && <Error msg={errors.balcony.message} />}
              <div className="h-20"></div>
            </>
          ) : (
            <Loading />
          )}

        </motion.div>
      ) : (
        <PriceDisplay num={amt} setPrice={setShowPrice} />
      )}

      {/* FOOTER BUTTONS */}
      <div className="w-full fixed bottom-0 flex justify-between items-center
      px-6 py-3 bg-white shadow-inner border-t">

        <button
          type="button"
          onClick={() => route.push("/")}
          className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200
          text-gray-800 font-medium shadow cursor-pointer"
        >
          Go Back
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 rounded-lg bg-purple-700 hover:bg-purple-500
          text-white font-semibold shadow-lg active:scale-95 transition cursor-pointer"
        >
          {isSubmitting ? "Predicting..." : "Predict"}
        </button>
      </div>
    </form>
  )
}

/* Small reusable error component */
function Error({ msg }: { msg?: string }) {
  if (!msg) return null
  return (
    <p className="text-sm text-red-600 font-medium text-center">
      {msg}
    </p>
  )
}