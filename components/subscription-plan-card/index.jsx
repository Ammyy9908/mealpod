import React from 'react'
import Image from 'next/image'
import VegIcon from '@/components/icons/veg/index.jsx'

function SubscriptionPlanCard({ plan, onAddToCart }) {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(plan)
    }
  }

  return (
    <div className="bg-white rounded-lg lg:rounded-lg md:rounded-xl sm:rounded-xl overflow-hidden border-0 lg:border lg:border-gray-200 shadow-sm lg:shadow-lg md:shadow-xl sm:shadow-xl hover:shadow-xl md:hover:shadow-2xl sm:hover:shadow-2xl transition-shadow duration-300">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center">
        {/* Left Side - Text Information */}
        <div className="flex-1 p-6 lg:p-8 md:p-8 sm:p-6 bg-white w-full">
         <div className='flex items-center gap-2 mb-3'>
            {plan.isVeg && <span><VegIcon width={20} height={20} /></span>}
            {plan.isBestseller && <span className='text-xs text-gray-500 font-semibold uppercase'>Best Seller</span>}
         </div>
         <h3 className='text-2xl md:text-3xl sm:text-2xl font-bold text-gray-800 mb-4'>{plan.title}</h3>
         <div className='space-y-3'>
            <div className='flex items-center gap-2 flex-wrap'>
              <h4 className='text-xl md:text-2xl sm:text-xl text-gray-900 font-bold'>₹{plan.perMealPrice}</h4>
              <h4 className='text-sm md:text-base sm:text-sm text-gray-500 font-medium line-through'>₹{plan.perMealOriginalPrice}</h4>
              <span className='text-xs md:text-sm sm:text-xs text-green-600 font-semibold uppercase bg-green-50 px-2 py-1 rounded'>{plan.discount}% off</span>
            </div>
            <p className='text-sm md:text-base sm:text-sm text-gray-600 leading-relaxed'>{plan.description}</p>
            <div className='flex items-center gap-2'>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 4V8M8 12H8.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className='text-sm md:text-base sm:text-sm text-gray-700 font-medium'>{plan.planDuration}</span>
            </div>
            
            <div className='mt-6 md:mt-6 sm:mt-4'>
              <button 
                onClick={handleAddToCart} 
                className='w-full md:w-auto sm:w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white px-6 py-3 md:px-8 md:py-3 sm:px-6 sm:py-3 rounded-lg md:rounded-lg sm:rounded-lg font-semibold text-base md:text-lg sm:text-base transition-all duration-200 shadow-md hover:shadow-lg active:shadow-md touch-manipulation'
              >
                Add to Cart
              </button>
            </div>
         </div>
        </div>

        {/* Right Side - Image with Overlay */}
        <div className="flex items-center justify-center w-full lg:w-auto bg-gradient-to-br from-orange-100 to-blue-100 lg:bg-transparent md:bg-gradient-to-br md:from-orange-100 md:to-blue-100 sm:bg-gradient-to-br sm:from-orange-100 sm:to-blue-100">
          <div className="image_background w-full lg:w-[300px] md:w-full sm:w-full h-[250px] lg:h-[300px] md:h-[300px] sm:h-[250px] flex items-center justify-center p-4 lg:p-0 md:p-6 sm:p-4">
            <Image 
              src={plan.image} 
              alt={plan.title} 
              width={500} 
              height={500}
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionPlanCard

