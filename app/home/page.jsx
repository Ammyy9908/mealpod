'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Header from '../../components/header/index.jsx'
import Footer from '../../components/footer/index.jsx'
import Container from '../../components/container/index.jsx'
import SubscriptionCard from '../../components/subscription-card/index.jsx'
import MealCard from '../../components/meal-card/index.jsx'
import StatCard from '../../components/stat-card/index.jsx'

function page() {
  const router = useRouter()
  const [subscriptions, setSubscriptions] = useState([]);
  
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch('/api/subscriptions');
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setSubscriptions(data.products);
        } else {
          console.error('Failed to fetch subscriptions');
        }
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      }
    };
    
    fetchSubscriptions();
  }, []);

  const handleMealCardClick = (skuId) => {
    router.push(`/subscriptions/${skuId}`)
  }
  return (
    <>
        <Header />
        <Container className='mb-16 sm:mb-24 lg:mb-32 mt-8 sm:mt-12 lg:mt-16'>
         <section>
          <h3 className='text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3'>Specially Designed Meal Plans for You</h3>
          <p className='text-gray-500 text-sm sm:text-base mb-6 sm:mb-8'>Choose from our specially designed meal plans to suit your needs and preferences.</p>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
            <SubscriptionCard image="/students.png" title='STUDENTS'/>
            <SubscriptionCard image="/corporate.png" title='CORPORATE'/>
            <SubscriptionCard image="/elder.png" title='ELDERLY'/>
          </div>
         </section>
         <section className='mt-12 sm:mt-16'>
          <h3 className='text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3'>Meal Subscriptions</h3>
          <p className='text-gray-500 text-sm sm:text-base mb-6 sm:mb-8'>Choose from our specially designed meal plans to suit your needs and preferences.</p>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
           {subscriptions.map((subscription) => (
            <MealCard 
              key={subscription.sku_id} 
              title={subscription.name} 
              image={subscription.image_key}
              onClick={() => handleMealCardClick(subscription.sku_id)}
            />
           ))}
          </div>
         </section>
         <section className='mt-12 sm:mt-16'>
          <h3 className='text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-2 sm:mb-3'>Why Choose Us</h3>
          <p className='text-gray-500 text-sm sm:text-base text-center mb-6 sm:mb-8 px-2 sm:px-0'>Choose from our specially designed meal plans to suit your needs and preferences.</p>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
            <StatCard />
            <StatCard />
            <StatCard />
          </div>
         </section>
        </Container>
        <div className="w-full mt-12 sm:mt-16 lg:mt-20">
          <div className="relative w-full h-auto">
            <Image 
              src="/illustration_delivery.jpg" 
              alt="Live Pune - Delivery Service" 
              width={1920} 
              height={600}
              className="w-full h-auto object-cover"
              priority
              sizes="100vw"
            />
          </div>
        </div>
        <Footer />
    </>
  )
}

export default page