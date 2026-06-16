# Fit Eat — Next.js

A premium health meal delivery website built with Next.js 15 (App Router), Tailwind CSS v4, GSAP, and Lenis.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: GSAP + ScrollTrigger + @gsap/react
- **Smooth Scroll**: Lenis
- **Text Splitting**: SplitType

## Project Structure

```
app/
├── layout.jsx          # Root layout (fonts, metadata)
├── globals.css         # Global styles + Tailwind theme
├── page.jsx            # Home (/)
├── Home.jsx            # Home page component
├── HowItWorks.jsx      # How It Works component
├── how-it-works/
│   └── page.jsx        # /how-it-works
├── about-us/
│   └── page.jsx        # /about-us
├── pricing/
│   └── page.jsx        # /pricing
└── contact/
    └── page.jsx        # /contact
public/
└── assets/             # Images, videos, icons
```

## Dev

```bash
npm run dev     # starts on port 3005
npm run build
npm run start
```
