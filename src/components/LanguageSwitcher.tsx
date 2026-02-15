import { useTranslation } from 'react-i18next';

import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="language" className="hidden lg:inline">{t('language')}</Label>
      <Select value={i18n.language} onValueChange={(value) => void i18n.changeLanguage(value)}>
        <SelectTrigger id="language" className="w-[100px] h-7 lg:w-[130px] lg:h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="zh">简体中文</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
