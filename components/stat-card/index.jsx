import React from 'react'

function StatCard({ title = '100+', description = 'Meal Plans' }) {
  return (
    <div className='flex flex-col items-center justify-center shadow-md rounded-lg p-6 bg-white font-sans'>
      <h3 className='text-4xl font-bold text-gray-700 mb-1'>{title}</h3>
      <p className='text-sm font-normal text-gray-500'>{description}</p>
    </div>
  )
}

export default StatCard