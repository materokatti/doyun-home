import { get } from 'svelte/store';
import { language } from '$lib/stores/language';

interface TranslationKeys {
  welcome: string;
  about: string;
  contact: string;
  home: string;
  'hero.title': string;
  'hero.subtitle': string;
  'about.title': string;
  'about.subtitle': string;
  'about.description': string;
  'about.role': string;
  'about.resume': string;
  'about.projects': string;
}

let translations: TranslationKeys = {
  welcome: '',
  about: '',
  contact: '',
  home: '',
  'hero.title': '',
  'hero.subtitle': '',
  'about.title': '',
  'about.subtitle': '',
  'about.description': '',
  'about.role': '',
  'about.resume': '',
  'about.projects': ''
};

let translationsLoaded = false;

export async function loadTranslations() {
  const lang = get(language);
  console.log('Loading translations for language:', lang);
  try {
    const response = await fetch(`/translations/${lang}.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log('Translation file response:', response);
    translations = await response.json();
    console.log('Loaded translations:', translations);
    translationsLoaded = true;
  } catch (error) {
    console.error('Error loading translations:', error);
    translationsLoaded = false;
  }
}

export function t(key: keyof TranslationKeys): string {
  console.log('Getting translation for key:', key, 'Loaded:', translationsLoaded, 'Current translations:', translations);
  if (!translationsLoaded) return key;
  return translations[key] || key;
} 