'use client'
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/header/index.jsx'
import Container from '@/components/container/index.jsx'
import SubscriptionPlanCard from '@/components/subscription-plan-card/index.jsx'
import PromotionalCarousel from '@/components/promotional-carousel/index.jsx'
import PhotoGallery from '@/components/photo-gallery/index.jsx'
import WeeklyMenu from '@/components/weekly-menu/index.jsx'
import { useDispatch, useSelector } from "react-redux";
import { setSubscription } from "../../store/cartSlice";

// Placeholder data for local development
const getPlaceholderData = (skuId = 'special_thali') => {
  return [
    {
      id: 'placeholder-1',
      skuId: skuId,
      title: 'Special Thali - Monthly',
      currentPrice: 3860,
      originalPrice: 5000,
      discount: 23,
      perMealPrice: 193,
      perMealOriginalPrice: 250,
      description: '3 Chapati/Roti, 2 Veg Curry/Dry, 1 Dal, 1 Steamed Rice, Cut Salad, Sweet',
      planDuration: '20-Day Plan (1 meal/day)',
      image: `/special_thali.png`,
      isVeg: true,
      isBestseller: false,
    },
    {
      id: 'placeholder-2',
      skuId: skuId,
      title: 'Special Thali - 3 Months Plan',
      currentPrice: 11480,
      originalPrice: 15000,
      discount: 23,
      perMealPrice: 191,
      perMealOriginalPrice: 250,
      description: '3 Chapati/Roti, 2 Veg Curry/Dry, 1 Dal, 1 Steamed Rice, Cut Salad, Sweet',
      planDuration: '60-Day Plan (1 meal/day)',
      image: `/special_thali.png`,
      isVeg: true,
      isBestseller: false,
    },
    {
      id: 'placeholder-3',
      skuId: skuId,
      title: 'Special Thali - Biweekly',
      currentPrice: 2030,
      originalPrice: 2500,
      discount: 19,
      perMealPrice: 203,
      perMealOriginalPrice: 250,
      description: '3 Chapati/Roti, 2 Veg Curry/Dry, 1 Dal, 1 Steamed Rice, Cut Salad, Sweet',
      planDuration: '10-Day Plan (1 meal/day)',
      image: `/special_thali.png`,
      isVeg: true,
      isBestseller: false,
    }
  ]
}

function Page() {
  const dispatch = useDispatch();
const cart = useSelector((state) => state.cart);
  const params = useParams()
  const subscriptionName = params?.subscription_name
  const [subscriptionPlans, setSubscriptionPlans] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const fetchSubscriptionPlans = async () => {
      try {
        // Fetch subscriptions by sku_id
        const response = await fetch(`/api/items?sku=${subscriptionName}`)
        if (response.ok) {
          const data = await response.json()
          console.log('Subscription data:', data)
          
          // Map API response to component structure
          if (data.subscriptions && Array.isArray(data.subscriptions) && data.subscriptions.length > 0) {
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
          } else {
            // Use placeholder data for local development
            console.log('No subscriptions found, using placeholder data')
            setSubscriptionPlans(getPlaceholderData(subscriptionName))
          }
        } else {
          // Use placeholder data if API fails
          console.log('API failed, using placeholder data')
          setSubscriptionPlans(getPlaceholderData(subscriptionName))
        }
      } catch (error) {
        console.error('Error fetching items:', error)
        // Use placeholder data on error
        setSubscriptionPlans(getPlaceholderData(subscriptionName))
      } finally {
        setIsLoading(false)
      }
    }

    if (subscriptionName) {
      fetchSubscriptionPlans()
    } else {
      // Use placeholder data if no subscription name
      setSubscriptionPlans(getPlaceholderData('special_thali'))
      setIsLoading(false)
    }
  }, [subscriptionName])

  const handleAddToCart = (plan) => {
    // TODO: Implement add to cart functionality
    if (!plan?.id) {
      console.error("Invalid plan object:", plan);
      return;
    }
  
    dispatch(setSubscription(plan.id));
  }

  const handleViewGallery = () => {
    setIsGalleryOpen(true)
    setIsMenuOpen(false) // Close menu if open
  }

  const handleCloseGallery = () => {
    setIsGalleryOpen(false)
  }

  const handleViewMenu = () => {
    setIsMenuOpen(true)
    setIsGalleryOpen(false) // Close gallery if open
  }

  const handleCloseMenu = () => {
    setIsMenuOpen(false)
  }

  // Get subscription name for gallery title
  const galleryTitle = subscriptionPlans.length > 0 
    ? subscriptionPlans[0].title.split(' - ')[0] 
    : subscriptionName || 'Deluxe Thali'

  return (
    <>
      <Header />
      <Container className="mb-16 sm:mb-24 lg:mb-32 mt-8 sm:mt-12 lg:mt-16">
        {/* Promotional Carousel Section */}
        <PromotionalCarousel 
          onViewGallery={handleViewGallery} 
          onViewMenu={handleViewMenu}
        />
        
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
              <SubscriptionPlanCard
                key={plan.id}
                plan={plan}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </Container>

      {/* Photo Gallery */}
      <PhotoGallery
        isOpen={isGalleryOpen}
        onClose={handleCloseGallery}
        subscriptionName={galleryTitle}
      />

      {/* Weekly Menu */}
      <WeeklyMenu
        isOpen={isMenuOpen}
        onClose={handleCloseMenu}
        subscriptionName={galleryTitle}
        onViewGallery={handleViewGallery}
      />
    </>
  )
}

export default Page