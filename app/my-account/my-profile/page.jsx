'use client'
import React, { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/header/index.jsx'
import ProfileAside from '@/components/profile/aside/index.jsx'

function Page() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [userProfile, setUserProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedPreferences, setSelectedPreferences] = useState([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Cuisine preferences data
  const cuisines = [
    { id: 'maharashtrian', name: 'Maharashtrian', script: 'म' },
    { id: 'punjabi', name: 'Punjabi', script: 'प' },
    { id: 'rajasthani', name: 'Rajasthani', script: 'रा' },
    { id: 'gujrati', name: 'Gujrati', script: 'ग' },
    { id: 'bengali', name: 'Bengali', script: 'ब' },
    { id: 'bihari', name: 'Bihari', script: 'बि' },
    { id: 'south-indian', name: 'South Indian', script: 'द' },
    { id: 'north-eastern', name: 'North Eastern', script: 'अ' },
  ]

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (status === 'authenticated') {
        try {
          const response = await fetch('/api/user/profile', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })

          if (response.ok) {
            const data = await response.json()
            setUserProfile(data.user || data)
          }
        } catch (error) {
          console.error('Error fetching user profile:', error)
        } finally {
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
      }
    }

    fetchUserProfile()
  }, [status])

  const handleEdit = () => {
    setIsEditMode(!isEditMode)
  }

  const displayName = userProfile?.name || session?.user?.name || 'Please provide your name'
  const displayPhone = userProfile?.phone || '+91-7406644532'
  const displayEmail = userProfile?.email || session?.user?.email || 'Please provide your email'

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
        {/* Hamburger Button for Mobile/Tablet */}
        {!isSidebarOpen && (
          <button
            onClick={() => {
              console.log('Hamburger clicked, setting sidebar open')
              setIsSidebarOpen(true)
            }}
            className="lg:hidden fixed top-[88px] left-4 z-[60] p-2 bg-white rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition-colors touch-manipulation"
            aria-label="Open menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-700">
              <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

        {/* Left Sidebar Navigation */}
        <ProfileAside 
          isOpen={isSidebarOpen} 
          onClose={() => {
            console.log('Closing sidebar')
            setIsSidebarOpen(false)
          }} 
        />

          {/* Main Content Area */}
          <main className="flex-1 w-full lg:ml-64 p-4 lg:p-8 pt-16 lg:pt-8 lg:h-[calc(100vh-80px)] lg:overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-gray-500">Loading...</div>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto">
                {/* My Profile Header */}
                <div className="bg-green-600 text-white px-6 py-4 rounded-t-lg flex items-center justify-between mb-6">
                  <h1 className="text-xl font-semibold">My Profile</h1>
                  <button
                    onClick={handleEdit}
                    className="text-green-100 hover:text-white font-medium transition-colors touch-manipulation"
                  >
                    EDIT
                  </button>
                </div>

                {/* User Information Section */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <div className="space-y-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      {isEditMode ? (
                        <input
                          type="text"
                          defaultValue={displayName}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      ) : (
                        <p className="text-gray-900">{displayName}</p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone No.</label>
                      {isEditMode ? (
                        <input
                          type="tel"
                          defaultValue={displayPhone}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      ) : (
                        <p className="text-gray-900">{displayPhone}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      {isEditMode ? (
                        <input
                          type="email"
                          defaultValue={displayEmail}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      ) : (
                        <p className="text-gray-900">{displayEmail}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Preferences Section */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Preferences</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Your Preferred Cuisines
                      </label>
                      <select
                        multiple
                        value={selectedPreferences}
                        onChange={(e) => {
                          const selected = Array.from(e.target.selectedOptions, option => option.value)
                          setSelectedPreferences(selected)
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[120px]"
                        size="8"
                      >
                        {cuisines.map((cuisine) => (
                          <option key={cuisine.id} value={cuisine.id}>
                            {cuisine.name} ({cuisine.script})
                          </option>
                        ))}
                      </select>
                      <p className="mt-2 text-xs text-gray-500">
                        Hold Ctrl (or Cmd on Mac) to select multiple cuisines
                      </p>
                    </div>
                    {selectedPreferences.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Selected Preferences:</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedPreferences.map((prefId) => {
                            const cuisine = cuisines.find(c => c.id === prefId)
                            return (
                              <span
                                key={prefId}
                                className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                              >
                                {cuisine?.name}
                                <button
                                  onClick={() => {
                                    setSelectedPreferences(selectedPreferences.filter(id => id !== prefId))
                                  }}
                                  className="ml-1 hover:text-green-900"
                                  aria-label={`Remove ${cuisine?.name}`}
                                >
                                  ×
                                </button>
                              </span>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </main>
      </div>
    </>
  )
}

export default Page