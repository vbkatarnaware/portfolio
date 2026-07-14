# macOS Terminal Portfolio

A highly immersive, performance-optimized personal portfolio built to mimic a macOS desktop environment with a 3D Infinite Canvas architecture.

## 🚀 Tech Stack
- **Framework:** [Astro](https://astro.build/) for static site generation and React integration
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/) & React Icons
- **Deployment:** Vercel

## 📂 Project Structure
Following strict frontend engineering patterns:
```
├── docs/                # Project documentation and architectural specs
├── public/              # Static assets (favicons, fonts, robots.txt)
├── scripts/             # Build and deployment utilities
├── src/
│   ├── assets/          # Processed assets (optimized images)
│   ├── components/      # React components (global, projects)
│   ├── constants/       # Global constants and configuration
│   ├── context/         # React Context providers (Startup phase, etc)
│   ├── hooks/           # Custom React hooks
│   ├── layouts/         # Astro layouts & React root layouts
│   ├── lib/             # External library initializers (analytics, etc)
│   ├── pages/           # Astro file-based routing
│   ├── styles/          # Global CSS and Tailwind directives
│   ├── types/           # TypeScript interfaces and type definitions
│   └── utils/           # Helper functions
```

## 🏗 Architecture & Philosophy
### The Infinite Canvas
The core layout (`AppLayout.tsx`) utilizes a mathematically anchored background system to ensure that the 3D studio render (avatar and desk) remains perfectly positioned across all viewports—from 1440p ultrawides down to the iPhone SE. 
- **Mobile handling:** A 4-sided dynamic black gradient bleeds the edges into pure black, preventing harsh clipping.
- **Performance:** Complex layout animations are restricted entirely to hardware-accelerated CSS properties (`transform: translate` and `opacity`) to guarantee 60fps on low-end mobile devices.

### Hydration Strategy
Astro allows us to ship 0kb of JavaScript for the outer HTML shell. React components are selectively hydrated using the `client:load` directive only where interactivity is required (docks, windows, and startup animations).

## 🛠 Installation & Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vbkatarnaware/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

## 📦 Production Build
To create a highly optimized production build:
```bash
npm run build
```
You can preview the production output locally:
```bash
npm run preview
```

## 📈 Future Improvements
- **a11y Enhancements:** Deeper screen-reader support within the window management system.
- **Theme Engine:** Expose a toggle to switch between Light/Dark variants natively in the MacToolbar.

---
*Built by Vipul Katarnaware. Product Manager · AI Builder · Founder.*
