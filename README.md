# 🌌 Sumit Sinha // Interactive 3D Space Portfolio

An immersive, futuristic, space-themed developer portfolio website built using **React**, **Three.js / React Three Fiber (R3F)**, **Framer Motion**, and **Tailwind CSS**. 

The entire experience is built around a journey through our solar system, mapping each section of the portfolio to a celestial body that reacts dynamically to scroll and cursor movement.

---

## 🚀 Live Traversal & Key Features

### 1. 🪐 Celestial Scroll Traversal
The solar system is stacked in a unified 3D viewport. As you scroll, you smoothly navigate past:
- **Moon** // Hero / Landing Section (Large, glowing moon with detailed crater topography)
- **Earth** // About Section (Spinning continents, shallow oceans, and a separately rotating cloud sphere)
- **Mars** // Skills Section (Rust-red terrain with orbiting 3D space dust particles)
- **Saturn** // Experience Section (Cream-colored gas bands with a concentric 3D ring system)
- **Jupiter** // Projects Section (Massive gas bands, storm ripples, and the Great Red Spot)
- **Venus** // Certifications Section (Dense yellowish-cream clouds and soft atmosphere glow)
- **Neptune** // Contact Section (Azure-blue storms with high-velocity wind streaks)

### 2. 🖱️ Dynamic Parallax & Tilt Interactions
- **3D Cursor Parallax**: Every celestial body translates, tilts, and shifts in space in response to your cursor using smooth spring physics and inertia.
- **Atmospheric Glow Effects**: Custom shaders render realistic atmospheric scattering (glow rims) around Earth, Mars, Saturn, Jupiter, Venus, and Neptune.
- **Interactive 3D Tilt Cards**: Project, skill, and certification cards tilt dynamically in 3D relative to mouse coordinates, with inner text and badges popping out on the Z-axis (`preserve-3d`).
- **Spotlight Navbar**: Glassmorphic hover capsule spotlights glide smoothly behind links as you navigate between pages.

### 3. ⚡ Procedural Graphics Optimization
To achieve extreme performance, **0 MB** of texture files are downloaded. All planet surfaces and clouds are generated **procedurally in the browser** using HTML5 Canvas drawing, Perlin value noise, and fractional Brownian motion (fBm) calculations. This guarantees 60 FPS scrolling and instantaneous page loads even on slow networks.

---

## 🛠️ Technology Stack

- **Core**: React 18 / TypeScript / HTML5
- **3D Graphics**: Three.js / React Three Fiber (R3F) / React Three Drei (Post-processing & Math utils)
- **Animations**: Framer Motion (Spring physics, sliding transitions, layout HMR)
- **Styling**: Tailwind CSS / CSS3 Variables (Futuristic dark neon palette)
- **Routing**: Wouter
- **Build Tool**: Vite (Lightning fast compilation)
- **Package Manager**: pnpm

---

## 💻 Running Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/sumitsinha09-stack/Portfolio.git
   cd Portfolio
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Configure build variables (Vite config expects local PORT and BASE_PATH):
   ```bash
   PORT=5173 BASE_PATH=/ pnpm dev
   ```

4. Build for production:
   ```bash
   PORT=5173 BASE_PATH=/ pnpm build
   ```

---

## 📝 License
Created by [Sumit Sinha](https://www.linkedin.com/in/sumit-sinha-0b789a279/). Feel free to use the layout and procedural shaders to build your own immersive space travel experience!
