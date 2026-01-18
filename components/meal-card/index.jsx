import React from 'react'

function MealCard({ title = 'Special Thali', image, onClick, className = '' }) {
  return (
    <div 
      className={`flex flex-col overflow-hidden rounded-lg bg-white cursor-pointer hover:shadow-lg transition-all duration-300 ${className}`}
      onClick={onClick}
    >
      {/* Image Section */}
      <div className='relative w-full bg-gradient-to-b from-gray-200 via-gray-100 to-white flex items-center justify-center overflow-hidden aspect-[4/3]'>
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className='w-full h-full object-cover'
          />
        ) : (
          <div className='flex items-center justify-center w-full h-full p-8'>
            {/* Placeholder for meal image */}
            <svg 
              width="120" 
              height="120" 
              viewBox="0 0 120 120" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className='text-gray-400'
            >
              <rect x="20" y="20" width="80" height="80" rx="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="40" cy="40" r="4" fill="currentColor"/>
              <circle cx="60" cy="40" r="4" fill="currentColor"/>
              <circle cx="80" cy="40" r="4" fill="currentColor"/>
              <rect x="30" y="55" width="60" height="8" rx="4" fill="currentColor"/>
              <rect x="30" y="70" width="45" height="8" rx="4" fill="currentColor"/>
            </svg>
          </div>
        )}
      </div>
      
      {/* Title Section */}
      <div className='bg-white py-4 px-4 flex items-center justify-center min-h-[60px] border-t border-gray-100'>
        <span className='text-gray-800 text-lg font-semibold text-center'>
          {title}
        </span>
      </div>
    </div>
  )
}

export default MealCard