'use client'
import React from 'react'

function LocationsImpact() {
  const cities = [
    {
      name: 'Mumbai',
      icon: 'gateway',
      gradient: 'from-blue-200 to-blue-300',
      comingSoon: false
    },
    {
      name: 'Pune',
      icon: 'palace',
      gradient: 'from-green-200 to-green-300',
      comingSoon: false
    },
    {
      name: 'Bangalore',
      icon: 'building',
      gradient: 'from-pink-200 to-pink-300',
      comingSoon: false
    },
    {
      name: 'Kolkata',
      icon: 'memorial',
      gradient: 'from-orange-200 to-orange-300',
      comingSoon: false
    },
    {
      name: 'Kota',
      icon: 'palace',
      gradient: 'from-orange-200 to-orange-300',
      comingSoon: false
    },
    {
      name: 'Hyderabad',
      icon: 'charminar',
      gradient: 'from-yellow-200 to-yellow-300',
      comingSoon: true
    },
    {
      name: 'Chennai',
      icon: 'temple',
      gradient: 'from-yellow-200 to-yellow-300',
      comingSoon: true
    }
  ]

  const stats = [
    {
      icon: 'pincode',
      number: '187+',
      label: 'Pin Codes'
    },
    {
      icon: 'chef',
      number: '1000+',
      label: 'Home Chefs'
    },
    {
      icon: 'delivery',
      number: '9,54,210+',
      label: 'Meals Delivered'
    }
  ]

  const renderCityIcon = (iconType) => {
    switch (iconType) {
      case 'gateway':
        return (
          <svg className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Gateway of India - Arch structure */}
            <path d="M15 30L30 15L45 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="20" y="30" width="20" height="20" rx="1" stroke="currentColor" strokeWidth="2"/>
            <path d="M25 30V25M35 30V25" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="30" cy="38" r="2" fill="currentColor"/>
            <path d="M10 50H50" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )
      case 'palace':
        return (
          <svg className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="15" y="25" width="30" height="25" rx="1" stroke="currentColor" strokeWidth="2"/>
            <path d="M20 25V15M40 25V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <rect x="22" y="30" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="32" y="30" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M10 50H50" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )
      case 'building':
        return (
          <svg className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="12" y="20" width="36" height="30" rx="1" stroke="currentColor" strokeWidth="2"/>
            <rect x="18" y="28" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="34" y="28" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="18" y="38" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="34" y="38" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M25 20V10M35 20V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )
      case 'memorial':
        return (
          <svg className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="30" width="20" height="20" rx="1" stroke="currentColor" strokeWidth="2"/>
            <path d="M25 30V20M35 30V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="30" cy="40" r="2" fill="currentColor"/>
            <path d="M15 50H45" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M30 20L35 15L30 10L25 15L30 20Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          </svg>
        )
      case 'charminar':
        return (
          <svg className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Charminar - Four minarets */}
            <rect x="20" y="25" width="20" height="25" rx="1" stroke="currentColor" strokeWidth="2"/>
            <path d="M22 25V18M38 25V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="30" cy="35" r="2" fill="currentColor"/>
            <path d="M15 50H45" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            {/* Four minarets */}
            <rect x="15" y="15" width="6" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="39" y="15" width="6" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="15" y="42" width="6" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="39" y="42" width="6" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M18 15L18 10M42 15L42 10M18 42L18 48M42 42L42 48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        )
      case 'temple':
        return (
          <svg className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="30" width="20" height="20" rx="1" stroke="currentColor" strokeWidth="2"/>
            <path d="M25 30V20M35 30V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="30" cy="40" r="2" fill="currentColor"/>
            <path d="M15 50H45" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M30 20L35 12L30 5L25 12L30 20Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M20 20L30 10L40 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      default:
        return null
    }
  }

  const renderStatIcon = (iconType) => {
    switch (iconType) {
      case 'pincode':
        return (
          <svg className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="20" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M24 28V40M20 36H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="18" cy="16" r="2" fill="currentColor"/>
            <circle cx="30" cy="16" r="2" fill="currentColor"/>
            <circle cx="18" cy="24" r="2" fill="currentColor"/>
            <circle cx="30" cy="24" r="2" fill="currentColor"/>
          </svg>
        )
      case 'chef':
        return (
          <svg className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="12" y="20" width="24" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M18 20V14C18 11.7909 19.7909 10 22 10H26C28.2091 10 30 11.7909 30 14V20" stroke="currentColor" strokeWidth="2"/>
            <path d="M16 28H32M16 32H32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M24 14L24 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M20 10L20 8M28 10L28 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M18 36L16 40M30 36L32 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )
      case 'delivery':
        return (
          <svg className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="18" width="28" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M16 18V14C16 12.8954 16.8954 12 18 12H30C31.1046 12 32 12.8954 32 14V18" stroke="currentColor" strokeWidth="2"/>
            <rect x="14" y="24" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="26" y="24" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M20 38H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="w-[90%] m-auto">
        {/* Cities Section */}
        <div className="mb-12 md:mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6">
            {cities.map((city, index) => (
              <div
                key={index}
                className={`relative bg-gradient-to-br ${city.gradient} rounded-xl p-3 sm:p-4 md:p-6 flex flex-col items-center justify-center min-h-[100px] sm:min-h-[120px] md:min-h-[140px] shadow-md hover:shadow-lg transition-shadow`}
              >
                <div className="text-gray-700 mb-2 sm:mb-3 md:mb-4">
                  {renderCityIcon(city.icon)}
                </div>
                <h3 className="text-xs sm:text-sm md:text-base font-bold text-gray-800 uppercase tracking-wide text-center">
                  {city.name}
                </h3>
                {city.comingSoon && (
                  <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-black/80 text-white text-[8px] sm:text-[10px] md:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                    Coming Soon
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white border-2 border-purple-200 rounded-xl p-6 md:p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-purple-600 mb-3 sm:mb-4 md:mb-6">
                {renderStatIcon(stat.icon)}
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-900 mb-1 sm:mb-2">
                {stat.number}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LocationsImpact

