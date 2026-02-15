import { CANVAS_BASE_SIZE, FONT_PRESETS } from '../constants/presets';
import type { IconSettings } from '../types/icon';
import { loadImage } from './image';
import { hexToRgba, toRadians } from './utils';

const BACKGROUND_COLOR_FALLBACK = '#0f172a';

function getFontFamily(settings: IconSettings): string {
  if (settings.fontPreset === 'custom' && settings.customFontFamily) {
    return settings.customFontFamily;
  }

  const preset = FONT_PRESETS.find((item) => item.id === settings.fontPreset);
  return preset?.family ?? FONT_PRESETS[0].family;
}

function drawRoundedRectPath(
  ctx: CanvasRenderingContext2D,
  size: number,
  borderRadiusPercent: number
): void {
  const radius = Math.max(0, Math.min(size / 2, (size * borderRadiusPercent) / 100));
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.lineTo(size - radius, 0);
  ctx.quadraticCurveTo(size, 0, size, radius);
  ctx.lineTo(size, size - radius);
  ctx.quadraticCurveTo(size, size, size - radius, size);
  ctx.lineTo(radius, size);
  ctx.quadraticCurveTo(0, size, 0, size - radius);
  ctx.lineTo(0, radius);
  ctx.quadraticCurveTo(0, 0, radius, 0);
  ctx.closePath();
}

function createLinearGradient(
  ctx: CanvasRenderingContext2D,
  size: number,
  angle: number,
  from: string,
  to: string
): CanvasGradient {
  const radians = toRadians(angle);
  const half = size / 2;
  const length = Math.sqrt(2) * half;

  const x1 = half - Math.cos(radians) * length;
  const y1 = half - Math.sin(radians) * length;
  const x2 = half + Math.cos(radians) * length;
  const y2 = half + Math.sin(radians) * length;

  const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
  gradient.addColorStop(0, from);
  gradient.addColorStop(1, to);

  return gradient;
}

function drawImageCover(
  ctx: CanvasRenderingContext2D,
  image: CanvasImageSource,
  targetSize: number,
  sourceWidth: number,
  sourceHeight: number
): void {
  const scale = Math.max(targetSize / sourceWidth, targetSize / sourceHeight);
  const drawWidth = sourceWidth * scale;
  const drawHeight = sourceHeight * scale;
  const x = (targetSize - drawWidth) / 2;
  const y = (targetSize - drawHeight) / 2;

  ctx.drawImage(image, x, y, drawWidth, drawHeight);
}

async function drawBackground(
  ctx: CanvasRenderingContext2D,
  settings: IconSettings,
  size: number
): Promise<void> {
  if (settings.backgroundMode === 'solid') {
    ctx.fillStyle = settings.solidColor || BACKGROUND_COLOR_FALLBACK;
    ctx.fillRect(0, 0, size, size);
    return;
  }

  if (settings.backgroundMode === 'gradient') {
    ctx.fillStyle = createLinearGradient(
      ctx,
      size,
      settings.gradientAngle,
      settings.gradientFrom,
      settings.gradientTo
    );
    ctx.fillRect(0, 0, size, size);
    return;
  }

  if (!settings.imageSrc) {
    ctx.fillStyle = BACKGROUND_COLOR_FALLBACK;
    ctx.fillRect(0, 0, size, size);
    return;
  }

  const image = await loadImage(settings.imageSrc);
  drawImageCover(ctx, image, size, image.width, image.height);
}

function drawText(ctx: CanvasRenderingContext2D, settings: IconSettings, size: number): void {
  const scale = size / CANVAS_BASE_SIZE;
  const fontSize = settings.textSize * scale;
  const lineHeightPx = settings.lineHeight * fontSize;
  const lines = settings.text.split('\n');

  if (lines.length === 0) {
    return;
  }

  const center = size / 2;

  ctx.font = `${settings.textWeight} ${fontSize}px ${getFontFamily(settings)}`;
  ctx.fillStyle = settings.textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  if (settings.shadow.enabled) {
    const radians = toRadians(settings.shadow.angle);
    const offset = Math.max(2, size * 0.014);
    ctx.shadowColor = hexToRgba(settings.shadow.color, settings.shadow.alpha);
    ctx.shadowBlur = settings.shadow.blur;
    ctx.shadowOffsetX = Math.cos(radians) * offset;
    ctx.shadowOffsetY = Math.sin(radians) * offset;
  } else {
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }

  const startY = center - ((lines.length - 1) * lineHeightPx) / 2;

  lines.forEach((line, index) => {
    const y = startY + index * lineHeightPx;
    ctx.fillText(line || ' ', center, y);
  });
}

export async function renderIconToCanvas(
  canvas: HTMLCanvasElement,
  settings: IconSettings,
  size = CANVAS_BASE_SIZE
): Promise<void> {
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Failed to create drawing context');
  }

  ctx.clearRect(0, 0, size, size);
  ctx.save();
  drawRoundedRectPath(ctx, size, settings.borderRadius);
  ctx.clip();

  await drawBackground(ctx, settings, size);
  drawText(ctx, settings, size);

  ctx.restore();
}
