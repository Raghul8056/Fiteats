"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// Assets
const logo = '/assets/logo.png';
const chefImage = 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=1200';
const founderImage = '/assets/avatar-indian-1.png';
const ctaBg = '/assets/cta_ecosystem_bg.png';
const spiceParticle = '/assets/leaf1.png'; // using leaves as spice particles
const spiceParticle2 = '/assets/leaf2.png';

export default function AboutUs() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const originRef = useRef(null);
  const missionRef = useRef(null);
  const founderRef = useRef(null);
  const diffRef = useRef(null);
  const diffScrollRef = useRef(null);
  const valuesRef = useRef(null);
  const impactRef = useRef(null);
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isLoading]);

  useEffect(() => {
    // Initialize Lenis for Smooth Scrolling
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

  useGSAP(() => {
    // ── 1. Hero Animations ──
    const heroTl = gsap.timeline();
    heroTl
      .fromTo('.hero-tag', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
      .fromTo('.hero-word', { y: 50, opacity: 0, rotateX: 30 }, { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.1, ease: 'power3.out' }, '-=0.4')
      .fromTo('.hero-sub', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .fromTo('.hero-particle', { y: 100, opacity: 0, scale: 0 }, { y: 0, opacity: 0.8, scale: 1, duration: 1.5, stagger: 0.2, ease: 'back.out(1.2)' }, '-=0.8');

    // Mouse Parallax for Hero Particles
    const heroSection = heroRef.current;
    if (heroSection) {
      let ticking = false;
      heroSection.addEventListener('mousemove', (e) => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const x = (e.clientX / window.innerWidth - 0.5) * 40;
          const y = (e.clientY / window.innerHeight - 0.5) * 40;
          gsap.to('.hero-particle', { x, y, duration: 1, ease: 'power2.out', stagger: 0.05 });
          ticking = false;
        });
      });
    }

    // ── 2. Our Origin Animations ──
    gsap.fromTo('.origin-img', 
      { scale: 1.1, y: 50, opacity: 0 },
      { scrollTrigger: { trigger: originRef.current, start: 'top 80%' }, scale: 1, y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
    );
    gsap.fromTo('.origin-text > *', 
      { y: 30, opacity: 0 },
      { scrollTrigger: { trigger: originRef.current, start: 'top 70%' }, y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
    );
    gsap.fromTo('.origin-quote',
      { x: -50, opacity: 0 },
      { scrollTrigger: { trigger: '.origin-quote', start: 'top 85%' }, x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );

    // ── 3. Our Mission Animations ──
    gsap.to('.mission-bg', {
      scrollTrigger: { trigger: missionRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
      scale: 1.15, ease: 'none'
    });
    
    // Word by word reveal
    const missionWords = gsap.utils.toArray('.mission-reveal-word');
    gsap.fromTo(missionWords, 
      { opacity: 0.1, y: 10 },
      { scrollTrigger: { trigger: '.mission-text-container', start: 'top 70%', end: 'bottom 60%', scrub: true }, opacity: 1, y: 0, stagger: 0.1 }
    );

    // ── 4. The Founder Animations ──
    gsap.fromTo('.founder-text > *',
      { y: 40, opacity: 0 },
      { scrollTrigger: { trigger: founderRef.current, start: 'top 75%' }, y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
    );
    gsap.fromTo('.founder-card',
      { y: 100, opacity: 0, rotateZ: -5 },
      { scrollTrigger: { trigger: founderRef.current, start: 'top 70%' }, y: 0, opacity: 1, rotateZ: 0, duration: 1.2, ease: 'power3.out' }
    );
    gsap.fromTo('.founder-note',
      { y: 50, opacity: 0 },
      { scrollTrigger: { trigger: '.founder-note', start: 'top 90%' }, y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: 'power3.out' }
    );

    const founderCard = document.querySelector('.founder-card');
    if (founderCard) {
      let fTicking = false;
      founderCard.addEventListener('mousemove', (e) => {
        if (fTicking) return;
        fTicking = true;
        requestAnimationFrame(() => {
          const rect = founderCard.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) * 0.05;
          const y = (e.clientY - rect.top - rect.height / 2) * -0.05;
          gsap.to(founderCard, { rotationY: x, rotationX: y, duration: 0.5, ease: 'power2.out', transformPerspective: 1000 });
          fTicking = false;
        });
      });
      founderCard.addEventListener('mouseleave', () => {
        gsap.to(founderCard, { rotationY: 0, rotationX: 0, duration: 0.8, ease: 'power2.out' });
      });
    }

    // ── 5. What Makes Us Different (Horizontal Scroll) ──
    if (diffRef.current && diffScrollRef.current) {
      const cards = gsap.utils.toArray('.diff-card');
      const cardWidth = 360;
      const cardGap = 32;
      const totalWidth = cards.length * cardWidth + (cards.length - 1) * cardGap; // card width + gap
      const viewportWidth = window.innerWidth;
      
      const scrollTween = gsap.to(diffScrollRef.current, {
        scrollTrigger: {
          trigger: diffRef.current,
          start: 'top top',
          end: `+=${totalWidth}`,
          pin: true,
          scrub: 1,
        },
        x: () => -(totalWidth - viewportWidth + 100), // 100px padding
        ease: 'none'
      });

      // Animate each card individually as it horizontally scrolls into the viewport
      cards.forEach((card) => {
        gsap.fromTo(card,
          { scale: 0.9, y: 40 },
          {
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: 'left 95%',
              end: 'left 40%',
              scrub: true,
            },
            scale: 1,
            y: 0,
            ease: 'power2.out'
          }
        );
      });

      gsap.to('.diff-progress-bar', {
        scrollTrigger: {
          trigger: diffRef.current,
          start: 'top top',
          end: `+=${totalWidth}`,
          scrub: 1,
        },
        width: '100%',
        ease: 'none'
      });
    }

    // ── 6. Our Values Animations ──
    gsap.fromTo('.value-card',
      { y: 80, opacity: 0 },
      { scrollTrigger: { trigger: valuesRef.current, start: 'top 75%' }, y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
    );

    // ── 7. Impact Numbers (Counter Up) ──
    const counters = gsap.utils.toArray('.impact-number');
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const isDecimal = target % 1 !== 0;
      
      gsap.to(counter, {
        scrollTrigger: { trigger: impactRef.current, start: 'top 85%' },
        innerHTML: target,
        duration: 2.5,
        ease: 'power2.out',
        snap: { innerHTML: isDecimal ? 0.1 : 1 },
        onUpdate: function() {
          if (isDecimal) {
            counter.innerHTML = Number(this.targets()[0].innerHTML).toFixed(1);
          }
        }
      });
    });

  }, { scope: containerRef });

  return (
    <div className="min-h-screen bg-brand-light font-manrope" ref={containerRef}>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full h-[80px] z-[999] flex items-center transition-all duration-300 premium-glass-nav">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8 flex items-center justify-between h-full">
          <div className="flex-1 flex items-center justify-start h-full">
            <a href="/" className="flex items-center">
              <img src={logo} alt="Fit Eat" className="h-[40px] w-auto block transition-transform duration-300 hover:scale-105" />
            </a>
          </div>
          <div className="hidden md:flex flex-initial items-center justify-center gap-10 h-full">
            {['How It Works', 'Pricing', 'About Us', 'Contact'].map(link => {
              let href = `/#${link.toLowerCase().replace(/ /g, '-')}`;
              if (link === 'How It Works') href = '/how-it-works';
              if (link === 'Pricing') href = '/pricing';
              if (link === 'About Us') href = '/about-us';
              if (link === 'Contact') href = '/contact';
              return (
                <a key={link}
                  href={href}
                  className={`text-xs font-bold tracking-[2px] uppercase transition-colors duration-300 ${
                    link === 'About Us' ? 'text-brand-green' : 'text-white/70 hover:text-brand-green'
                  }`}
                >{link}</a>
              );
            })}
          </div>
          <div className="flex-1 flex items-center justify-end h-full">
            <a href="https://wa.me/yourwhatsapplink" target="_blank" rel="noopener noreferrer">
              <button className="bg-[#3f6b15] hover:bg-[#325611] text-white text-xs font-bold uppercase tracking-[1px] px-5 py-2.5 rounded-full border border-white/5 transition-all duration-300 hover:scale-105 cursor-pointer">
                Apply for Membership
              </button>
            </a>
          </div>
        </div>
      </nav>


        {/* ═══════════════════════════════════════ */}
        {/* SECTION 1: HERO STORY                 */}
        {/* ═══════════════════════════════════════ */}
        <section ref={heroRef} className="relative w-full min-h-[90vh] flex flex-col items-center justify-center text-center px-[5%] pt-[100px] pb-20 overflow-hidden bg-[#fdfbf7]">
          {/* Subtle animated texture background */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
          
          {/* Floating Spice Particles */}
          <img src={spiceParticle} alt="" className="hero-particle absolute top-[25%] left-[15%] w-16 opacity-0 rotate-12 drop-shadow-xl" />
          <img src={spiceParticle2} alt="" className="hero-particle absolute bottom-[20%] right-[12%] w-12 opacity-0 -rotate-45 drop-shadow-xl" />
          <img src={spiceParticle} alt="" className="hero-particle absolute top-[35%] right-[20%] w-8 opacity-0 rotate-[80deg] drop-shadow-xl" />
          
          <div className="hero-tag inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-green/20 bg-brand-green/5 text-brand-green text-xs font-bold tracking-[3px] uppercase mb-10">
            Our Story
          </div>

          <h1 className="font-playfair text-5xl md:text-7xl lg:text-[6.5rem] font-bold text-brand-dark leading-[1.05] tracking-tight max-w-[1100px] mb-12 flex flex-wrap justify-center gap-x-4 gap-y-2">
            {"We didn't build another food delivery app.".split(' ').map((word, i) => (
              <span key={i} className="hero-word inline-block origin-bottom">{word}</span>
            ))}
          </h1>

          <div className="hero-sub flex flex-col items-center max-w-[650px]">
            <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed mb-6">
              FitEats was created to solve a simple problem: healthy eating shouldn't mean giving up the food you grew up loving.
            </p>
            <p className="text-base text-gray-500 leading-relaxed font-medium">
              Every meal we deliver combines authentic South Indian flavours with scientifically designed nutrition.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════ */}
        {/* SECTION 2: OUR ORIGIN                 */}
        {/* ═══════════════════════════════════════ */}
        <section ref={originRef} className="py-24 px-[5%] lg:px-[8%] bg-white relative overflow-hidden">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left Image */}
            <div className="origin-img relative rounded-3xl overflow-hidden aspect-[4/5] shadow-[0_30px_60px_rgba(0,0,0,0.08)]">
              <img src={chefImage} alt="Chef preparing food" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white text-xs font-bold tracking-[2px] uppercase opacity-80">
                Chef-crafted authenticity
              </div>
            </div>

            {/* Right Content */}
            <div className="origin-text flex flex-col items-start text-left">
              <div className="w-12 h-[2px] bg-brand-green mb-8"></div>
              <h2 className="font-playfair text-5xl md:text-6xl font-bold text-brand-dark leading-tight mb-8">
                Where tradition <br/><span className="text-brand-green italic font-playfair">meets precision.</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-600 font-medium leading-relaxed mb-12">
                <p>Most healthy meal services force people to choose between taste and nutrition. We believed there had to be a better way.</p>
                <p>FitEats began with a simple question: <strong className="text-brand-dark">"Why can't a perfectly balanced meal still taste like home?"</strong></p>
                <p>We spent months developing recipes that preserve authentic flavours while meeting precise calorie and protein targets.</p>
                <p>Today, every meal is built using a combination of culinary expertise, nutritional science, and operational precision.</p>
              </div>

              {/* Quote Block */}
              <div className="origin-quote border-l-4 border-brand-green pl-8 py-2 relative">
                <span className="absolute -top-4 left-4 text-brand-green/10 font-serif text-8xl leading-none select-none">"</span>
                <p className="text-xl md:text-2xl font-playfair font-bold text-brand-dark leading-snug mb-3 relative z-10">
                  We aren't a cloud kitchen.
                </p>
                <p className="text-base text-gray-500 font-medium relative z-10">
                  We're building a nutrition platform that makes healthy eating sustainable for real people.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════ */}
        {/* SECTION 3: OUR MISSION                */}
        {/* ═══════════════════════════════════════ */}
        <section ref={missionRef} className="relative w-full py-32 px-[5%] overflow-hidden flex items-center justify-center min-h-[80vh]">
          {/* Parallax Background */}
          <div className="absolute inset-0 w-full h-full">
            <img src={ctaBg} alt="Macro Food Background" className="mission-bg w-full h-full object-cover scale-[1.1] transform-origin-center" />
            <div className="absolute inset-0 bg-[#0b1409]/90 backdrop-blur-[2px]"></div>
          </div>

          <div className="relative z-10 max-w-[900px] mx-auto text-center">
            <h2 className="font-playfair text-4xl md:text-6xl font-bold text-white leading-tight mb-12">
              Scale authentic nutrition through seamless technology.
            </h2>
            
            <div className="mission-text-container text-xl md:text-2xl text-white/80 font-medium leading-relaxed space-y-8">
              <p>
                {"Behind every FitEats meal is a carefully designed ecosystem. From ingredient sourcing and recipe engineering to calorie tracking and delivery logistics, every step exists to help our customers achieve their health goals without sacrificing cultural identity.".split(' ').map((word, i) => (
                  <span key={i} className="mission-reveal-word inline-block mr-[0.3em]">{word}</span>
                ))}
              </p>
              
              <div className="pt-8 border-t border-white/10 mt-8">
                <p className="text-brand-green font-bold text-2xl mb-4">We believe food is more than fuel.</p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 font-playfair text-3xl text-white/90 italic">
                  <span>It's memory.</span>
                  <span className="hidden md:inline text-brand-green/30">•</span>
                  <span>It's family.</span>
                  <span className="hidden md:inline text-brand-green/30">•</span>
                  <span>It's heritage.</span>
                </div>
                <p className="mt-8 text-lg uppercase tracking-[3px] font-bold text-white/50">
                  And healthy eating should never require abandoning those things.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════ */}
        {/* SECTION 4: THE FOUNDER                */}
        {/* ═══════════════════════════════════════ */}
        <section ref={founderRef} className="py-24 px-[5%] lg:px-[8%] bg-[#f4f9f0] relative overflow-hidden">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="founder-text flex flex-col items-start text-left">
              <h2 className="font-playfair text-5xl md:text-6xl font-bold text-brand-dark leading-[1.1] mb-10">
                The person who asked:<br/>
                <span className="text-brand-green italic font-playfair">"Why not both?"</span>
              </h2>

              <div className="mb-10">
                <h3 className="text-xl font-bold text-brand-dark uppercase tracking-[2px] mb-1">Kishor Kumar</h3>
                <span className="text-sm font-bold text-brand-green tracking-[1px] uppercase">Founder & Head of Nutrition</span>
              </div>

              <div className="space-y-6 text-base md:text-lg text-gray-600 font-medium leading-relaxed">
                <p>Kishor spent years helping clients improve their health through nutrition. Again and again he saw the same challenge:</p>
                <p className="border-l-2 border-brand-green pl-4 italic text-gray-700">People knew what they should eat. But they couldn't maintain diets that felt disconnected from their culture and lifestyle.</p>
                <p>That insight became the foundation of FitEats.</p>
                <p>His mission was simple: Create meals that satisfy nutritional goals while still feeling familiar, comforting, and enjoyable.</p>
                <p>Today FitEats helps hundreds of customers build healthier habits without giving up the foods they love.</p>
              </div>
            </div>

            {/* Right Card */}
            <div className="relative flex justify-center lg:justify-end perspective-[1000px]">
              <div className="founder-card relative w-[90%] md:w-[400px] bg-white rounded-[2rem] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 transform-style-3d">
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-6">
                  <img src={founderImage} alt="Kishor Kumar" className="w-full h-full object-cover" />
                </div>
                
                <div className="founder-note absolute -bottom-10 -left-6 md:-left-12 bg-brand-dark text-white p-6 rounded-2xl shadow-2xl max-w-[300px] border border-white/10 translate-z-[50px]">
                  <svg className="w-6 h-6 text-brand-green mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
                  <p className="text-sm font-medium leading-relaxed">
                    "We're not replacing home cooking. We're here for the days life gets too busy to make it yourself."
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ═══════════════════════════════════════ */}
        {/* SECTION 5: WHAT MAKES US DIFFERENT    */}
        {/* ═══════════════════════════════════════ */}
        <section ref={diffRef} className="py-24 bg-[#080c09] text-white overflow-hidden h-screen flex flex-col justify-center relative">
          
          {/* 1. Architectural Grid Background */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

          {/* 2. Cinematic Glowing Orbs (Light Leaks) */}
          <div className="absolute top-[-15%] right-[-10%] w-[600px] h-[600px] bg-brand-green/15 blur-[80px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-brand-green/8 blur-[80px] rounded-full pointer-events-none"></div>

          {/* 3. Massive Outlined Watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center pointer-events-none select-none z-0">
            <h2 className="text-[22vw] font-black tracking-tight leading-none text-transparent whitespace-nowrap opacity-[0.03]" style={{ WebkitTextStroke: '2px white' }}>
              FIT EATS
            </h2>
          </div>

          <div className="max-w-[1200px] mx-auto px-[5%] w-full mb-12 shrink-0 relative z-10">
            <span className="text-brand-green text-xs font-bold uppercase tracking-[4px] mb-3 block">The System</span>
            <h2 className="font-playfair text-5xl md:text-6xl font-bold leading-tight drop-shadow-2xl">
              More than meal delivery.
            </h2>
          </div>

          <div className="w-full overflow-hidden flex items-center shrink-0 h-[420px] relative z-10">
            <div ref={diffScrollRef} className="flex gap-8 px-[5%] w-max will-change-transform">
              {[
                { 
                  num: '01', 
                  title: 'Authentic Recipes', 
                  desc: 'Traditional flavours crafted with nutritional precision.',
                  icon: (
                    <svg className="w-7 h-7 text-brand-green group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                  )
                },
                { 
                  num: '02', 
                  title: 'Macro-Based Planning', 
                  desc: 'Every meal designed around measurable calorie and protein goals.',
                  icon: (
                    <svg className="w-7 h-7 text-brand-green group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                    </svg>
                  )
                },
                { 
                  num: '03', 
                  title: 'Chef-Crafted Quality', 
                  desc: 'Prepared fresh by experienced culinary professionals.',
                  icon: (
                    <svg className="w-7 h-7 text-brand-green group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  )
                },
                { 
                  num: '04', 
                  title: 'Convenient Subscription', 
                  desc: 'Healthy eating without daily decision fatigue.',
                  icon: (
                    <svg className="w-7 h-7 text-brand-green group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                  )
                },
                { 
                  num: '05', 
                  title: 'Technology Driven', 
                  desc: 'Optimized systems ensure consistency and reliability.',
                  icon: (
                    <svg className="w-7 h-7 text-brand-green group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25M7.5 12h9m-9-3h9m-9-3h9" />
                    </svg>
                  )
                }
              ].map((card, i) => (
                <div key={i} className="diff-card w-[360px] h-[360px] bg-gradient-to-b from-[#1c1d22] to-[#121316] border border-white/10 hover:border-brand-green/50 rounded-[2.5rem] p-8 flex flex-col justify-between transition-all duration-500 hover:shadow-[0_20px_50px_rgba(22,163,74,0.2)] hover:-translate-y-2 relative overflow-hidden group">
                  
                  {/* Bright glowing accent line at the top */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-green/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Corner ambient glow */}
                  <div className="absolute -top-16 -right-16 w-48 h-48 bg-brand-green/10 rounded-full blur-[30px] pointer-events-none group-hover:bg-brand-green/20 transition-colors duration-500"></div>

                  {/* Massive Watermark */}
                  <div className="absolute -bottom-6 -right-2 text-[12rem] font-extrabold leading-none font-playfair text-white/[0.04] select-none pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:-translate-x-4">
                    {card.num}
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Header Row */}
                    <div className="flex justify-between items-start mb-8">
                      {/* High-Contrast Icon Circle */}
                      <div className="w-16 h-16 rounded-full bg-brand-green flex items-center justify-center shadow-[0_10px_25px_rgba(22,163,74,0.3)] transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                         {/* Forcing icon to be white using text-white and CSS child selector */}
                         <div className="w-8 h-8 text-white [&>svg]:!text-white">
                           {card.icon}
                         </div>
                      </div>

                      {/* Pill Badge */}
                      <span className="px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-[10px] font-bold tracking-[2px] uppercase text-white backdrop-blur-md">
                        Phase {card.num}
                      </span>
                    </div>
                    
                    <div className="mt-auto">
                      <h4 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3 group-hover:text-brand-green transition-colors duration-300">{card.title}</h4>
                      <p className="text-[15px] text-white/70 font-medium leading-relaxed max-w-[280px]">{card.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Bar Container at the bottom */}
          <div className="max-w-[1200px] mx-auto px-[5%] w-full mt-12 shrink-0 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4">
              <span className="text-white/30 text-xs font-bold tracking-[2px] uppercase">Scroll</span>
              <div className="w-[180px] h-[3px] bg-white/10 rounded-full overflow-hidden relative">
                <div className="diff-progress-bar absolute top-0 left-0 h-full w-0 bg-brand-green shadow-[0_0_10px_rgba(22,163,74,0.8)]"></div>
              </div>
            </div>
            <span className="text-white/30 text-xs font-bold tracking-[2px] uppercase animate-pulse">Swipe or Scroll Down</span>
          </div>

        </section>

        {/* ═══════════════════════════════════════ */}
        {/* SECTION 6: OUR VALUES                 */}
        {/* ═══════════════════════════════════════ */}
        <section ref={valuesRef} className="py-24 px-[5%] lg:px-[8%] bg-white">
          <div className="max-w-[1200px] mx-auto text-center mb-16">
            <h2 className="font-playfair text-5xl md:text-6xl font-bold text-brand-dark mb-4">Our Core Values</h2>
            <div className="w-12 h-[2px] bg-brand-green mx-auto"></div>
          </div>

          <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Real Food', desc: 'No gimmicks. No extreme diets. Just balanced meals made from real ingredients.', icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3' },
              { title: 'Consistency Wins', desc: 'Long-term habits matter more than short-term perfection.', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
              { title: 'Health Meets Heritage', desc: 'Nutrition should enhance culture, not replace it.', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' }
            ].map((val, i) => (
              <div key={i} className="value-card bg-[#f4f9f0] rounded-[2rem] p-10 flex flex-col items-center text-center shadow-sm border border-brand-green/10">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand-green shadow-md mb-8">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={val.icon} />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-brand-dark mb-4">{val.title}</h4>
                <p className="text-gray-600 font-medium leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════ */}
        {/* SECTION 7: IMPACT NUMBERS             */}
        {/* ═══════════════════════════════════════ */}
        <section ref={impactRef} className="py-20 px-[5%] border-t border-gray-100 bg-white">
          <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { target: 10000, suffix: '+', label: 'Meals Delivered' },
              { target: 500, suffix: '+', label: 'Active Subscribers' },
              { target: 95, suffix: '%', label: 'Customer Retention' },
              { target: 4.9, suffix: '★', label: 'Average Rating' }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-5xl md:text-6xl font-playfair font-bold text-brand-dark mb-2 flex items-center">
                  <span className="impact-number" data-target={stat.target}>0</span>
                  <span className="text-brand-green">{stat.suffix}</span>
                </div>
                <span className="text-xs uppercase tracking-[2px] font-bold text-gray-400">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════ */}
        {/* SECTION 8: FINAL CTA                  */}
        {/* ═══════════════════════════════════════ */}
        <section className="relative w-full py-32 px-[5%] overflow-hidden flex flex-col items-center justify-center text-center">
          <div className="absolute inset-0 w-full h-full">
            <img src={ctaBg} alt="Background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#0b1409]/80 backdrop-blur-sm"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1409] via-transparent to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-[800px] w-full flex flex-col items-center">
            <span className="text-brand-green text-xs font-bold uppercase tracking-[4px] mb-6">Start Today</span>
            <h2 className="font-playfair text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Healthy eating shouldn't feel like a compromise.
            </h2>
            <p className="text-lg md:text-xl text-white/70 font-medium leading-relaxed mb-10 max-w-[600px]">
              Join hundreds of Chennai residents building healthier lifestyles while enjoying food that still feels like home.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a href="https://wa.me/yourwhatsapplink" target="_blank" rel="noopener noreferrer" className="flex">
                <button className="bg-[#76c117] hover:bg-[#65a314] text-white text-xs font-bold uppercase tracking-[2px] px-8 py-4 rounded-full flex items-center gap-3 transition-all duration-300 shadow-[0_4px_25px_rgba(118,193,23,0.35)] hover:scale-105">
                  <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24"><path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.459 3.477 1.332 4.992L2 22l5.168-1.357c1.474.805 3.129 1.229 4.832 1.229h.01c5.506 0 9.988-4.482 9.988-9.988 0-2.663-1.037-5.167-2.92-7.053C17.18 3.037 14.675 2 12.012 2zm5.727 14.18c-.234.66-.69 1.155-1.282 1.458-.456.234-1.026.398-2.61-.258-2.18-.903-3.666-3.08-3.774-3.228-.108-.147-.887-1.178-.887-2.263 0-1.085.57-1.616.774-1.83.204-.213.447-.267.597-.267.15 0 .3 0 .432.006.138.006.324-.054.51.396.192.468.654 1.596.714 1.716.06.12.1.258.018.42-.084.162-.126.258-.252.408-.126.15-.264.336-.378.462-.114.126-.234.264-.102.492.132.228.588.966 1.26 1.566.864.774 1.596 1.014 1.824 1.122.228.108.36.09.492-.06.132-.15.57-.666.72-.9.15-.234.3-.198.51-.12.21.078 1.332.63 1.56.744.228.114.378.168.432.264.054.096.054.558-.18 1.218z" /></svg>
                  Apply for Membership
                </button>
              </a>
              <a href="/pricing" className="flex">
                <button className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-[2px] px-8 py-4 rounded-full flex items-center gap-3 transition-all duration-300 shadow-sm hover:scale-105">
                  View Membership Details
                </button>
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════ */}
        {/* FOOTER                                */}
        {/* ═══════════════════════════════════════ */}
        <footer id="contact" className="relative w-full bg-[#0b1409] text-white/70 py-16 px-[5%] border-t border-white/5 overflow-hidden">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10 pb-16">
            <div className="md:col-span-6 flex flex-col items-start text-left">
              <a href="/" className="mb-6 block">
                <img src={logo} alt="Fit Eat" className="h-[40px] w-auto transition-transform duration-300 hover:scale-102" />
              </a>
              <p className="text-sm md:text-base text-white/60 leading-relaxed mb-6 max-w-[450px]">
                A scalable food-tech ecosystem built for your goals—calories, protein, and real life. Our algorithmic planning and dynamic subscriptions power a seamless nutrition journey.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Tech-enabled', 'Algorithmic macros', 'Dynamic subscriptions'].map((pill, i) => (
                  <span key={i} className="bg-white/5 border border-white/10 text-white/80 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-[0.5px]">
                    {pill}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:col-span-3 flex flex-col items-start text-left">
              <h4 className="text-xs font-extrabold uppercase tracking-[2px] text-brand-green mb-6">Plan</h4>
              <div className="flex flex-col gap-4">
                {[
                  { label: 'How It Works', href: '/how-it-works' },
                  { label: 'Pricing', href: '/pricing' }
                ].map((link, i) => (
                  <a key={i} href={link.href} className="text-sm font-medium hover:text-white transition-colors duration-200">{link.label}</a>
                ))}
              </div>
            </div>
            <div className="md:col-span-3 flex flex-col items-start text-left">
              <h4 className="text-xs font-extrabold uppercase tracking-[2px] text-brand-green mb-6">Company</h4>
              <div className="flex flex-col gap-4">
                {[
                  { label: 'About Us', href: '/about-us' },
                  { label: 'Contact', href: '/contact' },
                  { label: 'FAQ', href: '#faq' }
                ].map((link, i) => (
                  <a key={i} href={link.href} className="text-sm font-medium hover:text-white transition-colors duration-200">{link.label}</a>
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
              <a href="#privacy" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
              <a href="#terms" className="hover:text-white transition-colors duration-200">Terms of Service</a>
            </div>
          </div>
        </footer>

    </div>
  );
}
