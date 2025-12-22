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
import { HiArrowCircleLeft } from 'react-icons/hi'
import { FaWandMagicSparkles } from 'react-icons/fa6'
import axios from 'axios'
import { useCallback, useState } from 'react'
import { PriceDisplay } from '../components/price'
const schema = z.object({
  area_type: z.string(),
  availability: z.string(),
  location: z.string().min(1, "enter a valid location"),
  size: z.string().min(1, "size must be at least one digit long"),
  total_sqft: z.string(),
  bath: z.string(),
  balcony: z.string(),
})
type Tschema = z.infer<typeof schema> 
export default function LandPage(){
  const { register, reset, handleSubmit, 
    formState: {isSubmitting, errors}} = 
    useForm<Tschema>( {
      resolver: zodResolver(schema)})
   
  const route = useRouter() 
  const [showPrice, setShowPrice] = useState<boolean>(false)
  const [ amt, setAmt ] = useState<string>("")   
  const slidingFromLeft: Variants ={
    start:{
      y: 120 
    },
    end:{
        y: 0,
        transition:{
          ease: easeIn,
          stiffness: 8,
          bounce: 40,
          duration: 0.75
        }
    }
  }
  const submitting = useCallback(async (data: Tschema)=>{
     const payload = {
      "area_type": parseFloat(data["area_type"]),
    "availability": parseFloat(data["availability"]),
    "location": data["location"],
    "size": parseFloat(data["size"]),
    "total_sqft": parseFloat(data["total_sqft"]),
    "bath": parseFloat(data["bath"]),
    "balcony": parseFloat(data["balcony"])
     }
     try{
      const res = await axios.post(
  "https://house-price-predictor-backend-4.onrender.com/predict_price",
  payload
)
     if(res.status == 200){
      console.log(res.data)
      setAmt(res.data["predicted_price"])
      setShowPrice(true)
      reset()
     }
     }
     catch(err){
      if (axios.isAxiosError(err)) {
    console.log("ERROR:", err.response?.data || err.message);
  } else {
    console.log("UNKNOWN ERROR:", err);
  }
     }
  }, [])
  return(
    <form
    onSubmit={handleSubmit(submitting)} 
    className={`min-h-screen flex flex-col justify-center items-center w-full
    bg-linear-to-br from-slate-100 via-stone-50 to-slate-200`}>
     <div
     className={`w-full h-[120px] flex justify-center items-center 
     bg-[#737594] fixed top-0`}
        style={{
            backgroundImage: `url("/images/building.jpg")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: '60%',
            backgroundPosition: "center",
            boxShadow: `1px 10px 5px gray`
        }}>
        <motion.h1 
        variants={slidingFromLeft}
        initial="start"
        animate="end"
        className={`text-xl sm:text-5xl font-bold text-[whitesmoke] font-[cursive]
            hover: cursor-none`}
            style={{ textShadow: `3px 3px 3px black`}}>
            Bangalore House Prices
        </motion.h1>
     </div>
     {!showPrice?
     (
      <div className={`w-full mt-38 flex flex-col justify-center items-center gap-y-6`}>
      <DropDown name="Area Type" reg = {register("area_type")} />
      { errors.area_type && (
        <p className={`text-sm sm:text-xl font-mono font-bold text-red-800`}
        >{`${errors.area_type.message}`}</p>
      )}
     <Avail title='Month and Year' reg={register("availability")}/>
     { errors.availability && (
        <p className={`text-sm sm:text-xl font-mono font-bold text-red-800`}
        >{`${errors.availability.message}`}</p>
      )}
     <InputField  name="Location" reg={register("location")} />
     { errors.location && (
        <p className={`text-sm sm:text-xl font-mono font-bold text-red-800`}
        >{`${errors.location.message}`}</p>
      )}
     <NumInp title='Size' bhk="BHK" reg={register("size")}/>
     { errors.size && (
        <p className={`text-sm sm:text-xl font-mono font-bold text-red-800`}
        >{`${errors.size.message}`}</p>
      )}
     <NumInp title='Total Square feet' reg={register("total_sqft")}/>
     { errors.total_sqft && (
        <p className={`text-sm sm:text-xl font-mono font-bold text-red-800`}
        >{`${errors.total_sqft.message}`}</p>
      )}
     <NumInp title='Bathroom(s)' reg={register("bath")}/>
     { errors.bath && (
        <p className={`text-sm sm:text-xl font-mono font-bold text-red-800`}
        >{`${errors.bath.message}`}</p>
      )}
     <NumInp title='Balcony' reg={register("balcony")}/>
     { errors.balcony && (
        <p className={`text-sm sm:text-xl font-mono font-bold text-red-800`}
        >{`${errors.balcony.message}`}</p>
      )}
     </div>
     )
    :
    (
      <PriceDisplay num = {amt} setPrice={setShowPrice} />
    )}
     <div className={`h-[120px]`}></div>
     <motion.div
     className={`w-full flex justify-between fixed bottom-1 py-2
      items-center border-purple-600 border-t-2
      bg-linear-to-br from-purple-300 via-purple-200 to-purple-400`}
     >
      <button type="button" onClick={()=>{ route.push("/")}}
      className={`bg-[whitesmoke] rounded-md px-1 sm:px-2 
        hover:cursor-pointer ml-10 active:bg-[gray]`}
      style={{boxShadow: `2px 2px 2px #710071`}}
      >
       <HiArrowCircleLeft className={`text-xl sm:text-5xl text-purple-500 
        hover:text-[#15f4ee] font-extrabold`} />      
      </button>
      <button type="submit"
      disabled={isSubmitting}
      className={`bg-[whitesmoke] rounded-md px-1 
      sm:px-2 hover:cursor-pointer
      mr-10 active:bg-[gray]`}
      style={{boxShadow: `2px 2px 2px #7B68EE`}}
      >
        <FaWandMagicSparkles className={`text-xl sm:text-5xl text-purple-500 
        hover:text-[#FF00BF] font-extrabold`} 
        />   
      </button>
     </motion.div>
    </form>
  )
}