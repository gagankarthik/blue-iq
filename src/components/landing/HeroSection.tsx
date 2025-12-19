'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Features', href: '#features' },
  { name: 'Benefits', href: '#benefits' },
  { name: 'Pricing', href: '#plans' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '/contact' },
]

export default function HeroSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  /* ================= CURSOR GLOW EFFECT ================= */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const glow = document.getElementById('cursor-glow')
      if (!glow) return
      glow.style.left = `${e.clientX}px`
      glow.style.top = `${e.clientY}px`
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-transparent">

      {/* ================= CURSOR GLOW ================= */}
      <div
        id="cursor-glow"
        className="pointer-events-none fixed z-0 h-[420px] w-[420px]
        -translate-x-1/2 -translate-y-1/2 rounded-full
        bg-indigo-400/20 blur-3xl transition-all duration-100"
      />

      {/* ================= NAVBAR ================= */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between px-6 py-6 lg:px-8">
          <a href="/" className="text-xl font-bold text-indigo-600">
            <img src="/logo_medium.webp" alt="BlueIQ Logo" className="h-24" />
          </a>

          <div className="hidden lg:flex gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-gray-900 hover:text-indigo-600"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex">
            <a href="/dashboard" className="text-sm font-semibold text-gray-900 hover:text-indigo-600">
              Log in →
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden rounded-md p-2 text-gray-700"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </nav>

        {/* ================= MOBILE MENU ================= */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 bg-black/20" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-indigo-600">BlueIQ</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <XMarkIcon className="h-6 w-6 text-gray-700" />
              </button>
            </div>

            <div className="mt-8 space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block rounded-lg px-3 py-2 font-semibold text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      {/* ================= BACKGROUND EFFECTS ================= */}
      <div className="relative isolate px-6 pt-10 lg:px-8">

        {/* Floating Gradient Blob */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu
          overflow-hidden blur-3xl sm:-top-80 animate-float-slow"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 72.5% 32.5%, 60.2% 62.4%, 47.5% 58.3%, 27.5% 76.7%, 0.1% 64.9%, 27.6% 76.8%, 76.1% 97.7%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678]
            w-[36rem] -translate-x-1/2 rotate-30
            bg-gradient-to-tr from-pink-400 to-indigo-500 opacity-30
            sm:left-[calc(50%-30rem)] sm:w-[72rem]"
          />
        </div>
      <div className="absolute inset-0 -z-10 overflow-hidden"> 
      <svg aria-hidden="true" className="absolute top-0 left-[max(50%,25rem)] h-256 w-512 -translate-x-1/2 mask-[radial-gradient(64rem_64rem_at_top,white,transparent)] stroke-gray-200" >
       <defs> 
        <pattern x="50%" y={-1} id="e813992c-7d03-4cc4-a2bd-151760b470a0" width={200} height={200} patternUnits="userSpaceOnUse" > 
          <path d="M100 200V.5M.5 .5H200" fill="none" /> </pattern> </defs> <svg x="50%" y={-1} className="overflow-visible fill-black/10"> 
            <path d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z" strokeWidth={0} /> 
            </svg> 
            <rect fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" width="100%" height="100%" strokeWidth={0} /> 
            </svg>
       </div>

        {/* ================= HERO CONTENT ================= */}
        <div className="relative flex min-h-screen items-center justify-center px-6">
          <div className="mx-auto max-w-3xl text-center animate-fade-up">

            <h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl animate-in" >
              <span
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600
                bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient "
              >
                BlueIQ
              </span>
              : Intelligence That Speeds Hiring
            </h1>

            <p className="mt-8 text-lg font-medium text-gray-500 sm:text-xl">
              AI-powered resume parsing for staffing firms and HR teams.
              Turn unstructured resumes into clean, searchable candidate data in seconds.
            </p>

            <div className="mt-10 flex flex-col gap-8 items-center sm:flex-row sm:justify-center">
              <Link
                href="/dashboard"
                className="rounded-md bg-indigo-600 px-6 py-3 text-sm
                font-semibold text-white shadow-lg
                hover:bg-indigo-500 hover:shadow-indigo-500/40 transition"
              >
                Request a Demo
              </Link>

              <a
                href="#plans"
                className="text-sm font-semibold text-gray-900 hover:text-indigo-600"
              >
                Start Free Trial →
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}