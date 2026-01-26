'use client'
import React from 'react'
import Image from 'next/image'

function FlexibleMealPlans() {
  const plans = [
    'Trial Plan',
    'Weekly Plan',
    'Bi-Weekly Plan',
    'Monthly Plan'
  ]

  return (
    <section className="w-full bg-gradient-to-br from-lime-50 via-amber-50 to-amber-100 relative overflow-hidden h-[500px]">
      <div className="relative w-full h-full">
        <Image 
          src="/cta1.jpg" 
          alt="Flexible Meal Plans" 
          width={1000} 
          height={1000}
          className="w-full h-full object-cover"
          sizes="100vw"
        />
      </div>
    </section>
  )
}

export default FlexibleMealPlans

