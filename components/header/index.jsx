'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'

function index() {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  // Always show dropdown in development for local testing
  const isDevelopment = process.env.NODE_ENV === 'development'
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(isDevelopment)
  const [userProfile, setUserProfile] = useState(null)
  const [isLoadingProfile, setIsLoadingProfile] = useState(false)
  const dropdownRef = useRef(null)
  
  const isLoggedIn = status === 'authenticated' || isDevelopment
  const userInfo = session?.user
  


  // Fetch user profile from backend
  const fetchUserProfile = useCallback(async () => {
    if (!isLoggedIn) return
    
    setIsLoadingProfile(true)
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
      } else {
        console.error('Failed to fetch user profile')
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
    } finally {
      setIsLoadingProfile(false)
    }
  }, [isLoggedIn])


  const handleCloseLoginModal = useCallback(() => {
    setIsLoginModalOpen(false)
  }, [])

  // Close dropdown when clicking outside (works for both mouse and touch)
  // Skip in development mode to keep dropdown always visible
  useEffect(() => {
    if (isDevelopment) return // Don't close dropdown in development
    
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false)
      }
    }

    if (isUserDropdownOpen) {
      // Support both mouse and touch events for mobile compatibility
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isUserDropdownOpen, isDevelopment])

  // Fetch user profile when user is logged in
  useEffect(() => {
    if (isLoggedIn) {
      fetchUserProfile()
    } else {
      setUserProfile(null)
    }
  }, [isLoggedIn, fetchUserProfile])

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', { 
        callbackUrl: window.location.href,
        redirect: false 
      })
      setIsLoginModalOpen(false)
    } catch (error) {
      console.error('Error during Google sign in:', error)
      alert('Failed to sign in with Google. Please try again.')
    }
  }

  const handleLoginClick = () => {
    setIsLoginModalOpen(true)
  }

  const handleLogout = async () => {
    try {
      if (!isDevelopment) {
        setIsUserDropdownOpen(false)
      }
      await signOut({ callbackUrl: window.location.href })
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  const handleMenuClick = () => {
    if (!isDevelopment) {
      setIsUserDropdownOpen(false)
    }
  }

  return (
    <>
      <div className={`bg-white border-b border-gray-200 sticky top-0 z-40 safe-area-top`}>
          <div className='header_wrapper w-full sm:w-[90%] m-auto flex flex-row justify-between items-center py-2.5 sm:py-4 px-4 sm:px-0 gap-2 sm:gap-4'>
              {/* Left Section - Logo */}
              <div className='header_left flex flex-row items-center gap-2 sm:gap-3 flex-shrink-0'>
                  {/* Logo Section */}
                  <div className='flex items-center gap-2'>
                      <a href="/" className='flex flex-col relative'>
                          <span className='text-base sm:text-xl font-semibold text-green-600 leading-tight'>mealpod</span>
                          <span className='text-xs text-green-400 hidden sm:block'>Khao Ghar Ka...</span>
                      </a>
                  </div>
              </div>

              <div className='header_right flex items-center gap-2 sm:gap-3 flex-shrink-0 relative' ref={dropdownRef}>
                  {/* Meal Plan */}
                  <a href="/meal-plan" className='flex flex-col items-center gap-1 px-2 py-1 hover:bg-gray-50 rounded transition-colors'>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-green-600'>
                          <rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M7 8H13M7 11H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="10" cy="14" r="1" fill="currentColor"/>
                      </svg>
                      <span className='text-xs sm:text-sm text-gray-700 font-medium'>Meal Plan</span>
                  </a>
                  
                  {/* On Demand */}
                  <a href="/on-demand" className='flex flex-col items-center gap-1 px-2 py-1 hover:bg-gray-50 rounded transition-colors'>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-gray-600'>
                          <path d="M5 6L10 11L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M3 4H17M3 16H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
                      </svg>
                      <span className='text-xs sm:text-sm text-gray-700 font-medium'>On Demand</span>
                  </a>

                  {/* Cart Button */}
                  <button 
                    className='flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors touch-manipulation min-h-[44px] sm:min-h-0'
                    aria-label="Cart"
                  >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className='flex-shrink-0'>
                          <path d="M3 5H17L16 15H4L3 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M7 7L7.5 9M12.5 9L13 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M8 12L9 13L12 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className='text-xs sm:text-sm font-medium hidden sm:inline'>Cart</span>
                  </button>

                  {isLoggedIn ? (
                    <>
                      {/* User Profile Button */}
                      <button 
                        onClick={() => {
                          if (!isDevelopment) {
                            setIsUserDropdownOpen(!isUserDropdownOpen)
                          }
                        }}
                        className='flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-teal-700 hover:bg-teal-800 active:bg-teal-900 transition-colors touch-manipulation flex-shrink-0'
                        aria-label="User menu"
                      >
                        {userProfile?.picture || userInfo?.picture ? (
                          <img 
                            src={userProfile?.picture || userInfo.picture} 
                            alt={userProfile?.name || userInfo.name || 'User'} 
                            className='w-full h-full rounded-full object-cover'
                          />
                        ) : (
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-white'>
                            <path d="M10 10C11.6569 10 13 8.65685 13 7C13 5.34315 11.6569 4 10 4C8.34315 4 7 5.34315 7 7C7 8.65685 8.34315 10 10 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M2 18C2 14.6863 5.58172 12 10 12C14.4183 12 18 14.6863 18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </button>
                      {/* User Dropdown Menu for Landing Page */}
                      {isUserDropdownOpen && (
                        <div className='fixed sm:absolute inset-0 sm:inset-auto sm:right-0 sm:top-full sm:mt-2 sm:w-80 w-full sm:max-h-[90vh] sm:max-w-[90vw] bg-white sm:rounded-lg shadow-xl border border-gray-200 z-50 overflow-y-auto overscroll-contain touch-pan-y'>
                          {/* Mobile Header with Close Button */}
                          <div className='sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sm:hidden z-10'>
                            <h3 className='text-lg font-semibold text-gray-900'>Menu</h3>
                            <button
                              onClick={() => {
                                if (!isDevelopment) {
                                  setIsUserDropdownOpen(false)
                                }
                              }}
                              className='p-2 -mr-2 active:opacity-70 touch-manipulation'
                              aria-label="Close menu"
                            >
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                          </div>
                          {/* User Info Section */}
                          <div className='p-4 flex items-center gap-3 border-b border-gray-100'>
                            <div className='w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center bg-gray-50 flex-shrink-0'>
                              {userProfile?.picture || userInfo?.picture ? (
                                <img 
                                  src={userProfile?.picture || userInfo.picture} 
                                  alt={userProfile?.name || userInfo.name || 'User'} 
                                  className='w-full h-full rounded-full object-cover'
                                />
                              ) : (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-gray-400'>
                                  <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              )}
                            </div>
                            <div className='flex-1 min-w-0'>
                              <p className='text-sm font-semibold text-gray-900 truncate'>
                                {userProfile?.phone || userProfile?.name || userInfo?.name || userInfo?.email?.split('@')[0] || 'User'}
                              </p>
                              {userProfile?.phone && (
                                <p className='text-xs text-gray-500 truncate'>{userProfile.phone}</p>
                              )}
                              {!userProfile?.phone && userInfo?.email && (
                                <p className='text-xs text-gray-500 truncate'>{userInfo.email}</p>
                              )}
                            </div>
                          </div>

                          {/* Refer & Earn Banner */}
                          <div className='p-4 bg-gradient-to-br from-yellow-400 to-yellow-500 relative overflow-hidden'>
                            <div className='relative z-10'>
                              <h3 className='text-lg font-bold text-gray-900 mb-1'>Refer & Earn</h3>
                              <p className='text-2xl font-bold text-gray-900 mb-1'>₹200!</p>
                              <p className='text-xs text-gray-800 mb-3'>Invite friends - you both get ₹200 when they order!</p>
                              <button className='w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2'>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M8 1V8M8 8L5 5M8 8L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M2 11V14C2 14.5523 2.44772 15 3 15H13C13.5523 15 14 14.5523 14 14V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Refer Now
                              </button>
                              <button className='mt-2 text-xs text-gray-700 hover:text-gray-900 font-medium'>
                                More Details
                              </button>
                            </div>
                            <div className='absolute top-0 right-0 w-24 h-24 opacity-20'>
                              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M50 20L55 35L70 40L55 45L50 60L45 45L30 40L45 35L50 20Z" fill="#FFD700"/>
                                <circle cx="20" cy="20" r="3" fill="#FFD700"/>
                                <circle cx="80" cy="30" r="2" fill="#FFD700"/>
                                <circle cx="30" cy="70" r="2.5" fill="#FFD700"/>
                              </svg>
                            </div>
                            <div className='absolute top-2 right-2 text-[10px] text-gray-700 font-medium writing-vertical-rl'>
                              T&C Apply
                            </div>
                          </div>

                          {/* Navigation Menu */}
                          <div className='py-2'>
                            <button onClick={handleMenuClick} className='w-full px-4 py-4 sm:py-3 flex items-center gap-3 active:bg-gray-50 hover:bg-gray-50 transition-colors text-left touch-manipulation min-h-[56px] sm:min-h-[48px]'>
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-gray-600 flex-shrink-0'>
                                <path d="M10 10C11.6569 10 13 8.65685 13 7C13 5.34315 11.6569 4 10 4C8.34315 4 7 5.34315 7 7C7 8.65685 8.34315 10 10 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M2 18C2 14.6863 5.58172 12 10 12C14.4183 12 18 14.6863 18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              <span className='text-sm sm:text-sm text-gray-700 font-medium'>My Account</span>
                            </button>

                            <button onClick={handleMenuClick} className='w-full px-4 py-4 sm:py-3 flex items-center gap-3 active:bg-gray-50 hover:bg-gray-50 transition-colors text-left touch-manipulation min-h-[56px] sm:min-h-[48px]'>
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-gray-600 flex-shrink-0'>
                                <path d="M3 5H17L16 15H4L3 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M7 7L7.5 9M12.5 9L13 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8 12L9 13L12 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              <span className='text-sm text-gray-700 font-medium'>My Orders</span>
                            </button>

                            <button onClick={handleMenuClick} className='w-full px-4 py-4 sm:py-3 flex items-center gap-3 active:bg-gray-50 hover:bg-gray-50 transition-colors text-left touch-manipulation min-h-[56px] sm:min-h-[48px]'>
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-gray-600 flex-shrink-0'>
                                <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M7 7H13M7 11H13M7 15H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              <span className='text-sm text-gray-700 font-medium flex-1'>CashBack</span>
                              <span className='text-sm text-gray-500'>0</span>
                            </button>

                            <button onClick={handleMenuClick} className='w-full px-4 py-4 sm:py-3 flex items-center gap-3 active:bg-gray-50 hover:bg-gray-50 transition-colors text-left touch-manipulation min-h-[56px] sm:min-h-[48px]'>
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-gray-600 flex-shrink-0'>
                                <path d="M10 2C7.23858 2 5 4.23858 5 7C5 9.76142 7.23858 12 10 12C12.7614 12 15 9.76142 15 7C15 4.23858 12.7614 2 10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M10 12V18M6 18H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              <span className='text-sm text-gray-700 font-medium'>Manage Addresses</span>
                            </button>

                            <button onClick={handleMenuClick} className='w-full px-4 py-4 sm:py-3 flex items-center gap-3 active:bg-gray-50 hover:bg-gray-50 transition-colors text-left touch-manipulation min-h-[56px] sm:min-h-[48px]'>
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-gray-600 flex-shrink-0'>
                                <rect x="3" y="5" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M7 9H13M7 13H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              <span className='text-sm text-gray-700 font-medium'>My Wallet</span>
                            </button>

                            <button onClick={handleMenuClick} className='w-full px-4 py-4 sm:py-3 flex items-center gap-3 active:bg-gray-50 hover:bg-gray-50 transition-colors text-left touch-manipulation min-h-[56px] sm:min-h-[48px]'>
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-gray-600 flex-shrink-0'>
                                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M10 6V10M10 14H10.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              <span className='text-sm text-gray-700 font-medium'>Help</span>
                            </button>

                            <div className='border-t border-gray-100 mt-1'>
                              <button 
                                onClick={handleLogout}
                                className='w-full px-4 py-4 sm:py-3 flex items-center gap-3 active:bg-gray-50 hover:bg-gray-50 transition-colors text-left touch-manipulation min-h-[56px] sm:min-h-[48px]'
                              >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-gray-600 flex-shrink-0'>
                                  <path d="M7 17H3C2.44772 17 2 16.5523 2 16V4C2 3.44772 2.44772 3 3 3H7M14 14L18 10M18 10L14 6M18 10H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span className='text-sm text-gray-700 font-medium'>Logout</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <button 
                      onClick={handleLoginClick}
                      className='flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-teal-700 hover:bg-teal-800 active:bg-teal-900 transition-colors touch-manipulation flex-shrink-0'
                      aria-label="Login"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-white'>
                        <path d="M10 10C11.6569 10 13 8.65685 13 7C13 5.34315 11.6569 4 10 4C8.34315 4 7 5.34315 7 7C7 8.65685 8.34315 10 10 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 18C2 14.6863 5.58172 12 10 12C14.4183 12 18 14.6863 18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  )}
                </div>
        </div>
    </div>

    {/* Login Modal - Mobile optimized */}
    {isLoginModalOpen && (
      <div className='fixed inset-0 z-50 flex items-start sm:items-start sm:justify-end'>
        {/* Overlay */}
        <div 
          className='fixed inset-0 bg-black bg-opacity-20 sm:bg-opacity-20 transition-opacity touch-none'
          onClick={handleCloseLoginModal}
        ></div>
        
        {/* Modal Sidebar - Full screen on mobile, sidebar on desktop */}
        <div className='relative bg-white w-full sm:w-full sm:max-w-md h-full shadow-xl overflow-y-auto overscroll-contain touch-pan-y'>
          {/* Modal Header */}
          <div className='sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between'>
            <div className='flex flex-col'>
              <h2 className='text-2xl font-bold text-green-600'>Login</h2>
              <p className='text-sm text-gray-500 mt-1'>Sign in to continue</p>
            </div>
            <button 
              onClick={handleCloseLoginModal}
              className='text-gray-400 hover:text-gray-600 transition-colors'
              aria-label="Close modal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Modal Content */}
          <div className='p-6'>
            <div className='space-y-6'>
              {/* Google Sign In Button */}
              <div>
                <p className='text-sm text-gray-600 mb-4 text-center'>
                  Sign in with your Google account to continue
                </p>
                <button
                  onClick={handleGoogleSignIn}
                  className='w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 text-gray-700 px-6 py-4 sm:py-3 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors font-medium shadow-sm touch-manipulation min-h-[56px] sm:min-h-[48px]'
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>Sign in with Google</span>
                </button>
              </div>

              {/* Divider */}
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-gray-300'></div>
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='px-2 bg-white text-gray-500'>Secure login with Google</span>
                </div>
              </div>

              {/* Info */}
              <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
                <div className='flex items-start gap-3'>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-green-600 mt-0.5 flex-shrink-0'>
                    <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 6V10M10 14H10.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className='text-sm text-green-800'>
                    <p className='font-medium mb-1'>Why Google Sign-In?</p>
                    <p className='text-green-700'>Quick, secure, and no password to remember. Your data is protected by Google's security standards.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  )
}

export default index