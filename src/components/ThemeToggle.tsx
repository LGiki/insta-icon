import { Moon, Sun, Monitor } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from './ui/select';
import type { ThemeMode } from '../types/icon';

interface ThemeToggleProps {
  mode: ThemeMode;
  isDark: boolean;
  onChange: (mode: ThemeMode) => void;
}

export function ThemeToggle({ mode, isDark, onChange }: ThemeToggleProps) {
  const { t } = useTranslation();

  const getIcon = () => {
    if (mode === 'auto') return <Monitor className="h-3.5 w-3.5" />;
    return isDark ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />;
  };

  const getLabel = () => {
    if (mode === 'auto') return t('theme.auto');
    return isDark ? t('theme.dark') : t('theme.light');
  };

  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-sm font-medium text-foreground/85 lg:inline">{t('theme.label')}</span>
      <Select value={mode} onValueChange={(value) => onChange(value as ThemeMode)}>
        <SelectTrigger className="h-7 w-[95px] gap-1.5 bg-panel text-xs lg:h-8 lg:w-[110px] lg:gap-2">
          {getIcon()}
          <span className="hidden sm:inline">{getLabel()}</span>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light" className="text-xs">
            <div className="flex items-center gap-2">
              <Sun className="h-3.5 w-3.5" />
              <span>{t('theme.light')}</span>
            </div>
          </SelectItem>
          <SelectItem value="dark" className="text-xs">
            <div className="flex items-center gap-2">
              <Moon className="h-3.5 w-3.5" />
              <span>{t('theme.dark')}</span>
            </div>
          </SelectItem>
          <SelectItem value="auto" className="text-xs">
            <div className="flex items-center gap-2">
              <Monitor className="h-3.5 w-3.5" />
              <span>{t('theme.auto')}</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
