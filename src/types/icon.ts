export type BackgroundMode = 'solid' | 'gradient' | 'image';
export type ExportFormat = 'png' | 'jpg' | 'webp' | 'svg';
export type FontPreset = 'sans' | 'serif' | 'mono' | 'cursive' | 'custom';
export type ThemeMode = 'light' | 'dark' | 'auto';

export interface GradientPreset {
  id: string;
  name: string;
  from: string;
  to: string;
  angle: number;
}

export interface PatternPreset {
  id: string;
  name: string;
  src: string;
}

export interface TextShadowSettings {
  enabled: boolean;
  color: string;
  alpha: number;
  angle: number;
  blur: number;
}

export interface ExportSettings {
  format: ExportFormat;
  size: number;
}

export interface IconSettings {
  canvasSize: number;
  borderRadius: number;
  backgroundMode: BackgroundMode;
  solidColor: string;
  gradientPresetId: string;
  gradientFrom: string;
  gradientTo: string;
  gradientAngle: number;
  imageSrc: string;
  text: string;
  textSize: number;
  textWeight: string;
  lineHeight: number;
  fontPreset: FontPreset;
  customFontFamily: string;
  textColor: string;
  shadow: TextShadowSettings;
}

export interface CustomFontItem {
  family: string;
  displayName: string;
}
