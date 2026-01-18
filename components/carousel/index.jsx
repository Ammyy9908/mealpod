'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Carousel() {
  const images = [
    { src: '/banner1.jpg', alt: 'Banner 1' },
    { src: '/banner2.jpg', alt: 'Banner 2' },
    { src: '/banner3.jpg', alt: 'Banner 3' },
    { src: '/banner4.jpg', alt: 'Banner 4' },
  ]

  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = images.length

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [totalSlides])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  return (
    <div className="relative w-full overflow-hidden max-h-[400px] sm:max-h-[450px] md:max-h-[500px]">
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((image, index) => (
          <Link 
            key={index} 
            href="/home" 
            className="min-w-full w-full flex-shrink-0 relative block cursor-pointer h-full"
          >
            <Image 
              src={image.src} 
              alt={image.alt} 
              width={1920} 
              height={1080}
              className="w-full h-full object-cover"
              priority={index === 0}
            />
          </Link>
        ))}
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
        {images.map((_, index) => (
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

