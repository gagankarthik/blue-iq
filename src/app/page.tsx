// app/page.tsx
"use client";

import PixelBlast from "@/components/PixelBlast";
import { useEffect, useState } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
     {/* TopNavBar - transforms to pill on scroll */}
<nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b-[0.5px] border-slate-200">
  <div className="max-w-[1400px] mx-auto px-6 lg:px-12 border-l-[0.5px] border-r-[0.5px] border-slate-200">
    <div className="flex justify-between items-center w-full py-4">
      <div className="text-xl font-bold tracking-tighter text-slate-900 font-headline">BLUE-IQ</div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-12 items-center">
        {/* Platform Dropdown */}
        <div className="relative group">
          <a className="font-headline uppercase tracking-[0.05em] text-[12px] font-bold text-[#002181] border-b-[0.5px] border-[#002181] pb-1 cursor-pointer" href="#">
            PLATFORM
          </a>
          {/* Dropdown Card */}
          <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            <div className="w-[320px] bg-white border-[0.5px] border-slate-200 shadow-2xl rounded-2xl overflow-hidden">
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-[#002181]/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#002181]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-headline font-bold text-sm text-slate-900">Analytics Suite</div>
                    <div className="text-xs text-slate-500 mt-1">Real-time workforce intelligence</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-[#002181]/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#002181]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-headline font-bold text-sm text-slate-900">Vendor Management</div>
                    <div className="text-xs text-slate-500 mt-1">Complete vendor ecosystem oversight</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-[#002181]/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#002181]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-headline font-bold text-sm text-slate-900">Spend Intelligence</div>
                    <div className="text-xs text-slate-500 mt-1">AI-driven cost optimization</div>
                  </div>
                </div>
              </div>
              <div className="border-t-[0.5px] border-slate-100 p-4 bg-slate-50/50">
                <button className="w-full text-center text-[#002181] text-xs font-bold uppercase tracking-wider hover:underline">
                  View All Platform Features →
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Solutions Dropdown */}
        <div className="relative group">
          <a className="font-headline uppercase tracking-[0.05em] text-[12px] font-bold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer" href="#">
            SOLUTIONS
          </a>
          <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            <div className="w-[360px] bg-white border-[0.5px] border-slate-200 shadow-2xl rounded-2xl overflow-hidden">
              <div className="p-6">
                <div className="space-y-3">
                  <div className="p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className="font-headline font-bold text-sm text-slate-900">Enterprise</div>
                    <div className="text-xs text-slate-500 mt-1">For large organizations with complex vendor ecosystems</div>
                  </div>
                  <div className="p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className="font-headline font-bold text-sm text-slate-900">Mid-Market</div>
                    <div className="text-xs text-slate-500 mt-1">Scale operations with intelligent workforce management</div>
                  </div>
                  <div className="p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className="font-headline font-bold text-sm text-slate-900">Public Sector</div>
                    <div className="text-xs text-slate-500 mt-1">Government and education compliance solutions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Insights Dropdown */}
        <div className="relative group">
          <a className="font-headline uppercase tracking-[0.05em] text-[12px] font-bold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer" href="#">
            INSIGHTS
          </a>
          <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            <div className="w-[340px] bg-white border-[0.5px] border-slate-200 shadow-2xl rounded-2xl overflow-hidden">
              <div className="p-6 space-y-4">
                <div className="p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="font-headline font-bold text-sm text-slate-900">Research & Reports</div>
                    <span className="text-[10px] font-bold text-[#002181] uppercase">New</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Industry benchmarks and workforce trends</div>
                </div>
                <div className="p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="font-headline font-bold text-sm text-slate-900">Case Studies</div>
                  <div className="text-xs text-slate-500 mt-1">Real-world success stories from our clients</div>
                </div>
                <div className="p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="font-headline font-bold text-sm text-slate-900">Webinars & Events</div>
                  <div className="text-xs text-slate-500 mt-1">Live sessions with industry experts</div>
                </div>
                <div className="p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="font-headline font-bold text-sm text-slate-900">Blog</div>
                  <div className="text-xs text-slate-500 mt-1">Latest insights and product updates</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Company Dropdown */}
        <div className="relative group">
          <a className="font-headline uppercase tracking-[0.05em] text-[12px] font-bold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer" href="#">
            COMPANY
          </a>
          <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            <div className="w-[280px] bg-white border-[0.5px] border-slate-200 shadow-2xl rounded-2xl overflow-hidden">
              <div className="p-6 space-y-3">
                <div className="p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="font-headline font-bold text-sm text-slate-900">About Us</div>
                  <div className="text-xs text-slate-500 mt-1">Our mission and vision</div>
                </div>
                <div className="p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="font-headline font-bold text-sm text-slate-900">Careers</div>
                  <div className="text-xs text-slate-500 mt-1">Join our growing team</div>
                </div>
                <div className="p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="font-headline font-bold text-sm text-slate-900">Contact</div>
                  <div className="text-xs text-slate-500 mt-1">Get in touch with our team</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <button className="bg-[#002181] hover:bg-[#0032b6] text-white px-6 py-2 font-label text-[12px] font-bold tracking-widest transition-all duration-300">
        REQUEST DEMO
      </button>
      
      {/* Mobile Menu Button */}
      <button className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors">
        <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  </div>
  
  {/* Mobile Navigation Menu - Full width card style */}
  <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b-[0.5px] border-slate-200 shadow-xl max-h-0 overflow-hidden transition-all duration-300">
    <div className="p-6 space-y-6">
      {/* Platform Section */}
      <div>
        <div className="font-headline uppercase tracking-[0.05em] text-[12px] font-bold text-[#002181] mb-3">PLATFORM</div>
        <div className="space-y-3 pl-4">
          <div className="p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="font-headline font-bold text-sm">Analytics Suite</div>
            <div className="text-xs text-slate-500 mt-0.5">Real-time workforce intelligence</div>
          </div>
          <div className="p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="font-headline font-bold text-sm">Vendor Management</div>
            <div className="text-xs text-slate-500 mt-0.5">Complete vendor ecosystem oversight</div>
          </div>
          <div className="p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="font-headline font-bold text-sm">Spend Intelligence</div>
            <div className="text-xs text-slate-500 mt-0.5">AI-driven cost optimization</div>
          </div>
        </div>
      </div>
      
      {/* Solutions Section */}
      <div>
        <div className="font-headline uppercase tracking-[0.05em] text-[12px] font-bold text-slate-500 mb-3">SOLUTIONS</div>
        <div className="space-y-3 pl-4">
          <div className="p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="font-headline font-bold text-sm">Enterprise</div>
            <div className="text-xs text-slate-500 mt-0.5">For large organizations</div>
          </div>
          <div className="p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="font-headline font-bold text-sm">Mid-Market</div>
            <div className="text-xs text-slate-500 mt-0.5">Scale operations</div>
          </div>
          <div className="p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="font-headline font-bold text-sm">Public Sector</div>
            <div className="text-xs text-slate-500 mt-0.5">Government & education</div>
          </div>
        </div>
      </div>
      
      {/* Insights Section */}
      <div>
        <div className="font-headline uppercase tracking-[0.05em] text-[12px] font-bold text-slate-500 mb-3">INSIGHTS</div>
        <div className="space-y-3 pl-4">
          <div className="p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="font-headline font-bold text-sm">Research & Reports</div>
            <div className="text-xs text-slate-500 mt-0.5">Industry benchmarks</div>
          </div>
          <div className="p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="font-headline font-bold text-sm">Case Studies</div>
            <div className="text-xs text-slate-500 mt-0.5">Client success stories</div>
          </div>
          <div className="p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="font-headline font-bold text-sm">Webinars & Events</div>
            <div className="text-xs text-slate-500 mt-0.5">Live sessions</div>
          </div>
        </div>
      </div>
      
      {/* Company Section */}
      <div>
        <div className="font-headline uppercase tracking-[0.05em] text-[12px] font-bold text-slate-500 mb-3">COMPANY</div>
        <div className="space-y-3 pl-4">
          <div className="p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="font-headline font-bold text-sm">About Us</div>
          </div>
          <div className="p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="font-headline font-bold text-sm">Careers</div>
          </div>
          <div className="p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="font-headline font-bold text-sm">Contact</div>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t-[0.5px] border-slate-100">
        <button className="w-full bg-[#002181] hover:bg-[#0032b6] text-white px-6 py-3 font-label text-[12px] font-bold tracking-widest transition-all duration-300">
          REQUEST DEMO
        </button>
      </div>
    </div>
  </div>
</nav>

      {/* SideNavBar - left vertical navigation */}
      <aside className="fixed left-0 top-1/2 -translate-y-1/2 w-16 z-40 bg-transparent flex flex-col items-center gap-8 h-80 py-4">
        <div className="text-[#002181] font-bold scale-110 cursor-pointer vertical-text font-headline text-[10px] tabular-nums tracking-widest hover:scale-110 transition-transform">HIRE</div>
        <div className="text-slate-300 hover:text-slate-500 cursor-pointer vertical-text font-headline text-[10px] tabular-nums tracking-widest hover:scale-110 transition-transform">GOVERN</div>
        <div className="text-slate-300 hover:text-slate-500 cursor-pointer vertical-text font-headline text-[10px] tabular-nums tracking-widest hover:scale-110 transition-transform">SPEND</div>
        <div className="text-slate-300 hover:text-slate-500 cursor-pointer vertical-text font-headline text-[10px] tabular-nums tracking-widest hover:scale-110 transition-transform">INTELLIGENCE</div>
      </aside>

      {/* Right side vertical line */}
      <div className="fixed right-0 top-0 bottom-0 w-16 z-40 pointer-events-none border-r-[0.5px] border-slate-200/50 hidden lg:block"></div>

      <main className="bg-[#fefefe] text-[#1a1c1d]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 border-l-[0.5px] border-r-[0.5px] border-slate-200">
          
         {/* Hero Section */}
    <section className="min-h-screen flex flex-col relative overflow-hidden border-b-[0.5px] border-[#bfc9c4]">
      {/* PixelBlast Background - full coverage behind everything */}
      <div className="absolute inset-0 z-0  ">
     <PixelBlast
      variant="square"
      pixelSize={4}
      color="#B19EEF"
      patternScale={2}
      patternDensity={1}
      pixelSizeJitter={0}
      enableRipples
      rippleSpeed={0.4}
      rippleThickness={0.12}
      rippleIntensityScale={1.5}
      liquid={false}
      liquidStrength={0.12}
      liquidRadius={1.2}
      liquidWobbleSpeed={5}
      speed={0.5}
      edgeFade={0.25}
      transparent
    />
  </div>
  
  {/* Blueprint grid overlay - subtle pattern on top of PixelBlast */}
  <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none z-5"></div>
  
  {/* Main Content - sits on top of background */}
  <div className="flex flex-col grow justify-center gap-8 relative z-10 py-12 pt-32">
    <div className="flex flex-col gap-4">
      <span className="font-label text-[10px] tracking-[0.3em] text-[#4c635c] uppercase">BLUE-IQ / THE INTELLIGENCE LAYER</span>
      <h1 className="font-headline text-5xl md:text-7xl lg:text-6xl font-bold leading-[1.1] text-[#1a1c1d] tracking-tighter max-w-5xl">
        THE INTELLIGENCE LAYER <br />
        <span className="text-[#002181]">FOR WORKFORCE, VENDORS,</span><br />
        AND SERVICES OPERATIONS
      </h1>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mt-8">
      <div className="md:col-span-5 flex flex-col gap-6">
        <p className="font-body text-[#3f4945] leading-relaxed text-base">
          While traditional VMS and ATS tools track workflow, Blue-IQ delivers intelligence.
          From hire to governed to spend — complete visibility across your vendor ecosystem.
        </p>
        <div className="flex gap-4">
          <button className="bg-[#002181] text-white px-8 py-3 font-label text-xs font-bold tracking-[0.2em] transition-all hover:bg-[#0032b6]">EXPLORE PLATFORM</button>
          <button className="border-[0.5px] border-[#707975] text-[#1a1c1d] px-8 py-3 font-label text-xs font-bold tracking-[0.2em] hover:bg-[#eeeef0] transition-all">WATCH DEMO</button>
        </div>
      </div>
    </div>
  </div>
  
  {/* Stats Row - also on top of background */}
  <div className="w-full grid grid-cols-2 md:grid-cols-4 border-t-[0.5px] border-[#bfc9c4] relative z-10 bg-white/80 backdrop-blur-sm">
    <div className="p-6 border-r-[0.5px] border-[#bfc9c4] flex flex-col gap-2">
      <span className="font-label text-[10px] text-[#707975] uppercase tracking-widest">SOWs Managed</span>
      <span className="font-headline text-2xl font-bold">10,000+</span>
    </div>
    <div className="p-6 md:border-r-[0.5px] border-[#bfc9c4] flex flex-col gap-2">
      <span className="font-label text-[10px] text-[#707975] uppercase tracking-widest">Vendors</span>
      <span className="font-headline text-2xl font-bold">1,200+</span>
    </div>
    <div className="p-6 border-r-[0.5px] border-[#bfc9c4] flex flex-col gap-2">
      <span className="font-label text-[10px] text-[#707975] uppercase tracking-widest">Oversight Reduction</span>
      <span className="font-headline text-2xl font-bold">63%</span>
    </div>
    <div className="p-6 flex flex-col gap-2">
      <span className="font-label text-[10px] text-[#707975] uppercase tracking-widest">Faster Hiring</span>
      <span className="font-headline text-2xl font-bold">3.2x</span>
    </div>
  </div>
</section>

          {/* THE CHALLENGE Section */}
          <section className="py-24 border-b-[0.5px] border-[#bfc9c4]">
            <div className="max-w-4xl mx-auto text-center">
              <span className="font-label text-[10px] tracking-[0.3em] text-[#4c635c] uppercase mb-4 block">THE CHALLENGE</span>
              <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-[#1a1c1d] mb-6">
                Complex vendor ecosystems. Billions in flow.
              </h2>
              <p className="font-body text-[#3f4945] text-lg leading-relaxed">
                Enterprises navigate millions flowing through Statements of Work, contingent labor, 
                and hiring pipelines. Many manage thousands of SOWs and vendor-delivered projects. 
                While traditional VMS and ATS tools track workflow, <span className="text-[#002181] font-semibold">Blue-IQ delivers intelligence.</span>
              </p>
            </div>
          </section>

          {/* Why Us Section */}
          <section className="py-24 border-b-[0.5px] border-[#bfc9c4]">
            <div className="flex justify-between items-baseline mb-12 border-b-[0.5px] border-[#bfc9c4] pb-6">
              <h2 className="font-headline text-3xl font-bold uppercase tracking-tight">Why Blue-IQ</h2>
              <span className="font-label text-xs tracking-widest text-[#4c635c] uppercase">The Advantage</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-[0.5px] border-[#bfc9c4]">
              <div className="p-8 border-r-[0.5px] border-[#bfc9c4]">
                <span className="material-symbols-outlined text-3xl text-[#002181] mb-4">analytics</span>
                <h3 className="font-headline text-xl font-bold mb-3 uppercase">AI-Powered Insights</h3>
                <p className="font-body text-sm text-[#3f4945] leading-relaxed">Machine learning algorithms that identify patterns, predict risks, and optimize spend before issues arise.</p>
              </div>
              <div className="p-8 border-r-[0.5px] border-[#bfc9c4]">
                <span className="material-symbols-outlined text-3xl text-[#002181] mb-4">verified</span>
                <h3 className="font-headline text-xl font-bold mb-3 uppercase">10-Dimension Audit</h3>
                <p className="font-body text-sm text-[#3f4945] leading-relaxed">Proprietary SOW evaluation rubric that catches compliance issues before contracts are signed.</p>
              </div>
              <div className="p-8">
                <span className="material-symbols-outlined text-3xl text-[#002181] mb-4">bolt</span>
                <h3 className="font-headline text-xl font-bold mb-3 uppercase">Real-Time Visibility</h3>
                <p className="font-body text-sm text-[#3f4945] leading-relaxed">Consolidated dashboards showing every dollar, every vendor, every SOW in one unified view.</p>
              </div>
            </div>
          </section>

          {/* BLUE-IQ HIRE */}
          <section className="py-24 border-b-[0.5px] border-[#bfc9c4]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-[#002181] text-2xl">smart_toy</span>
                  <span className="font-label text-[10px] tracking-[0.2em] text-[#002181] uppercase">Intelligent Hiring Engine</span>
                </div>
                <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-[#1a1c1d] mb-3">
                  BLUE-IQ <span className="text-[#002181]">HIRE</span>
                </h2>
                <p className="font-headline text-lg font-semibold text-[#002181] mb-4">Hire Smarter. Move Faster.</p>
                <p className="font-body text-[#3f4945] leading-relaxed mb-5">
                  Intelligent hiring engine with AI-powered resume parsing, automated profile standardization, 
                  CRM/ATS integration, and credentialing verification.
                </p>
                <div className="border-l-[2px] border-[#002181] pl-4 py-2">
                  <p className="font-label text-xs text-[#1a1c1d] leading-relaxed">
                    <span className="font-bold">Complete Intelligence Ecosystem:</span> Before work begins 
                    (Hire validates) · As contracted (Govern ensures compliance) · As delivered (Spend ensures visibility)
                  </p>
                </div>
              </div>
              <div className="order-1 md:order-2 bg-[#1a1c1d] p-8 relative min-h-[280px] border-[0.5px] border-[#bfc9c4]">
                <div className="absolute inset-0 blueprint-grid opacity-10"></div>
                <div className="text-center relative z-10 py-8">
                  <span className="material-symbols-outlined text-4xl text-white/50 mb-3">recruitment</span>
                  <p className="font-label text-white/60 text-xs uppercase tracking-wider">AI-powered parsing · Auto-standardization · Real-time verification</p>
                </div>
              </div>
            </div>
          </section>

          {/* BLUE-IQ GOVERN */}
          <section className="py-24 border-b-[0.5px] border-[#bfc9c4]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="bg-[#1a1c1d] p-8 relative min-h-[280px] border-[0.5px] border-[#bfc9c4]">
                <div className="absolute inset-0 blueprint-grid opacity-10"></div>
                <div className="text-center relative z-10 py-8">
                  <span className="material-symbols-outlined text-4xl text-white/50 mb-3">gavel</span>
                  <p className="font-label text-white/60 text-xs uppercase tracking-wider">10-dimension SOW Audit Rubric · Pre-signature compliance</p>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-[#002181] text-2xl">verified</span>
                  <span className="font-label text-[10px] tracking-[0.2em] text-[#002181] uppercase">SOW Intelligence</span>
                </div>
                <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-[#1a1c1d] mb-3">
                  BLUE-IQ <span className="text-[#002181]">GOVERN</span>
                </h2>
                <p className="font-body text-[#3f4945] leading-relaxed mb-5">
                  Your key to perfect Statements of Work. Our tool ensures clarity, enforceability, and compliance 
                  with enterprise standards. Using Ocean Blue's 10-dimension SOW Audit Rubric, it evaluates SOWs 
                  like a seasoned auditor before contracts are signed.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-4 border-t-[0.5px] border-[#bfc9c4] pt-5">
                  <div><span className="font-headline text-2xl font-bold text-[#002181]">99%</span><div className="font-label text-[9px] text-[#4c635c] uppercase">Compliance Rate</div></div>
                  <div><span className="font-headline text-2xl font-bold text-[#002181]">10</span><div className="font-label text-[9px] text-[#4c635c] uppercase">Audit Dimensions</div></div>
                </div>
              </div>
            </div>
          </section>

          {/* BLUE-IQ SPEND */}
          <section className="py-24 border-b-[0.5px] border-[#bfc9c4]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-[#002181] text-2xl">visibility</span>
                  <span className="font-label text-[10px] tracking-[0.2em] text-[#002181] uppercase">Real-time Visibility</span>
                </div>
                <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-[#1a1c1d] mb-3">
                  BLUE-IQ <span className="text-[#002181]">SPEND</span>
                </h2>
                <p className="font-headline text-lg font-semibold text-[#002181] mb-4">See Every Dollar.</p>
                <p className="font-body text-[#3f4945] leading-relaxed mb-5">
                  Real-time visibility of SOW and contingent workforce spend with consolidated visibility, 
                  overspend identification, forecasting, and executive dashboards. Blue-IQ Spend integrates 
                  contracts, rate cards, invoices, and vendor data, offering real-time insights that highlight 
                  overspend, duplication, and financial risks.
                </p>
                <div className="border-l-[2px] border-[#002181] pl-4 py-2">
                  <p className="font-label text-xs text-[#1a1c1d]">Gain total visibility, enhance forecasting, and streamline your procurement process with a single source of truth.</p>
                </div>
              </div>
              <div className="bg-[#1a1c1d] p-8 relative min-h-[280px] border-[0.5px] border-[#bfc9c4]">
                <div className="absolute inset-0 blueprint-grid opacity-10"></div>
                <div className="text-center relative z-10 py-8">
                  <span className="material-symbols-outlined text-4xl text-white/50 mb-3">monitoring</span>
                  <p className="font-label text-white/60 text-xs uppercase tracking-wider">Consolidated visibility · Overspend alerts · Executive dashboards</p>
                </div>
              </div>
            </div>
          </section>

          {/* What You Gain Section */}
          <section className="py-24 border-b-[0.5px] border-[#bfc9c4]">
            <div className="flex justify-between items-baseline mb-12 border-b-[0.5px] border-[#bfc9c4] pb-6">
              <h2 className="font-headline text-3xl font-bold uppercase tracking-tight">What You Gain</h2>
              <span className="font-label text-xs tracking-widest text-[#4c635c] uppercase">Value Drivers</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border-[0.5px] border-[#bfc9c4]">
              <div className="p-6 border-r-[0.5px] border-[#bfc9c4]">
                <span className="material-symbols-outlined text-2xl text-[#002181] mb-3">trending_down</span>
                <h3 className="font-headline font-bold text-base uppercase mb-2">Cost Optimization</h3>
                <p className="font-body text-xs text-[#3f4945]">Reduce leakage, eliminate duplicates, improve rate consistency, strengthen forecasting.</p>
              </div>
              <div className="p-6 border-r-[0.5px] border-[#bfc9c4]">
                <span className="material-symbols-outlined text-2xl text-[#002181] mb-3">shield</span>
                <h3 className="font-headline font-bold text-base uppercase mb-2">Risk Reduction</h3>
                <p className="font-body text-xs text-[#3f4945]">Prevent unclear SOWs, improve compliance, reduce exposure, enhance audit readiness.</p>
              </div>
              <div className="p-6 border-r-[0.5px] border-[#bfc9c4]">
                <span className="material-symbols-outlined text-2xl text-[#002181] mb-3">bolt</span>
                <h3 className="font-headline font-bold text-base uppercase mb-2">Operational Efficiency</h3>
                <p className="font-body text-xs text-[#3f4945]">Accelerate procurement and hiring, standardize governance, automate reviews.</p>
              </div>
              <div className="p-6">
                <span className="material-symbols-outlined text-2xl text-[#002181] mb-3">insights</span>
                <h3 className="font-headline font-bold text-base uppercase mb-2">Strategic Visibility</h3>
                <p className="font-body text-xs text-[#3f4945]">Real-time insights, clear performance profiles, data-driven decisions, executive reporting.</p>
              </div>
            </div>
          </section>

          {/* Trusted Companies */}
          <section className="py-24 border-b-[0.5px] border-[#bfc9c4]">
            <div className="flex justify-between items-baseline mb-12 border-b-[0.5px] border-[#bfc9c4] pb-6">
              <h2 className="font-headline text-3xl font-bold uppercase tracking-tight">Trusted By</h2>
              <span className="font-label text-xs tracking-widest text-[#4c635c] uppercase">Industry Leaders</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {["FORTUNE 500", "GLOBAL TECH", "FINANCIAL", "HEALTHCARE", "MANUFACTURING", "ENERGY"].map((company, i) => (
                <div key={i} className="border-[0.5px] border-[#bfc9c4] p-4 text-center hover:bg-[#eeeef0] transition">
                  <span className="font-headline text-xs font-bold text-[#4c635c] uppercase tracking-wider">{company}</span>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center border-t-[0.5px] border-[#bfc9c4] pt-8">
              <p className="font-body text-xs text-[#4c635c]">Join 500+ enterprises managing over $10B in SOW and contingent workforce spend</p>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-24 border-b-[0.5px] border-[#bfc9c4]">
            <div className="flex justify-between items-baseline mb-12 border-b-[0.5px] border-[#bfc9c4] pb-6">
              <h2 className="font-headline text-3xl font-bold uppercase tracking-tight">Testimonials</h2>
              <span className="font-label text-xs tracking-widest text-[#4c635c] uppercase">Client Stories</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-[0.5px] border-[#bfc9c4]">
              <div className="p-8 border-r-[0.5px] border-b-[0.5px] md:border-b-0 border-[#bfc9c4]">
                <div className="flex gap-1 mb-4"><span className="text-[#002181] text-lg">★★★★★</span></div>
                <p className="font-body text-[#1a1c1d] text-sm leading-relaxed mb-5">"Blue-IQ transformed how we manage our vendor ecosystem. We've reduced overspend by 45% and cut SOW review time by 70%."</p>
                <p className="font-headline font-bold text-sm">Sarah Chen</p>
                <p className="font-label text-[10px] text-[#4c635c]">VP of Procurement, Global Tech</p>
              </div>
              <div className="p-8 border-r-[0.5px] md:border-r-0 border-[#bfc9c4]">
                <div className="flex gap-1 mb-4"><span className="text-[#002181] text-lg">★★★★★</span></div>
                <p className="font-body text-[#1a1c1d] text-sm leading-relaxed mb-5">"The 10-dimension SOW audit is a game-changer. We caught compliance issues that would have cost us millions."</p>
                <p className="font-headline font-bold text-sm">Michael Rodriguez</p>
                <p className="font-label text-[10px] text-[#4c635c]">Director of Operations, Financial Services</p>
              </div>
              <div className="p-8 border-r-[0.5px] border-t-[0.5px] md:border-t-0 border-[#bfc9c4]">
                <div className="flex gap-1 mb-4"><span className="text-[#002181] text-lg">★★★★★</span></div>
                <p className="font-body text-[#1a1c1d] text-sm leading-relaxed mb-5">"Finally, a platform that gives us real visibility into contingent workforce spend. The dashboards are invaluable."</p>
                <p className="font-headline font-bold text-sm">Jennifer Walsh</p>
                <p className="font-label text-[10px] text-[#4c635c]">Head of Talent Acquisition, Healthcare</p>
              </div>
              <div className="p-8 border-t-[0.5px] md:border-t-0 border-[#bfc9c4]">
                <div className="flex gap-1 mb-4"><span className="text-[#002181] text-lg">★★★★★</span></div>
                <p className="font-body text-[#1a1c1d] text-sm leading-relaxed mb-5">"Implementation was seamless and the ROI was evident within the first quarter. Highly recommend."</p>
                <p className="font-headline font-bold text-sm">David Kim</p>
                <p className="font-label text-[10px] text-[#4c635c]">CFO, Manufacturing Corp</p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-24 border-b-[0.5px] border-[#bfc9c4]">
            <div className="flex justify-between items-baseline mb-12 border-b-[0.5px] border-[#bfc9c4] pb-6">
              <h2 className="font-headline text-3xl font-bold uppercase tracking-tight">FAQ</h2>
              <span className="font-label text-xs tracking-widest text-[#4c635c] uppercase">Common Questions</span>
            </div>
            <div className="border-[0.5px] border-[#bfc9c4] divide-y-[0.5px] divide-[#bfc9c4]">
              {[
                { q: "How does Blue-IQ differ from traditional VMS/ATS?", a: "Traditional systems track workflow. Blue-IQ delivers intelligence—AI-powered insights, predictive analytics, and proactive risk mitigation across the entire vendor lifecycle." },
                { q: "What is the 10-dimension SOW Audit Rubric?", a: "Our proprietary framework evaluates SOWs across 10 critical dimensions including clarity, enforceability, compliance, pricing, IP, termination, SLAs, and risk exposure." },
                { q: "How quickly can we implement Blue-IQ?", a: "Most enterprise implementations are completed within 4-6 weeks with our dedicated onboarding team ensuring seamless integration with existing systems." },
                { q: "What kind of ROI can we expect?", a: "Clients typically see 15-30% reduction in SOW spend leakage and 40-60% faster hiring cycles within the first quarter." },
                { q: "Is Blue-IQ SOC 2 compliant?", a: "Yes, we maintain SOC 2 Type II certification with enterprise-grade security protocols across all data processing." }
              ].map((faq, i) => (
                <details key={i} className="group">
                  <summary className="flex justify-between items-center cursor-pointer p-5 font-headline font-semibold text-sm text-[#1a1c1d] hover:bg-[#eeeef0] transition">
                    {faq.q}
                    <span className="material-symbols-outlined text-[#002181] text-base group-open:rotate-180 transition-transform">expand_more</span>
                  </summary>
                  <div className="p-5 pt-0 border-t-[0.5px] border-[#bfc9c4]">
                    <p className="font-body text-xs text-[#3f4945]">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Intelligence Ecosystem Summary */}
          <section className="py-24 border-b-[0.5px] border-[#bfc9c4]">
            <div className="border-[0.5px] border-[#002181] p-12 relative">
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#002181]"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#002181]"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[#002181]"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#002181]"></div>
              <div className="text-center mb-8">
                <h2 className="font-headline text-2xl md:text-3xl font-bold tracking-tight">Complete Intelligence Ecosystem</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center"><span className="material-symbols-outlined text-3xl text-[#002181] mb-2">approval</span><h3 className="font-headline font-bold text-lg">HIRE</h3><p className="font-label text-[10px] text-[#4c635c]">Validates before work begins</p></div>
                <div className="text-center border-x-[0.5px] border-[#bfc9c4]"><span className="material-symbols-outlined text-3xl text-[#002181] mb-2">gavel</span><h3 className="font-headline font-bold text-lg">GOVERN</h3><p className="font-label text-[10px] text-[#4c635c]">Ensures compliance as contracted</p></div>
                <div className="text-center"><span className="material-symbols-outlined text-3xl text-[#002181] mb-2">payments</span><h3 className="font-headline font-bold text-lg">SPEND</h3><p className="font-label text-[10px] text-[#4c635c]">Ensures visibility as delivered</p></div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-24">
            <div className="border-[0.5px] border-[#002181] p-12 md:p-16 text-center relative">
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#002181]"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#002181]"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#002181]"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#002181]"></div>
              <h2 className="font-headline text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4">Ready to Move from Workflow to Intelligence?</h2>
              <p className="font-body text-[#3f4945] max-w-xl mx-auto text-sm mb-8">Join enterprises that use Blue-IQ to govern billions in SOW and contingent workforce spend.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-[#002181] text-white px-8 py-3 font-label text-xs font-bold tracking-[0.2em] transition-all hover:bg-[#0032b6]">REQUEST PLATFORM DEMO</button>
                <button className="border-[0.5px] border-[#707975] text-[#1a1c1d] px-8 py-3 font-label text-xs font-bold tracking-[0.2em] hover:bg-[#eeeef0] transition-all">TALK TO AN EXPERT</button>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t-[0.5px] border-slate-200 bg-[#f9f9fb]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 border-l-[0.5px] border-r-[0.5px] border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8 py-16">
            <div className="flex flex-col gap-4">
              <div className="text-base font-bold text-slate-900 font-headline uppercase">BLUE-IQ</div>
              <p className="font-headline text-[9px] uppercase tracking-widest font-medium text-[#4c635c]">The intelligence layer for workforce, vendors, and services operations.</p>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-label text-[9px] uppercase tracking-[0.3em] font-bold text-[#002181]">PLATFORM</span>
              <a className="font-headline text-[9px] uppercase tracking-widest text-slate-500 hover:text-[#002181] transition-colors" href="#">HIRE</a>
              <a className="font-headline text-[9px] uppercase tracking-widest text-slate-500 hover:text-[#002181] transition-colors" href="#">GOVERN</a>
              <a className="font-headline text-[9px] uppercase tracking-widest text-slate-500 hover:text-[#002181] transition-colors" href="#">SPEND</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-label text-[9px] uppercase tracking-[0.3em] font-bold text-[#002181]">RESOURCES</span>
              <a className="font-headline text-[9px] uppercase tracking-widest text-slate-500 hover:text-[#002181] transition-colors" href="#">DOCUMENTATION</a>
              <a className="font-headline text-[9px] uppercase tracking-widest text-slate-500 hover:text-[#002181] transition-colors" href="#">API REFERENCE</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-label text-[9px] uppercase tracking-[0.3em] font-bold text-[#002181]">CONTACT</span>
              <a className="font-headline text-[9px] uppercase tracking-widest text-slate-500 hover:text-[#002181] transition-colors" href="#">HELLO@BLUE-IQ.COM</a>
            </div>
          </div>
          <div className="px-8 py-6 border-t-[0.5px] border-slate-200">
            <p className="font-headline text-[9px] uppercase tracking-widest font-medium text-[#4c635c]">© 2025 BLUE-IQ. THE INTELLIGENCE LAYER. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@400;500;600&display=swap');
        
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
          font-family: 'Material Symbols Outlined';
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          display: inline-block;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          -webkit-font-smoothing: antialiased;
        }
        
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        
        .blueprint-grid {
          background-image: linear-gradient(to right, #bfc9c4 0.5px, transparent 0.5px),
                            linear-gradient(to bottom, #bfc9c4 0.5px, transparent 0.5px);
          background-size: 40px 40px;
        }
        
        .font-headline {
          font-family: 'Space Grotesk', sans-serif;
        }
        
        .font-body {
          font-family: 'Inter', sans-serif;
        }
        
        .font-label {
          font-family: 'Space Grotesk', sans-serif;
        }
        
        details summary {
          list-style: none;
        }
        
        details summary::-webkit-details-marker {
          display: none;
        }
      `}</style>
    </>
  );
}