# Doyun Home

A personal portfolio website built with SvelteKit, featuring interactive 3D elements powered by Three.js.

## Tech Stack

- **Framework**: SvelteKit
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **3D Rendering**: Three.js
- **Animation**: GSAP
- **Code Quality**: ESLint, Prettier
- **Internationalization**: Paraglide (i18n)

## Key Features

### Hero Section
- 🌍 Interactive 3D Globe using Three.js
  - Mouse-controlled rotation
  - Auto-rotation animation
  - Major city markers
- ✨ Text animations with GSAP
- 🎨 Modern UI/UX Design
  - Gradient background
  - Responsive layout
  - Interactive CTA button

## Development Setup

1. Clone the repository
```bash
git clone [repository-url]
cd doyun-home
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. View in browser
- Development server runs at http://localhost:5173

## Project Structure

```
src/
├── lib/
│   └── components/
│       ├── Globe.svelte    # Three.js Globe Component
│       └── Hero.svelte     # Hero Section Component
├── routes/
│   └── +page.svelte       # Main Page
└── static/
    └── earth-texture.jpg  # Globe Texture Image
```

## License

MIT License
