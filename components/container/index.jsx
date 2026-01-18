import React from 'react'

function Container({ children, className = '' }) {
  return (
    <div className={`w-full sm:w-[90%] lg:w-[70%] m-auto px-4 sm:px-6 ${className}`}>
      {children}
    </div>
  )
}

export default Container