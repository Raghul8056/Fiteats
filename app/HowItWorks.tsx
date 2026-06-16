"use client";
import Link from 'next/link';

import React, { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

const logo = '/assets/logo.png';
const phaseConsultation = '/assets/1.png';
const phaseCalibration = '/assets/2.png';
const phaseSubscription = '/assets/3.png';
const phaseDelivery = '/assets/4-edit.png';
const editedVideo = '/assets/edited.mp4';
const bowlImg = '/assets/bowl-transparent.png';
const leaf1 = '/assets/leaf1.png';
const leaf2 = '/assets/leaf2.png';
const eggImg = '/assets/egg.png';
const ch1 = '/assets/ch1.png';
const ch2 = '/assets/ch2.png';
const ch3 = '/assets/ch3.png';
const ch4 = '/assets/ch4.png';
const leaf3 = '/assets/leaf3.png';
const leaf4 = '/assets/leaf4.png';

// New Detailed Section Assets
const tiffinTop = '/assets/tiffin_top.png';
const dosaPlate = '/assets/dosa_plate.png';
const almonds = '/assets/almonds.png';
const toteBag = '/assets/tote_bag.png';


gsap.registerPlugin(ScrollTrigger);

const phases = [
  {
    num: '01',
    title: 'Tech-Enabled Consultation & Profiling',
    desc: 'Start with a seamless digital consultation. Our platform captures your goals, food preferences, lifestyle habits, and nutritional requirements to build a personalized health profile.',
    highlights: ['Goal-based onboarding', 'Personalized nutrition blueprint', 'WhatsApp integrated platform', 'No manual calorie tracking'],
    tag: 'Data Collection Layer',
    image: phaseConsultation,
    accent: '#16a34a',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Algorithmic Meal Calibration',
    desc: 'Our food-tech engine analyzes your profile and automatically maps your nutritional requirements to our meal ecosystem. Every portion is optimized for calorie accuracy.',
    highlights: ['Macro-optimized meals', 'Portion precision', 'Goal-focused recommendations', 'Data-driven nutrition'],
    tag: 'Nutrition Intelligence Layer',
    image: phaseCalibration,
    accent: '#0ea5e9',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Dynamic Subscription Ecosystem',
    desc: 'Take complete control of your meal journey. Upgrade, pause, resume, or modify your subscription anytime without being restricted by rigid plans.',
    highlights: ['Flexible subscriptions', 'Pause anytime', 'Upgrade instantly', 'Full account control'],
    tag: 'Subscription Management Layer',
    image: phaseSubscription,
    accent: '#f59e0b',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M21.015 4.356v4.992" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Scalable Logistics & Dispatch',
    desc: 'Fresh meals delivered through optimized operational workflows. Our dispatch system ensures reliable timing, quality control, and consistent freshness.',
    highlights: ['Fresh daily preparation', 'Route optimization', 'Reliable delivery schedules', 'Quality assurance'],
    tag: 'Delivery & Fulfillment Layer',
    image: phaseDelivery,
    accent: '#ef4444',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const containerRef = useRef(null);
  const stackRef = useRef(null);
  const detailedRef = useRef(null);
  const overlayRef = useRef(null);
  const loaderRef = useRef(null);
  const progressTextRef = useRef(null);
  const ticksRef = useRef([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isLoading]);

  useEffect(() => {
    const lenis = new Lenis({ 
      duration: 1.5, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Loader animation — uses useEffect + gsap.context scoped to loaderRef
  // so it always finds the DOM elements reliably on first mount
  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const loaderTl = gsap.timeline({
        onComplete: () => {
          setIsLoading(false);
          if (loaderRef.current) loaderRef.current.style.display = 'none';
          ScrollTrigger.refresh();
        }
      });

      // Initial setup
      gsap.set('.glove-left', { xPercent: -240, yPercent: -50, opacity: 1 });
      gsap.set('.glove-right', { xPercent: 130, yPercent: -50, opacity: 1 });
      gsap.set('.impact-logo', { scale: 0.8, opacity: 0 });
      gsap.set('.impact-glow', { scale: 0, opacity: 0 });
      gsap.set('.impact-flare', { scaleX: 0, scaleY: 0, opacity: 0 });

      // 1. Initial slow fly-in (Tension building)
      loaderTl.to('.glove-left', { xPercent: -90, duration: 0.4, ease: 'power2.out' }, 0);
      loaderTl.to('.glove-right', { xPercent: -15, duration: 0.4, ease: 'power2.out' }, 0);

      // Progress bar up to 49%
      const counter = { val: 0 };
      loaderTl.to(counter, {
        val: 49,
        duration: 0.4,
        ease: 'power2.out',
        onUpdate: () => {
          if (progressTextRef.current) progressTextRef.current.innerText = Math.floor(counter.val) + '%';
        }
      }, 0);
      loaderTl.to('.loader-progress-bar', { width: '49%', duration: 0.4, ease: 'power2.out' }, 0);

      // 2. The Impact (Snap to center)
      loaderTl.to('.glove-left', { xPercent: -59, duration: 0.05, ease: 'power1.in' }, 0.4);
      loaderTl.to('.glove-right', { xPercent: -46, duration: 0.05, ease: 'power1.in' }, 0.4);

      // Impact Flash and Particles
      loaderTl.to('.impact-glow', { opacity: 1, scale: 1.2, duration: 0.08, ease: 'power2.out' }, 0.45);
      loaderTl.to('.impact-flare', { opacity: 1, scaleX: 1.2, scaleY: 1.2, duration: 0.08, ease: 'power2.out' }, 0.45);
      loaderTl.to('.impact-glow', { scale: 1.8, opacity: 0.8, duration: 0.5, ease: 'power2.out' }, 0.53);
      loaderTl.to('.impact-flare', { scaleX: 1.8, opacity: 0.4, duration: 0.5, ease: 'power2.out' }, 0.53);

      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const dist = 180 + Math.random() * 120;
        loaderTl.to(`.ptcl-${i}`, {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          opacity: 0,
          scale: Math.random() * 2.5,
          duration: 0.3 + Math.random() * 0.3,
          ease: 'power3.out'
        }, 0.45);
      }

      // 3. Logo Reveal & Finish Progress (50% to 100%)
      loaderTl.to('.impact-logo', { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.8)' }, 0.45);

      loaderTl.to(counter, {
        val: 100,
        duration: 0.35,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (progressTextRef.current) progressTextRef.current.innerText = Math.round(counter.val) + '%';
        }
      }, 0.45);
      loaderTl.to('.loader-progress-bar', { width: '100%', duration: 0.35, ease: 'power2.inOut' }, 0.45);

      // 4. Recoil and Fade Out
      loaderTl.to('.glove-left', { xPercent: -240, opacity: 0, duration: 0.35, ease: 'power3.in' }, 0.9);
      loaderTl.to('.glove-right', { xPercent: 130, opacity: 0, duration: 0.35, ease: 'power3.in' }, 0.9);
      loaderTl.to('.impact-logo', { scale: 1.1, opacity: 0, duration: 0.25, ease: 'power2.in' }, 1.1);
      loaderTl.to('.loader-progress-container', { opacity: 0, duration: 0.25 }, 1.1);
      loaderTl.to('.impact-glow', { opacity: 0, duration: 0.25 }, 1.1);
      loaderTl.to('.impact-flare', { opacity: 0, duration: 0.25 }, 1.1);

      loaderTl.to('.loader-overlay', {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut'
      }, 1.25);
    }, el); // scope to the loader element

    return () => ctx.revert();
  }, []);

  useGSAP(() => {
    // ── Hero cascade ──
    const heroTl = gsap.timeline({
      delay: 1.4,
      onComplete: () => {
        // Start floating badges drift only after the entry animation completes to avoid property conflicts
        gsap.utils.toArray<HTMLElement>('.hero-floating-badge').forEach((badge, i) => {
          gsap.killTweensOf(badge);
          gsap.to(badge, { y: i % 2 === 0 ? -14 : 14, duration: 2.5 + i * 0.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        });
      }
    });

    heroTl
      .fromTo('.hero-label', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' })
      .fromTo('.hero-title-line', { y: 50, opacity: 0, rotateX: 30 }, { y: 0, opacity: 1, rotateX: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' }, '-=0.35')
      .fromTo('.hero-sub', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.4')
      .fromTo('.hero-scroll-line', { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.25')
      .fromTo('.hero-floating-badge', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(1.7)' }, '-=0.4');

    ScrollTrigger.refresh();

    // ── Section header ──
    gsap.from('.section-header-reveal', {
      scrollTrigger: { trigger: '.section-header-reveal', start: 'top 85%' },
      y: 60, opacity: 0, duration: 0.9, ease: 'power3.out',
    });

    // ══════════════════════════════════════════════════════
    // ── STACKING CARDS — Lusion-style scroll animation ──
    // ══════════════════════════════════════════════════════
    const cards = gsap.utils.toArray<HTMLElement>('.stack-card');
    const stackSection = stackRef.current;

    if (cards.length && stackSection) {
      cards.forEach((card, i) => {
        const isLast = i === cards.length - 1;
        const cardInner = card.querySelector('.stack-card-inner');

        // As each card scrolls to the top and the NEXT card pushes it,
        // shrink, dim, and blur the current card
        if (!isLast) {
          gsap.to(cardInner, {
            scrollTrigger: {
              trigger: card,
              start: () => `top ${100 + i * 30}px`,
              end: () => `+=${card.offsetHeight}`,
              scrub: true,
            },
            scale: 1 - 0.08,
            opacity: 1 - 0.6,
            ease: 'none'
          });
        }
      });
    }

    // ── Parallax floating bowl & leaves inside Stack Section ──
    if (stackRef.current) {
      stackRef.current.querySelectorAll('.parallax-deco').forEach((el) => {
        const speedY = parseFloat(el.dataset.speedY || el.dataset.speed) || 0;
        const speedX = parseFloat(el.dataset.speedX) || 0;
        const rotate = parseFloat(el.dataset.rotate) || 0;
        gsap.to(el, {
          scrollTrigger: {
            trigger: stackRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
          y: () => window.innerHeight * speedY,
          x: () => window.innerWidth * speedX,
          rotation: rotate,
          ease: 'none',
        });
      });
    }

    // ── Parallax floating bowl & leaves inside Detailed Section ──
    if (detailedRef.current) {
      detailedRef.current.querySelectorAll('.parallax-deco').forEach((el) => {
        const speedY = parseFloat(el.dataset.speedY || el.dataset.speed) || 0;
        const speedX = parseFloat(el.dataset.speedX) || 0;
        const rotate = parseFloat(el.dataset.rotate) || 0;
        gsap.to(el, {
          scrollTrigger: {
            trigger: detailedRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
          y: () => window.innerHeight * speedY,
          x: () => window.innerWidth * speedX,
          rotation: rotate,
          ease: 'none',
        });
      });
    }

    // Gentle floating/bouncing on the bowls
    gsap.to('.deco-bowl', {
      y: 15,
      x: 10,
      rotation: 6,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Floating leaves
    gsap.to('.deco-leaf', {
      y: 12,
      x: 8,
      rotation: 8,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: {
        each: 0.3,
        from: 'random'
      }
    });

    // ── CTA ──
    gsap.from('.cta-fade', {
      scrollTrigger: { trigger: '.cta-section', start: 'top 80%' },
      y: 50, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
    });

  }, { scope: containerRef });

  return (
    <>
      {/* Cinematic Boxing Loader Overlay — must be outside containerRef (perspective creates stacking context) */}
      <div ref={loaderRef} className="loader-overlay fixed inset-0 z-[9999] bg-black overflow-hidden will-change-transform">
        
        <div className="absolute top-1/2 left-1/2 w-full h-[400px] -translate-x-1/2 -translate-y-1/2">
          
          <div className="impact-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.8)_0%,rgba(34,197,94,0.4)_20%,rgba(34,197,94,0)_60%)] opacity-0 scale-0 pointer-events-none mix-blend-screen"></div>
          <div className="impact-flare absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[40px] bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.9)_0%,rgba(34,197,94,0.4)_20%,rgba(34,197,94,0)_70%)] opacity-0 scale-0 pointer-events-none mix-blend-screen"></div>
          
          <div className="glove-left glove-left-init absolute top-1/2 left-1/2 flex items-center z-10">
            <img src="/left_e_h.png" alt="Left Glove" className="h-[250px] md:h-[400px] w-auto object-contain drop-shadow-[0_0_40px_rgba(34,197,94,0.4)]" />
          </div>

          <div className="glove-right glove-right-init absolute top-1/2 left-1/2 flex items-center z-10">
            <img src="/right_h.png" alt="Right Glove" className="h-[250px] md:h-[400px] w-auto object-contain drop-shadow-[0_0_40px_rgba(34,197,94,0.4)]" />
          </div>

          <div className="impact-logo absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 scale-[0.8] z-40">
             <img src={logo} alt="Fit Eat" className="w-[120px] md:w-[160px]" style={{ filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.8))' }} />
          </div>
          
          <div className="impact-particles absolute top-1/2 left-1/2 w-full h-full pointer-events-none z-30">
             {[...Array(12)].map((_, i) => (
                <div key={i} className={`particle ptcl-${i} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#16a34a] opacity-0 shadow-[0_0_10px_#16a34a]`}></div>
             ))}
          </div>

        </div>




      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full h-[80px] z-[999] flex items-center transition-all duration-300 ${
        isScrolled ? 'premium-glass-nav' : 'premium-glass-nav-top'
      }`}>
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
                    link === 'How It Works' ? 'text-brand-green' : 'text-white/70 hover:text-brand-green'
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

      <div className="min-h-screen" ref={containerRef} style={{ perspective: '1200px' }}>

        {/* ═══════════════════════════════════════ */}
        {/* HERO — Dark, cinematic */}
        {/* ═══════════════════════════════════════ */}
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 pt-[100px] pb-24 overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(22,163,74,0.25) 0%, transparent 65%)' }}></div>

        {/* Floating badges */}
        <div className="hero-floating-badge absolute top-[22%] left-[8%] px-4 py-2 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/[0.08] text-white/50 text-[10px] font-bold tracking-[2px] uppercase hidden lg:flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>AI-Powered
        </div>
        <div className="hero-floating-badge absolute top-[18%] right-[10%] px-4 py-2 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/[0.08] text-white/50 text-[10px] font-bold tracking-[2px] uppercase hidden lg:flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#0ea5e9] animate-pulse"></span>Macro Tracking
        </div>
        <div className="hero-floating-badge absolute bottom-[22%] left-[12%] px-4 py-2 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/[0.08] text-white/50 text-[10px] font-bold tracking-[2px] uppercase hidden lg:flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse"></span>Fresh Daily
        </div>
        <div className="hero-floating-badge absolute bottom-[18%] right-[8%] px-4 py-2 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/[0.08] text-white/50 text-[10px] font-bold tracking-[2px] uppercase hidden lg:flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-pulse"></span>Chennai Based
        </div>

        <div className="relative z-10 max-w-[950px]" style={{ transformStyle: 'preserve-3d' }}>
          <div className="hero-label flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-[2px] bg-brand-green"></div>
            <span className="text-brand-green text-xs font-bold uppercase tracking-[5px]">How It Works</span>
            <div className="w-10 h-[2px] bg-brand-green"></div>
          </div>
          <h1 className="hero-title-line font-playfair text-5xl md:text-7xl lg:text-[6rem] font-bold leading-[1.02] mb-4 text-white tracking-tight">
            A Smarter Way To
          </h1>
          <h1 className="hero-title-line font-playfair text-5xl md:text-7xl lg:text-[6rem] font-bold leading-[1.02] mb-10 text-brand-green tracking-tight">
            Eat Better.
          </h1>
          <p className="hero-sub text-base md:text-lg text-white/40 max-w-[620px] mx-auto leading-relaxed font-medium">
            Powered by technology, personalized nutrition, and operational excellence — every step is designed to make healthy eating effortless.
          </p>
          <div className="hero-scroll-line mt-20 flex flex-col items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[3px] text-white/20">Scroll to explore</span>
            <div className="w-[1px] h-20 bg-gradient-to-b from-brand-green/60 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* STACKING CARDS — Lusion-style scroll */}
      {/* ═══════════════════════════════════════ */}
      <section className="relative bg-brand-light py-20 md:py-28" ref={stackRef}>

        {/* ── Parallax decorative elements (in a clipped layer) ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="parallax-deco absolute -right-[5%] top-[15%]" data-speed-y="-0.4" data-speed-x="-0.08" data-rotate="-25">
            <img src={bowlImg} alt="" className="deco-bowl w-[400px] md:w-[600px] opacity-100 select-none" />
          </div>
          <div className="parallax-deco absolute -left-[3%] top-[5%]" data-speed-y="-0.6" data-speed-x="0.05" data-rotate="30">
            <img src={leaf1} alt="" className="deco-leaf w-[150px] md:w-[220px] opacity-100 select-none rotate-[15deg]" />
          </div>
          <div className="parallax-deco absolute right-[5%] top-[30%]" data-speed-y="-0.35" data-speed-x="-0.06" data-rotate="-40">
            <img src={leaf2} alt="" className="deco-leaf w-[120px] md:w-[180px] opacity-100 select-none rotate-[-20deg]" />
          </div>
          <div className="parallax-deco absolute -left-[2%] top-[55%]" data-speed-y="-0.5" data-speed-x="0.08" data-rotate="20">
            <img src={leaf3} alt="" className="deco-leaf w-[180px] md:w-[250px] opacity-100 select-none rotate-[45deg]" />
          </div>
          <div className="parallax-deco absolute right-[3%] bottom-[15%]" data-speed-y="-0.3" data-speed-x="-0.05" data-rotate="-50">
            <img src={leaf4} alt="" className="deco-leaf w-[140px] md:w-[200px] opacity-100 select-none rotate-[-30deg]" />
          </div>
          <div className="parallax-deco absolute -left-[8%] bottom-[20%]" data-speed-y="-0.25" data-speed-x="0.07" data-rotate="15">
            <img src={bowlImg} alt="" className="deco-bowl w-[320px] md:w-[450px] opacity-100 select-none rotate-[20deg]" />
          </div>
        </div>

        {/* Section header */}
        <div className="section-header-reveal max-w-[800px] mx-auto text-center mb-16 md:mb-24 px-6 relative z-10">
          <span className="text-brand-green text-xs font-bold uppercase tracking-[4px] mb-4 block">Our 4-Step Process</span>
          <h2 className="font-playfair text-5xl md:text-[5.5rem] leading-[1.05] font-bold text-brand-dark mb-6 tracking-tight">
            From Profile To <span className="text-brand-green">Plate</span>
          </h2>
          <p className="text-base md:text-lg text-gray-500 font-medium leading-relaxed max-w-[550px] mx-auto">
            Every detail is engineered. Every meal is intentional. Here's how we turn your goals into daily nutrition.
          </p>
        </div>

        {/* Stacking cards */}
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 relative z-10">
          {phases.map((phase, idx) => (
            <div
              key={idx}
              className="stack-card sticky mb-6"
              style={{ top: `${100 + idx * 30}px` }}
            >
              <div className="stack-card-inner rounded-[2rem] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.08)] border border-gray-100 bg-white" style={{ transformOrigin: 'center top', willChange: 'transform, opacity' }}>
                <div className="flex flex-col lg:flex-row min-h-[420px] md:min-h-[480px]">

                  {/* Image half */}
                  <div className="relative lg:w-[48%] overflow-hidden">
                    <img src={phase.image} alt={phase.title}
                      className="phase-img w-full h-[280px] lg:h-full object-cover transition-transform duration-700 hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-transparent"></div>
                    <span className="absolute top-4 left-5 text-[5rem] md:text-[7rem] font-bold text-white/15 leading-none font-playfair select-none pointer-events-none">
                      {phase.num}
                    </span>
                    <div className="absolute bottom-4 left-5 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[2px] backdrop-blur-xl bg-white/90 shadow-sm border border-gray-100"
                      style={{ color: phase.accent }}>
                      {phase.tag}
                    </div>
                  </div>

                  {/* Content half */}
                  <div className="lg:w-[52%] p-8 md:p-12 flex flex-col justify-center">
                    <div className="card-inner-stagger flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg"
                        style={{ background: `linear-gradient(135deg, ${phase.accent}, ${phase.accent}88)`, boxShadow: `0 6px 20px ${phase.accent}30` }}>
                        {phase.icon}
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-[3px] text-gray-400 block">Phase {phase.num}</span>
                        <div className="w-6 h-[2px] mt-1 rounded-full" style={{ background: phase.accent }}></div>
                      </div>
                    </div>
                    <h3 className="card-inner-stagger font-poppins text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-brand-dark leading-tight mb-4 tracking-tight">
                      {phase.title}
                    </h3>
                    <p className="card-inner-stagger text-sm md:text-base text-gray-500 leading-relaxed mb-7 max-w-[440px]">
                      {phase.desc}
                    </p>
                    <div className="card-inner-stagger flex flex-wrap gap-2">
                      {phase.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 py-2 px-3.5 rounded-full bg-gray-50 border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-300">
                          <svg className="w-3 h-3 flex-shrink-0" style={{ color: phase.accent }} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-xs font-semibold text-brand-dark/70">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Spacer for last card to scroll out */}
        <div className="h-[40vh]"></div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* New Detailed Design Section */}
      {/* ═══════════════════════════════════════ */}
      <section className="relative w-full bg-brand-light py-20 overflow-hidden font-poppins" ref={detailedRef}>
        
        {/* ── Parallax decorative elements (in a clipped layer) ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="parallax-deco absolute -left-[3%] top-[5%]" data-speed-y="-0.6" data-speed-x="0.05" data-rotate="30">
            <img src={leaf1} alt="" className="deco-leaf w-[150px] md:w-[220px] opacity-100 select-none rotate-[15deg]" />
          </div>
          <div className="parallax-deco absolute right-[5%] top-[30%]" data-speed-y="-0.35" data-speed-x="-0.06" data-rotate="-40">
            <img src={leaf2} alt="" className="deco-leaf w-[120px] md:w-[180px] opacity-100 select-none rotate-[-20deg]" />
          </div>
          <div className="parallax-deco absolute -left-[2%] top-[55%]" data-speed-y="-0.5" data-speed-x="0.08" data-rotate="20">
            <img src={leaf3} alt="" className="deco-leaf w-[180px] md:w-[250px] opacity-100 select-none rotate-[45deg]" />
          </div>
          <div className="parallax-deco absolute right-[3%] bottom-[15%]" data-speed-y="-0.3" data-speed-x="-0.05" data-rotate="-50">
            <img src={leaf4} alt="" className="deco-leaf w-[140px] md:w-[200px] opacity-100 select-none rotate-[-30deg]" />
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-[5%] lg:px-8 relative z-10">
          
          {/* Top Hero Area */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10 mb-20">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 flex flex-col items-start relative">
              <div className="inline-flex items-center gap-2 bg-[#e4efd8] text-[#3f6b15] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 shadow-sm border border-[#3f6b15]/10">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2c-5.514 0-10 4.486-10 10s4.486 10 10 10 10-4.486 10-10-4.486-10-10-10zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm1-13h-2v4H8v2h3v4h2v-4h3v-2h-3V7z"/></svg>
                Monthly Diet Subscription
              </div>
              <h2 className="font-poppins text-5xl md:text-6xl lg:text-[4rem] font-bold text-brand-dark leading-[1.1] tracking-tight mb-6 relative z-10">
                Healthy meals, <br />
                <span className="text-brand-green relative inline-block">
                  delivered <span className="text-brand-dark">daily.</span>
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-brand-green opacity-60" viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0,10 Q50,20 100,5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></svg>
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed max-w-[450px] mb-8 relative z-10">
                We provide structured meal plans designed for your health goals.
              </p>
              
              <div className="flex flex-col items-center justify-center bg-white shadow-xl rounded-full w-28 h-28 border border-brand-green/10 absolute right-[-20px] bottom-[-20px] lg:right-[10%] lg:bottom-[-40px] z-20">
                <svg className="w-10 h-10 text-brand-green mb-1" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12 7.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z" /></svg>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-dark text-center leading-tight">Freshly<br/>Prepared</span>
              </div>
            </div>

            {/* Right Graphic Layout */}
            <div className="w-full lg:w-1/2 relative h-[500px] lg:h-[600px] flex items-center justify-center mt-10 lg:mt-0">
              <div className="absolute inset-0 bg-[#e4efd8] rounded-[100px] opacity-60 w-[80%] h-[80%] m-auto rotate-[-15deg]"></div>
              
              {/* Tiffin 1 - Breakfast */}
              <div className="absolute top-[5%] right-[20%] w-[180px] h-[180px] rounded-full shadow-2xl border-4 border-white overflow-hidden bg-gray-100 z-20">
                 <img src={tiffinTop} alt="Breakfast" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-[0%] right-[40%] text-brand-green font-caveat text-4xl font-bold -rotate-12 z-30 flex flex-col items-end">
                Breakfast
                <svg className="w-10 h-10 mt-1 opacity-70" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10,40 Q25,10 40,30" strokeLinecap="round" /><path d="M30,30 L40,30 L40,20" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>

              {/* Tiffin 2 - Lunch */}
              <div className="absolute top-[35%] right-[0%] w-[220px] h-[220px] rounded-full shadow-2xl border-4 border-white overflow-hidden bg-gray-100 z-10">
                 <img src={tiffinTop} alt="Lunch" className="w-full h-full object-cover scale-110 rotate-[45deg]" />
              </div>
              <div className="absolute top-[20%] right-[0%] text-brand-green font-caveat text-4xl font-bold rotate-6 z-30 flex flex-col items-start">
                Lunch
                <svg className="w-10 h-10 mt-1 opacity-70 -scale-x-100" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10,40 Q25,10 40,30" strokeLinecap="round" /><path d="M30,30 L40,30 L40,20" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>

              {/* Tiffin 3 - Dinner */}
              <div className="absolute bottom-[5%] left-[20%] w-[240px] h-[240px] rounded-full shadow-2xl border-4 border-white overflow-hidden bg-gray-100 z-30">
                 <img src={tiffinTop} alt="Dinner" className="w-full h-full object-cover scale-125 rotate-[-45deg]" />
              </div>
              <div className="absolute bottom-[45%] left-[10%] text-brand-green font-caveat text-4xl font-bold -rotate-6 z-30 flex flex-col items-center">
                Dinner
                <svg className="w-8 h-12 mt-1 opacity-70 rotate-[20deg]" viewBox="0 0 30 50" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15,50 Q10,25 15,0" strokeLinecap="round" /><path d="M5,10 L15,0 L25,10" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>

              {/* Connecting lines */}
              <svg className="absolute inset-0 w-full h-full z-0 opacity-20 pointer-events-none" style={{ border: 'none' }}>
                <path d="M 150 150 Q 250 50 350 150 T 450 350" fill="none" stroke="#3f6b15" strokeWidth="2" strokeDasharray="6,6" />
                <path d="M 100 400 Q 200 500 350 450" fill="none" stroke="#3f6b15" strokeWidth="2" strokeDasharray="6,6" />
              </svg>
            </div>
          </div>

          {/* Includes Divider */}
          <div className="flex items-center justify-center gap-4 mb-16 opacity-70">
            <div className="h-px bg-brand-green/30 flex-1 max-w-[100px]"></div>
            <svg className="w-4 h-4 text-brand-green fill-current" viewBox="0 0 24 24"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66l.95-2.3c.48.92 1.35 1.63 2.5 1.95 2.14.6 4.38-.45 5.37-2.48 1.4-2.86-.33-6.52-3.15-7.9l-1.37-.67c-1.48-.73-2.16-2.52-1.52-4.04C9.15 4.96 11 4.5 12.87 5.25c1.47.6 2.45 1.95 2.45 3.52v.23l2-.6V8c0-2.65-1.57-5.07-4.14-6.1-3.66-1.46-7.75-.15-9.62 3.1-1.32 2.3-1 5.2.82 7.18l.8.85c.67.7 1.7 1 2.64.8l-1.55 3.7c1.44-1.9 3.54-3 5.76-2.9 2.17.1 4.18 1.45 5.25 3.5 1.42 2.7.45 5.9-2.15 7.47v.03C17.22 17.12 18.23 11 17 8z"/></svg>
            <span className="text-brand-green font-bold tracking-[3px] uppercase text-sm">Includes</span>
            <svg className="w-4 h-4 text-brand-green fill-current -scale-x-100" viewBox="0 0 24 24"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66l.95-2.3c.48.92 1.35 1.63 2.5 1.95 2.14.6 4.38-.45 5.37-2.48 1.4-2.86-.33-6.52-3.15-7.9l-1.37-.67c-1.48-.73-2.16-2.52-1.52-4.04C9.15 4.96 11 4.5 12.87 5.25c1.47.6 2.45 1.95 2.45 3.52v.23l2-.6V8c0-2.65-1.57-5.07-4.14-6.1-3.66-1.46-7.75-.15-9.62 3.1-1.32 2.3-1 5.2.82 7.18l.8.85c.67.7 1.7 1 2.64.8l-1.55 3.7c1.44-1.9 3.54-3 5.76-2.9 2.17.1 4.18 1.45 5.25 3.5 1.42 2.7.45 5.9-2.15 7.47v.03C17.22 17.12 18.23 11 17 8z"/></svg>
            <div className="h-px bg-brand-green/30 flex-1 max-w-[100px]"></div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Card 1 */}
            <div className="group bg-white/95 backdrop-blur-sm rounded-[32px] p-8 border border-neutral-100/90 shadow-[0_15px_40px_rgba(0,0,0,0.015)] hover:shadow-[0_30px_70px_rgba(22,163,74,0.1)] hover:-translate-y-2 hover:border-brand-green/30 transition-all duration-500 ease-out relative overflow-hidden flex flex-col justify-start h-[340px]">
              {/* Badge & Number */}
              <div className="flex justify-between items-center mb-6 z-10">
                <div className="w-12 h-12 bg-brand-green/5 border border-brand-green/10 text-brand-green rounded-2xl flex items-center justify-center group-hover:bg-brand-green group-hover:text-white group-hover:scale-110 transition-all duration-500 ease-out">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>
                </div>
                <div className="bg-neutral-100 text-neutral-500 font-poppins font-bold text-xs px-3.5 py-1.5 rounded-full tracking-wider group-hover:bg-brand-green/10 group-hover:text-brand-green transition-all duration-300">01</div>
              </div>
              <h4 className="text-xl font-extrabold text-brand-dark leading-tight mb-3 z-10 group-hover:text-brand-green transition-colors duration-300">Breakfast / Lunch / Dinner</h4>
              <p className="text-sm text-neutral-500 font-medium leading-relaxed mb-4 pr-16 z-10">Balanced, chef-crafted meals designed for every time of the day.</p>
              <div className="w-8 h-1 bg-brand-green rounded-full mt-auto z-10 group-hover:w-16 transition-all duration-500 ease-out"></div>
              {/* Overflow Image */}
              <div className="absolute -bottom-[20px] -right-[40px] w-[190px] h-[190px] z-0 opacity-90 drop-shadow-[0_15px_30px_rgba(0,0,0,0.08)] pointer-events-none">
                 <img src={dosaPlate} alt="Dosa" className="w-full h-full object-cover scale-[1.3] group-hover:scale-[1.42] group-hover:rotate-6 transition-transform duration-700 ease-out" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="group bg-white/95 backdrop-blur-sm rounded-[32px] p-8 border border-neutral-100/90 shadow-[0_15px_40px_rgba(0,0,0,0.015)] hover:shadow-[0_30px_70px_rgba(22,163,74,0.1)] hover:-translate-y-2 hover:border-brand-green/30 transition-all duration-500 ease-out relative overflow-hidden flex flex-col justify-start h-[340px]">
              {/* Badge & Number */}
              <div className="flex justify-between items-center mb-6 z-10">
                <div className="w-12 h-12 bg-brand-green/5 border border-brand-green/10 text-brand-green rounded-2xl flex items-center justify-center group-hover:bg-brand-green group-hover:text-white group-hover:scale-110 transition-all duration-500 ease-out">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.211.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.052.86.152 1.27.095.385.45.645.845.645h.95a4.5 4.5 0 012.38.681L9 16.5m7.5-11.25L13.5 9m0 0l-3 3m3-3v3m-3-3l3-3" /></svg>
                </div>
                <div className="bg-neutral-100 text-neutral-500 font-poppins font-bold text-xs px-3.5 py-1.5 rounded-full tracking-wider group-hover:bg-brand-green/10 group-hover:text-brand-green transition-all duration-300">02</div>
              </div>
              <h4 className="text-xl font-extrabold text-brand-dark leading-tight mb-3 z-10 group-hover:text-brand-green transition-colors duration-300">Calorie & Protein Customization</h4>
              <p className="text-sm text-neutral-500 font-medium leading-relaxed mb-4 pr-16 z-10">Personalized target customization mapped directly to your fitness goals.</p>
              <div className="w-8 h-1 bg-brand-green rounded-full mt-auto z-10 group-hover:w-16 transition-all duration-500 ease-out"></div>
              {/* Overflow Image */}
              <div className="absolute -bottom-[20px] -right-[20px] w-[190px] h-[190px] z-0 opacity-90 pointer-events-none">
                 <img src={almonds} alt="Almonds" className="w-full h-full object-cover scale-[1.3] group-hover:scale-[1.42] group-hover:rotate-[-6deg] transition-transform duration-700 ease-out" />
              </div>
            </div>

            {/* Card 3 */}
            <div className="group bg-white/95 backdrop-blur-sm rounded-[32px] p-8 border border-neutral-100/90 shadow-[0_15px_40px_rgba(0,0,0,0.015)] hover:shadow-[0_30px_70px_rgba(22,163,74,0.1)] hover:-translate-y-2 hover:border-brand-green/30 transition-all duration-500 ease-out relative overflow-hidden flex flex-col justify-start h-[340px]">
              {/* Badge & Number */}
              <div className="flex justify-between items-center mb-6 z-10">
                <div className="w-12 h-12 bg-brand-green/5 border border-brand-green/10 text-brand-green rounded-2xl flex items-center justify-center group-hover:bg-brand-green group-hover:text-white group-hover:scale-110 transition-all duration-500 ease-out">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>
                </div>
                <div className="bg-neutral-100 text-neutral-500 font-poppins font-bold text-xs px-3.5 py-1.5 rounded-full tracking-wider group-hover:bg-brand-green/10 group-hover:text-brand-green transition-all duration-300">03</div>
              </div>
              <h4 className="text-xl font-extrabold text-brand-dark leading-tight mb-3 z-10 group-hover:text-brand-green transition-colors duration-300">Daily Fresh Delivery</h4>
              <p className="text-sm text-neutral-500 font-medium leading-relaxed mb-4 pr-16 z-10">Hygienically prepared, hot, and dispatched directly to you daily.</p>
              <div className="w-8 h-1 bg-brand-green rounded-full mt-auto z-10 group-hover:w-16 transition-all duration-500 ease-out"></div>
              {/* Overflow Image */}
              <div className="absolute -bottom-[20px] -right-[30px] w-[180px] h-[220px] z-0 opacity-95 pointer-events-none">
                 <img src={toteBag} alt="Tote Bag" className="w-full h-full object-cover scale-[1.15] group-hover:scale-[1.25] group-hover:rotate-3 transition-transform duration-700 ease-out" />
              </div>
            </div>
          </div>

          {/* Icon Features Strip */}
          <div className="bg-[#e9f1e1] rounded-[24px] p-6 lg:p-10 flex flex-wrap lg:flex-nowrap items-center justify-between gap-6 mb-12 shadow-sm border border-brand-green/10">
            <div className="flex items-center gap-4 w-full sm:w-[45%] lg:w-auto">
              <div className="w-12 h-12 rounded-full border-2 border-brand-green flex items-center justify-center bg-transparent shrink-0">
                <svg className="w-6 h-6 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>
              </div>
              <div>
                <h5 className="text-brand-dark font-bold text-sm leading-tight">Scientifically<br/>Designed</h5>
                <p className="text-gray-500 text-[10px] mt-1 leading-tight max-w-[120px]">Meals planned by nutrition experts</p>
              </div>
            </div>
            <div className="w-px h-12 bg-brand-green/20 hidden lg:block"></div>
            
            <div className="flex items-center gap-4 w-full sm:w-[45%] lg:w-auto">
              <div className="w-12 h-12 rounded-full border-2 border-brand-green flex items-center justify-center bg-transparent shrink-0">
                <svg className="w-6 h-6 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
              </div>
              <div>
                <h5 className="text-brand-dark font-bold text-sm leading-tight">Clean &<br/>Nutritious</h5>
                <p className="text-gray-500 text-[10px] mt-1 leading-tight max-w-[120px]">Fresh ingredients, zero compromise</p>
              </div>
            </div>
            <div className="w-px h-12 bg-brand-green/20 hidden lg:block"></div>

            <div className="flex items-center gap-4 w-full sm:w-[45%] lg:w-auto">
              <div className="w-12 h-12 rounded-full border-2 border-brand-green flex items-center justify-center bg-transparent shrink-0">
                <svg className="w-6 h-6 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
              </div>
              <div>
                <h5 className="text-brand-dark font-bold text-sm leading-tight">Consistent<br/>Results</h5>
                <p className="text-gray-500 text-[10px] mt-1 leading-tight max-w-[120px]">Stay consistent and achieve more</p>
              </div>
            </div>
            <div className="w-px h-12 bg-brand-green/20 hidden lg:block"></div>

            <div className="flex items-center gap-4 w-full sm:w-[45%] lg:w-auto">
              <div className="w-12 h-12 rounded-full border-2 border-brand-green flex items-center justify-center bg-transparent shrink-0">
                <svg className="w-6 h-6 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
              </div>
              <div>
                <h5 className="text-brand-dark font-bold text-sm leading-tight">Flexible<br/>Subscription</h5>
                <p className="text-gray-500 text-[10px] mt-1 leading-tight max-w-[120px]">Pause, resume or modify anytime</p>
              </div>
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="w-full bg-[#3f6b15] rounded-[24px] overflow-hidden flex flex-col md:flex-row items-center justify-between p-8 lg:px-12 lg:py-10 shadow-2xl relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-[50px] -mr-20 -mt-20 pointer-events-none"></div>
            
            <div className="flex items-center gap-6 mb-8 md:mb-0 relative z-10">
              <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center shrink-0 border border-white/20">
                 <svg className="w-8 h-8 text-[#a3e635] fill-current" viewBox="0 0 24 24"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66l.95-2.3c.48.92 1.35 1.63 2.5 1.95 2.14.6 4.38-.45 5.37-2.48 1.4-2.86-.33-6.52-3.15-7.9l-1.37-.67c-1.48-.73-2.16-2.52-1.52-4.04C9.15 4.96 11 4.5 12.87 5.25c1.47.6 2.45 1.95 2.45 3.52v.23l2-.6V8c0-2.65-1.57-5.07-4.14-6.1-3.66-1.46-7.75-.15-9.62 3.1-1.32 2.3-1 5.2.82 7.18l.8.85c.67.7 1.7 1 2.64.8l-1.55 3.7c1.44-1.9 3.54-3 5.76-2.9 2.17.1 4.18 1.45 5.25 3.5 1.42 2.7.45 5.9-2.15 7.47v.03C17.22 17.12 18.23 11 17 8z"/></svg>
              </div>
              <div className="flex flex-col">
                <h3 className="text-white text-3xl md:text-4xl font-bold tracking-tight leading-tight flex items-end">
                  Eat right. Feel right. <span className="font-caveat text-[#a3e635] font-normal text-4xl md:text-5xl ml-2 mb-[-5px]">Every day.</span>
                </h3>
                <p className="text-white/80 font-medium text-sm md:text-base mt-2">One subscription. Balanced nutrition. Real results.</p>
              </div>
            </div>

            <button className="bg-white hover:bg-gray-50 text-brand-dark px-8 py-4 rounded-xl flex items-center gap-4 transition-transform hover:scale-105 shadow-lg relative z-10 w-full md:w-auto justify-center">
              <svg className="w-6 h-6 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.662-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase font-bold text-gray-500 leading-none">Chat with us</span>
                <span className="text-sm font-bold leading-none mt-1">on WhatsApp</span>
              </div>
              <svg className="w-5 h-5 text-gray-400 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>

        </div>
      </section>

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

      {/* WhatsApp */}
      <Link href="https://wa.me/yourwhatsapplink" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[999] flex items-center justify-center w-14 h-14 bg-[#25d366] hover:bg-[#20ba5a] text-white rounded-full shadow-[0_4px_15px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Chat on WhatsApp">
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
          <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.459 3.477 1.332 4.992L2 22l5.168-1.357c1.474.805 3.129 1.229 4.832 1.229h.01c5.506 0 9.988-4.482 9.988-9.988 0-2.663-1.037-5.167-2.92-7.053C17.18 3.037 14.675 2 12.012 2zm5.727 14.18c-.234.66-.69 1.155-1.282 1.458-.456.234-1.026.398-2.61-.258-2.18-.903-3.666-3.08-3.774-3.228-.108-.147-.887-1.178-.887-2.263 0-1.085.57-1.616.774-1.83.204-.213.447-.267.597-.267.15 0 .3 0 .432.006.138.006.324-.054.51.396.192.468.654 1.596.714 1.716.06.12.1.258.018.42-.084.162-.126.258-.252.408-.126.15-.264.336-.378.462-.114.126-.234.264-.102.492.132.228.588.966 1.26 1.566.864.774 1.596 1.014 1.824 1.122.228.108.36.09.492-.06.132-.15.57-.666.72-.9.15-.234.3-.198.51-.12.21.078 1.332.63 1.56.744.228.114.378.168.432.264.054.096.054.558-.18 1.218z"/>
        </svg>
      </Link>
    </>
  );
}
