# InstaIcon

A modern, web-based text icon generator built with React, TypeScript, and Tailwind CSS. Create beautiful, customizable text-based icons instantly and export them as PNG, JPG, WebP, or SVG.

## Features

- **Text-Based Icons**: Create icons with custom text content
- **Multiple Background Modes**:
  - Solid colors
  - Gradient presets (Sunset, Sea Wave, Mint Fresh, Golden Hour, Lilac Mist)
  - Custom gradients with adjustable angle
  - Image uploads and pattern presets
- **Typography Controls**:
  - Font family selection (Sans-serif, Serif, Monospace, Cursive)
  - Custom font uploads (TTF/OTF support)
  - Font size and weight adjustment
  - Line height control
  - Text color customization
- **Visual Effects**:
  - Configurable text shadow (color, opacity, angle, blur)
  - Adjustable border radius for rounded corners
  - Canvas size presets (512px, 1024px, 2048px) or custom sizes
- **Export Options**:
  - PNG, JPG, WebP raster formats
  - SVG vector format
  - Custom export dimensions
- **Internationalization**: Support for English and Chinese (Simplified)
- **Theme Support**: Light, Dark, and Auto modes
- **PWA Ready**: Progressive Web App capabilities with offline support

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand
- **Internationalization**: i18next + react-i18next
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **PWA**: Vite Plugin PWA

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/LGiki/insta-icon.git
cd insta-icon
```

2. Install dependencies:
```bash
bun install
```

3. Start the development server:
```bash
bun dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
bun build
```

The production files will be generated in the `dist` directory.

## Usage

1. **Enter Text**: Type your desired text in the content field
2. **Customize Appearance**:
   - Choose a background mode (solid, gradient, or image)
   - Adjust font family, size, and weight
   - Add text shadow effects
   - Set border radius for rounded corners
3. **Preview**: See real-time preview of your icon
4. **Export**: Select format (PNG/JPG/WebP/SVG) and size, then download

## Project Structure

```
insta-icon/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # shadcn/ui components
│   │   ├── ControlPanel.tsx
│   │   ├── ExportPanel.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   ├── PreviewCanvas.tsx
│   │   └── ThemeToggle.tsx
│   ├── constants/       # Presets and constants
│   ├── lib/            # Utilities and state management
│   ├── types/          # TypeScript type definitions
│   ├── App.tsx         # Main application component
│   ├── i18n.ts         # Internationalization setup
│   ├── index.css       # Global styles
│   └── main.tsx        # Application entry point
├── index.html          # HTML template
├── tailwind.config.ts  # Tailwind CSS configuration
├── vite.config.ts      # Vite configuration
└── tsconfig.json       # TypeScript configuration
```

## Customization

### Adding Gradient Presets

Edit `src/constants/presets.ts`:

```typescript
export const GRADIENT_PRESETS: GradientPreset[] = [
  // ... existing presets
  { id: 'custom', name: 'Custom Name', from: '#ff0000', to: '#00ff00', angle: 135 },
];
```

### Adding New Languages

Edit `src/i18n.ts` and add a new translation object following the existing structure:

```typescript
const resources = {
  en: { translation: { ... } },
  zh: { translation: { ... } },
  es: { translation: { ... } }, // Add new language
};
```

## License

MIT License.
