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
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    address: '',
    doorFlatNo: '',
    addressLine2: '',
    city: '',
    pincode: '',
    state: '',
    addressType: 'home'
  })

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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isAddAddressModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isAddAddressModalOpen])

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

  // Indian states list
  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands',
    'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi',
    'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSaveAddress = async () => {
    // Validate required fields
    if (!formData.address.trim() || !formData.city.trim() || !formData.pincode.trim() || !formData.state.trim() || !formData.addressType) {
      alert('Please fill in all required fields')
      return
    }

    setIsSaving(true)
    try {
      // Build address_line_1 with door/flat number if provided
      let addressLine1 = formData.address.trim()
      if (formData.doorFlatNo.trim()) {
        addressLine1 = `${formData.doorFlatNo.trim()}, ${addressLine1}`
      }

      // Prepare address data for backend
      const addressData = {
        address: addressLine1,
        addressLine2: formData.addressLine2.trim() || '',
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),
        addressType: formData.addressType,
        country: 'India' // Default to India
      }

      const response = await fetch('/api/user/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(addressData),
      })

      if (response.ok) {
        const data = await response.json()
        
        // Add the new address to the list
        const newAddress = data.address || data
        setAddresses(prev => [...prev, newAddress])
        
        // Close modal and reset form
        setIsAddAddressModalOpen(false)
        setFormData({
          address: '',
          doorFlatNo: '',
          addressLine2: '',
          city: '',
          pincode: '',
          state: '',
          addressType: 'home'
        })
        
        // Show success message
        alert('Address saved successfully!')
      } else {
        const errorData = await response.json().catch(() => ({}))
        alert(errorData.message || 'Failed to save address. Please try again.')
      }
    } catch (error) {
      console.error('Error saving address:', error)
      alert('An error occurred while saving the address. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCloseModal = () => {
    setIsAddAddressModalOpen(false)
    setFormData({
      address: '',
      doorFlatNo: '',
      addressLine2: '',
      city: '',
      pincode: '',
      state: '',
      addressType: 'home'
    })
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
                    <button 
                      onClick={() => setIsAddAddressModalOpen(true)}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Add New Address
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-4">
                      <button 
                        onClick={() => setIsAddAddressModalOpen(true)}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Add New Address
                      </button>
                    </div>
                    {addresses.map((address) => (
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
                    ))}
                  </>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Address Modal */}
      {isAddAddressModalOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[70] transition-opacity"
            onClick={handleCloseModal}
            aria-hidden="true"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                <h2 className="text-xl font-semibold text-gray-900">Set Location</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                  aria-label="Close modal"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Address Text Area */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter your full address"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    required
                  />
                </div>

                {/* Door/Flat No */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Door / Flat No
                  </label>
                  <input
                    type="text"
                    value={formData.doorFlatNo}
                    onChange={(e) => handleInputChange('doorFlatNo', e.target.value)}
                    placeholder="e.g., B603"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Address Line 2 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Society / Building / Landmark
                  </label>
                  <input
                    type="text"
                    value={formData.addressLine2}
                    onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                    placeholder="e.g., Sollanna Society"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* City and Pincode Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="e.g., Pune"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Pincode */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={(e) => handleInputChange('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="e.g., 411004"
                      maxLength={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select State</option>
                    {indianStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Address Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Address Type <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4">
                    {/* Home */}
                    <button
                      type="button"
                      onClick={() => handleInputChange('addressType', 'home')}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-colors ${
                        formData.addressType === 'home'
                          ? 'border-green-600 bg-green-50 text-green-700'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 10L10 3L17 10M4 9V16C4 16.5523 4.44772 17 5 17H8V13C8 12.4477 8.44772 12 9 12H11C11.5523 12 12 12.4477 12 13V17H15C15.5523 17 16 16.5523 16 16V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="font-medium">Home</span>
                    </button>

                    {/* Work */}
                    <button
                      type="button"
                      onClick={() => handleInputChange('addressType', 'work')}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-colors ${
                        formData.addressType === 'work'
                          ? 'border-green-600 bg-green-50 text-green-700'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="5" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 9H13M7 13H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="font-medium">Work</span>
                    </button>

                    {/* Other */}
                    <button
                      type="button"
                      onClick={() => handleInputChange('addressType', 'other')}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-colors ${
                        formData.addressType === 'other'
                          ? 'border-green-600 bg-green-50 text-green-700'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 2C7.23858 2 5 4.23858 5 7C5 9.76142 7.23858 12 10 12C12.7614 12 15 9.76142 15 7C15 4.23858 12.7614 2 10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 12V18M6 18H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="font-medium">Other</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
                <button
                  onClick={handleSaveAddress}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  SAVE ADDRESS AND PROCEED
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Page