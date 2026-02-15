import { useEffect, useMemo, useState } from 'react';

import { FONT_PRESETS } from '../constants/presets';
import type { IconSettings } from '../types/icon';
import { hexToRgba, toRadians } from '../lib/utils';

interface PreviewCanvasProps {
  settings: IconSettings;
}

export function PreviewCanvas({ settings }: PreviewCanvasProps) {
  const [previewSize, setPreviewSize] = useState(280);

  useEffect(() => {
    const updateSize = () => {
      setPreviewSize(window.innerWidth < 1024 ? 140 : 280);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const fontFamily = useMemo(() => {
    if (settings.fontPreset === 'custom' && settings.customFontFamily) {
      return settings.customFontFamily;
    }

    const preset = FONT_PRESETS.find((item) => item.id === settings.fontPreset);
    return preset?.family ?? FONT_PRESETS[0].family;
  }, [settings.customFontFamily, settings.fontPreset]);

  const backgroundStyle = useMemo(() => {
    if (settings.backgroundMode === 'solid') {
      return { backgroundColor: settings.solidColor };
    }

    if (settings.backgroundMode === 'gradient') {
      return {
        backgroundImage: `linear-gradient(${settings.gradientAngle}deg, ${settings.gradientFrom}, ${settings.gradientTo})`
      };
    }

    if (settings.imageSrc) {
      return {
        backgroundImage: `url("${settings.imageSrc}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };
    }

    return { backgroundColor: '#0f172a' };
  }, [
    settings.backgroundMode,
    settings.gradientAngle,
    settings.gradientFrom,
    settings.gradientTo,
    settings.imageSrc,
    settings.solidColor
  ]);

  const textStyle = useMemo(() => {
    const radians = toRadians(settings.shadow.angle);
    const offset = 5;
    const shadow = settings.shadow.enabled
      ? `${Math.cos(radians) * offset}px ${Math.sin(radians) * offset}px ${settings.shadow.blur * 0.5}px ${
          hexToRgba(settings.shadow.color, settings.shadow.alpha)
        }`
      : 'none';

    return {
      fontFamily,
      fontWeight: settings.textWeight,
      fontSize: `${(settings.textSize / settings.canvasSize) * previewSize}px`,
      lineHeight: settings.lineHeight,
      color: settings.textColor,
      textShadow: shadow
    };
  }, [
    fontFamily,
    previewSize,
    settings.canvasSize,
    settings.lineHeight,
    settings.shadow.alpha,
    settings.shadow.angle,
    settings.shadow.blur,
    settings.shadow.color,
    settings.shadow.enabled,
    settings.textColor,
    settings.textSize,
    settings.textWeight
  ]);

  return (
    <div className="mx-auto w-full max-w-[140px] lg:max-w-[min(74vw,300px)]">
      <div
        className="relative aspect-square overflow-hidden border border-border bg-panel shadow-lg"
        style={{ borderRadius: `${settings.borderRadius}%`, ...backgroundStyle }}
      >
        <div className="flex h-full w-full items-center justify-center p-3 lg:p-5 text-center">
          <span className="whitespace-pre-wrap break-words" style={textStyle}>
            {settings.text}
          </span>
        </div>
      </div>
    </div>
  );
}
