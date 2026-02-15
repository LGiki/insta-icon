import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CANVAS_BASE_SIZE, GRADIENT_PRESETS } from '../constants/presets';
import type { IconSettings, ExportFormat, CustomFontItem, ThemeMode } from '../types/icon';

export const initialSettings: IconSettings = {
  canvasSize: CANVAS_BASE_SIZE,
  borderRadius: 18,
  backgroundMode: 'gradient',
  solidColor: '#0b7285',
  gradientPresetId: GRADIENT_PRESETS[0].id,
  gradientFrom: GRADIENT_PRESETS[0].from,
  gradientTo: GRADIENT_PRESETS[0].to,
  gradientAngle: GRADIENT_PRESETS[0].angle,
  imageSrc: '',
  text: 'IA',
  textSize: 220,
  textWeight: '700',
  lineHeight: 1,
  fontPreset: 'sans',
  customFontFamily: '',
  textColor: '#ffffff',
  shadow: {
    enabled: false,
    color: '#000000',
    alpha: 0.5,
    angle: 135,
    blur: 18
  }
};

interface ExportSettings {
  format: ExportFormat;
  sizeMode: string;
  customSize: number;
}

interface AppState {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  settings: IconSettings;
  patchSettings: (patch: Partial<IconSettings>) => void;
  resetSettings: () => void;
  customFonts: CustomFontItem[];
  addCustomFont: (font: CustomFontItem) => void;
  removeCustomFont: (family: string) => void;
  exportSettings: ExportSettings;
  setExportFormat: (format: ExportFormat) => void;
  setExportSizeMode: (mode: string) => void;
  setCustomExportSize: (size: number) => void;
  resetAll: () => void;
}

const STORAGE_KEY = 'instaicon-storage';

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'auto',
      setTheme: (theme) => set({ theme }),
      settings: initialSettings,
      patchSettings: (patch) =>
        set((state) => ({
          settings: { ...state.settings, ...patch }
        })),
      resetSettings: () => set({ settings: initialSettings }),
      customFonts: [],
      addCustomFont: (font) =>
        set((state) => ({
          customFonts: [...state.customFonts, font]
        })),
      removeCustomFont: (family) =>
        set((state) => ({
          customFonts: state.customFonts.filter((f) => f.family !== family)
        })),
      exportSettings: {
        format: 'png',
        sizeMode: '512',
        customSize: 1536
      },
      setExportFormat: (format) =>
        set((state) => ({
          exportSettings: { ...state.exportSettings, format }
        })),
      setExportSizeMode: (sizeMode) =>
        set((state) => ({
          exportSettings: { ...state.exportSettings, sizeMode }
        })),
      setCustomExportSize: (customSize) =>
        set((state) => ({
          exportSettings: { ...state.exportSettings, customSize }
        })),
      resetAll: () =>
        set({
          settings: initialSettings,
          customFonts: [],
          exportSettings: {
            format: 'png',
            sizeMode: '512',
            customSize: 1536
          }
        })
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        theme: state.theme,
        settings: state.settings,
        customFonts: state.customFonts,
        exportSettings: state.exportSettings
      })
    }
  )
);
