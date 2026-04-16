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

import tutor_es from './locales/tutor_es.json';
import tutor_en from './locales/tutor_en.json';
import tutor_fr from './locales/tutor_fr.json';
import tutor_ar from './locales/tutor_ar.json';
import tutor_ro from './locales/tutor_ro.json';
import tutor_ur from './locales/tutor_ur.json';
import tutor_pa from './locales/tutor_pa.json';
import tutor_hi from './locales/tutor_hi.json';

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

const merge = (a: any, b: any) => ({ ...a, ...b });

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: merge(es, tutor_es) },
      en: { translation: merge(en, tutor_en) },
      fr: { translation: merge(fr, tutor_fr) },
      ar: { translation: merge(ar, tutor_ar) },
      ro: { translation: merge(ro, tutor_ro) },
      ur: { translation: merge(ur, tutor_ur) },
      pa: { translation: merge(pa, tutor_pa) },
      hi: { translation: merge(hi, tutor_hi) },
    },
    fallbackLng: 'es',
    interpolation: { escapeValue: false },
  });

export default i18n;
