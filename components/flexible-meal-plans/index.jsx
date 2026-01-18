'use client'
import React from 'react'

function FlexibleMealPlans() {
  const plans = [
    'Trial Plan',
    'Weekly Plan',
    'Bi-Weekly Plan',
    'Monthly Plan'
  ]

  return (
    <section className="w-full bg-gradient-to-br from-lime-50 via-amber-50 to-amber-100 py-12 md:py-16 relative overflow-hidden">
      {/* Background spice elements - blurred */}
      <div className="absolute inset-0 opacity-20">
        {/* Cinnamon sticks */}
        <div className="absolute top-10 left-10 w-20 h-4 bg-amber-800 rounded-full blur-sm transform rotate-12"></div>
        <div className="absolute bottom-20 right-20 w-16 h-4 bg-amber-800 rounded-full blur-sm transform -rotate-12"></div>
        {/* Star anise */}
        <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-amber-700 rounded-full blur-sm"></div>
        <div className="absolute bottom-1/3 left-1/4 w-6 h-6 bg-amber-700 rounded-full blur-sm"></div>
        {/* Cardamom */}
        <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-green-700 rounded-full blur-sm"></div>
        <div className="absolute bottom-1/4 right-1/3 w-5 h-5 bg-green-700 rounded-full blur-sm"></div>
      </div>

      <div className="w-[90%] m-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-center">
          {/* Left Section - Meal Plan Information */}
          <div className="lg:col-span-1">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-red-900 uppercase mb-1 sm:mb-2">
                FLEXIBLE
              </h2>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-red-900 uppercase">
                MEAL PLANS
              </h3>
            </div>
            
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              {plans.map((plan, index) => (
                <div key={index} className="border-b border-gray-300 pb-1.5 sm:pb-2 md:pb-3">
                  <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                    {plan}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Center Section - Meal Tray */}
          <div className="lg:col-span-1 flex items-center justify-center">
            <div className="relative transform rotate-6 sm:rotate-12 md:rotate-12">
              {/* Meal Tray */}
              <div className="w-64 h-80 sm:w-80 sm:h-96 md:w-96 md:h-[480px] bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl shadow-2xl p-4 md:p-6 relative z-10">
                {/* Tray compartments grid */}
                <div className="grid grid-cols-2 gap-3 md:gap-4 h-full">
                  {/* Top-left: Green vegetable dish */}
                  <div className="bg-green-600 rounded-lg p-2 md:p-3 relative overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-green-500 to-green-700 rounded flex items-center justify-center">
                      <div className="absolute top-1 right-1 w-3 h-3 bg-green-300 rounded-full"></div>
                      <div className="absolute bottom-1 left-1 w-2 h-2 bg-green-200 rounded-full"></div>
                    </div>
                    <div className="absolute top-2 right-2 text-green-200 text-xs">🌿</div>
                  </div>

                  {/* Top-right: Rotis/Flatbreads */}
                  <div className="bg-amber-200 rounded-lg p-2 md:p-3 relative overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-300 rounded flex flex-col items-center justify-center gap-1">
                      <div className="w-12 h-2 bg-amber-600 rounded-full"></div>
                      <div className="w-10 h-2 bg-amber-700 rounded-full"></div>
                      <div className="w-12 h-2 bg-amber-600 rounded-full"></div>
                    </div>
                  </div>

                  {/* Middle-left: Reddish-orange curry */}
                  <div className="bg-orange-500 rounded-lg p-2 md:p-3 relative overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 rounded flex items-center justify-center">
                      <div className="absolute top-2 right-2 text-orange-200 text-xs">🌿</div>
                      <div className="w-8 h-8 bg-orange-300 rounded-full opacity-50"></div>
                    </div>
                  </div>

                  {/* Middle-right: Rice with peas */}
                  <div className="bg-white rounded-lg p-2 md:p-3 relative overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-yellow-50 to-yellow-100 rounded flex flex-col items-center justify-center gap-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div className="absolute top-2 right-2 text-green-400 text-xs">🌿</div>
                    </div>
                  </div>

                  {/* Bottom: Salad (spans full width) */}
                  <div className="col-span-2 bg-white rounded-lg p-2 md:p-3 relative overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-red-50 to-pink-50 rounded flex items-center justify-center gap-2">
                      <div className="w-8 h-1 bg-green-400 rounded-full"></div>
                      <div className="w-6 h-1 bg-red-400 rounded-full"></div>
                      <div className="w-8 h-1 bg-green-400 rounded-full"></div>
                      <div className="absolute top-2 right-2 text-green-400 text-xs">🌿</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Discount Offer and CTA */}
          <div className="lg:col-span-1 flex flex-col items-center lg:items-end justify-center gap-6 md:gap-8">
            {/* Discount Badge */}
            <div className="relative">
              <div className="bg-gradient-to-br from-lime-200 to-lime-300 rounded-2xl p-6 md:p-8 shadow-lg relative overflow-hidden">
                <div className="absolute top-2 left-2 text-white text-xs md:text-sm font-bold transform -rotate-12 uppercase">
                  UPTO
                </div>
                <div className="flex items-baseline gap-2 mt-4">
                  <span className="text-5xl sm:text-6xl md:text-7xl font-bold text-amber-900">42</span>
                  <div className="flex flex-col">
                    <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">%</span>
                    <span className="text-lg sm:text-xl md:text-2xl font-bold text-white uppercase">OFF</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Subscribe Now Button */}
            <button className="bg-white text-gray-800 px-8 md:px-12 py-4 md:py-5 rounded-xl text-base sm:text-lg md:text-xl font-semibold hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl touch-manipulation min-h-[44px]">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FlexibleMealPlans

