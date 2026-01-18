'use client'
import React, { useState, useEffect } from 'react'

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [radius, setRadius] = useState(80) // Default mobile radius

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 2) // 2 slides
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [])

  // Responsive radius calculation
  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth >= 768) {
        setRadius(140) // md and above
      } else if (window.innerWidth >= 640) {
        setRadius(100) // sm
      } else {
        setRadius(80) // mobile
      }
    }

    updateRadius()
    window.addEventListener('resize', updateRadius)
    return () => window.removeEventListener('resize', updateRadius)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 2)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 2) % 2)
  }

  return (
    <div className="relative w-full overflow-hidden">
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {/* Slide 1 - Main Promotional Banner */}
        <div className="min-w-full flex flex-col md:flex-row">
          {/* Left Section - Text Content */}
          <div className="w-full md:w-1/2 bg-gradient-to-b from-lime-100 to-lime-200 flex items-center justify-center p-6 sm:p-8 md:p-12 min-h-[300px] sm:min-h-[400px]">
            <div className="text-center md:text-left max-w-md px-4 sm:px-0">
              <p className="text-gray-700 text-base sm:text-lg md:text-xl mb-2">Tired of same</p>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4 relative inline-block">
                <span className="relative">
                  Boring
                  <span className="absolute bottom-0 left-0 right-0 h-1.5 sm:h-2 bg-red-500 transform -rotate-1"></span>
                </span>
                {' '}food
              </h2>
              <p className="text-gray-700 text-base sm:text-lg md:text-xl mb-3 sm:mb-4">Try MEALAWE !</p>
              <h3 className="text-3xl sm:text-4xl md:text-6xl font-bold text-amber-900 mb-1 sm:mb-2">Everyday</h3>
              <h3 className="text-3xl sm:text-4xl md:text-6xl font-bold text-amber-900 mb-6 sm:mb-8">different menu!</h3>
              <button className="bg-amber-900 text-amber-100 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-amber-800 transition-colors touch-manipulation min-h-[44px]">
                Try 3-Days Plan
              </button>
            </div>
          </div>

          {/* Right Section - Food Display */}
          <div className="w-full md:w-1/2 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 relative overflow-hidden">
            {/* Wooden texture pattern */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `
                repeating-linear-gradient(90deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 2px, transparent 2px, transparent 4px),
                repeating-linear-gradient(0deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 2px)
              `,
            }}></div>
            
            <div className="relative z-10 p-4 sm:p-6 md:p-12 flex items-center justify-center min-h-[350px] sm:min-h-[400px] md:min-h-[500px]">
              {/* Central Plate Container */}
              <div className="relative w-full h-full max-w-lg">
                {/* Large central oval plate */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-32 sm:w-56 sm:h-40 md:w-72 md:h-52 bg-white rounded-3xl shadow-2xl z-20 overflow-hidden">
                  <div className="w-full h-full p-2 sm:p-3 md:p-4 flex flex-col justify-between">
                    {/* Top section - Rotis */}
                    <div className="flex justify-end gap-0.5 sm:gap-1">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-amber-700 rounded-full"></div>
                      <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-amber-800 rounded-full"></div>
                      <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-amber-700 rounded-full"></div>
                    </div>
                    
                    {/* Middle section - Paneer curry */}
                    <div className="flex justify-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-orange-500 rounded-lg"></div>
                    </div>
                    
                    {/* Bottom section - Rice, Dal, Salad */}
                    <div className="flex justify-between items-end">
                      <div className="w-16 h-10 sm:w-20 sm:h-12 md:w-24 md:h-14 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg"></div>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-yellow-400 rounded-full"></div>
                      <div className="flex gap-0.5 sm:gap-1">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Day bowls arranged in a circle around the plate */}
                {[
                  { day: 'Monday', angle: 210, color: 'bg-green-600', labelColor: 'text-yellow-300' },
                  { day: 'Tuesday', angle: 240, color: 'bg-orange-500', labelColor: 'text-yellow-300' },
                  { day: 'Wednesday', angle: 270, color: 'bg-yellow-400', labelColor: 'text-yellow-300' },
                  { day: 'Thursday', angle: 300, color: 'bg-red-500', labelColor: 'text-yellow-300' },
                  { day: 'Friday', angle: 330, color: 'bg-yellow-300', labelColor: 'text-yellow-300' },
                  { day: 'Saturday', angle: 30, color: 'bg-amber-800', labelColor: 'text-yellow-300' },
                  { day: 'Sunday', angle: 60, color: 'bg-green-700', labelColor: 'text-yellow-300' },
                ].map((item, idx) => {
                  const angleRad = (item.angle * Math.PI) / 180;
                  const x = Math.cos(angleRad) * radius;
                  const y = Math.sin(angleRad) * radius;
                  
                  return (
                    <div 
                      key={idx} 
                      className="absolute top-1/2 left-1/2 z-10"
                      style={{
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                      }}
                    >
                      <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 bg-white rounded-full shadow-lg flex items-center justify-center">
                        <div className={`w-7 h-7 sm:w-10 sm:h-10 md:w-14 md:h-14 ${item.color} rounded-full`}></div>
                      </div>
                      <p className={`${item.labelColor} text-[8px] sm:text-[10px] md:text-xs font-bold mt-0.5 sm:mt-1 text-center whitespace-nowrap hidden sm:block`} style={{
                        transform: `rotate(${-item.angle}deg)`,
                        transformOrigin: 'center'
                      }}>
                        {item.day}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Slide 2 - Additional promotional content (optional) */}
        <div className="min-w-full flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 bg-gradient-to-b from-lime-100 to-lime-200 flex items-center justify-center p-6 sm:p-8 md:p-12 min-h-[300px] sm:min-h-[400px]">
            <div className="text-center md:text-left max-w-md px-4 sm:px-0">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-amber-900 mb-3 sm:mb-4">Fresh & Healthy</h2>
              <p className="text-gray-700 text-base sm:text-lg md:text-xl mb-5 sm:mb-6">Delivered fresh to your doorstep every day</p>
              <button className="bg-amber-900 text-amber-100 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-amber-800 transition-colors touch-manipulation min-h-[44px]">
                Order Now
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 flex items-center justify-center p-6 sm:p-8 md:p-12 min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
            <div className="text-center text-white px-4">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Home-Cooked Meals</h3>
              <p className="text-base sm:text-lg md:text-xl text-amber-100">Made with love, delivered with care</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-colors z-30 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Previous slide"
      >
        <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-colors z-30 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Next slide"
      >
        <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
        {[0, 1].map((index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 sm:h-2.5 rounded-full transition-all touch-manipulation min-w-[24px] min-h-[24px] flex items-center justify-center ${
              currentSlide === index ? 'bg-white w-6 sm:w-8' : 'bg-white/50 w-2 sm:w-2.5'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel

