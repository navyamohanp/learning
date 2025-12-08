import * as RNLocalize from 'react-native-localize';

import en from '../languages/en.json';
import hi from '../languages/hi.json';
import fr from '../languages/fr.json';
import es from '../languages/es.json';
import de from '../languages/de.json';

const translations = {en, hi, fr, es, de};

let currentLang = 'en';

// AUTO-DETECT DEVICE LANGUAGE
export const detectLanguage = () => {
  const locales = RNLocalize.getLocales();
  const deviceLang = locales[0]?.languageCode?.toLowerCase();

  if (translations[deviceLang]) {
    currentLang = deviceLang;
  }
};

detectLanguage();

// TRANSLATION FUNCTION
export const t = key => {
  return translations[currentLang][key] || key;
};

// MANUAL LANGUAGE SWITCH
export const setLanguage = lang => {
  if (translations[lang]) {
    currentLang = lang;
  }
};
