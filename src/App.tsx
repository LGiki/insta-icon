import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ControlPanel } from './components/ControlPanel';
import { ExportPanel } from './components/ExportPanel';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { PreviewCanvas } from './components/PreviewCanvas';
import { ThemeToggle } from './components/ThemeToggle';
import { GRADIENT_PRESETS } from './constants/presets';
import { downloadBlob, exportAsRaster, exportAsSvg, makeExportFilename } from './lib/exporters';
import { getPatternPresets } from './lib/patterns';
import { useAppStore } from './lib/store';

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== 'string') {
        reject(new Error('Invalid file data.'));
        return;
      }
      resolve(result);
    };

    reader.onerror = () => reject(new Error('Unable to read file.'));
    reader.readAsDataURL(file);
  });
}

function getSystemTheme(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export default function App() {
  const { t } = useTranslation();
  const [systemIsDark, setSystemIsDark] = useState<boolean>(getSystemTheme);
  const [isExporting, setIsExporting] = useState(false);

  const theme = useAppStore((state) => state.theme);
  const setTheme = useAppStore((state) => state.setTheme);
  const settings = useAppStore((state) => state.settings);
  const patchSettings = useAppStore((state) => state.patchSettings);
  const customFonts = useAppStore((state) => state.customFonts);
  const addCustomFont = useAppStore((state) => state.addCustomFont);
  const exportSettings = useAppStore((state) => state.exportSettings);
  const setExportFormat = useAppStore((state) => state.setExportFormat);
  const setExportSizeMode = useAppStore((state) => state.setExportSizeMode);
  const setCustomExportSize = useAppStore((state) => state.setCustomExportSize);
  const resetAll = useAppStore((state) => state.resetAll);

  const activeExportSize = useMemo(
    () => (exportSettings.sizeMode === 'custom' ? exportSettings.customSize : Number(exportSettings.sizeMode)),
    [exportSettings.customSize, exportSettings.sizeMode]
  );

  const isDark = theme === 'auto' ? systemIsDark : theme === 'dark';

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemIsDark(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleBackgroundUpload = async (file: File) => {
    try {
      const src = await readFileAsDataUrl(file);
      patchSettings({ backgroundMode: 'image', imageSrc: src });
    } catch (error) {
      console.error(error);
      window.alert('Image upload failed.');
    }
  };

  const handleFontUpload = async (file: File) => {
    const baseName = file.name.replace(/\.[^/.]+$/, '').trim() || 'CustomFont';
    const family = `InstaIcon-${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`;

    try {
      const source = await file.arrayBuffer();
      const fontFace = new FontFace(family, source);
      await fontFace.load();
      document.fonts.add(fontFace);

      addCustomFont({ family, displayName: baseName });
      patchSettings({ fontPreset: 'custom', customFontFamily: family });
    } catch (error) {
      console.error(error);
      window.alert('Font upload failed.');
    }
  };

  const handleDownload = async () => {
    setIsExporting(true);
    try {
      const blob =
        exportSettings.format === 'svg'
          ? exportAsSvg(settings, activeExportSize)
          : await exportAsRaster(settings, activeExportSize, exportSettings.format);

      downloadBlob(blob, makeExportFilename(exportSettings.format, activeExportSize));
    } catch (error) {
      console.error(error);
      window.alert('Export failed.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen text-foreground">
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2 lg:flex-wrap lg:gap-3 lg:px-4 lg:py-3">
          <div>
            <h1 className="text-base font-bold tracking-tight lg:text-xl">{t('appName')}</h1>
            <p className="hidden text-xs text-foreground/70 lg:block lg:text-sm">{t('appSubtitle')}</p>
          </div>
          <div className="flex items-center gap-2 lg:flex-wrap lg:gap-3">
            <LanguageSwitcher />
            <ThemeToggle mode={theme} isDark={isDark} onChange={setTheme} />
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-[1400px] flex-col gap-2 p-2 lg:h-[calc(100vh-82px)] lg:flex-row lg:items-stretch lg:gap-4 lg:p-4">
        <section className="sticky top-0 z-10 order-1 flex items-center justify-center rounded-xl border border-border bg-panel/95 px-3 py-2 shadow-sm backdrop-blur-sm lg:order-2 lg:static lg:w-[360px] lg:flex-none lg:rounded-2xl lg:px-4 lg:py-5">
          <div className="w-full space-y-2 lg:space-y-4">
            <p className="hidden text-center text-sm font-semibold uppercase tracking-[0.14em] text-foreground/60 lg:block">
              {t('preview')}
            </p>
            <div className="space-y-3 lg:space-y-4">
              <PreviewCanvas settings={settings} />
              <ExportPanel
                exportFormat={exportSettings.format}
                onExportFormatChange={setExportFormat}
                exportSizeMode={exportSettings.sizeMode}
                onExportSizeModeChange={setExportSizeMode}
                customExportSize={exportSettings.customSize}
                onCustomExportSizeChange={setCustomExportSize}
                onDownload={handleDownload}
                isExporting={isExporting}
              />
            </div>
          </div>
        </section>

        <aside className="order-2 rounded-xl border border-border bg-background/90 shadow-sm lg:order-1 lg:max-h-none lg:flex-1 lg:rounded-2xl lg:overflow-hidden flex flex-col w-full">
          <div className='p-2 lg:p-4 flex-1 h-auto lg:h-0 lg:overflow-y-auto'>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-foreground/60 lg:mb-3 lg:text-sm">
              {t('controls.label')}
            </p>
            <ControlPanel
              settings={settings}
              gradientPresets={GRADIENT_PRESETS}
              patternPresets={getPatternPresets()}
              customFonts={customFonts}
              onSettingsChange={patchSettings}
              onBackgroundUpload={handleBackgroundUpload}
              onFontUpload={handleFontUpload}
              onReset={resetAll}
            />
          </div>
        </aside>
      </main>
    </div>
  );
}
