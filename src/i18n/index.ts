import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import es from './locales/es.json';
import en from './locales/en.json';
import fr from './locales/fr.json';
import ar from './locales/ar.json';
import ro from './locales/ro.json';
import ur from './locales/ur.json';
import pa from './locales/pa.json';
import hi from './locales/hi.json';

export const languages = [
  { code: 'es', name: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'en', name: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'ro', name: 'Română', flag: '🇷🇴', dir: 'ltr' },
  { code: 'ur', name: 'اردو', flag: '🇵🇰', dir: 'rtl' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳', dir: 'ltr' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },
] as const;

export type LanguageCode = typeof languages[number]['code'];

export const RTL_LANGUAGES: LanguageCode[] = ['ar', 'ur'];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      en: { translation: en },
      fr: { translation: fr },
      ar: { translation: ar },
      ro: { translation: ro },
      ur: { translation: ur },
      pa: { translation: pa },
      hi: { translation: hi },
    },
    fallbackLng: 'es',
    interpolation: { escapeValue: false },
  });

export default i18n;
