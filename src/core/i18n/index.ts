import i18next, { Module, Services, InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import vi from './locales/vi.json';

const LANGUAGE_VI = 'vi';
const LANGUAGE_EN = 'en';
export type LanguageType = typeof LANGUAGE_EN | typeof LANGUAGE_VI;
export interface Language {
  id: string;
  name: string;
}

interface LanguageDetectorAsyncModule extends Module {
  type: 'languageDetector';
  /** Set to true to enable async detection */
  async: true;
  init(services: Services, detectorOptions: object, i18nextOptions: InitOptions): void;
  /** Must call callback passing detected language */
  detect(callback: (lng: string) => void): void;
  cacheUserLanguage(lng: string): void;
}

export const LANGUAGES = [
  {
    id: LANGUAGE_EN,
    name: 'English',
  },
  {
    id: LANGUAGE_VI,
    name: 'Tiếng Việt',
  },
];

const getLanguageName = (id: LanguageType): string | undefined => {
  const language = LANGUAGES.find((lang) => lang.id === id);
  return language ? language.name : undefined;
};

const getLanguageByName = (name: string): Language | undefined => LANGUAGES.find((lang) => lang.name === name);

const LANGUAGE_TEXTS = LANGUAGES.map((lang) => lang.name);

const initialize = async (): Promise<void> => {
  const languageDetector: LanguageDetectorAsyncModule = {
    type: 'languageDetector',
    async: true,
    detect: (cb: (language: string) => void) => cb(LANGUAGE_EN),
    init: () => {
      // blank
    },
    cacheUserLanguage: () => {
      // blank
    },
  };

  await i18next
    .use(languageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: LANGUAGE_EN,
      debug: __DEV__,
      resources: {
        en: {
          translation: en,
        },
        vi: {
          translation: vi,
        },
      },
    });
};

export const i18n = {
  LANGUAGE_VI,
  LANGUAGE_EN,
  LANGUAGES,
  LANGUAGE_TEXTS,
  getLanguageName,
  getLanguageByName,
  initialize,
};
