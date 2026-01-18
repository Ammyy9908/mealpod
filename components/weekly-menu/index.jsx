'use client'
import React, { useState, useEffect } from 'react'

function WeeklyMenu({ isOpen, onClose, subscriptionName = 'Deluxe Thali', onViewGallery }) {
  const [activeTab, setActiveTab] = useState('Lunch')
  const [isVegMenu, setIsVegMenu] = useState(true)

  // Weekly menu data
  const weeklyMenu = {
    Lunch: [
      {
        day: 'Sunday',
        items: ['Mix Veg', '3 Chapatti', 'Steam Rice', 'Dal', 'Salad']
      },
      {
        day: 'Monday',
        items: ['Paneer masala Gravy', '3 Chapatti', 'Steam Rice', 'Mung dal Tadka', 'Salad']
      },
      {
        day: 'Tuesday',
        items: ['Bhindi Fry', '3 chapatti', 'Green Peas Pulav', 'Cucumber Raita', 'Salad']
      },
      {
        day: 'Wednesday',
        items: ['Aalo & Cauliflower', '3 Chapatti', 'Jeera Rice', 'Panchmel Dal', 'Salad']
      },
      {
        day: 'Thursday',
        items: ['Rajma Gravy', '3 Chapatti', 'Veg Pulav', 'Raita', 'Salad']
      },
      {
        day: 'Friday',
        items: ['Cabbage & Channa Dal', '3 chapatti', 'Masala Rice', 'Koshimbir']
      },
      {
        day: 'Saturday',
        items: ['Matki Masala', '3 chapatti', 'Jeera Rice', 'Mung dal fry', 'Salad']
      }
    ],
    Dinner: [
      {
        day: 'Sunday',
        items: ['Mix Veg', '3 Chapatti', 'Steam Rice', 'Dal', 'Salad']
      },
      {
        day: 'Monday',
        items: ['Paneer masala Gravy', '3 Chapatti', 'Steam Rice', 'Mung dal Tadka', 'Salad']
      },
      {
        day: 'Tuesday',
        items: ['Bhindi Fry', '3 chapatti', 'Green Peas Pulav', 'Cucumber Raita', 'Salad']
      },
      {
        day: 'Wednesday',
        items: ['Aalo & Cauliflower', '3 Chapatti', 'Jeera Rice', 'Panchmel Dal', 'Salad']
      },
      {
        day: 'Thursday',
        items: ['Rajma Gravy', '3 Chapatti', 'Veg Pulav', 'Raita', 'Salad']
      },
      {
        day: 'Friday',
        items: ['Cabbage & Channa Dal', '3 chapatti', 'Masala Rice', 'Koshimbir']
      },
      {
        day: 'Saturday',
        items: ['Matki Masala', '3 chapatti', 'Jeera Rice', 'Mung dal fry', 'Salad']
      }
    ]
  }

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const currentMenu = weeklyMenu[activeTab] || []

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[60] transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 lg:w-[450px] bg-white z-[70] shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
          <div className="px-4 py-4 flex items-center gap-4">
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors touch-manipulation"
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h2 className="text-lg font-semibold text-gray-900 flex-1">{subscriptionName}</h2>
            {onViewGallery && (
              <button
                onClick={onViewGallery}
                className="text-sm text-teal-700 hover:text-teal-800 font-medium px-3 py-1.5 rounded-md hover:bg-teal-50 transition-colors"
              >
                View Photo
              </button>
            )}
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 px-4">
            <button
              onClick={() => setActiveTab('Lunch')}
              className={`flex-1 py-3 text-center font-medium transition-colors ${
                activeTab === 'Lunch'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Lunch
            </button>
            <button
              onClick={() => setActiveTab('Dinner')}
              className={`flex-1 py-3 text-center font-medium transition-colors ${
                activeTab === 'Dinner'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Dinner
            </button>
          </div>
        </div>

        {/* Menu Content */}
        <div className="overflow-y-auto h-[calc(100vh-140px)]">
          {/* VEG MENU Toggle */}
          <div className="px-4 py-4 border-b border-gray-200 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">VEG MENU</span>
            <button
              onClick={() => setIsVegMenu(!isVegMenu)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isVegMenu ? 'bg-green-600' : 'bg-gray-300'
              }`}
              role="switch"
              aria-checked={isVegMenu}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isVegMenu ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Weekly Menu List */}
          <div className="px-4 py-4 space-y-4">
            {currentMenu.map((dayMenu, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                <h3 className="text-base font-semibold text-gray-900 mb-2">{dayMenu.day}</h3>
                <div className="space-y-1">
                  {dayMenu.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="text-sm text-gray-700 flex items-start">
                      <span className="text-gray-400 mr-2">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default WeeklyMenu

