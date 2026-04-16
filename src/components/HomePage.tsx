import { useTranslation } from 'react-i18next';
import { languages, RTL_LANGUAGES, type LanguageCode } from '@/i18n';
import { Button } from '@/components/ui/button';
import { Shield, FileText, Calendar } from 'lucide-react';

interface HomePageProps {
  onStart: () => void;
}

const HomePage = ({ onStart }: HomePageProps) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (code: LanguageCode) => {
    i18n.changeLanguage(code);
    const dir = RTL_LANGUAGES.includes(code) ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = code;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-2">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading text-foreground">
            {t('app.title')}
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            {t('home.description')}
          </p>
        </div>

        {/* Language selector */}
        <div className="wizard-card space-y-4">
          <label className="text-sm font-semibold text-foreground">
            {t('home.selectLanguage')}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                  i18n.language === lang.code
                    ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary/20'
                    : 'border-border bg-card text-foreground hover:border-primary/40'
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 gap-3">
          {[
            { icon: Shield, text: t('nav.wizard') },
            { icon: FileText, text: t('nav.checklist') },
            { icon: Calendar, text: t('nav.calendar') },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary/50 text-secondary-foreground text-sm">
              <Icon className="w-5 h-5 text-primary shrink-0" />
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* Start button */}
        <Button
          onClick={onStart}
          size="lg"
          className="w-full text-base font-semibold py-6 rounded-xl"
        >
          {t('home.startButton')}
        </Button>

        {/* Disclaimer */}
        <div className="text-center space-y-1">
          <p className="text-xs text-muted-foreground">{t('home.disclaimer')}</p>
          <p className="text-xs text-muted-foreground">{t('home.privacy')}</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
