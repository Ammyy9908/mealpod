'use client'
import React, { useState } from 'react'

function PromotionalCarousel({ onViewGallery, onViewMenu }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleViewMenu = () => {
    setIsExpanded(false)
    if (onViewMenu) {
      onViewMenu()
    }
  }

  const handleViewGallery = () => {
    setIsExpanded(false)
    if (onViewGallery) {
      onViewGallery()
    }
  }

  const toggleFAB = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="w-full mb-8 sm:mb-12">
      {/* Header with Back Arrow */}
      <div className="flex items-center justify-between mb-6 px-2 sm:px-4">
        <button
          onClick={() => window.history.back()}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black hover:bg-gray-800 text-white flex items-center justify-center transition-colors touch-manipulation"
          aria-label="Go back"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* FAB Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        {/* Child Buttons */}
        <div className={`flex flex-col gap-3 transition-all duration-300 ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          {/* View Menu Button */}
          <button
            onClick={handleViewMenu}
            className={`bg-teal-700 hover:bg-teal-800 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 touch-manipulation ${
              isExpanded ? 'scale-100' : 'scale-0'
            }`}
            aria-label="View Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {/* View Gallery Button */}
          <button
            onClick={handleViewGallery}
            className={`bg-teal-700 hover:bg-teal-800 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 touch-manipulation ${
              isExpanded ? 'scale-100' : 'scale-0'
            }`}
            aria-label="View Gallery"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M3 9H21" stroke="currentColor" strokeWidth="2"/>
              <path d="M9 3V21" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
        </div>

        {/* Main FAB Button */}
        <button
          onClick={toggleFAB}
          className={`bg-teal-700 hover:bg-teal-800 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-transform duration-300 touch-manipulation ${
            isExpanded ? 'rotate-45' : 'rotate-0'
          }`}
          aria-label={isExpanded ? 'Close menu' : 'Open menu'}
        >
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-300"
          >
            <path 
              d="M12 5V19M5 12H19" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default PromotionalCarousel

