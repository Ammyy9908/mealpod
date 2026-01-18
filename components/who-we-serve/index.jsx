'use client'
import React from 'react'

function WhoWeServe() {
  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="w-[90%] m-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8 md:mb-12">
          WHO WE SERVE
        </h2>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Left Card - For Corporate */}
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row min-h-[280px] sm:min-h-[300px] md:min-h-[350px]">
            {/* Image Section - Left */}
            <div className="w-full md:w-2/5 bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center p-6 md:p-8">
              <div className="w-full h-full max-w-[150px] max-h-[200px] sm:max-w-[200px] sm:max-h-[250px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                {/* Placeholder for corporate person image */}
                <svg className="w-full h-full max-w-[120px] max-h-[160px] sm:max-w-[150px] sm:max-h-[200px]" viewBox="0 0 150 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                  {/* Person silhouette */}
                  <ellipse cx="75" cy="50" rx="30" ry="30" stroke="currentColor" strokeWidth="2"/>
                  <path d="M30 120C30 100 50 85 75 85C100 85 120 100 120 120" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  {/* Suit jacket */}
                  <path d="M45 90L45 120M105 90L105 120" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <rect x="50" y="95" width="50" height="30" rx="2" stroke="currentColor" strokeWidth="2"/>
                  {/* Tie */}
                  <path d="M70 90L75 110L80 90" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  {/* Glasses */}
                  <circle cx="65" cy="50" r="8" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="85" cy="50" r="8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M73 50L77 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>

            {/* Text Section - Right */}
            <div className="w-full md:w-3/5 flex flex-col justify-center p-6 md:p-8">
              <div className="mb-4">
                <span className="text-base md:text-lg text-green-600 font-medium">For</span>
                <h3 className="text-3xl md:text-4xl font-bold text-green-600">Corporate</h3>
              </div>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                Healthy lunches & dinners delivered to fuel productivity at work and beyond.
              </p>
            </div>
          </div>

          {/* Right Card - For Students */}
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row-reverse min-h-[280px] sm:min-h-[300px] md:min-h-[350px]">
            {/* Image Section - Right */}
            <div className="w-full md:w-2/5 bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center p-6 md:p-8">
              <div className="w-full h-full max-w-[150px] max-h-[200px] sm:max-w-[200px] sm:max-h-[250px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                {/* Placeholder for student person image */}
                <svg className="w-full h-full max-w-[120px] max-h-[160px] sm:max-w-[150px] sm:max-h-[200px]" viewBox="0 0 150 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                  {/* Person silhouette */}
                  <ellipse cx="75" cy="50" rx="30" ry="30" stroke="currentColor" strokeWidth="2"/>
                  <path d="M30 120C30 100 50 85 75 85C100 85 120 100 120 120" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  {/* Shirt with plaid pattern */}
                  <rect x="50" y="90" width="50" height="35" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M50 105H100M75 90V125" stroke="currentColor" strokeWidth="1.5"/>
                  {/* Backpack */}
                  <rect x="105" y="95" width="15" height="25" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M110 100H115M110 110H115" stroke="currentColor" strokeWidth="1.5"/>
                  {/* Beard */}
                  <path d="M65 70Q75 75 85 70" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  {/* Smile */}
                  <path d="M65 60Q75 65 85 60" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>

            {/* Text Section - Left */}
            <div className="w-full md:w-3/5 flex flex-col justify-center p-6 md:p-8">
              <div className="mb-4">
                <span className="text-base md:text-lg text-white font-medium">For</span>
                <h3 className="text-3xl md:text-4xl font-bold text-white">Students</h3>
              </div>
              <p className="text-white text-sm md:text-base leading-relaxed">
                Affordable, nutritious meals that feel like home, perfect for hostel and PG life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhoWeServe

