'use client'
import React, { useState } from 'react'
import Header from '@/components/header/index.jsx'
import ProfileAside from '@/components/profile/aside/index.jsx'

function Page() {
  const [activeTab, setActiveTab] = useState('faqs')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const faqs = [
    {
      question: 'What is FSSAI?',
      answer: 'FSSAI stands for Food Safety and Standards Authority of India. FSSAI has been created for laying down science-based standards for articles of food and to regulate their manufacture, storage, distribution, sale, and import to ensure the availability of safe and wholesome food for human consumption.'
    },
    {
      question: 'What is the concept behind Mealawe?',
      answer: 'Mealawe is a homemade food delivery service. Mealawe is a platform that will connect home to home. Home chefs from neighborhood kitchens will join Mealawe after completing some necessary formalities. Every neighborhood kitchen will have an option to showcase their day-to-day food menu & specialty food items such as papad, pickle, regional sweets, etc. on Mealawe application. They will also have chance to set the price of the every food items which they are going to showcase on Mealawe platform. Every home chef will be able to switch on daily menu food items a night before with the help of Mealawe home chef application. Also, they will be let others know about the food preparation time for breakfast, lunch, high tea, & dinner. Interested users will have to place their choice food order from the user Mealawe application. Home chefs will see these orders on Mealawe home chef application & accordingly they will accept these orders. Home chefs will have to pack these order in the package materials provided by Mealawe. Mealawe delivery boy will come and pick up the delivery from the home chef\'s kitchen. The food item will be delivered to the user in no time. In the end of this chain, a home chef will receive the cost of the food items delivered and Mealawe will earn a small percentage of the total commission.'
    },
    {
      question: 'What is "Jo Khao, Wahi Khilao" concept?',
      answer: 'Our motto is to serve home food to our customers which is full of health and regional flavour. Our home chefs are going to serve what they are going to consume. This will ensure that the cooked food has soul in it along with taste and health. The concept will involve instant food orders.'
    },
    {
      question: 'How we are ensuring quality of home-made food?',
      answer: 'We ensure quality through multiple layers of verification and standards. All home chefs must complete necessary formalities including FSSAI registration and compliance. We provide standardized packaging materials to maintain food safety during delivery. Our delivery partners follow strict hygiene protocols, and we have a quality assurance process that includes regular checks and customer feedback mechanisms to maintain the highest standards of homemade food quality.'
    }
  ]

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
            {/* Help Header */}
            <div className="bg-green-600 text-white px-6 py-4 rounded-t-lg mb-6">
              <h1 className="text-xl font-semibold">Help</h1>
            </div>

            {/* Support Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Support</h2>

              {/* Tabs */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setActiveTab('faqs')}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'faqs'
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  FAQs
                </button>
                <button
                  onClick={() => setActiveTab('email')}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'email'
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Email
                </button>
              </div>

              {/* FAQs Content */}
              {activeTab === 'faqs' && (
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                      <h3 className="text-base font-semibold text-gray-900 mb-2">
                        Q: {faq.question}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        <span className="font-medium">A:</span> {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Email Content */}
              {activeTab === 'email' && (
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Contact Us via Email
                    </h3>
                    <p className="text-gray-700 mb-4">
                      If you have any questions, concerns, or need assistance, please feel free to reach out to us via email.
                    </p>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Email
                        </label>
                        <input
                          type="email"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="your.email@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subject
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="How can we help you?"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Message
                        </label>
                        <textarea
                          rows={6}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                          placeholder="Please describe your question or issue in detail..."
                        />
                      </div>
                      <button className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                        Send Email
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Page