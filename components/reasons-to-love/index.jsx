'use client'
import React from 'react'

function ReasonsToLove() {
  const reasons = [
    {
      icon: 'menu',
      title: 'Har Din Special Menu',
      description: "Say goodbye to boring repeats - enjoy a new menu every day!"
    },
    {
      icon: 'eco',
      title: 'Eco Friendly Packaging',
      description: 'Healthy food in earth-friendly packs.'
    },
    {
      icon: 'delivery',
      title: 'Doorstep Delivery',
      description: "Your mom's kitchen, now just a doorbell away!"
    },
    {
      icon: 'homemade',
      title: '100% Home Made Food',
      description: 'Purely homemade, just like maa makes it.'
    },
    {
      icon: 'reschedule',
      title: 'Flexible Reschedule',
      description: 'Plans change? No worries! Easily reschedule your meals anytime.'
    }
  ]

  const renderIcon = (iconType) => {
    switch (iconType) {
      case 'menu':
        return (
          <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="8" width="20" height="2" rx="1" fill="white"/>
            <rect x="6" y="13" width="20" height="2" rx="1" fill="white"/>
            <rect x="6" y="18" width="20" height="2" rx="1" fill="white"/>
            <rect x="6" y="23" width="20" height="2" rx="1" fill="white"/>
          </svg>
        )
      case 'eco':
        return (
          <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="18" width="16" height="10" rx="1" stroke="white" strokeWidth="2"/>
            <path d="M12 18V12C12 10.8954 12.8954 10 14 10H18C19.1046 10 20 10.8954 20 12V18" stroke="white" strokeWidth="2"/>
            <path d="M16 8V6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M10 10L9 9M22 10L23 9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M16 18L16 12M12 14L16 12L20 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      case 'delivery':
        return (
          <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="12" width="18" height="12" rx="1" stroke="white" strokeWidth="2"/>
            <path d="M8 12V8C8 6.89543 8.89543 6 10 6H20C21.1046 6 22 6.89543 22 8V12" stroke="white" strokeWidth="2"/>
            <circle cx="11" cy="22" r="2" fill="white"/>
            <circle cx="21" cy="22" r="2" fill="white"/>
            <path d="M16 16H18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )
      case 'homemade':
        return (
          <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 16L16 6L26 16V26C26 27.1046 25.1046 28 24 28H8C6.89543 28 6 27.1046 6 26V16Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 28V20H22V28" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 6V12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="16" cy="18" r="2" fill="white"/>
            <path d="M12 14L14 16M20 14L18 16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )
      case 'reschedule':
        return (
          <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="8" width="20" height="18" rx="2" stroke="white" strokeWidth="2"/>
            <path d="M6 14H26" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M12 6V10M20 6V10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M16 18L16 22M14 20L16 22L18 20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="16" cy="16" r="6" stroke="white" strokeWidth="2"/>
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <section className="w-full bg-gradient-to-br from-lime-50 via-lime-100 to-lime-200 py-12 md:py-16 relative overflow-hidden">
      {/* Concentric circles background */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/4 opacity-30">
        <div className="w-64 h-64 md:w-96 md:h-96 rounded-full border-4 border-lime-300"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-72 md:h-72 rounded-full border-4 border-lime-400"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-lime-500"></div>
      </div>

      {/* Blurred hand placeholder - positioned in the circles */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/4 w-48 h-48 md:w-64 md:h-64 flex items-center justify-center z-10">
        <div className="w-full h-full bg-gradient-to-br from-pink-200 to-pink-300 rounded-full blur-md flex items-center justify-center">
          {/* Hand showing 5 fingers */}
          <svg width="120" height="150" viewBox="0 0 120 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-70">
            {/* Hand outline */}
            <ellipse cx="60" cy="100" rx="35" ry="40" fill="currentColor" className="text-pink-400"/>
            {/* Fingers extended */}
            <ellipse cx="30" cy="40" rx="8" ry="25" fill="currentColor" className="text-pink-300"/>
            <ellipse cx="45" cy="35" rx="8" ry="30" fill="currentColor" className="text-pink-300"/>
            <ellipse cx="60" cy="30" rx="8" ry="35" fill="currentColor" className="text-pink-300"/>
            <ellipse cx="75" cy="35" rx="8" ry="30" fill="currentColor" className="text-pink-300"/>
            <ellipse cx="90" cy="40" rx="8" ry="25" fill="currentColor" className="text-pink-300"/>
          </svg>
        </div>
      </div>

      <div className="w-[90%] m-auto relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Section - Title Card */}
          <div className="flex justify-center lg:justify-start">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg max-w-md">
              <div className="flex flex-col">
                <span className="text-6xl md:text-7xl font-bold text-green-600 mb-2">5</span>
                <span className="text-2xl md:text-3xl font-bold text-green-700 leading-tight">
                  REASONS TO<br />LOVE MEALAWE
                </span>
              </div>
            </div>
          </div>

          {/* Right Section - Feature Cards */}
          <div className="flex flex-col gap-4 md:gap-5">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 md:p-6 shadow-md flex items-start gap-4 hover:shadow-lg transition-shadow"
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-green-600 rounded-lg flex items-center justify-center">
                  {renderIcon(reason.icon)}
                </div>
                
                {/* Text Content */}
                <div className="flex-1">
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 mb-1">
                    {reason.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscribe Now Button */}
        <div className="flex justify-center mt-6 sm:mt-8 md:mt-12">
          <button className="bg-green-600 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full text-base sm:text-lg md:text-xl font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl touch-manipulation min-h-[44px]">
            Subscribe Now
          </button>
        </div>
      </div>
    </section>
  )
}

export default ReasonsToLove

