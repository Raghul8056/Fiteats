"use client";
import Link from 'next/link';

import React, { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import SplitType from 'split-type';

const logo = '/assets/logo.png';
const heroVideo = '/assets/Food.mp4';
const bowlImg = '/assets/bowl-transparent.png';

const leaf1 = '/assets/leaf1.png';
const leaf2 = '/assets/leaf2.png';
const leaf3 = '/assets/leaf3.png';
const leaf4 = '/assets/leaf4.png';
const eggImg = '/assets/egg.png';
const ch1 = '/assets/ch1.png';
const ch2 = '/assets/ch2.png';
const ch3 = '/assets/ch3.png';
const ch4 = '/assets/ch4.png';
const sec5Bowl = '/assets/sec5-bowl.png';
const section6Bowl = '/assets/bowl-section-6-nobg.png';
const sec5Leaf = '/assets/sec5-leaf.png';
const ctaBg = '/assets/cta_ecosystem_bg_v3.png';
const editedVideo = '/assets/edited.mp4';

const cardWorkingPro = '/assets/card-working-professional.png';
const cardBusinessOwner = '/assets/card-business-owner.png';
const cardFitness = '/assets/card-fitness-focused.png';
const cardHealthy = '/assets/card-healthy-eating.png';
const avatarIndian1 = '/assets/avatar-indian-1.png';
const avatarIndian2 = '/assets/avatar-indian-2.png';
const avatarIndian3 = '/assets/avatar-indian-3.png';

const bowl1 = '/assets/bowl.png';
const bowl2 = '/assets/bowl2.png';
const bowl3 = '/assets/bowl3.png';
const bowl4 = '/assets/bowl4.png';
const bowl5 = '/assets/bowl5.png';
const bowl6 = '/assets/bowl6.png';
const bowl7 = '/assets/bowl7.png';
const dosaPlate = '/assets/dosa_plate.png';

const menuItems = [
  {
    title: 'Superfood Amino-Packed Macro Bowl',
    subtitle: '+ Charred Tofu/Paneer & Herbed Tahini',
    badge: 'LIGHT',
    calories: '450 kcal',
    protein: '24g protein',
    image: bowlImg,
    fullDesc: "A stunning, antioxidant-packed bowl designed for metabolic wellness. Contains roasted sweet potatoes, charred broccoli, fresh avocado, massaged organic kale, and toasted pumpkin seeds, paired with clean cubes of spiced tofu or paneer and a rich, creamy, herbed sesame tahini dressing.",
    benefits: [
      "Micronutrient powerhouse loaded with vitamins A, C, E, and K",
      "Healthy monounsaturated fats from fresh avocado and sesame support heart health",
      "High antioxidant and anti-inflammatory properties from organic greens"
    ]
  },
  {
    title: "High-Protein Paneer Pepper Curry",
    subtitle: "+ Warm Brown Rice & Steamed Green Beans",
    badge: "COMFORT",
    calories: "490 kcal",
    protein: "32g protein",
    image: bowl2,
    fullDesc: "A comforting and hearty high-protein meal perfectly balanced for muscle recovery and sustained energy. Served with complex carbs and fiber-rich greens.",
    benefits: [
      "High-quality vegetarian protein for muscle repair",
      "Rich in complex carbohydrates for sustained energy",
      "Packed with dietary fiber from fresh green beans"
    ]
  },
  {
    title: "Max-Protein Grilled Paneer Salad",
    subtitle: "+ Spiced Bell Peppers & Mint Yogurt Dip",
    badge: "PROTEIN",
    calories: "490 kcal",
    protein: "32g protein",
    image: bowl3,
    fullDesc: "A refreshing, high-protein salad featuring perfectly grilled paneer cubes, crisp bell peppers, and a cooling mint yogurt dressing. Ideal for post-workout nutrition.",
    benefits: [
      "Maximum protein absorption with cooling yogurt",
      "Vitamin C boost from fresh bell peppers",
      "Low in simple carbohydrates, ideal for cutting phases"
    ]
  },
  {
    title: "High-Fibre Harvest Green Curry",
    subtitle: "+ Low-GI Barnyard Millet & Cucumber Salad",
    badge: "LIGHT",
    calories: "410 kcal",
    protein: "20g protein",
    image: bowl4,
    fullDesc: "A fragrant, nutrient-dense green curry paired with ancient grains. This low-GI meal provides sustained energy without the afternoon crash.",
    benefits: [
      "Low Glycemic Index prevents blood sugar spikes",
      "Rich in ancient grains for optimal gut health",
      "Hydrating side salad aids in digestion"
    ]
  },
  {
    title: "Crunchy Veggie Spring Rolls",
    subtitle: "+ Sweet Chilli Dip & Glass Noodles",
    badge: "LIGHT",
    calories: "380 kcal",
    protein: "12g protein",
    image: bowl5,
    fullDesc: "A light, crunchy, and satisfying option packed with julienned vegetables and delicate glass noodles, served with a tangy sweet chilli dip.",
    benefits: [
      "Light on calories but high in volume and satisfaction",
      "Rich in phytonutrients from varied colorful vegetables",
      "Perfect light meal for active rest days"
    ]
  },
  {
    title: "Max-Protein Keto Shrimp Bowl",
    subtitle: "+ Zesty Quinoa & Citrus Vinaigrette",
    badge: "PROTEIN",
    calories: "520 kcal",
    protein: "45g protein",
    image: bowl6,
    fullDesc: "A premium seafood bowl delivering a massive protein hit with minimal carbs. Perfectly seared shrimp atop a bed of zesty, nutrient-rich quinoa.",
    benefits: [
      "Exceptional lean protein source from premium shrimp",
      "Rich in Omega-3 fatty acids for brain and joint health",
      "Complete amino acid profile from quinoa base"
    ]
  },
  {
    title: "Antioxidant Rich Berry Smoothie Bowl",
    subtitle: "+ Chia Seeds, Granola & Fresh Berries",
    badge: "LIGHT",
    calories: "340 kcal",
    protein: "10g protein",
    image: bowl7,
    fullDesc: "A refreshing and sweet superfood bowl loaded with fresh berries, crunchy granola, and omega-rich chia seeds. Perfect for a light, energizing start.",
    benefits: [
      "Massive antioxidant boost combats oxidative stress",
      "Rich in Omega-3s and fiber from chia seeds",
      "Natural energy from complex carbs and fruit"
    ]
  },
  {
    title: "Almond Milk Oatmeal & Berries",
    subtitle: "+ Sliced Almonds, Pumpkin Seeds & Honey",
    badge: "LIGHT",
    calories: "390 kcal",
    protein: "14g protein",
    image: dosaPlate,
    fullDesc: "A comforting, dairy-free oatmeal bowl slow-cooked in almond milk, topped with a nutrient-dense trail mix of nuts and seeds.",
    benefits: [
      "Excellent source of soluble fiber for heart health",
      "Healthy fats from almonds and pumpkin seeds",
      "Sustained slow-release energy throughout the morning"
    ]
  }
];

gsap.registerPlugin(ScrollTrigger);


export default function App() {
  const containerRef = useRef(null);
  const firstCardRef = useRef(null);
  const visionBowlRef = useRef(null);
  const parallaxBowlRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [isFirstCardHovered, setIsFirstCardHovered] = useState(false);
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
    // 1. Initialize Lenis for Butter Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.5, // slightly longer for cinematic feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  useGSAP(() => {
    // Refresh ScrollTrigger after component settles
    ScrollTrigger.refresh();

    // Coordinate helpers for the transition
    const getInitialCoords = () => {
      const firstCard = firstCardRef.current;
      const wrapper = document.querySelector('.parallax-sections-wrapper');
      if (firstCard && wrapper) {
        const rect = firstCard.getBoundingClientRect();
        const wrapperRect = wrapper.getBoundingClientRect();
        // firstCard is now directly on the image, so rect.width is the exact target size.
        return {
          x: rect.left - wrapperRect.left + (rect.width / 2),
          y: rect.top - wrapperRect.top + (rect.height / 2),
          width: rect.width
        };
      }
      return { x: window.innerWidth * 0.15, y: 350, width: 200 };
    };

    const getVisionCoords = () => {
      const visionBowl = visionBowlRef.current;
      const wrapper = document.querySelector('.parallax-sections-wrapper');
      if (visionBowl && wrapper) {
        const rect = visionBowl.getBoundingClientRect();
        const wrapperRect = wrapper.getBoundingClientRect();
        // Since measurement is at scroll = 0, the container has starting offset x: window.innerWidth * 0.3.
        // Its final position is x: -window.innerWidth * 0.08.
        // Therefore, it shifts left by 0.38 * window.innerWidth.
        const deltaX = window.innerWidth * 0.38;
        return {
          x: rect.left - wrapperRect.left - deltaX + (rect.width / 2),
          y: rect.top - wrapperRect.top + (rect.height / 2),
          width: rect.width
        };
      }
      return { x: window.innerWidth * 0.72, y: window.innerHeight * 4.5, width: 600 };
    };

    // Set initial layout values for the parallax bowl
    const setInitialParallaxBowl = () => {
      const coords = getInitialCoords();
      gsap.set('.shared-parallax-bowl', {
        top: 0,
        left: 0,
        right: 'auto',
        x: coords.x,
        y: coords.y,
        xPercent: -50,
        yPercent: -50,
        width: coords.width,
        scale: 1,
        opacity: 1,
        transformOrigin: 'center center'
      });
    };

    setInitialParallaxBowl();

    // Re-run setInitialParallaxBowl on ScrollTrigger refreshes (e.g. resize) to update initial coordinates
    ScrollTrigger.addEventListener("refreshInit", setInitialParallaxBowl);

    // Performant ScrollTrigger to toggle navbar state (no raw scroll listeners)
    ScrollTrigger.create({
      start: 'top -20',
      onEnter: () => setIsScrolled(true),
      onLeaveBack: () => setIsScrolled(false),
    });

    // 2. Hero Section Animations
    gsap.killTweensOf('.nav-fade');
    gsap.killTweensOf('.hero-fade');

    const heroTl = gsap.timeline();
    heroTl.fromTo('.nav-fade', { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out' })
      .fromTo('.hero-fade', { opacity: 0, y: 40 }, {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power4.out"
      }, "-=0.4");

    // Hero Video Background Parallax on Scroll (Hardware Accelerated Zoom & Fade)
    gsap.to('.hero-video-bg', {
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5, // High smoothing for buttery background zoom
      },
      yPercent: 20,
      scale: 1.15,
      opacity: 0.25,
      force3D: true
    });

    // 3. Shared Bowl Parallax (Sections 2→5)
    let bowlTl;
    let bowlSt;

    const buildBowlTimeline = () => {
      if (bowlTl) bowlTl.kill();
      if (bowlSt) bowlSt.kill();

      const wrapperEl = document.querySelector('.parallax-sections-wrapper');
      if (!wrapperEl) return;

      const wrapperH = wrapperEl.getBoundingClientRect().height;
      const vH = window.innerHeight;
      const scrollDist = wrapperH - vH;

      const getSectionCenter = (sectionId) => {
        const section = document.querySelector(sectionId);
        if (section) {
          const wR = wrapperEl.getBoundingClientRect();
          const sR = section.getBoundingClientRect();
          return (sR.top - wR.top) + sR.height * 0.5;
        }
        return 0;
      };

      // Calculate scroll progress (0-1) when a y-position reaches viewport center
      const progressAt = (y) => Math.max(0.001, Math.min(0.999, (y - vH / 2) / scrollDist));

      // Calculate exact scroll progress when a y-position reaches the BOTTOM of the viewport
      const progressWhenVisible = (y) => Math.max(0.001, Math.min(0.999, (y - vH) / scrollDist));
      
      const getSectionTop = (sectionId) => {
        const section = document.querySelector(sectionId);
        if (section) {
          return section.getBoundingClientRect().top - wrapperEl.getBoundingClientRect().top;
        }
        return 0;
      };

      const p_about = progressAt(getSectionCenter('#about-us'));
      const p_whyChoose = progressAt(getSectionCenter('#how-it-works'));
      const p_whoFor = progressAt(getSectionCenter('#who-is-it-for'));

      // Calculate exactly when the 'About Us' subheading enters the bottom of the window.
      // The subheading is roughly at the top of the section + 100px padding.
      const aboutTopY = getSectionTop('#about-us') + 100;
      let waitDur = (aboutTopY - window.innerHeight) / scrollDist;
      
      // If the screen is extremely tall and it's already visible, fallback to 40% of the distance.
      if (waitDur <= 0) {
        waitDur = p_about * 0.4;
      }
      
      // Ensure the bowl has enough duration to actually animate smoothly (at least 15% of the total scroll)
      waitDur = Math.min(waitDur, p_about - 0.15);
      
      const d1 = Math.max(0.01, p_about - waitDur); 
      
      const d2 = Math.max(0.01, p_whyChoose - p_about);
      const d3 = Math.max(0.01, p_whoFor - p_whyChoose);
      const d4 = Math.max(0.01, 1 - p_whoFor);

      const isDesktop = window.innerWidth >= 1024;
      const BOWL_SCALE = isDesktop ? 3.8 : 2.5;
      
      // Calculate exact X bounds based on scaled bowl radius to prevent ANY cropping
      const baseWidth = getInitialCoords().width * 1.18; // Incorporate the inner image scale
      const bowlRadius = (baseWidth * BOWL_SCALE) / 2;
      
      const rightEdgeX = isDesktop ? window.innerWidth - bowlRadius - 20 : window.innerWidth / 2; 
      const leftEdgeX = isDesktop ? bowlRadius + 20 : window.innerWidth / 2;
      
      const bowlRadiusSmall = (baseWidth * (isDesktop ? 2.6 : 1.8)) / 2;
      const rightEdgeSmallX = isDesktop ? window.innerWidth - bowlRadiusSmall - 20 : window.innerWidth / 2;

      bowlTl = gsap.timeline();

      // Step 0: Wait on the first card
      bowlTl.to('.shared-parallax-bowl', {
        duration: waitDur
      }, 'step0')

      // Step 1: Card → About Us
      .to('.shared-parallax-bowl', {
        y: getSectionCenter(isDesktop ? '#about-us' : '#about-anchor'),
        scale: BOWL_SCALE,
        rotation: -20,
        duration: d1,
        ease: 'power2.inOut'
      }, 'step1')
      .to('.shared-parallax-bowl', {
        x: rightEdgeX,
        duration: d1,
        ease: 'back.out(1.5)'
      }, 'step1')

      // Step 2: About Us → Why Choose
      .to('.shared-parallax-bowl', {
        y: getSectionCenter(isDesktop ? '#how-it-works' : '#why-choose-anchor'),
        scale: BOWL_SCALE,
        rotation: 20, 
        duration: d2,
        ease: 'power2.inOut'
      }, 'step2')
      .to('.shared-parallax-bowl', {
        x: leftEdgeX,
        duration: d2,
        ease: 'back.out(1.5)'
      }, 'step2')

      // Calculate the much smaller radius for the Who Is It For section so it doesn't cover cards
      const bowlRadiusTiny = (baseWidth * (isDesktop ? 1.5 : 1.2)) / 2;
      const rightEdgeTinyX = isDesktop ? window.innerWidth - bowlRadiusTiny - 20 : window.innerWidth / 2;

      // Step 3: Why Choose → Who Is It For
      bowlTl.to('.shared-parallax-bowl', {
        y: getSectionCenter('#who-is-it-for') - window.innerHeight * (isDesktop ? 0.25 : 0.35),
        scale: isDesktop ? 1.5 : 1.2,
        rotation: -20,
        duration: d3,
        ease: 'power2.inOut'
      }, 'step3')
      .to('.shared-parallax-bowl', {
        x: rightEdgeTinyX,
        duration: d3,
        ease: 'back.out(1.5)'
      }, 'step3')

      // Step 4: Who Is It For → SCROLL OUTSIDE
      // Use a short duration so it quickly shoots off screen when scrolling down from Who Is It For
      const exitDur = Math.min(0.08, d4);
      bowlTl.to('.shared-parallax-bowl', {
        y: getSectionCenter('#who-is-it-for') + window.innerHeight * 0.5,
        x: window.innerWidth + bowlRadiusTiny * 2 + 100, // Safely far off screen right
        scale: 1.5,
        rotation: 45,
        duration: exitDur,
        ease: 'power2.in'
      })
      // Keep it hidden off-screen for the remainder of the scroll
      .to('.shared-parallax-bowl', {
        x: window.innerWidth + bowlRadiusTiny * 2 + 100,
        duration: Math.max(0.001, d4 - exitDur)
      });

      bowlSt = ScrollTrigger.create({
        animation: bowlTl,
        trigger: wrapperEl,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5 // High smoothing for a buttery fluid bowl animation
      });
    };

    // Build timeline after layout stabilizes, and guarantee a refresh after custom fonts load
    setTimeout(buildBowlTimeline, 100);
    if (document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }
    
    ScrollTrigger.addEventListener('refresh', buildBowlTimeline);

    // 3a. Section 5 Bowl Circular Graphic Scroll-In Animation
    gsap.fromTo('.sec5-graphic-container', {
      x: () => window.innerWidth * 0.3,
      rotation: 45,
      scale: 0.95
    }, {
      scrollTrigger: {
        trigger: '.parallax-sections-wrapper',
        start: () => `bottom-=${window.innerHeight * 2.0} bottom`,
        end: () => `bottom-=${window.innerHeight * 1.0} bottom`,
        scrub: 1.5, // High smoothing
      },
      x: () => -(window.innerWidth * 0.08),
      rotation: 0,
      scale: 1,
      ease: 'none'
    });

    // 3b. Floating Coriander Leaves Parallax
    gsap.to('.leaf-1', {
      scrollTrigger: {
        trigger: '.parallax-sections-wrapper',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
      },
      y: () => window.innerHeight * 1.5,
      x: 100,
      rotation: 180,
      ease: 'none'
    });

    gsap.to('.leaf-2', {
      scrollTrigger: {
        trigger: '.parallax-sections-wrapper',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.0,
      },
      y: () => window.innerHeight * 0.8,
      x: -150,
      rotation: -140,
      ease: 'none'
    });

    gsap.to('.leaf-3', {
      scrollTrigger: {
        trigger: '.parallax-sections-wrapper',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
      },
      y: () => window.innerHeight * 1.1,
      x: 120,
      rotation: 240,
      ease: 'none'
    });

    gsap.to('.leaf-4', {
      scrollTrigger: {
        trigger: '.parallax-sections-wrapper',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      },
      y: () => window.innerHeight * 0.7,
      x: -100,
      rotation: -180,
      ease: 'none'
    });

    gsap.to('.leaf-5', {
      scrollTrigger: {
        trigger: '.parallax-sections-wrapper',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
      },
      y: () => window.innerHeight * 1.4,
      x: 80,
      rotation: 160,
      ease: 'none'
    });

    gsap.to('.leaf-6', {
      scrollTrigger: {
        trigger: '.parallax-sections-wrapper',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.0,
      },
      y: () => window.innerHeight * 0.9,
      x: -120,
      rotation: -150,
      ease: 'none'
    });

    gsap.to('.leaf-7', {
      scrollTrigger: {
        trigger: '.parallax-sections-wrapper',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
      },
      y: () => window.innerHeight * 1.2,
      x: 100,
      rotation: 210,
      ease: 'none'
    });

    gsap.to('.leaf-8', {
      scrollTrigger: {
        trigger: '.parallax-sections-wrapper',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      },
      y: () => window.innerHeight * 0.8,
      x: -80,
      rotation: -190,
      ease: 'none'
    });

    gsap.to('.leaf-9', {
      scrollTrigger: {
        trigger: '.parallax-sections-wrapper',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
      },
      y: () => window.innerHeight * 1.5,
      x: 90,
      rotation: 170,
      ease: 'none'
    });

    gsap.to('.leaf-10', {
      scrollTrigger: {
        trigger: '.parallax-sections-wrapper',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      },
      y: () => window.innerHeight * 0.9,
      x: -110,
      rotation: -160,
      ease: 'none'
    });

    gsap.to('.egg-1', {
      scrollTrigger: { trigger: '.parallax-sections-wrapper', start: 'top top', end: 'bottom bottom', scrub: 1.5 },
      y: () => window.innerHeight * -1.2,
      x: -30,
      rotation: 70,
      ease: 'none'
    });

    gsap.to('.egg-2', {
      scrollTrigger: { trigger: '.parallax-sections-wrapper', start: 'top top', end: 'bottom bottom', scrub: 1.1 },
      y: () => window.innerHeight * -0.8,
      x: 25,
      rotation: -60,
      ease: 'none'
    });

    gsap.to('.egg-3', {
      scrollTrigger: { trigger: '.parallax-sections-wrapper', start: 'top top', end: 'bottom bottom', scrub: 1.3 },
      y: () => window.innerHeight * -1.0,
      x: 45,
      rotation: 110,
      ease: 'none'
    });

    gsap.to('.float-ch-1', {
      scrollTrigger: { trigger: '.parallax-sections-wrapper', start: 'top top', end: 'bottom bottom', scrub: 1.3 },
      y: () => window.innerHeight * -0.9,
      x: 40,
      rotation: -30,
      ease: 'none'
    });

    gsap.to('.float-ch-2', {
      scrollTrigger: { trigger: '.parallax-sections-wrapper', start: 'top top', end: 'bottom bottom', scrub: 1.6 },
      y: () => window.innerHeight * -1.1,
      x: -25,
      rotation: 40,
      ease: 'none'
    });

    gsap.to('.float-ch-3', {
      scrollTrigger: { trigger: '.parallax-sections-wrapper', start: 'top top', end: 'bottom bottom', scrub: 1.4 },
      y: () => window.innerHeight * -0.8,
      x: 35,
      rotation: -50,
      ease: 'none'
    });

    gsap.to('.float-ch-4', {
      scrollTrigger: { trigger: '.parallax-sections-wrapper', start: 'top top', end: 'bottom bottom', scrub: 1.2 },
      y: () => window.innerHeight * -0.7,
      x: -45,
      rotation: 60,
      ease: 'none'
    });

    return () => {
      ScrollTrigger.removeEventListener("refreshInit", setInitialParallaxBowl);
    };
  }, { scope: containerRef });

  return (
    <div className="app-container bg-brand-dark min-h-screen" ref={containerRef}>


        <div className="grain-overlay"></div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full h-[80px] z-50 flex items-center transition-all duration-300 ${isScrolled
        ? 'premium-glass-nav'
        : 'premium-glass-nav-top'
        }`}>
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8 flex items-center justify-between h-full">
          {/* Left Column (Logo) */}
          <div className="nav-fade flex-1 flex items-center justify-start h-full">
            <Link href="/" className="flex items-center">
              <img src={logo} alt="Fit Eat" className="h-[40px] w-auto block transition-transform duration-300 hover:scale-105" />
            </Link>
          </div>

          {/* Middle Column (Links) */}
          <div className="hidden md:flex flex-initial items-center justify-center gap-10 nav-fade h-full">
            {['How It Works', 'Pricing', 'About Us', 'Contact'].map(link => {
              let href = `#${link.toLowerCase().replace(/ /g, '-')}`;
              if (link === 'How It Works') href = '/how-it-works';
              if (link === 'Pricing') href = '/pricing';
              if (link === 'About Us') href = '/about-us';
              if (link === 'Contact') href = '/contact';
              return (
                <Link key={link} href={href} className="text-xs font-bold tracking-[2px] text-white/70 uppercase hover:text-brand-green transition-colors duration-300">{link}</Link>
              );
            })}
          </div>

          {/* Right Column (Button) */}
          <div className="nav-fade flex-1 flex items-center justify-end h-full">
            {/* Apply for Membership Button */}
            <Link href="https://wa.me/yourwhatsapplink" target="_blank" rel="noopener noreferrer" className="flex">
              <button className="bg-[#3f6b15] hover:bg-[#325611] text-white text-xs font-bold uppercase tracking-[1px] px-5 py-2.5 rounded-full border border-white/5 transition-all duration-300 hover:scale-105">
                Apply for Membership
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* 1. Cinematic Hero Section */}
      <header className="hero-section relative w-full min-h-screen bg-brand-light flex items-center justify-center px-4 pt-[120px] pb-12 overflow-hidden text-center">

        {/* Static black backdrop (not affected by GSAP opacity animation) */}
        <div className="absolute inset-y-0 left-3 right-3 bg-black z-0"></div>

        {/* Hero Video Background */}
        <div className="hero-video-bg absolute inset-y-0 left-3 right-3 overflow-hidden will-change-transform z-0">
          <video autoPlay loop muted playsInline className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover opacity-85">
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent"></div>
        </div>

        {/* Centered Text & Content */}
        <div className="w-full max-w-[900px] z-10 flex flex-col items-center justify-center text-center">

          {/* Tagline */}
          <div className="flex items-center justify-center gap-3 mb-6 hero-fade">
            <div className="w-8 h-[2px] bg-brand-green"></div>
            <span className="text-white/80 text-xs md:text-sm font-bold uppercase tracking-[3px]">
              Chennai's Leading Food-Tech Fitness Platform
            </span>
            <div className="w-8 h-[2px] bg-brand-green"></div>
          </div>

          {/* Title */}
          <h1 className="font-playfair text-[3.5rem] md:text-[5.5rem] leading-[1.08] font-bold text-white mb-8 tracking-tight hero-fade">
            Eat What You Love.<br />
            <span className="text-brand-green font-playfair">Still Hit Your Goals.</span>
          </h1>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10 hero-fade">
            <Link href="https://wa.me/yourwhatsapplink" target="_blank" rel="noopener noreferrer" className="flex">
              <button className="bg-[#76c117] hover:bg-[#65a314] text-white text-xs font-bold uppercase tracking-[2px] px-8 py-4 rounded-full flex items-center gap-3 transition-all duration-300 shadow-[0_4px_25px_rgba(118,193,23,0.35)] hover:scale-105">
                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.459 3.477 1.332 4.992L2 22l5.168-1.357c1.474.805 3.129 1.229 4.832 1.229h.01c5.506 0 9.988-4.482 9.988-9.988 0-2.663-1.037-5.167-2.92-7.053C17.18 3.037 14.675 2 12.012 2zm5.727 14.18c-.234.66-.69 1.155-1.282 1.458-.456.234-1.026.398-2.61-.258-2.18-.903-3.666-3.08-3.774-3.228-.108-.147-.887-1.178-.887-2.263 0-1.085.57-1.616.774-1.83.204-.213.447-.267.597-.267.15 0 .3 0 .432.006.138.006.324-.054.51.396.192.468.654 1.596.714 1.716.06.12.1.258.018.42-.084.162-.126.258-.252.408-.126.15-.264.336-.378.462-.114.126-.234.264-.102.492.132.228.588.966 1.26 1.566.864.774 1.596 1.014 1.824 1.122.228.108.36.09.492-.06.132-.15.57-.666.72-.9.15-.234.3-.198.51-.12.21.078 1.332.63 1.56.744.228.114.378.168.432.264.054.096.054.558-.18 1.218z" />
                </svg>
                Apply for Membership
              </button>
            </Link>
            <Link href="#meals" className="flex">
              <button className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-[2px] px-8 py-4 rounded-full flex items-center gap-3 transition-all duration-300 shadow-sm hover:scale-105">
                View Membership Details
                <div className="w-6 h-6 rounded-full bg-white text-brand-dark flex items-center justify-center">
                  <svg className="w-3 h-3 translate-x-[1px]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 hero-fade">
            <div className="flex -space-x-3">
              <img className="w-10 h-10 rounded-full border-2 border-brand-dark object-cover" src={avatarIndian1} alt="Chennai User 1" />
              <img className="w-10 h-10 rounded-full border-2 border-brand-dark object-cover" src={avatarIndian2} alt="Chennai User 2" />
              <img className="w-10 h-10 rounded-full border-2 border-brand-dark object-cover" src={avatarIndian3} alt="Chennai User 3" />
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex text-[#76c117] text-sm gap-0.5">
                {'★'.repeat(5)}
              </div>
              <p className="text-xs text-white/60 font-bold mt-1">
                Trusted by <span className="text-white font-extrabold">1,500+</span> Chennai fitness enthusiasts
              </p>
            </div>
          </div>

        </div>

      </header>

      {/* 2 & 3. Parallax Sections Wrapper (Meals, About & Why Choose) */}
      <div className="parallax-sections-wrapper relative w-full overflow-hidden bg-brand-light">
        <div className="shared-parallax-bowl absolute z-40 pointer-events-none">
          <img 
            src={bowlImg} 
            ref={parallaxBowlRef} 
            alt="FitEats Signature Bowl" 
            style={{ 
              transform: isFirstCardHovered 
                ? 'translate(0, -28px) rotate(8deg) scale(1.298)' 
                : 'translate(0, 0) rotate(0deg) scale(1.18)' 
            }}
            className="w-full h-full object-contain transition-transform duration-500 ease-out" 
          />
        </div>

        {/* Explore the Menu Section */}
        <section id="meals" className="relative w-full bg-brand-light py-20 px-[5%] lg:px-[8%] border-b border-gray-200/20 scroll-mt-20">
          <div className="w-full text-left">
            {/* Header Area */}
            <div className="mb-16 max-w-[720px]">
              {/* Tagline */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[2px] bg-brand-green"></div>
                <span className="text-brand-green text-sm md:text-base font-bold uppercase tracking-[3px]">
                  Our Menu
                </span>
              </div>

              {/* Title */}
              <h2 className="font-playfair text-7xl md:text-[6rem] leading-[1.05] font-bold text-brand-dark mb-4 tracking-tight">
                Explore the <span className="text-brand-green font-playfair">Menu</span>
              </h2>
              <div className="w-12 h-[3px] bg-[#76c117] mb-8"></div>

              {/* Description */}
              <p className="text-2xl md:text-[1.6rem] text-gray-600 leading-relaxed font-medium max-w-[720px]">
                Not a fixed weekly menu, but the flavours you can expect when you subscribe. Tap a card for more detail.
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {menuItems.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedMeal(item)}
                  onMouseEnter={() => idx === 0 && setIsFirstCardHovered(true)}
                  onMouseLeave={() => idx === 0 && setIsFirstCardHovered(false)}
                  className="group relative flex flex-col cursor-pointer mt-20 hover:-translate-y-3 transition-transform duration-500 ease-out"
                >
                  {/* Card Background */}
                  <div className="absolute inset-0 top-[80px] bg-gradient-to-b from-[#f4f9f0] to-white backdrop-blur-md rounded-[2.5rem] border border-white shadow-[0_15px_40px_rgba(0,0,0,0.04)] group-hover:shadow-[0_25px_50px_rgba(118,193,23,0.15)] transition-all duration-500 z-0"></div>

                  {/* Image Wrapper */}
                  <div className="absolute top-0 left-0 w-full flex justify-center z-10 pointer-events-none mt-[-20px]">
                    <div className="relative w-[220px] h-[220px] sm:w-[240px] sm:h-[240px] flex items-center justify-center">
                      {/* Organic Soft Glow */}
                      <div className="absolute w-[90%] h-[90%] bg-brand-green/20 rounded-full blur-[30px] group-hover:bg-brand-green/35 group-hover:scale-110 transition-all duration-500 z-0"></div>
                      
                      {/* Custom Circular Shadow (Replaces drop-shadow on image) */}
                      <div className="absolute w-[75%] h-[75%] top-[20%] bg-black/15 rounded-full blur-[25px] group-hover:bg-black/20 group-hover:scale-110 group-hover:translate-y-2 transition-all duration-500 z-0"></div>

                      {/* Floating Ingredients */}
                      <img src={leaf1} alt="" className="absolute w-12 h-12 -left-2 top-10 opacity-0 group-hover:opacity-100 group-hover:-translate-x-6 group-hover:-translate-y-6 group-hover:rotate-[-25deg] transition-all duration-700 ease-out z-10" />
                      <img src={leaf2} alt="" className="absolute w-10 h-10 right-0 bottom-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-6 group-hover:translate-y-4 group-hover:rotate-[35deg] transition-all duration-700 ease-out delay-75 z-10" />

                      {/* Main Food Image Mask to perfectly crop the white square backgrounds */}
                      <div 
                        ref={idx === 0 ? firstCardRef : null}
                        style={{ visibility: idx === 0 ? 'hidden' : 'visible', opacity: idx === 0 ? 0 : 1 }}
                        className={`relative w-[96%] h-[96%] rounded-full overflow-hidden z-20 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-[8deg] group-hover:-translate-y-4 ${idx !== 0 ? 'mix-blend-multiply' : ''}`}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover scale-[1.18]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-[90px] right-4 sm:right-6 bg-white border border-gray-100 text-brand-dark text-[10px] font-bold tracking-[2px] uppercase px-3 py-1.5 rounded-full shadow-sm z-20 group-hover:bg-brand-green group-hover:text-white transition-colors duration-300">
                    {item.badge}
                  </div>

                  {/* Content Section */}
                  <div className="relative z-10 px-6 pb-8 pt-[220px] flex flex-col flex-1 text-center items-center">
                    <h3 className="font-playfair text-xl md:text-[22px] font-bold text-brand-dark leading-snug mb-2 group-hover:text-brand-green transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-500 font-medium leading-relaxed mb-6">
                      {item.subtitle}
                    </p>

                    {/* Metrics & Footer */}
                    <div className="mt-auto flex flex-col gap-6 w-full items-center">
                      <div className="flex items-center justify-center gap-3 w-full">
                        {/* Calories */}
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-orange-100/50 text-[#c27c38] rounded-xl text-xs font-bold shadow-[0_2px_10px_rgba(0,0,0,0.02)] group-hover:border-orange-200 transition-colors duration-300">
                          <svg className="w-3.5 h-3.5 fill-current text-[#c27c38]" viewBox="0 0 24 24">
                            <path d="M17.66 11.2C17.43 8 15.32 5.08 12.16 4.04c-.45-.15-.9.18-.83.65.6 3.73-1.63 6.01-3.23 7.6C6.54 13.9 5 15.93 5 18.2c0 3.76 3.09 6.8 6.9 6.8 3.82 0 6.9-3.04 6.9-6.8 0-2.67-1.39-5.18-1.14-7z" />
                          </svg>
                          {item.calories}
                        </span>
                        {/* Protein */}
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-green-100/50 text-[#2e7d32] rounded-xl text-xs font-bold shadow-[0_2px_10px_rgba(0,0,0,0.02)] group-hover:border-green-200 transition-colors duration-300">
                          <svg className="w-3.5 h-3.5 fill-none stroke-current text-[#2e7d32]" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4M16 17H4m0 0l4 4m-4-4l4-4" />
                          </svg>
                          {item.protein}
                        </span>
                      </div>

                      {/* Footer link */}
                      <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-white group-hover:shadow-[0_8px_20px_rgba(118,193,23,0.3)] transition-all duration-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Floating Coriander Leaves */}
        <img src={leaf1} alt="" className="absolute pointer-events-none z-10 parallax-leaf leaf-1" />
        <img src={leaf2} alt="" className="absolute pointer-events-none z-40 parallax-leaf leaf-2" />
        <img src={leaf3} alt="" className="absolute pointer-events-none z-10 parallax-leaf leaf-3" />
        <img src={leaf4} alt="" className="absolute pointer-events-none z-40 parallax-leaf leaf-4" />
        <img src={leaf1} alt="" className="absolute pointer-events-none z-10 parallax-leaf leaf-5" />
        <img src={leaf2} alt="" className="absolute pointer-events-none z-40 parallax-leaf leaf-6" />
        <img src={leaf3} alt="" className="absolute pointer-events-none z-10 parallax-leaf leaf-7" />
        <img src={leaf4} alt="" className="absolute pointer-events-none z-40 parallax-leaf leaf-8" />
        <img src={leaf1} alt="" className="absolute pointer-events-none z-10 parallax-leaf leaf-9" />
        <img src={leaf2} alt="" className="absolute pointer-events-none z-40 parallax-leaf leaf-10" />
        <img src={eggImg} alt="" className="absolute pointer-events-none z-30 parallax-leaf egg-1" style={{ top: '22%', right: '2%', width: '140px', transform: 'rotate(15deg)' }} />
        <img src={eggImg} alt="" className="absolute pointer-events-none z-10 parallax-leaf egg-2" style={{ top: '65%', left: '4%', width: '120px', transform: 'rotate(-25deg)' }} />
        
        <img src={ch1} alt="" className="absolute pointer-events-none z-20 parallax-leaf float-ch-1" style={{ top: '35%', left: '6%', width: '180px', transform: 'rotate(10deg)' }} />
        <img src={ch2} alt="" className="absolute pointer-events-none z-20 parallax-leaf float-ch-2" style={{ top: '50%', right: '7%', width: '150px', transform: 'rotate(-15deg)' }} />
        <img src={ch3} alt="" className="absolute pointer-events-none z-20 parallax-leaf float-ch-3" style={{ top: '75%', left: '10%', width: '190px', transform: 'rotate(20deg)' }} />
        <img src={ch4} alt="" className="absolute pointer-events-none z-20 parallax-leaf float-ch-4" style={{ top: '85%', right: '12%', width: '160px', transform: 'rotate(-20deg)' }} />

        {/* Section 2: About */}
        <section id="about-us" className="relative flex flex-col lg:flex-row min-h-[100vh] py-[10vh] scroll-mt-20">
          <div className="w-full lg:w-1/2 flex flex-col justify-center pl-[5%] lg:pl-[8%] pr-[5%] z-20">

            {/* Tagline */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-brand-green"></div>
              <span className="text-brand-green text-sm md:text-base font-bold uppercase tracking-[3px]">
                About Us
              </span>
            </div>

            {/* Title */}
            <h2 className="font-playfair text-7xl md:text-[6rem] leading-[1.05] font-bold text-brand-dark mb-4 tracking-tight">
              About <span className="text-brand-green font-playfair">FitEats</span>
            </h2>
            <div className="w-12 h-[3px] bg-[#76c117] mb-8"></div>

            {/* Description */}
            <div className="text-2xl md:text-[1.6rem] text-gray-600 leading-relaxed mb-10 font-medium flex flex-col gap-6 max-w-[720px]">
              <p>
                FitEats helps busy professionals and health-conscious individuals stay on track with their nutrition without compromising on taste.
              </p>
              <p>
                Unlike typical diet food, our meals feel like home-style, familiar food—customized to your calorie and protein needs.
              </p>
            </div>

            {/* Features Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 border-t border-gray-200/80 pt-8 max-w-[780px]">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 21l7.03-3.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9z" />
                    </svg>
                  ),
                  title: 'Real Food',
                  desc: 'Wholesome, fresh ingredients.'
                },
                {
                  icon: (
                    <svg className="w-5 h-5 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="6" />
                      <circle cx="12" cy="12" r="2" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                    </svg>
                  ),
                  title: 'Goal-Focused',
                  desc: 'Meals tailored to your goals.'
                },
                {
                  icon: (
                    <svg className="w-5 h-5 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-3.314 0-6 2.239-6 5 0 .86.261 1.666.713 2.348C5.556 10.96 5 11.91 5 13c0 2.21 2.239 4 5 4h4c2.761 0 5-1.79 5-4 0-1.09-.556-2.04-1.713-2.652.452-.682.713-1.488.713-2.348 0-2.761-2.686-5-6-5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 17v3h8v-3" />
                    </svg>
                  ),
                  title: 'Home-Style Taste',
                  desc: 'Comforting flavors you already love.'
                },
                {
                  icon: (
                    <svg className="w-5 h-5 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h2.25L12 9.75l1.5 4.5L14.25 12H16" />
                    </svg>
                  ),
                  title: 'Consistent Results',
                  desc: 'Nutrition that fits your lifestyle.'
                }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-start text-left">
                  <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center mb-3">
                    {item.icon}
                  </div>
                  <h4 className="text-lg md:text-xl font-bold text-brand-dark mb-2">{item.title}</h4>
                  <p className="text-base text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Bottom Banner Card */}
            <div className="bg-[#f9f7f2] rounded-2xl p-6 md:p-8 flex items-center gap-6 max-w-[780px] border border-gray-100 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#4b8214] flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="text-left">
                <h4 className="text-xl md:text-2xl font-bold text-brand-dark mb-1.5">Good Food. Better You.</h4>
                <p className="text-lg text-gray-600 font-medium leading-relaxed">
                  We believe healthy eating should be simple, satisfying, and sustainable.
                </p>
              </div>
            </div>

          </div>
          <div id="about-anchor" className="w-full lg:w-1/2 min-h-[50vw] md:min-h-[400px] lg:min-h-0"></div>
        </section>

        {/* Section 3: Why Choose */}
        <section id="how-it-works" className="relative flex flex-col lg:flex-row min-h-[100vh] pb-[15vh] scroll-mt-20">
          {/* Left Column (Empty for bowl parallax) */}
          <div id="why-choose-anchor" className="w-full lg:w-1/2 min-h-[50vw] md:min-h-[400px] lg:min-h-0"></div>

          {/* Right Column: holds the text and cards */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center pr-[5%] lg:pr-[8%] pl-[5%] z-20 text-left items-start">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-brand-green"></div>
              <span className="text-brand-green text-xs md:text-sm font-bold uppercase tracking-[3px]">
                Why Choose FitEats
              </span>
            </div>

            <h2 className="font-playfair text-7xl md:text-[6rem] leading-[1.05] font-bold text-brand-dark mb-4 tracking-tight">
              Why Choose <span className="text-brand-green font-playfair">FitEats</span>
            </h2>

            <p className="text-2xl md:text-[1.6rem] text-gray-600 leading-relaxed mb-10 font-medium max-w-[720px]">
              We make healthy eating simple, enjoyable, and built around your lifestyle.
            </p>

            <div className="flex flex-col gap-5 w-full max-w-[780px]">
              {[
                {
                  title: 'Taste-friendly diet meals',
                  desc: 'Not boring diet food.',
                  leftIcon: (
                    <svg className="w-6 h-6 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="3" y="9" width="18" height="11" rx="2" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 9V6a4 4 0 018 0v3M3 13h18" />
                    </svg>
                  ),
                  rightIcon: (
                    <svg className="w-6 h-6 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 3v8M6 3v4a2 2 0 002 2h0a2 2 0 002-2V3M8 11v10M16 3v8M18 3v4a2 2 0 00-2 2h0a2 2 0 00-2-2V3M16 11v10" />
                    </svg>
                  )
                },
                {
                  title: 'Customized calorie & protein plans',
                  desc: 'Personalized to match your goals and lifestyle.',
                  leftIcon: (
                    <svg className="w-6 h-6 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 19h16M4 15h3v4H4v-4zm6-5h3v9h-3v-9zm6-5h3v14h-3V5z" />
                    </svg>
                  ),
                  rightIcon: (
                    <svg className="w-6 h-6 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  )
                },
                {
                  title: 'Flexible subscriptions',
                  desc: 'Pause / Resume anytime.',
                  leftIcon: (
                    <svg className="w-6 h-6 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="16" rx="2" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                  ),
                  rightIcon: (
                    <svg className="w-6 h-6 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17" />
                    </svg>
                  )
                },
                {
                  title: 'Daily fresh delivery',
                  desc: 'Freshly prepared meals, delivered to your doorstep.',
                  leftIcon: (
                    <svg className="w-6 h-6 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-12h3l4 4v8a1 1 0 01-1 1h-1m-10 1a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  ),
                  rightIcon: (
                    <svg className="w-6 h-6 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2m3 0a1 1 0 011 1v5h-4M5 8h12v7H5V8zm0 7a2 2 0 100 4 2 2 0 000-4zm12 0a2 2 0 100 4 2 2 0 000-4zM2 10h3M2 13h2" />
                    </svg>
                  )
                },
                {
                  title: 'Easy WhatsApp support',
                  desc: 'Quick resolutions. Real human support.',
                  leftIcon: (
                    <svg className="w-6 h-6 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ),
                  rightIcon: (
                    <svg className="w-6 h-6 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  )
                }
              ].map((card, idx) => (
                <div key={idx} className="bg-white/80 backdrop-blur-md border border-gray-200/40 shadow-[0_8px_20px_rgba(0,0,0,0.02)] rounded-[1.25rem] p-5 flex items-center justify-between w-full hover:shadow-[0_12px_24px_rgba(0,0,0,0.04)] transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                      {card.leftIcon}
                    </div>
                    <div className="text-left">
                      <h4 className="text-lg font-bold text-brand-dark mb-0.5">{card.title}</h4>
                      <p className="text-sm text-gray-500 font-medium leading-relaxed">{card.desc}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 pl-4">
                    {card.rightIcon}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Who Is It For */}
        <section id="who-is-it-for" className="relative flex flex-col min-h-[100vh] py-[10vh] px-[5%] lg:px-[8%] z-20 text-center items-center justify-center scroll-mt-20">
          <img src={eggImg} alt="" className="absolute pointer-events-none z-30 parallax-leaf egg-3" style={{ top: '15%', left: '8%', width: '130px', transform: 'rotate(40deg)' }} />
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-brand-green"></div>
            <span className="text-brand-green text-xs md:text-sm font-bold uppercase tracking-[3px]">
              Who Is It For
            </span>
            <div className="w-8 h-[2px] bg-brand-green"></div>
          </div>

          <h2 className="font-playfair text-7xl md:text-[6rem] leading-[1.05] font-bold text-brand-dark mb-6 tracking-tight">
            Who Is It <span className="text-brand-green font-playfair">For?</span>
          </h2>

          <p className="text-2xl md:text-[1.6rem] text-gray-600 leading-relaxed max-w-[800px] mx-auto mb-16 font-medium">
            FitEats is designed for real lives and real goals.<br />
            Whether you're building your career, your business, or your best self.
          </p>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full max-w-[1400px] mx-auto mb-16">
            {[
              {
                title: 'Working Professionals',
                subtitle: '(Age 25–42)',
                desc: "Busy schedules shouldn't stop you from eating right. We make healthy eating simple and stress-free.",
                image: cardWorkingPro,
                icon: (
                  <svg className="w-5 h-5 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="7" width="18" height="12" rx="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2" />
                  </svg>
                )
              },
              {
                title: 'Business Owners',
                desc: "Long hours, back-to-back meetings? We've got your nutrition covered, so you can focus on growing more.",
                image: cardBusinessOwner,
                icon: (
                  <svg className="w-5 h-5 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )
              },
              {
                title: 'Fitness-Focused Individuals',
                desc: 'Hitting your macros just got easier. Fuel your workouts and recover the right way.',
                image: cardFitness,
                icon: (
                  <svg className="w-5 h-5 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 8h2a1 1 0 011 1v6a1 1 0 01-1 1h-2M6 8H4a1 1 0 00-1 1v6a1 1 0 001 1h2M8 12h8M8 6h2v12H8V6zm6 0h2v12h-2V6z" />
                  </svg>
                )
              },
              {
                title: 'Anyone Looking for Convenient Healthy Eating',
                desc: 'No time to cook? We deliver fresh, tasty, and balanced meals right to your door.',
                image: cardHealthy,
                icon: (
                  <svg className="w-5 h-5 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                )
              }
            ].map((col, idx) => (
              <div key={idx} className="relative flex flex-col bg-white/70 backdrop-blur-md border border-gray-200/40 rounded-[2rem] p-8 shadow-[0_15px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition-all duration-300 text-left">
                {/* Badge Icon */}
                <div className="absolute -top-5 left-8 w-14 h-14 rounded-2xl bg-[#fdfbf7] border border-gray-200/50 shadow-md flex items-center justify-center z-30">
                  <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center">
                    {col.icon}
                  </div>
                </div>

                {/* Image */}
                <div className="w-full h-[280px] rounded-2xl overflow-hidden mb-6 relative z-10">
                  <img src={col.image} alt={col.title} className="w-full h-full object-cover" />
                </div>

                {/* Content */}
                <h3 className="font-poppins text-2xl font-bold text-brand-dark mb-1 leading-tight">{col.title}</h3>
                {col.subtitle && (
                  <span className="text-brand-green font-bold text-lg mb-3 block">{col.subtitle}</span>
                )}
                {!col.subtitle && <div className="h-4"></div>}

                <div className="w-8 h-[2px] bg-brand-green mb-4"></div>
                <p className="text-base text-gray-500 font-medium leading-relaxed">{col.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom Banner */}
          <div className="w-full max-w-[1400px] mx-auto bg-[#f9f7f2] rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between border border-gray-200/60 shadow-sm gap-8 text-left">
            {/* Left side */}
            <div className="flex items-center gap-6 flex-1">
              <div className="w-14 h-14 rounded-full bg-[#132213] flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-bold text-brand-dark mb-1">Made for Real People. Made for Real Life.</h4>
                <p className="text-base text-gray-500 font-medium">Healthy eating, made easy for everyone.</p>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden md:block w-px h-16 bg-gray-200 mx-4"></div>

            {/* Right side */}
            <div className="flex items-center gap-6 flex-1">
              <div className="w-14 h-14 rounded-full bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 21l7.03-3.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-bold text-brand-dark mb-1">Eat Well. Live Well.</h4>
                <p className="text-base text-gray-500 font-medium">We make it possible.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Our Vision for 2026 */}
        <section id="our-vision" className="relative flex flex-col lg:flex-row min-h-[100vh] py-[10vh] overflow-hidden scroll-mt-20">

          {/* Left Column (Content) */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center pl-[5%] lg:pl-[8%] pr-[5%] z-20 text-left items-start">
            {/* Tagline */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-brand-green text-sm md:text-base font-bold uppercase tracking-[3px]">
                Vision Highlight
              </span>
              <div className="flex items-center w-24">
                <div className="h-[2px] bg-brand-green/30 w-full"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-brand-green -ml-1"></div>
              </div>
            </div>

            {/* Title */}
            <h2 className="font-playfair text-7xl md:text-[6rem] leading-[1.05] font-bold text-brand-dark mb-4 tracking-tight">
              Our Vision <br />
              for <span className="text-[#3f6b15]">2026</span>
            </h2>
            <div className="w-12 h-[3px] bg-[#3f6b15] mb-8"></div>

            {/* Core Vision Card */}
            <div className="bg-[#f5f2ea] rounded-[2rem] p-6 md:p-8 flex items-center gap-6 max-w-[780px] mb-12 border border-gray-200/30 shadow-[0_10px_25px_rgba(0,0,0,0.02)]">
              <div className="w-20 h-20 rounded-full bg-[#e8e5d7] flex items-center justify-center flex-shrink-0">
                <svg className="w-10 h-10 text-[#3f6b15]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-2xl md:text-[1.6rem] text-gray-600 leading-relaxed font-medium">
                  By the end of 2026, FitEats aims to transform <span className="text-[#3f6b15] font-bold">100k people to become fit.</span>
                </p>
              </div>
            </div>

            {/* Bottom 4 Grid Columns */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 border-t border-gray-200/80 pt-8 max-w-[780px]">
              {[
                {
                  title: "For Every Goal",
                  desc: "Nutrition that fits every lifestyle.",
                  icon: (
                    <svg className="w-5 h-5 text-[#3f6b15]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                  )
                },
                {
                  title: "Real Food. Real Results.",
                  desc: "Wholesome meals that fuel your transformation.",
                  icon: (
                    <svg className="w-5 h-5 text-[#3f6b15]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.2 0-2.4 1.2-3 3-.6-1.8-1.8-3-3-3-2.2 0-4 2.2-4 5 0 4.4 5.2 8.8 9.2 12.8.2.2.4.2.6.2.2 0 .4 0 .6-.2 4-4 9.2-8.4 9.2-12.8 0-2.8-1.8-5-4-5-1.2 0-2.4 1.2-3 3-.6-1.8-1.8-3-3-3z" />
                    </svg>
                  )
                },
                {
                  title: "Stronger Community",
                  desc: "Building a healthier, happier Chennai.",
                  icon: (
                    <svg className="w-5 h-5 text-[#3f6b15]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.5 4.5 6.75-6.75M19.5 8.25h3v3" />
                    </svg>
                  )
                },
                {
                  title: "Trust & Quality",
                  desc: "Consistent quality you can always rely on.",
                  icon: (
                    <svg className="w-5 h-5 text-[#3f6b15]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                  )
                }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-start text-left">
                  <div className="w-10 h-10 rounded-full bg-[#3f6b15]/10 flex items-center justify-center mb-3 flex-shrink-0">
                    {item.icon}
                  </div>
                  <h4 className="text-lg md:text-xl font-bold text-brand-dark mb-2 leading-tight">{item.title}</h4>
                  <p className="text-base text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (Circular Graphic Design) */}
          <div className="w-full lg:w-1/2 relative min-h-[600px] lg:min-h-screen flex items-center z-10">
            {/* A container positioned absolutely extending off-screen to the right */}
            <div className="sec5-graphic-container absolute right-[-10%] lg:right-[-12%] w-[900px] lg:w-[1200px] h-[900px] lg:h-[1200px] flex items-center justify-center pointer-events-none">

              {/* Dashed Circular Progress Curve */}
              <svg className="absolute w-[87%] h-[87%] text-[#3f6b15]/40" viewBox="0 0 100 100">
                <path d="M 30,15 A 38,38 0 1,1 85,30" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2,2" />
                <polygon points="85,30 80,27 83,34" fill="currentColor" />
              </svg>

              {/* Green Mountain-Flag Circle */}
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-[#3f6b15] flex items-center justify-center shadow-lg absolute top-[15%] left-[21%] z-20">
                <svg className="w-8 h-8 lg:w-10 lg:h-10 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 20 L11 7 L17 14 L22 20 Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 7 L11 2" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 2 L16 4 L11 6" fill="currentColor" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 20h20" />
                </svg>
              </div>

              {/* Salad Bowl */}
              <img
                src={section6Bowl}
                alt="FitEats Vision Bowl"
                className="w-[85%] h-[85%] scale-110 z-10 relative object-contain drop-shadow-2xl"
              />

              {/* Leaf Branch */}
              <img
                src={sec5Leaf}
                alt="Fresh Leaf"
                className="w-[28%] h-auto object-contain absolute bottom-[15%] right-[15%] z-20 pointer-events-none"
              />
            </div>
          </div>

        </section>

        {/* Section 6: Testimonials ("What Chennai is saying") */}
        <section className="relative w-full bg-[#f6f3eb] py-[12vh] px-4 overflow-hidden border-t border-gray-200/30">

          {/* Header Block */}
          <div className="max-w-[800px] mx-auto text-center mb-16 relative z-20">
            <div className="flex justify-center items-center gap-1.5 text-amber-500 mb-4 text-xl">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              <span className="text-brand-dark font-bold text-base ml-2">4.9/5 from 850+ reviews</span>
            </div>
            <h2 className="font-playfair text-5xl md:text-7xl font-bold text-brand-dark mb-6 tracking-tight">
              What Chennai is saying
            </h2>
            <p className="text-xl md:text-[1.3rem] text-gray-600 leading-relaxed font-medium">
              Real protocols, precision macros—stories from our exclusive community scaling their fitness without guessing the numbers.
            </p>
          </div>

          {/* Vertical Infinite Scroll Columns Container */}
          <div className="relative max-w-[1240px] mx-auto h-[650px] overflow-hidden">

            {/* Top Fade Gradient */}
            <div className="absolute top-0 left-0 w-full h-[100px] bg-gradient-to-b from-[#f6f3eb] to-transparent z-20 pointer-events-none"></div>

            {/* Bottom Fade Gradient */}
            <div className="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-t from-[#f6f3eb] to-transparent z-20 pointer-events-none"></div>

            {/* Columns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">

              {/* Column 1 (Scrolls Up) */}
              <div className="h-full overflow-hidden relative">
                <div className="flex flex-col gap-6 animate-marquee-up py-4">
                  {[...col1Testimonials, ...col1Testimonials].map((item, idx) => (
                    <TestimonialCard key={idx} {...item} />
                  ))}
                </div>
              </div>

              {/* Column 2 (Scrolls Down) */}
              <div className="h-full overflow-hidden relative">
                <div className="flex flex-col gap-6 animate-marquee-down py-4">
                  {[...col2Testimonials, ...col2Testimonials].map((item, idx) => (
                    <TestimonialCard key={idx} {...item} />
                  ))}
                </div>
              </div>

              {/* Column 3 (Scrolls Up Slow) */}
              <div className="h-full overflow-hidden relative">
                <div className="flex flex-col gap-6 animate-marquee-up-slow py-4">
                  {[...col3Testimonials, ...col3Testimonials].map((item, idx) => (
                    <TestimonialCard key={idx} {...item} />
                  ))}
                </div>
              </div>

            </div>

          </div>
        </section>
      </div>

      {/* Section 7: Premium Ecosystem CTA */}
      <section id="pricing" className="relative w-full min-h-[85vh] flex flex-col items-center justify-center overflow-hidden py-24 px-4 text-center scroll-mt-20">

        {/* Video Background Container */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover opacity-70"
          >
            <source src={editedVideo} type="video/mp4" />
          </video>
          {/* Overlay to ensure maximum contrast and premium vignette depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b1409]/95 via-[#0b1409]/60 to-[#0b1409]/95"></div>
          {/* Subtle radial glow in the center */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,#0b1409_85%)] opacity-90"></div>
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 w-full max-w-[900px] flex flex-col items-center justify-center">

          {/* Title */}
          <h2 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-6 max-w-[850px] leading-tight tracking-tight">
            Claim your spot in our <br className="hidden sm:inline" /> premium ecosystem.
          </h2>

          {/* Subheading */}
          <p className="text-base md:text-lg text-white/80 max-w-[650px] leading-relaxed mb-10 font-medium">
            We maintain a strict client cap to ensure flawless algorithmic planning and white-glove service. Apply now to start your transformation.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="https://wa.me/yourwhatsapplink"
              target="_blank"
              rel="noopener noreferrer"
              className="flex"
            >
              <button className="bg-[#76c117] hover:bg-[#65a314] text-white text-xs font-bold uppercase tracking-[2px] px-8 py-4 rounded-full flex items-center gap-3 transition-all duration-300 shadow-[0_4px_25px_rgba(118,193,23,0.35)] hover:scale-105">
                <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.459 3.477 1.332 4.992L2 22l5.168-1.357c1.474.805 3.129 1.229 4.832 1.229h.01c5.506 0 9.988-4.482 9.988-9.988 0-2.663-1.037-5.167-2.92-7.053C17.18 3.037 14.675 2 12.012 2zm5.727 14.18c-.234.66-.69 1.155-1.282 1.458-.456.234-1.026.398-2.61-.258-2.18-.903-3.666-3.08-3.774-3.228-.108-.147-.887-1.178-.887-2.263 0-1.085.57-1.616.774-1.83.204-.213.447-.267.597-.267.15 0 .3 0 .432.006.138.006.324-.054.51.396.192.468.654 1.596.714 1.716.06.12.1.258.018.42-.084.162-.126.258-.252.408-.126.15-.264.336-.378.462-.114.126-.234.264-.102.492.132.228.588.966 1.26 1.566.864.774 1.596 1.014 1.824 1.122.228.108.36.09.492-.06.132-.15.57-.666.72-.9.15-.234.3-.198.51-.12.21.078 1.332.63 1.56.744.228.114.378.168.432.264.054.096.054.558-.18 1.218z" />
                </svg>
                Apply for Membership
              </button>
            </Link>
            <Link
              href="#pricing"
              className="flex"
            >
              <button className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-[2px] px-8 py-4 rounded-full flex items-center gap-3 transition-all duration-300 shadow-sm hover:scale-105">
                View Membership Details
              </button>
            </Link>
          </div>

        </div>

      </section>

      {/* Footer Section */}
      <footer id="contact" className="relative w-full bg-[#0b1409] text-white/70 py-16 px-[5%] border-t border-white/5 overflow-hidden">

        {/* Main Footer Content */}
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10 pb-16">

          {/* Brand/Description Column */}
          <div className="md:col-span-6 flex flex-col items-start text-left">
            <Link href="/" className="mb-6 block">
              <img src={logo} alt="Fit Eat" className="h-[40px] w-auto transition-transform duration-300 hover:scale-102" />
            </Link>
            <p className="text-sm md:text-base text-white/60 leading-relaxed mb-6 max-w-[450px]">
              A scalable food-tech ecosystem built for your goals—calories, protein, and real life. Our algorithmic planning and dynamic subscriptions power a seamless nutrition journey.
            </p>
            {/* Action Pills */}
            <div className="flex flex-wrap gap-2">
              {['Tech-enabled', 'Algorithmic macros', 'Dynamic subscriptions'].map((pill, i) => (
                <span key={i} className="bg-white/5 border border-white/10 text-white/80 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-[0.5px]">
                  {pill}
                </span>
              ))}
            </div>
          </div>

          {/* Column 2: Plan Links */}
          <div className="md:col-span-3 flex flex-col items-start text-left">
            <h4 className="text-xs font-extrabold uppercase tracking-[2px] text-brand-green mb-6">Plan</h4>
            <div className="flex flex-col gap-4">
              {[
                { label: 'How It Works', href: '/how-it-works' },
                { label: 'Pricing', href: '/pricing' }
              ].map((link, i) => (
                <Link key={i} href={link.href} className="text-sm font-medium hover:text-white transition-colors duration-200">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Company Links */}
          <div className="md:col-span-3 flex flex-col items-start text-left">
            <h4 className="text-xs font-extrabold uppercase tracking-[2px] text-brand-green mb-6">Company</h4>
            <div className="flex flex-col gap-4">
              {[
                { label: 'About Us', href: '/about-us' },
                { label: 'Contact', href: '/contact' },
                { label: 'FAQ', href: '#faq' }
              ].map((link, i) => (
                <Link key={i} href={link.href} className="text-sm font-medium hover:text-white transition-colors duration-200">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Large Infinite Scrolling Text Banner */}
        <div className="w-full overflow-hidden py-6 border-t border-white/5 relative select-none pointer-events-none">
          <div className="flex whitespace-nowrap animate-marquee-left">
            {/* Duplicate the block of text to make it loop seamlessly */}
            <div className="flex gap-16 pr-16 text-[8rem] md:text-[11rem] font-bold text-white/[0.03] uppercase tracking-widest leading-none font-playfair select-none">
              <span>FIT EATS</span>
              <span>FIT EATS</span>
              <span>FIT EATS</span>
            </div>
            <div className="flex gap-16 pr-16 text-[8rem] md:text-[11rem] font-bold text-white/[0.03] uppercase tracking-widest leading-none font-playfair select-none">
              <span>FIT EATS</span>
              <span>FIT EATS</span>
              <span>FIT EATS</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="max-w-[1200px] mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40 font-medium">
          <div>
            © {new Date().getFullYear()} FitEats. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="#privacy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
            <Link href="#terms" className="hover:text-white transition-colors duration-200">Terms of Service</Link>
          </div>
        </div>

      </footer>

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

      {/* Meal Detail Modal */}
      {selectedMeal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => setSelectedMeal(null)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative w-full max-w-[480px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedMeal(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors duration-200 backdrop-blur-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image Header */}
            <div className="relative w-full h-[240px] bg-neutral-100 flex-shrink-0">
              <img 
                src={selectedMeal.image} 
                alt={selectedMeal.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#1a1a1a]/85 backdrop-blur-sm text-white text-[10px] font-bold tracking-[2px] uppercase px-3 py-1 rounded-md">
                {selectedMeal.badge}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-8 overflow-y-auto flex-1">
              <h3 className="font-playfair text-[26px] font-bold text-brand-dark leading-snug mb-2">
                {selectedMeal.title}
              </h3>
              <p className="text-[13px] text-neutral-500 font-bold mb-5">
                {selectedMeal.subtitle}
              </p>

              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center px-4 py-2 bg-[#fdfbf7] text-neutral-800 rounded-full text-[13px] font-bold border border-neutral-200 shadow-sm">
                  {selectedMeal.calories}
                </span>
                <span className="inline-flex items-center px-4 py-2 bg-[#f0f9f4] text-[#2e7d32] rounded-full text-[13px] font-bold shadow-sm">
                  {selectedMeal.protein}
                </span>
              </div>

              <p className="text-[15px] text-gray-600 leading-relaxed font-medium mb-6">
                {selectedMeal.fullDesc || "A delicious and carefully crafted meal optimized for your nutritional goals."}
              </p>

              <ul className="flex flex-col gap-3 mb-8">
                {(selectedMeal.benefits || ["Freshly prepared daily", "No refined sugars or oils", "Perfectly balanced macros"]).map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2 flex-shrink-0"></div>
                    <span className="text-[15px] text-gray-600 font-medium leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>

              <Link 
                href="https://wa.me/yourwhatsapplink"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#1b2f1b] text-white font-bold text-[15px] py-[18px] rounded-2xl flex justify-center items-center hover:bg-[#152415] transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Contact us on WhatsApp
              </Link>

              <p className="text-center text-[11px] text-gray-400 font-medium mt-6 px-4 leading-[1.6]">
                Numbers are illustrative for this plate style—your consult sets final portions and swaps on WhatsApp.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Testimonial Card Subcomponent
function TestimonialCard({ text, name, role, initial, bgColor }) {
  return (
    <div className="bg-white border border-gray-100 rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[220px] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:border-brand-green/20">

      {/* Quote bubble text */}
      <div className="mb-6 relative">
        <span className="text-[#3f6b15]/20 font-serif text-5xl absolute -top-4 -left-2 select-none">“</span>
        <p className="text-gray-600 text-[1.05rem] leading-relaxed font-medium pl-4 relative z-10">
          {text}
        </p>
      </div>

      {/* User profile block */}
      <div className="flex items-center gap-4 border-t border-gray-100 pt-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm select-none ${bgColor || 'bg-brand-green/10 text-brand-green'}`}>
          {initial}
        </div>
        <div className="text-left">
          <h4 className="text-base font-bold text-brand-dark mb-0.5 leading-none">{name}</h4>
          <span className="text-xs text-gray-400 font-medium leading-none">{role}</span>
        </div>
      </div>

    </div>
  );
}

// Testimonial Data lists representing Chennai customers
const col1Testimonials = [
  {
    text: "Balancing school runs and my office hours meant cooking separate diet meals was impossible. FitEats sorted it. My energy levels are up, and the kids love the bits of paneer they steal from my bowl!",
    name: "Divya Raman",
    role: "OMR, Busy Parent",
    initial: "DR",
    bgColor: "bg-emerald-50 text-emerald-700"
  },
  {
    text: "Finally, sambar rice that fits my calorie target! The onboarding consult felt like talking to experts who actually read nutrition labels. Down 6kg in 3 months without feeling restricted.",
    name: "Priya Krishnan",
    role: "Adyar, Desk Job, Fat Loss",
    initial: "PK",
    bgColor: "bg-teal-50 text-teal-700"
  },
  {
    text: "High-protein millet dishes that don't taste like cardboard. FitEats gets the South Indian spice blends exactly right. Perfect post-run macros every single morning.",
    name: "Rajesh Kumar",
    role: "Anna Nagar, Marathon Runner",
    initial: "RK",
    bgColor: "bg-lime-50 text-lime-700"
  }
];

const col2Testimonials = [
  {
    text: "Every app I tried had inaccurate macros for South Indian meals. FitEats portions are honest—my dietitian reviewed the nutritional breakdown and approved it. Flawless Mylapore delivery too.",
    name: "Lakshmi Iyer",
    role: "Mylapore, Clinical Diet",
    initial: "LI",
    bgColor: "bg-amber-50 text-amber-700"
  },
  {
    text: "Chennai logistics are tough, but their delivery team is legendary. Always on my desk before my first meeting at 8:30 AM. T. Nagar traffic is no match for their early morning run.",
    name: "Karthik Selvam",
    role: "T. Nagar, Founder",
    initial: "KS",
    bgColor: "bg-[#3f6b15]/10 text-[#3f6b15]"
  },
  {
    text: "High-protein vegetarian diet usually means eating block paneer every day. Their menu rotation keeps lunches exciting and my muscle gains on track. Highly recommend the tofu stir-fry.",
    name: "Vignesh Karthik",
    role: "Tambaram, Software Engineer",
    initial: "VK",
    bgColor: "bg-emerald-50 text-emerald-700"
  }
];

const col3Testimonials = [
  {
    text: "When my doctor recommended increasing my protein intake post-surgery, I texted them. The team adjusted my meal portions on WhatsApp, and the updated macros were delivered the next morning.",
    name: "Rahul Fernandez",
    role: "Perambur, Recovery Phase",
    initial: "RF",
    bgColor: "bg-teal-50 text-teal-700"
  },
  {
    text: "Living in a traditional South Indian household makes it hard to cook diet food. I get FitEats for myself, saving hours of kitchen prep. Picky elders approved of the kitchen hygiene too.",
    name: "Suresh Venkat",
    role: "Porur, Family of Four",
    initial: "SV",
    bgColor: "bg-lime-50 text-lime-700"
  },
  {
    text: "Clean eating doesn't mean bland steamed vegetables. Their herbed chicken and brown rice bowls are packed with flavor. It's the only service in Chennai I recommend to my yoga clients.",
    name: "Meera Subramanian",
    role: "Nungambakkam, Yoga Trainer",
    initial: "MS",
    bgColor: "bg-amber-50 text-amber-700"
  }
];
