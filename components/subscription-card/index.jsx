import React from 'react'
import Image from 'next/image'

function SubscriptionCard({ title = 'STUDENTS', image, onClick, className = '' }) {
  return (
    <div 
      className={`flex flex-col overflow-hidden rounded-lg lg:rounded-lg md:rounded-xl sm:rounded-xl cursor-pointer border-0 lg:border lg:border-gray-200 shadow-sm lg:shadow-lg md:shadow-xl sm:shadow-xl hover:shadow-xl md:hover:shadow-2xl sm:hover:shadow-2xl lg:hover:shadow-lg active:scale-[0.98] md:active:scale-[0.98] sm:active:scale-[0.98] transition-all duration-300 bg-white ${className}`}
      onClick={onClick}
    >
      {/* Image Section */}
      <div className='relative w-full bg-gradient-to-b from-gray-200 via-gray-100 to-white flex items-center justify-center overflow-hidden h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px]'>
        {image ? (
          <>
            <Image 
              src={image} 
              alt={title} 
              fill
              className='object-cover'
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Black Overlay - Visible on Mobile & Tablet */}
            <div className='absolute inset-0 bg-black bg-opacity-25 lg:bg-opacity-0 md:bg-opacity-25 sm:bg-opacity-25 z-10 transition-opacity duration-300'></div>
            {/* Title - Visible on Mobile & Tablet */}
            <div className='absolute inset-0 flex items-center justify-center z-20 lg:hidden md:flex sm:flex'>
              <h3 className='text-white text-2xl md:text-3xl sm:text-2xl font-bold text-center px-4 drop-shadow-lg'>
                {title}
              </h3>
            </div>
          </>
        ) : (
          <div className='flex items-center justify-center w-full h-full p-8'>
            {/* Placeholder for student image */}
            <svg 
              width="120" 
              height="120" 
              viewBox="0 0 120 120" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className='text-gray-400'
            >
              <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="60" cy="45" r="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M30 95C30 80 43 68 60 68C77 68 90 80 90 95" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}

export default SubscriptionCard