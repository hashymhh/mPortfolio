# portfolio-web
A React + Three.js portfolio built with Vite and TypeScript. This site combines a 3D character scene, GSAP-driven animations, and a multi-section layout (Landing, About, Work, Contact) with custom loading and cursor effects.

## What This Repo Contains (Code-Based)
- App entry: [src/main.tsx](src/main.tsx) boots React and mounts [src/App.tsx](src/App.tsx).
- Root composition: [src/App.tsx](src/App.tsx) lazily loads the main layout and 3D scene, wrapping everything in [src/context/LoadingProvider.tsx](src/context/LoadingProvider.tsx).
- Layout & sections: [src/components/MainContainer.tsx](src/components/MainContainer.tsx) renders the page structure, Navbar, social links, and sections (Landing/About/Work/etc.) with desktop/mobile branching.
- 3D scene: [src/components/Character/Scene.tsx](src/components/Character/Scene.tsx) sets up a Three.js renderer, camera, lights, and character animation, then ties head rotation to pointer/touch input.
- Loading flow: [src/components/Loading.tsx](src/components/Loading.tsx) shows a loader with animated progress and triggers initial GSAP effects once assets complete.
- Scroll/text animation: [src/components/utils/splitText.ts](src/components/utils/splitText.ts) uses GSAP SplitText + ScrollTrigger for paragraph/title reveals.

## Tech Stack
- React 18 + TypeScript
- Vite 5 for dev/build
- Three.js + @react-three/fiber/drei for 3D
- GSAP + gsap-trial (SplitText, ScrollSmoother)
- React Fast Marquee + React Icons

## Key Features
- 3D character scene with animation mixer and interactive head tracking
- Loader screen with progress simulation and welcome transition
- Scroll-based timelines for section transitions and character staging
- Responsive behavior (desktop scene placement vs mobile inline placement)

## Supported OS
- Windows, macOS, Linux

This is a front-end web project; it runs in any modern browser with WebGL enabled.

## Project Structure (Highlights)
- [src/components](src/components): UI sections, navbar, cursor, and section styling
- [src/components/Character](src/components/Character): Three.js scene setup, animation, mouse/touch handlers
- [src/context](src/context): Loading state and provider
- [public/models](public/models): Encrypted/encoded 3D assets and HDR environment

## Scripts
- `npm run dev` - start Vite dev server
- `npm run build` - typecheck + production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint

## Notes
- GSAP SplitText and ScrollSmoother are `gsap-trial` plugins; a GSAP Club license is required for production use.
