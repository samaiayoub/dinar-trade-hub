import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="border-glass-border bg-secondary/30 hover:bg-secondary/50 gap-2"
    >
      <Globe className="w-4 h-4" />
      {language === 'en' ? 'العربية' : 'English'}
    </Button>
  );
}
