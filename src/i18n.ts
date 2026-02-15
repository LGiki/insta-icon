import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      appName: 'InstaIcon',
      appSubtitle: 'Text icon generator',
      language: 'Language',
      controls: {
        label: 'Control Panel',
        reset: 'Reset All Settings'
      },
      preview: 'Real-time Preview',
      theme: {
        label: 'Theme',
        light: 'Light',
        dark: 'Dark',
        auto: 'Auto'
      },
      canvas: {
        title: 'Canvas Settings',
        radius: 'Border Radius'
      },
      background: {
        title: 'Background Settings',
        mode: 'Mode',
        solid: 'Solid Color',
        gradient: 'Gradient',
        image: 'Image / Pattern',
        color: 'Color',
        preset: 'Preset Gradient',
        custom: 'Custom Gradient',
        from: 'From',
        to: 'To',
        angle: 'Angle',
        upload: 'Upload Image',
        patterns: 'Pattern Presets'
      },
      text: {
        title: 'Typography',
        content: 'Text',
        size: 'Font Size',
        weight: 'Font Weight',
        lineHeight: 'Line Height',
        font: 'Font Family',
        uploadFont: 'Upload Font',
        customFont: 'Uploaded Fonts',
        color: 'Text Color',
        shadow: 'Text Shadow',
        shadowColor: 'Shadow Color',
        shadowAlpha: 'Shadow Opacity',
        shadowAngle: 'Shadow Angle',
        shadowBlur: 'Shadow Blur'
      },
      export: {
        title: 'Export Settings',
        format: 'Format',
        size: 'Size',
        customSize: 'Custom Size',
        download: 'Download Icon',
        busy: 'Exporting...'
      },
      options: {
        thin: 'Thin (100)',
        extraLight: 'Extra Light (200)',
        light: 'Light (300)',
        normal: 'Normal (400)',
        medium: 'Medium (500)',
        semiBold: 'Semi Bold (600)',
        bold: 'Bold (700)',
        extraBold: 'Extra Bold (800)',
        black: 'Black (900)',
        heavy: 'Heavy',
        custom: 'Custom'
      },
      fonts: {
        sans: 'Sans-serif',
        serif: 'Serif',
        mono: 'Monospace',
        cursive: 'Cursive'
      },
      common: {
        loading: 'Rendering...'
      }
    }
  },
  zh: {
    translation: {
      appName: 'InstaIcon',
      appSubtitle: '文字图标生成器',
      language: '语言',
      controls: {
        label: '控制面板',
        reset: '重置所有设置'
      },
      preview: '实时预览',
      theme: {
        label: '主题',
        light: '浅色',
        dark: '深色',
        auto: '自动'
      },
      canvas: {
        title: '画布设置',
        radius: '圆角'
      },
      background: {
        title: '背景设置',
        mode: '模式',
        solid: '纯色',
        gradient: '渐变',
        image: '图片 / 图案',
        color: '颜色',
        preset: '预设渐变',
        custom: '自定义渐变',
        from: '起始色',
        to: '结束色',
        angle: '角度',
        upload: '上传图片',
        patterns: '图案预设'
      },
      text: {
        title: '文字设置',
        content: '文本内容',
        size: '字号',
        weight: '字重',
        lineHeight: '行高',
        font: '字体',
        uploadFont: '上传字体',
        customFont: '已上传字体',
        color: '文字颜色',
        shadow: '文字阴影',
        shadowColor: '阴影颜色',
        shadowAlpha: '阴影不透明度',
        shadowAngle: '阴影角度',
        shadowBlur: '阴影模糊'
      },
      export: {
        title: '导出设置',
        format: '格式',
        size: '尺寸',
        customSize: '自定义尺寸',
        download: '下载图标',
        busy: '导出中...'
      },
      options: {
        thin: '极细 (100)',
        extraLight: '超细 (200)',
        light: '细体 (300)',
        normal: '常规 (400)',
        medium: '中等 (500)',
        semiBold: '半粗 (600)',
        bold: '粗体 (700)',
        extraBold: '特粗 (800)',
        black: '黑体 (900)',
        heavy: '重度',
        custom: '自定义'
      },
      fonts: {
        sans: '无衬线',
        serif: '衬线',
        mono: '等宽',
        cursive: '手写'
      },
      common: {
        loading: '渲染中...'
      }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
