'use client'
import React from 'react'
import Image from 'next/image'

function ReasonsToLove() {
  


  return (
    <section className="mb-16 w-full bg-gradient-to-br from-lime-50 via-lime-100 to-lime-200 h-[500px] relative overflow-hidden">
    
    <Image src="/reason_to_love.jpg" alt="Reasons to Love" width={1000} height={1000} 
    className='w-full h-full object-cover'/>

    

    </section>
  )
}

export default ReasonsToLove

