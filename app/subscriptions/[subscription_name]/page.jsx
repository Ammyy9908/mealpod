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
        // Fetch all subscriptions and filter by name
        const response = await fetch('/api/subscriptions')
        if (response.ok) {
          const data = await response.json()
          const products = data.products || []
          
          // Filter products that match the subscription name
          // For now, we'll create sample plans based on the subscription type
          // In a real app, this would come from the API
          const plans = generateSubscriptionPlans(subscriptionName)
          setSubscriptionPlans(plans)
        }
      } catch (error) {
        console.error('Error fetching subscriptions:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubscriptionPlans()
  }, [subscriptionName])

  const generateSubscriptionPlans = (name) => {
    // Sample data structure - in production, this would come from the API
    const basePlans = [
      {
        id: 1,
        title: 'Special Thali - Monthly',
        currentPrice: 3860,
        originalPrice: 5000,
        discount: 23,
        perMealPrice: 193,
        perMealOriginalPrice: 250,
        description: '3 Chapati/Roti, 2 Veg Curry/Dry, 1 Dal, 1 Steamed Rice, Cut Salad, Sweet',
        planDuration: '20-Day Plan (1 meal/day)',
        image: '/special_thali.png'
      },
      {
        id: 2,
        title: 'Special Thali - 3 Months Plan',
        currentPrice: 11480,
        originalPrice: 15000,
        discount: 23,
        perMealPrice: 191,
        perMealOriginalPrice: 250,
        description: '3 Chapati/Roti, 2 Veg Curry/Dry, 1 Dal, 1 Steamed Rice, Cut Salad, Sweet',
        planDuration: '60-Day Plan (1 meal/day)',
        image: '/special_thali.png'
      },
      {
        id: 3,
        title: 'Special Thali - Biweekly',
        currentPrice: 2030,
        originalPrice: 2500,
        discount: 19,
        perMealPrice: 203,
        perMealOriginalPrice: 250,
        description: '3 Chapati/Roti, 2 Veg Curry/Dry, 1 Dal, 1 Steamed Rice, Cut Salad, Sweet',
        planDuration: '10-Day Plan (1 meal/day)',
        image: '/special_thali.png'
      }
    ]
    return basePlans
  }

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
        ) : (
          <div className="space-y-6">
            {subscriptionPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Left Side - Text Information */}
                  <div className="flex-1 p-6 lg:p-8">
                    <div className="flex items-start gap-4">
                      {/* Vegetarian Icon */}
                      <div className="w-6 h-6 bg-green-600 rounded flex-shrink-0 mt-1">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="currentColor"/>
                          <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>

                      <div className="flex-1">
                        {/* Title */}
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                          {plan.title}
                        </h2>

                        {/* Pricing */}
                        <div className="mb-4">
                          <div className="flex items-baseline gap-2 mb-1">
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
                        <p className="text-gray-700 text-sm sm:text-base mb-3">
                          {plan.description}
                        </p>
                        <button className="text-gray-500 text-sm hover:text-gray-700 mb-4">
                          read more
                        </button>

                        {/* Plan Duration */}
                        <div className="flex items-center gap-2">
                          <span className="text-gray-700 text-sm sm:text-base">
                            {plan.planDuration}
                          </span>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8 4V8M8 12H8.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Image with Overlay */}
                  <div className="lg:w-80 xl:w-96 relative">
                    {/* Diagonal Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-blue-800 opacity-90"></div>
                    
                    {/* Image Container */}
                    <div className="relative h-full min-h-[300px] lg:min-h-[400px] flex items-center justify-center p-6">
                      <div className="relative z-10 w-full h-full flex items-center justify-center">
                        <Image
                          src={plan.image || '/special_thali.png'}
                          alt={plan.title}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                      </div>

                      {/* Per Meal Price Overlay */}
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 z-20">
                        <div className="text-right">
                          <div className="flex items-baseline gap-1 justify-end">
                            <span className="text-orange-600 font-bold text-lg">
                              ₹{plan.perMealPrice}
                            </span>
                            <span className="text-gray-400 text-sm line-through">
                              ₹{plan.perMealOriginalPrice}
                            </span>
                          </div>
                          <p className="text-gray-600 text-xs mt-1">Per Meal</p>
                        </div>
                      </div>

                      {/* ADD + Button */}
                      <button
                        onClick={() => handleAddToCart(plan)}
                        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold text-base shadow-lg transition-colors touch-manipulation"
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