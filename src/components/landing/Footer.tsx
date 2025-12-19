"use client"
import { ArrowUp } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-transparent">
      <div className="relative isolate px-6 pt-10 lg:px-8">
       <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" >
         <div style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)', }} className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75" />
          </div>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
          
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold text-gray-900">
              <a href='/'>
              <Image 
                src="/logo_medium.webp"
                alt="BlueIQ Logo"
                width={150}
                height={150}
              />
              </a>
            </h3>
            <p className="mt-4 max-w-md text-sm text-gray-600">
              BlueIQ delivers AI-powered resume parsing that helps staffing firms
              and HR teams move faster, reduce costs, and hire smarter.
            </p>
           {/* Partner Logos */}
              <div className="mt-6 flex flex-wrap items-center gap-6 opacity-90">
                <img src="/aws_logo.svg" alt="AWS Partner" className="h-6 w-auto" />
                <img src="/snowflake.svg" alt="Snowflake" className="h-6 w-auto" />
                <img
                  src="https://cdn.brandfetch.io/idSUrLOWbH/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B"
                  alt="Databricks"
                  className="h-6 w-auto"
                />
              </div>
          </div>

          {/* Product */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-400">
              Product
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-indigo-600">Features</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-600">Integrations</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-600">Pricing</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-600">FAQs</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-400">
              Company
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-indigo-600">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-600">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-600">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-600">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-400">
              Legal
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-indigo-600">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-600">Terms of Service</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-600">Security</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-8 sm:flex-row">
          <p className="text-sm text-gray-500">
             © 2026 Ocean Blue Solutions, Inc. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <span className="text-gray-500">#BlueIQ</span>
            <span className="text-gray-500">#HireSmarter</span>
            <span className="text-gray-500">#OceanBlueSolutions</span>
          </div>
          <div className="flex space-x-6 text-sm">
            {/* Go to top */}
            <span className="bg-white/20 backdrop-blur-2xl shadow-lg p-4">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <ArrowUp className="h-6 w-6" />
              </button>
              </span>
          </div>
        </div>
      </div>
      </div>
    </footer>
  )
}

export default Footer
