# 🎨 Headline Widget

A modern, customizable headline widget built with React, TypeScript, Tailwind CSS, and Framer Motion. Create stunning headlines with gradients, animations, and advanced styling options.

## ✨ Features

### Core Features

- **Editable headline text** - Real-time text editing
- **Typography controls** - Font size, family, and weight customization
- **Gradient system** - Toggle gradients with directional controls (→, ←, ↓, ↑)
- **Color pickers** - Intuitive gradient color selection

### Advanced Features

- **Word styling** - Individual word highlight, underline, and background blocks
- **Modern animations** - Fade-in, hover glow, per-letter animations
- **Text effects** - Text shadow and outline options
- **Export functionality** - Export settings as JSON or embeddable CSS code
- **Responsive design** - Mobile-first approach with touch-friendly controls
- **Glass morphism UI** - Modern, translucent interface design

### Extra Features Added

- **Smooth animations** - Spring-based animations for all interactions
- **Font preview** - Live font preview in selectors
- **Active state indicators** - Visual feedback for current selections
- **Floating export panel** - Easy access to export functions
- **Neon glow effects** - Beautiful glowing UI elements
- **SiriOrb background** - Animated gradient orb for visual appeal

## 🚀 Live Demo

[View Live Demo](https://your-vercel-url.vercel.app)

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Zustand** - Lightweight state management
- **Vite** - Fast build tool
- **Radix UI** - Accessible UI primitives

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/headline-widget.git

# Navigate to project directory
cd headline-widget

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🏗️ Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with zero configuration

## 🎯 Usage

1. **Edit Text** - Click on the text input to change your headline
2. **Choose Font** - Select from 6 distinct headline fonts
3. **Adjust Size** - Use the slider to set font size (12px - 120px)
4. **Set Weight** - Choose from 9 font weight options
5. **Enable Gradient** - Toggle gradient and set colors/direction
6. **Add Animations** - Enable fade-in, hover glow, or per-letter effects
7. **Style Words** - Select individual words for highlighting or underlining
8. **Export** - Save your settings as JSON or copy CSS code

## 🎨 Font Selection

Carefully curated fonts for maximum impact:

- **Bebas Neue** - Ultra condensed, modern headlines
- **Orbitron** - Futuristic, sci-fi style
- **Impact** - Bold and wide for maximum impact
- **Georgia** - Classic serif elegance
- **Courier New** - Monospace, retro feel
- **Trebuchet MS** - Clean, modern sans-serif

## 🌈 Gradient System

- **4 Directions** - Right, Left, Down, Up
- **Live Preview** - See changes in real-time
- **Color Harmony** - Intelligent color suggestions
- **Smooth Transitions** - Animated gradient changes

## 📱 Responsive Design

- **Desktop** - Full sidebar with all controls
- **Mobile** - Bottom sheet with touch-friendly interface
- **Tablet** - Adaptive layout for medium screens

## 🔧 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── HeadlineDisplay.tsx
│   ├── TypographyControls.tsx
│   ├── GradientControls.tsx
│   └── ...
├── store/              # Zustand state management
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── lib/                # Shared libraries
```

## 🎭 Animation Details

- **Spring Physics** - Natural, bouncy animations
- **Staggered Timing** - Sequential letter animations
- **Hover Effects** - Interactive feedback
- **Smooth Transitions** - 60fps performance

## 💾 Export Options

### JSON Export

```json
{
  "text": "Your Amazing Headline",
  "typography": {
    "fontSize": 48,
    "fontFamily": "Bebas Neue",
    "fontWeight": 700
  },
  "gradient": {
    "enabled": true,
    "startColor": "#3b82f6",
    "endColor": "#8b5cf6",
    "direction": "→"
  }
}
```

### CSS Export

Generated CSS code ready for embedding in any website.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - feel free to use in your projects!

## 🙏 Acknowledgments

- Inspired by modern design systems
- Built with accessibility in mind
- Optimized for performance and user experience

---

**Built with ❤️ for the modern web**
