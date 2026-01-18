import React from 'react'

function SubscriptionCard({ title = 'STUDENTS', image, onClick, className = '' }) {
  return (
    <div 
      className={`flex flex-col overflow-hidden rounded-lg bg-white cursor-pointer hover:shadow-lg transition-all duration-300 ${className}`}
      onClick={onClick}
    >
      {/* Image Section - Upper 2/3 */}
      <div className='relative flex-[2] bg-gradient-to-b from-gray-200 via-gray-100 to-white flex items-center justify-center overflow-hidden min-h-[200px]'>
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className='w-full h-full object-cover'
          />
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
      
      {/* Text Bar Section - Bottom 1/3 */}
      <div className='flex-[1] bg-green-600 py-4 flex items-center justify-center min-h-[60px]'>
        <span className='text-white text-xl font-bold uppercase tracking-wide'>
          {title}
        </span>
      </div>
    </div>
  )
}

export default SubscriptionCard