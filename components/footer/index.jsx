'use client'
import React, { useState, useEffect } from 'react'

function index() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className='bg-white relative'>
      <div className='w-[90%] m-auto py-12'>
        {/* Top Section */}
        <div className='flex flex-wrap gap-8 mb-8'>
          {/* Logo and Description Section */}
          <div className='flex-1 min-w-[300px]'>
            <div className='flex items-center gap-2 mb-4'>
              {/* Logo graphic */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#22c55e"/>
                <circle cx="12" cy="12" r="3" fill="#22c55e"/>
              </svg>
              <a href="#" className='flex flex-col'>
                <span className='text-xl font-semibold text-green-600'>mealawe™</span>
                <span className='text-xs text-green-400'>Khao Ghar Ka...</span>
              </a>
            </div>
            <p className='text-sm text-gray-600 max-w-md'>
              We at Mealawe bring in technology and solutions for building a healthy society by delivering the best homemade food from nearby home chefs.
            </p>
          </div>

          {/* Links Columns */}
          <div className='flex flex-wrap gap-8'>
            {/* Company Column */}
            <div className='min-w-[150px]'>
              <h3 className='text-sm font-semibold text-gray-900 mb-4'>Company</h3>
              <ul className='space-y-2'>
                <li><a href="#" className='text-sm text-gray-600 hover:text-green-600 transition-colors'>About us</a></li>
                <li><a href="#" className='text-sm text-gray-600 hover:text-green-600 transition-colors'>Why us</a></li>
                <li><a href="#" className='text-sm text-gray-600 hover:text-green-600 transition-colors'>Join Us</a></li>
                <li><a href="#" className='text-sm text-gray-600 hover:text-green-600 transition-colors'>Careers</a></li>
                <li><a href="#" className='text-sm text-gray-600 hover:text-green-600 transition-colors'>Contact Us</a></li>
              </ul>
            </div>

            {/* Information Column */}
            <div className='min-w-[150px]'>
              <h3 className='text-sm font-semibold text-gray-900 mb-4'>Information</h3>
              <ul className='space-y-2'>
                <li><a href="#" className='text-sm text-gray-600 hover:text-green-600 transition-colors'>Privacy Policy</a></li>
                <li><a href="#" className='text-sm text-gray-600 hover:text-green-600 transition-colors'>Terms & Conditions</a></li>
                <li><a href="#" className='text-sm text-gray-600 hover:text-green-600 transition-colors'>Cancellation & Refunds</a></li>
                <li><a href="#" className='text-sm text-gray-600 hover:text-green-600 transition-colors'>Blogs</a></li>
              </ul>
            </div>

            {/* Contact us Column */}
            <div className='min-w-[200px]'>
              <h3 className='text-sm font-semibold text-gray-900 mb-4'>Contact us</h3>
              <ul className='space-y-3'>
                <li className='flex items-center gap-2'>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-gray-600'>
                    <path d="M14.667 11.333v2a1.333 1.333 0 0 1-1.454 1.333 13.187 13.187 0 0 1-5.74-2.04 13 13 0 0 1-4-4 13.187 13.187 0 0 1-2.04-5.74A1.333 1.333 0 0 1 2.667 1.333h2A1.333 1.333 0 0 1 6 2.62a9.067 9.067 0 0 0 .513 1.947 1.333 1.333 0 0 1-.3 1.407l-.847.847a10.667 10.667 0 0 0 4 4l.847-.847a1.333 1.333 0 0 1 1.407-.3 9.067 9.067 0 0 0 1.947.513 1.333 1.333 0 0 1 1.287 1.333z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <a href="tel:+91966588488" className='text-sm text-gray-600 hover:text-green-600 transition-colors'>+91 966588488</a>
                </li>
                <li className='flex items-center gap-2'>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className='text-gray-600'>
                    <path d="M2.667 4l5.333 4 5.333-4M2.667 4h10.666A1.333 1.333 0 0 1 14.667 5.333v6.667A1.333 1.333 0 0 1 13.333 13.333H2.667A1.333 1.333 0 0 1 1.333 12V5.333A1.333 1.333 0 0 1 2.667 4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <a href="mailto:help@mealawe.com" className='text-sm text-gray-600 hover:text-green-600 transition-colors'>help@mealawe.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-gray-300'>
          {/* Copyright */}
          <p className='text-xs text-gray-600'>
            © Yagy Tech Pvt Ltd (Formerly Known as Climbing Seeds Pvt Ltd). 2025 All rights reserved.
          </p>

          {/* App Download Buttons */}
          <div className='flex items-center gap-3'>
            {/* Google Play Button */}
            <a 
              href="#" 
              className='flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors'
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 1.5L9 9L1.5 16.5V1.5Z" fill="white"/>
                <path d="M9 9L16.5 1.5L9 1.5V9Z" fill="white"/>
                <path d="M9 9L16.5 16.5L9 16.5V9Z" fill="white"/>
              </svg>
              <div className='flex flex-col'>
                <span className='text-[10px] font-medium leading-tight'>GET IT ON</span>
                <span className='text-xs font-bold leading-tight'>Google Play</span>
              </div>
            </a>

            {/* App Store Button */}
            <a 
              href="#" 
              className='flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors'
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5 2.5C13.5 2.5 12.5 2 11.5 3C10.5 4 9 5.5 9 5.5C9 5.5 7.5 4 6.5 3C5.5 2 4.5 2.5 4.5 2.5C4.5 2.5 3.5 3 3.5 4.5C3.5 6 4.5 7.5 4.5 7.5L9 12L13.5 7.5C13.5 7.5 14.5 6 14.5 4.5C14.5 3 13.5 2.5 13.5 2.5Z" fill="white"/>
              </svg>
              <div className='flex flex-col'>
                <span className='text-[10px] font-medium leading-tight'>Download on the</span>
                <span className='text-xs font-bold leading-tight'>App Store</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className='fixed bottom-6 right-6 bg-gray-400 hover:bg-gray-500 text-white p-3 rounded shadow-lg transition-colors z-50'
          aria-label="Scroll to top"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 5V15M10 5L5 10M10 5l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </footer>
  )
}

export default index