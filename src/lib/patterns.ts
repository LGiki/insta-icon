import type { PatternPreset } from '../types/icon';

function svgToDataUrl(svg: string): string {
  const encoded = encodeURIComponent(svg)
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29');
  return `data:image/svg+xml;charset=utf-8,${encoded}`;
}

export function getPatternPresets(): PatternPreset[] {
  return [
    {
      id: 'triangles',
      name: 'Triangles',
      src: svgToDataUrl(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><rect width='512' height='512' fill='#0b3c49'/><g fill='#2ca6a4' opacity='0.8'><polygon points='0,140 170,0 340,140'/><polygon points='170,140 340,0 512,140'/><polygon points='0,372 170,232 340,372'/><polygon points='172,372 342,232 512,372'/></g><g fill='#f2b97f' opacity='0.6'><polygon points='0,512 120,400 240,512'/><polygon points='272,512 392,400 512,512'/></g></svg>`)
    },
    {
      id: 'rings',
      name: 'Rings',
      src: svgToDataUrl(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><rect width='512' height='512' fill='#132a3a'/><g fill='none' stroke='#76c7c0' stroke-width='20' opacity='0.75'><circle cx='120' cy='120' r='90'/><circle cx='392' cy='140' r='110'/><circle cx='256' cy='350' r='150'/></g><g fill='none' stroke='#f7d794' stroke-width='10' opacity='0.7'><circle cx='120' cy='120' r='130'/><circle cx='392' cy='140' r='150'/></g></svg>`)
    },
    {
      id: 'stripes',
      name: 'Diagonal Stripes',
      src: svgToDataUrl(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><rect width='512' height='512' fill='#20353f'/><g stroke-width='40'><line x1='-60' y1='90' x2='280' y2='-250' stroke='#4ecdc4'/><line x1='20' y1='170' x2='360' y2='-170' stroke='#ffe66d'/><line x1='100' y1='250' x2='440' y2='-90' stroke='#ff6b6b'/><line x1='180' y1='330' x2='520' y2='-10' stroke='#4ecdc4'/><line x1='260' y1='410' x2='600' y2='70' stroke='#ffe66d'/><line x1='340' y1='490' x2='680' y2='150' stroke='#ff6b6b'/></g></svg>`)
    },
    {
      id: 'grid',
      name: 'Rounded Grid',
      src: svgToDataUrl(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><rect width='512' height='512' fill='#0f2f2f'/><g fill='#8bd3dd'><rect x='36' y='36' width='120' height='120' rx='24'/><rect x='196' y='36' width='120' height='120' rx='24'/><rect x='356' y='36' width='120' height='120' rx='24'/><rect x='36' y='196' width='120' height='120' rx='24'/><rect x='196' y='196' width='120' height='120' rx='24'/><rect x='356' y='196' width='120' height='120' rx='24'/><rect x='36' y='356' width='120' height='120' rx='24'/><rect x='196' y='356' width='120' height='120' rx='24'/><rect x='356' y='356' width='120' height='120' rx='24'/></g><g fill='#fce38a' opacity='0.75'><circle cx='96' cy='96' r='12'/><circle cx='256' cy='256' r='12'/><circle cx='416' cy='416' r='12'/></g></svg>`)
    },
    {
      id: 'blobs',
      name: 'Blob Waves',
      src: svgToDataUrl(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><rect width='512' height='512' fill='#1c2541'/><path d='M0 320C80 290 120 260 180 270C240 280 280 340 340 350C400 360 440 330 512 290V512H0Z' fill='#5bc0be'/><path d='M0 240C70 210 130 180 210 195C290 210 340 260 410 250C460 244 490 220 512 205V512H0Z' fill='#6fffe9' opacity='0.85'/><circle cx='110' cy='115' r='50' fill='#f9c74f'/><circle cx='410' cy='95' r='36' fill='#f9844a'/></svg>`)
    }
  ];
}
