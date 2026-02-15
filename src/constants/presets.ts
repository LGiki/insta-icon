import type { GradientPreset } from '../types/icon';

export const CANVAS_BASE_SIZE = 512;

export const GRADIENT_PRESETS: GradientPreset[] = [
  { id: 'sunset', name: 'Sunset', from: '#ff9966', to: '#ff5e62', angle: 140 },
  { id: 'sea', name: 'Sea Wave', from: '#4facfe', to: '#00f2fe', angle: 120 },
  { id: 'mint', name: 'Mint Fresh', from: '#43e97b', to: '#38f9d7', angle: 130 },
  { id: 'gold', name: 'Golden Hour', from: '#f6d365', to: '#fda085', angle: 125 },
  { id: 'lilac', name: 'Lilac Mist', from: '#89f7fe', to: '#66a6ff', angle: 100 }
];

export const FONT_PRESETS = [
  { id: 'sans', labelKey: 'fonts.sans', family: 'Trebuchet MS, Verdana, sans-serif' },
  { id: 'serif', labelKey: 'fonts.serif', family: 'Georgia, Times New Roman, serif' },
  { id: 'mono', labelKey: 'fonts.mono', family: 'JetBrains Mono, Menlo, monospace' },
  { id: 'cursive', labelKey: 'fonts.cursive', family: 'Brush Script MT, cursive' }
] as const;

export const EXPORT_SIZE_PRESETS = [512, 1024, 2048];
