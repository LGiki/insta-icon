import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { RotateCcw } from 'lucide-react';

import { FONT_PRESETS } from '../constants/presets';
import type { CustomFontItem, GradientPreset, IconSettings, PatternPreset } from '../types/icon';
import { clamp } from '../lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from './ui/select';
import { Separator } from './ui/separator';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

interface ControlPanelProps {
  settings: IconSettings;
  gradientPresets: GradientPreset[];
  patternPresets: PatternPreset[];
  customFonts: CustomFontItem[];
  onSettingsChange: (patch: Partial<IconSettings>) => void;
  onBackgroundUpload: (file: File) => void;
  onFontUpload: (file: File) => void;
  onReset?: () => void;
}

export function ControlPanel({
  settings,
  gradientPresets,
  patternPresets,
  customFonts,
  onSettingsChange,
  onBackgroundUpload,
  onFontUpload,
  onReset
}: ControlPanelProps) {
  const { t } = useTranslation();

  const fontValue = useMemo(() => {
    if (settings.fontPreset === 'custom' && settings.customFontFamily) {
      return `custom:${settings.customFontFamily}`;
    }

    return settings.fontPreset;
  }, [settings.customFontFamily, settings.fontPreset]);

  return (
    <div className="space-y-3 lg:space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{t('text.title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 lg:space-y-4">
          <div className="space-y-2">
            <Label htmlFor="icon-text">{t('text.content')}</Label>
            <Textarea
              id="icon-text"
              value={settings.text}
              onChange={(event) => onSettingsChange({ text: event.target.value })}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-foreground/70">
              <Label>{t('text.size')}</Label>
              <span>{Math.round(settings.textSize)}px</span>
            </div>
            <Slider
              value={[settings.textSize]}
              min={18}
              max={320}
              step={1}
              onValueChange={([value]) => onSettingsChange({ textSize: value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>{t('text.weight')}</Label>
              <Select value={settings.textWeight} onValueChange={(value) => onSettingsChange({ textWeight: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100">{t('options.thin')}</SelectItem>
                  <SelectItem value="200">{t('options.extraLight')}</SelectItem>
                  <SelectItem value="300">{t('options.light')}</SelectItem>
                  <SelectItem value="400">{t('options.normal')}</SelectItem>
                  <SelectItem value="500">{t('options.medium')}</SelectItem>
                  <SelectItem value="600">{t('options.semiBold')}</SelectItem>
                  <SelectItem value="700">{t('options.bold')}</SelectItem>
                  <SelectItem value="800">{t('options.extraBold')}</SelectItem>
                  <SelectItem value="900">{t('options.black')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t('text.color')}</Label>
              <Input
                type="color"
                value={settings.textColor}
                onChange={(event) => onSettingsChange({ textColor: event.target.value })}
                className="h-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-foreground/70">
              <Label>{t('text.lineHeight')}</Label>
              <span>{settings.lineHeight.toFixed(2)}</span>
            </div>
            <Slider
              value={[settings.lineHeight]}
              min={0.8}
              max={2}
              step={0.05}
              onValueChange={([value]) => onSettingsChange({ lineHeight: value })}
            />
          </div>

          <div className="space-y-2">
            <Label>{t('text.font')}</Label>
            <Select
              value={fontValue}
              onValueChange={(value) => {
                if (value.startsWith('custom:')) {
                  const family = value.replace('custom:', '');
                  onSettingsChange({ fontPreset: 'custom', customFontFamily: family });
                  return;
                }

                onSettingsChange({ fontPreset: value as IconSettings['fontPreset'] });
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FONT_PRESETS.map((font) => (
                  <SelectItem key={font.id} value={font.id}>
                    {t(font.labelKey)}
                  </SelectItem>
                ))}
                {customFonts.length > 0 ? <SelectSeparator /> : null}
                {customFonts.map((font) => (
                  <SelectItem key={font.family} value={`custom:${font.family}`}>
                    {font.displayName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>{t('text.uploadFont')}</Label>
            <Input
              type="file"
              accept=".ttf,.otf,.woff,.woff2,font/ttf,font/otf,font/woff,font/woff2"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  onFontUpload(file);
                }
              }}
            />
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>{t('text.shadow')}</Label>
              <Switch
                checked={settings.shadow.enabled}
                onCheckedChange={(checked) =>
                  onSettingsChange({
                    shadow: { ...settings.shadow, enabled: checked }
                  })
                }
              />
            </div>
            {settings.shadow.enabled ? (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>{t('text.shadowColor')}</Label>
                    <Input
                      type="color"
                      value={settings.shadow.color}
                      onChange={(event) =>
                        onSettingsChange({
                          shadow: { ...settings.shadow, color: event.target.value }
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('text.shadowBlur')}</Label>
                    <Input
                      type="number"
                      min={0}
                      max={64}
                      value={Math.round(settings.shadow.blur)}
                      onChange={(event) => {
                        const blur = clamp(Number(event.target.value) || 0, 0, 64);
                        onSettingsChange({ shadow: { ...settings.shadow, blur } });
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-foreground/70">
                    <Label>{t('text.shadowAlpha')}</Label>
                    <span>{Math.round(settings.shadow.alpha * 100)}%</span>
                  </div>
                  <Slider
                    value={[settings.shadow.alpha]}
                    min={0}
                    max={1}
                    step={0.01}
                    onValueChange={([value]) =>
                      onSettingsChange({ shadow: { ...settings.shadow, alpha: value } })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-foreground/70">
                    <Label>{t('text.shadowAngle')}</Label>
                    <span>{Math.round(settings.shadow.angle)}°</span>
                  </div>
                  <Slider
                    value={[settings.shadow.angle]}
                    min={0}
                    max={360}
                    step={1}
                    onValueChange={([value]) =>
                      onSettingsChange({ shadow: { ...settings.shadow, angle: value } })
                    }
                  />
                </div>
              </>
            ) : null}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('canvas.title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm text-foreground/70">
            <Label>{t('canvas.radius')}</Label>
            <span>{settings.borderRadius}%</span>
          </div>
          <Slider
            value={[settings.borderRadius]}
            min={0}
            max={50}
            step={1}
            onValueChange={([value]) => onSettingsChange({ borderRadius: value })}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('background.title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{t('background.mode')}</Label>
            <Select
              value={settings.backgroundMode}
              onValueChange={(value) =>
                onSettingsChange({ backgroundMode: value as IconSettings['backgroundMode'] })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solid">{t('background.solid')}</SelectItem>
                <SelectItem value="gradient">{t('background.gradient')}</SelectItem>
                <SelectItem value="image">{t('background.image')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {settings.backgroundMode === 'solid' ? (
            <div className="space-y-2">
              <Label>{t('background.color')}</Label>
              <Input
                type="color"
                value={settings.solidColor}
                onChange={(event) => onSettingsChange({ solidColor: event.target.value })}
                className="h-11"
              />
            </div>
          ) : null}

          {settings.backgroundMode === 'gradient' ? (
            <>
              <div className="space-y-2">
                <Label>{t('background.preset')}</Label>
                <Select
                  value={settings.gradientPresetId}
                  onValueChange={(value) => {
                    if (value === 'custom') {
                      onSettingsChange({ gradientPresetId: 'custom' });
                      return;
                    }

                    const preset = gradientPresets.find((item) => item.id === value);
                    if (!preset) {
                      return;
                    }

                    onSettingsChange({
                      gradientPresetId: preset.id,
                      gradientFrom: preset.from,
                      gradientTo: preset.to,
                      gradientAngle: preset.angle
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {gradientPresets.map((preset) => (
                      <SelectItem key={preset.id} value={preset.id}>
                        {preset.name}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">{t('background.custom')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label>{t('background.from')}</Label>
                  <Input
                    type="color"
                    value={settings.gradientFrom}
                    onChange={(event) =>
                      onSettingsChange({ gradientPresetId: 'custom', gradientFrom: event.target.value })
                    }
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t('background.to')}</Label>
                  <Input
                    type="color"
                    value={settings.gradientTo}
                    onChange={(event) =>
                      onSettingsChange({ gradientPresetId: 'custom', gradientTo: event.target.value })
                    }
                    className="h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-foreground/70">
                  <Label>{t('background.angle')}</Label>
                  <span>{Math.round(settings.gradientAngle)}°</span>
                </div>
                <Slider
                  value={[settings.gradientAngle]}
                  min={0}
                  max={360}
                  step={1}
                  onValueChange={([value]) =>
                    onSettingsChange({ gradientPresetId: 'custom', gradientAngle: value })
                  }
                />
              </div>
            </>
          ) : null}

          {settings.backgroundMode === 'image' ? (
            <>
              <div className="space-y-2">
                <Label>{t('background.upload')}</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      onBackgroundUpload(file);
                    }
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>{t('background.patterns')}</Label>
                <div className="grid grid-cols-3 gap-2">
                  {patternPresets.map((pattern) => (
                    <button
                      key={pattern.id}
                      type="button"
                      aria-label={pattern.name}
                      className={`h-16 rounded-md border bg-cover bg-center transition hover:scale-[1.03] ${
                        settings.imageSrc === pattern.src ? 'border-primary ring-1 ring-primary' : 'border-border'
                      }`}
                      style={{ backgroundImage: `url("${pattern.src}")` }}
                      onClick={() => onSettingsChange({ imageSrc: pattern.src })}
                    />
                  ))}
                </div>
              </div>
          </>
        ) : null}
      </CardContent>
    </Card>

    {onReset ? (
      <Button variant="outline" className="w-full" onClick={onReset}>
        <RotateCcw className="mr-2 h-4 w-4" />
        {t('controls.reset')}
      </Button>
    ) : null}
  </div>
);
}
