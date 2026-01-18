'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

function index({ isOpen = false, onClose }) {
  const router = useRouter()
  const pathname = usePathname()
  const asideRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  // Debug: Log when isOpen changes
  useEffect(() => {
    console.log('Sidebar isOpen state:', isOpen)
  }, [isOpen])

  // Check if mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Close sidebar when clicking outside on mobile/tablet
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && asideRef.current && !asideRef.current.contains(event.target)) {
        onClose?.()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
      // Prevent body scroll when sidebar is open on mobile
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  // Close sidebar when route changes on mobile/tablet
  useEffect(() => {
    onClose?.()
  }, [pathname, onClose])

  const handleLinkClick = () => {
    onClose?.()
  }

  return (
    <>
      {/* Overlay for mobile/tablet */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[45] lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      <aside 
        ref={asideRef}
        className="fixed top-[80px] left-0 h-[calc(100vh-80px)] w-64 bg-white border-r border-gray-200 shadow-lg lg:shadow-none overflow-y-auto transition-transform duration-300 ease-in-out z-[50] lg:z-auto"
        style={{
          transform: isMobile 
            ? (isOpen ? 'translateX(0)' : 'translateX(-100%)')
            : 'translateX(0)', // Always visible on desktop
        }}
      >
    <div className="p-4">
        {/* Close Button for Mobile/Tablet */}
        <div className="flex items-center justify-between mb-4 lg:block">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors touch-manipulation"
            aria-label="Go back"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors touch-manipulation"
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* My Account */}
        <Link
          href="/my-account/my-profile"
          onClick={handleLinkClick}
          className={`flex items-center gap-3 px-4 py-3 mb-2 rounded-lg font-medium transition-colors ${
            pathname === '/my-account/my-profile' 
              ? 'bg-gray-100 text-gray-900' 
              : 'hover:bg-gray-50 text-gray-700'
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-700">
            <path d="M10 10C11.6569 10 13 8.65685 13 7C13 5.34315 11.6569 4 10 4C8.34315 4 7 5.34315 7 7C7 8.65685 8.34315 10 10 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 18C2 14.6863 5.58172 12 10 12C14.4183 12 18 14.6863 18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>My Account</span>
        </Link>

        {/* Navigation Items */}
        <nav className="space-y-1">
          <Link
            href="/my-account/my-addresses"
            onClick={handleLinkClick}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === '/my-account/my-addresses' 
                ? 'bg-gray-100 text-gray-900 font-medium' 
                : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
              <path d="M10 2C7.23858 2 5 4.23858 5 7C5 9.76142 7.23858 12 10 12C12.7614 12 15 9.76142 15 7C15 4.23858 12.7614 2 10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 12V18M6 18H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Manage Address</span>
          </Link>

          <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 cursor-not-allowed opacity-60">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
              <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 7H13M7 11H13M7 15H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="flex-1">Cashback</span>
            <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs font-medium rounded-full">Soon</span>
          </div>

          <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 cursor-not-allowed opacity-60">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
              <rect x="3" y="5" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 9H13M7 13H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="flex-1">Wallet</span>
            <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs font-medium rounded-full">Soon</span>
          </div>

          <Link
            href="/my-account/my-help"
            onClick={handleLinkClick}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === '/my-account/my-help' 
                ? 'bg-gray-100 text-gray-900 font-medium' 
                : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
              <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 6V10M10 14H10.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Help</span>
          </Link>

          <Link
            href="/my-account/my-orders"
            onClick={handleLinkClick}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === '/my-account/my-orders' 
                ? 'bg-gray-100 text-gray-900 font-medium' 
                : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
              <path d="M3 5H17L16 15H4L3 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 7L7.5 9M12.5 9L13 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 12L9 13L12 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>My Orders</span>
          </Link>

          <Link
            href="/my-account/feedback"
            onClick={handleLinkClick}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors text-gray-700"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
              <path d="M3 4H17L16 14H4L3 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 8H13M7 11H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="14" cy="6" r="1.5" fill="currentColor"/>
            </svg>
            <span>Feedback</span>
          </Link>

          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors text-gray-700 text-left"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
              <path d="M7 17H3C2.44772 17 2 16.5523 2 16V4C2 3.44772 2.44772 3 3 3H7M14 14L18 10M18 10L14 6M18 10H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Log Out</span>
          </button>
        </nav>
      </div>
    </aside>
    </>
  )
}

export default index