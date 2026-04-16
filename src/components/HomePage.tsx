import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { languages, RTL_LANGUAGES, type LanguageCode } from '@/i18n';
import { Button } from '@/components/ui/button';
import { Shield, FileText, Calendar } from 'lucide-react';
import logoImg from '@/assets/logo.jpg';

interface HomePageProps {
  onStart: () => void;
}

const floatAnimation = {
  y: [0, -6, 0],
  transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const },
};

const pulseGlow = {
  scale: [1, 1.05, 1],
  opacity: [0.8, 1, 0.8],
  transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const },
};

const featureIcons = [
  { icon: Shield, delay: 0 },
  { icon: FileText, delay: 0.1 },
  { icon: Calendar, delay: 0.2 },
];

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
          <motion.div
            animate={floatAnimation}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-2 shadow-lg shadow-primary/10"
          >
            <motion.div animate={pulseGlow}>
              <Shield className="w-10 h-10 text-primary" />
            </motion.div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl font-bold font-heading text-foreground"
          >
            {t('app.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-base leading-relaxed"
          >
            {t('home.description')}
          </motion.p>
        </div>

        {/* Language selector */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="wizard-card space-y-4"
        >
          <label className="text-sm font-semibold text-foreground">
            {t('home.selectLanguage')}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {languages.map((lang, i) => (
              <motion.button
                key={lang.code}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 + i * 0.04 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => changeLanguage(lang.code)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                  i18n.language === lang.code
                    ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary/20'
                    : 'border-border bg-card text-foreground hover:border-primary/40'
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span>{lang.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 gap-3">
          {[
            { icon: Shield, text: t('nav.wizard'), color: 'text-primary' },
            { icon: FileText, text: t('nav.checklist'), color: 'text-accent' },
            { icon: Calendar, text: t('nav.calendar'), color: 'text-warning' },
          ].map(({ icon: Icon, text, color }, i) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              whileHover={{ x: 4 }}
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary/50 text-secondary-foreground text-sm cursor-default"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
              >
                <Icon className={`w-5 h-5 ${color} shrink-0`} />
              </motion.div>
              <span>{text}</span>
            </motion.div>
          ))}
        </div>

        {/* Start button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            onClick={onStart}
            size="lg"
            className="w-full text-base font-semibold py-6 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow"
          >
            {t('home.startButton')}
          </Button>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center space-y-1"
        >
          <p className="text-xs text-muted-foreground">{t('home.disclaimer')}</p>
          <p className="text-xs text-muted-foreground">{t('home.privacy')}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
