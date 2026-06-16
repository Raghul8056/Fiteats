'use client';
import Link from 'next/link';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const logo = '/assets/logo.png';
const leaf1 = '/assets/leaf1.png';
const leaf2 = '/assets/leaf2.png';
const leaf3 = '/assets/leaf3.png';
const leaf4 = '/assets/leaf4.png';
const editedVideo = '/assets/edited.mp4';

const faqs = [
  {
    question: 'Where do you currently deliver?',
    answer: 'We currently deliver across all major zones in Chennai. Delivery availability is confirmed during your consultation.'
  },
  {
    question: 'How does pricing and membership work?',
    answer: 'Pricing is tailored based on your daily calorie requirements and the tier you choose (Essential or Signature). Memberships are billed monthly.'
  },
  {
    question: 'Can I pause or cancel my meal plan?',
    answer: 'Yes, you can pause your subscription with 48 hours notice. Cancellations require a 7-day notice before your next billing cycle.'
  },
  {
    question: 'How are dietary restrictions handled?',
    answer: 'We customize every meal plan. Please specify allergies and preferences in the form above, and our nutritionists will accommodate them.'
  },
  {
    question: 'How quickly will I receive a response?',
    answer: 'Our team reviews all applications within 24 hours. For immediate assistance, feel free to use the WhatsApp button to chat with us directly.'
  },
  {
    question: 'What\'s the difference between Standard and Premium plans?',
    answer: 'The Essential plan covers your baseline macros with high-quality ingredients. The Signature plan includes exotic proteins, premium superfoods, and higher menu variety.'
  }
];

export default function ContactPage() {
  const containerRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    // Force scroll to top on mount for Next.js router integration
    window.scrollTo(0, 0);

    const lenis = new Lenis({ 
      duration: 1.5, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true 
    });

    lenis.scrollTo(0, { immediate: true });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
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

    // Parallax Leaves
    gsap.to('.leaf-1', { scrollTrigger: { trigger: '.parallax-wrapper', start: 'top top', end: 'bottom top', scrub: 0.8 }, y: () => window.innerHeight * 0.8, x: 100, rotation: 180, ease: 'none' });
    gsap.to('.leaf-2', { scrollTrigger: { trigger: '.parallax-wrapper', start: 'top top', end: 'bottom top', scrub: 1.5 }, y: () => window.innerHeight * 0.5, x: -80, rotation: -120, ease: 'none' });
    gsap.to('.leaf-3', { scrollTrigger: { trigger: '.parallax-wrapper', start: 'top top', end: 'bottom top', scrub: 0.6 }, y: () => window.innerHeight * 0.9, x: 120, rotation: 240, ease: 'none' });
    gsap.to('.leaf-4', { scrollTrigger: { trigger: '.parallax-wrapper', start: 'top top', end: 'bottom top', scrub: 1.2 }, y: () => window.innerHeight * 0.4, x: -100, rotation: -180, ease: 'none' });

    // Scroll Reveals
    gsap.utils.toArray<HTMLElement>('.reveal-up').forEach(el => {
      gsap.fromTo(el, 
        { y: 50, opacity: 0 },
        { scrollTrigger: { trigger: el, start: 'top 85%' }, y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    });

    gsap.fromTo('.faq-item', 
      { y: 30, opacity: 0 },
      { scrollTrigger: { trigger: '.faq-section', start: 'top 80%' }, y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
    );

  }, { scope: containerRef });

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="app-container bg-white min-h-screen relative font-manrope selection:bg-[#1E4D2B]/20 text-[#1E4D2B]" ref={containerRef}>
      
      {/* Background Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* Floating Orbs (Optimized) */}
      <div className="fixed top-[-10%] left-[-10%] w-[30vw] h-[30vw] rounded-full bg-[#1E4D2B]/8 blur-[60px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[25vw] h-[25vw] rounded-full bg-[#1E4D2B]/12 blur-[60px] pointer-events-none z-0"></div>

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
                    link === 'Contact' ? 'text-brand-green' : 'text-white/70 hover:text-brand-green'
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

      <div className="parallax-wrapper relative w-full overflow-hidden flex flex-col pt-[160px] pb-[100px] z-10">
        
        {/* Parallax Elements */}
        <img src={leaf1} alt="Leaf" className="leaf-1 absolute pointer-events-none will-change-transform z-0 filter contrast-125 saturate-50" style={{ top: '15vh', left: '10%', width: '70px', opacity: 1 }} />
        <img src={leaf2} alt="Leaf" className="leaf-2 absolute pointer-events-none will-change-transform z-0 filter contrast-125 saturate-50" style={{ top: '30vh', right: '15%', width: '90px', opacity: 1 }} />
        <img src={leaf3} alt="Leaf" className="leaf-3 absolute pointer-events-none will-change-transform z-0 filter contrast-125 saturate-50" style={{ top: '80vh', left: '5%', width: '110px', opacity: 1 }} />
        
        {/* Hero Section */}
        <section className="w-full max-w-[900px] mx-auto text-center px-6 mb-20 relative z-10">
          <h1 className="hero-title font-playfair text-5xl md:text-7xl lg:text-[6rem] leading-[1.05] font-bold tracking-tight mb-8 overflow-hidden text-black">
            <span className="block inline-block">Tell us what you're</span>
            <span className="block inline-block">hungry for—literally</span>
            <span className="block inline-block text-brand-green">and figuratively.</span>
          </h1>
          <p className="hero-sub text-lg md:text-xl text-[#2f7543] max-w-[700px] mx-auto leading-relaxed">
            Quotes, allergies, delivery locations in Chennai, meal customization requests, or partnership opportunities—reach out through the form below or contact us directly.
          </p>
        </section>

        {/* Two Column Layout */}
        <section className="w-full max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 relative z-10 mb-32">
          
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            
            {/* Feature Card */}
            <div className="reveal-up relative overflow-hidden rounded-[24px] bg-[#EBE5D9] h-[400px] flex flex-col justify-end p-8 shadow-[0_10px_40px_rgba(30,77,43,0.05)] group">
              {/* Placeholder image background */}
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60 mix-blend-multiply" style={{ backgroundImage: 'url("/right_h.png")' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#EBE5D9] via-[#EBE5D9]/80 to-transparent"></div>
              
              <div className="relative z-10">
                <h3 className="font-playfair text-3xl font-bold mb-3 leading-tight text-black">Same-day reads,<br/>human replies.</h3>
                <p className="text-[#1E4D2B]/70 font-medium text-sm leading-relaxed max-w-[280px]">
                  No ticket numbers—just real people helping you reach your fitness goals faster.
                </p>
              </div>
            </div>

            {/* Info Card */}
            <div className="reveal-up rounded-[24px] bg-white p-8 shadow-[0_10px_40px_rgba(30,77,43,0.05)] flex flex-col gap-6 border border-[#1E4D2B]/5">
              
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-[#F5F1E8] flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110">
                  <svg className="w-5 h-5 text-[#1E4D2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[1.5px] font-bold text-[#1E4D2B]/50 block mb-1">Email</span>
                  <Link href="mailto:hello@fiteats.com" className="text-lg font-bold text-black hover:text-[#2f7543] transition-colors">hello@fiteats.com</Link>
                </div>
              </div>

              <div className="w-full h-[1px] bg-[#1E4D2B]/5"></div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-[#F5F1E8] flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110">
                  <svg className="w-5 h-5 text-[#1E4D2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[1.5px] font-bold text-[#1E4D2B]/50 block mb-1">Working Hours</span>
                  <div className="flex flex-col gap-1 text-sm font-semibold text-black">
                    <p>Mon – Fri : 9 AM – 7 PM</p>
                    <p>Weekends : 10 AM – 4 PM</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Quick Links Card */}
            <div className="reveal-up rounded-[24px] bg-[#1E4D2B] text-white p-8 shadow-[0_15px_40px_rgba(30,77,43,0.15)] flex flex-col gap-4">
              <span className="text-[10px] uppercase tracking-[2px] font-bold text-white/50 block">Quick Links</span>
              <div className="flex flex-wrap gap-3">
                {['Pricing', 'FAQ', 'Membership Plans'].map(link => (
                  <Link key={link} href={`/#${link.toLowerCase().replace(/ /g, '-')}`} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                    {link}
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Form */}
          <div className="reveal-up bg-white rounded-[24px] p-8 md:p-10 shadow-[0_10px_40px_rgba(30,77,43,0.05)] border border-[#1E4D2B]/5 h-fit">
            
            <div className="mb-8">
              <h2 className="font-playfair text-3xl font-bold mb-3 text-black">Apply for Membership</h2>
              <p className="text-sm text-[#1E4D2B]/70 leading-relaxed">
                We review every application within 24 hours. Need assistance sooner? Contact us through WhatsApp after submission.
              </p>
            </div>

            <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
              
              {/* Inputs */}
              <div className="group">
                <label className="text-[11px] uppercase tracking-[1px] font-bold text-[#1E4D2B]/60 block mb-2">Full Name</label>
                <input type="text" placeholder="Your full name" className="w-full bg-[#F5F1E8]/50 border border-[#1E4D2B]/10 rounded-[12px] px-4 py-3 text-sm focus:outline-none focus:border-[#1E4D2B]/30 focus:bg-white transition-all hover:-translate-y-[2px]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="group">
                  <label className="text-[11px] uppercase tracking-[1px] font-bold text-[#1E4D2B]/60 block mb-2">Email Address</label>
                  <input type="email" placeholder="you@example.com" className="w-full bg-[#F5F1E8]/50 border border-[#1E4D2B]/10 rounded-[12px] px-4 py-3 text-sm focus:outline-none focus:border-[#1E4D2B]/30 focus:bg-white transition-all hover:-translate-y-[2px]" />
                </div>
                <div className="group">
                  <label className="text-[11px] uppercase tracking-[1px] font-bold text-[#1E4D2B]/60 block mb-2">Phone Number</label>
                  <input type="tel" placeholder="+91 98765 43210" className="w-full bg-[#F5F1E8]/50 border border-[#1E4D2B]/10 rounded-[12px] px-4 py-3 text-sm focus:outline-none focus:border-[#1E4D2B]/30 focus:bg-white transition-all hover:-translate-y-[2px]" />
                </div>
              </div>

              <div className="group">
                <label className="text-[11px] uppercase tracking-[1px] font-bold text-[#1E4D2B]/60 block mb-2">Fitness Goal</label>
                <div className="relative">
                  <select defaultValue="" className="w-full appearance-none bg-[#F5F1E8]/50 border border-[#1E4D2B]/10 rounded-[12px] px-4 py-3 text-sm focus:outline-none focus:border-[#1E4D2B]/30 focus:bg-white transition-all hover:-translate-y-[2px] cursor-pointer text-[#1E4D2B]">
                    <option value="" disabled>Select your goal</option>
                    <option value="weight_loss">Weight Loss</option>
                    <option value="muscle_gain">Muscle Gain</option>
                    <option value="fat_loss">Fat Loss</option>
                    <option value="general_wellness">General Wellness</option>
                    <option value="athletic_performance">Athletic Performance</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-[#1E4D2B]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div className="group">
                <label className="text-[11px] uppercase tracking-[1px] font-bold text-[#1E4D2B]/60 block mb-2">Delivery Location</label>
                <input type="text" placeholder="Enter your delivery location" className="w-full bg-[#F5F1E8]/50 border border-[#1E4D2B]/10 rounded-[12px] px-4 py-3 text-sm focus:outline-none focus:border-[#1E4D2B]/30 focus:bg-white transition-all hover:-translate-y-[2px]" />
              </div>

              <div className="group">
                <label className="text-[11px] uppercase tracking-[1px] font-bold text-[#1E4D2B]/60 block mb-2">Message</label>
                <textarea rows={4} placeholder="Tell us about your goals, dietary preferences, allergies, and delivery requirements." className="w-full bg-[#F5F1E8]/50 border border-[#1E4D2B]/10 rounded-[12px] px-4 py-3 text-sm focus:outline-none focus:border-[#1E4D2B]/30 focus:bg-white transition-all hover:-translate-y-[2px] resize-none"></textarea>
              </div>

              <div className="flex flex-col gap-3 mt-4">
                <button type="submit" className="w-full bg-[#1E4D2B] text-white font-bold text-sm tracking-[1px] uppercase py-4 rounded-[12px] transition-all duration-300 hover:bg-[#15381f] hover:shadow-[0_8px_20px_rgba(30,77,43,0.3)] hover:-translate-y-1 flex justify-center items-center gap-2 group/btn">
                  Submit Application
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
                
                <Link href="https://wa.me/yourwhatsapplink" target="_blank" rel="noopener noreferrer" className="w-full bg-[#25d366]/10 text-[#1E4D2B] border border-[#25d366]/20 font-bold text-sm tracking-[0.5px] py-4 rounded-[12px] transition-all duration-300 hover:bg-[#25d366] hover:text-white hover:shadow-[0_8px_20px_rgba(37,211,102,0.3)] hover:-translate-y-1 flex justify-center items-center gap-2 group/wa">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.459 3.477 1.332 4.992L2 22l5.168-1.357c1.474.805 3.129 1.229 4.832 1.229h.01c5.506 0 9.988-4.482 9.988-9.988 0-2.663-1.037-5.167-2.92-7.053C17.18 3.037 14.675 2 12.012 2zm5.727 14.18c-.234.66-.69 1.155-1.282 1.458-.456.234-1.026.398-2.61-.258-2.18-.903-3.666-3.08-3.774-3.228-.108-.147-.887-1.178-.887-2.263 0-1.085.57-1.616.774-1.83.204-.213.447-.267.597-.267.15 0 .3 0 .432.006.138.006.324-.054.51.396.192.468.654 1.596.714 1.716.06.12.1.258.018.42-.084.162-.126.258-.252.408-.126.15-.264.336-.378.462-.114.126-.234.264-.102.492.132.228.588.966 1.26 1.566.864.774 1.596 1.014 1.824 1.122.228.108.36.09.492-.06.132-.15.57-.666.72-.9.15-.234.3-.198.51-.12.21.078 1.332.63 1.56.744.228.114.378.168.432.264.054.096.054.558-.18 1.218z" /></svg>
                  Chat on WhatsApp
                </Link>
              </div>

            </form>
          </div>

        </section>

        {/* FAQ Section */}
        <section className="faq-section w-full max-w-[800px] mx-auto px-6 mb-20 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-5xl md:text-7xl lg:text-[6rem] font-bold mb-3 text-brand-green">Frequently Asked Questions</h2>
            <p className="text-lg md:text-xl text-[#1E4D2B]/70 leading-relaxed">Quick answers before reaching out.</p>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item border border-[#1E4D2B]/10 rounded-[16px] overflow-hidden bg-white/50 transition-all duration-300 hover:bg-white ${openFaq === index ? 'bg-white shadow-[0_8px_30px_rgba(30,77,43,0.06)] border-[#1E4D2B]/20' : ''}`}
              >
                <button 
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-bold text-sm flex items-center gap-4">
                    <span className="text-[10px] text-[#1E4D2B]/40 font-mono">0{index + 1}</span>
                    {faq.question}
                  </span>
                  <div className={`w-6 h-6 rounded-full border border-[#1E4D2B]/20 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180 bg-[#1E4D2B] border-[#1E4D2B]' : ''}`}>
                    <svg className={`w-3 h-3 transition-colors duration-300 ${openFaq === index ? 'text-white' : 'text-[#1E4D2B]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {openFaq === index ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      )}
                    </svg>
                  </div>
                </button>
                <div 
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{ maxHeight: openFaq === index ? '200px' : '0px', opacity: openFaq === index ? 1 : 0 }}
                >
                  <div className="px-6 pb-6 pt-0 text-sm text-[#1E4D2B]/70 leading-relaxed ml-[32px]">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* ═══════════════════════════════════════ */}
      {/* CTA — Video background (homepage) */}
      {/* ═══════════════════════════════════════ */}
      <section className="cta-section relative w-full min-h-[85vh] flex flex-col items-center justify-center overflow-hidden py-24 px-4 text-center">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <video autoPlay loop muted playsInline className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover opacity-70">
            <source src={editedVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b1409]/95 via-[#0b1409]/60 to-[#0b1409]/95"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,#0b1409_85%)] opacity-90"></div>
        </div>
        <div className="relative z-10 w-full max-w-[900px] flex flex-col items-center justify-center">
          <h2 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-6 max-w-[850px] leading-tight tracking-tight cta-fade">
            Claim your spot in our <br className="hidden sm:inline" /> premium ecosystem.
          </h2>
          <p className="text-base md:text-lg text-white/80 max-w-[650px] leading-relaxed mb-10 font-medium cta-fade">
            We maintain a strict client cap to ensure flawless algorithmic planning and white-glove service. Apply now to start your transformation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 cta-fade">
            <Link href="https://wa.me/yourwhatsapplink" target="_blank" rel="noopener noreferrer" className="flex">
              <button className="bg-[#76c117] hover:bg-[#65a314] text-white text-xs font-bold uppercase tracking-[2px] px-8 py-4 rounded-full flex items-center gap-3 transition-all duration-300 shadow-[0_4px_25px_rgba(118,193,23,0.35)] hover:scale-105 cursor-pointer">
                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.459 3.477 1.332 4.992L2 22l5.168-1.357c1.474.805 3.129 1.229 4.832 1.229h.01c5.506 0 9.988-4.482 9.988-9.988 0-2.663-1.037-5.167-2.92-7.053C17.18 3.037 14.675 2 12.012 2zm5.727 14.18c-.234.66-.69 1.155-1.282 1.458-.456.234-1.026.398-2.61-.258-2.18-.903-3.666-3.08-3.774-3.228-.108-.147-.887-1.178-.887-2.263 0-1.085.57-1.616.774-1.83.204-.213.447-.267.597-.267.15 0 .3 0 .432.006.138.006.324-.054.51.396.192.468.654 1.596.714 1.716.06.12.1.258.018.42-.084.162-.126.258-.252.408-.126.15-.264.336-.378.462-.114.126-.234.264-.102.492.132.228.588.966 1.26 1.566.864.774 1.596 1.014 1.824 1.122.228.108.36.09.492-.06.132-.15.57-.666.72-.9.15-.234.3-.198.51-.12.21.078 1.332.63 1.56.744.228.114.378.168.432.264.054.096.054.558-.18 1.218z"/>
                </svg>
                Apply for Membership
              </button>
            </Link>
            <Link href="#pricing" className="flex">
              <button className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-[2px] px-8 py-4 rounded-full flex items-center gap-3 transition-all duration-300 shadow-sm hover:scale-105 cursor-pointer">
                View Membership Details
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* FOOTER (homepage) */}
      {/* ═══════════════════════════════════════ */}
      <footer id="contact" className="relative w-full bg-[#0b1409] text-white/70 py-16 px-[5%] border-t border-white/5 overflow-hidden">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10 pb-16">
          <div className="md:col-span-6 flex flex-col items-start text-left">
            <Link href="/" className="mb-6 block"><img src={logo} alt="Fit Eat" className="h-[40px] w-auto transition-transform duration-300 hover:scale-102" /></Link>
            <p className="text-sm md:text-base text-white/60 leading-relaxed mb-6 max-w-[450px]">
              A scalable food-tech ecosystem built for your goals—calories, protein, and real life. Our algorithmic planning and dynamic subscriptions power a seamless nutrition journey.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Tech-enabled', 'Algorithmic macros', 'Dynamic subscriptions'].map((pill, i) => (
                <span key={i} className="bg-white/5 border border-white/10 text-white/80 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-[0.5px]">{pill}</span>
              ))}
            </div>
          </div>
          <div className="md:col-span-3 flex flex-col items-start text-left">
            <h4 className="text-xs font-extrabold uppercase tracking-[2px] text-brand-green mb-6">Plan</h4>
            <div className="flex flex-col gap-4">
              {[{ label: 'How It Works', href: '/how-it-works' }, { label: 'Pricing', href: '/pricing' }].map((link, i) => (
                <Link key={i} href={link.href} className="text-sm font-medium hover:text-white transition-colors duration-200">{link.label}</Link>
              ))}
            </div>
          </div>
          <div className="md:col-span-3 flex flex-col items-start text-left">
            <h4 className="text-xs font-extrabold uppercase tracking-[2px] text-brand-green mb-6">Company</h4>
            <div className="flex flex-col gap-4">
              {[{ label: 'About Us', href: '/about-us' }, { label: 'Contact', href: '/contact' }, { label: 'FAQ', href: '/#faq' }].map((link, i) => (
                <Link key={i} href={link.href} className="text-sm font-medium hover:text-white transition-colors duration-200">{link.label}</Link>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full overflow-hidden py-6 border-t border-white/5 relative select-none pointer-events-none">
          <div className="flex whitespace-nowrap animate-marquee-left">
            <div className="flex gap-16 pr-16 text-[8rem] md:text-[11rem] font-bold text-white/[0.03] uppercase tracking-widest leading-none font-playfair select-none">
              <span>FIT EATS</span><span>FIT EATS</span><span>FIT EATS</span>
            </div>
            <div className="flex gap-16 pr-16 text-[8rem] md:text-[11rem] font-bold text-white/[0.03] uppercase tracking-widest leading-none font-playfair select-none">
              <span>FIT EATS</span><span>FIT EATS</span><span>FIT EATS</span>
            </div>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40 font-medium">
          <div>© {new Date().getFullYear()} FitEats. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <Link href="#privacy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
            <Link href="#terms" className="hover:text-white transition-colors duration-200">Terms of Service</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
