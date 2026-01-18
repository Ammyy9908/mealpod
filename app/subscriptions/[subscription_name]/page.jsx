'use client'
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/header/index.jsx'
import Container from '@/components/container/index.jsx'
import Image from 'next/image'

function Page() {
  const params = useParams()
  const subscriptionName = params?.subscription_name
  const [subscriptionPlans, setSubscriptionPlans] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSubscriptionPlans = async () => {
      try {
        // Fetch subscriptions by sku_id
        const response = await fetch(`/api/items?sku=${subscriptionName}`)
        if (response.ok) {
          const data = await response.json()
          console.log('Subscription data:', data)
          
          // Map API response to component structure
          if (data.subscriptions && Array.isArray(data.subscriptions)) {
            const mappedPlans = data.subscriptions.map((subscription) => ({
              id: subscription._id,
              skuId: subscription.sku_id,
              planId: subscription.plan_id,
              title: subscription.display_name,
              currentPrice: subscription.pricing?.price || 0,
              originalPrice: subscription.pricing?.original_price || 0,
              discount: subscription.pricing?.discount_percentage || 0,
              perMealPrice: subscription.pricing?.price_per_meal || 0,
              perMealOriginalPrice: subscription.pricing?.original_price 
                ? Math.round(subscription.pricing.original_price / (subscription.plan?.total_meals || 1))
                : 0,
              description: '3 Chapati/Roti, 2 Veg Curry/Dry, 1 Dal, 1 Steamed Rice, Cut Salad, Sweet',
              planDuration: `${subscription.plan?.duration_days || 0}-Day Plan (${subscription.plan?.meals_per_day || 1} meal/day)`,
              image: `/special_thali.png`, // Default image, can be updated from API if available
              isVeg: subscription.is_veg,
              isBestseller: subscription.is_bestseller,
              status: subscription.status,
            }))
            setSubscriptionPlans(mappedPlans)
          }
        } else {
          console.error('Failed to fetch subscriptions')
        }
      } catch (error) {
        console.error('Error fetching items:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (subscriptionName) {
      fetchSubscriptionPlans()
    }
  }, [subscriptionName])

  const handleAddToCart = (plan) => {
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', plan)
  }
  return (
    <>
      <Header />
      <Container className="mb-16 sm:mb-24 lg:mb-32 mt-8 sm:mt-12 lg:mt-16">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-gray-500">Loading...</div>
          </div>
        ) : subscriptionPlans.length === 0 ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-gray-500 text-lg mb-2">No subscription plans found</p>
              <p className="text-gray-400 text-sm">Please try again later</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {subscriptionPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Left Side - Text Information */}
                  <div className="flex-1 p-6 lg:p-8 bg-white">
                    {/* Bestseller with Icon */}
                    {(plan.isVeg || plan.isBestseller) && (
                      <div className="flex items-center gap-2 mb-3">
                        {plan.isVeg && (
                          <div className="w-5 h-5 bg-green-600 rounded-sm flex items-center justify-center flex-shrink-0">
                            <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 6L5 8L9 4" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </div>
                        )}
                        {plan.isBestseller && (
                          <span className="text-xs font-semibold text-gray-700">Bestseller</span>
                        )}
                      </div>
                    )}

                    {/* Title */}
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                      {plan.title}
                    </h2>

                    {/* Pricing */}
                    <div className="mb-5">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                          ₹{plan.currentPrice.toLocaleString()}
                        </span>
                        <span className="text-lg sm:text-xl text-gray-500 line-through">
                          ₹{plan.originalPrice.toLocaleString()}
                        </span>
                        <span className="text-base sm:text-lg font-semibold text-blue-600">
                          {plan.discount}% OFF
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 text-sm sm:text-base mb-2 leading-relaxed">
                      {plan.description}
                    </p>
                    <button className="text-green-600 text-sm font-medium hover:text-green-700 mb-4">
                      read more
                    </button>

                    {/* Plan Duration */}
                    <div className="flex items-center gap-2 mt-4">
                      <span className="text-gray-700 text-sm sm:text-base">
                        {plan.planDuration}
                      </span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 4V8M8 12H8.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                  {/* Right Side - Image with Overlay */}
                  <div className="lg:w-80 xl:w-96 relative min-h-[400px] lg:min-h-[500px] lg:rounded-r-lg overflow-hidden">
                    {/* Diagonal Background - Orange top-left, Dark Blue bottom-right */}
                    <div className="absolute inset-0" style={{
                      background: 'linear-gradient(135deg, #fb923c 0%, #fb923c 50%, #1e40af 50%, #1e40af 100%)'
                    }}></div>
                    
                    {/* Image Container */}
                    <div className="relative h-full flex items-center justify-center p-6 lg:p-8 z-10">
                      <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                          src={`/${plan.skuId || 'special_thali'}.png`}
                          alt={plan.title}
                          width={280}
                          height={280}
                          className="object-contain w-auto h-auto max-w-[85%] max-h-[70%]"
                        />
                      </div>

                      {/* Per Meal Price Overlay - Yellow Banner */}
                      <div className="absolute top-4 right-4 bg-yellow-400 rounded-lg px-3 py-2 z-20 shadow-md">
                        <div className="text-right">
                          <div className="flex items-baseline gap-1 justify-end">
                            <span className="text-gray-900 font-bold text-base">
                              ₹ {plan.perMealPrice}
                            </span>
                            <span className="text-gray-600 text-sm line-through">
                              ₹ {plan.perMealOriginalPrice}
                            </span>
                          </div>
                          <p className="text-gray-700 text-xs mt-0.5 font-medium">Per Meal</p>
                        </div>
                      </div>

                      {/* ADD + Button */}
                      <button
                        onClick={() => handleAddToCart(plan)}
                        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 bg-green-600 hover:bg-green-700 border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-base shadow-lg transition-colors touch-manipulation"
                      >
                        ADD +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  )
}

export default Page