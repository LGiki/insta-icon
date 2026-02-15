import { useTranslation } from 'react-i18next';

import { EXPORT_SIZE_PRESETS } from '../constants/presets';
import type { ExportFormat } from '../types/icon';
import { clamp } from '../lib/utils';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface ExportPanelProps {
  exportFormat: ExportFormat;
  onExportFormatChange: (format: ExportFormat) => void;
  exportSizeMode: string;
  onExportSizeModeChange: (value: string) => void;
  customExportSize: number;
  onCustomExportSizeChange: (value: number) => void;
  onDownload: () => void;
  isExporting: boolean;
}

export function ExportPanel({
  exportFormat,
  onExportFormatChange,
  exportSizeMode,
  onExportSizeModeChange,
  customExportSize,
  onCustomExportSizeChange,
  onDownload,
  isExporting
}: ExportPanelProps) {
  const { t } = useTranslation();

  return (
    <Card className="lg:border-border lg:bg-panel lg:shadow-sm lg:rounded-lg border-0 bg-transparent shadow-none rounded-none">
      <CardHeader className="hidden lg:flex lg:p-4 lg:pb-2">
        <CardTitle>{t('export.title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 lg:space-y-4 p-0 lg:p-4 lg:pt-2">
        <div className="grid grid-cols-2 gap-2 lg:gap-3">
          <div className="space-y-1 lg:space-y-2">
            <Label className="text-xs lg:text-sm">{t('export.format')}</Label>
            <Select value={exportFormat} onValueChange={(value) => onExportFormatChange(value as ExportFormat)}>
              <SelectTrigger className="h-8 lg:h-10 text-xs lg:text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="png">PNG</SelectItem>
                <SelectItem value="jpg">JPG</SelectItem>
                <SelectItem value="webp">WEBP</SelectItem>
                <SelectItem value="svg">SVG</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1 lg:space-y-2">
            <Label className="text-xs lg:text-sm">{t('export.size')}</Label>
            <Select value={exportSizeMode} onValueChange={onExportSizeModeChange}>
              <SelectTrigger className="h-8 lg:h-10 text-xs lg:text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {EXPORT_SIZE_PRESETS.map((size) => (
                  <SelectItem key={size} value={String(size)} className="text-xs lg:text-sm">
                    {size}px
                  </SelectItem>
                ))}
                <SelectItem value="custom" className="text-xs lg:text-sm">{t('options.custom')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {exportSizeMode === 'custom' ? (
          <div className="space-y-1 lg:space-y-2">
            <Label className="text-xs lg:text-sm">{t('export.customSize')}</Label>
            <Input
              type="number"
              min={128}
              max={4096}
              value={customExportSize}
              onChange={(event) => {
                const nextValue = clamp(Number(event.target.value) || 512, 128, 4096);
                onCustomExportSizeChange(nextValue);
              }}
              className="h-8 lg:h-10 text-xs lg:text-sm"
            />
          </div>
        ) : null}

        <Button className="w-full h-8 lg:h-10 text-xs lg:text-sm" onClick={onDownload} disabled={isExporting}>
          {isExporting ? t('export.busy') : t('export.download')}
        </Button>
      </CardContent>
    </Card>
  );
}
