# Portfolio

This repository contains my personal portfolio website.

It is designed as a single codebase that generates **two different public portfolio versions**, depending on the target role, while keeping the same visual identity, layout system, and engineering standards.

## Live Versions

- **Tech Artist / VFX Portfolio**  
  https://valelib.github.io/Portfolio/

- **Frontend / Software Engineer Portfolio**  
  https://valelib.github.io/Portfolio/Software-Engineer/

Each version is built from the same source code using build-time flags.

## Why two versions

I work across both **frontend engineering** and **tech art / VFX**.  
Different roles value different signals.

Instead of maintaining separate projects, this portfolio uses:
- One codebase
- One design system
- One component architecture
- Two content profiles

This keeps maintenance simple while allowing tailored messaging.

## Architecture overview

- **Single branch workflow**
- **Build-time profile selection**
- **Static deployment via GitHub Pages**

Profiles are selected using Vite environment flags:

- `VITE_PROFILE=tech-art`
- `VITE_PROFILE=frontend`

There is no runtime toggle.  
Each public URL corresponds to a different build output.

## Tech stack

### Core
- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**

### Animation and interaction
- **GSAP** (ScrollTrigger, entrance choreography, parallax)
- **Lottie** (decorative animations, reduced-motion safe)
- **Framer Motion** (component-level motion where appropriate)

### 3D
- **Spline**
- **Three.js** (supporting integrations)

### Deployment
- **GitHub Actions**
- **GitHub Pages**
- Dual build output from a single pipeline

## Content structure

All content is data-driven and typed.

```text
src/
  content/
    profiles/
      tech-art.ts
      frontend.ts
    experience.ts
    projects.ts
    skills.ts
    education.ts
    socials.ts
