"use client";
import Link from 'next/link';

import React, { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

const logo = '/assets/logo.png';
const leaf1 = '/assets/leaf1.png';
const leaf2 = '/assets/leaf2.png';
const leaf3 = '/assets/leaf3.png';
const leaf4 = '/assets/leaf4.png';

gsap.registerPlugin(ScrollTrigger);

export default function PricingPage() {
  const containerRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [nutritionGoal, setNutritionGoal] = useState('Maintenance');
  const [mealsPerDay, setMealsPerDay] = useState(3);
  const [calories, setCalories] = useState(1600);
  useEffect(() => {
    // Force scroll to top on mount for Next.js router integration
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.scrollTo(0, { immediate: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useGSAP(() => {
    // Hero Animations
    gsap.fromTo('.hero-title span', 
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power4.out', delay: 0.2 }
    );
    gsap.fromTo('.hero-sub', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.6 }
    );

    gsap.to('.leaf-1', { scrollTrigger: { trigger: '.parallax-sections-wrapper', start: 'top top', end: 'bottom bottom', scrub: 0.8 }, y: () => window.innerHeight * 1.2, x: 100, rotation: 180, ease: 'none' });
    gsap.to('.leaf-2', { scrollTrigger: { trigger: '.parallax-sections-wrapper', start: 'top top', end: 'bottom bottom', scrub: 1.5 }, y: () => window.innerHeight * 0.8, x: -80, rotation: -120, ease: 'none' });
    gsap.to('.leaf-3', { scrollTrigger: { trigger: '.parallax-sections-wrapper', start: 'top top', end: 'bottom bottom', scrub: 0.6 }, y: () => window.innerHeight * 1.1, x: 120, rotation: 240, ease: 'none' });
    gsap.to('.leaf-4', { scrollTrigger: { trigger: '.parallax-sections-wrapper', start: 'top top', end: 'bottom bottom', scrub: 1.2 }, y: () => window.innerHeight * 0.7, x: -100, rotation: -180, ease: 'none' });
  }, { scope: containerRef });

  // Pricing Calculation
  let essentialPrice = 349;
  let signaturePrice = 479;

  // Calorie adjustments (+/- 11 per 100 kcal diff from 1600)
  const calDiff = calories - 1600;
  const calAdjustment = Math.round((calDiff / 100) * 11);
  essentialPrice += calAdjustment;
  signaturePrice += calAdjustment;

  // Meal adjustments
  if (mealsPerDay === 2) {
    essentialPrice -= 30;
    signaturePrice -= 30;
  } else if (mealsPerDay === 4) {
    essentialPrice += 30;
    signaturePrice += 30;
  }

  // Goal adjustments
  if (nutritionGoal === 'Muscle gain') {
    essentialPrice += 20;
    signaturePrice += 20;
  }

  const essentialMonthly = essentialPrice * 30;
  const signatureMonthly = signaturePrice * 30;
  return (
    <div className="app-container min-h-screen bg-[#fdfbf7] flex flex-col font-manrope selection:bg-brand-green/20" ref={containerRef}>
      
      <div className="grain-overlay"></div>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full h-[80px] z-[999] flex items-center transition-all duration-300 premium-glass-nav">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8 flex items-center justify-between h-full">
          <div className="flex-1 flex items-center justify-start h-full">
            <Link href="/" className="flex items-center">
              <img src={logo} alt="Fit Eat" className="h-[40px] w-auto block transition-transform duration-300 hover:scale-105" />
            </Link>
          </div>
          <div className="hidden md:flex flex-initial items-center justify-center gap-10 h-full">
            {['How It Works', 'Pricing', 'About Us', 'Contact'].map(link => {
              let href = `/#${link.toLowerCase().replace(/ /g, '-')}`;
              if (link === 'How It Works') href = '/how-it-works';
              if (link === 'Pricing') href = '/pricing';
              if (link === 'About Us') href = '/about-us';
              if (link === 'Contact') href = '/contact';
              return (
                <Link key={link}
                  href={href}
                  className={`text-xs font-bold tracking-[2px] uppercase transition-colors duration-300 ${
                    link === 'Pricing' ? 'text-brand-green' : 'text-white/70 hover:text-brand-green'
                  }`}
                >{link}</Link>
              );
            })}
          </div>
          <div className="flex-1 flex items-center justify-end h-full">
            <Link href="https://wa.me/yourwhatsapplink" target="_blank" rel="noopener noreferrer">
              <button className="bg-[#3f6b15] hover:bg-[#325611] text-white text-xs font-bold uppercase tracking-[1px] px-5 py-2.5 rounded-full border border-white/5 transition-all duration-300 hover:scale-105 cursor-pointer">
                Apply for Membership
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="parallax-sections-wrapper relative w-full overflow-hidden flex flex-col flex-1">
        <img src={leaf1} alt="Leaf" className="leaf-1 absolute z-10 pointer-events-none will-change-transform" style={{ top: '15vh', left: '5%', width: '70px', opacity: 0.6 }} />
        <img src={leaf2} alt="Leaf" className="leaf-2 absolute z-10 pointer-events-none will-change-transform" style={{ top: '40vh', right: '8%', width: '90px', opacity: 0.5 }} />
        <img src={leaf3} alt="Leaf" className="leaf-3 absolute z-10 pointer-events-none will-change-transform" style={{ top: '70vh', left: '8%', width: '110px', opacity: 0.7 }} />
        <img src={leaf4} alt="Leaf" className="leaf-4 absolute z-10 pointer-events-none will-change-transform" style={{ top: '90vh', right: '12%', width: '80px', opacity: 0.8 }} />

      {/* Hero Section */}
      <section className="w-full pt-[160px] pb-[80px] flex flex-col items-center text-center px-4 relative z-10">
        <h1 className="hero-title font-playfair text-[3.5rem] md:text-[5.5rem] leading-[1.08] font-bold text-brand-dark mb-8 tracking-tight overflow-hidden">
          <span className="block inline-block">Pricing That Fits Your</span>
          <span className="block inline-block text-brand-green font-playfair">Life</span>
        </h1>
        <p className="hero-sub text-lg md:text-[1.3rem] text-gray-500 max-w-[650px] leading-relaxed font-medium">
          No fixed plans. <span className="text-brand-green font-bold">Built around you.</span> Tell us your goals—we'll design your plan and pricing tailored to your exact macros and lifestyle.
        </p>
      </section>

      {/* Pricing Cards Section */}
      <section className="w-full flex-1 bg-[#efebe1] py-[80px] px-4 flex flex-col items-center">
        
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl leading-[1.1] font-bold text-brand-dark mb-4 tracking-tight">
            Two ways to work with us
          </h2>
          <p className="text-gray-500 text-[15px] md:text-base max-w-[600px] mx-auto leading-relaxed">
            Most people start on The Essential. The Signature is for members who want more touchpoints and flexibility — same food quality, more support.
          </p>
        </div>

        <div className="w-full max-w-[1100px] grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Card 1: The Essential */}
          <div className="bg-white rounded-[2.5rem] p-10 flex flex-col shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-shadow duration-300">
            <div className="text-center border-b border-gray-100 pb-8 mb-8">
              <span className="text-[11px] font-bold text-gray-400 tracking-[2px] uppercase block mb-3">
                The Essential
              </span>
              <h3 className="font-playfair text-2xl font-bold text-brand-dark mb-3">
                Monthly membership
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed max-w-[280px] mx-auto mb-8 h-[40px]">
                Starting point for most members — exact price after your consult.
              </p>
              
              <span className="text-[11px] font-bold text-gray-400 tracking-[1px] uppercase block mb-1">
                From
              </span>
              <div className="flex items-start justify-center gap-1 text-brand-dark mb-2">
                <span className="text-xl font-bold mt-1">₹</span>
                <span className="text-5xl font-extrabold tracking-tight">349</span>
                <span className="text-sm text-gray-400 font-medium self-end mb-1.5">/ day</span>
              </div>
              <span className="text-xs text-gray-400">Billed monthly</span>
            </div>

            <div className="flex-1">
              <span className="text-[11px] font-bold text-gray-400 tracking-[1px] uppercase block mb-5">
                What's included
              </span>
              <ul className="flex flex-col gap-4 mb-10">
                {[
                  "Personalized calorie & protein targets",
                  "South Indian home-style meals",
                  "Daily delivery",
                  "WhatsApp support",
                  "Pause anytime"
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-brand-dark flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[14px] text-gray-600 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link href="https://wa.me/yourwhatsapplink" className="w-full">
              <button className="w-full bg-[#1b2f1b] hover:bg-[#152415] text-white font-bold text-sm py-4 rounded-xl transition-colors duration-200">
                Design My Essential Plan
              </button>
            </Link>
          </div>

          {/* Card 2: The Signature */}
          <div className="bg-white rounded-[2.5rem] p-10 flex flex-col shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-shadow duration-300">
            <div className="text-center border-b border-gray-100 pb-8 mb-8">
              <span className="text-[11px] font-bold text-gray-400 tracking-[2px] uppercase block mb-3">
                The Signature
              </span>
              <h3 className="font-playfair text-2xl font-bold text-brand-dark mb-3">
                Higher-touch plan
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed max-w-[280px] mx-auto mb-8 h-[40px]">
                More support and flexibility when you want the extra runway.
              </p>
              
              <span className="text-[11px] font-bold text-gray-400 tracking-[1px] uppercase block mb-1">
                From
              </span>
              <div className="flex items-start justify-center gap-1 text-brand-dark mb-2">
                <span className="text-xl font-bold mt-1">₹</span>
                <span className="text-5xl font-extrabold tracking-tight">479</span>
                <span className="text-sm text-gray-400 font-medium self-end mb-1.5">/ day</span>
              </div>
              <span className="text-xs text-gray-400">Billed monthly</span>
            </div>

            <div className="flex-1">
              <span className="text-[11px] font-bold text-gray-400 tracking-[1px] uppercase block mb-5">
                Everything in Essential, plus
              </span>
              <ul className="flex flex-col gap-4 mb-10">
                {[
                  "Priority WhatsApp support & faster menu tweaks",
                  "Premium protein options & add-on flexibility",
                  "Optional weekly progress check-in"
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-brand-dark flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[14px] text-gray-600 font-medium leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link href="https://wa.me/yourwhatsapplink" className="w-full mt-auto">
              <button className="w-full bg-[#1b2f1b] hover:bg-[#152415] text-white font-bold text-sm py-4 rounded-xl transition-colors duration-200">
                Craft My Signature Plan
              </button>
            </Link>
          </div>

        </div>
      </section>

      {/* Estimate Your Day Rate Calculator */}
      <section className="w-full bg-[#fdfbf7] pb-[100px] px-4 flex flex-col items-center">
        <div className="text-center mb-10">
          <h2 className="font-playfair text-4xl md:text-5xl leading-[1.1] font-bold text-brand-dark mb-4 tracking-tight">
            Estimate your day rate
          </h2>
          <p className="text-gray-500 text-[15px] max-w-[550px] mx-auto leading-relaxed">
            Pick what's closest to your goals. You'll see illustrative Essential and Signature numbers — then we fine-tune on WhatsApp.
          </p>
        </div>

        <div className="w-full max-w-[1100px] bg-white rounded-[2.5rem] p-8 md:p-10 lg:p-12 shadow-[0_15px_40px_rgba(0,0,0,0.03)] border border-gray-50 flex flex-col md:flex-row gap-12">
          
          {/* Left Column (Controls) */}
          <div className="flex-1 flex flex-col gap-10">
            
            {/* Goal Toggle */}
            <div>
              <span className="text-[11px] font-bold text-gray-400 tracking-[1.5px] uppercase block mb-3">Nutrition Goal</span>
              <div className="flex bg-[#f5f2ea] p-1.5 rounded-full">
                {['Fat loss', 'Maintenance', 'Muscle gain'].map(goal => (
                  <button
                    key={goal}
                    onClick={() => setNutritionGoal(goal)}
                    className={`flex-1 text-[13px] font-bold py-3 rounded-full transition-all duration-300 ${nutritionGoal === goal ? 'bg-white text-brand-dark shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>

            {/* Meals Toggle */}
            <div>
              <span className="text-[11px] font-bold text-gray-400 tracking-[1.5px] uppercase block mb-3">Meals Per Day</span>
              <div className="flex bg-[#f5f2ea] p-1.5 rounded-full">
                {[2, 3, 4].map(meals => (
                  <button
                    key={meals}
                    onClick={() => setMealsPerDay(meals)}
                    className={`flex-1 text-[13px] font-bold py-3 rounded-full transition-all duration-300 ${mealsPerDay === meals ? 'bg-[#76c117] text-white shadow-[0_4px_12px_rgba(118,193,23,0.3)]' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    {meals} Meals
                  </button>
                ))}
              </div>
            </div>

            {/* Calories Slider */}
            <div>
              <div className="flex justify-between items-end mb-5">
                <span className="text-[11px] font-bold text-gray-400 tracking-[1.5px] uppercase">Daily Calorie Target</span>
                <div className="text-[22px] font-extrabold text-brand-dark leading-none">
                  {calories} <span className="text-[11px] text-gray-400 font-bold uppercase tracking-[1px] ml-1">kcal</span>
                </div>
              </div>
              <div className="relative w-full h-2.5 bg-[#e8e4d9] rounded-full mb-3 cursor-pointer">
                <div 
                  className="absolute top-0 left-0 h-full bg-[#1b2f1b] rounded-full" 
                  style={{ width: `${((calories - 1200) / 1000) * 100}%` }}
                ></div>
                <input
                  type="range"
                  min="1200"
                  max="2200"
                  step="50"
                  value={calories}
                  onChange={(e) => setCalories(Number(e.target.value))}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
                <div 
                  className="absolute top-1/2 -mt-3 w-6 h-6 bg-[#1b2f1b] border-[4px] border-[#fdfbf7] rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.15)] pointer-events-none transition-transform z-10"
                  style={{ left: `calc(${((calories - 1200) / 1000) * 100}% - 12px)` }}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-[2px]">
                <span>1200 Min</span>
                <span>2200 Max</span>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-[#fdfbf7] border border-gray-100 rounded-2xl p-6">
              <span className="text-[10px] font-bold text-gray-400 tracking-[1.5px] uppercase block mb-4">How this estimate moves</span>
              <ul className="flex flex-col gap-3 text-[13px] text-gray-500 font-medium">
                <li className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                  <p><strong className="text-brand-dark">Calories:</strong> each ~100 kcal variance shifts the day rate by about ₹11.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                  <p><strong className="text-brand-dark">Meals:</strong> fewer deliveries lowers cost; 4 meals adds prep and delivery load.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                  <p><strong className="text-brand-dark">Goal:</strong> muscle-gain requires more dense protein sourcing.</p>
                </li>
              </ul>
            </div>

          </div>

          {/* Right Column (Results) */}
          <div className="md:w-[300px] flex flex-col gap-5">
            
            {/* Blueprint Summary */}
            <div className="bg-[#f8f6f0] rounded-[1.5rem] p-6">
              <span className="text-[11px] font-bold text-gray-400 tracking-[1.5px] uppercase block mb-5">Your Blueprint</span>
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-[12px] text-gray-400 font-bold">Goal</span>
                <span className="text-[13px] text-brand-dark font-bold">{nutritionGoal}</span>
              </div>
              
              <div className="flex justify-between items-center mb-4 border-t border-gray-200/60 pt-4">
                <span className="text-[12px] text-gray-400 font-bold">Meals / day</span>
                <span className="text-[13px] text-brand-dark font-bold">{mealsPerDay}</span>
              </div>
              
              <div className="flex justify-between items-center border-t border-gray-200/60 pt-4">
                <span className="text-[12px] text-gray-400 font-bold">Calorie target</span>
                <span className="text-[13px] text-brand-dark font-bold">{calories} kcal</span>
              </div>
            </div>

            {/* Essential Estimate */}
            <div className="border border-gray-100 rounded-[1.5rem] p-6 text-center shadow-[0_4px_20px_rgba(0,0,0,0.015)]">
              <span className="text-[11px] font-bold text-brand-dark tracking-[2px] uppercase block mb-3">The Essential</span>
              <div className="flex items-start justify-center gap-1 text-brand-dark mb-1">
                <span className="text-[16px] font-bold mt-2 text-gray-400">₹</span>
                <span className="text-[44px] leading-none font-extrabold tracking-tight">{essentialPrice}</span>
                <span className="text-xs text-gray-400 font-bold self-end mb-2">/ day</span>
              </div>
              <span className="text-[12px] text-gray-400 font-bold">~₹{essentialMonthly.toLocaleString()} / mo</span>
            </div>

            {/* Signature Estimate */}
            <div className="bg-[#1b2f1b] rounded-[1.5rem] p-6 text-center shadow-[0_10px_30px_rgba(27,47,27,0.2)]">
              <span className="text-[11px] font-bold text-[#8fb88f] tracking-[2px] uppercase block mb-3">The Signature</span>
              <div className="flex items-start justify-center gap-1 text-white mb-1">
                <span className="text-[16px] font-bold mt-2 text-[#8fb88f]">₹</span>
                <span className="text-[44px] leading-none font-extrabold tracking-tight">{signaturePrice}</span>
                <span className="text-xs text-[#8fb88f] font-bold self-end mb-2">/ day</span>
              </div>
              <span className="text-[12px] text-[#8fb88f] font-bold">~₹{signatureMonthly.toLocaleString()} / mo</span>
            </div>

          </div>

        </div>
        
        <p className="text-[12px] text-gray-400 font-medium mt-8 text-center max-w-[400px]">
          Illustrative estimates only. Final quotes are confirmed during your consult.
        </p>
      </section>
      </div>

      {/* Floating Sticky WhatsApp Widget */}
      <Link
        href="https://wa.me/yourwhatsapplink"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25d366] hover:bg-[#20ba5a] text-white rounded-full shadow-[0_4px_15px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 active:scale-95 group"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
          <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.459 3.477 1.332 4.992L2 22l5.168-1.357c1.474.805 3.129 1.229 4.832 1.229h.01c5.506 0 9.988-4.482 9.988-9.988 0-2.663-1.037-5.167-2.92-7.053C17.18 3.037 14.675 2 12.012 2zm5.727 14.18c-.234.66-.69 1.155-1.282 1.458-.456.234-1.026.398-2.61-.258-2.18-.903-3.666-3.08-3.774-3.228-.108-.147-.887-1.178-.887-2.263 0-1.085.57-1.616.774-1.83.204-.213.447-.267.597-.267.15 0 .3 0 .432.006.138.006.324-.054.51.396.192.468.654 1.596.714 1.716.06.12.1.258.018.42-.084.162-.126.258-.252.408-.126.15-.264.336-.378.462-.114.126-.234.264-.102.492.132.228.588.966 1.26 1.566.864.774 1.596 1.014 1.824 1.122.228.108.36.09.492-.06.132-.15.57-.666.72-.9.15-.234.3-.198.51-.12.21.078 1.332.63 1.56.744.228.114.378.168.432.264.054.096.054.558-.18 1.218z" />
        </svg>
      </Link>

    </div>
  );
}
