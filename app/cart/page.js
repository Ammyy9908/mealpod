'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import Header from '@/components/header/index.jsx'
import Container from '@/components/container/index.jsx'
import { fetchCart, clearCart } from '../store/cartSlice'
import Image from 'next/image'
import CheckoutButton from '@/components/CheckoutButton'
import { useSession } from 'next-auth/react'

const DELIVERY_SLOTS = [
  { id: 'lunch', label: 'Lunch', time: '12:00 PM - 1:30 PM', icon: 'sun' },
  { id: 'dinner', label: 'Dinner', time: '7:00 PM - 8:30 PM', icon: 'moon' }
]

function formatAddress(address) {
  const parts = []
  if (address.address) parts.push(address.address)
  if (address.addressLine2) parts.push(address.addressLine2)
  if (address.city) parts.push(address.city)
  if (address.state) parts.push(address.state)
  if (address.pincode) parts.push(address.pincode)
  let formatted = parts.join(', ')
  if (address.landmark) formatted += `, landmark: ${address.landmark}`
  return formatted
}

function CartPage() {
  const dispatch = useDispatch()
  const { data: session, status } = useSession()
  const router = useRouter()
  const cart = useSelector((state) => state.cart)
  const [subscriptionDetails, setSubscriptionDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const user = session?.user

  // Delivery & preferences
  const [addresses, setAddresses] = useState([])
  const [selectedAddressId, setSelectedAddressId] = useState(null)
  const [specialInstructions, setSpecialInstructions] = useState({ lessSalty: false, lessOily: false, lessSpicy: false })
  const [startDate, setStartDate] = useState('')
  const [deliverySlot, setDeliverySlot] = useState(null)
  const [deliveryInstructions, setDeliveryInstructions] = useState('')

  useEffect(() => {
    dispatch(fetchCart())
    setIsLoading(false)
  }, [dispatch])

  useEffect(() => {
    const fetchAddresses = async () => {
      if (status === 'authenticated' && cart?.cart) {
        try {
          const res = await fetch('/api/user/addresses', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
          })
          if (res.ok) {
            const data = await res.json()
            const list = Array.isArray(data) ? data : (data.addresses || [])
            setAddresses(list)
            if (list.length > 0 && !selectedAddressId) {
              setSelectedAddressId(list[0].id || list[0]._id)
            }
          }
        } catch (e) {
          console.error('Error fetching addresses:', e)
        }
      }
    }
    fetchAddresses()
  }, [status, cart?.cart])

  // useEffect(() => {
  //   const loadSubscriptionDetails = async () => {
  //     if (!cart?.productId) {
  //       setIsLoading(false)
  //       return
  //     }

  //     try {
  //       // Fetch subscription details based on productId
  //       const response = await fetch(`/api/subscription?product_id=${cart.productId}`)
  //       if (response.ok) {
  //         const data = await response.json()
  //         if (data.subscriptions && data.subscriptions.length > 0) {
  //           // Find the matching subscription or use the first one
  //           const subscription = data.subscriptions.find(
  //             (sub) => sub._id === cart.productId
  //           ) || data.subscriptions[0]
  //           setSubscriptionDetails(subscription)
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Error fetching subscription details:', error)
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }

  //   loadSubscriptionDetails()
  // }, [cart?.productId])

  const handleClearCart = async () => {
    if (confirm('Are you sure you want to remove this item from your cart?')) {
      await dispatch(clearCart())
    }
  }



  const handleContinueShopping = () => {
    router.push('/home')
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <Container className="mb-16 sm:mb-24 lg:mb-32 mt-8 sm:mt-12 lg:mt-16">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-gray-500">Loading cart...</div>
          </div>
        </Container>
      </>
    )
  }

  if (!cart?.cart) {
    return (
      <>
        <Header />
        <Container className="mb-16 sm:mb-24 lg:mb-32 mt-8 sm:mt-12 lg:mt-16">
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <div className="mb-6">
              <svg
                width="120"
                height="120"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-300"
              >
                <path
                  d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H19M17 13V17C17 18.1 17.9 19 19 19C20.1 19 21 18.1 21 17V13M9 19.5C9.8 19.5 10.5 20.2 10.5 21C10.5 21.8 9.8 22.5 9 22.5C8.2 22.5 7.5 21.8 7.5 21C7.5 20.2 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21C21.5 21.8 20.8 22.5 20 22.5C19.2 22.5 18.5 21.8 18.5 21C18.5 20.2 19.2 19.5 20 19.5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <button
              onClick={handleContinueShopping}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </Container>
      </>
    )
  }

  const subscription = cart?.product;
  const price = subscription?.pricing.price || 0
  const originalPrice = subscription?.pricing.original_price || 0
  const discount = subscription?.pricing.discount_percentage || 0
  const displayName = subscription?.display_name || 'Subscription Plan'
  const planDuration = `${subscription?.plan.duration_days || 0}-Day Plan (${subscription?.plan.meals_per_day || 1} meal/day)`

  return (
    <>
      <Header />
      <Container className="mb-16 sm:mb-24 lg:mb-32 mt-8 sm:mt-12 lg:mt-16">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-500 mt-2">Review your items before checkout</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left column: Address, Cart Item, Special Instructions, Date & Slot */}
          <div className="lg:col-span-2 space-y-4">
            {/* Delivery Address */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Delivery Address</h3>
                <button
                  onClick={() => router.push('/my-account/my-addresses')}
                  className="text-gray-500 hover:text-green-600 p-1"
                  aria-label="Edit address"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
              </div>
              {addresses.length === 0 ? (
                <p className="text-gray-500 text-sm mb-3">No saved address. Add one to proceed.</p>
              ) : (
                <div className="space-y-2">
                  {addresses.map((addr) => (
                    <label key={addr.id || addr._id} className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="delivery-address"
                        checked={(addr.id || addr._id) === selectedAddressId}
                        onChange={() => setSelectedAddressId(addr.id || addr._id)}
                        className="mt-1 text-green-600 border-gray-300 focus:ring-green-500"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-700 capitalize">
                          Delivery {addr.addressType || 'Home'}
                        </span>
                        <p className="text-sm text-gray-600 mt-0.5">{formatAddress(addr)}</p>
                      </div>
                    </label>
                  ))}
                </div>
              )}
              <button
                onClick={() => router.push('/my-account/my-addresses')}
                className="mt-3 text-sm text-green-600 hover:text-green-700 font-medium"
              >
                {addresses.length === 0 ? 'Add address' : 'Manage addresses'}
              </button>
            </div>

            {/* Cart Item */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-200 last:border-b-0">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative w-full sm:w-32 h-32 sm:h-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={`/${subscription?.sku_id || 'special_thali'}.png`}
                      alt={displayName}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 128px"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{displayName}</h3>
                        <button
                          onClick={handleClearCart}
                          className="text-gray-400 hover:text-red-600 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                      {planDuration && <p className="text-sm text-gray-500 mb-2">{planDuration}</p>}
                      {subscription?.is_veg && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-5 h-5 bg-green-600 rounded-sm flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 6L5 8L9 4" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                          </div>
                          <span className="text-xs text-gray-600">Vegetarian</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-xl font-bold text-gray-900">₹{price.toLocaleString()}</span>
                      {originalPrice > price && (
                        <>
                          <span className="text-lg text-gray-500 line-through">₹{originalPrice.toLocaleString()}</span>
                          {discount > 0 && <span className="text-sm font-semibold text-blue-600">{discount}% OFF</span>}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Instructions */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Special Instructions</h3>
              <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide">Dietary preferences</p>
              <div className="flex flex-wrap gap-3">
                {[
                  { key: 'lessSalty', label: 'Less Salty', icon: 'salt' },
                  { key: 'lessOily', label: 'Less Oily', icon: 'oil' },
                  { key: 'lessSpicy', label: 'Less Spicy', icon: 'spicy' }
                ].map(({ key, label, icon }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSpecialInstructions((s) => ({ ...s, [key]: !s[key] }))}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border font-medium text-sm transition-colors ${
                      specialInstructions[key]
                        ? 'border-green-600 bg-green-50 text-green-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {icon === 'salt' && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                      </svg>
                    )}
                    {icon === 'oil' && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
                        <path d="M12 2c.5 2 1.5 4 3 5.5s3 2.5 3 4.5a4 4 0 0 1-8 0c0-2 1.5-3 3-4.5S11.5 4 12 2z" />
                      </svg>
                    )}
                    {icon === 'spicy' && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
                        <path d="M12 2v6m0 4v8M8 8l4-4 4 4M8 12l4 4 4-4" />
                      </svg>
                    )}
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Select Start Date */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6">
              <h3 className="font-semibold text-gray-900 mb-1">Select Date</h3>
              <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide">Select start date</p>
              <div className="relative">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-10 text-gray-900 focus:border-green-600 focus:ring-1 focus:ring-green-600"
                />
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Select Delivery Slot */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Select Delivery Slot</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DELIVERY_SLOTS.map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setDeliverySlot(slot.id)}
                    className={`flex items-center gap-4 p-4 rounded-lg border-2 text-left transition-colors ${
                      deliverySlot === slot.id
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${deliverySlot === slot.id ? 'bg-green-100' : 'bg-gray-100'}`}>
                      {slot.icon === 'sun' ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="5" />
                          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                        </svg>
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{slot.label}</p>
                      <p className="text-sm text-gray-500">{slot.time}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Delivery partner instructions + info cards */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6 space-y-4">
              <div>
                <label className="block font-semibold text-gray-900 mb-2">Add instructions for delivery partner</label>
                <textarea
                  value={deliveryInstructions}
                  onChange={(e) => setDeliveryInstructions(e.target.value)}
                  placeholder="e.g. Call before delivery, leave at gate..."
                  rows={2}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-green-600 focus:ring-1 focus:ring-green-600"
                />
              </div>
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500 flex-shrink-0 mt-0.5">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Subscription guidelines</p>
                    <p className="text-xs text-gray-500">Meals are delivered as per your plan. Skip or cancel via your account.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500 flex-shrink-0 mt-0.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-700">No delivery charges</p>
                    <p className="text-xs text-gray-500">Free delivery on all subscription plans.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{price.toLocaleString()}</span>
                </div>
                {originalPrice > price && (
                  <div className="flex justify-between text-gray-500 text-sm">
                    <span>Discount</span>
                    <span className="font-medium text-green-600">
                      -₹{(originalPrice - price).toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>₹{price.toLocaleString()}</span>
                </div>
              </div>

              <CheckoutButton
                product={subscription}
                user={user}
                address={addresses.find((addr) => addr.id === selectedAddressId)}
                deliverySlot={deliverySlot}
                startDate={startDate}
                specialInstructions={specialInstructions}
              />

              <button
                onClick={handleContinueShopping}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default CartPage