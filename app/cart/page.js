'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import Header from '@/components/header/index.jsx'
import Container from '@/components/container/index.jsx'
import { fetchCart, clearCart } from '../store/cartSlice'
import Image from 'next/image'
import CheckoutButton from '@/components/CheckoutButton'

function CartPage() {
  const dispatch = useDispatch()
  const { data: session, status } = useSession()
  const router = useRouter()
  const cart = useSelector((state) => state.cart)
  const [subscriptionDetails, setSubscriptionDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const user = session?.user

  useEffect(() => {
    dispatch(fetchCart())
    setIsLoading(false)
  }, [dispatch])

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

  console.log(cart)

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
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              {/* Cart Item */}
              <div className="p-4 sm:p-6 border-b border-gray-200 last:border-b-0">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Image */}
                  <div className="relative w-full sm:w-32 h-32 sm:h-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={`/${subscription?.sku_id || 'special_thali'}.png`}
                      alt={displayName}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 128px"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{displayName}</h3>
                        <button
                          onClick={handleClearCart}
                          className="text-gray-400 hover:text-red-600 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18 6L6 18M6 6l12 12"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                      {planDuration && (
                        <p className="text-sm text-gray-500 mb-2">{planDuration}</p>
                      )}
                      {subscription?.is_veg && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-5 h-5 bg-green-600 rounded-sm flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 6L5 8L9 4" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </div>
                          <span className="text-xs text-gray-600">Vegetarian</span>
                        </div>
                      )}
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-xl font-bold text-gray-900">
                        ₹{price.toLocaleString()}
                      </span>
                      {originalPrice > price && (
                        <>
                          <span className="text-lg text-gray-500 line-through">
                            ₹{originalPrice.toLocaleString()}
                          </span>
                          {discount > 0 && (
                            <span className="text-sm font-semibold text-blue-600">
                              {discount}% OFF
                            </span>
                          )}
                        </>
                      )}
                    </div>
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

              <CheckoutButton product={subscription} user={user} />

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