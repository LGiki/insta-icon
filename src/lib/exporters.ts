import { CANVAS_BASE_SIZE, FONT_PRESETS } from '../constants/presets';
import { renderIconToCanvas } from './iconRenderer';
import { escapeXml, toRadians } from './utils';
import type { ExportFormat, IconSettings } from '../types/icon';

function getFileExtension(format: ExportFormat): string {
  return format === 'jpg' ? 'jpg' : format;
}

function getMimeType(format: ExportFormat): string {
  if (format === 'jpg') {
    return 'image/jpeg';
  }

  if (format === 'png') {
    return 'image/png';
  }

  return 'image/webp';
}

function getFontFamily(settings: IconSettings): string {
  if (settings.fontPreset === 'custom' && settings.customFontFamily) {
    return settings.customFontFamily;
  }

  const preset = FONT_PRESETS.find((item) => item.id === settings.fontPreset);
  return preset?.family ?? FONT_PRESETS[0].family;
}

function buildSvgContent(settings: IconSettings, size: number): string {
  const radius = Math.max(0, Math.min(size / 2, (size * settings.borderRadius) / 100));
  const lineHeightPx = settings.lineHeight * settings.textSize * (size / CANVAS_BASE_SIZE);
  const textSize = settings.textSize * (size / CANVAS_BASE_SIZE);
  const lines = settings.text.split('\n');
  const textStartY = size / 2 - ((lines.length - 1) * lineHeightPx) / 2;
  const textElements = lines
    .map((line, index) => {
      const y = textStartY + index * lineHeightPx;
      return `<text x='50%' y='${y.toFixed(2)}' text-anchor='middle' dominant-baseline='middle'>${escapeXml(
        line || ' '
      )}</text>`;
    })
    .join('');

  const radians = toRadians(settings.shadow.angle);
  const shadowOffset = Math.max(2, size * 0.014);
  const shadowX = Math.cos(radians) * shadowOffset;
  const shadowY = Math.sin(radians) * shadowOffset;

  const gradientRadians = toRadians(settings.gradientAngle);
  const gx1 = 50 - Math.cos(gradientRadians) * 50;
  const gy1 = 50 - Math.sin(gradientRadians) * 50;
  const gx2 = 50 + Math.cos(gradientRadians) * 50;
  const gy2 = 50 + Math.sin(gradientRadians) * 50;

  const defs = [
    `<clipPath id='clip'><rect width='${size}' height='${size}' rx='${radius}' ry='${radius}' /></clipPath>`
  ];

  if (settings.backgroundMode === 'gradient') {
    defs.push(
      `<linearGradient id='bg-gradient' x1='${gx1}%' y1='${gy1}%' x2='${gx2}%' y2='${gy2}%'><stop offset='0%' stop-color='${escapeXml(
        settings.gradientFrom
      )}' /><stop offset='100%' stop-color='${escapeXml(settings.gradientTo)}' /></linearGradient>`
    );
  }

  if (settings.shadow.enabled) {
    defs.push(
      `<filter id='text-shadow' x='-20%' y='-20%' width='140%' height='140%'><feDropShadow dx='${shadowX.toFixed(
        2
      )}' dy='${shadowY.toFixed(2)}' stdDeviation='${settings.shadow.blur.toFixed(
        2
      )}' flood-color='${escapeXml(settings.shadow.color)}' /></filter>`
    );
  }

  let background = `<rect width='${size}' height='${size}' fill='${escapeXml(settings.solidColor)}' />`;

  if (settings.backgroundMode === 'gradient') {
    background = `<rect width='${size}' height='${size}' fill='url(#bg-gradient)' />`;
  } else if (settings.backgroundMode === 'image' && settings.imageSrc) {
    background = `<image href='${escapeXml(
      settings.imageSrc
    )}' x='0' y='0' width='${size}' height='${size}' preserveAspectRatio='xMidYMid slice' />`;
  }

  return `<?xml version='1.0' encoding='UTF-8'?>
<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'>
  <defs>${defs.join('')}</defs>
  <g clip-path='url(#clip)'>${background}</g>
  <g clip-path='url(#clip)' fill='${escapeXml(settings.textColor)}' font-family='${escapeXml(
    getFontFamily(settings)
  )}' font-size='${textSize.toFixed(2)}' font-weight='${escapeXml(settings.textWeight)}' ${
    settings.shadow.enabled ? "filter='url(#text-shadow)'" : ''
  }>${textElements}</g>
</svg>`;
}

export async function exportAsRaster(
  settings: IconSettings,
  size: number,
  format: Exclude<ExportFormat, 'svg'>
): Promise<Blob> {
  const offscreenCanvas = document.createElement('canvas');
  await renderIconToCanvas(offscreenCanvas, settings, size);

  return new Promise<Blob>((resolve, reject) => {
    offscreenCanvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Unable to export icon.'));
          return;
        }

        resolve(blob);
      },
      getMimeType(format),
      format === 'jpg' ? 0.92 : 1
    );
  });
}

export function exportAsSvg(settings: IconSettings, size: number): Blob {
  const svg = buildSvgContent(settings, size);

  return new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function makeExportFilename(format: ExportFormat, size: number): string {
  return `instaicon-${size}.${getFileExtension(format)}`;
}
