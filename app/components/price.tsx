import { easeIn, motion, Variants } from "framer-motion"
export function PriceDisplay({num, setPrice}:{num : string | number, setPrice: React.Dispatch<React.SetStateAction<boolean>>}){
    const value = Number(num)
    const isCrore = value >= 100
    const price = isCrore? value / 100 : value
    const currency = isCrore? "Crores": "Lakhs"
    
    const fadeIn: Variants = {
        hidden: {
            opacity: 0
        },
        show:{
            opacity: 1,
            transition:{
              duration:0.75,
              ease:easeIn
            }
        }
    }

    return(
        <motion.div 
        variants={fadeIn}
        initial="hidden"
        animate="show"
        className={`w-fit h-[180px] rounded-lg flex flex-col
        justify-center items-center bg-[whitesmoke] mt-[250] sm:p-8
        p-6 gap-y-7 text-[#2c2a2a]`}
        style={{boxShadow: `8px 6px 40px #2c2a2a`}}>
            <p className={`text-sm sm:text-2xl font-mont text-purple-600
                font-bold`}>
            Estimated price: {`${price.toFixed(2)} ${currency}`}
            </p>
            <button type="button"
            onClick = {()=>setPrice(false)}
            className={`px-2 xm:px-4 text-md sm:text-xl rounded-md text-purple-900
            bg-stone-100 cursor-pointer hover:bg-stone-300
            active:bg-purple-400 active:text-stone-800
            border-2 border-blue-400 font-serif`}
            style={{boxShadow: `5px 5px 5px black`}}>
                Try again
            </button>
        </motion.div>
    )
}


