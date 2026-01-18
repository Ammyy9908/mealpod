'use client'
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Header from '@/components/header/index.jsx'
import ProfileAside from '@/components/profile/aside/index.jsx'

function Page() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState('meals')
  const [mealOrders, setMealOrders] = useState([])
  const [subscriptions, setSubscriptions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const fetchOrders = async () => {
      if (status === 'authenticated') {
        try {
          // Fetch meal orders
          const mealResponse = await fetch('/api/user/orders?type=meals', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })

          if (mealResponse.ok) {
            const mealData = await mealResponse.json()
            setMealOrders(Array.isArray(mealData) ? mealData : (mealData.orders || []))
          }

          // Fetch subscriptions
          const subscriptionResponse = await fetch('/api/user/subscriptions', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })

          if (subscriptionResponse.ok) {
            const subscriptionData = await subscriptionResponse.json()
            setSubscriptions(Array.isArray(subscriptionData) ? subscriptionData : (subscriptionData.subscriptions || []))
          }
        } catch (error) {
          console.error('Error fetching orders:', error)
        } finally {
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [status])

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
          <div className="max-w-4xl mx-auto">
            {/* My Orders Header */}
            <div className="bg-green-600 text-white px-6 py-4 rounded-t-lg mb-6">
              <h1 className="text-xl font-semibold">My Orders</h1>
            </div>

            {/* Order Type Toggle */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex gap-2 mb-6 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('meals')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                    activeTab === 'meals'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 5H17L16 15H4L3 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 7L7.5 9M12.5 9L13 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 12L9 13L12 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Meal Orders
                </button>
                <button
                  onClick={() => setActiveTab('subscription')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                    activeTab === 'subscription'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 8H13M7 11H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="10" cy="14" r="1" fill="currentColor"/>
                  </svg>
                  Subscription Packages
                </button>
              </div>

              {/* Orders Content */}
              {isLoading ? (
                <div className="flex items-center justify-center min-h-[200px]">
                  <div className="text-gray-500">Loading...</div>
                </div>
              ) : (
                <>
                  {/* Meal Orders */}
                  {activeTab === 'meals' && (
                    <div className="space-y-4">
                      {mealOrders.length === 0 ? (
                        <div className="text-center py-12">
                          <svg width="64" height="64" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4 text-gray-400">
                            <path d="M3 5H17L16 15H4L3 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M7 7L7.5 9M12.5 9L13 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8 12L9 13L12 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <p className="text-gray-500 text-lg">No meal orders found</p>
                          <p className="text-gray-400 text-sm mt-2">Your meal orders will appear here</p>
                        </div>
                      ) : (
                        mealOrders.map((order) => (
                          <div
                            key={order.id || order._id}
                            className="bg-gray-50 rounded-lg border border-gray-200 p-6"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="font-semibold text-gray-900">
                                  Order #{order.order_number || order.id || order._id}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                  {order.order_date ? new Date(order.order_date).toLocaleDateString() : 'Date not available'}
                                </p>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                order.status === 'delivered' 
                                  ? 'bg-green-100 text-green-800'
                                  : order.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {order.status || 'Processing'}
                              </span>
                            </div>
                            <div className="space-y-2">
                              {order.items && order.items.map((item, index) => (
                                <div key={index} className="flex justify-between text-sm">
                                  <span className="text-gray-700">{item.name || item.item_name} x {item.quantity || 1}</span>
                                  <span className="text-gray-900 font-medium">₹{item.price || item.total || 0}</span>
                                </div>
                              ))}
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                              <span className="font-semibold text-gray-900">Total</span>
                              <span className="font-bold text-green-600">₹{order.total_amount || order.total || 0}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {/* Subscription Orders */}
                  {activeTab === 'subscription' && (
                    <div className="space-y-4">
                      {subscriptions.length === 0 ? (
                        <div className="text-center py-12">
                          <svg width="64" height="64" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4 text-gray-400">
                            <rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M7 8H13M7 11H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="10" cy="14" r="1" fill="currentColor"/>
                          </svg>
                          <p className="text-gray-500 text-lg">No active subscriptions</p>
                          <p className="text-gray-400 text-sm mt-2">Your subscription packages will appear here</p>
                        </div>
                      ) : (
                        subscriptions.map((subscription) => (
                          <div
                            key={subscription.id || subscription._id}
                            className="bg-gray-50 rounded-lg border border-gray-200 p-6"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="font-semibold text-gray-900">
                                  {subscription.name || subscription.plan_name || 'Subscription Plan'}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                  {subscription.start_date ? `Started: ${new Date(subscription.start_date).toLocaleDateString()}` : ''}
                                  {subscription.end_date && ` - Ends: ${new Date(subscription.end_date).toLocaleDateString()}`}
                                </p>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                subscription.status === 'active' 
                                  ? 'bg-green-100 text-green-800'
                                  : subscription.status === 'expired'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {subscription.status || 'Active'}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                              <div>
                                <p className="text-sm text-gray-500">Duration</p>
                                <p className="font-medium text-gray-900">
                                  {subscription.duration || subscription.plan_duration || 'N/A'}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Price</p>
                                <p className="font-bold text-green-600">
                                  ₹{subscription.price || subscription.plan_price || 0}
                                </p>
                              </div>
                            </div>
                            {subscription.description && (
                              <p className="text-sm text-gray-600 mt-4">{subscription.description}</p>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Page