'use client'
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Header from '@/components/header/index.jsx'
import ProfileAside from '@/components/profile/aside/index.jsx'

function Page() {
  const { data: session, status } = useSession()
  const [addresses, setAddresses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const fetchAddresses = async () => {
      if (status === 'authenticated') {
        try {
          const response = await fetch('/api/user/addresses', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })

          if (response.ok) {
            const data = await response.json()
            // Handle both array and object with addresses property
            setAddresses(Array.isArray(data) ? data : (data.addresses || []))
          }
        } catch (error) {
          console.error('Error fetching addresses:', error)
        } finally {
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
      }
    }

    fetchAddresses()
  }, [status])

  const handleDelete = async (addressId) => {
    if (!confirm('Are you sure you want to delete this address?')) {
      return
    }

    try {
      const response = await fetch(`/api/user/addresses?addressId=${addressId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        // Remove the address from the list
        setAddresses(addresses.filter(addr => addr.id !== addressId))
      } else {
        alert('Failed to delete address. Please try again.')
      }
    } catch (error) {
      console.error('Error deleting address:', error)
      alert('An error occurred while deleting the address.')
    }
  }

  const formatAddress = (address) => {
    const parts = []
    if (address.address_line_1) parts.push(address.address_line_1)
    if (address.address_line_2) parts.push(address.address_line_2)
    if (address.city) parts.push(address.city)
    if (address.state) parts.push(address.state)
    if (address.postal_code) parts.push(address.postal_code)
    if (address.country) parts.push(address.country)
    
    let formatted = parts.join(', ')
    
    if (address.landmark) {
      formatted += `, landmark: ${address.landmark}`
    }
    
    return formatted
  }

  const getAddressTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'home':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
            <path d="M3 10L10 3L17 10M4 9V16C4 16.5523 4.44772 17 5 17H8V13C8 12.4477 8.44772 12 9 12H11C11.5523 12 12 12.4477 12 13V17H15C15.5523 17 16 16.5523 16 16V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      case 'work':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
            <rect x="3" y="5" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 9H13M7 13H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      default:
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
            <path d="M10 2C7.23858 2 5 4.23858 5 7C5 9.76142 7.23858 12 10 12C12.7614 12 15 9.76142 15 7C15 4.23858 12.7614 2 10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 12V18M6 18H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
        {/* Hamburger Button for Mobile/Tablet */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden fixed top-[88px] left-4 z-30 p-2 bg-white rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition-colors touch-manipulation"
          aria-label="Open menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-700">
            <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Left Sidebar Navigation */}
        <ProfileAside isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main Content Area */}
        <main className="flex-1 w-full lg:ml-64 p-4 lg:p-8 pt-16 lg:pt-8 lg:h-[calc(100vh-80px)] lg:overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-gray-500">Loading...</div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              {/* Manage Addresses Header */}
              <div className="bg-green-600 text-white px-6 py-4 rounded-t-lg mb-6">
                <h1 className="text-xl font-semibold">Manage Addresses</h1>
              </div>

              {/* Addresses List */}
              <div className="space-y-4">
                {addresses.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <p className="text-gray-500 mb-4">No addresses found.</p>
                    <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      Add New Address
                    </button>
                  </div>
                ) : (
                  addresses.map((address) => (
                    <div
                      key={address.id || address._id}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                    >
                      {/* Address Type */}
                      <div className="flex items-center gap-2 mb-3">
                        {getAddressTypeIcon(address.type || address.address_type)}
                        <span className="font-semibold text-gray-900 capitalize">
                          {address.type || address.address_type || 'Address'}
                        </span>
                      </div>

                      {/* Address Details */}
                      <div className="mb-4">
                        <p className="text-gray-700 leading-relaxed">
                          {formatAddress(address) || address.full_address || 'No address details available'}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                        <button
                          onClick={() => {
                            // TODO: Implement edit functionality
                            console.log('Edit address:', address)
                          }}
                          className="text-green-600 hover:text-green-700 font-medium transition-colors touch-manipulation"
                        >
                          EDIT
                        </button>
                        <button
                          onClick={() => handleDelete(address.id || address._id)}
                          className="text-red-600 hover:text-red-700 font-medium transition-colors touch-manipulation"
                        >
                          DELETE
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  )
}

export default Page